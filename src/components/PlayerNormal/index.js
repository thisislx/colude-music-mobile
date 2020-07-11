import React, { memo, useCallback, useMemo, useRef, useEffect, useState, createRef } from 'react'
import { modeConfig, playBtnConfig, emptyLine, exactValue } from './config'
import { connect } from 'react-redux'
import { actionsCreator } from '../../application/Player/store'
import { arToArtistNames } from '../../utils'
import { useHistory } from 'react-router-dom'
import { sToMinute } from '../../utils'
import { Lyric } from '../../application/Player/modules'
import { Wrap, Container, Header, HeaderLeft, CD_Wrap, CD_Nav, Control, LyricWrap } from './style'
import FrostGlass from '../../baseUI/FrostGlass'
import ProgressBar from '../../baseUI/ProgressBar'
import cdBack_img from '../../assets/imgs/cd-back.jpg'
import Scroll from '../Scroll'

// 移动进度条前的playing状态, 移动时暂停音乐
let _priorPlaying = false

const PlayerNormal = function (props) {
    const
        {
            togglePlayMode,
            togglePlaying,
            changePlayingSecond,
            togglePlayingSong,
            getSongLyric,
            setShowSongList } = props,
        {
            wait,
            playing,
            playingSecond,
            currentIndex,
            mode,
            playList: playList_imm,
            lyricList: lyricList_imm
        } = props,
        playList = useMemo(() => playList_imm.toJS(), [playList_imm]),
        lyricList = useMemo(() => lyricList_imm.toJS(), [lyricList_imm]),
        currentSong = playList[currentIndex],
        id = currentSong ? currentSong.id : undefined,
        // 总时长
        dt = useMemo(() => currentSong ? currentSong.dt / 1000 : 0, [currentSong]),
        currentPercent = useMemo(() => playingSecond / dt, [playingSecond, dt]),
        history = useHistory()

    const
        [songInfoSpill, setSongInfoSpill] = useState(false), // 歌曲名称太长了~
        [showLyric, setShowLyric] = useState(false),
        // 歌词
        [lyric, setLyric] = useState('歌词加载中...'),
        [currentLyric, setCurrentLyric] = useState(0),
        // 歌词提供者， {origin: '未翻译', local: '翻译' }
        [lyricProvider, setLyricProvider] = useState(null),
        lyricScroll = useRef(null),
        // 存储每行的dom对象
        lyricLineRefs = useRef(new Map()),
        startTime = useMemo(() => playingSecond ? sToMinute(playingSecond) : '0:00', [playingSecond]),
        endTime = useMemo(() => dt ? sToMinute(dt) : '0:00', [dt]),
        onBack = useCallback(() => {
            history.goBack()
        }, [history]),
        songInfoRef = useRef(null),
        getSongLyricHandle = useCallback((id) => {
            id !== undefined && getSongLyric(id)
        }, [getSongLyric]),
        // 进度条跳跃
        progressBarJump = useCallback((percent) => {
            changePlayingSecond(exactValue(percent, dt))
        }, [dt, changePlayingSecond]),
        // 移动进度条
        progressBarMoveHandle = useCallback((percent) => {
            // 移动时暂停音乐
            if (playing) {
                _priorPlaying = true
                togglePlaying(false)
            }
            changePlayingSecond(exactValue(percent, dt))
        }, [playing, dt, changePlayingSecond, togglePlaying]),
        // 移动结束进度条
        progressBarMoveEndHandle = useCallback(() => {
            // 结束时恢复状态
            if (_priorPlaying) {
                togglePlaying(true)
                _priorPlaying = false
            }
        }, [togglePlaying])

    useEffect(() => {
        if (songInfoRef.current) {
            const { offsetWidth, scrollWidth } = songInfoRef.current

            if (offsetWidth < scrollWidth) {
                setSongInfoSpill(true)
            } else {
                setSongInfoSpill(false)
            }
            if (!(id in lyricList)) {
                getSongLyricHandle(id)
            }
        }
    }, [currentSong, songInfoRef, lyricList])

    // 歌发生了变化
    useEffect(() => {
        // 默认状态
        setCurrentLyric(0)
        lyricScroll.current && lyricScroll.current.toTop()

        switch (true) {
            // 不存在歌词
            case !(id in lyricList):
                setLyric('等待好心人上传歌词')
                setLyricProvider(null)
                break

            case lyricList[id].nolyric:
                setLyric('纯音乐请欣赏')
                setLyricProvider(null)
                break

            case 'lrc' in lyricList[id] && 'tlyric' in lyricList[id]:
                existHandle()
                break

            default: setLyric('找不到歌词...')
        }

        function existHandle() {
            const {
                lrc: { lyric: origin }, //原歌词
                tlyric: { lyric: local }, // 翻译
                lyricUser: originUser,  // 原歌词提供者
                transUser: localUser,  // 翻译提供者
            } = lyricList[id]

            origin && setLyric(new Lyric(origin, local))
            originUser && setLyricProvider({
                origin: originUser,
                local: localUser
            })
        }
    }, [lyricList, id, lyricScroll])

    // 刷新滚动范围
    useEffect(() => {
        if (lyricScroll.current && lyric && showLyric) {
            lyricScroll.current.refresh()
        }
    }, [lyricScroll, lyric, showLyric])

    // 歌词滚动
    useEffect((() => {
        // 当前歌词在第几行
        let _previos = Number.MAX_SAFE_INTEGER

        return () => {
            if (typeof lyric === 'object') {
                const
                    line = lyric.cacular(playingSecond * 1000),
                    lineRefs = lyricLineRefs.current

                // line是有效值， 拥有确定的行  行发生了变动 可以调用Scroll的方法
                if (
                    typeof line === 'number' &&
                    lineRefs.has(line) &&
                    _previos !== line &&
                    lyricScroll.current
                ) {
                    lyricScroll.current.toElement(lineRefs.get(line).current)
                    _previos = line
                    setCurrentLyric(line)
                }
            } else {
                _previos = 0
            }
        }
    }), [playingSecond, lyricLineRefs, lyricScroll, lyric])

    if (!currentSong) return <></>

    return (
        <Wrap>
            <FrostGlass img={cdBack_img}>
                <Container>
                    <Header>
                        <HeaderLeft>
                            <aside className='iconfont' onClick={onBack}>
                                &#xe6db;
                            </aside>

                            <main ref={songInfoRef}>
                                {
                                    songInfoSpill ? (
                                        <>
                                            <marquee className='song-name'>
                                                <span className='song-name'>{currentSong.name}</span>
                                            </marquee>
                                            <marquee className='artist'>
                                                {arToArtistNames(currentSong.ar)}
                                            </marquee>
                                        </>) : (
                                            <>
                                                <span className='song-name'>{currentSong.name}</span>
                                                <span className='artist'>
                                                    {arToArtistNames(currentSong.ar)}
                                                </span>
                                            </>)
                                }
                            </main>
                        </HeaderLeft>
                    </Header>

                    {
                        showLyric ? null : (
                            <CD_Wrap
                                className={showLyric ? 'hide' : ''}
                                onClick={e => setShowLyric(true)}
                            >
                                <section className={`cd rotate ${playing ? '' : 'paused'}`}>
                                    <img src={currentSong.al.picUrl + '?param=300x300'} />
                                </section>

                                <CD_Nav className='iconfont'>
                                    <span>&#xe8ab;</span>
                                    <span>&#xe8ba;</span>
                                </CD_Nav>
                            </CD_Wrap>
                        )
                    }

                    {
                        showLyric ? (
                            <LyricWrap
                                onClick={e => setShowLyric(false)}
                            >
                                {
                                    typeof lyric === 'string' || !lyric ?
                                        <section className='active'>{lyric}</section> :
                                        <Scroll ref={lyricScroll}>
                                            <ol className='lyric-article'>
                                                {
                                                    emptyLine.map((item, key) => (<li key={key}></li>))
                                                }
                                                {
                                                    lyric.lines.map((item, key) => {
                                                        // 存储dom方便跳转
                                                        const ref = createRef(null)
                                                        lyricLineRefs.current.set(key, ref)
                                                        return (
                                                            <li
                                                                ref={ref}
                                                                key={key}
                                                                className={key === currentLyric ? 'active' : null}
                                                            >
                                                                {item.txt}
                                                            </li>
                                                        )
                                                    })
                                                }
                                                {
                                                    lyricProvider ? (
                                                        <li className='provider'>
                                                            <span>歌词：{lyricProvider.origin.nickname}</span>
                                                            {
                                                                lyricProvider.local ? (
                                                                    <span>翻译：{lyricProvider.local.nickname}</span>
                                                                ) : null
                                                            }
                                                        </li>) : null
                                                }
                                            </ol>
                                        </Scroll>
                                }

                            </LyricWrap>) : null
                    }

                    <Control className='iconfont'>
                        <section className='progress'>
                            <span className="time text-r">{startTime}</span>
                            <div className="progress-bar-wrap">
                                <ProgressBar
                                    wait={wait}
                                    percent={currentPercent}
                                    onChange={progressBarJump}
                                    onMove={progressBarMoveHandle}
                                    onMoveEnd={progressBarMoveEndHandle}
                                />
                            </div>
                            <span className="time">{endTime}</span>
                        </section>

                        <footer>
                            <span className='play-mode'
                                onClick={togglePlayMode}
                                dangerouslySetInnerHTML={{ __html: modeConfig[mode] }}
                            >
                            </span>

                            {/* 上一首 */}
                            <span
                                onClick={e => togglePlayingSong(0)}
                            >
                                &#xe8c6;
                            </span>

                            <span className='play-btn'
                                onClick={e => togglePlaying()}
                                dangerouslySetInnerHTML={{ __html: playBtnConfig[playing] }}
                            >
                            </span>

                            {/* 下一首 */}
                            <span
                                onClick={e => togglePlayingSong(1)}
                            >
                                &#xe8c5;
                            </span>

                            {/* 打开播放列表 */}
                            <span
                                onClick={e => setShowSongList()}
                            >
                                &#xe604;
                            </span>
                        </footer>
                    </Control>
                </Container>
            </FrostGlass>
        </Wrap>
    )
}

const
    mapState = state => {
        const
            player = state.get('player'),
            playing = player.get('playing'),
            playingSecond = player.get('playingSecond'),
            currentIndex = player.get('currentIndex'),
            mode = player.get('mode'),
            playList = player.get('playList'),
            lyricList = player.get('lyricList')

        return {
            playing,
            playingSecond,
            playList,
            currentIndex,
            mode,
            lyricList
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
        togglePlayMode() {
            const action = actionsCreator.togglePlayMode()
            dispatch(action)
        },
        togglePlayingSong(about) {
            const action = actionsCreator.togglePlayingSong(about)
            dispatch(action)
        },
        setShowSongList() {
            const action = actionsCreator.setShowSongList()
            dispatch(action)
        },
        getSongLyric(id) {
            const action = actionsCreator.getSongLyric(id)
            dispatch(action)
        }
    })
export default connect(mapState, mapDispatch)(memo(PlayerNormal))