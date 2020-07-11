import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Container = styled.div`

        &> h3 {
            font-weight: 700;
            padding: 0 .6rem;
            margin: 1.4rem 0;
            font-size: .9rem;
        }
    `,
    List = styled.div`
        display: flex;
        flex-wrap: wrap;
    `,
    ListItem = styled.div`
        position: relative;
        width: 33.33%;
        padding: 0 .4rem;
        margin-bottom: 1rem;

        .img-wrap {
            margin-bottom: 100%;
            position: relative;

            .decorate {
                position: absolute;
                top: 0;
                width: 100%;
                height: 2rem;
                border-radius: .2rem;
                background: linear-gradient (hsla (0,0%,43%,.4),hsla (0,0%,100%,0));
                z-index: 1;
            }

            & img {
                position: absolute;
                z-index: 2;
                top: 0;
                bottom: 0;
                width: 100%;
                border-radius: .2rem;
            }
        }
       
        & .listen-count {
            z-index: 9;
            position: absolute;
            top: .2rem;
            right: .6rem;
            font-size: ${style["font-size-s"]};
            color: ${style["font-color-light"]};
        }

        & footer {
            line-height: 1.4;
            font-size: ${style["font-size-s"]};
            color: ${style["font-color-desc"]};
        }
    `