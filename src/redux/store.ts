import { create } from "zustand";

type Store = {
  image: File | null;
  setImage: (image: File | null) => void;
};

const useStore = create<Store>()((set) => ({
  image: null,
  setImage: (image) => set(() => ({ image })),
}));

export default useStore;
