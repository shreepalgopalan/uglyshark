import Link from 'next/link'

const footerLinks = [
  // Row 1
  { href: '/news', label: 'News' },
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/random', label: 'Random' },
  { href: '/stores', label: 'Stores' },
  // Row 2
  { href: '/mailing-list', label: 'Mailing List' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/sizing', label: 'Sizing' },
  // Row 3
  { href: '/faq', label: 'FAQ' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/shipping', label: 'Shipping & Delivery' }
]
export default function Footer() {
  return (
    <footer className="w-full py-4 mt-auto">
      <div className="max-w-[1024px] mx-auto px-2">
        <div className="mb-4">
          <Link
            href="/shop"
            className="font-['Courier_New'] text-black text-[12px] font-bold inline-block hover:bg-blue-600 hover:text-white px-[2px] cursor-pointer"
          >
            Shop
          </Link>
        </div>
        
        <div className="grid grid-cols-3 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-['Courier_New'] text-black text-[11px] inline-block hover:bg-blue-600 hover:text-white px-[2px] cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}