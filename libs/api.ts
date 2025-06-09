export interface ScheduleInterface {
  title: string;
  date: string;
  time?: string;
  keluarga?: string;
  location: string;
  type : string
  music? : string
  pembicara_glory?:string
  pembicara_imanuel?:string
  pembicara_haleluya?:string
  onClickCustom?: () => void;
}
export interface PetugasIbadah {
  tanggal: string;
  ibadah_raya: string;
  wl: string;
  singer_1: string;
  singer_2: string;
  musik_1: string;
  musik_2: string;
  musik_3: string;
  kolektan_1: string;
  kolektan_2: string;
  tamborine_1: string;
  tamborine_2: string;
  multimedia_1: string;
  multimedia_2: string;
  pendoa_syafaat_1: string;
  pendoa_syafaat_2: string;
  penerima_tamu_1: string;
  penerima_tamu_2: string;
  pembaca_warta: string;
  perjamuan_1?: string;
  perjamuan_2?: string;
  perjamuan_3?: string;
  perjamuan_4?: string;
}

export interface Event {
  ID: number;
  eventName: string;
  event: EventDetail;
  dateEvent: string;
  komsel?: Komsel[];
}

export interface EventDetail {
  wl: string;
  singer: string[];
  music: string[];
  usher?: string[];
  kolekte: string[];
  pendoaSyafaat?: string[];
  multimedia: string[];
  tamborin?: string[];
  pembacaWarta?: string;
  perjamuan?: string[];
}

export interface Komsel {
  name: string;
  keluarga: string;
  dateKomsel: string;
  wl: string;
  music: string;
  alamat: string;
}
