import { configureStore } from "@reduxjs/toolkit";
import VoucherSlices from "./slices/VoucherSlices";

const store = configureStore({
  reducer: {
    voucher: VoucherSlices,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
