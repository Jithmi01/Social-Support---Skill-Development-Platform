import React from 'react'
import { MapPin, Edit, Trash2, HelpCircle, Info } from 'lucide-react'
const DonationCard = ({ donation, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Card Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 text-white">
        <h3 className="font-bold text-xl truncate">{donation.name}</h3>
        <div className="flex items-center mt-2 text-blue-100">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{donation.location}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <div className="mb-4">
          <div className="flex items-start mb-2">
            <Info className="h-5 w-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-gray-600">{donation.smallDes}</p>
          </div>
          <div className="flex items-start">
            <HelpCircle className="h-5 w-5 mr-2 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700 font-medium">{donation.help}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">
            DETAILED DESCRIPTION
          </h4>
          <p className="text-gray-600 text-sm line-clamp-3">
            {donation.longDes}
          </p>
        </div>
      </div>
      
      {/* Card Actions */}
      <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-2">
        <button
          onClick={onEdit}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          aria-label="Edit"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          aria-label="Delete"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
export default DonationCard
