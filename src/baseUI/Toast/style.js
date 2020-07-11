import style from '../../assets/global-style'
import styled, { keyframes } from 'styled-components'

let rotate = 0

const
    loading = keyframes`

    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(.25) rotate(${(rotate++) * 360 + 250}deg);
    }

    100% {
        transform: scale(1) rotate(${(rotate) * 360}deg);
    }
 
`

export const Wrap = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 49;  
    transform: translate(-50%, -50%);
    font-size: ${style['font-size-m']};
    `,
    Logo = styled.div`
        width: 1.5rem;
        height: 1.5rem;
        overflow: hidden;
        position: relative;
        border-radius: 50%;
        margin: 0 auto;

        >div {
            width: 100%;
            height: 100%;
            border-radius: 40%;
            opacity: .7;
            background-color: ${style['theme-color']};
            animation: ${loading} 3s  infinite ease-in-out;
            position: absolute;
        }

        >div:nth-child(2) {
            animation-delay: -1.3s;
        }
    `,
    Message = styled.div`
        font-weight: 600;   
        margin-top: .5rem;
        color: inherit;
        white-space: nowrap;
        text-shadow: ${style['theme-back-color-shadow']};
    `