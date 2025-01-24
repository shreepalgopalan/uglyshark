import { redirect } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full bg-black border-b border-white/10 z-50">
        <div className="max-w-[1024px] mx-auto px-4 py-3">
          <h1 className="font-['var(--font-futura-light)'] text-sm">uglyshark admin</h1>
        </div>
      </nav>
      
      <div className="flex h-screen pt-12">
        <aside className="w-48 fixed h-full border-r border-white/10">
          <div className="p-4 space-y-2">
            <a href="/admin" className="block text-[10px] font-['var(--font-futura-light)'] hover:text-red-600">dashboard</a>
            <a href="/admin/products" className="block text-[10px] font-['var(--font-futura-light)'] hover:text-red-600">products</a>
            <a href="/admin/orders" className="block text-[10px] font-['var(--font-futura-light)'] hover:text-red-600">orders</a>
          </div>
        </aside>
        
        <main className="flex-1 ml-48 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}