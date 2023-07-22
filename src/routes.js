import React from 'react';

const CourseDetails = React.lazy(() => import('./views/courseDetail'));
const Profile = React.lazy(() => import('./views/profile'));

const routes = [
    { path: '/courses/:code', name: 'Chi tiết khóa học', element: CourseDetails },
    { path: '/profile', name: 'Trang ca nhân', element: Profile },
];

export default routes;
