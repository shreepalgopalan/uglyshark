import axios from 'axios'
import * as cheerio from 'cheerio'

export async function fetchValetNews() {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }

  const response = await axios.get('https://www.valetmag.com/style/', { headers })
  const $ = cheerio.load(response.data)
  const articles = []

  $('.article').each((_, element) => {
    const title = $(element).find('h2').text().trim()
    const image = $(element).find('img').attr('src')
    const summary = $(element).find('.excerpt').text().trim()
    const link = $(element).find('a').attr('href')

    articles.push({
      title,
      image,
      summary,
      link
    })
  })

  return articles
}