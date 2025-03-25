import React, { useEffect, useState } from 'react'

import axios from 'axios'
const Financial = () => {
  const [donation, setDonation] = useState([])
  const [totalSum, setTotalSum] = useState(0)
  useEffect(() => {
    getDonations()
  }, [])
  const getDonations = async () => {
    try {
      const res = await axios.get('http://localhost:4000/donation/')
      setDonation(res.data)
      const amount = res.data.reduce(
        (acc, row) => acc + parseInt(row.amount),
        0,
      )
      setTotalSum(amount)
    } catch (err) {
      alert(err.message)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <h1 className="text-2xl font-bold text-white">
              Financial Overview
            </h1>
            <p className="text-blue-100 mt-2">Track the donation history</p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Donation Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Amount (Rs.)
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donation.map((item, index) => (
                    <tr
                      key={item._id}
                      className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Total Donations
                  </h3>
                  <p className="text-green-100 text-sm">
                    All time contributions
                  </p>
                </div>
                <div className="text-3xl font-bold text-white">
                  Rs. {totalSum.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Financial
