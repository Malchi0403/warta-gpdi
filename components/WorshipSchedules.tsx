"use client";
import { PetugasIbadah, ScheduleInterface } from "@/libs/api";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { fetchMinistry, setActiveTab, setFirstLoad } from "@/libs/redux/ministry";
import { setMinistry } from "@/libs/redux/ministryroster";
import { setScrollTarget } from "@/libs/redux/scroll";
import { CalendarIcon, HomeIcon, UsersIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export const getTitle = (data: string) => {
  switch (data) {
    case "ibadahPagi":
      return "IBADAH I";
    case "ibadahSiang":
      return "IBADAH II";
    case "ibadahSore":
      return "IBADAH III";
    case "pemuda":
      return "Youth Service";
    default:
      return `Komsel ${data}`;
  }
};
function ScheduleCard({
  title,
  date,
  time,
  keluarga,
  location,
  type,
  pembicara_glory,
  pembicara_haleluya,
  pembicara_imanuel,
  music,
  onClickCustom,
}: ScheduleInterface) {
  if (
    type === "Pemuda" ||
    type === "Sekolah Minggu" ||
    type === "Ibadah Pria" ||
    type === "Ibadah Wanita"
  ) {
    return (
      <div
        onClick={onClickCustom}
        className="event-card bg-gradient-to-br from-white to-blue-300 cursor-pointer hover:shadow-xl transition duration-300"
      >
        <div className="card-title">
          {type === "Pemuda"
            ? "Youth Service"
            : type === "Ibadah Pria"
            ? "Men's Fellowship "
            : type === "Ibadah Wanita"
            ? "Women's Fellowship "
            : "Sunday School"}
        </div>

        <div className="detail-box">
          <div className="wl-box">
            <div className="role">WORSHIP LEADER</div>
            <div className="name">{title}</div>
          </div>

          {!pembicara_glory ? (
            <div className="speaker-box">
              <div className="role">PEMBICARA</div>
              <div className="name">{keluarga}</div>
            </div>
          ) : (
            <div className="speaker-box">
              <div className="role">
                {pembicara_haleluya === "" ? "PEMBICARA" : "KELAS GLORY"}{" "}
              </div>
              <div className="name">{pembicara_glory}</div>
            </div>
          )}
          {pembicara_imanuel && pembicara_imanuel !== "" && (
            <div className="speaker-box">
              <div className="role">KELAS IMANUEL</div>
              <div className="name">{pembicara_imanuel}</div>
            </div>
          )}
          {pembicara_haleluya && pembicara_haleluya !== "" && (
            <div className="speaker-box">
              <div className="role">KELAS HALELUYA</div>
              <div className="name">{pembicara_haleluya}</div>
            </div>
          )}
          {music && (
            <div className="speaker-box">
              <div className="role">Music</div>
              <div className="name">{music}</div>
            </div>
          )}
          <div className="detail-item">
            <div className="icon">📍</div>
            <div className="time-place">{location}</div>
          </div>

          <div className="detail-item">
            <div className="icon">🕖</div>
            <div className="time-place">
              {type === "Pemuda" || type === "Ibadah Pria"
                ? "Sabtu"
                : type === "Ibadah Wanita"
                ? "Selasa"
                : "Minggu"}
              , {date} | {time} WIB
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={onClickCustom}
        className=" min-h-44 flex flex-col cursor-pointer justify-between bg-gradient-to-br from-white to-blue-100 rounded-lg p-6 shadow-md min-w-full border border-blue-200 hover:shadow-xl transition duration-300"
      >
        <div className="flex justify-between   items-start mb-4">
          <div>
            <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-800">
              {title}
            </h3>
            <p className="text-gray-600">{date}</p>
          </div>
          <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
            {time} WIB
          </span>
        </div>
        {keluarga && keluarga !== "" && (
          <h4 className="text-base font-medium mb-2 text-gray-800">
            {keluarga}
          </h4>
        )}
        {location && location !== "" && (
          <p className="text-gray-600  flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {location}
          </p>
        )}
      </div>
    );
  }
}

type Bulan =
  | "januari"
  | "februari"
  | "maret"
  | "april"
  | "mei"
  | "juni"
  | "juli"
  | "agustus"
  | "september"
  | "oktober"
  | "november"
  | "desember";

const bulanMap: { [key in Bulan]: string } = {
  januari: "January",
  februari: "February",
  maret: "March",
  april: "April",
  mei: "May",
  juni: "June",
  juli: "July",
  agustus: "August",
  september: "September",
  oktober: "October",
  november: "November",
  desember: "December",
};

export default function WorshipSchedules({
  ibadahData,
}: {
  ibadahData: PetugasIbadah[];
}) {
  // const dataMinistry = useSelector((state: RootState) => state.ministry);
  const dispatch = useDispatch();
  const testPatch = useAppDispatch();
  const { datas, tabsActive, fetchedTabs, lastUpdated } = useAppSelector(
    (state) => state.event
  );
  const today = new Date().getTime();
  function formatDate(str: string): Date {
    const [tanggal, bulan, tahun] = String(str).toLowerCase().split(" ") as [
      string,
      Bulan,
      string
    ];
    const bulanInggris = bulanMap[bulan];
    return new Date(`${tanggal} ${bulanInggris} ${tahun}`);
  }
  

  useEffect(() => {
    if (ibadahData) {
      dispatch(
        setMinistry({
          activeTab: "umum",
          ministry: ibadahData?.filter(
            (a) => {
              if(a) {
                
                return formatDate(a?.tanggal).setHours(23, 59, 59, 999) >= today
              }
            }
          )[0],
          dateEvent: ibadahData?.filter(
            (a) => {
              if(a) {
                
                return formatDate(a?.tanggal).setHours(23, 59, 59, 999) >= today
              }
            }
          )[0].tanggal,
          eventName: ibadahData?.filter(
            (a) => {
              if(a) {
                
                return formatDate(a?.tanggal).setHours(23, 59, 59, 999) >= today
              }
            }
          )[0].ibadah_raya,
        })
      );
      testPatch(setFirstLoad({data:ibadahData}));
      
    }
  }, [ibadahData]);
  const tabStyle = (isActive: boolean) =>
    `flex items-center px-4 py-2 rounded-md mx-1 mb-2 cursor-pointer z-20 transition duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md "
        : "bg-gray-100 text-gray-500 hover:bg-gray-300 "
    }`;

  const handleTabClick = (tab: string) => {
    testPatch(setActiveTab(tab));
  };
  useEffect(() => {
    if (!tabsActive) return;

    const now = Date.now();
    const last = lastUpdated[tabsActive];
    const hasFetched = fetchedTabs[tabsActive];
    const sixHours = 6 * 60 * 60 * 1000;

    if (!hasFetched || !last || now - last > sixHours) {
      testPatch(fetchMinistry(tabsActive));
      
    }
  }, [tabsActive, testPatch,fetchedTabs,lastUpdated]);
  const getData = (key: "pemuda" | "komsel" | "sekolah minggu" | "ibadah wanita" | "ibadah pria" | "doa jumat") =>
  datas[key]?.data?.filter(
    a => formatDate(a.tanggal).setHours(23, 59, 59, 999) >= today
  ) ?? [];
  
  return (
    <section
      id="jadwal"
      className="py-12 md:py-16 bg-gradient-to-b from-white via-blue-50 to-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-800">
          Jadwal Ibadah
        </h2>
        <div className="flex flex-wrap justify-center mb-8">
          <button
            className={tabStyle(tabsActive === "Ibadah-Raya")}
            onClick={() => {
              handleTabClick("Ibadah-Raya");
            }}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Ibadah Umum
          </button>
            {getData("pemuda")?.length > 0 && (
          <button
            className={tabStyle(tabsActive === "Pemuda")}
            onClick={() =>
              handleTabClick("Pemuda")
            }
          >
            <UsersIcon className="h-4 w-4 mr-2" />
            Ibadah Pemuda
          </button>

            )}
              {getData("doa jumat")?.length > 0 && (
          <button
            className={tabStyle(tabsActive === "Doa Jumat")}
            onClick={() => {
              handleTabClick("Doa Jumat");
            }}
          >
            <HomeIcon className="h-4 w-4 mr-2" />
            Doa Jumat
          </button>
                
              )}
              {getData("sekolah minggu")?.length > 0 && (
          <button
            className={tabStyle(tabsActive === "Sekolah Minggu")}
            onClick={() => {
         
              handleTabClick("Sekolah Minggu");
            }}
          >
            <HomeIcon className="h-4 w-4 mr-2" />
            Sekolah Minggu
          </button>

              )}
              {getData("ibadah pria")?.length > 0 && (

          <button
            className={tabStyle(tabsActive === "Ibadah Pria")}
            onClick={() => {
              handleTabClick("Ibadah Pria");
            }}
          >
            <HomeIcon className="h-4 w-4 mr-2" />
            Ibadah Pria
          </button>
              )}
              {getData("ibadah wanita")?.length > 0 && (

          <button
            className={tabStyle(tabsActive === "Ibadah Wanita")}
            onClick={() => {
              handleTabClick("Ibadah Wanita");
            }}
          >
            <HomeIcon className="h-4 w-4 mr-2" />
            Ibadah Wanita
          </button>
              )}

              {getData("komsel")?.length > 0 && (

          <button
            className={tabStyle(tabsActive === "Komsel")}
            onClick={() => {
              handleTabClick("Komsel");
            }}
          >
            <HomeIcon className="h-4 w-4 mr-2" />
            Ibadah Komsel
          </button>
              )}

        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${
            tabsActive === "Ibadah-Raya" || tabsActive === "Komsel"
              ? "xl:grid-cols-3"
              : "xl:grid-cols-4"
          } place-items-center md:place-items-start gap-6 min-h-[443px]`}
        >
          {tabsActive === "Ibadah-Raya" && (
            <>
              {datas["ibadah-raya"]?.data
                ?.filter(
                  (a) =>
                    formatDate(a.tanggal).setHours(23, 59, 59, 999) >= today
                )
                ?.map((e, i) => (
                  <ScheduleCard
                    key={i}
                    title={e.ibadah_raya}
                    date={e.tanggal}
                    type={tabsActive}
                    time={
                      e.ibadah_raya === "Ibadah I"
                        ? "06:00"
                        : e.ibadah_raya === "Ibadah II"
                        ? "10:00"
                        : e.ibadah_raya === "Ibadah III"
                        ? "17:00"
                        : ""
                    }
                    location="GPdI Shekinah Graha Harapan"
                    onClickCustom={() => {
                      dispatch(
                        setMinistry({
                          activeTab: "umum",
                          dateEvent: e.tanggal,
                          ministry: e,
                          eventName: e.ibadah_raya,
                        })
                      );
                      dispatch(setScrollTarget("pelayanan"));
                    }}
                  />
                ))}
            </>
          )}
          {tabsActive === "Pemuda" && (
            <>
              {datas["pemuda"]?.data
                ?.filter(
                  (a) =>
                    formatDate(a.tanggal).setHours(23, 59, 59, 999) >= today
                )
                .map((e, i) => (
                  <ScheduleCard
                    key={i}
                    title={e.wl}
                    date={e.tanggal}
                    time={e.jam}
                    keluarga={e.pembicara}
                    type={tabsActive}
                    location={
                      e.tempat === "Gereja"
                        ? "GPdI Shekinah Graha Harapan"
                        : `Rumah ${e.tempat}`
                    }
                  />
                ))}
            </>
          )}
          {tabsActive === "Komsel" && (
            <>
              {datas["komsel"]?.data
                .filter(
                  (a) =>
                    formatDate(a.tanggal).setHours(23, 59, 59, 999) >= today
                )
                .map((e, i) => (
                  <ScheduleCard
                    key={i}
                    title={e.komsel}
                    date={e.tanggal}
                    time={e.jam}
                    type={tabsActive}
                    keluarga={e.tempat.split(",")[0]}
                    location={e.tempat.split(",")[1]}
                    onClickCustom={() => {
                      dispatch(
                        setMinistry({
                          activeTab: "keluarga",
                          ministry: e,
                          dateEvent: e.dateKomsel,
                          eventName: e.name,
                        })
                      );
                    }}
                  />
                ))}
            </>
          )}
          {tabsActive === "Sekolah Minggu" && (
            <>
              {datas["sekolah minggu"]?.data
                .filter(
                  (a) =>
                    formatDate(a.tanggal).setHours(23, 59, 59, 999) >= today
                )
                .map((e, i) => (
                  <ScheduleCard
                    key={i}
                    title={e.wl}
                    date={e.tanggal}
                    time={e.jam}
                    type={tabsActive}
                    pembicara_glory={e.pembicara_glory}
                    pembicara_imanuel={e.pembicara_imanuel}
                    pembicara_haleluya={e.pembicara_haleluya}
                    // keluarga={e.tempat.split(",")[0]}
                    location={"GPdI Shekinah Graha Harapan"}
                    onClickCustom={() => {
                      dispatch(
                        setMinistry({
                          activeTab: "keluarga",
                          ministry: e,
                          dateEvent: e.dateKomsel,
                          eventName: e.name,
                        })
                      );
                    }}
                  />
                ))}
            </>
          )}
          {tabsActive === "Ibadah Pria" && (
            <>
              {datas["ibadah pria"]?.data
                .filter(
                  (a) =>
                    formatDate(a.tanggal).setHours(23, 59, 59, 999) >= today
                )
                .map((e, i) => (
                  <ScheduleCard
                    key={i}
                    title={e.wl}
                    date={e.tanggal}
                    time={e.jam}
                    type={tabsActive}
                    keluarga={e.pembicara}
                    music={e.musik}
                    location={e.alamat}
                    onClickCustom={() => {
                      dispatch(
                        setMinistry({
                          activeTab: "keluarga",
                          ministry: e,
                          dateEvent: e.dateKomsel,
                          eventName: e.name,
                        })
                      );
                    }}
                  />
                ))}
            </>
          )}
          {tabsActive === "Ibadah Wanita" && (
            <>
              {datas["ibadah wanita"]?.data
                .filter(
                  (a) =>
                    formatDate(a.tanggal).setHours(23, 59, 59, 999) >= today
                )
                .map((e, i) => (
                  <ScheduleCard
                    key={i}
                    title={e.wl}
                    date={e.tanggal}
                    time={e.jam}
                    type={tabsActive}
                    keluarga={e.pembicara}
                    location={"GPdI Shekinah Graha Harapan"}
                    onClickCustom={() => {
                      dispatch(
                        setMinistry({
                          activeTab: "keluarga",
                          ministry: e,
                          dateEvent: e.dateKomsel,
                          eventName: e.name,
                        })
                      );
                    }}
                  />
                ))}
            </>
          )}
          {tabsActive === "Doa Jumat" && (
            <>
              {datas["doa jumat"]?.data
                .filter(
                  (a) =>
                    formatDate(a.tanggal).setHours(23, 59, 59, 999) >= today
                )
                .map((e, i) => (
                  <ScheduleCard
                    key={i}
                    title={e.pendoa}
                    date={e.tanggal}
                    time={e.jam}
                    type={tabsActive}
                    // keluarga={e.tempat.split(",")[0]}
                    location={"GPdI Shekinah Graha Harapan"}
                    onClickCustom={() => {
                      dispatch(
                        setMinistry({
                          activeTab: "keluarga",
                          ministry: e,
                          dateEvent: e.dateKomsel,
                          eventName: e.name,
                        })
                      );
                    }}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
