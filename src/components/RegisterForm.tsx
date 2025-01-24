"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    street: '',
    city: '',
    postcode: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      router.push('/login')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Street Address</label>
        <input
          type="text"
          value={formData.street}
          onChange={(e) => setFormData({...formData, street: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">City</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({...formData, city: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Postcode</label>
        <input
          type="text"
          value={formData.postcode}
          onChange={(e) => setFormData({...formData, postcode: e.target.value})}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Register
      </button>
    </form>
  )
}
