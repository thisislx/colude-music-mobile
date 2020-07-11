import React, { useState, useCallback, useRef, memo, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'

import { actionsCreator } from './store'
import { addSong, addSongList } from '../Player/store'
import { connect } from 'react-redux'
import { Wrap, Header } from './style'
import Transition from '../../baseUI/Transition'
import Songs from '../../components/SingerSongs'
import Author from '../../components/SingerAuthor'
import Toast from '../../baseUI/Toast'

function Singer(props) {
    const
        { match: { params: { id } }, singer } = props,
        { getSingerInfo, addSong, addSongList } = props,
        { showMes, artist, hotSongs } = singer.toJS(),
        [showState, setShowState] = useState(true),
        AuthorRef = useRef(null),
        songsOnScroll = useCallback(y => {
            y >= 0 && (AuthorRef.current.style.transform = `scale(${1 + y / 200})`)
        }, [AuthorRef]),
        onSongsClick = useCallback(songOrList => {
            return Array.isArray(songOrList) ?
                addSongList(songOrList) : addSong(songOrList)
        }, [addSong, addSongList])

    useEffect(() => {
        getSingerInfo(id)
    }, [getSingerInfo, id])

    return (
        <Transition load={showState}>
            {renderRoutes(props.route.routes)}

            {
                showMes.is ? <Toast icon={showMes.icon} mes={showMes.mes} /> :
                    (
                        <Wrap>
                            <Header onClick={e => setShowState(false)}>
                                <span className='iconfont'>&#xe6db;</span>
                            </Header>

                            <Author
                                ref={AuthorRef}
                                picUrl={artist.picUrl}
                                name={artist.name}
                            />

                            <Songs
                                list={hotSongs}
                                onScroll={songsOnScroll}
                                onClick={onSongsClick}
                            />
                        </Wrap>
                    )
            }
        </Transition>
    )
}

const
    mapState = state => {
        const
            singer = state.get('singer')
        return {
            singer
        }
    },
    mapDispatch = dispatch => ({
        getSingerInfo(id) {
            const action = actionsCreator.getSingerInfo(id)
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

export default connect(mapState, mapDispatch)(memo(Singer))