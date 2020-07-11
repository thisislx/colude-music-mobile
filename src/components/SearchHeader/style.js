import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .hide {
            position: absolute;
            z-index: -99;
            visibility: hidden;
        }
        
        > aside {
            ${style['extendClick']()}
            min-width: 2rem;
            text-align: center;
            height: inherit;
            font-size: ${style['font-size-lll']};
        }

        > form {
            flex: 1;
            border-bottom: ${style['border-color']} 1px solid;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: auto;

            > input {
                font-size: ${style['font-size-l']};
                outline: none;
                flex: 1;
                border: none;
                background-color: transparent;
                padding: .4rem .6rem;
                padding-right: 1rem;
            }

            >.clear-input {
                ${style['extendClick']()}
                font-size: ${style['font-size-lll']};
                text-align: center;
                width: 2rem;
            }
        }
    `,
    SuggestWrap = styled.div`
        position: absolute;
        top: 2rem;
        z-index: 51;
    `
