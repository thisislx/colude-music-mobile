import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        width: 100%;
        background-color: ${style['theme-back-color']};
        background-size: 30px 30px;
        color: ${style['font-color-light-v2']};
        height: 100%;
        z-index: 50;

        .absolute {
            position: absolute;
        }
        .relative {
            position: relative;
        }
    `,
    Header = styled.header`
        ${style['extendClick']()}
        position: absolute;
        z-index: 9;
        padding: 1rem;
        .iconfont {
            font-size: ${style['font-size-lll']};
        }
    `
