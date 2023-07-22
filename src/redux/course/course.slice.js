import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: [],
    sCourses: [],
    course: {},
    listLearn: [],
    loading: false,
    learn: {},
    filterForm: { name: '', status: 0 },
    openModal: false,
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        saveCourse(state) {
            state.loading = true;
        },
        getCourseSuccess(state, { payload }) {
            state.loading = false;
            state.courses = payload.map((p) => {
                return { ...p, typeObj: p.type, type: p.type._id };
            });
        },
        getCourseFailure(state) {
            state.loading = false;
            state.courses = [];
        },
        _searchCourseSuccess(state, { payload }) {
            state.sCourses = payload.map((p) => {
                return { ...p, typeObj: p.type, type: p.type._id };
            });
        },
        getCourseByCodeSuccess(state, { payload }) {
            state.course = payload;
        },
        getLearningByUserIdSuccess(state, { payload }) {
            state.listLearn = payload;
        },
        getLearningSuccess(state, { payload }) {
            state.learn = payload;
        },
        searchCourse() {},
        done() {},
        getLearningByUserId() {},
        getLearning() {},
        registerCourse() {},
        getCourseByCode() {},
        deleteCourse(state) {
            state.loading = true;
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
export const courseActions = courseSlice.actions;

// selector

export const courseSelector = {
    courses: (state) => state['courses'].courses,
    listLearn: (state) => state['courses'].listLearn,
    learn: (state) => state['courses'].learn,
    course: (state) => state['courses'].course,
    sCourses: (state) => state['courses'].sCourses,
    filterForm: (state) => state['courses'].filterForm,
    openModal: (state) => state['courses'].openModal,
    loading: (state) => state['courses'].loading,
};
// reducer

const courseReducer = courseSlice.reducer;

export default courseReducer;
