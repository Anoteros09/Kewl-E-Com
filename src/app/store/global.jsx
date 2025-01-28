import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  isLoading: true,
  error: null,
  success: null,
};

const useGlobalStore = create(
  devtools(
    (set) => ({
      ...initialState,
      setError: (error) => set({ error }),
      setSuccess: (success) => set({ success }),
      setIsLoading: (isLoading) => set({ isLoading }),
      reset: () => set({ ...initialState }),
    }),
    {
      name: "Global",
    }
  )
);

export default useGlobalStore;
