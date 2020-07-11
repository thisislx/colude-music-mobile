import actionsType from './actionsType'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    currentType: 1,
    results: {
        // 1: 单曲,  默认
        // 10: 专辑,
        // 100: 歌手,
        // 1000: 歌单,
        // 1002: 用户,
        // 1004: MV,
        // 1006: 歌词,
        // 1009: 电台,
        // 1014: 视频,
        // 1018: 综合
    },
    showMes: {
        is: true,
        icon: true,
        mes: '开挂加载中...'
    }
})

export default (state = defaultState, { type, data }) => {

    switch (type) {
        case actionsType.UPDATE_RESULTS: 
            var currentType = state.get('currentType')
            return state.setIn(['results', currentType], data)

        case actionsType.SET_CURRENT_TYPE:
            return state.set('currentType', data)

        case actionsType.SET_SHOW_MES:
            return state.set('showMes', data)

        default: return state
    }
}