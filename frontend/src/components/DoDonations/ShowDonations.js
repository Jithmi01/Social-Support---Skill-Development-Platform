import React, { useEffect, useState } from 'react';
import { SearchIcon, FileTextIcon, TrashIcon, ArrowUpDownIcon } from 'lucide-react';
import axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/images/EmpowerHub.png";

const Donations = () => {
  const [donate, setDonate] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:4000/donation/')
      .then((res) => setDonate(res.data))
      .catch(() => alert('Failed to fetch donations'));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/donation/${id}`)
      .then(() => {
        alert('Donation record removed successfully');
        setDonate(donate.filter((item) => item._id !== id));
      })
      .catch(() => alert('Failed to remove donation'));
  };

  const handleSort = () => {
    const sortedDonations = [...donate].sort((a, b) => {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    });
    setDonate(sortedDonations);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredDonations = donate.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.email.toLowerCase().includes(searchText.toLowerCase()) ||
    item.contact.toLowerCase().includes(searchText.toLowerCase()) ||
    item.amount.toString().includes(searchText) ||
    item.helpGiven.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <h1 className="text-2xl font-bold text-white">Donation History</h1>
            <p className="text-blue-100 mt-2">Track and manage your contributions</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search donations..."
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                    <th className="px-6 py-3 font-semibold text-left border border-gray-300">Name</th>
                    <th className="px-6 py-3 font-semibold text-left border border-gray-300">Email</th>
                    <th className="px-6 py-3 font-semibold text-left border border-gray-300">Contact</th>
                    <th className="px-6 py-3 font-semibold text-left border border-gray-300 cursor-pointer" onClick={handleSort}>
                      Amount <ArrowUpDownIcon size={14} className="inline ml-1" />
                    </th>
                    <th className="px-6 py-3 font-semibold text-left border border-gray-300">Status</th>
                    <th className="px-6 py-3 font-semibold text-left border border-gray-300">Donated To</th>
                    <th className="px-6 py-3 font-semibold text-center border border-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonations.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 text-sm text-gray-900 border border-gray-300">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-300">{item.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-300">{item.contact}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 border border-gray-300">${item.amount}</td>
                      <td className="px-6 py-4 border border-gray-300">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-300">{item.helpGiven}</td>
                      <td className="px-6 py-4 text-center border border-gray-300">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        >
                          <TrashIcon size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;