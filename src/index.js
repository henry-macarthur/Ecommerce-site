const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
let cors = require('cors');
const app = express();
const port = 8080; //will change if i use heroku

app.use(express.json()); //auto parse json coming into an object
app.use(userRouter);
app.use(postRouter);
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'localhost:3000');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

//console.log()
app.listen(3000, () => {
    console.log('Server is running on port ' + port);
    
});

const Task = require('./models/post');
const User = require('./models/user');

// const main = async () => {
//   // const task = await Task.findById('5d23c4739e336f3a62c33620');
//   // await task.populate('owner').execPopulate(); //populate data from a relationship
//   // //task.owner will become the whole user and not just the id
//   // console.log(task.owner);

//   const user = await User.findById('5d2f736774154b05153be7b1');
//   await user.populate('posts').execPopulate();
//   console.log(user.posts)
// }

// main();