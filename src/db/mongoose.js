const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
//console.log(process.env.PAYPAL_SECRET)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true, //index's are created
  useFindAndModify: false,
});