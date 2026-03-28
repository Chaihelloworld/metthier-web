import { create } from 'zustand';

interface LoaderState {
  loading: boolean;
  count: number;
}

interface LoaderActions {
  start: () => void;
  stop: () => void;
}

const useLoaderStore = create<LoaderState & LoaderActions>((set) => ({
  loading: false,
  count: 0,

  start: () =>
    set((state) => ({
      count: state.count + 1,
      loading: true,
    })),

  stop: () =>
    set((state) => {
      const next = Math.max(state.count - 1, 0);
      return { count: next, loading: next > 0 };
    }),
}));

export default useLoaderStore;
