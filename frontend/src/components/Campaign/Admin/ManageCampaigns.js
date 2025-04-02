import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';

const ManageCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    date: '',
    status: 'Active'
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('http://localhost:4000/campaigns');
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form data
      if (!formData.name || !formData.description || !formData.date) {
        alert('Please fill in all required fields');
        return;
      }

      // Validate file
      if (!editingId && !selectedFile) {
        alert('Please select an image');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('date', formData.date);
      formDataToSend.append('status', formData.status);
      
      if (selectedFile) {
        formDataToSend.append('image', selectedFile);
      }

      console.log('Submitting data:', Object.fromEntries(formDataToSend));

      let response;
      if (editingId) {
        response = await axios.put(
          `http://localhost:4000/campaigns/${editingId}`, 
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        response = await axios.post(
          'http://localhost:4000/campaigns', 
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      console.log('Server response:', response.data);
      
      setIsModalOpen(false);
      setFormData({ name: '', description: '', image: '', date: '', status: 'Active' });
      setSelectedFile(null);
      setPreviewUrl(null);
      setEditingId(null);
      fetchCampaigns();
    } catch (error) {
      console.error('Submission error:', error.response || error);
      alert(error.response?.data?.error || 'Error saving campaign. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await axios.delete(`http://localhost:4000/campaigns/${id}`);
        fetchCampaigns();
      } catch (error) {
        console.error('Error deleting campaign:', error);
      }
    }
  };

  const getImageUrl = (imagePath) => {
    // If it's a preview URL, return as is
    if (imagePath?.startsWith('blob:')) {
      return imagePath;
    }
    // If it's a server path, prefix with backend URL
    if (imagePath) {
      return `http://localhost:4000${imagePath}`;
    }
    // Return a default image if none exists
    return 'https://via.placeholder.com/400x300';
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Manage Campaigns</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5" />
            Add Campaign
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={getImageUrl(campaign.image)}
                alt={campaign.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x300';
                }}
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{campaign.name}</h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(campaign._id);
                        setFormData(campaign);
                        setIsModalOpen(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(campaign._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">
                  {editingId ? 'Edit Campaign' : 'Add New Campaign'}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({ name: '', description: '', image: '', date: '', status: 'Active' });
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setEditingId(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                {/* Description field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows="2"
                    required
                  />
                </div>
                
                {/* Image upload field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Image</label>
                  <div className="mt-1 flex justify-center px-4 py-2 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="h-20 w-auto mx-auto" />
                      ) : (
                        <div className="flex flex-col items-center">
                          <svg className="h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                              <span>Upload a file</span>
                              <input type="file" className="sr-only" accept="image/*" onChange={handleFileSelect} />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Date and Status row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      min={getCurrentDate()}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setFormData({ name: '', description: '', image: '', date: '', status: 'Active' });
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setEditingId(null);
                    }}
                    className="px-3 py-1.5 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editingId ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCampaigns;
