"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type ModalStore,
  createModalStore,
  initModalStore,
} from "@/stores/modal-store";

// Creating context for modal store
export const ModalStoreContext = createContext<StoreApi<ModalStore> | null>(
  null
);

export interface ModalStoreProviderProps {
  children: ReactNode;
}

// Creating provider for modal store
export const ModalStoreProvider = ({ children }: ModalStoreProviderProps) => {
  // Creating store reference
  const storeRef = useRef<StoreApi<ModalStore>>();

  // Creating modal store if it doesn't exist
  if (!storeRef.current) {
    storeRef.current = createModalStore(initModalStore());
  }

  // Providing modal store context
  return (
    <ModalStoreContext.Provider value={storeRef.current}>
      {children}
    </ModalStoreContext.Provider>
  );
};

// Hook to use modal store
export const useModalStore = <T,>(selector: (store: ModalStore) => T): T => {
  // Getting modal store context
  const modalStoreContext = useContext(ModalStoreContext);

  // Throwing error if modal store context doesn't exist
  if (!modalStoreContext) {
    throw new Error(`useModalStore must be use within ModalStoreProvider`);
  }

  // Returning modal store
  return useStore(modalStoreContext, selector);
};
