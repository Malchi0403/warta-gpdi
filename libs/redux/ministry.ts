import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PetugasIbadah } from "../api";
type IbadahRayaData = { data: PetugasIbadah[] };
export interface MinistryState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datas: {
    "ibadah-raya"?: { data: PetugasIbadah[] };
    komsel?: { data: any[] };
    pemuda?: { data: any[] };
    "sekolah minggu"?: { data: any[] };
    "ibadah pria"?: { data: any[] };
    "ibadah wanita"?: { data: any[] };
    "doa jumat"?: { data: any[] };
    [key: string]: unknown; // untuk tab lainnya
  };
  loading: boolean;
  error: string | null;
  tabsActive: string | undefined;
  fetchedTabs: Record<string, boolean>;
  lastUpdated: Record<string, number>;
}

const initialState: MinistryState = {
  datas: {},
  loading: false,
  error: null,
  tabsActive: undefined,
  fetchedTabs: {},
  lastUpdated: {},
};

// Thunk: fetch data per tab
export const fetchMinistry = createAsyncThunk(
  "event/fetchMinistry",
  async (tab: string) => {
    const res = await fetch(
      `/komsel?tab=${tab === "Ibadah-Raya" ? `Ibadah Raya` : tab}`
    );
    if (!res.ok) throw new Error("Gagal fetch data");
    const result = await res.json(); // result.rows atau lainnya
    return { tab, data: result }; // pastikan sesuai!
  }
);

const ministrySlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.tabsActive = action.payload;
    },
    setFirstLoad: (state, action: PayloadAction<IbadahRayaData>) => {
      state.datas["ibadah-raya"] = action.payload;
      state.tabsActive = "Ibadah-Raya";
      state.fetchedTabs["Ibadah-Raya"] = true;
      state.lastUpdated["Ibadah-Raya"] = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMinistry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMinistry.fulfilled, (state, action) => {
        const { tab, data } = action.payload;

        if (!state.datas) state.datas = {};
        // if (!state.fetchedTabs) state.fetchedTabs = {};
        // if (!state.lastUpdated) state.lastUpdated = {};

        state.loading = false;
        state.datas[tab.toLowerCase()] = data;
        state.fetchedTabs[tab] = true;
        state.lastUpdated[tab] = Date.now();
      })
      .addCase(fetchMinistry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Terjadi kesalahan";
      });
  },
});

export const { setActiveTab, setFirstLoad } = ministrySlice.actions;
export default ministrySlice.reducer;
