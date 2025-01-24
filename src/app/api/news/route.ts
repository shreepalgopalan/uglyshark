import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'

export async function GET() {
  try {
    const response = await axios.get('https://www.valetmag.com/style/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.google.com'
      }
    })

    const $ = cheerio.load(response.data)
    const articles = []

    $('.style-article').each((_, element) => {
      const $element = $(element)
      articles.push({
        title: $element.find('.article-title').text().trim(),
        image: $element.find('img').attr('src'),
        summary: $element.find('.article-excerpt').text().trim(),
        date: $element.find('.article-date').text().trim(),
        url: $element.find('a').attr('href')
      })
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('News fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}
