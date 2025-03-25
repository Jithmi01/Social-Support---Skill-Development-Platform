import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Search, FilePlus, FileText, Plus } from 'lucide-react'
import DonationCard from './DonationCard'
import AddDonationModal from './AddDonationModal'
import logo from "../../assets/images/EmpowerHub.png";
import DeleteConfirmationModal from './DeleteConfirmationModal'
import jsPDF from 'jspdf'

const Ads = () => {
  const [donations, setDonations] = useState([])
  const [filteredDonations, setFilteredDonations] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    getDonations()
  }, [])
  useEffect(() => {
    filterDonations()
  }, [searchText, donations])
  const getDonations = async () => {
    try {
      const res = await axios.get('http://localhost:4000/adDonations/')
      setDonations(res.data)
      setFilteredDonations(res.data)
    } catch (err) {
      console.error(err)
    }
  }
  const filterDonations = () => {
    const filtered = donations.filter((donation) => {
      const query = searchText.toLowerCase()
      return (
        donation.name?.toLowerCase().includes(query) ||
        donation.location?.toLowerCase().includes(query) ||
        donation.smallDes?.toLowerCase().includes(query) ||
        donation.help?.toLowerCase().includes(query) ||
        donation.longDes?.toLowerCase().includes(query)
      )
    })
    setFilteredDonations(filtered)
  }
  const handleEdit = (id) => {
    navigate(`/update-ad/${id}`)
  }
  const handleDelete = (donation) => {
    setSelectedDonation(donation)
    setIsDeleteModalOpen(true)
  }
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/adDonations/${selectedDonation._id}`,
      )
      getDonations()
      setIsDeleteModalOpen(false)
    } catch (err) {
      console.error(err)
    }
  }
  const generatePdf = () => {
    const doc = new jsPDF();
  
    const imgWidth = 20;
    const imgHeight = 20;
    const imgX = 10;
    const imgY = 10;
  
    const img = new Image();
    img.src = logo; // Ensure 'logo' is properly defined in your code
  
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imgBase64 = canvas.toDataURL('image/png');
  
      // Add logo
      doc.addImage(imgBase64, 'PNG', imgX, imgY, imgWidth, imgHeight);
  
      // Header
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('EmpowerHub - Skill Development & Learning Platform', 105, 20, { align: 'center' });
  
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('No.40, Kaduwela Road, Malabe', 105, 28, { align: 'center' });
      doc.text('Tel: +94 77 444 5555 | Email: empowerhub@gmail.com', 105, 36, { align: 'center' });
  
      // Line separator
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(10, 45, 200, 45);
  
      // Title
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Donation Opportunities Report', 105, 55, { align: 'center' });
  
      // Table
      doc.autoTable({
        startY: 65,
        columns: [
          { header: 'Name', dataKey: 'name' },
          { header: 'Location', dataKey: 'location' },
          { header: 'Description', dataKey: 'smallDes' },
          { header: 'Help Required', dataKey: 'help' },
        ],
        body: donations, // Ensure 'donations' is correctly passed
        theme: 'grid',
        styles: { fontSize: 10 },
      });
  
      doc.save('Donation_Opportunities.pdf');
    };
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-6 px-6 md:px-10">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Donation Opportunities</h1>
          <p className="text-blue-100">
            Help make a difference in someone's life today
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search donations..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-blue-500 h-5 w-5" />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={generatePdf}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Create Donation Ad</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="text-gray-500 text-sm">Total Donations</p>
            <p className="text-3xl font-bold text-blue-900">
              {donations.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <p className="text-gray-500 text-sm">Active Campaigns</p>
            <p className="text-3xl font-bold text-green-700">
              {donations.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <p className="text-gray-500 text-sm">People Reached</p>
            <p className="text-3xl font-bold text-purple-700">1,250+</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.length > 0 ? (
            filteredDonations.map((donation) => (
              <DonationCard
                key={donation._id}
                donation={donation}
                onEdit={() => handleEdit(donation._id)}
                onDelete={() => handleDelete(donation)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <FilePlus className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No donations found
              </h3>
              <p className="mt-1 text-gray-500">
                Get started by creating a new donation notice.
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Donation
              </button>
            </div>
          )}
        </div>
      </div>
      <AddDonationModal
    isOpen={isAddModalOpen}
    handleCancel={() => setIsAddModalOpen(false)}
    handleOk={() => {
        setIsAddModalOpen(false);
        getDonations(); // Refresh data after submission
    }}
    selectedItem={selectedDonation}
/>

  
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Donation"
        message="Are you sure you want to delete this donation notice? This action cannot be undone."
      />
    </div>
  )
}
export default Ads
