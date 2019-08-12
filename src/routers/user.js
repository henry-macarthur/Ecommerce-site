
const axios = require('axios');
const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const Post = require('../models/post');
const auth = require('../middleware/authenticate');
const paypal = require('paypal-rest-sdk');
const open = require('open');
const dotenv = require('dotenv');
dotenv.config();
let fixPost; //find a better way for this
const {sendWelcomeEmail, sendCancelationEmail} = require('../emails/account');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Af74EhqZAsPhAA3RcPQdNT3ongxP_9x3Fo9N_GLRkW3y1HHF-XQbFJ-m6VD-IrKsSRcG5B-bCbxgfGcl',
    'client_secret': process.env.PAYPAL_SECRET//'EMNXW8Lco48WyJKnLUJ8BgIHXuDec5GJ0ArKRCO_ERG8c2BDRzjrIQUjywzaizV_CCm68wueI_GYu0z9'
  });

router.post('/users/makePayment/:id', auth,  async (req, res) => {
    //let currentUser = User.findOne()
    //req.user = customer
    const post = await Post.findById(req.params.id);
    fixPost = post;
    const recipeint = await User.findById(post.owner);

    console.log(req.user.name)
    console.log(recipeint.name)
    //make sure they cannot be the same users
    //console.log(req.user.id, post.owner)
    if(req.user.id != post.owner)
    {
        //console.log('bet')
    //total = post.cost;
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": { //embed email im the url 
                "return_url": `http://localhost:3000/users/success/${post.cost}/${recipeint.email}/${req.params.id}`,//"http://return.url", //change these two
                "cancel_url": `http://localhost:3000/users/cancel`,
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": post.category,
                        "sku": "item",
                        "price": post.cost,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": post.cost
                },
                "description": post.description
            }]
        };
        //console.log(create_payment_json)

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                // console.log("Create Payment Response");
                // console.log(payment);
                for(let i = 0; i < payment.links.length; i++) {
                    //console.log(payment.links[i].rel)
                    if(payment.links[i].rel === 'approval_url') {
                        //console.log(payment.links[i].href)
                        open( payment.links[i].href, function (err) {
                            if ( err ) throw err;    
                        });
                    }
                }
            }
        });
    } else {
        res.status(406).send('owner cannot buy their own stuff');
    }

    // console.log(req.user.customerId)
    // //console.log(stripe.customers)

    // const charge = await stripe.charges.create({
    //     amount: (post.cost * 100),
    //     currency: 'usd',
    //     customer: req.user.customerId
    // }) //charge the buyer

    // const refund = await stripe.refunds.create({
    //     cus: recipeint.customerId,
    //     amount: (post.cost * 100),
    //     currency: 'usd'
    // })
    //then im going to want to give money to the owner
    //res.status(200).send()
    
})

router.get('/users/success/:total/:email/:id', async (req, res) => {
    //res.send('ok')
    //console.log(req)
    const amount = req.params.total;
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const post = await Post.findByIdAndDelete(req.params.id);
    //console.log(payerId, paymentId)

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
          "amount": {
                "currency": "USD",
                "total": amount
          }  
        }]
    }

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
        if (error) {
            res.send(error.response)
            console.log(error.response);
            throw error;
        } else {
            var sender_batch_id = Math.random().toString(36).substring(9);

            var create_payout_json = {
                "sender_batch_header": {
                    "sender_batch_id": sender_batch_id,
                    "email_subject": "You have a payment"
                },
                "items": [
                    {
                        "recipient_type": "EMAIL",
                        "amount": {
                            "value": amount,
                            "currency": "USD"
                        },
                        "receiver": req.params.email, //gonna replace this with the email used to login
                        "note": "Thank you.",
                        "sender_item_id": "purchase"
                    }
                ]
            };

            var sync_mode = 'false';

            await paypal.payout.create(create_payout_json, sync_mode, function (error, payout) {
                if (error) {
                    res.send(error.response);
                    throw error;
                } else {
                    res.send('Success');
                    console.log("Create Single Payout Response");
                    //console.log(payout);
                }
            });
           
            
        }
    });
})

router.get('/users/cancel/', async (req, res) => {
    //add the post back to the database! somehow store the post data

   // let currentPost = req.params.post;
    // /console.log(fixPost);
    console.log('ok')
    
    res.send('Cancelled')
})

router.post('/users/signup', async (req, res) => {
    let currentToken;
    // stripe.tokens.create({
    //     card: {
    //         number: req.body.number,
    //         exp_month: req.body.month,
    //         exp_year: req.body.year,
    //         cvc: req.body.cvc
    //     }
    // }, function (err, token) {
    //     if (err)
    //         throw Error(err);
    //      currenttoken = token;
    // });

    // const customer = await stripe.customers.create({
    //     source: 'tok_visa_debit',//currentToken,
    //     email: req.body.email,
    // })
    // req.body.customerId = customer.id;
    // delete req.body.number;
    // delete req.body.month;
    // delete req.body.year;
    // delete req.body.cvc;

   // console.log(req.body)
    const user = new User(req.body);

    try
    {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({user, token})
    }
    catch (e)
    {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    
    try {
        const user = await User.findUser(req.body.email, req.body.password);
        //console.log('okkkk')
        const token = await user.generateAuthToken();
       // console.log(token)
        console.log('login')
        res.send({user, token});
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    
    try 
    {
        req.user.token = '';

        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

module.exports = router;