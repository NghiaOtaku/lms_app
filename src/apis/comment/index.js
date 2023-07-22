import { userRequest } from 'src/services/axiosServices';
const LIST_URL = {
    ADD: `/comment/add`,
    GET_BY_MODEL: `/comment/getByModel`,
};

export const addComment = (model) => userRequest.post(LIST_URL.ADD, model);

export const getComment = (model) => userRequest.post(LIST_URL.GET_BY_MODEL, model);
