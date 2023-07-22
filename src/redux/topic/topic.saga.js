import { call, put, takeEvery, debounce, select } from 'redux-saga/effects';
import { addTopic, getTopic, deleteTopic } from 'src/apis/course';
import { topicActions } from './topic.slice';
import { OthersAction } from '../others/slice';
function* _addTopic({ payload }) {
    function* doRQ() {
        try {
            yield call(addTopic, payload);
            yield put(OthersAction.showToasrt({ type: 'success', message: 'Lưu dữ liệu thành công' }));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Lưu dữ liệu không thành công' }));
        }
        yield call(_getTopic, {});
        yield put(topicActions.handleVisibleModal(false));
    }
    yield call(doRQ);
}

function* _getTopic({ payload }) {
    function* doRQ() {
        try {
            const filterForm = yield select((state) => state.topics.filterForm);
            const res = yield call(getTopic, filterForm);
            const { data } = res;
            yield put(topicActions.getTopicSuccess(data));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Lấy dữ liệu không thành công' }));
            yield put(topicActions.getTopicFailure());
        }
    }
    yield call(doRQ);
}

function* _deleteTopic({ payload }) {
    function* doRQ() {
        try {
            yield call(deleteTopic, payload);
            yield put(OthersAction.showToasrt({ type: 'success', message: 'Xóa dữ liệu thành công' }));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Xóa dữ liệu không thành công' }));
        }
        yield call(_getTopic, {});
    }
    yield call(doRQ);
}

function* topicSaga() {
    yield takeEvery(topicActions.saveTopic.type, _addTopic);
    yield debounce(300, topicActions.setFilter.type, _getTopic);
    yield takeEvery(topicActions.deleteTopic.type, _deleteTopic);
}
export default topicSaga;
