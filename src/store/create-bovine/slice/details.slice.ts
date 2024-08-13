import type { StateCreator } from "zustand";

export interface DetailsSlice {
  breed: string;
  distinctiveTrait: string;
  dateOfBirth: string;
  gender: string;
  brand: string;

  setBreed: (breed: string) => void;
  setDistinctiveTrait: (distinctiveTrait: string) => void;
  setDateOfBirth: (dateOfBirth: string) => void;
  setGender: (gender: string) => void;
  setBrand: (brand: string) => void;
}

export const createDetailsSlice: StateCreator<DetailsSlice> = (set) => ({
  breed: "",
  distinctiveTrait: "",
  dateOfBirth: "",
  gender: "",
  brand: "",

  setBreed: (breed: string) => set({ breed }),
  setDistinctiveTrait: (distinctiveTrait: string) => set({ distinctiveTrait }),
  setDateOfBirth: (dateOfBirth: string) => set({ dateOfBirth }),
  setGender: (gender: string) => set({ gender }),
  setBrand: (brand: string) => set({ brand }),
});
