import { create } from "zustand";

const useTagStore = create((set, get) => ({
  tags: [], 
}));

export default useTagStore;
