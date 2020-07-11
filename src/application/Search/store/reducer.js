import actionsType from './actionsType'
import { fromJS } from 'immutable'
import { Storage } from '../../../utils'

const
    _storage = new Storage('search'),
    SEARCH_HISTORY = 'search_history'

const defaultState = fromJS({
    searchHistory: _storage.get(SEARCH_HISTORY) || [],
    hotSearch: [],
    inputSuggest: [],
    inputDefault: {},
})

export default (state = defaultState, { type, data }) => {

    switch (type) {
        case actionsType.UPDATE_INPUT_DEFAULT:
            return state.set('inputDefault', data)

        case actionsType.UPDATE_HOT_SEARCH:
            return state.set('hotSearch', data)

        case actionsType.UPDATE_INPUT_SUGGEST:
            return state.set('inputSuggest', data)

        case actionsType.UNSHIFT_SEARCH_HISTORY:
            _storage.set(SEARCH_HISTORY, data)
            return state.set('searchHistory', data)

        case actionsType.CLEAR_SEARCH_HISTORY:
            _storage.set(SEARCH_HISTORY, [])
            return state.set('searchHistory', fromJS([]))

        default: return state
    }
}