'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: [] as string[]
  })

  useEffect(() => {
    fetch(`/api/products/${resolvedParams.id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
  }, [resolvedParams.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const response = await fetch(`/api/products/${resolvedParams.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      router.push('/admin/products')
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-[10px] font-['var(--font-futura-light)'] mb-8">edit product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-['var(--font-futura-light)'] mb-2">name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-black border border-white/10 p-2 text-[10px]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-['var(--font-futura-light)'] mb-2">price</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full bg-black border border-white/10 p-2 text-[10px]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-['var(--font-futura-light)'] mb-2">category</label>
          <select 
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-black border border-white/10 p-2 text-[10px]"
          >
            <option value="clothing">clothing</option>
            <option value="accessories">accessories</option>
            <option value="skate">skate</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-['var(--font-futura-light)'] mb-2">description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-black border border-white/10 p-2 text-[10px]"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white p-2 text-[10px] hover:bg-red-700"
        >
          update product
        </button>
      </form>
    </div>
  )
}

const handleImageReorder = (startIndex: number, endIndex: number) => {
  const newImages = Array.from(formData.images)
  const [removed] = newImages.splice(startIndex, 1)
  newImages.splice(endIndex, 0, removed)
  setFormData({ ...formData, images: newImages })
}
