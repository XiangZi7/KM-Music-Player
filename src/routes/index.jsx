import {Navigate, useRoutes} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import {Spinner} from "@nextui-org/react";

const Home = lazy(() => import('@/pages/Home'));
const Mini = lazy(() => import('@/pages/MiniPlayer'))
const Ml = lazy(() => import('@/pages/Ml'))
const Radio = lazy(() => import('@/pages/Radio'))
const Movie = lazy(() => import('@/pages/Movie'));
const Anim = lazy(() => import('@/pages/Anim'))
const Chat = lazy(() => import('@/pages/Chat'));
const Theme = lazy(() => import('@/pages/theme'))
const Test = lazy(() => import('@/pages/Test'))
const Search = lazy(() => import('@/pages/Search/index.jsx'))

const LoadingTip = Element => (
    <Suspense fallback={<Spinner/>}>
        <Element/>
    </Suspense>
);

const rootRouter = [
    // Navigate 重定向
    {path: '/', element: <Navigate to='/home'/>},
    {path: '/home', element: LoadingTip(Home)},
    {
        path: '/movie',
        element: LoadingTip(Movie),
        meta: {title: 'MV',},
        children: [{path: 'chat/:name', element: LoadingTip(Chat)}],
    },
    {path: '/chat', element: LoadingTip(Chat), meta: {title: 'AI',},},
    {path: '/ml', element: LoadingTip(Ml), meta: {title: '乐库'}},
    {path: '/mini', element: LoadingTip(Mini), meta: {title: '迷你播放器'}},
    {path: '/radio', element: LoadingTip(Radio), meta: {title: '电台'}},
    {path: '/anim', element: LoadingTip(Anim), meta: {title: '动漫'}},
    {path: '/theme', element: LoadingTip(Theme), meta: {title: '主题'}},
    {path: '/test', element: LoadingTip(Test), meta: {title: '测试'}},
    {path: '/search', element: LoadingTip(Search), meta: {title: '搜索'}},
];
const Router = () => {
    const routes = useRoutes(rootRouter);
    return routes;
};
export default Router;