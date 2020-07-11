import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        user-select: none;
        max-width: ${style['max-width']};
        position: relative;
        margin: 0 auto;
    `,
    Header = styled.div`
        display: flex;
        justify-content: space-between;
        padding: .35rem .7rem;
        background-color: ${style["theme-color"]};

    &>span {
        ${style['extendClick']()}
        color: ${style['font-color-light']};
        font-size: ${style['font-size-ll']};
        line-height: 2rem;
    }
    `,
    Tab = styled.div`
        display: flex;
        height: 2.8rem;
        background-color: ${style['theme-color']};
        font-size: ${style['font-size-m']};

        & .selected {
            font-weight: 700;
            border-bottom: .15rem solid ${style['font-color-light']};
        }
    `,
    TabItem = styled.div`
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        .click-area {
            ${style.extendClick()}
            padding: .4rem 0;
            
            &::before {
                top: -1rem;
                left: -1rem;
                bottom: -1rem;
                right: -1rem;
            }
        }
    `