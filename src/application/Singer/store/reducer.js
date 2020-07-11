import actionsType from './actionsType'
import { fromJS } from 'immutable'

const initState = fromJS({
    hotSongs: [],
    artist: {
        alias: []
    },
    showMes: {
        is: false,
        mes: '拼命加载中',
        icon: true,
    }
})

export default (state = initState, { type, data }) => {

    switch (type) {
        case actionsType.UPDATE_HOT_SONGS:
            return state.set('hotSongs', data)

        case actionsType.UPDATE_ARTIST:
            return state.set('artist', data)

        case actionsType.TOGGLE_SHOW_MES:
            return state.set('showMes', data)

        default: return state
    }
}