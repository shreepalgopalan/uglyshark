"use client"

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [isAdminLogin, setIsAdminLogin] = useState(false)
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      ...credentials,
      userType: isAdminLogin ? 'admin' : 'customer',
      callbackUrl: isAdminLogin ? '/admin' : '/dashboard'
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
        <h1 className="font-futura text-[20px] uppercase mb-8">
          {isAdminLogin ? 'Admin Login' : 'Customer Login'}
        </h1>
        
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setIsAdminLogin(!isAdminLogin)}
            className="text-[12px] hover:bg-blue-600 hover:text-white px-[2px]"
          >
            Switch to {isAdminLogin ? 'Customer' : 'Admin'} Login
          </button>
        </div>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          className="w-full p-2 mb-6 border"
        />
        <button
          type="submit"
          className="w-full bg-black text-white p-2 hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  )
}
