import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getFashionFeeds } from '@/lib/rssFeeds'
import { getStockXTrends } from '@/lib/stockxData'
import Link from 'next/link'

export const revalidate = 3600

export default async function NewsPage() {
  const [articles, stockxData] = await Promise.all([
    getFashionFeeds(),
    getStockXTrends()
  ])
  const topFiveArticles = articles.slice(0, 5)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header isMainPage={false} />
      
      <main className="pt-52 px-4 max-w-[1024px] mx-auto flex-grow">
        {/* News Section */}
        <div className="grid grid-cols-5 gap-8 mb-16">
          {topFiveArticles.map((article, index) => (
            <Link 
              href={article.link} 
              key={index}
              target="_blank"
              className="block border-b pb-6 group"
            >
              <div className="font-['Courier_New'] text-black">
                <h2 className="text-[14px] leading-tight mb-3 group-hover:bg-blue-600 group-hover:text-white px-[2px]">
                  {article.title}
                </h2>
                <div className="text-[12px] flex justify-between">
                  <span>{article.creator}</span>
                  <time>{article.date}</time>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* StockX Section */}
        <div className="border-t pt-8">
          <h2 className="font-['Futura'] text-[16px] text-black italic  text-center tracking-wider mb-6 inline-block hover:bg-blue-600 hover:text-white px-[2px] cursor-pointer">
            StockX Market Trends
          </h2>
          <div className="grid grid-cols-5 gap-8">
            {stockxData.map((item, index) => (
              <div key={index} className="font-['Courier_New'] text-black">
                <h3 className="text-[14px] mb-2 hover:bg-blue-600 hover:text-white px-[2px] cursor-pointer">
                  {item.name}
                </h3>
                <div className="text-[12px] flex justify-between">
                  <span>{item.price}</span>
                  <span className={item.change.includes('+') ? 'text-green-600' : 'text-red-600'}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}