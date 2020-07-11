import React from 'react'
import PropTypes from 'prop-types'
import { greateNumberToText } from '../../utils'
import { Wrap, Nav, Main, MainLeft, MainRight } from './style'
import FrostGlass from '../../baseUI/FrostGlass'

function AlbumHeader(props) {
    const { onBack, img, playCount, creator, title } = props

    return (
        <Wrap>
            <FrostGlass img={img}>
                <Nav
                    onClick={onBack}
                >
                    <span className='iconfont'>
                        &#xe6db;
                        </span>
                    <span>歌单</span>
                </Nav>
                <Main>
                    <MainLeft>
                        <span className='listen-count'>{greateNumberToText(playCount)}</span>
                        <img src={img} alt='加载失败' />
                    </MainLeft>

                    <MainRight>
                        <p className='title'>{title}</p>
                        <section className='author'>
                            <img src={creator.backgroundUrl + + '?param=200x200'}  alt='加载失败'/>
                            <span className='name'>{creator.nickname}</span>
                        </section>
                    </MainRight>
                </Main>

            </FrostGlass>
        </Wrap >
    )
}

AlbumHeader.defaultProps = {
    img: '',
    playCount: 0,
    creator: {},
    title: '',
    onBack: null
}

AlbumHeader.propTypes = {
    img: PropTypes.string,
    playCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    creator: PropTypes.object,
    title: PropTypes.string,
    onBack: PropTypes.func
}

export default React.memo(AlbumHeader)