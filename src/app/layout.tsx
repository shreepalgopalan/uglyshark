import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

const futuraHeavy = localFont({
  src: [
    {
      path: '../fonts/Futura_Heavy_Italic.woff2',
      weight: '800',
      style: 'italic',
    }
  ],
  variable: '--font-futura-heavy'
})

const Courier = localFont({
  src: '../fonts/courier.woff2',
  variable: '--font-courier'
})

export const metadata: Metadata = {
  title: "Uglyshark",
  description: "Premium streetwear and accessories",
};

import CartIcon from "@/components/CartIcon"
import LoginIcon from "@/components/LoginIcon"
import { CartProvider } from '@/context/CartContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${futuraHeavy.variable} ${Courier.variable}`}>
        <CartProvider>
          <LoginIcon />
          <CartIcon />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}