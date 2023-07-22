import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    topics: [],
    loading: false,
    filterForm: { name: '', courseId: '0' },
    openModal: false,
};

const topicSlice = createSlice({
    name: 'topic',
    initialState,
    reducers: {
        saveTopic() {},
        deleteTopic(state) {
            state.loading = true;
        },
        getTopicSuccess(state, { payload }) {
            state.loading = false;
            state.topics = payload;
        },
        getTopicFailure(state) {
            state.loading = false;
            state.topics = [];
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
export const topicActions = topicSlice.actions;

// selector

export const topicSelector = {
    topics: (state) => state['topics'].topics,
    loading: (state) => state['topics'].loading,
    filterForm: (state) => state['topics'].filterForm,
    openModal: (state) => state['topics'].openModal,
};
// reducer
const topicReducer = topicSlice.reducer;

export default topicReducer;
