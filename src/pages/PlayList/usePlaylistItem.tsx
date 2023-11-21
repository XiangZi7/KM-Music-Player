import MKTable from "@/components/Mk-Table";
import Comment from "@/components/Comment";

const usePlaylistItem = (chapterList: ChapterList, commList: CommList) => {
  const items = [
    {
      key: "1",
      label: "歌单",
      children: <MKTable songList={chapterList} style={{ maxHeight: "55vh" }}></MKTable>
    },
    {
      key: "2",
      label: "评论",
      children: <Comment data={commList}></Comment>
    }
  ]
  return items;
}

export { usePlaylistItem };
export default usePlaylistItem;

interface ChapterList extends Array<Song> {
}
interface CommList extends Array<UserComment> {
}
