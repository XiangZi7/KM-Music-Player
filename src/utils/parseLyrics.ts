/**
 * 歌词解析
*/
const parseLyrics = (lyric: string): Lyric[] | null => {
    if (!lyric) { return null }
    const lines = lyric.split("\n");
    const parsedLines = lines
        .map((line): Lyric | undefined => {
            const matches = line.match(/^\[(\d{2}):(\d{2}\.\d{2,3})\](.*)/);
            if (matches) {
                const minutes = parseInt(matches[1]);
                const seconds = parseInt(matches[2]);
                const text = matches[3].trim();
                return { time: minutes * 60 + seconds, text };
            }
        })
        .filter((line) => line !== null && line !== undefined);
    return parsedLines as Lyric[]
}

export const createBilingualData = (lrc: string, tlyric: string) => {
    // debugger
    const lrcLines = parseLyrics(lrc || "")!;
    const tlyricLines = parseLyrics(tlyric || "");

    const lrcObj: Rc<number, string> = {};
    const tlyricObj: Rc<number, string> = {};

    // 将数组转化为对象，key: time
    lrcLines.forEach(line => {
        lrcObj[line.time] = line.text;
    });
    if (tlyricLines) {
        tlyricLines.forEach(line => {
            tlyricObj[line.time] = line.text;
        })
    }

    const bilingualData: Bilingial[] = [];
    for (let i = 0; i < lrcLines.length; i++) {
        const lrcLine = lrcLines[i];
        const tlyricText = tlyricObj[lrcLine.time] || "";
        const bilingualLine = {
            time: lrcLine.time,
            lrc: lrcLine.text,
            tlyric: tlyricText
        };
        bilingualData.push(bilingualLine);
    }
    return bilingualData;
}