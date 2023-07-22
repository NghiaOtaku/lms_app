import { call, put, takeEvery } from 'redux-saga/effects';
import { addComment, getComment } from 'src/apis/comment';
import { commentActions } from './comment.slice';

function* _addComment({ payload }) {
    function* doRQ() {
        yield call(addComment, payload);
    }
    yield call(doRQ);
}

function* _getComment({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(getComment, payload);
            const { data } = res;
            yield put(commentActions.getCommentSuccess(data));
        } catch (error) {}
    }
    yield call(doRQ);
}

function* commentSaga() {
    yield takeEvery(commentActions.saveComment.type, _addComment);
    yield takeEvery(commentActions.getComment.type, _getComment);
}
export default commentSaga;
