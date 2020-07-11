import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Wrap } from './style'
import { CSSTransition } from 'react-transition-group'

// bottom 单位 rem
function Transition(props) {
    const
        { load = true, children, bottom = 3 } = props,
        history = useHistory(),
        WrapRef = useRef(null)

    useEffect(() => {
        WrapRef.current.style.bottom = bottom + 'rem'
    }, [bottom])

    return (
        <CSSTransition
            in={load}
            timeout={300}
            classNames='fly'
            appear={true}
            unmountOnExit={true}
            onExited={history.goBack}
        >
            <Wrap ref={WrapRef}>
                {children}
            </Wrap>
        </CSSTransition>
    )
}


export default React.memo(Transition)