import actionsType from './actionsType'
import { getRankListRequest } from '../../../api/request'
import { fromJS } from 'immutable'
import { rankListFiter } from '../../../utils'

export default {
    getRankList() {
        return (dispatch, getState) => {
            const
                rankList = getState().getIn(['rank', 'rankList']),
                global = rankList.get('global'),
                official = rankList.get('official')

            if (global.size || official.size) return

            getRankListRequest().then(res => {
                const rankList = rankListFiter(res.list)
                dispatch(__.changeRankList(rankList))
                dispatch(__.toggleLoading(false))
            }).catch(res => {
                dispatch(__.toggleLoading(false, '数据加载失败'))
                setTimeout(() => __.toggleLoading(false, ''))
            })
        }
    }
}

const __ = {
    changeRankList(data) {
        return {
            type: actionsType.CHANGE_RANK_LIST,
            data: fromJS(data)
        }
    },
    toggleLoading(icon = true, mes) {
        return {
            type: actionsType.TOGGLE_LOADING,
            data: fromJS({
                icon,
                mes
            })
        }
    }
}