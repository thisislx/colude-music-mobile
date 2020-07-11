import React from 'react'
import {Wrap } from './style'
import Toast from '../../baseUI/Toast'

// 没启动
const PlayerToast = function(props) {
    const { sta } = props
    return (
        <Wrap>
            <Toast />
        </Wrap>
    )
}

export default React.memo(PlayerToast)