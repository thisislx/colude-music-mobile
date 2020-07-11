import React from 'react'
import { Wrap } from './style'

function FrosstGlass(props) {
    const
        { img, children } = props,
        backImgStyle = {
            background: `url('${img}') 0 / cover`
        }

    return (
        <Wrap style={backImgStyle}>
            <main>
                <div className='mask' style={backImgStyle}></div>
                {children}
            </main>
        </Wrap>
    )
}

export default React.memo(FrosstGlass)