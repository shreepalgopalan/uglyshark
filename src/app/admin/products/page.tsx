'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductsList() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const handleBulkDelete = async () => {
    await Promise.all(
      selectedProducts.map(id => 
        fetch(`/api/products/${id}`, { method: 'DELETE' })
      )
    )
    // Refresh products list
  }
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === 'all' || product.category === category)
  )
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[10px] font-['var(--font-futura-light)']">products</h2>
        <Link 
          href="/admin/products/new" 
          className="bg-red-600 text-white px-4 py-2 text-[10px] hover:bg-red-700"
        >
          add new product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="border border-white/10 p-4">
            {product.images[0] && (
              <div className="relative aspect-square mb-4">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="text-[10px] font-['var(--font-futura-light)']">{product.name}</h3>
            <p className="text-[10px] text-white/60">${product.price}</p>
            <Link 
              href={`/admin/products/edit/${product.id}`}
              className="text-[10px] text-red-600 hover:text-red-500 mt-2 block"
            >
              edit product
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const duplicateProduct = async (productId: string) => {
  const product = await fetch(`/api/products/${productId}`).then(r => r.json())
  const newProduct = { ...product, name: `${product.name} (Copy)` }
  await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(newProduct)
  })
}
