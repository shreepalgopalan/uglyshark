import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { env } from '@/lib/env.config'

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
  
  return `${date} ${time} LDN `
}

import Header from "@/components/Header"

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header isMainPage={false} />
      {/* Shop page content */}
    </div>
  )
}