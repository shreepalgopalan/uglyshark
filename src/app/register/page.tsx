"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/verify-email-sent')
      } else {
        setError('Registration failed')
      }
    } catch (err) {
      setError('Something went wrong')
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="pt-40 px-4 max-w-[400px] mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Create Account</h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full border border-black p-2"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input 
              type="email" 
              className="w-full border border-black p-2"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block mb-1">Password</label>
            <input 
              type="password" 
              className="w-full border border-black p-2"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1">Confirm Password</label>
            <input 
              type="password" 
              className="w-full border border-black p-2"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-red-600 text-white py-3 hover:bg-red-700"
          >
            Create Account
          </button>
        </form>
      </main>
    </div>
  )
}
