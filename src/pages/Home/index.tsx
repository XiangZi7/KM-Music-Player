import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import MKTable from '@/components/Mk-Table';
import { songsAPI } from '@/api';


function Home() {
  const [song, setSong] = useState<Song[]>([]);
  const headerLink = [
    { title: "Message", path: "home" },
    { title: "Music Library", path: "ml" },
    { title: "Search", path: "search" },
  ];
  const [headerActive, setHeaderActive] = useState(0);
  const [keyword, setKeyword] = useState("");
  const Navigate = useNavigate();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // 获取歌单
  useEffect(() => {
    songsAPI.getPlaylist({ id: '86596672', limit: '30', offset: '1' })
      .then(({ data }) => {
        // console.log('getPlaylist', data);
        const newData: Song[] = data.songs.map((item: any) => {
          const names = item.ar.map((subItem: any) => subItem.name).join(",");
          const song: Song = {
            title: item.name,
            singer: names,
            cover: item.al.picUrl,
            time: item.dt,
            album: item.al.name,
            id: item.id,
            mv: item.mv,
            lyric: item.id,
          };
          return song;
        })
        // console.log(newData);
        setSong(newData)
      })

    songsAPI.searchPlaylist({ keywords: '境界的彼方', type: '1000' })
      .then(({ data }) => {
        console.log(data);
        setPlaylists(data.result.playlists);
      })
  }, [])

  const handleHeader = (idx: number, path: string) => {
    // router
    setHeaderActive(idx);
    Navigate("/" + path);
  }

  // input keyword
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }
  // search
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      Navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  }
  return (
    <>
      <div className='main-container'>
        <div className='main-header'>
          {/* left Title */}
          <span className='menu-link-main'>Hot Music</span>
          {/* Tabs */}
          <div className="header-menu">
            {headerLink.map((item, idx) => (
              <span
                key={idx}
                onClick={() => handleHeader(idx, item.path)}
                className={
                  `main-header-link ${headerActive === idx ? "is-active" : ""}`
                }
              >
                {item.title}
              </span>
            ))}
          </div>
          {/* Search */}
          <div className='search-bar'>
            <input
              type="text"
              onChange={(event) => handleChange(event)}
              value={keyword}
              placeholder='Search'
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
        {/* static data */}
        <div className='content-wrapper'>
          <div className="content-wrapper-header">
            <div className="content-wrapper-header-padding">
              <div className="content-wrapper-context">
                <h3 className="img-content">
                  境界的彼方
                </h3>
                <div className="content-text">
                  《境界的彼方》是由鸟居奈古梦著作、鸭居知世插画的轻小说，于2012年6月9日，由KAESUMA文库文库（京都动画）发行。小说曾获得第2回京都动画大赏（小说部门）奖励赏。
                </div>
                <Button
                  style={{ padding: "0px 45px", }}
                  className="content-button"
                  shape="round"
                  type="primary"
                >
                  试听专辑
                </Button>
              </div>
            </div>
            <img src="km.png" height={230} />
          </div>
          {/* songList */}
          <div className='content-section'>
            <div className='content-section-title'>Song List</div>
            <div className='songs-card'>
              {
                playlists.map((item) => (
                  <div
                    className='song-card'
                    key={item.id}
                    onClick={() => Navigate("/playlist?id=" + item.id)}
                  >
                    <img
                      className='song-img yx-shadow'
                      src={`${item.coverImgUrl}?param=300y300`}
                    />
                    <div className='song-des'>
                      <div>
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          {/* song */}
          {song.length > 0 && (
            <div className='content-section'>
              <div className='content-section-title'>Album</div>
              <MKTable songList={song} style={{ maxHeight: "40vh" }}></MKTable>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
