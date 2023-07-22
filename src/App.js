/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { OthersSelector, OthersAction } from 'src/redux/others/slice';
import routes from './routes';
import { useDispatch } from 'react-redux';
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Learning = React.lazy(() => import('./views/learning'));
const Home = React.lazy(() => import('./views/home'));

const App = () => {
    const dispatch = useDispatch();
    const toasrt = useSelector(OthersSelector.toasrt);
    useEffect(() => {
        if (toasrt.type)
            notification[toasrt.type]({
                description: toasrt.message,
            });
    }, [toasrt]);
    useEffect(() => {
        dispatch(OthersAction.getOptions());
    }, []);
    return (
        <BrowserRouter>
            <Suspense fallback={<Spin />}>
                <Routes>
                    <Route exact path="/login" name="Login Page" element={<Login />} />
                    <Route exact path="/learning/:code" name="Learning Page" element={<Learning />} />
                    <Route exact path="/" name="Home Page" element={<Home />} />
                    <Route path="/" name="Trang chủ" element={<DefaultLayout />}>
                        {routes.map((route, idx) => {
                            return route.element && <Route key={idx} path={route.path} name={route.name} element={<route.element />} />;
                        })}
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
