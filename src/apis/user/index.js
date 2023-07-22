import { userRequest } from 'src/services/axiosServices';
const LIST_URL = {
    GetAll: `/users/getAll`,
    SaveUser: `/users/addUser`,
};
export const getAll = (model) => userRequest.post(LIST_URL.GetAll, model);
export const saveUser = (model) => userRequest.post(LIST_URL.SaveUser, model);
