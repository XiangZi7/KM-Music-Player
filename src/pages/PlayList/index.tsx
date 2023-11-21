import { useSearchParams } from "react-router-dom";
import { Row, Col, Avatar, Space, Tag, Tabs, Skeleton } from "antd";
import { PlaySquareOutlined, FieldTimeOutlined, MessageOutlined } from "@ant-design/icons";

import "./index.scss"
import { usePlaylistItem } from "./usePlaylistItem";
import { timestamp } from "@/utils/formatTime";
import { songsAPI } from "@/api";

function PlayList() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isPlay] = useState(false);
  const [playlist, setPlaylist] = useState<Playlist>({} as Playlist);
  const [chapterList, setChapterList] = useState<Song[]>([]);
  const [commList, setCommList] = useState<UserComment[]>([]);
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const items = usePlaylistItem(chapterList, commList);

  useEffect(() => {
    songsAPI.getComment({ id, limit: 30, offset: 1 })
      .then(({ data }) => {
        console.log(data, data.comments);
        setCommList(data.comments);
      });
    songsAPI.getSimplePlaylistInfo({ id })
      .then(({ data }) => {
        // console.log(data.playlist);
        setPlaylist(data.playlist);
        const newData: Song[] = data.playlist.tracks.map((item: any) => {
          const names = item.ar.map((subItem: any) => subItem.name).join(",");
          const song: Song = {
            title: item.name,
            singer: names,
            cover: item.al.picUrl,
            time: item.dt,
            album: item.al.name,
            id: item.id,
            mv: item.mv,
          }
          return song;
        })
        setChapterList(newData);
      })
  }, []);

  const onChange = (key: string) => {
    setTabActiveKey(key);
  }

  return (
    <>
      {Object.keys(playlist).length > 0 ? (
        <div className="wrap">
          {/* 歌单的详情 */}
          {!isPlay && (
            <Row>
              <Col span={6}>
                <div className="cover">
                  <img src={playlist.coverImgUrl} alt="" />
                </div>
              </Col>
              <Col span={18}>
                <div className="details ml-10">
                  <h2>
                    <PlaySquareOutlined></PlaySquareOutlined>
                    {playlist.name}
                  </h2>
                  <p className="des">
                    {" "}
                    <Avatar src={playlist.creator.avatarUrl}></Avatar>
                    {playlist.creator.nickname}
                  </p>
                  <p className="des">
                    <FieldTimeOutlined />
                    {timestamp(playlist.createTime)}
                  </p>
                  <p className="des">
                    <MessageOutlined></MessageOutlined>
                    {playlist.description}
                  </p>
                  <p>
                    <Space size={[0, 8]} wrap>
                      {
                        playlist.tags.map((item) => (
                          <Tag color="geekblue" key={item}>
                            {item}
                          </Tag>
                        ))
                      }
                    </Space>
                  </p>
                </div>
              </Col>
            </Row>
          )}
          {/* 歌单 */}
          <div className="mt-20">
            <Tabs activeKey={tabActiveKey} items={items} onChange={onChange}></Tabs>
          </div>
        </div>
      ) : (
        <Skeleton></Skeleton>
      )}
    </>
  )
}

export default PlayList
