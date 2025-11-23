export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { text } = req.body

  if (!text) {
    return res.status(400).json({ error: 'Text is required' })
  }

  try {
    // Use MyMemory Translation API (free, no API key required)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ar`
    )

    const data = await response.json()

    if (data.responseStatus === 200 || data.responseData) {
      return res.status(200).json({
        translation: data.responseData.translatedText
      })
    } else {
      throw new Error('Translation failed')
    }
  } catch (error) {
    console.error('Translation error:', error)
    return res.status(500).json({ error: 'Translation service error' })
  }
}
