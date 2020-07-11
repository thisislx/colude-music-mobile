import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Wrap, List, Item } from './style'

function GlobalRank(props) {
    const
        { list, list: { length } } = props,
        { onClick } = props,
        onClickHandle = useCallback(id => {
            if (typeof onClick === 'function') {
                onClick(id)
            }
        }, [onClick])

    if (!length)
        return <></>
        
    return (
        <>
            <Wrap>
                <h3 className='title'>全球榜</h3>
                <List>
                    {
                        list.map(item => (
                            <Item key={item.id} onClick={e => onClickHandle(item.id)}>
                                <div className='img-wrap'>
                                    <span className='update-frequency'>
                                        {item.updateFrequency}
                                    </span>
                                    <img src={item.coverImgUrl} alt='music' />
                                </div>
                            </Item>
                        ))
                    }
                </List>
            </Wrap>
        </>
    )
}

GlobalRank.defaultProps = {
    list: [],
    onClick: null
}

GlobalRank.propTypes = {
    list: PropTypes.array,
    onClick: PropTypes.func
}

export default React.memo(GlobalRank)