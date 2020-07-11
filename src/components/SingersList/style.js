import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    List = styled.div`
        padding: 0 .4rem;
    `,
    ListItem = styled.div`
        display: flex;
        align-items: center;
        padding: .4rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        color: ${style['font-color-desc']};
        font-size: ${style['font-size-m']};

        img {
            border-radius: .4rem;
            width: 3.4rem;
            height: 3.4rem;
        }

        .name {
            margin-left: 1rem;
        }
    `