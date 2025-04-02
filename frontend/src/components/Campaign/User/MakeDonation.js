import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserIcon, CurrencyIcon } from 'lucide-react'

const MakeDonation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const campaign = location.state?.campaign
  
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [nameError, setNameError] = useState('')
  const [amountError, setAmountError] = useState('')

  const validateName = (value) => {
    if (!value) {
      setNameError('Name is required')
      return false
    }
    if (/[^a-zA-Z\s]/.test(value)) {
      setNameError('Name cannot contain numbers or special characters')
      return false
    }
    setNameError('')
    return true
  }

  const validateAmount = (value) => {
    if (!value) {
      setAmountError('Amount is required')
      return false
    }
    if (isNaN(value) || value <= 0) {
      setAmountError('Please enter a valid amount')
      return false
    }
    setAmountError('')
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isNameValid = validateName(name)
    const isAmountValid = validateAmount(amount)

    if (isNameValid && isAmountValid) {
      navigate('/card', {
        state: {
          donorName: name,
          amount: amount,
          campaignName: campaign?.name || 'Unknown Campaign'
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
            <h2 className="text-2xl font-bold">Make a Donation</h2>
            <p className="mt-2 text-blue-100">
              Supporting: {campaign?.name || 'Campaign'}
            </p>
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
                  className={`w-full pl-10 pr-3 py-2 border ${
                    nameError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    validateName(e.target.value)
                  }}
                />
              </div>
              {nameError && (
                <p className="mt-1 text-sm text-red-600">{nameError}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Donation Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">$</span>
                </div>
                <input
                  type="number"
                  className={`w-full pl-10 pr-3 py-2 border ${
                    amountError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    validateAmount(e.target.value)
                  }}
                />
              </div>
              {amountError && (
                <p className="mt-1 text-sm text-red-600">{amountError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              disabled={!name || !amount}
            >
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MakeDonation
