import Parser from 'rss-parser'

const parser = new Parser()

const FASHION_FEEDS = [
  'https://wwd.com/feed/',
  'https://fashionista.com/.rss/full/',
  'https://www.thefashionspot.com/feed/'
]

export async function getFashionFeeds() {
  const feedPromises = FASHION_FEEDS.map(async (url) => {
    try {
      const feed = await parser.parseURL(url)
      return feed.items.map(item => ({
        title: item.title,
        link: item.link,
        date: new Date(item.pubDate || '').toLocaleDateString(),
        creator: item.creator || item.author || 'Fashion Editorial',
        excerpt: item.contentSnippet?.slice(0, 150) + '...'
      }))
    } catch (error) {
      console.error(`Error fetching feed ${url}:`, error)
      return []
    }
  })

  const allFeeds = await Promise.all(feedPromises)
  return allFeeds.flat().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}