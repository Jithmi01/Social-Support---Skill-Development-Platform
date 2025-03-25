import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notification } from 'antd';
import {
  CreditCardIcon,
  ShieldCheckIcon,
  LockIcon,
  CheckCircleIcon,
} from 'lucide-react'
import mastercardLogo from '../../assets/images/mastercard.png';
import paypalLogo from '../../assets/images/paypal.png';
import amexLogo from '../../assets/images/amexLogo.png';
import visa from '../../assets/images/visa.png';
const CardDetails = () => {
  const navigate = useNavigate()
  const [cardholderName, setCardholderName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cvc, setCvc] = useState('')
  const [nameError, setNameError] = useState('')
  const [cardNumberError, setCardNumberError] = useState('')
  const [cvcError, setCvcError] = useState('')

  const validateName = (value) => {
    if (!value) {
      setNameError('Please enter the cardholder name')
      return false
    }
    if (/[^a-zA-Z\s]/.test(value)) {
      setNameError('Name cannot contain numbers or special characters')
      return false
    }
    setNameError('')
    return true
  }

  const validateCardNumber = (value) => {
    if (!value) {
      setCardNumberError('Please enter your card number')
      return false
    }
    if (!/^\d{16}$/.test(value)) {
      setCardNumberError('Card number must be 16 digits')
      return false
    }
    setCardNumberError('')
    return true
  }
  const validateCVC = (value) => {
    if (!value) {
      setCvcError('Please enter CVC')
      return false
    }
    if (!/^\d{3}$/.test(value)) {
      setCvcError('CVC must be 3 digits')
      return false
    }
    setCvcError('')
    return true
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const isNameValid = validateName(cardholderName);
    const isCardNumberValid = validateCardNumber(cardNumber);
    const isCvcValid = validateCVC(cvc);

    if (isNameValid && isCardNumberValid && isCvcValid) {
        notification.success({ 
            message: 'Payment Successful', 
            description: 'Your Payment is Successful.' 
        });
        navigate('/showdonation');
    }
};
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-8 text-white">
            <h2 className="text-2xl font-bold">Secure Payment</h2>
            <p className="mt-2 text-gray-300">
              Your transaction is protected by SSL encryption
            </p>
            <div className="flex items-center space-x-4 mt-6">
            <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                <span className="font-bold text-xs"><img src={visa} alt="Amex" width={50} /></span>
              </div>
              
              <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                <span className="font-bold text-xs"><img src={mastercardLogo} alt="Mastercard" width={50} /></span>
              </div>
              <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                <span className="font-bold text-xs"><img src={paypalLogo} alt="PayPal" width={50} /></span>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Card Holder Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCardIcon size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`w-full pl-10 pr-3 py-2 border ${nameError ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder="John Doe"
                  value={cardholderName}
                  onChange={(e) => {
                    setCardholderName(e.target.value)
                    validateName(e.target.value)
                  }}
                />
                {!nameError && cardholderName && (
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
                Card Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ShieldCheckIcon size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`w-full pl-10 pr-3 py-2 border ${cardNumberError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  value={cardNumber}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, '')
                    setCardNumber(numericValue)
                    validateCardNumber(numericValue)
                  }}
                />
              </div>
              {cardNumberError && (
                <p className="text-red-500 text-xs mt-1">{cardNumberError}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">CVC</label>
              <div
                className="relative"
                style={{
                  width: '100px',
                }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`w-full pl-10 pr-3 py-2 border ${cvcError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="123"
                  maxLength={3}
                  value={cvc}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, '')
                    setCvc(numericValue)
                    validateCVC(numericValue)
                  }}
                />
              </div>
              {cvcError && (
                <p className="text-red-500 text-xs mt-1">{cvcError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300"
            >
              Complete Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default CardDetails
