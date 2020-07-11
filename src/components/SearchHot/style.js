import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        > header {
            font-weight: 600;
            color: ${style['theme-color']};
            font-size: ${style['font-size-m']};
        }
    `,
    List = styled.ol`
        margin-top: .6rem;

    `,
    ListItem = styled.li`
        display: flex;
        height: 2rem;
        line-height: 2rem;
        align-items: center;


        > aside {
            width: 3rem;
            text-align: center;
            color: ${style['font-color-desc-v2']};
        }

        > article {
            ${style['extendClick']()}
            font-size: ${style['font-size-m']};

            &.heavy {
                font-weight: 600;
            } 
        }
    `