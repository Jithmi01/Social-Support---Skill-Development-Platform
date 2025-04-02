const Donation = require('../models/donate_model');
const User = require('../models/user_model');
const mongoose = require('mongoose');

// Get all donations
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({}).sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single donation
const getDonationById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Donation' });
  }

  const donation = await Donation.findById(id);

  if (!donation) {
    return res.status(404).json({ error: 'No such Donation' });
  }

  res.status(200).json(donation);
}

// Make a donation
const makeDonation = async (req, res) => {
  try {
    const { donorName, amount, campaignName, status } = req.body;
    const donation = await Donation.create({
      donorName,
      amount,
      campaignName,
      status
    });
    res.status(200).json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a donation
const deleteDonation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Unable to delete' });
  }

  const donation = await Donation.findOneAndDelete({ _id: id });

  if (!donation) {
    return res.status(400).json({ error: 'Unable to delete' });
  }

  res.status(200).json(donation);
}

// Update a donation
const updateDonation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Unable Transaction' });
  }

  const donation = await Donation.findOneAndUpdate({ _id: id }, {
    ...req.body
  });

  if (!donation) {
    return res.status(400).json({ error: 'Unable Transaction' });
  }

  res.status(200).json(donation);
}

module.exports = {
  getDonations,
  getDonationById,
  makeDonation,
  deleteDonation,
  updateDonation
};