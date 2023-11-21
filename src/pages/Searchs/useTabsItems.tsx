import Single from './components/single'
import Songlist from './components/songlist'

export const useTabsItems = (songs: Song[], tabActiveKey: string) => {
  const items = [
    {
      key: "1",
      label: "单曲",
      children: <Single data={songs}></Single>,
    },
    {
      key: "2",
      label: "专辑",
      children: <Songlist data={songs} idx={tabActiveKey} />,
    },
    {
      key: "3",
      label: "歌手",
      children: <Songlist data={songs} idx={tabActiveKey} />,
    },
    {
      key: "4",
      label: "歌单",
      children: <Songlist data={songs} idx={tabActiveKey} />,
    },
    {
      key: "5",
      label: "用户",
      children: <Songlist data={songs} idx={tabActiveKey} />,
    },
    {
      key: "6",
      label: "MV",
      children: <Songlist data={songs} idx={tabActiveKey} />,
    },
    {
      key: "8",
      label: "动漫",
      children: <Songlist data={songs} idx={tabActiveKey} />,
    },
  ];
  return items;
}