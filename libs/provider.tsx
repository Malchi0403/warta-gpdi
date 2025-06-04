"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import  {store, persistor } from "./store/store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReduxProvider({ children } : any) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
