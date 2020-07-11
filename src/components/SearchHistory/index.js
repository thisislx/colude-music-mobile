import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Wrap } from './style'
import HorizenList from '../../baseUI/HorizenList'

const History = function (props) {
    const
        { onClick, list, onClear } = props,
        onClickHandle = useCallback((str) => {
            onClick && onClick(str)
        }, [onClick]),
        onClearHandle = useCallback(() => {
            onClear && onClear()
        }, [onClear])

    return (
        <Wrap>
            <header>
                <span>
                    历史记录
                </span>
                <span
                    className='iconfont'
                    onClick={e => onClearHandle()}
                >
                    &#xe6dd;
                </span>
            </header>

            <div className='scroll-wrap'>
                <HorizenList
                    ground={true}
                    list={list}
                    onClick={onClickHandle}
                />
            </div>
        </Wrap>
    )
}

History.defaultProps = {
    list: [],
    onClick: null,
    onClear: null,
}

History.propTypes = {
    list: PropTypes.array,
    onClick: PropTypes.func,
    onClear: PropTypes.func
}


export default memo(History)