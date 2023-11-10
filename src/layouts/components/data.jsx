import {Film, Home, Layout, Music, PlayCircle, Thermometer, Trello} from 'react-feather';
import {ReactNode} from "react";

// 根据路由表生成对应的路由规则
export const items = [{
    title: "Apps",
    children: [
        {path: '/home', title: "Home", icon: <Home className="text-2xl"/>},
        {path: '/ml', title: "Music library", icon: <Music className="text-2xl"/>},
        {path: '/movie', title: "Movie", icon: <Film className="text-2xl"/>},
        {path: '/mini', title: "Mini Player", icon: <Trello className="text-2xl"/>},
        {path: '/chat', title: "AI", icon: <PlayCircle className="text-2xl"/>},
        {path: '/theme', title: "Theme", icon: <Layout className="text-2xl"/>},
        {path: '/test', title: "Test", icon: <Thermometer className="text-2xl"/>},
    ],
},
]


// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Menu {
    export interface MenuItem {
        title: string;
        children: children[];
    }

    export interface children {
        title: string;
        icon: ReactNode;
        path: string;
    }
}