import { SEARCH_HISTORY_MAX_LENGTH } from '../config'
import actionsType from './actionsType'
import { fromJS } from 'immutable'
import { Search } from '../../../api/request'

const
    _search = new Search()

export default {
    getInputDefault() {
        return (dispatch) => {
            _search.getInputDefault().then(res => {
                const { data } = res
                data && dispatch(__.getInputDefault(data))
            }).catch(reason => console.log(reason))
        }
    },

    getHotSearch() {
        return dispatch => {
            _search.getHotSearch().then(res => {
                const { result: { hots } } = res
                hots && dispatch(__.getHotSearch(hots))
            }).catch(reason => {

            })
        }
    },

    getInputSuggest(keywords) {
        return dispatch => {
            _search.getInputSuggest(keywords).then(res => {
                const allMatch = res.result.allMatch
                allMatch && dispatch(__.getInputSuggest(allMatch))
            }).catch(reason => {

            })
        }
    },

    clearSearchHistory() {
        return {
            type: actionsType.CLEAR_SEARCH_HISTORY
        }
    },

    unshiftSearchHistory(keywords) {
        return (dispatch, getState) => {
            const
                list = getState().getIn(['search', 'searchHistory']).toJS(),
                exist = list.findIndex(item => item.id === keywords)
            ~exist && list.splice(exist, 1)
            list.unshift(fromJS({
                name: keywords,
                id: keywords
            }))
            // 添加一项与超过记录最大长度
            !~exist && list.length > SEARCH_HISTORY_MAX_LENGTH &&
                list.splice(SEARCH_HISTORY_MAX_LENGTH, 1)

            dispatch(__.unshiftSearchHistory(list))
        }
    }
}

const __ = {

    getInputDefault(data) {
        return {
            type: actionsType.UPDATE_INPUT_DEFAULT,
            data: fromJS(data)
        }
    },

    getInputSuggest(list) {
        return {
            type: actionsType.UPDATE_INPUT_SUGGEST,
            data: fromJS(list)
        }
    },

    getHotSearch(list) {
        return {
            type: actionsType.UPDATE_HOT_SEARCH,
            data: fromJS(list)
        }
    },

    unshiftSearchHistory(list) {
        return {
            type: actionsType.UNSHIFT_SEARCH_HISTORY,
            data: fromJS(list)
        }
    }
}