import { call, put, takeEvery, debounce, select } from 'redux-saga/effects';
import {
    addCourse,
    getCourse,
    getCourseByCode,
    deleteCourse,
    registerCourse,
    getLearning,
    doneLesson,
    search,
    getLearningByUserId,
} from 'src/apis/course';
import { courseActions } from './course.slice';
import { OthersAction } from '../others/slice';

function* add({ payload }) {
    function* doRQ() {
        try {
            yield call(addCourse, payload);
            yield put(OthersAction.showToasrt({ type: 'success', message: 'Lưu dữ liệu thành công' }));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Lưu dữ liệu không thành công' }));
        }
        yield call(get, {});
        yield put(courseActions.handleVisibleModal(false));
    }
    yield call(doRQ);
}
function* get({ payload }) {
    function* doRQ() {
        try {
            const filterForm = yield select((state) => state.courses.filterForm);
            const res = yield call(getCourse, filterForm);
            const { data } = res;
            yield put(courseActions.getCourseSuccess(data));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Lấy dữ liệu không thành công' }));
            yield put(courseActions.getCourseFailure());
        }
    }
    yield call(doRQ);
}
function* _searchCourse({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(search, payload);
            const { data } = res;
            yield put(courseActions._searchCourseSuccess(data));
        } catch (error) {}
    }
    yield call(doRQ);
}
function* _doneLesson({ payload }) {
    function* doRQ() {
        try {
            yield call(doneLesson, payload);
        } catch (error) {}
    }
    yield call(doRQ);
}
function* _getAllLearning({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(getLearning, payload);
            const { data } = res;
            yield put(courseActions.getLearningSuccess(data));
        } catch (error) {
            yield put(courseActions.getLearningSuccess({}));
        }
    }
    yield call(doRQ);
}
function* _getLearningByUserId({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(getLearningByUserId, payload);
            const { data } = res;
            yield put(courseActions.getLearningByUserIdSuccess(data));
        } catch (error) {}
    }
    yield call(doRQ);
}
function* register({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(registerCourse, payload);
            const { data } = res;
            yield put(courseActions.registerCourseSuccess(data));
        } catch (error) {}
    }
    yield call(doRQ);
}
function* _deleteCourse({ payload }) {
    function* doRQ() {
        try {
            yield call(deleteCourse, payload);
            yield put(OthersAction.showToasrt({ type: 'success', message: 'Xóa dữ liệu thành công' }));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Xóa dữ liệu không thành công' }));
        }
        yield call(get, {});
    }
    yield call(doRQ);
}
function* getByCode({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(getCourseByCode, payload);
            const { data } = res;
            yield put(courseActions.getCourseByCodeSuccess(data));
        } catch (error) {}
    }
    yield call(doRQ);
}
function* courseSaga() {
    yield takeEvery(courseActions.saveCourse.type, add);
    yield takeEvery(courseActions.registerCourse.type, register);
    yield debounce(300, courseActions.setFilter.type, get);
    yield debounce(300, courseActions.searchCourse.type, _searchCourse);
    yield takeEvery(courseActions.getLearning.type, _getAllLearning);
    yield takeEvery(courseActions.getLearningByUserId.type, _getLearningByUserId);
    yield takeEvery(courseActions.getCourseByCode.type, getByCode);
    yield takeEvery(courseActions.deleteCourse.type, _deleteCourse);
    yield takeEvery(courseActions.done.type, _doneLesson);
}
export default courseSaga;
