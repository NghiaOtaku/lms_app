import { call, put, takeEvery, debounce, select } from 'redux-saga/effects';
import { addTypeCourse, getTypeCourse } from 'src/apis/course';
import { typeCourseActions } from './typeCourse.slice';
import { OthersAction } from '../others/slice';
function* _addTypeCourse({ payload }) {
    function* doRQ() {
        try {
            yield call(addTypeCourse, payload);
            yield put(OthersAction.showToasrt({ type: 'success', message: 'Lưu dữ liệu thành công' }));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Lưu dữ liệu không thành công' }));
        }
        yield call(_getTypeCourse, {});
        yield put(typeCourseActions.handleVisibleModal(false));
    }
    yield call(doRQ);
}

function* _getTypeCourse() {
    function* doRQ() {
        try {
            const filterForm = yield select((state) => state.typeCourses.filterForm);
            const res = yield call(getTypeCourse, filterForm);
            const { data } = res;
            yield put(typeCourseActions.getTypeCourseSuccess(data));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Lấy dữ liệu không thành công' }));
            yield put(typeCourseActions.getTypeCourseFailure());
        }
    }
    yield call(doRQ);
}

function* typeCourseSaga() {
    yield takeEvery(typeCourseActions.saveTypeCourse.type, _addTypeCourse);
    yield debounce(300, typeCourseActions.setFilter.type, _getTypeCourse);
}
export default typeCourseSaga;
