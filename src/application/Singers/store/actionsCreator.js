import actionsType from './actionsType'
import { fromJS } from 'immutable'
import {
    getCategorySingerListRequest
} from '../../../api/request'


export default {
    //接受字母筛选和类型筛选（默认全部歌手） 只加载count为1
    getSingerList(categoryCode, alpha) {
        return (dispatch) => {
            dispatch(__.shootEnterLoading('玩命加载中'))

            getCategorySingerListRequest(categoryCode, alpha, 1).then(res => {
                if (!res)
                    return Promise.reject('网络错误')
                const { artists } = res
                dispatch(__.changePageCount(1))
                dispatch(__.changeSingerList(artists))
                dispatch(__.closeAllLoading())
            }).catch(reason => {
                dispatch(__.shootEnterLoading(reason, false))
            })
        }
    },

    // 加载count不为1,
    getMoreSingerList: (() => {
        let _notMore,
            _lock,
            _lockShowMes

        const
            showMes_ = dispatch => {

                return (mes, wait = 1000) => {
                    if (_lockShowMes) return
                    _lockShowMes = true
                    dispatch(__.shootPullUpLoading(mes, false))
                    setTimeout(() => {
                        dispatch(__.closeAllLoading())
                        setTimeout(() => {
                            _lock = false
                            _lockShowMes = false
                        }, 1000)
                    }, wait)
                }
            },
            http_ = (dispatch, getState) => {
                const { pageCount: count, singerList } = getState().get('singers').toJS()
                return (categoryCode, alpha) => {
                    dispatch(__.shootPullUpLoading())
                    return getCategorySingerListRequest(categoryCode, alpha, count + 1).then(res => {
                        const { more, artists } = res
                        if (more) {
                            dispatch(__.changeSingerList(singerList.concat(artists)))
                            dispatch(__.changePageCount(count + 1))
                            dispatch(__.closeAllLoading())
                        } else {
                            showMes_(dispatch)('没有更多')
                            return Promise.reject(more)
                        }
                    }, reason => {
                        showMes_(dispatch)('数据加载失败')
                    })
                }
            },
            isLock_ = (dispatch, getState) => {
                if (_lock) return () => true
                _lock = true
                return () => {
                    const { pageCount: count } = getState().get('singers').toJS()
                    switch (true) {
                        case count == 1:
                            _notMore = false
                            return false

                        case _notMore:
                            showMes_(dispatch)('没有更多')
                            return true

                        default: return false
                    }
                }
            }

        return function getMore(categoryCode, alpha) {
            return (dispatch, getState) => {
                if (isLock_(dispatch, getState)()) return
                http_(dispatch, getState)(categoryCode, alpha).then(() => {
                    _lock = false
                }).catch(reason => {
                    _lock = false
                    _notMore = true
                })
            }
        }
    })(),

    // 刷新(默认全部歌手)
    freshSingerList(categoryCode, alpha) {
        return (dispatch) => {
            dispatch(__.shootPullDownLoading('拼命加载中'))

            getCategorySingerListRequest(categoryCode, alpha, 1).then(res => {
                const { artists } = res
                dispatch(__.changePageCount(1))
                dispatch(__.changeSingerList(artists))
                dispatch(__.closeAllLoading())
            })
        }
    }
}

const __ = {
    changeSingerList(list) {
        return {
            type: actionsType.CHANGE_SINGER_LIST,
            data: fromJS(list)
        }
    },

    changePageCount(count) {
        return {
            type: actionsType.CHANGE_PAGE_COUNT,
            data: count
        }
    },

    closeAllLoading() {
        return {
            type: actionsType.CLOSE_ALL_LOADING
        }
    },

    //加载首页
    shootEnterLoading(mes, icon = true) {
        return {
            type: actionsType.SHOOT_ENTER_LOADING,
            data: fromJS({
                icon,
                is: true,
                mes: mes ? mes : ''
            })
        }
    },

    // 滑动到底
    shootPullUpLoading(mes, icon = true) {
        return {
            type: actionsType.SHOOT_PULL_UP_LOADING,
            data: fromJS({
                icon,
                is: true,
                mes: mes ? mes : ''
            })
        }
    },

    // 下拉刷新
    shootPullDownLoading(mes, icon = true) {
        return {
            type: actionsType.SHOOT_PULL_DOWN_LOADING,
            data: fromJS({
                icon,
                is: true,
                mes: mes ? mes : ''
            })
        }
    },
}
