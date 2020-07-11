import actionsType from './actionsType'
import { fromJS } from 'immutable'
const initState = fromJS({
    detail: {

    },
    // id未为key
    detailsCache: {

    },
    // 初始为加载动画
    toastState: {
        mes: '装载中',
        is: true,
        icon: true
    },
})

export default (state = initState, { type, data }) => {

    switch (type) {
        case actionsType.UPDATE_DETAIL:
            return state.set('detail', data)

        // 写入cache并且设置detail
        case actionsType.WRITE_DETAILS_CACHE:
            return state.setIn(['detailsCache', data.id], data.data).set(
                'detail', data.data)

        case actionsType.CHANGE_TOAST_STATE:
            return state.set('toastState', data)

        default: return state
    }
}