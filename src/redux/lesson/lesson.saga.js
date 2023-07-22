import { call, put, takeEvery, debounce, select } from 'redux-saga/effects';
import { addLesson, getLesson, deleteLesson } from 'src/apis/course';
import { lessonActions } from './lesson.slice';
import { OthersAction } from '../others/slice';

function* _addLesson({ payload }) {
    function* doRQ() {
        try {
            yield call(addLesson, payload);
            yield put(OthersAction.showToasrt({ type: 'success', message: 'Lưu dữ liệu thành công' }));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Lưu dữ liệu không thành công' }));
        }
        yield call(_getLesson, {});
        yield put(lessonActions.handleVisibleModal(false));
    }
    yield call(doRQ);
}

function* _getLesson({ payload }) {
    function* doRQ() {
        try {
            const filterForm = yield select((state) => state.lessons.filterForm);
            const res = yield call(getLesson, filterForm);
            const { data } = res;
            yield put(lessonActions.getLessonSuccess(data));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Lấy dữ liệu không thành công' }));
            yield put(lessonActions.getLessonFailure());
        }
    }
    yield call(doRQ);
}
function* _deleteLesson({ payload }) {
    function* doRQ() {
        try {
            yield call(deleteLesson, payload);
            yield put(OthersAction.showToasrt({ type: 'success', message: 'Xóa dữ liệu thành công' }));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Xóa dữ liệu không thành công' }));
        }
        yield call(_getLesson, {});
    }
    yield call(doRQ);
}

function* lessonSaga() {
    yield takeEvery(lessonActions.saveLesson.type, _addLesson);
    yield debounce(300, lessonActions.setFilter.type, _getLesson);
    yield takeEvery(lessonActions.deleteLesson.type, _deleteLesson);
}
export default lessonSaga;
