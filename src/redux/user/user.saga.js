import { call, put, takeEvery, debounce, select } from 'redux-saga/effects';
import { getAll, saveUser } from 'src/apis/user';
import { userActions } from './user.slice';
import { OthersAction } from '../others/slice';

function* getUser() {
    function* doRQ() {
        try {
            const filterForm = yield select((state) => state.users.filterForm);
            const res = yield call(getAll, filterForm);
            const { data } = res;
            yield put(userActions.getUserSuccess(data));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Lấy dữ liệu không thành công' }));
            yield put(userActions.getUserFailure());
        }
    }
    yield call(doRQ);
}
function* addUser({ payload }) {
    function* doRQ() {
        try {
            yield call(saveUser, payload);
            yield put(OthersAction.showToasrt({ type: 'success', message: 'Lưu dữ liệu thành công' }));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Lưu dữ liệu không thành công' }));
        }
        yield call(getUser, {});
        yield put(userActions.handleVisibleModal(false));
    }
    yield call(doRQ);
}
function* userSaga() {
    yield debounce(300, userActions.setFilter.type, getUser);
    yield takeEvery(userActions.saveUser.type, addUser);
}
export default userSaga;
