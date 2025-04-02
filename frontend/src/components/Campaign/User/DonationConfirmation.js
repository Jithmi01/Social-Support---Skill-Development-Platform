import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const DonationConfirmation = () => {
  const location = useLocation()
  const { donorName, amount, campaignName } = location.state || {}

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8 text-center">
            <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-white">Thank You!</h2>
            <p className="mt-2 text-green-100">Your donation has been processed successfully</p>
          </div>

          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Donor Name</p>
                  <p className="font-medium text-gray-900">{donorName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount Donated</p>
                  <p className="font-medium text-gray-900">${amount}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Campaign</p>
                  <p className="font-medium text-gray-900">{campaignName}</p>
                </div>
              </div>
            </div>

            <Link
              to="/"
              className="block w-full bg-blue-600 text-center text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationConfirmation
