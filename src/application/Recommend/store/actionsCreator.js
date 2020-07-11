import actionsType from './constants'
import { fromJS } from 'immutable'
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'

export default {
    getBannerList() {
        return (dispatch, getState) => {
            const bannerList = getState().getIn(['recommend', 'bannerList'])
            if (bannerList.size) return

            getBannerRequest().then(res => {
                dispatch(__.getBannerList(res.banners))
                dispatch(__.changeLoaded(true))
            }).catch(reason => {
                console.log('getBannerList(): 轮播图获取数据失败')
            })
        }
    },

    getRecommendList() {
        return (dispatch, getState) => {
            const recommendList = getState().getIn(['recommend', 'recommendList'])
            if (recommendList.size) return

            getRecommendListRequest().then(res => {
                const action = __.getRecommendList(res.result)
                dispatch(action)
            }).catch(reason => {
                console.log('getRecommendList(): 获取推荐歌单失败')
            })
        }
    }
}


const __ = {
    getBannerList(data) {
        return {
            type: actionsType.CHANGE_BANNER_LIST,
            data: fromJS(data)
        }
    },

    getRecommendList(data) {
        return {
            type: actionsType.CHANGE_RECOMMEND_LIST,
            data: fromJS(data)
        }
    },

    changeLoaded(data) {
        return {
            type: actionsType.CHANGE_LOADED,
            data
        }
    }
}
