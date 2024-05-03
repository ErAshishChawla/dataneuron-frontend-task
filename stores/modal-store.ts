import { createStore } from "zustand/vanilla";

import { type User } from "@/types";

// Modal types
export enum ModalType {
  addUser = "AddUser",
  editUser = "EditUser",
}

// Data for the modal
export interface ModalData {
  user?: User;
}

// Modal state
export type ModalState = {
  type: ModalType | null;
  isOpen: boolean;
  data?: ModalData;
};

// Modal actions
export type ModalActions = {
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

// Combining modal state and actions to create modal store type
export type ModalStore = ModalState & ModalActions;

// Initial state for modal store
export const initModalStore = (): ModalState => {
  return { type: null, isOpen: false };
};

// Default initial state for modal store
export const defaultInitState: ModalState = {
  type: null,
  isOpen: false,
};

// Creating function to create modal store
export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    onOpen: (type, data) => {
      set({ isOpen: true, type, data });
    },
    onClose: () => {
      set({ isOpen: false });
    },
  }));
};
