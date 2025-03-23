import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  MailIcon,
  LockIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from 'lucide-react'
import axios from 'axios'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      const userRole = JSON.parse(userInfo).user.role
      if (userRole === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/userDash')
      }
    }
  }, [navigate])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    let role = ''
    if (email === 'admin@test.com' && password === 'admin1234') {
      role = 'admin'
    } else {
      role = 'user'
    }
    try {
      const response = await axios.post(
        'http://localhost:4000/auth/login',
        {
          email,
          password,
          role,
        },
      )
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      // Show success notification
      const notification = document.getElementById('notification')
      if (notification) {
        notification.classList.remove('hidden')
        setTimeout(() => notification.classList.add('hidden'), 3000)
      }
      setLoading(false)
      if (role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/userDash')
      }
    } catch (err) {
      setLoading(false)
      setError('Invalid email or password')
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Success Notification */}
        <div
          id="notification"
          className="hidden fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
          role="alert"
        >
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            <span>Login successful!</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
                <AlertCircleIcon className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <div className="text-center">
              <Link
                to="/register"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
