import { createStore } from "zustand/vanilla";

export type ApiCountState = {
  count: number;
};

export type ApiCountActions = {
  increment: () => void;
};

export type ApiCountStore = ApiCountState & ApiCountActions;

export const initApiCountStore = (): ApiCountState => {
  return { count: 0 };
};

export const defaultInitState: ApiCountState = {
  count: 0,
};

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
