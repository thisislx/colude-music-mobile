import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'

import { playBtnConfig } from './config'
import { useHistory } from 'react-router-dom'
import { arToArtistNames } from '../../utils'
import { Wrap, Left, Right } from './style'

const reg = /(\/player)+$/

const PlayerMini = function (props) {
    const
        { currentSong, playing } = props,
        { togglePlaying, onShowSongList } = props,
        history = useHistory(),
        onfullScreen = useCallback(() => {
            history.push(`${history.location.pathname}/player`.replace(reg, '/player'))
        }, [history])

    if (!currentSong.ar.length) {
        return (
            <Wrap>
                <Left>听见好时光</Left>
            </Wrap>
        )
    }
    return (
        <Wrap>
            <Right>
                <span
                    className='play-control iconfont'
                    onClick={e => togglePlaying()}
                    dangerouslySetInnerHTML={{ __html: playBtnConfig[playing] }}
                ></span>

                <div className='circle'></div>
                <span
                    className='iconfont'
                    onClick={e => onShowSongList()}
                >
                    &#xe604;
                </span>
            </Right>

            <Left onClick={onfullScreen}>
                <img src={currentSong.al.picUrl + '?param=50x50'} alt='加载失败' />
                <article className='song-info'>
                    <section>
                        {currentSong.name}
                    </section>

                    <section className='artist'>
                        {arToArtistNames(currentSong.ar)}
                    </section>
                </article>
            </Left>
        </Wrap>
    )
}

PlayerMini.defaultProps = {
    currentSong: {
        al: {},
        ar: []
    }
}
PlayerMini.propTypes = {
    currentSong: PropTypes.object
}
export default memo(PlayerMini)