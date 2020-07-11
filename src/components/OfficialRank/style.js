import style from '../../assets/global-style'
import styled from 'styled-components'

export const
    Wrap = styled.div`
        margin: 1rem 0;

        .title {
            font-weight: 600;
            margin: .6rem 0;
            color: ${style['font-color-desc']};
            font-size: ${style['font-size-m']};
        }
    `,
    List = styled.div`
    `,
    Item = styled.div`
        margin: .4rem 0;
        display: flex;
    `,
    ItemLeft = styled.div`
        width: 32%;

            .img-wrap {
                overflow: hidden;
                position: relative;
                border-radius: .2rem;
                padding-bottom: 100%;
                background-color: rgba(0,0,0,.4);

                img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }

            .update-frequency {
                position: absolute;
                left: .5rem;
                bottom: .5rem;
                z-index: 9;
                font-size: ${style['font-size-s']};
                color: ${style['font-color-light']}
            }
        }
    `,
    ItemRight = styled.ol`
            flex: 1;
            list-style: decimal;
            font-size: ${style['font-size-s']};
            color: ${style['font-color-desc-v2']};
            padding: 2rem 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

    `
