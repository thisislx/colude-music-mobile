import styled from 'styled-components'
import style from '../../assets/global-style'

const
    marginTop = '1rem'

export const
    Wrap = styled.div`
        width: 100%;
        color: ${style['font-color-desc']};
        position: relative;
        padding: .6rem 1rem;

        .hide {
            position: absolute;
            z-index: -99;
            visibility: hidden;
        }
    `,
    HistoryWrap = styled.div`
        margin-top: ${marginTop};
    `,
    HotWrap = styled.div`
        margin-top: ${marginTop};
    `