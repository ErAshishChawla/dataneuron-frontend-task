"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type ApiCountStore,
  createApiCountStore,
  initApiCountStore,
} from "@/stores/api-count-store";

// Creating context for api count store
export const ApiCountStoreContext =
  createContext<StoreApi<ApiCountStore> | null>(null);

export interface ApiCountStoreProviderProps {
  children: ReactNode;
}

// Creating provider for api count store
export const ApiCountStoreProvider = ({
  children,
}: ApiCountStoreProviderProps) => {
  // Creating store reference
  const storeRef = useRef<StoreApi<ApiCountStore>>();

  // Creating api count store if it doesn't exist
  if (!storeRef.current) {
    storeRef.current = createApiCountStore(initApiCountStore());
  }

  // Providing api count store context
  return (
    <ApiCountStoreContext.Provider value={storeRef.current}>
      {children}
    </ApiCountStoreContext.Provider>
  );
};

// Hook to use api count store
export const useApiCountStore = <T,>(
  selector: (store: ApiCountStore) => T
): T => {
  // Getting api count store context
  const apiCountStoreContext = useContext(ApiCountStoreContext);

  // Throwing error if api count store context doesn't exist
  if (!apiCountStoreContext) {
    throw new Error(
      `useApiCountStore must be use within ApiCountStoreProvider`
    );
  }

  // Returning api count store
  return useStore(apiCountStoreContext, selector);
};
