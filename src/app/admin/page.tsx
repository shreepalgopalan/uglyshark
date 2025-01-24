'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AdminPage() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('price', product.price)
    formData.append('description', product.description)
    formData.append('category', product.category)
    
    // Handle multiple image uploads
    for (let i = 0; i < product.images.length; i++) {
      formData.append('images', product.images[i])
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        setProduct({
          name: '',
          price: '',
          description: '',
          category: '',
          images: []
        })
        alert('Product added successfully')
      }
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header isMainPage={false} />
      
      <main className="pt-52 px-4 max-w-[1024px] mx-auto flex-grow">
        <h1 className="font-futura text-[20px] uppercase tracking-wider mb-8">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-['Courier_New'] text-[14px] mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
              className="w-full p-2 border"
              required
            />
          </div>

          <div>
            <label className="block font-['Courier_New'] text-[14px] mb-2">
              Price
            </label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})}
              className="w-full p-2 border"
              required
            />
          </div>

          <div>
            <label className="block font-['Courier_New'] text-[14px] mb-2">
              Description
            </label>
            <textarea
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              className="w-full p-2 border"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block font-['Courier_New'] text-[14px] mb-2">
              Category
            </label>
            <select
              value={product.category}
              onChange={(e) => setProduct({...product, category: e.target.value})}
              className="w-full p-2 border"
              required
            >
              <option value="">Select category</option>
              <option value="jackets">Jackets</option>
              <option value="shirts">Shirts</option>
              <option value="tops/sweaters">Tops/Sweaters</option>
              <option value="sweatshirts">Sweatshirts</option>
              <option value="pants">Pants</option>
              <option value="shorts">Shorts</option>
              <option value="hats">Hats</option>
              <option value="bags">Bags</option>
              <option value="accessories">Accessories</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>

          <div>
            <label className="block font-['Courier_New'] text-[14px] mb-2">
              Images
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setProduct({...product, images: Array.from(e.target.files || [])})}
              className="w-full p-2 border"
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 font-['Courier_New'] text-[14px] hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </main>

      <Footer />
    </div>
  )
}
