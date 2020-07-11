import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        margin: 1rem 0;
        .title {
            font-size: 1rem;
            color: ${style['font-color-desc']};
            margin: .6rem 0;
            font-weight: 700;
        }
    `,
    List = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    `,
    Item = styled.div`
        font-size: ${style['font-size-s']};
        width: 32.5%;
        margin: .2rem 0;
        color: ${style['font-color-light']};
        .img-wrap {
            padding-bottom: 100%;
            position: relative;
            background-color: rgba(0,0,0,.4);
            border-radius: .2rem;
            overflow: hidden;
            
            img {
                width: 100%;
                height: 100%;
                position: absolute;
            }

            .update-frequency {
                color: ${style['font-color-light']};
                position: absolute;
                left: .5rem;
                bottom: .5rem;
                z-index: 9;
            }
        }
    `