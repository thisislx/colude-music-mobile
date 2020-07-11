import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { List, PlayAllBtn } from './style'
import SongItem from '../SongItem'
import { greateNumberToText } from '../../utils'
import SongTopPlay from '../../components/SongTopPlay'

function AlbumSongList(props) {
    const
        { list, collectCount, onClick } = props,
        onClickSongHandle = useCallback((songOrSongList) => {
            onClick && onClick(songOrSongList)
        }, [onClick])

    return (
        <List>
            <SongTopPlay
                onClick={e => onClickSongHandle(list)}
                amount={list.length}
                right={<PlayAllBtn>+ 收藏({greateNumberToText(collectCount)})</PlayAllBtn>}
            />

            {
                list.map((item, index) => {
                    const
                        Left = (
                            <aside>{index}</aside>
                        ),
                        Center = (
                            <>
                                <section >{item.name}</section>
                                <section className='remark'>
                                    <span>
                                        {item.ar.map((item, key) => {
                                            if (key > 1)
                                                return ` / ${item.name}`
                                            return item.name
                                        })}
                                    </span>
                                    <span> - </span>
                                    <span>
                                        {item.al.name}
                                    </span>
                                </section>
                            </>
                        ),
                        Right = (
                            <aside className='iconfont'>
                                &#xe726;
                            </aside>
                        )
                    return <SongItem
                        centerClick={e => onClickSongHandle(item)}
                        key={item.id}
                        left={Left}
                        center={Center}
                        right={Right}
                    />
                })
            }
        </List >
    )
}

AlbumSongList.defaultProps = {
    list: [],
    onClick: null
}

AlbumSongList.propTypes = {
    list: PropTypes.array,
    onClick: PropTypes.func
}

export default memo(AlbumSongList)