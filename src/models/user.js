const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Post = ('./post');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true,
        trim: true
    },
    customerId: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true,
        lowercase: true, 
        validate(value) {
            if(!validator.isEmail(value))
            {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String, 
        require: true,
        minlength: 5,
        trim: true
    }, 
    token: {
        type: String,
        //required: true
    }
}, {
    timestamps: true
});

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id', //user, what the field is associated with
    foreignField: 'owner' //name of the field on the other thing that creates the relationship
  });

userSchema.methods.generateAuthToken = async function()
{
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'secretmessage', {expiresIn: '1h'});

    user.token = token;
    //console.log(token)

    await user.save();
    //console.log('saved')
    return token;
}

userSchema.statics.findUser = async (email, password) => {
    const user = await User.findOne({email});

    if(!user)
    {
        throw new Error('unable to login');
    }

    const match = await bcrypt.compare(password, user.password);
   // console.log(match);
    if(!match)
    {
        throw new Error('unable to login');
    }

    return user;
}

userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password, 8);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;