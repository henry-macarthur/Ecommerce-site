const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/authenticate');


router.get('/posts/me', auth, async (req, res) => {
    try {
        console.log(req.user);
        //console.log()
        await req.user.populate('posts').execPopulate();
        //await user.populate('posts').execPopulate();
        //await req.user.populate('posts').execPopulate();
        //console.log(req.user.posts)
        res.send(req.user.posts);
    } catch (e)
    {
        res.status(500).send();
    }
});
//auth
router.get('/posts', auth, async (req, res) => {
    console.log(req.query.category);
    let posts;
    if(req.query.category) //it is defined
    {
        posts = await Post.find({category: req.query.category});
    }
    else
    {
        posts = await Post.find({});
    }
    
    res.send(posts);
    // try {
    //     await req.user.populate({
    //         path: 'posts',

    //     }).execPopulate();
    //     res.send(req.user.posts);
    // } catch (e)
    // {
    //     res.status(500).send();
    // }
});

router.post('/posts', auth, async (req, res) => {
    console.log('post')
    const post = new Post({
        ...req.body,
        owner: req.user._id
    })

    console.log(post)

    try
    {
        await post.save();
        res.status(201).send(post);
    } catch (e) {
        res.status(400).send();
    }
});

router.delete('/posts/:id', auth, async (req, res) => {
    try {
        //console.log(req.params.id, req.user._id);
        //req.params.id is the current user, p.owner is where the money should go
        const p = await Post.findOne({_id: req.params.id});
        
        //console.log('id', req.user.id, p.owner);

        if(!p)
            res.status(404).send();

        console.log(p.owner);
        console.log(req.user.id)

        //const buyer = User.findById(req.user.id);
        //const recipient = User.findById(p.owner);
        //console.log('ok', p.owner, req, user.id)
        if(p.owner != req.user.id)
        {
            console.log('not the same')
            p.remove();
            res.status(200).send();
        }
        else
            res.status(406).send('owner cannot buy their own stuff');
        //const post = await Post.findOneAndDelete({_id: req.params.id});

        
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;