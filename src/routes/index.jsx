import {Navigate, useRoutes} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import {Spin} from 'antd';

const Home = lazy(() => import('@/pages/Home/index'));
const Mini = lazy(() => import('@/pages/MiniPlayer/index'))
const Ml = lazy(() => import('@/pages/Ml/index'))
const Movie = lazy(() => import('@/pages/Movie/index'));
const Chat = lazy(() => import('@/pages/Chat/index'));
const Theme = lazy(() => import('@/pages/theme/index'))
const Test = lazy(() => import('@/pages/Test/index'))
const Search = lazy(() => import('@/pages/Search/index'))
const Moviedetails = lazy(() => import('@/pages/Moviedetails/index'))
const PlayList = lazy(() => import('@/pages/PlayList/index'))


const LoadingTip = (Element) => (
    <Suspense fallback={<Spin/>}>
        <Element/>
    </Suspense>
);

const rootRouter = [
    // Navigate 重定向
    {path: '/', element: <Navigate to='/home'/>},
    {path: '/home', element: LoadingTip(Home),},
    {path: '/movie', element: LoadingTip(Movie), meta: {title: 'MV'},},
    {path: '/chat', element: LoadingTip(Chat), meta: {title: 'AI',},},
    {path: '/ml', element: LoadingTip(Ml), meta: {title: '乐库'}},
    {path: '/mini', element: LoadingTip(Mini), meta: {title: '迷你播放器'}},
    {path: '/theme', element: LoadingTip(Theme), meta: {title: '主题'}},
    {path: '/test', element: LoadingTip(Test), meta: {title: '测试'}},
    {path: '/search', element: LoadingTip(Search), meta: {title: '搜索'}},
    {path: '/moviedetails', element: LoadingTip(Moviedetails), meta: {title: '电影详情'}},
    {path: '/playlist', element: LoadingTip(PlayList), meta: {title: '歌单详情'}},
];
const Router = () => {
    const routes = useRoutes(rootRouter);
    return routes;
};
export default Router;