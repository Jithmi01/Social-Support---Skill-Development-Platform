import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboardIcon,
  HeartHandshakeIcon,
  HistoryIcon,
  BriefcaseIcon,
  TrophyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GraduationCap
} from 'lucide-react'
import Header from '../components/common/header_bar';
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboardIcon size={20} />,
    },
    {
      label: 'Advertisement',
      path: '/showAds',
      icon: <HeartHandshakeIcon size={20} />,
    },
    {
      label: 'Financial Overview',
      path: '/financial',
      icon: <HistoryIcon size={20} />,
    },
    {
      label: 'Job Portal',
      path: '/jobList',
      icon: <BriefcaseIcon size={20} />,
    },
    {
      label: 'Events',
      path: '/allEvent',
      icon: <TrophyIcon size={20} />,
    },
    {
      label: 'Campaigns',
      path: '/admin/campaigns',
      icon: <TrophyIcon size={20} />,
    },
    {
      label: 'Courses',
      path: '/courses',
      icon: <GraduationCap size={20} />,
    },
  ]
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${collapsed ? 'w-20' : 'w-64'} bg-blue-900 min-h-screen transition-all duration-300`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              {collapsed ? (
                <ChevronRightIcon size={20} />
              ) : (
                <ChevronLeftIcon size={20} />
              )}
            </button>
          </div>
          <nav className="mt-5">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-6 py-3 text-white hover:bg-blue-800 transition-colors duration-200 ${location.pathname === item.path ? 'bg-blue-800' : ''}`}
              >
                {item.icon}
                {!collapsed && (
                  <span className="ml-3 transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  )
}
export default AdminLayout
