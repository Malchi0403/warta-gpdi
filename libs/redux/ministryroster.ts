import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventDetail, Komsel, PetugasIbadah } from "../api";

interface Ministry {
    ministry: EventDetail |Komsel | PetugasIbadah | null;
    activeTab?:string
    dateEvent?:string
    eventName?:string
  }
const initialState:Ministry = {
    ministry: null,
  activeTab:'umum',
  dateEvent:'',
  eventName:''
};

const userSlice = createSlice({
  name: "ministry",
  initialState,
  reducers: {
    setMinistry: (state, action : PayloadAction<Ministry>) => {
      state.dateEvent = action.payload.dateEvent;
      state.eventName = action.payload.eventName;
      state.ministry = action.payload.ministry;
      state.activeTab = action.payload.activeTab;
    },
    
  
  },
});

export const { setMinistry } = userSlice.actions;
export default userSlice.reducer;
