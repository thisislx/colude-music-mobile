import React, { memo, useRef, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Wrap, Header } from './style'
import HorizenList from '../HorizenList'
import Scroll from '../../components/Scroll'

// current 指的是id
const Pager = forwardRef(function (props, ref) {
    const
        { list, children, current, onClick, onPullUp } = props,
        ScrollRef = useRef(null)

    useImperativeHandle(ref, () => (
        ScrollRef.current
    ))

    return (
        <Wrap>
            <Header>
                <HorizenList
                    list={list}
                    current={current}
                    onClick={onClick}
                    doubleClick={false}
                    gap='1'
                />
            </Header>

            <article>
                <Scroll onPullUp={onPullUp} ref={ScrollRef}>
                    {
                        children
                    }
                </Scroll>
            </article>
        </Wrap>
    )
})

Pager.defaultProps = {
    list: [],
    current: Number.MAX_SAFE_INTEGER,
    onClick: () => { },
    onPullUp: () => { }
}

Pager.propTypes = {
    list: PropTypes.array,
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func,
    onPullUp: PropTypes.func
}

export default memo(Pager)
