import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        max-width: ${style['max-width']};
        margin: 0 auto;
        width: 100%;
        bottom: 0;
        position: fixed;
        z-index: 60;
        
        .hide {
            visibility: hidden;
            z-index: -99;
            position: absolute;
        }
    `,
    ModeToast = styled.div`
        z-index: 9;
        position: absolute;
        left: 2rem;
        bottom: .8rem; 
        transform: translateX(-50%);
        transition: .3s ease-out;
        color: ${style['font-color-light']};

        &.decline {
            bottom: -2rem;
            transition-timing-function: ease-in;
        }
    `
