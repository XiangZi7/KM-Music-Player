import MkTable from "@/components/Mk-Table/Mk-Table";
import {httpGet} from "@/utils/http";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

export default function App() {
    const [song, setSong] = useState([]);
    // header
    const headerLink = [
        {title: "Message", path: "home"},
        {title: "Music Library", path: ""},
        {title: "Search", path: "search"},
    ];
    const [headerActive, setHeaderActive] = useState(0);
    const [keyword, setKeyword] = useState("");
    const Navigate = useNavigate();

    // 歌单
    const [playlists, setPlayLists] = useState([]);
    useEffect(() => {
        httpGet("/playlist/track/all?id=86596672&limit=30&offset=1").then(
            (data) => {
                const newData = data.songs.map((item) => {
                    const names = item.ar.map((subItem) => subItem.name).join(",");
                    const songs = {
                        title: item.name,
                        singer: names,
                        cover: item.al.picUrl,
                        time: item.dt,
                        album: item.al.name,
                        id: item.id,
                        mv: item.mv,
                        Lyric: item.id,
                    };
                    return songs;
                });
                setSong(newData);
            }
        );

        httpGet("/cloudsearch?keywords=境界的彼方&type=1000").then(({result}) => {
            setPlayLists(result.playlists);
        });
    }, []);

    function handleHeader(idx, path) {
        setHeaderActive(idx);
        Navigate("/" + path);
    }

    // 搜索
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            Navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
        }
    };
    // 搜索输入
    const handleChange = (event) => {
        setKeyword(event.target.value);
    };
    return (
        <>
            <div className="main-container">
                <div className="main-header">
                    {/*左标题*/}
                    <span className="menu-link-main">Hot Music</span>
                    {/*tabs*/}
                    <div className="header-menu">
                        {headerLink.map((item, idx) => (
                            <span
                                key={idx}
                                onClick={() => handleHeader(idx, item.path)}
                                className={`main-header-link ${
                                    headerActive == idx ? "is-active" : ""
                                }`}
                            >
                {item.title}
              </span>
                        ))}
                    </div>
                    {/*搜索*/}
                    <div className="search-bar">
                        <input
                            type="text"
                            onChange={handleChange}
                            value={keyword}
                            placeholder="Search"
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="content-wrapper-header">
                        <div className="content-wrapper-header-padding">
                            <div className="content-wrapper-context">
                                <h3 className="img-content">境界的彼方</h3>
                                <div className="content-text">
                                    《境界的彼方》是由鸟居奈古梦著作、鸭居知世插画的轻小说，于2012年6月9日，由KAESUMA文库文库（京都动画）发行。小说曾获得第2回京都动画大赏（小说部门）奖励赏。
                                </div>
                                <Button
                                    style={{padding: " 0px 45px"}}
                                    className="content-button"
                                    shape="round"
                                    type="primary"
                                >
                                    试听专辑
                                </Button>
                            </div>
                        </div>
                        <img src="km.png" height={230}/>
                    </div>
                    {/*歌单*/}
                    <div className="content-section">
                        <div className="content-section-title">Song List</div>
                        <div className="songs-card">
                            {playlists.map((item, idx) => (
                                <div className="song-card" key={idx}
                                     onClick={() => Navigate("/playlist?id=" + item.id)}>
                                    <img
                                        className="song-img yx-shadow"
                                        src={`${item.coverImgUrl}?param=300y300`}
                                    />
                                    <div className="song-des">
                                        <div>
                                            <p>{item.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*歌曲*/}
                    {song.length > 0 && (
                        <div className="content-section">
                            <div className="content-section-title">Album</div>
                            <MkTable data={song} style={{maxHeight: "40vh"}}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
