"use client"

import { useCart } from "@/context/CartContext"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart()
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="fixed w-full z-40 top-0 bg-white">
        <nav className="max-w-[1024px] mx-auto px-4 py-4">
          <Link href="/" className="block">
            <h1 className="font-['Futura'] text-[42px] italic font-extrabold text-center tracking-tight">
              <span className="bg-red-600 text-white px-2 py-0.5">uglyshark</span>
            </h1>
          </Link>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="/news" className="text-black relative p-1 hover:bg-blue-600">news</Link>
            <Link href="/shop" className="text-black relative p-1 hover:bg-blue-600">shop</Link>
            <Link href="/lookbook" className="text-black relative p-1 hover:bg-blue-600">lookbook</Link>
          </div>
        </nav>
      </header>

      <main className="pt-40 px-4 max-w-[1024px] mx-auto">
        <h1 className="text-2xl font-bold text-black mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <p className="text-center text-black">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b pb-4">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={100} 
                    height={100} 
                    className="object-cover"
                  />
                  <div className="flex-1 text-black">
                    <h3 className="font-bold">{item.name}</h3>
                    <p>Size: {item.size}</p>
                    <p>£{item.price}</p>
                    <div className="flex gap-2 mt-2">
                      <select 
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="border p-1 text-black"
                      >
                        {[1,2,3,4,5].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-black hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-xl font-bold text-black">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-red-600 text-white py-3 text-sm hover:bg-red-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
