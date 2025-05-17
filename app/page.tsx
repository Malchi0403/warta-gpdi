import React from 'react'
import Hero  from '../components/Hero'
import  WorshipSchedules  from '../components/WorshipSchedules'
import MinistryRoster  from '../components/MinistryRoster'
import Footer  from '../components/Footer'
import Header  from '../components/Header'
import Activity from '@/components/Activity'
interface dataThumbnail {
  uri: string;
  id: string;
}
interface Thumbnail {
  data:dataThumbnail[]
}
export interface VideoFacebook  {
  id: string;
  description?: string;
  title?: string;
  source: string;
  permalink_url: string;
 thumbnails: Thumbnail;
};

async function getFbVideos(): Promise<VideoFacebook[]> {
  const res = await fetch('https://gpdishekinah.online/api', {
    // wajib cache: 'no-store' agar selalu fresh (SSR)
    cache: 'no-store',
  });

  if (!res.ok) {
    return [];
  }

  const json = await res.json();
  return json.data || [];
}

async function App() {
  const res = await fetch('https://backend.gpdishekinah.online/api/event', {
    cache: 'no-store', // Hindari cache agar selalu dapat data terbaru
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
const video = await getFbVideos()
// console.log(video,'ini video')
  const posts = await res.json()
  return (
    <div suppressHydrationWarning className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Hero />
        <WorshipSchedules data={posts.data}/>
        <MinistryRoster />
        <Activity dataVideo={video} />
      </main>
      <Footer />
    </div>
  )
}
export default App
