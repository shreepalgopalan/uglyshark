"use client"

import { useCart } from "@/context/CartContext"
import { useState } from "react"

type AddToCartButtonProps = {
  product: {
    id: string
    name: string
    price: number
    images: string[]
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState('Medium')

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      image: product.images[0]
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm text-black">Size</label>
        <select 
          className="w-full border border-black p-2 text-sm"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
          <option>X-Large</option>
        </select>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full bg-red-600 text-white py-3 text-sm hover:bg-red-700 transition-colors"
      >
        add to cart
      </button>
    </div>
  )
}
