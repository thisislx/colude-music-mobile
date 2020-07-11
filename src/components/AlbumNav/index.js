import React, { useContext, forwardRef, useMemo } from 'react'
import { Wrap } from './style'
import { AlbumContext } from '../../application/Album'

const AlbumNav = forwardRef(function (props, ref) {
    const
        { opacity } = props,
        { state, methods } = useContext(AlbumContext),
        { title, toastState: { is, mes } } = state,
        { onBack } = methods,
        WrapStyle = useMemo(() => {
            return opacity === undefined ? {} : { opacity }
        }, [opacity])

    return (
        <Wrap ref={ref} style={WrapStyle}>
            <span
                className='iconfont'
                onClick={onBack}
            >
                &#xe6db;
             </span>
            <span>{is ? mes : title}</span>
        </Wrap>
    )
})


export default React.memo(AlbumNav)