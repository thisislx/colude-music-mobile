import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        width: 100%;
        height: 100%;
        position: relative;

        > article {
            position: absolute;
            overflow: hidden;
            top: 2rem;
            bottom: 0;
            width: 100%;
        }
    `,
    Header = styled.ol`
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 2.4rem;
        color: ${style['font-color-desc']};
        font-size: ${style['font-size-m']};
        
        >li {
            ${style['extendClick']()}
            height: inherit;
            line-height: 2.4rem;
            padding: .2rem 0;
            text-align: center;
            white-space: nowrap;

            &.current {
                color: ${style['theme-color']};
                border-bottom: .1rem solid ${style['theme-color']};
            }
        }
    `