import styled from 'styled-components'
import style from '../../assets/global-style'

const height = `3rem`

export const
    Wrap = styled.div` 
        height: ${height};
        background-color: ${style['theme-back-color']};
        color: ${style['font-color-desc']};
        justify-content: space-between;
        padding: 0 .4rem;
    `,
    Left = styled.section`
        display: flex;
        align-items: center;
        height: 100%;

        > img {
            float: left;
            width: 2rem;
            height: 2rem;
            min-width: 2rem;
            min-height: 2rem;
            border-radius: 50%;
        }

        .song-info {
            ${style['noWrap']()}
            height: 100%;
            margin-left: .4rem;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            font-size: ${style['font-size']};

            .artist {
                font-size: ${style['font-size-s']};
                color: ${style['font-color-desc-v2']};
            }
        }
    `,
    Right = styled.section`
        width: 4rem;
        float: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 1rem;
        line-height: ${height};
        
        .iconfont {
            ${style['extendClick']()}
            color: ${style['theme-color']};    
            font-size: ${style['font-size-ll']};
        }

        .play-control {
            font-size: ${style['font-size-lll']};
        }
    `