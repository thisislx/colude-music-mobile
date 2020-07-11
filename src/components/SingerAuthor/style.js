import styled from 'styled-components'
import style from '../../assets/global-style'

const minHeight = '17rem'

export const
    Wrap = styled.div`
        width: 100%;
        position: relative;
        overflow: hidden;
        padding-bottom: 100%;
        min-height: ${minHeight};
    `,
    ImgWrap = styled.div`
        width: 100%;

        ::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, .3);
        }
        img {
            position: absolute;
            min-height: ${minHeight};
            width: 100%;
            z-index: -2;
        }  
    `,
    Bar = styled.div`
      position: absolute;
      top: 12rem;
      display: flex;
      width: 100%;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      background-color: transparent; 
      color: ${style['font-color-light-v2']};

      > .left {
          .name {
              font-size: ${style['font-size-lll']};
          }
      }
      > .right {       
          .interest-btn {
              padding: .4rem .6rem;
              background-color: ${style['theme-color']};
              font-size: ${style['font-size-m']};
              border-radius: .6rem;

              span {
                  vertical-align: text-top;
                  line-height: ${style['font-size-m']};
                  font-size: ${style['font-size-lll']};
              }
          }
      }
    `