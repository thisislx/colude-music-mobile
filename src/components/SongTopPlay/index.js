import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Wrap, Left, Center } from './style'
import SongItem from '../SongItem'

const SongTopPlay = function (props) {
    const
        { onClick, amount, right } = props

    return (
        <Wrap >
            <SongItem
                centerClick={onClick}
                left={<Left className='iconfont' >&#xe726;</Left>}
                center={
                    <Center>
                        播放全部&nbsp;
                        <span className='remark'>共({amount})首</span>
                    </Center>
                }
                right={right}
            />
        </Wrap>
    )
}

SongTopPlay.defaultProps = {
    onClick: null,
    right: null,
    amount: 0
}

SongTopPlay.propTypes = {
    onClick: PropTypes.func,
    right: PropTypes.node,
    amount: PropTypes.node
}

export default memo(SongTopPlay)