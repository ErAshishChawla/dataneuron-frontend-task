import { createStore } from "zustand/vanilla";

// Api count state
export type ApiCountState = {
  count: number;
};

// Api count actions
export type ApiCountActions = {
  increment: () => void;
};

// Combining api count state and actions to create api count store type
export type ApiCountStore = ApiCountState & ApiCountActions;

// Initial state for api count store
export const initApiCountStore = (): ApiCountState => {
  return { count: 0 };
};

// Default initial state for api count store
export const defaultInitState: ApiCountState = {
  count: 0,
};

// Creating function to create api count store
export const createApiCountStore = (
  initState: ApiCountState = defaultInitState
) => {
  return createStore<ApiCountStore>()((set) => ({
    ...initState,
    increment: () => {
      set((state) => ({ count: state.count + 1 }));
    },
  }));
};
