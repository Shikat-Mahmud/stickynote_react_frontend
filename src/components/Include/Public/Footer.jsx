import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} <a href="https://eftakharmahmud.com/" className="text-blue-400">Saikat Mahmud</a>. All rights reserved.
    </footer>
  )
}

export default Footer