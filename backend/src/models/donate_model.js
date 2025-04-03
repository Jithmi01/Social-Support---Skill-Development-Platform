const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donate = new Schema({
    donorName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    amount: { type: Number, required: true },
    campaignName: { type: String, required: true },
    status: { type: String, required: true, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donate);
