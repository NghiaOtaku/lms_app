import { userRequest } from 'src/services/axiosServices';
const LIST_URL = {
    ADD: `/courses/add`,
    ADD_TOPIC: `/topics/add`,
    ADD_LESSON: `/lessons/add`,
    GET_LESSON: `/lessons/getByModel`,
    REGISTER_COURSE: `/learningCourse/register`,
    GET_L: `/learningCourse/getOne`,
    GET_TOPIC: `/topics/getByModel`,
    GET_TC: `/typeCourses/getByModel`,
    GET_LEARNING: `/learningCourse/get/`,
    GET_BY_MODEL: `/courses/getByModel`,
    SEARCH: `/courses/search`,
    GET_BY_CODE: `/courses/getByCode`,
    DELETE_LESSON: `/lessons/`,
    ADD_TC: `/typeCourses/add`,
    DELETE_TOPIC: `/topics/`,
    DELETE_COURSE: `/courses/`,
    DONE: `/learningCourse/done`,
};

export const registerCourse = (model) => userRequest.post(LIST_URL.REGISTER_COURSE, model);
export const addCourse = (model) => userRequest.post(LIST_URL.ADD, model);
export const addTypeCourse = (model) => userRequest.post(LIST_URL.ADD_TC, model);
export const getLearningByUserId = (model) => userRequest.get(LIST_URL.GET_LEARNING + model._id);
export const getLearning = (model) => userRequest.post(LIST_URL.GET_L, model);
export const doneLesson = (model) => userRequest.post(LIST_URL.DONE, model);
export const addTopic = (model) => userRequest.post(LIST_URL.ADD_TOPIC, model);
export const addLesson = (model) => userRequest.post(LIST_URL.ADD_LESSON, model);
export const getCourse = (model) => userRequest.post(LIST_URL.GET_BY_MODEL, model);
export const getTypeCourse = (model) => userRequest.post(LIST_URL.GET_TC, model);
export const search = (model) => userRequest.post(LIST_URL.SEARCH, model);
export const getTopic = (model) => userRequest.post(LIST_URL.GET_TOPIC, model);
export const getLesson = (model) => userRequest.post(LIST_URL.GET_LESSON, model);
export const getCourseByCode = (model) => userRequest.post(LIST_URL.GET_BY_CODE, model);
export const deleteLesson = (model) => userRequest.delete(LIST_URL.DELETE_LESSON + model._id);
export const deleteTopic = (model) => userRequest.delete(LIST_URL.DELETE_TOPIC + model._id);
export const deleteCourse = (model) => userRequest.delete(LIST_URL.DELETE_COURSE + model._id);
