"use client"

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useCart } from "@/context/CartContext"

export default function PayPalButton() {
  const { items, total, clearCart } = useCart()

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "GBP",
    intent: "capture",
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons 
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "GBP",
                  value: (total + 4.99).toFixed(2),
                },
                description: `UglyShark Order - ${items.length} items`,
              },
            ],
          })
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture()
          if (order) {
            await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                paypalOrderId: order.id,
                items: items,
                total: total + 4.99,
              })
            })
            clearCart()
            // Redirect to success page
            window.location.href = '/order-success'
          }
        }}
      />
    </PayPalScriptProvider>
  )
}
