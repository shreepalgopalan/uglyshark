'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function NewProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'clothing',
    images: [] as string[]
  })
  
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) throw new Error('Upload failed')
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        category: 'clothing',
        images: []
      })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    
    setUploading(true)
    const files = Array.from(e.target.files)
    
    try {
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData()
          formData.append('file', file)
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })
          
          const { url } = await response.json()
          return url
        })
      )
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }))
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-[10px] font-['var(--font-futura-light)'] mb-8">new product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-['var(--font-futura-light)'] mb-2">name</label>
          <input
            type="text"
            required
            className="w-full bg-black border border-white/10 p-2 text-[10px]"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-[10px] font-['var(--font-futura-light)'] mb-2">price</label>
          <input
            type="number"
            required
            step="0.01"
            className="w-full bg-black border border-white/10 p-2 text-[10px]"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-[10px] font-['var(--font-futura-light)'] mb-2">category</label>
          <select 
            className="w-full bg-black border border-white/10 p-2 text-[10px]"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="clothing">clothing</option>
            <option value="accessories">accessories</option>
            <option value="skate">skate</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-['var(--font-futura-light)'] mb-2">description</label>
          <textarea
            required
            className="w-full bg-black border border-white/10 p-2 text-[10px]"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-[10px] font-['var(--font-futura-light)'] mb-2">
            images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full bg-black border border-white/10 p-2 text-[10px]"
          />
          
          {/* Image previews */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {formData.images.map((url, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={url}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-red-600 text-white p-2 text-[10px] hover:bg-red-700 disabled:bg-red-800"
        >
          {uploading ? 'uploading...' : 'add product'}
        </button>
      </form>
    </div>
  )
}
