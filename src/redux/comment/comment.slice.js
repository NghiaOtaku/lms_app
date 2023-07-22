import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    comments: [],
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        saveComment() {},
        getComment() {},
        getCommentSuccess(state, { payload }) {
            state.comments = payload;
        },
    },
});

// actions
export const commentActions = commentSlice.actions;

// selector

export const commentSelector = {
    comments: (state) => state['comment'].comments,
};
// reducer
const commentReducer = commentSlice.reducer;

export default commentReducer;
