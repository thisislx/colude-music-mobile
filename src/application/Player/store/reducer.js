import actionsType from './actionsType'
import { fromJS } from 'immutable'
import { Storage } from '../../../utils'

const _storage = new Storage('player')

const initState = fromJS({
    // 播放时间
    playingSecond: _storage.get('playing-second') || 0,
    // 播放模式
    mode: _storage.get('mode') || 0,
    // 当前播放列表
    playList: _storage.get('play-list') || [],
    //当前播放索引
    currentIndex: _storage.get('current-index') || 0,
    // 正在播放
    playing: false,
    // 屏幕全屏
    fullScreen: false,
    // 播放列表
    showSongList: false,
    // 是否展示播放列表
    showPlayList: false,
    // 播放信息
    showMes: {
        is: false,
        icon: false,
        mes: ''
    },
    // 歌词
    lyricList: _storage.get('lyric-list') || {} // id:  data
})

export default (state = initState, { type, data }) => {
    switch (type) {
        case actionsType.CHANGE_PLAYING_SECOND:
            _storage.set('playing-second', data)
            return state.set('playingSecond', data)

        case actionsType.TOGGLE_PLAY_MODE:
            _storage.set('mode', data)
            return state.set('mode', data)

        case actionsType.UPDATE_PLAY_LIST:
            _storage.set('play-list', data)
            return state.set('playList', data)

        case actionsType.REMOVE_PLAY_LIST_ITEM:
            var newState = state.deleteIn(['playList', data])
            _storage.set('play-list', newState.get('playList'))
            return newState

        case actionsType.CHANGE_CURRENT_INDEX:
            _storage.set('current-index', data)
            return state.set('currentIndex', data)

        case actionsType.TOGGLE_PLAYING:
            return state.set('playing', data)

        case actionsType.SET_FULL_SCREEN:
            return state.set('fullScreen', data)

        case actionsType.SET_SHOW_SONG_LIST:
            return state.set('showSongList', data)

        case actionsType.CLOSE_SHOW_MES:
            return state.setIn(['showMes', 'is'], false)

        case actionsType.SET_SHOW_MES:
            return state.set('showMes', data)

        case actionsType.UPDATE_SONG_LYRIC:
            const
                currentIndex = state.get('currentIndex'),
                id = state.getIn(['playList', currentIndex, 'id'])

            var newState = state.setIn(['lyricList', id], data)

            _storage.set('lyric-list', newState.get('lyricList'))
            return newState

        default: return state
    }
}