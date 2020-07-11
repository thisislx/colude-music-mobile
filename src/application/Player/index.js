import React, { memo, useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { actionsCreator } from './store'
import { getSongUrl } from './config'
import { throttle } from '../../utils'
import { Wrap, ModeToast } from './style'
import Toast from '../../baseUI/Toast'
import PlayerMini from '../../components/PlayerMini'
import PlayerNormal from '../../components/PlayerNormal'
import Transtion from '../../baseUI/Transition'
import PlayerList from '../../components/PlayerList'

// 音频自然增加
let _natureGrow = false

const Player = function (props) {
    const
        {
            togglePlaying,
            changePlayingSecond,
            togglePlayingSong,
            togglePlayMode,
            removePlayListItem,
            addSong,
            setShowSongList } = props,
        {
            fullScreen,
            showSongList,
            mode,
            playing,
            currentIndex,
            playingSecond,
            playList: playList_imm,
            showMes: showMes_imm } = props,
        showMes = useMemo(() => showMes_imm.toJS(), [showMes_imm]),
        playList = useMemo(() => playList_imm.toJS(), [playList_imm]),
        currentSong = playList[currentIndex],
        // 播放总时长
        dt = useMemo(() => currentSong ? currentSong.dt / 1000 : 0, [currentSong]),
        currentPercent = useMemo(() => playingSecond / dt, [playingSecond, dt]),
        currentId = currentSong ? currentSong.id : undefined

    const
        [canPlay, setCanPlay] = useState(true),
        audioRef = useRef(null),
        audioTimeHandle = useCallback(throttle(() => {
            _natureGrow = true
            changePlayingSecond(audioRef.current.currentTime)
        }, 200), [audioRef, changePlayingSecond]),
        audioWaitingHandle = useCallback(() => {
            setCanPlay(false)
        }, [setCanPlay]),
        audioCanPlayHandle = useCallback(() => {
            setCanPlay(true)
        }, [setCanPlay]),
        audioEndHanlde = useCallback((about) => {
            if (currentId !== undefined) {
                togglePlayingSong(about)
            }
        }, [currentId, togglePlayingSong])

    // 播放地址
    useEffect(() => {
        if (currentId !== null) {
            audioRef.current.src = getSongUrl(currentId)
        }
    }, [currentId])

    // 播放进度控制
    useEffect(() => {
        switch (true) {
            // audioRef.current 发出请求
            case _natureGrow:
                _natureGrow = false
                break

            case +playingSecond + 1 >= dt:
                audioEndHanlde()
                break

            default:
                audioRef.current.currentTime = playingSecond
        }
    }, [playingSecond, dt, audioEndHanlde, audioRef])

    // 播放 or 暂停
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        if (playing && audio.paused && canPlay) {
            playingSecond >= dt || audio.play()
        } else if (!playing && !audio.paused) {
            audio.pause()
        }
    })

    return (
        <Wrap>
            <audio
                ref={audioRef}
                onTimeUpdate={e => audioTimeHandle()}
                onCanPlay={e => audioCanPlayHandle()}
                onEnded={e => audioEndHanlde()}
                onError={e => audioEndHanlde(1)}
                onWaiting={e => audioWaitingHandle()}
            />

            <PlayerMini
                currentSong={currentSong}
                playing={playing}
                togglePlaying={togglePlaying}
                percent={currentPercent}
                onShowSongList={e => setShowSongList(true)}
            />

            {fullScreen ?
                <Transtion bottom={0} >
                    <PlayerNormal
                        wait={!canPlay && playing}
                    />

                    <ModeToast className={showMes.is ? '' : 'decline'}>
                        <Toast icon={showMes.icon} mes={showMes.mes} />
                    </ModeToast>
                </Transtion> : null
            }

            <PlayerList
                list={playList}
                currentIndex={currentIndex}
                mode={mode}
                show={showSongList}
                onReMove={removePlayListItem}
                onClickSong={addSong}
                onClose={e => setShowSongList(false)}
                onMode={togglePlayMode}
            />

        </Wrap>
    )
}

const
    mapState = state => {
        const
            player = state.get('player'),
            fullScreen = player.get('fullScreen'),
            showSongList = player.get('showSongList'),
            playing = player.get('playing'),
            currentIndex = player.get('currentIndex'),
            playingSecond = player.get('playingSecond'),
            mode = player.get('mode'),
            // 以下对象
            showMes = player.get('showMes'),
            playList = player.get('playList')

        return {
            fullScreen,
            showSongList,
            playing,
            currentIndex,
            playingSecond,
            mode,
            showMes,
            playList
        }
    },
    mapDispatch = dispatch => ({
        togglePlaying(bool) {
            const action = bool === undefined ?
                actionsCreator.togglePlaying() :
                actionsCreator.togglePlaying(bool)

            dispatch(action)
        },
        changePlayingSecond(second) {
            const action = actionsCreator.changePlayingSecond(second)
            dispatch(action)
        },
        togglePlayingSong(about) {
            const action = actionsCreator.togglePlayingSong(about)
            dispatch(action)
        },
        removePlayListItem(index) {
            const action = actionsCreator.removePlayListItem(index)
            dispatch(action)
        },
        addSong(song) {
            const action = actionsCreator.addSong(song)
            dispatch(action)
        },
        setShowSongList(bool) {
            const action = bool === undefined ?
                actionsCreator.setShowSongList() :
                actionsCreator.setShowSongList(bool)
            dispatch(action)
        },
        togglePlayMode() {
            const action = actionsCreator.togglePlayMode()
            dispatch(action)
        }
    })

export default connect(mapState, mapDispatch)(memo(Player))