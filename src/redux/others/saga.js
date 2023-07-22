import { put, delay, call, takeEvery } from 'redux-saga/effects';
import { OthersAction } from './slice';
import { getAll } from 'src/apis/options';

export function* callLoading(functionIsCalled) {
    yield put(OthersAction.changePageLoading(true));
    try {
        yield call(functionIsCalled);
        yield delay(100);
        yield put(OthersAction.changePageLoading(false));
    } catch (error) {
        yield put(OthersAction.changePageLoading(false));
    }
}
function* _getOptions({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(getAll, payload);
            const { data } = res;
            localStorage.setItem('options', JSON.stringify(data));
            yield put(OthersAction.saveOptions(data));
        } catch (error) {}
    }
    yield call(doRQ);
}
function* otherSaga() {
    yield takeEvery(OthersAction.getOptions.type, _getOptions);
}
export default otherSaga;
