import { getAlbumRequest } from '../../../api/request'
import actionsType from './actionsType'
import { fromJS } from 'immutable'

export default {
    getAlbum(id) {
        return (dispatch, getState) => {
            // 开启动画
            dispatch(__.toggleEnterLoading(true))

            // 缓存读取
            const cache = getState().getIn(['album', 'detailsCache']).toJS()
            if (id in cache) {
                dispatch(__.updateDetail(cache[id]))
                dispatch(__.toggleEnterLoading(false))
                return
            }

            // 网络请求 + 写入缓存
            getAlbumRequest(id).then(res => {
                dispatch(__.writeDetailsCache(id, res.playlist))
                dispatch(__.toggleEnterLoading(false))
            }).catch(reason => {
                __.showToast(dispatch)('数据加载失败')
            })
        }
    },
}

const __ = {
    // 接收id和data的对象
    writeDetailsCache(id, data) {
        return {
            type: actionsType.WRITE_DETAILS_CACHE,
            data: {
                id,
                data: fromJS(data)
            }
        }
    },

    // cache读取， 不包括http请求
    updateDetail(data) {
        return {
            type: actionsType.UPDATE_DETAIL,
            data: fromJS(data)
        }
    },

    toggleEnterLoading(is) {
        return {
            type: actionsType.CHANGE_TOAST_STATE,
            data: fromJS({
                is,
                mes: '装载中',
                icon: true
            })
        }
    },

    showToast(dispatch, timer = 1000) {
        return (mes, icon = false) => {
            const action = {
                type: actionsType.CHANGE_TOAST_STATE,
                data: fromJS({
                    mes,
                    is: true,
                    icon,
                })
            }
            dispatch(action)

            // 取消
            setTimeout(() => {
                const action = {
                    type: actionsType.CHANGE_TOAST_STATE,
                    data: fromJS({
                        is: false,
                        mes: '',
                        icon: false
                    })
                }
                dispatch(action)
            }, timer)
        }
    }
}