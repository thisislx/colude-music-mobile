import styled from 'styled-components'
import style from '../../assets/global-style'

const height = '3.6rem',
    paddingTop = '.4rem'

export const
    Wrap = styled.div`
        display: flex;
        padding-top: ${paddingTop};
        height: ${height};
        align-items: center;
        position: relative;

    `,
    Left = styled.div`
        padding-top: ${paddingTop};
        color: ${style['font-color-desc-v2']};
        width: 14%;
        float: left;
        height: ${height};
        display: flex; 
        align-items: center; 
        justify-content: center;
    `,
    Center = styled.div`
        flex: 1;
        text-align: left;
        ${style['noWrap']()}

        .remark {
            width: 100%;
            font-size: ${style['font-size-s']};
            color: ${style['font-color-desc-v2']};
        }
    `,
    Right = styled.div`
        text-align: center;
        color: ${style['font-color-desc-v2']};
        min-width: 3rem;
        .iconfont {
            font-size: ${style['font-size-lll']};
        }
    `