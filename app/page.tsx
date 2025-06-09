import React from 'react'
import Hero  from '../components/Hero'
import  WorshipSchedules  from '../components/WorshipSchedules'
import MinistryRoster  from '../components/MinistryRoster'
import Footer  from '../components/Footer'
import Header  from '../components/Header'
import Activity from '@/components/Activity'
import { Metadata } from 'next'
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
  const res = await fetch('http://gpdishekinah.online/api', {
    cache: 'no-store',
  });

  if (!res.ok) {
    return [];
  }

  const json = await res.json();
  return json.data || [];
}
export const metadata: Metadata = {
  title: "GPdI Shekinah Graha Harapan",
  description: "Selamat datang di halaman utama GPdI Shekinah GRAHA HARAPAN.",
};


async function getIbadahUmum(): Promise<any> {
  const res = await fetch('http://gpdishekinah.online/ibadahraya', {
    cache: 'no-store',
  });
  // const res = await fetch('http://localhost:3000/ibadahraya', {
  //   cache: 'no-store',
  // });

  if (!res.ok) {
    return [];
  }

  const json = await res.json();
  return json.data || [];
}


async function App() {
  
const video = await getFbVideos()
const ibadahRaya = await getIbadahUmum()
  return (
    <div suppressHydrationWarning className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Hero />
        <WorshipSchedules  ibadahData={ibadahRaya}/>
        <MinistryRoster />
        <Activity dataVideo={video} />
      </main>
      <Footer />
    </div>
  )
}
export default App
