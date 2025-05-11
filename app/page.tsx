import React from 'react'
import Hero  from '../components/Hero'
import  WorshipSchedules  from '../components/WorshipSchedules'
import MinistryRoster  from '../components/MinistryRoster'
import Footer  from '../components/Footer'
import Header  from '../components/Header'
async function App() {
  const res = await fetch('https://backend.gpdishekinah.online/api/event', {
    cache: 'no-store', // Hindari cache agar selalu dapat data terbaru
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const posts = await res.json()
  return (
    <div suppressHydrationWarning className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Hero />
        <WorshipSchedules data={posts.data}/>
        <MinistryRoster />
      </main>
      <Footer />
    </div>
  )
}
export default App
