import styled from 'styled-components'
import style from '../../assets/global-style'

export const
     List = styled.div`
        padding-top: .6rem;
        background-color: ${style['theme-back-color']};
        box-shadow: 0 0 .4rem  rgba(0,0,0,.1);
        width: 20rem;

        > li {
            display: flex;
            padding: .5rem;

            > article {
                ${style['noWrap']()}
                margin-left: 1rem;
                color: ${style['font-color-desc-v2']};
            }
        }
    `

