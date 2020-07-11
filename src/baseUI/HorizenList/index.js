import React, { memo, useState, useCallback, useRef, useEffect } from 'react'
import { setElMaxWidth } from '../../utils'
import { List, ListItem } from './style'
import PropersType from 'prop-types'
import Scroll from '../../components/Scroll'

const HorizenList = function (props) {
    const
        { list, current, title, onClick, ground, doubleClick, gap } = props,
        [selected, setSelected] = useState(current),
        wrap_ref = useRef(null),
        scroll_ref = useRef(null),
        selectHandle = useCallback((id) => {
            if (id === selected && doubleClick) {
                setSelected()
                // 再次点击相同的值传入为空
                onClick && onClick()
            } else {
                setSelected(id)
                onClick && onClick(id)
            }
        }, [selected, onClick, doubleClick, current])

    useEffect(() => {
        setElMaxWidth(wrap_ref.current)
        scroll_ref.current.refresh()
    }, [list])

    useEffect(() => {
        setSelected(current)
    }, [current])

    return (
        <Scroll direction='horizental' ref={scroll_ref}>
            <List ref={wrap_ref}>
                {
                    title ? <ListItem className='title'>{title}:</ListItem> : null
                }
                <main className={ground ? 'ground' : ''}>
                    {
                        list.map((item) => (
                            <ListItem
                                style={gap ? { marginRight: `${gap}rem` } : null}
                                onClick={e => selectHandle(item.id)}
                                key={item.id}
                                className={selected === item.id ? 'selected' : ''}
                            >
                                {item.name}
                            </ListItem>
                        ))
                    }
                </main>
            </List>
        </Scroll>
    )
}


HorizenList.defaultProps = {
    list: [],
    current: undefined,
    title: undefined,
    onClick: null,
    ground: false,
    doubleClick: true,
    gap: '',
}

HorizenList.propTypes = {
    list: PropersType.array,
    current: PropersType.oneOfType([PropersType.string, PropersType.number]),
    title: PropersType.string,
    onClick: PropersType.func,
    ground: PropersType.bool,
    doubleClick: PropersType.bool,
    gap: PropersType.oneOfType([PropersType.string, PropersType.number])
}

export default memo(HorizenList)
