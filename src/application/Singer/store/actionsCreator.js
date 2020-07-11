import actionsType from './actionsType'
import { getSingerInfoRequest } from '../../../api/request'
import { fromJS } from 'immutable'


export default {
    getSingerInfo(id) {
        return (dispatch) => {
            dispatch(__.enterLoading())
            getSingerInfoRequest(id).then(res => {
                const { artist, hotSongs } = res
                dispatch(__.updateArtist(artist))
                dispatch(__.updateHotSongs(hotSongs))
                dispatch(__.closeShowMes())
            }).catch(reason => {
                __.showMes(dispatch)('加载失败', false)
            })
        }
    }
}

const __ = {
    enterLoading() {
        return {
            type: actionsType.TOGGLE_SHOW_MES,
            data: fromJS({
                is: true,
                icon: true,
                mes: '拼命加载中'
            })
        }
    },
    closeShowMes() {
        return {
            type: actionsType.TOGGLE_SHOW_MES,
            data: fromJS({
                is: false,
                icon: false,
                mes: ''
            })
        }
    },

    // 返回函数
    showMes(dispatch, timer = 1000) {
        return (mes, icon = false) => {
            const action = {
                type: actionsType.TOGGLE_SHOW_MES,
                data: {
                    is: true,
                    mes,
                    icon
                }
            }
            dispatch(action)
            setTimeout(() => {
                dispatch(this.closeShowMes())
            }, timer)
        }
    },

    updateArtist(data) {
        return {
            type: actionsType.UPDATE_ARTIST,
            data: fromJS(data)
        }
    },

    updateHotSongs(data) {
        return {
            type: actionsType.UPDATE_HOT_SONGS,
            data: fromJS(data)
        }
    }
}
