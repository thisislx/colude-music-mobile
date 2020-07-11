import actionsType from './actionsType'
import { fromJS } from 'immutable'
import { Search } from '../../../api/request'

const
    _search = new Search(),
    _recordOffset = new Map()

export default {
    getSearchResult: function inner(keywords) {
        const equal = inner._previous === keywords
        equal || _recordOffset.clear()

        return (dispatch, getState) => {
            const
                state = getState().get('searchResult'),
                currentType = state.get('currentType')

            if (!(state.hasIn(['results', currentType])) || !equal) {
                _search.getSearchResult(keywords, currentType).then(res => {
                    dispatch(__.getSearchResult(res.result))
                    dispatch(__.closeMes())
                })
            }
        }
    },
    setCurrentType(num) {
        return {
            type: actionsType.SET_CURRENT_TYPE,
            data: num
        }
    },

    getMore: function inner(keywords) {
        if (inner._locked) return { type: '' }
        inner._locked = true
        let offset = 1

        return (dispatch, getState) => {
            const
                state = getState().get('searchResult'),
                currentType = state.get('currentType'),
                currentResult = state.getIn(['results', currentType]),
                max = currentResult.get('songCount'),
                currentLength = currentResult.get('songs').size
            // 只有歌曲功能
            if (currentType !== 1) return
            // 没有更多
            if (currentLength >= max) {
                setTimeout(() => {
                    inner._locked = false
                }, 500)
                return __.openLoading(dispatch, 1200)('已经到底了', false)
            }

            dispatch(__.openLoading('向下加载中...'))
            // 记录页数
            offset = _recordOffset.has(keywords) ?
                _recordOffset.get(keywords) + 1 : offset
            _recordOffset.set(keywords, offset)
            _search.getSearchResult(keywords, currentType, offset).then(res => {
                const songs = currentResult.get('songs').concat(fromJS(res.result.songs))
                dispatch(__.getSearchResult(currentResult.set('songs', songs)))
                dispatch(__.closeMes())

                setTimeout(() => {
                    inner._locked = false
                }, 500)
            })
        }
    }
}



const __ = {
    getSearchResult(data) {
        return {
            type: actionsType.UPDATE_RESULTS,
            data: data.getIn ? data : fromJS(data)
        }
    },
    openLoading(dispatch, timer) {
        if (typeof dispatch === 'function')
            return (mes, icon) => {
                dispatch({
                    type: actionsType.SET_SHOW_MES,
                    data: fromJS({
                        is: true,
                        icon,
                        mes
                    })
                })
                timer && setTimeout(() => {
                    dispatch(this.closeMes())
                }, timer)
            }
        return {
            type: actionsType.SET_SHOW_MES,
            data: fromJS({
                is: true,
                mes: dispatch,
                icon: timer
            })
        }
    },
    closeMes() {
        return {
            type: actionsType.SET_SHOW_MES,
            data: fromJS({
                is: false,
                icon: false,
                mes: ''
            })
        }
    }
}