import { publicRequest, userRequest } from 'src/services/axiosServices';
const LIST_URL = {
    LOGIN: `/auth/login`,
    GOOGLE: `/auth/GoogleLogin`,
    REGISTER: `/auth/register`,
    SEND_OTP: `/auth/sendOtp`,
    GETCURRENTUSER: '/users/currentUser',
    FORGOT: '/auth/forgot-password',
};
export const login = (model) => publicRequest.post(LIST_URL.LOGIN, model);
export const forgot = (model) => publicRequest.post(LIST_URL.FORGOT, model);
export const sendOtp = (model) => publicRequest.post(LIST_URL.SEND_OTP + '/' + model.type, model);
export const googleLogin = (model) => publicRequest.post(LIST_URL.GOOGLE, model);
export const register = (model) => {
    return publicRequest.post(LIST_URL.REGISTER, model);
};
export const getCurrentUser = () => userRequest.get(LIST_URL.GETCURRENTUSER);
