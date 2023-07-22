import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    typeCourses: [],
    loading: false,
    filterForm: { name: '' },
    openModal: false,
};

const typeCourseSlice = createSlice({
    name: 'typeCourse',
    initialState,
    reducers: {
        saveTypeCourse(state) {
            state.loading = true;
        },
        getTypeCourseSuccess(state, { payload }) {
            state.loading = false;
            state.typeCourses = payload;
        },
        getTypeCourseFailure(state) {
            state.loading = false;
            state.typeCourses = [];
        },
        setFilter(state, { payload }) {
            state.loading = true;
            state.filterForm = { ...state.filterForm, ...payload };
        },
        reset(state, { payload }) {
            state.filterForm = payload;
        },
        handleVisibleModal(state, { payload }) {
            state.openModal = payload;
        },
    },
});

// actions
export const typeCourseActions = typeCourseSlice.actions;

// selector

export const typeCourseSelector = {
    typeCourses: (state) => state['typeCourses'].typeCourses,
    loading: (state) => state['typeCourses'].loading,
    filterForm: (state) => state['typeCourses'].filterForm,
    openModal: (state) => state['typeCourses'].openModal,
};
// reducer
const typeCourseReducer = typeCourseSlice.reducer;

export default typeCourseReducer;
