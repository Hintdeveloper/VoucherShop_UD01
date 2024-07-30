import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";

const initialState = [
  { id: 1, name: "Tiempo Legend 8", price: 3899 },
  { id: 2, name: "Mercurial Vapor 13", price: 3899 },
  { id: 3, name: "Mercurial Vapor 13", price: 3899 },
  { id: 4, name: "Mercurial Vapor 13", price: 3899 },
  { id: 5, name: "Mercurial Vapor 13", price: 3899 },
  { id: 6, name: "Mercurial Vapor 13", price: 3899 },
  { id: 7, name: "Mercurial Vapor 13", price: 3899 },
  { id: 8, name: "Mercurial Vapor 13", price: 3899 },
];

const voucherSlice = createSlice({
  name: "slice",
  initialState: initialState,
  reducers: {
    actionGetAll: (state, action) => {
      return state;
    },
    actionFindById: (state, action) => {
      const id = action.payload;
      state.find((item) => item.id === id);
    },
    actionAdd: (state, action) => {
      state.push(action.payload);
    },
    actionUpdate: (state, action) => {
      const { id, voucherUpdate } = action.payload;
      const idx = state.findIndex((item) => item.id === id);
      if (idx !== -1) {
        state[idx] = voucherUpdate;
      }
    },
    actionRemove: (state, action) => {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
  },
});

export const {
  actionGetAll,
  actionAdd,
  actionUpdate,
  actionRemove,
  actionFindById,
} = voucherSlice.actions;
export default voucherSlice.reducer;
export const getState = (sate: RootState) => sate.voucher;