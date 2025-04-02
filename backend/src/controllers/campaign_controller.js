const Campaign = require('../models/campaign_model');

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ date: 1 });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single campaign
const getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new campaign
const createCampaign = async (req, res) => {
  try {
    console.log('Received campaign data:', req.body);
    console.log('Received file:', req.file);
    
    if (!req.body.name || !req.body.description || !req.body.date) {
      return res.status(400).json({ error: 'Name, description and date are required' });
    }

    // Create campaign object
    const campaignData = {
      name: req.body.name,
      description: req.body.description,
      date: new Date(req.body.date),
      status: req.body.status || 'Active'
    };

    // Add image path if file was uploaded
    if (req.file) {
      campaignData.image = `/uploads/${req.file.filename}`;
    }

    const campaign = await Campaign.create(campaignData);
    console.log('Created campaign:', campaign);
    res.status(201).json(campaign);
  } catch (error) {
    console.error('Campaign creation error:', error);
    res.status(400).json({ error: error.message });
  }
};

// Update campaign
const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete campaign
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign
};
