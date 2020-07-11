import styled from 'styled-components'
import style from '../../assets/global-style'

export const
    Wrap = styled.div`
        position: fixed;
        max-width: ${style['max-width']};
        margin: 0 auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        transition: .3s ease-out;
        color: ${style['font-color-light']};
        z-index: 51;
        overflow: hidden;
        
        &.pop-enter, &.pop-appear {
            background-color: transparent;
        }
        &.pop-enter > ol,  &.pop-appear > ol {
            bottom: -50%;
            opacity: .1;
        }

        &.pop-enter-done, &.pop-appear-active {
            background-color: rgba(0, 0, 0, .2);
        }
        &.pop-enter-done > ol, &.pop-appear-active > ol {
            bottom: 2rem;
            opacity: 1;
        }

        &.pop-exit{
            background-color: rgba(0, 0, 0, .2);
        }
        &.pop-exit > ol {
            bottom: 2rem;
        }
   
        &.pop-exit-active {
            background-color: transparent;
        }
        &.pop-exit-active > ol {
            bottom: -50%;
            opacity: .1;
        }

    `,
    List = styled.ol`
        position: absolute;
        height: 50%;
        width: 80%;
        left: 50%;
        right: 50%;
        bottom: 2rem;
        margin-left: -40%;
        background-color: rgba(0, 0, 0, .8);
        border-radius: .8rem;
        padding: .4rem 1rem 0;
        transition: .2s;

        > header {
            display: flex;
            justify-content: space-between;
            padding: .4rem 0 .6rem 0;
            height: 2rem;

            .mark {
                font-size: ${style['font-size-m']};
            }
        }

        > article {
            top: 2.4rem;
            width: calc(100% - 2rem);
            overflow: hidden;
            bottom: .4rem;
            position: absolute;
        }
    `,
    ListItem = styled.li`
        display: flex;
        padding: .4rem 0;
        justify-content: space-between;

        .song-info {
            ${style['noWrap']}
            vertical-align: baseline;
            max-width: 60%;
            width: 60%;

            &.active {
                color: ${style['theme-color']};
            }
       
            .artist {
                margin-left: .2rem;
                font-size: ${style['font-size-s']};
            }
        }

        > aside {
            ${style['extendClick']()}
            font-size: ${style['font-size-lll']};
        }
    `