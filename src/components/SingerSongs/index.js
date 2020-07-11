import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { Wrap, List } from './style'
import Scroll from '../../components/Scroll'
import SongItem from '../../components/SongItem'
import SongTopPlay from '../../components/SongTopPlay'

const SingerSongs = function (props) {
    const
        { list, onScroll: outOnScroll, onClick } = props,
        WrapRef = useRef(null),
        ScrollRef = useRef(null),
        // 歌曲点击
        onClickSongHandle = useCallback((songOrList) => {
            onClick && onClick(songOrList)
        }, [onClick]),
        onScroll = useCallback(({ y }) => {
            // 单位px; y为 -1 * y
            const
                minTop = 40,
                { current: el } = WrapRef,
                { lockedRefresh } = onScroll,
                initialTop = onScroll.initialTop ||
                    (onScroll.initialTop = parseInt(getComputedStyle(el).top)),
                res = initialTop + y * 1.4

            //大于最小top
            res >= minTop && (el.style.top = `${res}px`) &&
                lockedRefresh && (onScroll.lockedRefresh = false)

            // 更改了el.top就要重新刷新容器高度
            if (!lockedRefresh && res <= minTop) {
                ScrollRef.current.refresh()
                onScroll.lockedRefresh = true
            }

            outOnScroll(y)
        }, [WrapRef, ScrollRef, outOnScroll])

    return (
        <Wrap ref={WrapRef}>
            <SongTopPlay
                onClick={e => onClickSongHandle(list)}
                amount={list.length}
            />
            <div className='scroll-wrap' >
                <Scroll onScroll={onScroll} ref={ScrollRef}>
                    <List >
                        {
                            list.map((item, key) => {
                                const left = <aside>{key}</aside>
                                const center = (
                                    <main className='song'>
                                        <header>{item.name}</header>
                                        <footer className='remark'>
                                            {
                                                item.ar.map((item, key) => {
                                                    if (key)
                                                        return ` - ${item.name}`
                                                    return item.name
                                                })
                                            }
                                        </footer>
                                    </main>
                                )
                                return <SongItem
                                    centerClick={e => onClickSongHandle(item)}
                                    left={left}
                                    center={center}
                                    key={item.id}
                                />
                            })
                        }
                    </List>
                </Scroll>
            </div>
        </Wrap>
    )
}

SingerSongs.defaultProps = {
    list: [],
    onClick: null,
    onScroll: null
}

SingerSongs.prototype = {
    list: PropTypes.array,
    onClick: PropTypes.func,
    onScroll: PropTypes.func
}

export default React.memo(SingerSongs)