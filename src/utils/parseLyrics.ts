const parseLyrics = (lyric) => {
    if (!lyric) return;
    const lines = lyric.split("\n");
    return lines
        .map((line) => {
            const matches = line.match(/^\[(\d{2}):(\d{2}\.\d{2,3})\](.*)/);
            if (matches) {
                const minutes = parseInt(matches[1]);
                const seconds = parseFloat(matches[2]);
                const text = matches[3].trim();
                return {time: minutes * 60 + seconds, text};
            } else {
                return null;
            }
        })
        .filter((line) => line !== null);
};

export const createBilingualData = (lrc, tlyric) => {
    const lrcLines = parseLyrics(lrc);
    const tlyricLines = parseLyrics(tlyric);

    const lrcObj = {};
    const tlyricObj = {};

    // 将原文歌词和翻译后的歌词数组转换为对象，以时间点为键
    lrcLines.forEach((line) => {
        lrcObj[line.time] = line.text;
    });

    tlyricLines.forEach((line) => {
        tlyricObj[line.time] = line.text;
    });

    const bilingualData = [];
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
};
