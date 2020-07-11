import React, { useEffect, useCallback } from 'react'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import actionsCreator from './store/actionsCreator'
import { ListWrap } from './style'
import Scroll from '../../components/Scroll'
import OfficialRank from '../../components/OfficialRank'
import GlobalRank from '../../components/GlobalRank'
import HomeUnderWrap from '../../baseUI/HomeUnderWrap'

function Rank(props) {
    const
        { rankList } = props,
        { getRankList } = props,
        onEnterDetail = useCallback(id => {
            if (onEnterDetail.locked) return
            onEnterDetail.locked = true
            props.history.push(`/rank/${id}`)

            setTimeout(() => {
                onEnterDetail.locked = false
            }, 500)
        }, [props.history])

    useEffect(() => {
        getRankList()
    }, [getRankList])

    const
        rankList_JS = rankList.toJS()

    return (
        <HomeUnderWrap>
            {renderRoutes(props.route.routes)}

            <Scroll>
                <ListWrap>
                    <OfficialRank list={rankList_JS.official} onClick={onEnterDetail} />
                    <GlobalRank list={rankList_JS.global} onClick={onEnterDetail} />
                </ListWrap>
            </Scroll>
        </HomeUnderWrap>
    )
}

const
    mapState = state => {
        const rank = state.get('rank'),
            rankList = rank.get('rankList'),
            loading = rank.get('loading')

        return {
            rankList,
            loading
        }
    },
    mapDispatch = dispatch => ({
        getRankList() {
            const action = actionsCreator.getRankList()
            dispatch(action)
        }
    })

export default connect(mapState, mapDispatch)(React.memo(Rank))