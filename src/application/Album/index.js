import React, { useState, useEffect, useCallback, createContext, useMemo, useRef } from 'react'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import { actionsCreator } from './store'
import { addSong, addSongList } from '../Player/store'

import { Song } from './style'
import AlbumHeader from '../../components/AlbumHeader'
import AlbumSongList from '../../components/AlbumSongList'
import AlbumLoading from '../../components/AlbumLoading'
import AlbumNav from '../../components/AlbumNav'
import Scroll from '../../components/Scroll'
import Transition from '../../baseUI/Transition'

// Nav使用
export const AlbumContext = createContext(null)

function Album(props) {
    const
        { match: { params: { id } } } = props,
        { toastState, detail } = props,
        { getAlbum, addSong, addSongList } = props,
        toastState_JS = toastState.toJS(),
        detail_JS = detail.toJS(),
        // 控制页面显示和关闭
        [showStatus, setShowStatus] = useState(true),
        NavRef = useRef(null),
        onBack = useCallback(() => {
            setShowStatus(false)
        }, [setShowStatus]),
        onSongListClick = useCallback((songOrSongList) => {
            Array.isArray(songOrSongList) ?
                addSongList(songOrSongList) :
                addSong(songOrSongList)
        }, [addSongList, addSong]),
        // 接受正负表示方向的y值
        onScroll = useCallback(({ y }) => {
            // 完全褪去  最大y值(* -1)
            const { _faded, _maxY } = onScroll

            if (y < -100) {
                if (y < _maxY) return
                onScroll._faded = false
                const present = Math.min(1, Math.abs(y / 600))
                if (present === 1) {
                    onScroll._maxY = y
                }
                NavRef.current.style.opacity = present
            } else if (!_faded) {
                onScroll._faded = true
                NavRef.current.style.opacity = 0
            }
        }, [NavRef]),
        providerValue = useMemo(() => {
            return {
                methods: {
                    onBack
                },
                state: {
                    title: detail_JS.name || '',
                    toastState: toastState_JS
                }
            }
        }, [detail, toastState])

    useEffect(() => {
        if (id == undefined) return
        getAlbum(id)
    }, [])

    return (
        <AlbumContext.Provider value={providerValue}>
            <Transition load={showStatus} >

                {renderRoutes(props.route.routes)}

                <AlbumNav ref={NavRef} opacity={0} />
                {
                    toastState_JS.is ?
                        (<AlbumLoading state={toastState_JS} />) :
                        (
                            <Scroll onScroll={onScroll}>
                                <div>
                                    <AlbumHeader
                                        img={detail_JS.coverImgUrl}
                                        playCount={detail_JS.playCount}
                                        creator={detail_JS.creator}
                                        title={detail_JS.name}
                                        onBack={onBack}
                                    />

                                    <Song>
                                        <div className='title'>歌曲列表</div>
                                        <AlbumSongList
                                            collectCount={detail_JS.subscribedCount}
                                            list={detail_JS.tracks}
                                            onClick={onSongListClick}
                                        />
                                    </Song>
                                </div>
                            </Scroll>
                        )
                }
            </Transition>
        </AlbumContext.Provider>
    )
}

const
    mapState = state => {
        const
            album = state.get('album'),
            toastState = album.get('toastState'),
            detail = album.get('detail')

        return {
            toastState,
            detail
        }
    },
    mapDispatch = dispatch => ({
        getAlbum(id) {
            const action = actionsCreator.getAlbum(id)
            dispatch(action)
        },
        addSong(song) {
            const action = addSong(song)
            dispatch(action)
        },
        // 歌曲列表， 从第几首播放
        addSongList(songList, index = 0) {
            const action = addSongList(songList, index)
            dispatch(action)

        }
    })
export default connect(mapState, mapDispatch)(React.memo(Album))