import styled, { keyframes } from 'styled-components'
import style from '../../assets/global-style'

let
    headerHeight = '3.4rem';

const animation = {
    CD_Rotate: keyframes`
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    `
}

export const
    Wrap = styled.div`
        bottom: 0;
        top: 0;
        width: 100%;
        color: ${style['font-color-light-v2']};
        background-color: #000;
        position: absolute;

        .text-l {
            text-align: left;
        }

        .text-r {
            text-align: right;
        }
    `,
    Container = styled.main`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        ::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            background-color: rgba(0,0,0,.1);
        }
    `,
    Header = styled.header`
        display: flex;
        justify-content: space-between;
        height: ${headerHeight};
    `,
    HeaderLeft = styled.section`
        width: 90%;
        display: flex;
        height: 100%;
        overflow: hidden;

        .iconfont {
                height: 100%;
                width: 3rem;
                line-height: ${headerHeight};
                text-align: center;
                font-size: ${style['font-size-big']};
        }

        >main {
            width: calc(100% - 6rem);
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            white-space: nowrap;

            .song-name {
                font-size: ${style['font-size-ll']};
            }
            .artist {
                font-size: ${style['font-size-m']};
            }
        }
    `,
    CD_Wrap = styled.div`
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;

        .cd {
            overflow: hidden;
            margin: -2rem auto 0;
            width: 16rem;
            height: 16rem;
            border: .2rem hsla(0, 0%, 100%, .5) solid;
            border-radius: 50%;
            position: relative;
            background-color: #000;
            background-image: repeating-radial-gradient(
                hsla(0, 0%, 100%, .1), hsla(0, 0%, 100%, .1) 1px,
                transparent 0, transparent .4rem
            );
            &.rotate {
                animation: ${animation.CD_Rotate} 12s infinite forwards linear;
            }
            &.paused {
                animation-play-state: paused;
            }

            img {
                position: absolute;
                top: 50%;
                bottom: 50%;
                left: 50%;
                right: 50%;
                transform: translate(-50%, -50%);
                height: 70%;
                width: 70%;
                border-radius: 50%;
            }
        }
    `,
    CD_Nav = styled.nav`
        position: absolute;
        bottom: 2rem;
        display: flex;
        width: 100%;
        justify-content: space-around;

        > span {
            font-size: ${style['font-size-lll']};
        }
    `,
    LyricWrap = styled.div`
        position: absolute;
        top: 5rem;
        width: 100%;
        bottom: 20%;
        text-align: center;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${style['font-color-light']};

        .active {
            color: ${style['font-color-light-v3']};
            transition: .5s color ease-out;
        }

        .lyric-article {
            padding: 0 2rem;
            overflow: hidden;
            white-space: pre-wrap;
            position: relative;
            
            > li {
                text-align: center;
                min-height: 3rem;
                line-height: 1.4;
                margin-top: 1.4rem;

                &.provider {
                    margin-top: 1rem;
                    padding: 0 2rem;
                    font-size: ${style['font-size-m']};
                    display: flex;
                    justify-content: space-evenly;
                }
            }
          
        }
        
    `,
    Control = styled.footer`
        height: 18%;
        padding-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        font-size: ${style['font-size-lll']};

        .progress {
            display: flex;
            align-items: center;
            min-height: 1rem;

            .time {
                min-width: 3rem;
                font-size: ${style['font-size-l']};
            }

            .progress-bar-wrap {
                flex: 1;
                padding: 0 1rem;
            }
        }

        footer {
            font-size: ${style['font-size-ll']};
            display: flex;
            justify-content: space-around;
            align-items: center;

            > span {
                ${style['extendClick']()}
                min-width: 2rem;
            }
            
            .play-mode {
                font-size: ${style['font-size-lll']};
            }

            .play-btn {
                font-size: ${parseInt(style['font-size-big']) + 1.6}rem;
            }
        }
    `
