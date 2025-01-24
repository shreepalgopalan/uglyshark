"use client"

import Image from "next/image"
import Link from "next/link"

export default function LoginIcon() {
  return (
    <Link href="/login" className="fixed top-6 right-16 z-50">
      <Image 
        src="/icons/login.svg" 
        alt="Login" 
        width={24} 
        height={24}
        className="text-black"
      />
    </Link>
  )
}
