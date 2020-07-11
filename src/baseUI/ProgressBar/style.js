import styled, { keyframes } from 'styled-components'
import style from '../../assets/global-style'

const rotate = keyframes`
    to {
        transform: rotate(360deg);
    }
`

export const
    Wrap = styled.div`
        ${style['extendClick']()}
        width: 100%;
        display: flex;
        align-items: center;
        height: .1rem;
        background-color: ${style['font-color-desc-v2']};
    `,
    Progress = styled.div`
        height: 100%;
        width: 0;
        background: ${style["theme-color"]};
        position: relative;

        .btn {
            ${style['extendClick']()}
            position: absolute;
            right: 0;
            top: 50%;
            bottom: 50%;
            width: .6rem;
            height: .6rem;
            transform: translateY(-50%);
            border: .2rem solid ${style['theme-back-color']};
            border-radius: 50%;
            background: ${style["theme-color"]};
        }

        .btn.attention {
            width: 1rem;
            height: 1rem;
        }

        .btn.waiting {
            border-width: 0;
    
            ::before,
            ::after {
                position: absolute;
                content: '';
                border-radius: 50%;
            }
            ::before {
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background-image: linear-gradient(${style['theme-back-color']} 50%, transparent 0);
                animation: ${rotate} 1s linear infinite;
            }

            ::after {
                top: .1rem;
                left: .1rem;
                bottom: .1rem;
                right: .1rem;
                z-index: 2;
                background-color: ${style['theme-back-color']};
            }
        }
     `
