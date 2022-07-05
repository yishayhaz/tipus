const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: false,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    logo_url: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: "active",
    },
    payment_method: {
        type: Number,
        default: 0,
    },
    reviews: [{
        name: String,
        role: String,
        comment: String,
        score: Number,
        payment_method: Number,
        contact: String,
        createdAt: { type: String, default: new Date().getTime() },
        status: { type: String, default: "active"},
    }],
    createdAt: { type: String, default: new Date().getTime() },
    updatedAt: { type: String, default: new Date().getTime() },
});

module.exports = mongoose.model('Restaurants', RestaurantSchema);