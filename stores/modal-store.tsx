import { createStore } from "zustand/vanilla";

import { type User } from "@/types";

export enum ModalType {
  addUser = "AddUser",
  editUser = "EditUser",
}

export interface ModalData {
  user?: User;
}

export type ModalState = {
  type: ModalType | null;
  isOpen: boolean;
  data?: ModalData;
};

export type ModalActions = {
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export type ModalStore = ModalState & ModalActions;

export const initModalStore = (): ModalState => {
  return { type: null, isOpen: false };
};

export const defaultInitState: ModalState = {
  type: null,
  isOpen: false,
};

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
