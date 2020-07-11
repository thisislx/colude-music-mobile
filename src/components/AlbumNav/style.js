import styled from 'styled-components'
import style from '../../assets/global-style'

export const 
    Wrap = styled.div`
        position: absolute;
        z-index: 99;
        width: 100%;
        height: 2.6rem;
        line-height: 2.6rem;
        color: ${style['font-color-light-v2']};
        background-color: ${style['theme-color']};

        .iconfont {
            display: inline-block;
            height: 100%;
            font-size: ${style['font-size-lll']};
            padding: 0 1rem;
            vertical-align: bottom;
        }
    `