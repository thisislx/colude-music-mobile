import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    SongList = styled.ol`
        color: ${style['font-color-desc']};
        font-size: ${style['font-size-m']};
        padding: 0 .4rem;
        display: flex;
        flex-direction: column;

        .sl-center {
            overflow: hidden;

            >.name {
                ${style['noWrap']}
            }
            >.artist {
                ${style['noWrap']}
                font-size: ${style['font-size-s']};
                color: ${style['font-color-desc-v2']};
                margin-top: .6rem;
            }
        }

        .sl-right {
            min-width: 2rem;
            font-size: ${style['font-size-s']};
            color: ${style['font-color-desc-v2']};
        }
    `,

    ToastWrap = styled.footer`
        position: absolute;
        bottom: 2rem;
        width: 100%;
        color: ${style['font-color-desc-v2']}; 
    `
