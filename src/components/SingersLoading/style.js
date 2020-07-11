import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        width: 100%;

        > div {
            position: absolute;  
            left: 50%;
            right: 50%;
            text-align: center;
            transform: translateX(-50%);
            
            > .message {
                position: absolute;
                top: .5rem;
                left: -1rem;
                white-space: nowrap;
                color: ${style['font-color-desc-v2']};
            }
        }
    `,
    Enter = styled.div`
        bottom: 50%;
    `,
    PullUp = styled.div`
        bottom: 6%;
    `,
    PullDown = styled.div`
        top: 12%;
    `