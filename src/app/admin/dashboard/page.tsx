export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="border border-white/10 p-4">
        <h3 className="text-[10px] font-['var(--font-futura-light)']">total products</h3>
        <p className="text-2xl">{products.length}</p>
      </div>
      <div className="border border-white/10 p-4">
        <h3 className="text-[10px] font-['var(--font-futura-light)']">products by category</h3>
        {/* Category breakdown */}
      </div>
      <div className="border border-white/10 p-4">
        <h3 className="text-[10px] font-['var(--font-futura-light)']">recent updates</h3>
        {/* Recent activity */}
      </div>
    </div>
  )
}
