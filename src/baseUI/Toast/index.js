import React, { memo } from 'react'
import { Wrap, Logo, Message } from './style'


function Toast({ mes, icon }) {
    return (
        <Wrap>
            {
                icon ? (
                    <Logo>
                        <div></div>
                        <div></div>
                    </Logo>) : null
            }
            <Message>{mes}</Message>
        </Wrap >




    )
}

export default memo(Toast)