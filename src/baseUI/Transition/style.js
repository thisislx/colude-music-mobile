import styled from "styled-components";
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        max-width: ${style['max-width']};
        margin: 0 auto;
        z-index: 50;
        display: flex;
        flex-direction: column;
        background-color: ${style['theme-back-color']};
        transform-origin: left center;
        transition: .3s ease-out;

        &.fly-enter, &.fly-appear {
            opacity: 0;
        }
        &.fly-enter-active, &.fly-appear-active {
            opacity: 1;
        }
        &.fly-exit {
            opacity: 1;
        }
        &.fly-exit-active {
            opacity: 0;
        }`