import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        top: 16rem;
        border-radius: 1rem 1rem 0 0; 
        color: ${style['font-color-desc']};
        bottom: 0;
        width: 100%;
        position: absolute;
        background-color: ${style['theme-back-color']};

        .scroll-wrap {
            bottom: 0;
            width: 100%;
            top: 3.6rem;
            overflow: hidden;
            position: absolute;
        }
    `,
    List = styled.div`
        width: 100%;

        .iconfont {
            font-weight: 600;
            vertical-align: text-bottom;
            padding: 0 1rem;
            font-size: ${style['font-size-lll']};
        }

        .song {
            background-color: ${style['highlight-background-color']};

            footer {
                margin-top: .6rem;
            }
        }
    `