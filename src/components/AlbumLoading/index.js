import React from 'react'
import { } from './style'
import AlbumNav from '../AlbumNav'
import Toast from '../../baseUI/Toast'

function AlbumLoading({state}) {

    return (
        <>
            <AlbumNav />
            <Toast mes={state.mes} icon={state.icon} />
        </>
    )
}

export default React.memo(AlbumLoading)