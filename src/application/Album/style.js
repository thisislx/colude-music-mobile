import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: column;
        bottom: 0;
        z-index: 50;
        width: 100%;
        max-width: ${style['max-width']};
        background-color: ${style['theme-back-color']};
        transform-origin: left center;
        transition: .3s ease-out;

        &.fly-enter, &.fly-appear {
            transform: rotateX(90deg);
        }
        &.fly-enter-active, &.fly-appear-active {
            transform: rotateX(0deg);
        }
        &.fly-exit {
            transform: rotateX(0deg);
        }
        &.fly-exit-active {
            transform: rotateX(90deg);
        }
    `,
    Song = styled.div`
        flex: 1;

        .title {
            padding: .2rem 1rem;
            color: ${style['font-color-desc-v2']};
            font-size: ${style['font-size-s']};
        }
    `