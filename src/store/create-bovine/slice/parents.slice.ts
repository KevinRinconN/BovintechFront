import type { StateCreator } from "zustand";

export interface ParientsSlice {
  sire: string;
  dam: string;

  setSire: (sire: string) => void;
  setDam: (dam: string) => void;
}

export const createParentsSlice: StateCreator<ParientsSlice> = (set) => ({
  sire: "",
  dam: "",

  setSire: (sire: string) => set({ sire }),
  setDam: (dam: string) => set({ dam }),
});
