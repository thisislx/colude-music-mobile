import React, { useCallback, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { List, ListItem } from './style'
import Scroll from '../Scroll'
import LazyLoad, { forceCheck } from 'react-lazyload'
import lazy_img from '../../assets/imgs/lazy.png'


function SingerList(props) {
    const
        { list } = props,
        { onPullUp, onPullDown } = props,
        ScrollRef = useRef(null),
        history = useHistory(),
        onEnterDetail = useCallback(id => {
            if (onEnterDetail.locked && id === undefined) return
            onEnterDetail.locked = true
            history.push(`/singers/${id}`)

            setTimeout(() => {
                onEnterDetail.locked = false
            }, 500)
        }, [history])

    useEffect(() => {
        ScrollRef.current && ScrollRef.current.refresh()
    }, [list, ScrollRef])

    return (
        <Scroll
            ref={ScrollRef}
            onPullUp={onPullUp}
            onPullDown={onPullDown}
            onScroll={forceCheck}
        >
            <List>
                {
                    list.map(item => {
                        return (
                            <ListItem key={item.id} onClick={e => onEnterDetail(item.id)}>
                                <LazyLoad placeholder={<img src={lazy_img} alt='music' />} >
                                    <img src={`${item.picUrl}?param=300x300`} alt='music' />
                                </LazyLoad>
                                <div className='name'>{item.name}</div>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Scroll>
    )
}

SingerList.defaultProps = {
    list: [],
    onPullUp: null,
    onPullDown: null
}

SingerList.propTypes = {
    list: PropTypes.array,
    onPullDown: PropTypes.func,
    onPullUp: PropTypes.func
}


export default React.memo(SingerList)