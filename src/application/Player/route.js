// 用作路由， 提供index逻辑, 不提供页面

import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'
import { actionsCreator } from './store'

function PlayerRoute(props) {
    const { setFullScreen, playList } = props

    if (!playList.size) {
        props.history.goBack()
    }

    useEffect(() => {
        setFullScreen(true)
        return () => {
            setFullScreen(false)
        }
    }, [setFullScreen])

    return (
        <>
        </>
    )
}

const
    mapState = state => {
        const playList = state.getIn(['player', 'playList'])

        return {
            playList
        }
    },
    mapDispatch = dispatch => ({
        setFullScreen(bool) {
            const action = actionsCreator.setFullScreen(bool)
            dispatch(action)
        }
    })

export default memo(connect(mapState, mapDispatch)(PlayerRoute))