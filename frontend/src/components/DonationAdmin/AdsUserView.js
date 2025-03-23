import React, { useEffect, useState, Component } from 'react'
import { Link } from 'react-router-dom'
import { MapPinIcon, HeartIcon, ChevronRightIcon } from 'lucide-react'
import axios from 'axios'
const AdsUserView = () => {
  const [ads, setAds] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:4000/adDonations/')
      .then((res) => setAds(res.data))
      .catch((err) => alert(err.message))
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Make a Difference Today
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our verified charitable causes and help create positive
            change in communities that need it most.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {ad.name}
                    </h3>
                    <span className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-2.5 py-0.5 rounded">
                      {ad.smallDes}
                    </span>
                  </div>
                  <HeartIcon
                    className="text-gray-300 group-hover:text-red-400 transition-colors duration-300"
                    size={24}
                  />
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPinIcon size={16} className="mr-1" />
                  <span className="text-sm">{ad.location}</span>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Support Needed
                  </h4>
                  <p className="text-gray-600">{ad.help}</p>
                </div>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                  {ad.longDes}
                </p>
                <Link
                  to={`/donate?name=${encodeURIComponent(ad.name)}`}
                  className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                >
                  <span className="font-medium">Support This Cause</span>
                  <ChevronRightIcon size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default AdsUserView
