/**
 * @function 返回搜索的表格数据
 */
export function buildSearchData(key: string, result: any) {
  console.log('result', result);
  const tableData: TableData = {
    songs: [],
    songCount: 0,
  }
  switch (key) {
    case '1':
    case '7':
      // console.log()
      tableData.songs = result.songs.map((item: any) => {
        const names = item.ar.map((subItem: any) => subItem.name).join(',');
        return {
          cover: item.al.picUrl,
          title: item.name,
          singer: names,
          album: item.al.name,
          time: item.dt,
          id: item.id,
          mv: item.mv,
        }
      });
      tableData.songCount = result.songCount;
      break;
    case '2':
      tableData.songs = result.albums;
      tableData.songCount = result.albumCount;
      break;
    case '3':
      tableData.songs = result.artists;
      tableData.songCount = result.artistCount;
      break;
    case '4':
      tableData.songs = result.playlists;
      tableData.songCount = result.playlistCount;
      break;
    case '5':
      tableData.songs = result.userprofiles;
      tableData.songCount = result.userprofileCount;
      break;
    case '6':
      tableData.songs = result.mvs;
      tableData.songCount = result.mvCount;
      break;
    case '8':
      tableData.songs = result.data;
      tableData.songCount = result.count;
      break;
    default:
      break;
  }
  return tableData;
}

export function buildPage(idx: string) {
  const MediaType: Rc<string, string | number> = {
    "1": "/moviedetails",
    "2": "/playlist",
    "3": 100,
    "4": "/playlist",
    "5": 1002,
    "6": 1004,
    "7": "/moviedetails",
    "8": "/moviedetails",
  }
  return MediaType[idx];
}

interface TableData {
  songs: Song[],
  songCount: number,
}
