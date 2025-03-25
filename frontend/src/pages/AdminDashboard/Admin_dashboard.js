import React, { useEffect, useState } from 'react'
import { BriefcaseIcon, HeartHandshakeIcon, TrophyIcon,GraduationCap } from 'lucide-react'
import axios from 'axios'

const url1 = "http://localhost:4000/event/getAll";

const Dashboard = () => {
  const [donations, setDonations] = useState([])
  const [jobs, setJobs] = useState([])
  const [events, setEvents] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4000/adDonations/")
      .then((res) => setDonations(res.data))
      .catch((err) => console.error(err))

      axios.get("http://localhost:4000/jobHire/")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err))

      axios.get("http://localhost:4000/courses/")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err))

    axios
      .get(url1)
      .then((res) => setEvents(res.data.Event))
      .catch((err) => console.error(err))
  }, [])

  const totalDonations = donations.length
  const totalJobs = jobs.length
  const totalEvents = events.length
  const totalCourses = courses.length

  const stats = [
    {
      title: 'Total Job Posted',
      value: totalJobs,
      icon: <BriefcaseIcon size={40} />,
      color: 'bg-blue-900',
      progress: (totalJobs / 10) * 100,
    },
    {
      title: 'Total Donations',
      value: totalDonations,
      icon: <HeartHandshakeIcon size={40} />,
      color: 'bg-purple-700',
      progress: (totalDonations / 10) * 100,
    },
    {
      title: 'Total Events',
      value: totalEvents,
      icon: <TrophyIcon size={40} />,
      color: 'bg-green-700',
      progress: (totalEvents / 10) * 100,
    },
    {
      title: 'Total Courses',
      value: totalCourses,
      icon: <GraduationCap size={40} />,
      color: 'bg-red-700',
      progress: (totalCourses / 10) * 100,
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
