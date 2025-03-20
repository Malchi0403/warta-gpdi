'use client'
import {
  BookOpenCheckIcon,
  CrossIcon,
  HandIcon,
  Handshake,
  HeartIcon,
  MicIcon,
  MonitorIcon,
  Music2Icon,
  MusicIcon,
  Wine
} from 'lucide-react'
import React, { cloneElement, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { EventDetail, getTitle } from './WorshipSchedules'
import { RootState } from '@/libs/store/store'
// interface ServiceRole {
//   title: string
//   name: string | string[]
//   icon: React.ReactNode
// }
// interface ScheduleEntry {
//   date: string
//   worshipLeader: string
//   singers: string[]
//   musicians: string[]
//   welcomeTeam: string[]
//   tambourine: string[]
//   offerings: string[]
//   intercession: string[]
//   communion?: boolean
//   preacher: string
// }
interface ServiceCardProps {
  title: string
  name: string | string[] | undefined
  icon: React.ReactNode
}


const ServiceCard: React.FC<ServiceCardProps> = ({ title, name, icon }  ) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-6 shadow-md border border-blue-100 hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-full mb-4">
        {cloneElement(icon as React.ReactElement<SVGSVGElement>, {
          className: 'h-8 w-8 text-blue-700',
        })}
      </div>
      <h3 className="font-bold text-lg mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-800">
        {title}
      </h3>
      {Array.isArray(name) ? (
        <div className="text-gray-600">
          {name.map((person, idx) => (
            <div key={idx}>{person}</div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">{name}</p>
      )}
    </div>
  )
}
export default function MinistryRoster() {
  const currentDate = new Date('2024-03-10')
  const dataMinistry = useSelector((state :RootState) => state.ministry);

  const isFirstSunday = currentDate.getDate() <= 7 && currentDate.getDay() === 0
  
  const dataService = useMemo(() => {
    if(dataMinistry.activeTab === 'umum') {
      if(dataMinistry.ministry ) {

        if( (dataMinistry?.ministry as EventDetail).perjamuan?.length === 0) {
          return (
            [
              {
                title: 'Worship Leader',
                name: dataMinistry?.ministry.wl,
                icon: <MicIcon />,
              },
              {
                title: 'Singer',
                name: (dataMinistry?.ministry as EventDetail).singer,
                icon: <Music2Icon />,
              },
              {
                title: 'Tim Musik',
                name: (dataMinistry?.ministry as EventDetail).music,
                icon: <MusicIcon />,
              },
              {
                title: 'Penerima Tamu',
                name: (dataMinistry?.ministry as EventDetail).usher,
                icon: <HeartIcon />,
              },
              {
                title: 'Tim Tamborin',
                name: (dataMinistry?.ministry as EventDetail).tamborin,
                icon: <Music2Icon />,
              },
              {
                title: 'Kolektan',
                name: (dataMinistry?.ministry as EventDetail).kolekte,
                icon: <HandIcon />,
              },
              {
                title: 'Doa Syafaat',
                name: (dataMinistry?.ministry as EventDetail).pendoaSyafaat,
                icon: <Handshake />,
              },
              {
                title: 'Multimedia',
                name: (dataMinistry?.ministry as EventDetail).multimedia,
                icon: <MonitorIcon />,
              },
              {
                title: 'Pembaca Warta',
                name: (dataMinistry?.ministry as EventDetail).pembacaWarta,
                icon: <BookOpenCheckIcon />,
              },
            ]
          )
        } else {
          return (
            [
              {
                title: 'Worship Leader',
                name: (dataMinistry?.ministry as EventDetail).wl,
                icon: <MicIcon />,
              },
              {
                title: 'Singer',
                name: (dataMinistry?.ministry as EventDetail).singer,
                icon: <Music2Icon />,
              },
              {
                title: 'Tim Musik',
                name: (dataMinistry?.ministry as EventDetail).music,
                icon: <MusicIcon />,
              },
              {
                title: 'Penerima Tamu',
                name: (dataMinistry?.ministry as EventDetail).usher,
                icon: <HeartIcon />,
              },
              {
                title: 'Tim Tamborin',
                name: (dataMinistry?.ministry as EventDetail).tamborin,
                icon: <Music2Icon />,
              },
              {
                title: 'Kolektan',
                name: (dataMinistry?.ministry as EventDetail).kolekte,
                icon: <HandIcon />,
              },
              {
                title: 'Doa Syafaat',
                name: (dataMinistry?.ministry as EventDetail).pendoaSyafaat,
                icon: <Handshake />,
              },
              {
                title: 'Multimedia',
                name: (dataMinistry?.ministry as EventDetail).multimedia,
                icon: <MonitorIcon />,
              },
              {
                title: 'Pembaca Warta',
                name: (dataMinistry?.ministry as EventDetail).pembacaWarta,
                icon: <BookOpenCheckIcon />,
              },
              {
                title: 'Pembaca Warta',
                name: (dataMinistry?.ministry as EventDetail).perjamuan,
                icon: <Wine />,
              },
            ]
          )
        }
      }
    } else if (dataMinistry.activeTab === 'pemuda') {
      if(dataMinistry.ministry) {
        return (
          [
            {
              title: 'Worship Leader',
              name: dataMinistry?.ministry.wl,
              icon: <MicIcon />,
            },
            {
              title: 'Singer',
              name: (dataMinistry?.ministry as EventDetail).singer,
              icon: <Music2Icon />,
            },
            {
              title: 'Tim Musik',
              name: dataMinistry?.ministry.music,
              icon: <MusicIcon />,
            },

            {
              title: 'Kolektan',
              name: (dataMinistry?.ministry as EventDetail).kolekte,
              icon: <HandIcon />,
            },
          
            {
              title: 'Multimedia',
              name: (dataMinistry?.ministry as EventDetail).multimedia,
              icon: <MonitorIcon />,
            },
           
          ]
        )
      }
    } else {
      if(dataMinistry.ministry) {
        return (
          [
            {
              title: 'Worship Leader',
              name: dataMinistry?.ministry.wl,
              icon: <MicIcon />,
            },
            {
              title: 'Musik',
              name: dataMinistry?.ministry.music,
              icon: <MusicIcon />,
            },           
          ]
        )
      }
    }
  },[dataMinistry])
  const [eventName, setEventName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  // const futureSchedules: ScheduleEntry[] = [
  //   {
  //     date: '17 Maret 2024',
  //     worshipLeader: 'Sdri. Esther',
  //     singers: ['Sdri. Anna', 'Sdr. Yohanes', 'Sdri. Maria'],
  //     musicians: ['Tim A'],
  //     welcomeTeam: ['Ibu Sarah', 'Bpk. Andreas'],
  //     tambourine: ['Tim B'],
  //     offerings: ['Tim B'],
  //     intercession: ['Bpk. Yohanes'],
  //     preacher: 'Pdt. Yusuf Santoso',
  //   },
  //   {
  //     date: '24 Maret 2024',
  //     worshipLeader: 'Bpk. Jonathan',
  //     singers: ['Sdr. Daniel', 'Sdri. Rachel', 'Sdri. Debora'],
  //     musicians: ['Tim B'],
  //     welcomeTeam: ['Ibu Martha', 'Bpk. Petrus'],
  //     tambourine: ['Tim A'],
  //     offerings: ['Tim A'],
  //     intercession: ['Ibu Ruth'],
  //     preacher: 'Ev. Sarah Gunawan',
  //   },
  //   {
  //     date: '31 Maret 2024',
  //     worshipLeader: 'Bpk. David',
  //     singers: ['Sdri. Hannah', 'Sdr. Samuel', 'Sdri. Priska'],
  //     musicians: ['Tim C'],
  //     welcomeTeam: ['Ibu Debora', 'Bpk. Markus'],
  //     tambourine: ['Tim C'],
  //     offerings: ['Tim C'],
  //     intercession: ['Bpk. Andreas'],
  //     preacher: 'Pdt. Yusuf Santoso',
  //   },
  //   {
  //     date: '7 April 2024',
  //     worshipLeader: 'Sdri. Maria',
  //     singers: ['Sdr. Yohanes', 'Sdri. Sarah', 'Sdri. Anna'],
  //     musicians: ['Tim A'],
  //     welcomeTeam: ['Ibu Ruth', 'Bpk. Samuel'],
  //     tambourine: ['Tim A'],
  //     offerings: ['Tim B'],
  //     intercession: ['Ibu Esther'],
  //     communion: true,
  //     preacher: 'Pdt. Yusuf Santoso',
  //   },
  // ]
  useEffect(() => {
    if(dataMinistry.eventName) {
      setEventName(dataMinistry.eventName)
    }
  if(dataMinistry.dateEvent) {
    setDate(dataMinistry.dateEvent)
  }
    
  }, [dataMinistry]);
  return (
    <section
      id="pelayanan"
      className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-800">
          Pelayanan {getTitle(eventName)}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {date}
          {isFirstSunday && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <CrossIcon className="w-4 h-4 mr-1" /> Minggu Perjamuan
            </span>
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataService?.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              name={service?.name}
              icon={service.icon}
            />
          ))}
        </div>
        {/* <div className="mt-12">
          <h3 className="text-xl font-bold text-center mb-6">
            Jadwal Pelayanan Mendatang
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Tanggal</th>
                  <th className="py-3 px-4 text-left">Worship Leader</th>
                  <th className="py-3 px-4 text-left">Singer</th>
                  <th className="py-3 px-4 text-left">Tim Musik</th>
                  <th className="py-3 px-4 text-left">Penerima Tamu</th>
                  <th className="py-3 px-4 text-left">Tamborin</th>
                  <th className="py-3 px-4 text-left">Kolektan</th>
                  <th className="py-3 px-4 text-left">Doa Syafaat</th>
                  <th className="py-3 px-4 text-left">Pengkhotbah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {futureSchedules.map((schedule, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {schedule.date}
                      {schedule.communion && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <CrossIcon className="w-3 h-3 mr-1" />
                          Perjamuan
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">{schedule.worshipLeader}</td>
                    <td className="py-3 px-4">{schedule.singers.join(', ')}</td>
                    <td className="py-3 px-4">{schedule.musicians}</td>
                    <td className="py-3 px-4">
                      {schedule.welcomeTeam.join(', ')}
                    </td>
                    <td className="py-3 px-4">{schedule.tambourine}</td>
                    <td className="py-3 px-4">{schedule.offerings}</td>
                    <td className="py-3 px-4">{schedule.intercession}</td>
                    <td className="py-3 px-4">{schedule.preacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </section>
  )
}
