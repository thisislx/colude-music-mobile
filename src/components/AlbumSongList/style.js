import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    List = styled.ol`
        height: 100%;
        font-size: ${style['font-size-l']};
        color: ${style['font-color-desc']};
        background-color: ${style['highlight-background-color']};
        border-radius: .8rem .8rem 0 0;

        .iconfont {
            font-size: ${style['font-size-lll']};
        }

        .remark {
            margin-top: .5rem;
        }
    `,
    PlayAllBtn = styled.button`
        height: 2rem;
        width: 7rem;
        font-size: ${style['font-size-s']};
        border: none;  
        text-align: center;
        vertical-align: baseline;
        margin-right: .5rem;
        border-radius: 1rem;
        color: ${style['font-color-light-v2']};
        background-color: ${style['theme-color']};
    `