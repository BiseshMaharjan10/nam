import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { login } from '../services/Api'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode' // Add this import

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
    if (!formData.email.trim()) {
      toast.error('Email is Required')
      return false
    }

    if (!formData.password.trim()) {
      toast.error('Password is Required')
      return false
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return false
    }

    return true // Add this - validation passed!
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return // Stop if validation fails

    try {
      const response = await login(formData)
      
      if (!response?.data?.success) {
        toast.error("Login Failed")
        return
      }

      // Store token
      localStorage.setItem("token", response?.data?.token)
      toast.success(response?.data?.message)

      // Decode token
      let decoded
      try {
        decoded = jwtDecode(response?.data?.token)
      } catch {
        toast.error("Invalid token")
        return
      }

      // Navigate based on role
      if (decoded.role === 'admin') {
        navigate("/admindash")
      } else {
        navigate("/userdash")
      }

    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          onClick={handleSubmit} 
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login