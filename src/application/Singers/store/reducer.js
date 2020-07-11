import actionsType from './actionsType'
import { fromJS } from 'immutable'

const initState = fromJS({
    singerList: [],
    pageCount: 1,
    enterLoading: {
        is: true,
        mes: '',
        icon: true
    },
    //控制上拉加载动画
    pullUpLoading: {
        is: false,
        mes:  '',
        icon: true
    }, 
    //控制下拉加载动画  
    pullDownLoading: {
        is: false,
        mes: '',
        icon: true
    } 
})

export default (state = initState, { type, data }) => {

    switch (type) {
        case actionsType.CLOSE_ALL_LOADING:
            var _obj = fromJS({
                icon: false,
                mes: '',
                is: false
            })
            return state.merge({
                enterLoading: _obj,
                pullUpLoading: _obj,
                pullDownLoading: _obj
            })

        case actionsType.CHANGE_SINGER_LIST:
            return state.set('singerList', data)

        case actionsType.CHANGE_PAGE_COUNT:
            return state.set('pageCount', data)

        case actionsType.SHOOT_ENTER_LOADING:
            return state.set('enterLoading', data)

        case actionsType.SHOOT_PULL_UP_LOADING:
            return state.set('pullUpLoading', data)

        case actionsType.SHOOT_PULL_DOWN_LOADING:
            return state.set('pullDownLoading', data)


        default: return state
    }
}