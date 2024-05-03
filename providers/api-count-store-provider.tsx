"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type ApiCountStore,
  createApiCountStore,
  initApiCountStore,
} from "@/stores/api-count-store";

export const ApiCountStoreContext =
  createContext<StoreApi<ApiCountStore> | null>(null);

export interface ApiCountStoreProviderProps {
  children: ReactNode;
}

export const ApiCountStoreProvider = ({
  children,
}: ApiCountStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ApiCountStore>>();
  if (!storeRef.current) {
    storeRef.current = createApiCountStore(initApiCountStore());
  }

  return (
    <ApiCountStoreContext.Provider value={storeRef.current}>
      {children}
    </ApiCountStoreContext.Provider>
  );
};

export const useApiCountStore = <T,>(
  selector: (store: ApiCountStore) => T
): T => {
  const apiCountStoreContext = useContext(ApiCountStoreContext);

  if (!apiCountStoreContext) {
    throw new Error(
      `useApiCountStore must be use within ApiCountStoreProvider`
    );
  }

  return useStore(apiCountStoreContext, selector);
};
