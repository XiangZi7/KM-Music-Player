import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ConfigProvider, Pagination, Tabs} from "antd";
import type {TabsProps} from "antd";
import {buildSearchData} from "@/utils/Constructdata";
import "./index.scss";
import Single from "./components/single";
import Songlist from "./components/songlist";
import {httpGet} from "@/utils/http.ts";
// 搜索类型
const MediaType = {
    "1": 1,
    "2": 10,
    "3": 100,
    "4": 1000,
    "5": 1002,
    "6": 1004,
    "7": 1006,
};

export default function App() {
    const Navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [currentMType, setCurrentMType] = useState(1);
    // tabs activeKey
    const [tabActiveKey, setTabActiveKey] = useState("1");
    const keyword = searchParams.get("keyword");
    const [kw, setKw] = useState("");
    const [songCount, setSongCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [songs, setSongs] = useState([]);
    // tabs
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "单曲",
            children: <Single data={songs}/>
        },
        {
            key: "2",
            label: "专辑",
            children: <Songlist data={songs} idx={tabActiveKey}/>
        },
        {
            key: "3",
            label: "歌手",
            children: <Songlist data={songs} idx={tabActiveKey}/>
        },
        {
            key: "4",
            label: "歌单",
            children: <Songlist data={songs} idx={tabActiveKey}/>
        },
        {
            key: "5",
            label: "用户",
            children: <Songlist data={songs} idx={tabActiveKey}/>

        },
        {
            key: "6",
            label: "MV",
            children: <Songlist data={songs} idx={tabActiveKey}/>

        },
        {
            key: "8",
            label: "动漫",
            children: <Songlist data={songs} idx={tabActiveKey}/>
        },
    ];
    // tab Change
    // 每次切换都刷新数据
    useEffect(() => {
        searchMusic();
    }, [currentMType]);
    // 监听用户搜索的内容
    useEffect(() => {
        searchMusic();
    }, [keyword]);
    // 监听用户改变分页
    useEffect(() => {
        searchMusic();
    }, [currentPage]);

    // 搜索歌曲
    function searchMusic() {
        setSongs([]);
        setSongCount(0);
        // 动漫接口
        if (tabActiveKey == '8') {
            httpGet(`/video/search`, {
                name: keyword,
                from: currentPage,
                size: 30,
            }).then((data) => {
                const tableData = buildSearchData(tabActiveKey, data);
                setSongs(tableData.songs);
                setSongCount(tableData.songCount);
            });
        } else {
            // 音乐接口
            httpGet(`/cloudsearch`, {
                keywords: keyword,
                type: currentMType,
                offset: (currentPage - 1) * 30,
                limit: 30,
            }).then(({result}) => {
                const tableData = buildSearchData(tabActiveKey, result);
                setSongs(tableData.songs);
                setSongCount(tableData.songCount);
            });
        }
    }

    // 页数更改
    function pageChange(idx: number) {
        setCurrentPage(idx);
    }

    // 搜索功能
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            Navigate(`/search?keyword=${encodeURIComponent(kw)}`);
        }
    };
    const handleChange = (event) => {
        setKw(event.target.value);
    };
    // tabs change
    const onChange = (key: string) => {
        setCurrentMType(MediaType[key]);
        setTabActiveKey(key);
    };
    return (
        <>
            <div className="search-box">
                <div className="search-bar" style={{maxWidth: "50%"}}>
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Search"
                        onKeyDown={handleKeyPress}
                    />
                </div>
            </div>
            <div className="wrap">
                <Tabs activeKey={tabActiveKey} items={items} onChange={onChange}/>

                {/*分页*/}
                {songs.length != 0 && (
                    <div className="Pagination">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Pagination: {
                                        itemActiveBg: "transparent",
                                    },
                                },
                            }}
                        >
                            <Pagination
                                showSizeChanger={false}
                                current={currentPage}
                                total={songCount}
                                pageSize={30}
                                onChange={pageChange}
                            />
                        </ConfigProvider>
                    </div>
                )}
            </div>
        </>
    );
}
