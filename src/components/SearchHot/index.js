import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Wrap, List, ListItem } from './style'

const SearchHot = function (props) {
    const
        { list, onClick } = props,
        onClickHandle = useCallback((keywords) => {
            onClick && onClick(keywords)
        }, [onClick])

    return (
        <Wrap>
            <header>热搜</header>
            <List>
                {
                    list.map((item, key) => (
                        <ListItem key={item.first}>
                            <aside>{key}</aside>

                            <article
                                onClick={e => onClickHandle(item.first)}
                                className={key > 2 ? '' : 'heavy'}
                            >
                                {item.first}
                            </article>
                        </ListItem>
                    ))
                }
            </List>
        </Wrap >
    )
}

SearchHot.defaultProps = {
    list: [],
    onClick: null
}

SearchHot.propTypes = {
    list: PropTypes.array,
    onClick: PropTypes.func
}

export default memo(SearchHot)