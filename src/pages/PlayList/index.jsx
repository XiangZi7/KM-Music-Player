import "./style.scss";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {httpGet} from "@/utils/http";
import {Avatar, Button, Col, Row, Skeleton, Space, Tabs, TabsProps, Tag} from "antd";
import {
    PlaySquareOutlined,
    FieldTimeOutlined,
    HomeOutlined,
    MessageOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {timestamp} from "@/utils/FormatTime.js";
import MkTable from "@/components/Mk-Table/Mk-Table";
import Comment from "@/components/comment";

export default function playList() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [isPlay, setIsPlay] = useState(false);
    const [url, setUrl] = useState("");
    const [plObj, setMvobj] = useState({});
    const [chapterList, setChapterList] = useState([]);
    const [commList, setCommList] = useState([]);
    // tabs
    const [tabActiveKey, setTabActiveKey] = useState("1");
    // tabs
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "歌单",
            children: <MkTable data={chapterList} style={{maxHeight: "55vh"}}/>,
        },
        {
            key: "2",
            label: "评论",
            children: <Comment data={commList}/>,
        },
    ];
    useEffect(() => {
        httpGet(`/comment/playlist?id=${id}&limit=30&offset=1`).then(
            ({comments}) => {
                setCommList(comments);
            }
        );

        httpGet(`/playlist/detail?id=${id}`).then(({playlist}) => {
            console.log(playlist);
            setMvobj(playlist);
            const newData = playlist.tracks.map((item) => {
                const names = item.ar.map((subItem) => subItem.name).join(",");
                const songs = {
                    title: item.name,
                    singer: names,
                    cover: item.al.picUrl,
                    time: item.dt,
                    album: item.al.name,
                    id: item.id,
                    mv: item.mv,
                };
                return songs;
            });
            setChapterList(newData);
        });
    }, []);

    function playVidio(url: string) {
        setUrl(url);
        setIsPlay(true);
    }

    // tabs change
    const onChange = (key: string) => {
        setTabActiveKey(key);
    };
    return (
        <>
            {Object.keys(plObj).length > 0 ? (
                <div className="wrap">
                    {/*歌单的详情*/}
                    {!isPlay && (
                        <Row>
                            <Col span={6}>
                                <div className="cover">
                                    <img src={plObj.coverImgUrl} alt=""/>
                                    <div className="mt-10">
                                        {/*<Button*/}
                                        {/*  type="primary"*/}
                                        {/*  block*/}
                                        {/*  onClick={() => playVidio(chapterList[0].chapterPath)}*/}
                                        {/*>*/}
                                        {/*  Play*/}
                                        {/*</Button>*/}
                                    </div>
                                </div>
                            </Col>
                            <Col span={18}>
                                <div className="details ml-10">
                                    <h2>
                                        <PlaySquareOutlined/> {plObj.name}
                                    </h2>
                                    <p className="des">
                                        {" "}
                                        <Avatar src={plObj.creator.avatarUrl}/>{" "}
                                        {plObj.creator.nickname}
                                    </p>
                                    <p className="des">
                                        <FieldTimeOutlined/> {timestamp(plObj.createTime)}
                                    </p>
                                    <p className="des">
                                        <MessageOutlined/> {plObj.description}
                                    </p>
                                    <p>
                                        <Space size={[0, 8]} wrap>
                                            {
                                                plObj.tags.map((item) => (
                                                    <Tag color="geekblue" key={item}>{item}</Tag>
                                                ))
                                            }
                                        </Space>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    )}
                    {/*歌单*/}
                    <div className="mt-20">
                        <Tabs activeKey={tabActiveKey} items={items} onChange={onChange}/>
                    </div>
                </div>
            ) : (
                <Skeleton/>
            )}
        </>
    );
}
