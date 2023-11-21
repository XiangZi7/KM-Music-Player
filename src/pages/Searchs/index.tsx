import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./index.scss"
import { ConfigProvider, Pagination, Tabs } from 'antd';

import { useTabsItems } from './useTabsItems';

import { songsAPI } from '@/api';
import { buildSearchData } from '@/utils/constructdata';

const MediaType: Rc<string, number> = {
  "1": 1,
  "2": 10,
  "3": 100,
  "4": 1000,
  "5": 1002,
  "6": 1004,
  "7": 1006,
  "8": 1008,
};

function Searchs() {
  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const _keyword = searchParams.get("keyword");
  const [keyword, setKeyword] = useState("")
  const [currentMediaType, setCurrentMediaType] = useState(1);
  const [songCount, setSongCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [songs, setSongs] = useState<Song[]>([]);
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const items = useTabsItems(songs, tabActiveKey);

  // tab Change and RefreshData
  useEffect(() => {
    searchMusic();
  }, [currentMediaType]);
  // watch keyword
  useEffect(() => {
    searchMusic();
  }, [keyword]);
  // watch change page (user)
  useEffect(() => {
    searchMusic();
  }, [currentPage]);

  const searchMusic = () => {
    setSongs([]);
    setSongCount(0);

    if (tabActiveKey === '8' /* 动漫接口 */) {
      songsAPI.searchVideo({
        name: _keyword,
        from: currentPage,
        size: 30,
      }).then(({ data }) => {
        // console.log(data);
        const tableData = buildSearchData(tabActiveKey, data.result);
        setSongs(tableData.songs);
        setSongCount(tableData.songCount);
      })
    } else { /* 音乐接口*/
      songsAPI.searchPlaylist({
        keywords: _keyword,
        type: currentMediaType,
        offset: (currentPage - 1) * 30,
        limit: 30,
      }).then(({ data }) => {
        // console.log(data);
        const tableData = buildSearchData(tabActiveKey, data.result);
        // console.log(tableData);
        setSongs(tableData.songs);
        setSongCount(tableData.songCount);
      })
    }
  }
  const pageChange = (idx: number) => {
    setCurrentPage(idx);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      Navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  }
  const onChange = (key: string) => {
    setCurrentMediaType(MediaType[key]);
    setTabActiveKey(key);
  }
  return (
    <>
      <div className='search-box'>
        <div className="search-bar" style={{ maxWidth: "50%" }}>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search"
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
      <div className='wrap'>
        <Tabs activeKey={tabActiveKey} items={items} onChange={onChange} />
        {/* 分页 */}
        {
          songs.length !== 0
          && (
            <div className='Pagination'>
              <ConfigProvider
                theme={{
                  components: {
                    Pagination: {
                      itemActiveBg: "transparent"
                    }
                  }
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
          )
        }
      </div>
    </>
  )
}

export default Searchs
