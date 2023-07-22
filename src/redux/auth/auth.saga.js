import { call, put, takeEvery } from 'redux-saga/effects';
import { login as loginApi, googleLogin as googleLoginApi, register as registerApi, forgot as forgotApi } from 'src/apis/auth';
import { saveUser } from 'src/apis/user';
import { authActions } from './auth.slice';
import { OthersAction } from '../others/slice';

function* _login({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(loginApi, payload);

            const { data } = res;
            localStorage.setItem('currentUser', JSON.stringify(data));
            yield put(authActions.loginSuccess(data));
        } catch (error) {}
    }
    yield call(doRQ);
}
function* _register({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(registerApi, payload);
            const { data } = res;
            if (data) {
                yield put(OthersAction.showToasrt({ type: 'success', message: 'Đăng ký thành công' }));
            } else {
                yield put(OthersAction.showToasrt({ type: 'error', message: 'Đăng ký thất bại' }));
            }
        } catch (error) {}
    }
    yield call(doRQ);
}
function* _forgot({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(forgotApi, payload);
            const { data } = res;
            if (data) {
                yield put(OthersAction.showToasrt({ type: 'success', message: 'Thay đổi mật khẩu thành công' }));
            } else {
                yield put(OthersAction.showToasrt({ type: 'error', message: 'Thay đổi mật khẩu thất bại' }));
            }
        } catch (error) {}
    }
    yield call(doRQ);
}
function* _update({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(saveUser, payload);
            const { data } = res;
            localStorage.setItem('currentUser', JSON.stringify(data));
            yield put(authActions.loginSuccess(data));
            yield put(authActions.handleVisibleModal(false));
            yield put(OthersAction.showToasrt({ type: 'success', message: 'Thay đổi thông tin thành công' }));
        } catch (error) {
            yield put(OthersAction.showToasrt({ type: 'error', message: 'Thay đổi thông tin thất bại' }));
        }
    }
    yield call(doRQ);
}
function* _googleLogin({ payload }) {
    function* doRQ() {
        try {
            const res = yield call(googleLoginApi, payload);
            const { data } = res;
            localStorage.setItem('currentUser', JSON.stringify(data));
            yield put(authActions.loginSuccess(data));
        } catch (error) {}
    }
    yield call(doRQ);
}

function* authSaga() {
    yield takeEvery(authActions.login.type, _login);
    yield takeEvery(authActions.register.type, _register);
    yield takeEvery(authActions.forgotPassword.type, _forgot);
    yield takeEvery(authActions.googleLogin.type, _googleLogin);
    yield takeEvery(authActions.update.type, _update);
}
export default authSaga;
