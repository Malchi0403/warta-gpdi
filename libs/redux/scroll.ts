import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScrollState {
  target: string | null;
}

const initialState: ScrollState = {
  target: null,
};

const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    setScrollTarget: (state, action: PayloadAction<string | null>) => {
      state.target = action.payload;
    },
  },
});

export const { setScrollTarget } = scrollSlice.actions;
export default scrollSlice.reducer;
