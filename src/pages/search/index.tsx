import React from "react";
import {useSearchParams} from "react-router-dom";
import {Tabs} from 'antd';
import type {TabsProps} from 'antd';
import './index.scss'


// 搜索类型
const MediaType = {
    '1': 1,
    '2': 10,
    '3': 100,
    '4': 1000,
    '5': 1002,
    '6': 1004,
    '7': 1006,
};
// tabs
const items: TabsProps['items'] = [
    {
        key: '1',
        label: '单曲',
    },
    {
        key: '2',
        label: '专辑',
    },
    {
        key: '3',
        label: '歌手',
    },
    {
        key: '4',
        label: '歌手',
    },
    {
        key: '5',
        label: '歌单',
    },
    {
        key: '6',
        label: '用户',
    },
    {
        key: '7',
        label: 'MV',
    },
];
const onChange = (key: string) => {
    console.log(MediaType[key]);
};
export default function App() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('keyword');
    return (
        <>
            <div className="main-header">
                <span className="menu-link-main">Hot Music</span>
                <div className="header-menu">
                    <span className="main-header-link is-active">Message</span>
                    <span className="main-header-link ">Music Library</span>
                    <span className="main-header-link ">Animation</span>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search"/></div>
            </div>
            <div className="wrap">
                <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
            </div>
        </>
    );
}
