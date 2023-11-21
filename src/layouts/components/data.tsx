import { Home, Music, Film, Trello, PlayCircle, Layout, Thermometer } from "react-feather"

// 路由标签
export const items = [{
    title: "Apps",
    children: [
        { path: '/home', title: 'home', icon: <Home className="text-2xl"></Home> },
        { path: '/ml', title: 'Music library', icon: <Music className="text-2xl"></Music> },
        { path: '/movie', title: 'Movie', icon: <Film className="text-2xl"></Film> },
        { path: '/mini', title: 'Mini Player', icon: <Trello className="text-2xl"></Trello> },
        { path: '/chat', title: 'AI', icon: <PlayCircle className="text-2xl"></PlayCircle> },
        { path: '/theme', title: "Theme", icon: <Layout className="text-2xl"></Layout> },
        { path: '/test', title: "Test", icon: <Thermometer className="text-2xl"></Thermometer> },
    ],
}]