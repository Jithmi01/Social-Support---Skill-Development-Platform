import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:4000/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    fetchCampaigns();
  }, []);

  const getImageUrl = (imagePath) => {
    if (imagePath) {
      return `http://localhost:4000${imagePath}`;
    }
    return 'https://via.placeholder.com/400x300';
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Fundraising Campaigns</h1>
          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={getImageUrl(campaign.image)}
                alt={campaign.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x300';
                }}
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">{campaign.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                    'bg-red-100 text-red-800'}`}>
                    {campaign.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{campaign.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(campaign.date).toLocaleDateString()}
                  </span>
                  {campaign.status === 'Active' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Donate Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCampaigns;
