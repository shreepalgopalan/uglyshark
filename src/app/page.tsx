import Image from "next/image"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "UGLYSHARK®",
  description: "UGLYSHARK® Official Site",
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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="fixed w-full z-40 top-[13%]">
        <div className="max-w-[1024px] mx-auto px-4 py-4">
                  <Link href="/" className="block group">
            <h1 className="font-['Futura'] text-[34px] italic font-bold text-center tracking-tight transition-all duration-300 group-hover:text-[84px]">
              <span className="bg-blue-600 text-white px-2 py-0.5">UglyShark</span>
            </h1>
          </Link>
          <p className="text-center text-[12px] font-['Courier']">
            {getCurrentDateTime()}
          </p>
        </div>
      </header>
      <nav className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-25 -ml-[100px]">
        <ul className="space-y-2 text-[12px] font-['Courier'] text-left">
          {[
	    'News',
'Winter 2025 preview',
            'Winter 2025lookbook',
            'shop' ,           
            'random',
'stores',
'mailing list',
            'about',
            'contact'
          ].map((item) => (
            <li key={item}>
              <Link 
                href={`/${item.toLowerCase()}`}
                className="font-['Courier_New'] text-[14px] hover:bg-blue-600 p-1"
              >
                {item.toLowerCase()}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={25}
                  height={25}
                  className="invert"
                />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image
                  src="/icons/twitter.svg"
                  alt="X (Twitter)"
                  width={25}
                  height={25}
                  className="invert"
                />
              </a>
<a href="#" className="hover:opacity-70 transition-opacity">
                <Image
                  src="/icons/youtube.svg"
                  alt="X (Twitter)"
                  width={25}
                  height={25}
                  className="invert"
                />
              </a>

              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={25}
                  height={25}
                  className="invert"
                />
              </a>
            </div>
          </li>
        </ul>
         </nav>
      <footer className="fixed bottom-8 left-8 z-40">
        </footer>
    </div>
  )
}