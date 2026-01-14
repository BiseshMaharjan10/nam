import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-center gap-4">
      <Link to="/home" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        Home
      </Link>
      <Link to="/contact"className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        Contact
      </Link>
      <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        Register
      </Link>
    </div>
  )
}

export default Header