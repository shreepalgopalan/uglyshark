"use client"

import PayPalButton from "@/components/PayPalButton"
import { useCart } from "@/context/CartContext"

export default function CheckoutPage() {
  const { items, total } = useCart()

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="pt-40 px-4 max-w-[600px] mx-auto">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="font-bold mb-2">Order Summary</h2>
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span>{item.name} x {item.quantity}</span>
                <span>£{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>£4.99</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>£{(total + 4.99).toFixed(2)}</span>
            </div>
          </div>

          <div className="w-full">
            <PayPalButton />
          </div>
        </div>
      </main>
    </div>
  )
}
