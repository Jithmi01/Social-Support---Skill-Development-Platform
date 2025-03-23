import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  XIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  DollarSignIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from 'lucide-react'

import axios from 'axios'
const DonateForm = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const nameDon = searchParams.get('name')
  const paid = 'Paid'
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState(paid)
  const [helpGiven, setHelpGiven] = useState(nameDon)
  const [amountError, setAmountError] = useState('')
  const [contactError, setContactError] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const validateName = (value) => {
    if (/\d/.test(value)) {
      setNameError('Name cannot contain numbers')
    } else if (/[^a-zA-Z\s]/.test(value)) {
      setNameError('Name cannot contain special characters')
    } else {
      setNameError('')
    }
  }
  const validateContact = (value) => {
    if (!/^\d{10}$/.test(value)) {
      setContactError('Enter a valid 10-digit contact number')
    } else {
      setContactError('')
    }
  }
  const validateAmount = (value) => {
    if (!/^\d+$/.test(value)) {
      setAmountError('Amount must be a valid number')
    } else {
      setAmountError('')
    }
  }
  const validateEmail = (value) => {
    if (!value.includes('@')) {
      setEmailError("Email must contain '@'")
    } else {
      setEmailError('')
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const donateData = {
      name,
      email,
      contact,
      amount,
      status,
      helpGiven,
    }
    axios
      .post('http://localhost:4000/donation/', donateData)
      .then(() => navigate('/cardDetails'))
      .catch((err) => console.error(`Error: ${err?.response?.data}`))
  }
  const handleClose = () => {
    navigate('/')
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <div className="absolute right-4 top-4">
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <XIcon size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
              <h2 className="text-2xl font-bold">Complete Your Donation</h2>
              <p className="mt-2 text-blue-100">Supporting: {nameDon}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`w-full pl-10 pr-3 py-2 border ${nameError ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  onChange={(e) => {
                    setName(e.target.value)
                    validateName(e.target.value)
                  }}
                />
                {!nameError && name && (
                  <CheckCircleIcon
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                  />
                )}
              </div>
              {nameError && (
                <p className="mt-1 text-sm text-red-600">{nameError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  className={`w-full pl-10 pr-3 py-2 border ${emailError ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    validateEmail(e.target.value)
                  }}
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Contact Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`w-full pl-10 pr-3 py-2 border ${contactError ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  onChange={(e) => {
                    setContact(e.target.value)
                    validateContact(e.target.value)
                  }}
                />
              </div>
              {contactError && (
                <p className="text-red-500 text-xs mt-1">{contactError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Donation Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSignIcon size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`w-full pl-10 pr-3 py-2 border ${amountError ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    validateAmount(e.target.value)
                  }}
                />
              </div>
              {amountError && (
                <p className="text-red-500 text-xs mt-1">{amountError}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Help Given To
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                value={nameDon || ''}
                disabled
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                disabled={
                  amountError || contactError || nameError || emailError
                }
              >
                <span>Proceed to Payment</span>
                <ChevronRightIcon size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default DonateForm
