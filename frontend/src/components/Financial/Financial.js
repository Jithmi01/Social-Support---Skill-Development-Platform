import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import logo from "../../assets/images/EmpowerHub.png";

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
      const amount = res.data.reduce((acc, row) => acc + parseInt(row.amount), 0)
      setTotalSum(amount)
    } catch (err) {
      alert(err.message)
    }
  }

  const generatePdf = () => {
    const doc = new jsPDF()

    const imgWidth = 20;
    const imgHeight = 20;
    const imgX = 10;
    const imgY = 10;

    const img = new Image()
    img.src = logo

    img.onload = function () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const imgBase64 = canvas.toDataURL('image/png')

      doc.addImage(imgBase64, 'PNG', imgX, imgY, imgWidth, imgHeight)

      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text('EmpowerHub - Skill Development & Learning Platform', 105, 20, { align: 'center' })

      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.text('No.40, Kaduwela Road, Malabe', 105, 28, { align: 'center' })
      doc.text('Tel: +94 77 444 5555 | Email: empowerhub@gmail.com', 105, 36, { align: 'center' })

      doc.setDrawColor(0, 0, 0)
      doc.setLineWidth(0.5)
      doc.line(10, 45, 200, 45)

      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('Donation Financial Report', 105, 55, { align: 'center' })

      doc.autoTable({
        startY: 65,
        columns: [
          { header: 'Donation Name', dataKey: 'donorName' },
          { header: 'Amount (Rs.)', dataKey: 'amount' },
          { header: 'Status', dataKey: 'status' },
        ],
        body: donation,
        theme: 'grid',
      })

      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text(`Total Donations: Rs. ${totalSum.toLocaleString()}`, 14, doc.autoTable.previous.finalY + 10)

      doc.save('Donation_Report.pdf')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Financial Overview</h1>
              <p className="text-blue-100 mt-2">Track the donation history</p>
            </div>
            <button 
              onClick={generatePdf} 
              className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-100"
            >
              Download Report
            </button>
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
                    <tr key={item._id} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.donorName || item.name}
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
                  <h3 className="text-xl font-semibold text-white">Total Donations</h3>
                  <p className="text-green-100 text-sm">All time contributions</p>
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