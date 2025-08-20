import { create } from 'zustand';

const UseSelectedSubjectTopic = create((set, get) => ({
    selectedSubject: null,
    selectedTopic: null,

    setSelectedSubject: (subject) => {
        set({ selectedSubject: subject });
    },

    clearSelectedSubject: () => {
        set({ selectedSubject: null });
    },

    setSelectedTopic: (topic) => {
        set({ selectedTopic: topic });
    },

    clearSelectedTopic: () => {
        set({ selectedTopic: null });
    },

    
}));

export { UseSelectedSubjectTopic };
