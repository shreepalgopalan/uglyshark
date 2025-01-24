import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
  isMainPage?: boolean
}

function getCurrentDateTime() {
  return new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }) + ' LDN'
}

export default function Header({ isMainPage = false }: HeaderProps) {
  return (
    <header className={`fixed w-full z-40 ${isMainPage ? 'top-[13%]' : 'top-0'}`}>
      <div className="max-w-[1024px] mx-auto px-4 py-4">
        <Link href="/" className="block group">
          <h1 className="font-['Futura'] text-[34px] italic font-bold text-center tracking-tight transition-all duration-300 group-hover:text-[84px]">
            <span className="bg-blue-600 text-white px-2 py-0.5">UglyShark</span>
          </h1>
        </Link>
        <p className="text-center text-black text-[12px] font-['Courier']">
          {getCurrentDateTime()}
        </p>
      </div>
    </header>
  )
}
