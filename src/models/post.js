const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    cost: {
        type: Number,
        require: true,
        default: 0,
        validate(data) {
            if(data < 0)
                throw new Error('Price must be not be negative')
        }
    }, 
    category: {
        type: String, 
        require: true, 
        trim: true
    },
    information: {
        type: String, 
        require: true, 
        defualt: 'No information provided'
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true, 
        ref: 'User'
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', taskSchema);

module.exports = Post;