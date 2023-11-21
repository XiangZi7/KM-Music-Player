import { Navigate, useRoutes } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const Home = lazy(() => import('@/pages/Home'));
const Mini = lazy(() => import('@/pages/MiniPlayer'));
const ML = lazy(() => import('@/pages/ML'));
const Movie = lazy(() => import('@/pages/Movie'));
const Chat = lazy(() => import('@/pages/AIChat'));
const Theme = lazy(() => import('@/pages/Theme'));
const Test = lazy(() => import('@/pages/Test'))
const Search = lazy(() => import('@/pages/Searchs'))
const MovieDetails = lazy(() => import('@/pages/MovieDetails'))
const PlayList = lazy(() => import('@/pages/PlayList'))

const LoadingTip = (Element: React.LazyExoticComponent<() => JSX.Element>) => (
    <Suspense fallback={<Spin></Spin>}>
        <Element></Element>
    </Suspense>
)

const rootRouter = [
    // 重定向Home
    { path: '/', element: <Navigate to='/home/'></Navigate>, },
    { path: '/home', element: LoadingTip(Home), },
    { path: '/movie', element: LoadingTip(Movie), meta: { title: 'MV' }, },
    { path: '/chat', element: LoadingTip(Chat), meta: { title: 'AI' }, },
    { path: '/ml', element: LoadingTip(ML), meta: { title: 'Music Library' }, },
    { path: '/mini', element: LoadingTip(Mini), meta: { title: 'Mini Player' }, },
    { path: '/theme', element: LoadingTip(Theme), meta: { title: 'Theme' }, },
    { path: '/test', element: LoadingTip(Test), meta: { title: 'Test' }, },
    { path: '/search', element: LoadingTip(Search), meta: { title: 'Search' }, },
    { path: '/moviedetails', element: LoadingTip(MovieDetails), meta: { title: 'Movie Details' }, },
    { path: '/playlist', element: LoadingTip(PlayList), meta: { title: 'List Details' }, },
];

const Router = () => {
    const routes = useRoutes(rootRouter);
    return routes;
};
export default Router;


