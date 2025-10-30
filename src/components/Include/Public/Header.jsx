import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold">{import.meta.env.VITE_APP_NAME || "StickyNote"}</Link>
        <nav className="space-x-4">
            <Link to="/home" className="hover:text-gray-300">Home</Link>
            <Link to="/about" className="hover:text-gray-300">About Us</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
        </nav>
    </header>
  )
}

export default Header