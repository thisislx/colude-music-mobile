import { axiosInstance } from './config'

export const
    //首页横幅
    getBannerRequest = () => {
        return axiosInstance.get('/banner')
    },

    //  推荐歌单
    getRecommendListRequest = () => {
        return axiosInstance.get('/personalized')
    },

    //  categoryCode 5001为全部歌手
    // 注意alpha 不能配合 categoryCode 为 5001时
    getCategorySingerListRequest = (categoryCode = 5001, alpha = '', count) => {
        return axiosInstance.get(
            `/artist/list?offset=${count * 30}` +
            (categoryCode !== 5001 || !alpha ? `&cat=${categoryCode}` : '') +
            (alpha ? `&initial=${alpha.toLowerCase()}` : '')
        )
    },

    // 得到歌曲排行歌单
    getRankListRequest = () => {
        return axiosInstance.get(`/toplist/detail`);
    },

    // 歌单详情
    getAlbumRequest = id => {
        return axiosInstance.get(`/playlist/detail?id=${id}`);
    },

    // 歌手歌曲
    getSingerInfoRequest = id => {
        return axiosInstance.get(`/artists?id=${id}`);
    },

    //歌曲详情
    getSongDetailRequest = ids => {
        return axiosInstance.get(
            `/song/detail?ids=` +
            (Array.isArray(ids) ?
                ids.map((id, index) => index ? `,${ids}` : ids) :
                ids)
        )
    },

    getSongLyricRequest = id => {
        return axiosInstance.get('lyric?id=' + id)
    }


export class Search {
    // 搜索类型；默认为 1 即单曲 ,
    //  取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV,
    // 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
    // 关键字  结果类型 偏移数量(页数 * 每页数量)  每页数量
    getSearchResult(keywords, type, offset, limit = 30) {
        return axiosInstance.get(
            `/search?keywords=${keywords}` +
            `&limit=${limit}` +
            (type ? `&type=${type}` : '') +
            (offset ? `&offset=${offset * limit}` : '')
        )
    }

    // 默认搜索值
    getInputDefault() {
        return axiosInstance.get('/search/default')
    }

    // 热搜关键字
    getHotSearch() {
        return axiosInstance.get('/search/hot')
    }

    // 搜索建议
    getInputSuggest(keywords, type = 'mobile') {
        return axiosInstance.get(`/search/suggest?keywords=${keywords}&type=${type}`)
    }
}