import React, { memo, useState, useEffect, useRef } from 'react'
import { playModeConfig } from './config'
import PropTypes from 'prop-types'
import { arToArtistNames } from '../../utils'

import { Wrap, List, ListItem } from './style'
import { CSSTransition } from 'react-transition-group'
import Scroll from '../Scroll'

const PlayerList = function (props) {
    const
        { show, list, mode, currentIndex } = props,
        { onReMove, onClose, onClickSong, onMode } = props,
        [myShow, setMyShow] = useState(show),
        ScrollRef = useRef(null)

    useEffect(() => {
        setMyShow(show)
    }, [show])

    useEffect(() => {
        ScrollRef.current && ScrollRef.current.refresh()
    }, [list])

    return (
        <CSSTransition
            in={myShow}
            timeout={{ enter: 200, exit: 200 }}
            classNames='pop'
            appear={true}
            unmountOnExit={true}
            onExited={onClose}
        >
            <Wrap onClick={e => setMyShow(false)}>
                <List onClick={e => e.stopPropagation()}>
                    <header>
                        <section>
                            当前播放<span className='mark'>({list.length})</span>
                        </section>
                        <section onClick={e => onMode()}>
                            {playModeConfig[mode]}
                        </section>
                    </header>

                    <article>
                        <Scroll ref={ScrollRef}>
                            <main>
                                {
                                    list.map((item, index) => (
                                        <ListItem key={item.id}>
                                            <article
                                                onClick={e => onClickSong(item)}
                                                className={`song-info ${index === currentIndex ? 'active' : ''}`}
                                            >
                                                <span className='song-name'>
                                                    {item.name}
                                                </span>
                                                <span className='artist'>
                                                    {arToArtistNames(item.ar)}
                                                </span>
                                            </article>
                                            <aside
                                                className='iconfont'
                                                onClick={e => onReMove(index)}
                                            >
                                                &#xe6dd;
                                            </aside>
                                        </ListItem>
                                    ))
                                }
                            </main>
                        </Scroll>
                    </article>
                </List>
            </Wrap >
        </CSSTransition >
    )
}

PlayerList.defaultProps = {
    show: false,
    list: [],
    mode: 3,
    currentIndex: Number.MAX_SAFE_INTEGER,
    onClose: () => { },
    onReMove: null
}

PlayerList.propTypes = {
    show: PropTypes.bool,
    list: PropTypes.array,
    currentIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    mode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClose: PropTypes.func,
    onReMove: PropTypes.func
}

export default memo(PlayerList)