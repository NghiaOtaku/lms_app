import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import courseReducer from './course/course.slice';
import userReducer from './user/user.slice';
import othersSlice from './others/slice';
import authReducer from './auth/auth.slice';
import authSaga from './auth/auth.saga';
import courseSaga from './course/course.saga';
import userSaga from './user/user.saga';
import otherSaga from './others/saga';
import topicReducer from './topic/topic.slice';
import topicSaga from './topic/topic.saga';
import typeCourseReducer from './typeCourse/typeCourse.slice';
import typeCourseSaga from './typeCourse/typeCourse.saga';
import lessonReducer from './lesson/lesson.slice';
import lessonSaga from './lesson/lesson.saga';
import commentReducer from './comment/comment.slice';
import commentSaga from './comment/comment.saga';
const rootReducer = combineReducers({
    auth: authReducer,
    others: othersSlice,
    courses: courseReducer,
    users: userReducer,
    topics: topicReducer,
    lessons: lessonReducer,
    comment: commentReducer,
    typeCourses: typeCourseReducer,
});
const composeEnhancer =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              shouldHotReload: false,
          })
        : compose;
function* rootSaga() {
    try {
        yield all([authSaga(), courseSaga(), userSaga(), otherSaga(), topicSaga(), lessonSaga(), commentSaga(), typeCourseSaga()]);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.trace(err);
    }
}
const sagaMiddleware = createSagaMiddleware();
const configStore = () => {
    const middleWares = [sagaMiddleware];
    const enhancers = [applyMiddleware(...middleWares)];
    const store = createStore(rootReducer, composeEnhancer(...enhancers));
    sagaMiddleware.run(rootSaga);
    return store;
};

export default configStore;
