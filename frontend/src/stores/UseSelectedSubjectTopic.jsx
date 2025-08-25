import { create } from 'zustand';

const UseSelectedSubjectTopic = create((set, get) => ({
    selectedSubject: null,
    selectedSubjects_Topics: null,
    selectedTopic: null,

    setSelectedSubject: (subject) => {
        set({ selectedSubject: subject });
    },

    setSelectedSubjects_Topics: (subjectId, topics) => {
        set({
            selectedSubjects_Topics: {
                ...get().selectedSubjects_Topics,
                [subjectId]: topics,
            },
        });
        console.log(
            subjectId,
            topics,
            'SelectedSubjects_Topics',
            get().selectedSubjects_Topics
        );
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
