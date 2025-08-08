import { IAPIToasterMessage } from "@/types/types";
import { create } from "zustand";

interface AppStoreProps {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  toasterMessage: IAPIToasterMessage | null;
  setToasterMessage: (message: IAPIToasterMessage) => void;
  clearToasterMessage: () => void;
}

const useAppStore = create<AppStoreProps>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  toasterMessage: null,
  setToasterMessage: (message) => set({ toasterMessage: message }),
  clearToasterMessage: () => set({ toasterMessage: null }),
}));

export default useAppStore;
