import styled from 'styled-components'
import style from '../../assets/global-style'

export const Container = styled.div`
        height: 100%;
        width: 98%;
        margin: 0 auto;
        background-color: ${style['highlight-background-color']};
        position: relative;
        border-radius: .4rem;
        overflow: hidden;

        & .swiper-wrapper {
            height: 10rem;
  
            & img {
            }
        }
    `