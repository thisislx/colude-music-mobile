import React, { useEffect, useCallback, useState } from 'react'
import { renderRoutes } from 'react-router-config'
import { categoryTypes, alphaTypes } from './config'
import { connect } from 'react-redux'

import { Header, List } from './style'
import { actionsCreator } from './store'
import HorizenList from '../../baseUI/HorizenList'
import HomeUnderWrap from '../../baseUI/HomeUnderWrap'
import SingersList from '../../components/SingersList'
import SingerLoading from '../../components/SingersLoading'

function Singers(props) {
    const
        { singerList, enterLoading, pullUpLoading, pullDownLoading } = props,
        { getSingerList, getMoreSingerList, freshSingerList } = props,
        [categoryCode, setCategoryCode] = useState(),
        // 字母 默认不筛选
        [alpha, setAlpha] = useState()

    const
        onPullUp = useCallback(() => {
            getMoreSingerList(categoryCode, alpha)
        }, [categoryCode, alpha, getMoreSingerList]),
        onPullDown = useCallback(() => {
            freshSingerList(categoryCode, alpha)
        }, [categoryCode, alpha, freshSingerList])

    useEffect(() => {
        getSingerList(categoryCode, alpha)
    }, [categoryCode, alpha, getSingerList])

    const
        singerList_JS = singerList.toJS(),
        enterLoading_JS = enterLoading.toJS(),
        pullUpLoading_JS = pullUpLoading.toJS(),
        pullDownLoading_JS = pullDownLoading.toJS()

    return (
        <HomeUnderWrap>
            {renderRoutes(props.route.routes)}

            <SingerLoading
                enterLoading={enterLoading_JS}
                pullUpLoading={pullUpLoading_JS}
                pullDownLoading={pullDownLoading_JS}
            />
            
            <Header>
                <HorizenList
                    title='分类'
                    list={categoryTypes}
                    onClick={setCategoryCode}
                />
                <HorizenList
                    title='首字母'
                    list={alphaTypes}
                    onClick={setAlpha}
                />
            </Header>

            <List>
                <SingersList
                    list={singerList_JS}
                    onPullDown={onPullDown}
                    onPullUp={onPullUp}
                />
            </List>
        </HomeUnderWrap>
    )
}

const
    mapState = state => {
        const
            singers = state.get('singers'),
            singerList = singers.get('singerList'),
            enterLoading = singers.get('enterLoading'),
            pullUpLoading = singers.get('pullUpLoading'),
            pullDownLoading = singers.get('pullDownLoading')

        return {
            singerList,
            enterLoading,
            pullUpLoading,
            pullDownLoading
        }
    },
    mapDispatch = dispatch => ({
        getSingerList(categoryCode, alpha) {
            const action = actionsCreator.getSingerList(categoryCode, alpha)
            dispatch(action)
        },

        getMoreSingerList(categoryCode, alpha) {
            const action = actionsCreator.getMoreSingerList(categoryCode, alpha)
            dispatch(action)
        },

        freshSingerList(categoryCode, alpha) {
            const action = actionsCreator.freshSingerList(categoryCode, alpha)
            dispatch(action)
        }
    })


export default connect(mapState, mapDispatch)(React.memo(Singers))