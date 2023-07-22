import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    loading: false,
    filterForm: { name: '', status: 0 },
    openModal: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserSuccess(state, { payload }) {
            state.loading = false;
            state.users = payload;
        },
        getUserFailure(state) {
            state.loading = false;
            state.users = [];
        },
        saveUserSuccess(state, { payload }) {
            state.users = [...state.users, payload];
        },
        saveUser(state) {
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
export const userActions = userSlice.actions;

// selector

export const userSelector = {
    users: (state) => state['users'].users,
    filterForm: (state) => state['users'].filterForm,
    openModal: (state) => state['users'].openModal,
    loading: (state) => state['users'].loading,
};
// reducer
const userReducer = userSlice.reducer;

export default userReducer;
