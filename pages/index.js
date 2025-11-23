import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })

      const data = await response.json()
      setTranslatedText(data.translation)
    } catch (error) {
      console.error('Translation error:', error)
      setTranslatedText('Error translating text')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Arabic Translator</title>
        <meta name="description" content="Translate text to Arabic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container">
        <h1>🌍 Arabic Translator</h1>
        <p className="subtitle">Translate any text to Arabic</p>

        <div className="translator-box">
          <div className="input-section">
            <label htmlFor="input">Enter text:</label>
            <textarea
              id="input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste text here..."
              rows="6"
            />
          </div>

          <button
            onClick={handleTranslate}
            disabled={loading || !inputText.trim()}
            className="translate-btn"
          >
            {loading ? 'Translating...' : 'Translate to Arabic →'}
          </button>

          <div className="output-section">
            <label htmlFor="output">Arabic translation:</label>
            <textarea
              id="output"
              value={translatedText}
              readOnly
              placeholder="Translation will appear here..."
              rows="6"
              dir="rtl"
              lang="ar"
            />
          </div>
        </div>

        <div className="info">
          <p>✨ Supports translation from any language to Arabic</p>
        </div>
      </main>
    </>
  )
}
