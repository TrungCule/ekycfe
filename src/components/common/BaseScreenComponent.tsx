import React from 'react'

const BaseScreenComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: 'url("https://res.cloudinary.com/dpnjutbws/image/upload/v1709969661/Eco_Vu_Hoang/login-bg_ib5diy.jpg")' }}>
        <div className="flex flex-[1] justify-between">
        <div className="mr-8">
          <img src="path-to-your-logo.png" alt="Logo" className="w-16 h-16" />
        </div>

        <div>
        <form className="bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {/* Your form fields go here */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Enter your username"
        />
      </div>
      {/* Add more form fields as needed */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Log In
      </button>
    </form>
        </div>
      </div>
    </div>
  )
}

export default BaseScreenComponent