import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    List = styled.ol`
        font-size: inherit;
        color: inherit;
        ${style['font-color-desc-v2']};
        box-shadow: 0 .1rem .3rem -.2rem ${style['border-color']};
        > .title {
           float: left;
        }

        > main {
            display: flex; 
            align-items: baseline;

            &.ground {
                > li {
                    background-color: ${style['theme-back-color-v2']};
                    border-radius: .8rem;
                }
            }
        }
    `,
    ListItem = styled.li`
        ${style['extendClick']()}
        white-space: nowrap;
        padding: .3rem;
        margin-right: .2rem;
        display: flex;
        border-bottom: .1rem solid transparent;

        &.selected {
            color: ${style['theme-color']};
            border-bottom-color: ${style['theme-color']};
        }
    `
