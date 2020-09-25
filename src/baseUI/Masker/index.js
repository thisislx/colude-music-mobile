import React from 'react'
import Transtion from '../Transition'
const _style = {
    background: 'rgba(0,0,0,.2)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
}

const Masker = props => {
    return (
        <Transtion>
            <div style={_style}></div>
        </Transtion>

    )
}

export default React.memo(Masker)