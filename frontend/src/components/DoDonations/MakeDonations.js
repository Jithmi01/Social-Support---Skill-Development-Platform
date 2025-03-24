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

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    setName(value)
    setNameError(value ? '' : 'Name cannot be empty')
  }

  const handleContactChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 10) {
      setContact(value)
    }
    setContactError(value.length === 10 ? '' : 'Enter a valid 10-digit contact number')
  }

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    setAmount(value)
    setAmountError(value ? '' : 'Amount must be a valid number')
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    setEmailError(value.includes('@') ? '' : "Email must contain '@'")
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
              <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
              <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={18} className="text-gray-400" />
                </div>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${nameError ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg pl-10`}
                value={name}
                onChange={handleNameChange}
              />
              </div>
              {nameError && <p className="mt-1 text-sm text-red-600">{nameError}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon size={18} className="text-gray-400" />
                </div>
              <input
                type="email"
                className={`w-full px-3 py-2 border ${emailError ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg pl-10`}
                value={email}
                onChange={handleEmailChange}
              />
              </div>
              {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Contact Number</label>
              <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon size={18} className="text-gray-400" />
                </div>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${contactError ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg pl-10`}
                value={contact}
                onChange={handleContactChange}
              />
              </div>
              {contactError && <p className="mt-1 text-sm text-red-600">{contactError}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Donation Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSignIcon size={18} className="text-gray-400" />
                </div>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${amountError ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg pl-10`}
                value={amount}
                onChange={handleAmountChange}
              />
              </div>
              {amountError && <p className="mt-1 text-sm text-red-600">{amountError}</p>}
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
