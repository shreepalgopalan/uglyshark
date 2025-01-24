import Image from 'next/image'
import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import { useCart } from '@/context/CartContext'

const prisma = new PrismaClient()

function getCurrentDateTime() {
  const now = new Date()
  const date = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  const time = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/London'
  })
  return `${date} LDN ${time}`
}

import CartIcon from "@/components/CartIcon"

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const { id: productId } = await params
  
  const product = await prisma.product.findFirst({
    where: {
      id: productId
    }
  })

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

      <main className="pt-40 px-4 max-w-[1024px] mx-auto text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-[4/5] relative bg-gray-100">
            <Image 
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-black">{product.name}</h2>
            <p className="text-sm text-black">{product.description}</p>
            <p className="text-sm text-black">£{product.price}</p>
          
            <AddToCartButton product={product} />

            <div className="space-y-2 pt-4 border-t border-gray-200">
              <p className="text-sm text-black">• {product.category}</p>
              <p className="text-sm text-black">• Made exclusively for uglyshark</p>
              <p className="text-sm text-black">• All sales are final</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

import AddToCartButton from "@/components/AddToCartButton"