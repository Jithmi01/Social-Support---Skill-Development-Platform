import React from 'react'
import { LogOut, LogOutIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/EmpowerHub.png'
import { HeartIcon } from 'lucide-react';
const Header = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/login')
  }
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Replace with your actual logo */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <HeartIcon className="h-6 w-6 text-blue-800" />
            </div>
            <span className="ml-3 text-white text-xl font-semibold">
              EmpowerHub
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm text-white hover:text-blue-200 transition-colors duration-200"
          >
            <div size={18} className="mr-2" />
            <LogOut/>LogOut
          </button>
        </div>
      </div>
    </header>
  )
}
export default Header
