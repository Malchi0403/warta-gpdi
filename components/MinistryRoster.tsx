"use client";
import {
  BookOpenCheckIcon,
  HandIcon,
  Handshake,
  HeartIcon,
  MicIcon,
  MonitorIcon,
  Music2Icon,
  MusicIcon,
  Wine,
} from "lucide-react";
import React, { cloneElement, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PetugasIbadah } from "./WorshipSchedules";
import { RootState } from "@/libs/store/store";
import { setScrollTarget } from "@/libs/redux/scroll";

interface ServiceCardProps {
  title: string;
  name: string | string[] | undefined;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, name, icon }) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-6 shadow-md border border-blue-100 hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-full mb-4">
        {cloneElement(icon as React.ReactElement<SVGSVGElement>, {
          className: "h-8 w-8 text-blue-700",
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
  );
};
export default function MinistryRoster() {
  const dataMinistry = useSelector((state: RootState) => state.ministry);

  const dataService = useMemo(() => {
  if (dataMinistry.activeTab !== "umum") return [];

  const ministry = dataMinistry?.ministry as PetugasIbadah;

  const items = [
    {
      title: "Worship Leader",
      name: ministry?.wl,
      icon: <MicIcon />,
    },
    {
      title: "Singer",
      name: [ministry?.singer_1, ministry?.singer_2],
      icon: <Music2Icon />,
    },
    {
      title: "Tim Musik",
      name: [ministry?.musik_1, ministry?.musik_2, ministry?.musik_3],
      icon: <MusicIcon />,
    },
    {
      title: "Penerima Tamu",
      name: [ministry?.penerima_tamu_1, ministry?.penerima_tamu_2],
      icon: <HeartIcon />,
    },
    {
      title: "Tim Tamborin",
      name: [ministry?.tamborine_1, ministry?.tamborine_2],
      icon: <Music2Icon />,
    },
    {
      title: "Kolektan",
      name: [ministry?.kolektan_1, ministry?.kolektan_2],
      icon: <HandIcon />,
    },
    {
      title: "Doa Syafaat",
      name: [ministry?.pendoa_syafaat_1, ministry?.pendoa_syafaat_2],
      icon: <Handshake />,
    },
    {
      title: "Multimedia",
      name: [ministry?.multimedia_1, ministry?.multimedia_2],
      icon: <MonitorIcon />,
    },
    {
      title: "Pembaca Warta",
      name: ministry?.pembaca_warta,
      icon: <BookOpenCheckIcon />,
    },
  ];

  if (ministry?.perjamuan_1) {
    items.push({
      title: "Perjamuan",
      name: [
        ministry.perjamuan_1 as string,
        ministry.perjamuan_2 as string,
        ministry.perjamuan_3 as string,
        ministry.perjamuan_4 as string,
      ],
      icon: <Wine />,
    });
  }

  return items;
}, [dataMinistry]);

  // const [date, setDate] = useState<string>('');
  const dispatch = useDispatch();

  const pelayananRef = useRef<HTMLDivElement | null>(null);
  const scrollTarget = useSelector((state: RootState) => state.scroll);
  // useEffect(() => {
  // if(dataMinistry.dateEvent) {
  //   setDate(dataMinistry.dateEvent)
  // }
  // }, [dataMinistry]);
  useEffect(() => {
    if (scrollTarget.target === "pelayanan") {
      setTimeout(() => {
        window.scrollTo({
          top: pelayananRef.current?.offsetTop || 0,
          behavior: "smooth",
        });
      }, 100);
      dispatch(setScrollTarget(null));
    }
  }, [scrollTarget, dispatch]);
  return (
    <section
      ref={pelayananRef}
      id="pelayanan"
      className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-800">
          Pelayanan {dataMinistry.eventName}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {dataMinistry.dateEvent}
          {/* {(dataMinistry?.ministry as EventDetail).perjamuan?.length !== 0 && dataMinistry.activeTab === 'umum' && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <CrossIcon className="w-4 h-4 mr-1" /> Minggu Perjamuan
            </span>
          )} */}
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
      </div>
    </section>
  );
}
