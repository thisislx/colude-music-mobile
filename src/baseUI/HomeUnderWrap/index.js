import React, { useEffect, useRef, memo } from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'

const Wrap = styled.div`
        position: fixed;
        width: 100%;
        top: 5.5rem;
        bottom: 3rem;
        max-width: ${style['max-width']};
        overflow: hidden;
        z-index: 50;
        background-color: ${style['theme-back-color']};
     `

const HomeUnderWrap = function (props) {
    const
        // 单位rem
        { top, bottom } = props,
        WrapRef = useRef(null)

    useEffect(() => {
        if (typeof top !== 'undefined') {
            WrapRef.current.style.top = top + 'rem'
        }
    }, [top])

    useEffect(() => {
        if (typeof bottom !== 'undefined') {
            WrapRef.current.style.bottom = bottom + 'rem'
        }
    }, [bottom])

    return (
        <Wrap ref={WrapRef}>
            {props.children}
        </Wrap>
    )
}

export default memo(HomeUnderWrap)