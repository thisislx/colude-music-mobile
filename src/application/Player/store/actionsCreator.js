import actionsType from './actionsType'
import { fromJS } from 'immutable'
import { playMode } from '../config'
import { overLoad, randomNumber } from '../../../utils'
import { getSongDetailRequest, getSongLyricRequest } from '../../../api/request'

// 随机index, 不包括max
const randomIndex = (currentIndex = -1, max) => {
    const index = randomNumber(0, max, true)
    return currentIndex !== index ? index : randomIndex(0, max, true)
}

// 对外方法 播放列表更改， 并且从第几首开始播放
export const addSongList = (list, index = 0) => {
    return (dispatch, getState) => {
        const { mode, playList: { length } } = getState().get('player').toJS()

        dispatch(actionsCreator.togglePlaying(true))
        dispatch(actionsCreator.updatePlayList(list))
        dispatch(actionsCreator.changeCurrentIndex(mode === 2 ?
            randomIndex(undefined, length) : index))
        dispatch(actionsCreator.changePlayingSecond())
    }
}

// 增加一首, 可以接受整个数据或者单个id
export const addSong = (songOrId) => {
    if (typeof songOrId !== 'object')
        return (dispatch, getState) => {
            getSongDetailRequest(songOrId).then(res => {
                if ('songs' in res) {
                    addSong(res.songs[0])(dispatch, getState)
                }
            })
        }

    return (dispatch, getState) => {
        const
            player = getState().get('player').toJS(),
            { playList, currentIndex } = player,
            existSongIndex = playList.findIndex(play => play.id === songOrId.id)
        switch (true) {
            // 点击相同歌曲
            case ~existSongIndex && existSongIndex === currentIndex:
                return dispatch(actionsCreator.togglePlaying())

            // 存在播放列表
            case existSongIndex >= 0:
                dispatch(actionsCreator.changeCurrentIndex(existSongIndex))
                break

            case existSongIndex < 0:
                dispatch(actionsCreator.changeCurrentIndex(0))
                dispatch(actionsCreator.updatePlayList([songOrId].concat(playList)))
                break

            default: break
        }
        dispatch(actionsCreator.changePlayingSecond())
        dispatch(actionsCreator.togglePlaying(true))
    }
}

// 默认导出
const actionsCreator = {
    init() {
        delete this.init

        overLoad(this, 'togglePlaying', bool => ({
            type: actionsType.TOGGLE_PLAYING,
            data: bool
        }))

        overLoad(this, 'setShowSongList', bool => ({
            type: actionsType.SET_SHOW_SONG_LIST,
            data: bool
        }))

        this.addSong = addSong
        this.addSongList = addSongList
        return this
    },

    togglePlaying() {
        return (dispatch, getState) => {
            const bool = getState().getIn(['player', 'playing'])

            dispatch({
                type: actionsType.TOGGLE_PLAYING,
                data: !bool
            })
        }
    },

    changePlayingSecond(second = 0) {
        return {
            type: actionsType.CHANGE_PLAYING_SECOND,
            data: second
        }
    },

    // 播放模式
    togglePlayMode() {
        return (dispatch, getState) => {
            const
                index = getState().getIn(['player', 'mode']),
                nextIndex = index + 1 === playMode.length ? 0 : index + 1

            dispatch({
                type: actionsType.TOGGLE_PLAY_MODE,
                data: nextIndex
            })

            __.toggleModeShowMes(dispatch)(nextIndex)
        }
    },

    // 全屏
    setFullScreen(bool) {
        return {
            type: actionsType.SET_FULL_SCREEN,
            data: bool
        }
    },

    // 播放列表
    setShowSongList(bool) {
        return (dispatch, getState) => {
            const showSongList = getState().getIn(['player', 'showSongList'])
            dispatch({
                type: actionsType.SET_SHOW_SONG_LIST,
                data: !showSongList
            })
        }
    },

    // 播放列表
    updatePlayList(list) {
        return {
            type: actionsType.UPDATE_PLAY_LIST,
            data: fromJS(list)
        }
    },

    // 当前播放index
    changeCurrentIndex(index = 0) {
        return {
            type: actionsType.CHANGE_CURRENT_INDEX,
            data: index
        }
    },

    // 1下一首， 0上一首, 不传值当前歌曲结束，播放下一首
    togglePlayingSong(about) {

        // 统一dispatch
        const handleDispatch = dispatch => (newIndex) => {
            dispatch(this.changeCurrentIndex(newIndex))
            dispatch(this.changePlayingSecond())
            dispatch(this.togglePlaying(true))
        }

        this.togglePlayingSong = about => (dispatch, getState) => {
            const
                { mode, currentIndex, playList } = getState().get('player').toJS(),
                length = playList.length
            let nextIndex

            switch (true) {
                // 单曲循环非手动上一首下一首 or 单首歌曲
                case (mode === 1 && about === undefined):
                case length === 1:
                    return handleDispatch(dispatch)(currentIndex)

                // 两首歌的情况
                case length === 2:
                    return handleDispatch(dispatch)(currentIndex ? 0 : 1)

                // 顺序播放
                case mode === 0 && about === undefined:
                    return handleDispatch(dispatch)(currentIndex + 1)

                // 随机播放
                case mode === 2:
                    return handleDispatch(dispatch)(randomIndex(currentIndex, length))

                // 下一首
                case about === 1:
                    nextIndex = currentIndex + 1 !== length ? currentIndex + 1 : 0
                    return handleDispatch(dispatch)(nextIndex)

                // 上一首
                case about === 0:
                    nextIndex = currentIndex ? currentIndex - 1 : length - 1
                    return handleDispatch(dispatch)(nextIndex)

                default: break
            }
        }

        return this.togglePlayingSong(about)
    },

    removePlayListItem(index) {
        return (dispatch, getState) => {
            const currentIndex = getState().getIn(['player', 'currentIndex'])

            dispatch({
                type: actionsType.REMOVE_PLAY_LIST_ITEM,
                data: index
            })
            if (currentIndex === index) {
                dispatch(this.togglePlaying(false))
                dispatch(this.changePlayingSecond())
            } else if (index < currentIndex) {
                // 前面少了一项， currentIndex前移
                dispatch(this.changeCurrentIndex(currentIndex - 1))
            }
        }
    },

    getSongLyric(id) {
        return dispatch => {
            getSongLyricRequest(id).then(res => {
                dispatch(__.getSongLyric(res))
            })
        }
    }

}.init()

const __ = {
    toggleModeShowMes: function myF(dispatch, timer = 1000) {
        myF.timer && clearTimeout(myF.timer)

        return (index) => {
            const action = {
                type: actionsType.SET_SHOW_MES,
                data: fromJS({
                    is: true,
                    icon: false,
                    mes: playMode[index]
                })
            }
            dispatch(action)

            myF.timer = setTimeout(() => {
                dispatch(this.closeShowMes())
            }, timer)
        }
    },

    closeShowMes() {
        return {
            type: actionsType.CLOSE_SHOW_MES
        }
    },

    getSongLyric(data) {
        return {
            type: actionsType.UPDATE_SONG_LYRIC,
            data: fromJS(data)
        }
    }
}


export default actionsCreator


