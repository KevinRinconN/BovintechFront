import { create } from "zustand";
import { ParientsSlice, createParentsSlice } from "./slice/parents.slice";
import { DetailsSlice, createDetailsSlice } from "./slice/details.slice";

type ShareState = ParientsSlice & DetailsSlice;

export const useParientsStepperStore = create<ShareState>()((...a) => ({
  ...createParentsSlice(...a),
  ...createDetailsSlice(...a),
}));
