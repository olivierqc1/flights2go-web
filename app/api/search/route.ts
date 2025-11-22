import { NextRequest, NextResponse } from 'next/server'

const DESTINATIONS = {
  'BCN': { city: 'Barcelone', country: 'Espagne', flag: '🇪🇸' },
  'LIS': { city: 'Lisbonne', country: 'Portugal', flag: '🇵🇹' },
  'MAD': { city: 'Madrid', country: 'Espagne', flag: '🇪🇸' },
  'FCO': { city: 'Rome', country: 'Italie', flag: '🇮🇹' },
  'CDG': { city: 'Paris', country: 'France', flag: '🇫🇷' },
  'LHR': { city: 'Londres', country: 'Royaume-Uni', flag: '🇬🇧' },
  'DUB': { city: 'Dublin', country: 'Irlande', flag: '🇮🇪' },
  'AMS': { city: 'Amsterdam', country: 'Pays-Bas', flag: '🇳🇱' },
  'MEX': { city: 'Mexico City', country: 'Mexique', flag: '🇲🇽' },
  'BOG': { city: 'Bogotá', country: 'Colombie', flag: '🇨🇴' },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { origin, budget, period } = body

    // Récupérer l'URL de l'API depuis les variables d'environnement
    const SCRAPER_API_URL = process.env.SCRAPER_API_URL

    // Si l'API URL existe, on utilise le scraping réel
    if (SCRAPER_API_URL) {
      console.log('🔍 Using real scraping API:', SCRAPER_API_URL)
      
      try {
        const response = await fetch(`${SCRAPER_API_URL}/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            origin,
            budget,
            period,
          }),
          signal: AbortSignal.timeout(60000), // Timeout de 60 secondes
        })

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`)
        }

        const results = await response.json()
        console.log(`✅ Real API returned ${results.length} destinations`)
        return NextResponse.json(results)

      } catch (apiError) {
        console.error('❌ Error calling real API:', apiError)
        console.log('⚠️ Falling back to mock data')
        // Si l'API échoue, on retombe sur les mock data
      }
    }

    // Mode mock (si pas d'API URL ou si l'API a échoué)
    console.log('🎭 Using mock data')
    await new Promise(resolve => setTimeout(resolve, 2000))

    const results = Object.entries(DESTINATIONS).map(([code, info]) => {
      const basePrice = getMockPrice(code)
      return {
        city: info.city,
        country: info.country,
        code,
        price: basePrice,
        currency: 'CAD',
        flag: info.flag
      }
    }).filter(dest => dest.price <= budget)
      .sort((a, b) => a.price - b.price)

    return NextResponse.json(results)

  } catch (error) {
    console.error('❌ Fatal error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function getMockPrice(dest: string): number {
  const prices: { [key: string]: number } = {
    'BCN': 487, 'LIS': 512, 'MAD': 523, 'FCO': 695, 'CDG': 445,
    'LHR': 425, 'DUB': 745, 'AMS': 520, 'MEX': 623, 'BOG': 780
  }
  const basePrice = prices[dest] || 600
  const variation = (Math.random() - 0.5) * 0.2
  return Math.round(basePrice * (1 + variation))
}
```

---

# 🔧 CONFIGURER LES VARIABLES D'ENVIRONNEMENT SUR VERCEL

## Étape par étape :

### 1. Va sur ton projet Vercel
```
https://vercel.com/olivierqc17/flights2go-web
```

### 2. Clique sur "Settings" (en haut)

### 3. Dans le menu de gauche, clique sur "Environment Variables"

### 4. Ajoute une nouvelle variable :
```
┌─────────────────────────────────────────────────┐
│ Key (Name)                                      │
│ ┌─────────────────────────────────────────────┐│
│ │ SCRAPER_API_URL                             ││
│ └─────────────────────────────────────────────┘│
│                                                 │
│ Value                                           │
│ ┌─────────────────────────────────────────────┐│
│ │ https://ton-app.up.railway.app              ││
│ └─────────────────────────────────────────────┘│
│                                                 │
│ Environment                                     │
│ ☑ Production                                    │
│ ☑ Preview                                       │
│ ☐ Development                                   │
│                                                 │
│                          [Save]                 │
└─────────────────────────────────────────────────┘
