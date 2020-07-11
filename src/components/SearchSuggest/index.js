import React, { memo, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { List } from './style'

const processList_ = list => list.map(item => (
    item.keyword + (item.lastKeyword ? ` - ${item.lastKeyword}` : '')
))

const SearchSuggest = function (props) {
    const
        { list, current, onClick } = props,
        newList = useMemo(() => processList_(list), [list]),
        onClickHandle = useCallback((words) => {
            onClick && onClick(words)
        }, [onClick])

    return (
        <List>
            <li
                onClick={e => onClickHandle(current)}
            >
                <span className='iconfont'>
                    &#xe8b9;
                </span>
                <article>
                    {current}
                </article>
            </li>
            {
                newList.map(item => (
                    <li
                        key={item}
                        onClick={e => onClickHandle(item)}
                    >
                        <aside className='iconfont'>
                            &#xe8b9;
                        </aside>

                        <article>
                            {item}
                        </article>
                    </li>
                ))
            }
        </List>
    )
}


SearchSuggest.defaultProps = {
    list: [],
    onClick: null,
    current: ''
}

SearchSuggest.propTypes = {
    list: PropTypes.array,
    onClick: PropTypes.func,
    current: PropTypes.string
}


export default memo(SearchSuggest)
