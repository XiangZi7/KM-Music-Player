export function buildSearchData(key, result) {
    const tableData = {}
    switch (key) {
        case '1':
            tableData.songs = result.songs.map(item => {
                const names = item.ar.map(subItem => subItem.name).join(',');
                return {
                    cover: item.al.picUrl,
                    title: item.name,
                    singer: names,
                    album: item.al.name,
                    time: item.dt,
                    id: item.id,
                    mv: item.mv,
                }
            })
            // 1.歌曲总数量
            tableData.songCount = result.songCount
            break;
        case '2':
            tableData.songs = result.albums
            tableData.songCount = result.albumCount
            break;
        case '3':
            tableData.songs = result.artists
            tableData.songCount = result.artistCount
            break;
        case '4':
            tableData.songs = result.playlists
            tableData.songCount = result.playlistCount
            break;
        case '5':
            tableData.songs = result.userprofiles
            tableData.songCount = result.userprofileCount
            break;
        case '6':
            tableData.songs = result.mvs
            tableData.songCount = result.mvCount
            break;
        case '7':
            tableData.songs = result.songs.map(item => {
                const names = item.ar.map(subItem => subItem.name).join(',');
                return {
                    cover: item.al.picUrl,
                    title: item.name,
                    singer: names,
                    album: item.al.name,
                    time: item.dt,
                    id: item.id,
                    mv: item.mv,
                }
            })
            break;
        case '8':
            tableData.songs = result.data
            tableData.songCount = result.count
            break;
        default:
            break;
    }
    return tableData
}
export function buildPage(idx) {
    // 搜索类型
    const MediaType = {
        "1": "/moviedetails",
        "2": "/playlist",
        "3": 100,
        "4": "/playlist",
        "5": 1002,
        "6": 1004,
        "7": "/moviedetails",
        "8": "/moviedetails",
    };

    return MediaType[idx]
}
