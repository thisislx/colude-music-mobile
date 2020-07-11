import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        position: relative;
        height: 6rem;
        overflow: hidden;

        > header {
            height: 50%;
            line-height: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            font-size: ${style['font-size-m']};

            >.iconfont {
                ${style['extendClick']()}
                font-size: ${style['font-size-lll']};
            }
        }

        .scroll-wrap {
            height: 50%;
            position: absolute;
            left: 1rem;
            right: 0;
            bottom: 0;
            color: ${style['font-color-desc-v2']};
        }
    `