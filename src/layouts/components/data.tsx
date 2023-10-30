import {BsMusicPlayerFill, BsRobot} from 'react-icons/bs';
import {FaHome} from 'react-icons/fa';
import {BiMoviePlay, BiTestTube, BiRadio} from 'react-icons/bi';
import {LuListMusic} from 'react-icons/lu';
import {TbMovie} from 'react-icons/tb';
import {AiOutlineClear} from 'react-icons/ai';
// 根据路由表生成对应的路由规则
export const items = [{
    title: "Apps",
    children: [
        {path: '/home',title:"Home", icon: <FaHome className="text-2xl"/>},
        {path: '/ml',title:"Music library", icon: <LuListMusic className="text-2xl"/>},
        {path: '/radio', title:"Radio",icon: <BiRadio className="text-2xl"/>},
        {path: '/movie',title:"Movie", icon: <BiMoviePlay className="text-2xl"/>},
        {path: '/anim',title:"Animation", icon: <TbMovie className="text-2xl"/>},
        {path: '/mini', title:"Mini Player",icon: <BsMusicPlayerFill className="text-2xl"/>},
        {path: '/chat',title:"AI", icon: <BsRobot className="text-2xl"/>},
        {path: '/theme',title:"Theme", icon: <AiOutlineClear className="text-2xl"/>},
        {path: '/test',title:"Test", icon: <BiTestTube className="text-2xl"/>},
    ],
},

]