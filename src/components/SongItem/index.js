import React, { memo, forwardRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Wrap, Left, Center, Right } from './style'
import musicNote from '../../baseUI/musicNote'

const SongItem = forwardRef(function (props, ref) {
    const
        { left, center, right, centerClick, onClick } = props,
        onCenterClickHandle = useCallback((coordinate) => {
            if (centerClick) {
                centerClick()
                musicNote(coordinate)
            }
        }, [centerClick])
    return (
        <div ref={ref} onClick={e => onClick && onClick()}>
            {left ? <Left>{left}</Left> : null}
            <Wrap>
                {center ?
                    <Center
                        onClick={e => {
                            const { clientX: x, clientY: y } = e
                            onCenterClickHandle({ x, y })
                        }}
                    >
                        {center}
                    </Center> : null
                }
                
                {right ? <Right>{right}</Right> : null}
            </Wrap>
        </div>
    )
})


SongItem.defaultProps = {
    left: null,
    center: null,
    right: null,
    onClick: null,
    centerClick: null
}

SongItem.propTypes = {
    left: PropTypes.node,
    center: PropTypes.node,
    right: PropTypes.node,
    onClick: PropTypes.func,
    centerClick: PropTypes.func
}
export default memo(SongItem)