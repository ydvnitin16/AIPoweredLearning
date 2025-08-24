// src/stores/useFormStore.js
import { create } from "zustand";

export const useFormStore = create((set) => ({
  formData: {},
  setFormData: (data) => set({ formData: data }),
}));
