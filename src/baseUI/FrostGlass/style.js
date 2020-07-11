import styled from 'styled-components'
// import style from '../../assets/global-style'

export const Wrap = styled.div`
        width: 100%;
        height: 100%;
        overflow: hidden;
        flex: 1;
        position: relative;
        z-index: 9;

        ::before {
            content: '';
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            position: absolute;
            background-color: rgba(0, 0, 0, .1);
        }

        >main {
            height: 100%;
            position: relative;
            margin: 0 auto;
            border-radius: .3rem;
        }

        >main >.mask {
            z-index: -1;
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            filter: blur(2rem);
            margin: -2.4rem;
            background: rgba(255, 0, 0, 0.6);  
        }
    `


