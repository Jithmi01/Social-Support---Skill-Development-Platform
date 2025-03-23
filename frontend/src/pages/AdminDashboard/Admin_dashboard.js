import React, { useEffect, useState } from 'react'
import { BriefcaseIcon, HeartHandshakeIcon, TrophyIcon } from 'lucide-react'
import axios from 'axios'
const Dashboard = () => {
  const [donations, setDonations] = useState([])
  const [jobs, setJobs] = useState([])
  const [events, setEvents] = useState([])
  useEffect(() => {
    // Fetch data
    axios
      .get('http://localhost:4000/donation/')
      .then((res) => setDonations(res.data))
      .catch((err) => console.error(err))
    // Simulated job and event data
    setJobs([1, 2, 3, 4, 5]) // Replace with actual API call
    setEvents([1, 2, 3]) // Replace with actual API call
  }, [])
  const stats = [
    {
      title: 'Total Job Posted',
      value: jobs.length,
      icon: <BriefcaseIcon size={40} />,
      color: 'bg-blue-900',
      progress: (jobs.length / 10) * 100,
    },
    {
      title: 'Total Donations',
      value: donations.length,
      icon: <HeartHandshakeIcon size={40} />,
      color: 'bg-purple-700',
      progress: (donations.length / 10) * 100,
    },
    {
      title: 'Total Events',
      value: events.length,
      icon: <TrophyIcon size={40} />,
      color: 'bg-green-700',
      progress: (events.length / 10) * 100,
    },
  ]
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-xl shadow-lg p-6 text-white transform transition-transform duration-300 hover:scale-105`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-lg">{stat.title}</p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
      {/* Progress Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Details Bar</h2>
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{stat.title}</span>
              <span>{stat.value}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${stat.color} transition-all duration-500`}
                style={{
                  width: `${stat.progress}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Dashboard
