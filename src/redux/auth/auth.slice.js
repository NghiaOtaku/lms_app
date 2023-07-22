import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    loading: false,
    openModal: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, { payload }) {
            state.loading = false;
            state.currentUser = payload;
        },
        login(state) {},
        register(state) {},
        update(state) {
            state.loading = true;
        },
        forgotPassword(state) {},
        googleLogin(state) {},
        logout(state) {
            localStorage.removeItem('currentUser');
            state.currentUser = {};
        },
        handleVisibleModal(state, { payload }) {
            state.openModal = payload;
        },
    },
});

export const authActions = authSlice.actions;
export const authSelector = {
    currentUser: (state) => state['auth'].currentUser,
    openModal: (state) => state['auth'].openModal,
    loading: (state) => state['auth'].loading,
};
const authReducer = authSlice.reducer;

export default authReducer;
