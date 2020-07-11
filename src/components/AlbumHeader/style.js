import styled from 'styled-components'
import style from '../../assets/global-style'

const
    height = '13rem',
    lr = '.6rem';

export const
    Wrap = styled.div`
        ${style['underColor']()}
        height: ${height};
        color: ${style['font-color-light-v2']};

        .content {
            height: ${height};
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
    `,
    Nav = styled.div`
        ${style['extendClick']()}
        width: 100%;
        height: 10%;
        display: flex;
        line-height: 10%;
        padding: ${lr};
        padding-top: 1rem;
        position: relative;
        /* text-shadow: 0 0 .2rem hsla(0,0%, 40%, .5); */

        ::before {
            left: 1rem;
        }
        .iconfont {
            font-size: ${style['font-size-ll']};
            font-weight: 700;
            &:hover {
                text-shadow: 0 0 .1rem, 0 0 .3rem;
            }
        }
    `,
    Main = styled.div`
        margin: 2rem ${lr} 0;
        display: flex;
    `,
    MainLeft = styled.div`
        position: relative;
        min-width: 8rem;
        min-height: 8rem;
        width: 8rem;
        height: 8rem;

        img {
            width: 100%;
            height: 100%;
        }

        .listen-count {
            ${style['underColor']('1rem')}
            position: absolute;
            right: .1rem;
            top: .1rem;
            font-size: ${style['font-size-s']};
        }
    `,
    MainRight = styled.div`
        margin-left: ${lr};
        line-height: 1.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .title {
            ${style['underColor']()}
            font-size: ${style['font-size-l']};
        }

        .author {
            font-size: ${style['font-size-m']};
            display: flex;
            align-items: center;

            img {
                width: 1.6rem;
                height: 1.6rem;
                border-radius: 50%;
            }
            .name {
                ${style['underColor']()}
                margin-left: ${lr};
            }
        }
    `