const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', "caressa", 'messi', 'fati', "marcos", "liddy", "albany table"],
            message: '{VALUE} is not supported'
        } 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    featured: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Product', productSchema)