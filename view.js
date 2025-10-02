const mongoose = require('mongoose');

const viewModal = new mongoose.Schema({
    view: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('View', viewModal);