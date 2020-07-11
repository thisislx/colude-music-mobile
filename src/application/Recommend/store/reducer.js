import { fromJS } from 'immutable'
import actionsType from './constants'

const initState = fromJS({
    bannerList: [],
    recommendList: [],
    loaded: false
})

export default (state = initState, { type, data }) => {

    switch (type) {
        case actionsType.CHANGE_BANNER_LIST:
            return state.set('bannerList', data)

        case actionsType.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', data)

        case actionsType.CHANGE_LOADED:
            return state.set('loaded', data)

        default: return state
    }
}