import styled from 'styled-components'
import style from '../../assets/global-style'


export const
    Wrap = styled.div`
        border-radius: 1rem 1rem 0 0 ;
        width: 100%;
        height: 100%;
        background-color: ${style['highlight-background-color']};
    `,
    //
    Left = styled.div`
        &.iconfont {
            font-size: ${style['font-size-lll']};
        }
    `,
    Center = styled.div`
        ${style['extendClick']()}
        width: 100%;
        height: 100%;
    `