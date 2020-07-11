import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Wrap, List, Item, ItemLeft, ItemRight } from './style'


function OfficialRank(props) {
    const
        { list, list: { length } } = props,
        { onClick } = props,
        onClickHandle = useCallback(id => {
            if (typeof onClick === 'function') {
                onClick(id)
            }
        }, [onClick])

    // 避免加载官方榜单
    if (!length)
        return <></>

    return (
        <Wrap>
            <div className='title'>官方榜</div>

            <List>
                {list.map(item => (
                    <Item key={item.id} onClick={e => onClickHandle(item.id)}>
                        <ItemLeft>
                            <div className='img-wrap'>
                                <span className='update-frequency'>
                                    {item.updateFrequency}
                                </span>

                                <img src={item.coverImgUrl} alt='music' />
                            </div>
                        </ItemLeft>

                        <ItemRight>
                            {
                                item.tracks.map((track, trackIdx) => (
                                    <li key={trackIdx}>
                                        <span>{track.first}</span>
                                        <span> - </span>
                                        <span>{track.second}</span>
                                    </li>
                                ))
                            }
                        </ItemRight>
                    </Item>
                ))}
            </List>
        </Wrap>
    )
}

OfficialRank.defaultProps = {
    list: [],
    onClick: null
}

OfficialRank.propTypes = {
    list: PropTypes.array,
    onClick: PropTypes.func
}

export default React.memo(OfficialRank)