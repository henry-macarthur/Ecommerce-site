const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

const auth = async (req, res, next) => {
  try
  {
   // console.log(req.header('A'))
   //console.log(req.body);//headers.authorization)
    // console.log('asasas')
    
    const token = req.header('Authorization').replace('Bearer ', ''); //replace 1 with 2, get token from postman
    //console.log(token);

  // console.log(token)
    const decoded = jwt.verify(token, dotnev.SECRET);
    //console.log(decoded._id)
    const user = await User.findOne({_id: decoded._id, 'token': token}); //find token in the token array
   // console.log(user)
    if(!user)
    {
      throw new Error();
    }
    //things went well
    req.token = token;
    req.user = user; //storing data on the request field

    next();
  }
  catch (e)
  {
    console.log('error')
    res.status(401).send({error: 'authentication required'});
  }
}

module.exports = auth;