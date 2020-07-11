export const playMode = [
    '顺序播放',
    '单曲循环',
    '随机播放'
]

//拼接出歌曲的url链接
export const getSongUrl = id => {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};