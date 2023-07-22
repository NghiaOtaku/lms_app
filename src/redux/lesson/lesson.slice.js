import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lessons: [],
    loading: false,
    filterForm: { name: '', courseId: '0', topicId: '0' },
    openModal: false,
};

const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        saveLesson(state) {
            state.loading = true;
        },
        deleteLesson(state) {
            state.loading = true;
        },
        getLessonSuccess(state, { payload }) {
            state.loading = false;
            state.lessons = payload;
        },
        getLessonFailure(state) {
            state.loading = false;
            state.lessons = [];
        },
        reset(state, { payload }) {
            state.filterForm = payload;
        },
        handleVisibleModal(state, { payload }) {
            state.openModal = payload;
        },
        setFilter(state, { payload }) {
            state.loading = true;
            state.filterForm = { ...state.filterForm, ...payload };
        },
    },
});

// actions
export const lessonActions = lessonSlice.actions;

// selector

export const lessonSelector = {
    lessons: (state) => state['lessons'].lessons,
    loading: (state) => state['lessons'].loading,
    filterForm: (state) => state['lessons'].filterForm,
    openModal: (state) => state['lessons'].openModal,
};
// reducer
const lessonReducer = lessonSlice.reducer;

export default lessonReducer;
