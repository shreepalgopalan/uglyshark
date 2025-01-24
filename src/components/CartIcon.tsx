"use client"

import { useCart } from "@/context/CartContext"
import Image from "next/image"
import Link from "next/link"

export default function CartIcon() {
  const { items } = useCart()
  const cartItemsCount = items.length

  return (
    <Link href="/cart" className="fixed top-6 right-6 z-50">
      <div className="relative">
        <Image 
          src="/icons/shopping_cart.svg" 
          alt="Cart" 
          width={24} 
          height={24}
          className="text-black"
        />
        {cartItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {cartItemsCount}
          </span>
        )}
      </div>
    </Link>
  )
}
