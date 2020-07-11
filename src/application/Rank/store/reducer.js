import actionsType from './actionsType'
import { fromJS } from 'immutable'

const initState = fromJS({
    rankList: {
        // 全球榜
        global: [],
        // 官方榜
        official: []
    },
    loading: {
        icon: true,
        mes: ''
    }
})

export default (state = initState, { type, data }) => {

    switch (type) {
        case actionsType.TOGGLE_LOADING:
            return state.set('loading', data)

        case actionsType.CHANGE_RANK_LIST:
            return state.set('rankList', data)

        default: return state
    }
}