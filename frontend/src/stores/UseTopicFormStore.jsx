// src/stores/useFormStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFormStore = create(
    persist(
        (set) => ({
            formData: {},
            setFormData: (data) => set({ formData: data }),
        }),
        { name: 'form-preference' }
    )
);
