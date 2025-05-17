import { VideoFacebook } from '@/app/page'
import React from 'react'
const Activity = ({ dataVideo }: { dataVideo: VideoFacebook[] }) => {
  return (
    <section className='p-3'>

        <h2 className="text-2xl md:text-3xl p-3 font-bold text-center tracking-widest mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-800">
          Video GPdI Shekinah
        </h2>
    <div className="px-6  flex flex-col sm:flex-row sm:flex-wrap gap-6 justify-center">
      {dataVideo.map((video) => (
        <div
          key={video.id}
          className="border rounded overflow-hidden shadow p-4 sm:max-w-[30%]  bg-white"
        >
          <div className="!aspect-video">
            <video className='w-full h-full '  poster={video.thumbnails?.data?.[0]?.uri || undefined}  playsInline controls preload="none">
      <source src={video.source} type="video/mp4" />

      
    </video>
          </div>
          <h1 className="mt-2 text-base font-semibold capitalize line-clamp-3 text-black">{video.title}</h1>
          <p className="mt-2 text-sm line-clamp-3 text-black">{video.description}</p>
        </div>
      ))}
    </div>
    </section>
  );
};

export default Activity