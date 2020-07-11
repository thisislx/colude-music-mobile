import React, { memo, useEffect, useMemo, useCallback, useRef } from 'react'
import { searchTypeConfig } from './config'
import { renderRoutes } from 'react-router-config'
import { addSong } from '../Player/store'
import { connect } from 'react-redux'
import actionsCreator from './store/actionsCreator'
import { sToMinute, arToArtistNames } from '../../utils'
import { SongList, ToastWrap } from './style'
import HomeUnderWrap from '../../baseUI/HomeUnderWrap'
import Pager from '../../baseUI/Pager'
import Toast from '../../baseUI/Toast'
import SongItem from '../../components/SongItem'

const SearchResult = function (props) {
    const
        { match: { params: { keywords } }, route: { routes } } = props,
        { getSearchResult, setCurrentType, getMore, addSong } = props,
        {
            result: result_imm,
            showMes: showMes_imm,
            currentType } = props,
        result = useMemo(() => result_imm ? result_imm.toJS() : [], [result_imm]),
        showMes = useMemo(() => showMes_imm.toJS(), [showMes_imm]),
        PagerRef = useRef(null),
        getMoreHandle = useCallback(() => {
            keywords && getMore(keywords)
        }, [keywords, getMore])

    useEffect(() => {
        keywords && getSearchResult(keywords)
    }, [keywords, getSearchResult])

    useEffect((() => {
        // 第一个元素id， 用于判断搜索结果
        let _firstId = 0

        return () => {
            const pager = PagerRef.current
            if (pager && result.length) {
                const firstId = result[0].id
                pager.refresh()
                if (firstId !== _firstId) {
                    _firstId = firstId
                    pager.toTop()
                }
            }
        }
    })(), [result, PagerRef])
    return (
        <HomeUnderWrap top='3'>
            <Pager
                ref={PagerRef}
                list={searchTypeConfig}
                current={currentType}
                onClick={id => setCurrentType(id)}
                onPullUp={getMoreHandle}
            >
                <SongList>
                    {
                        currentType === 1 ? result.map(item => (
                            !item ? null : (
                                <SongItem
                                    key={item.id}
                                    onClick={e => addSong(item.id)}
                                    center={
                                        <div className='sl-center'>
                                            <section className='name'>
                                                {item.name}
                                            </section>
                                            <section className='artist'>
                                                {arToArtistNames(item.artists)}
                                            </section>
                                        </div>
                                    }
                                    right={
                                        <aside className='sl-right'>
                                            {sToMinute(item.duration / 1000)}
                                        </aside>
                                    }
                                >
                                </SongItem>
                            ))) : '开发中..'
                    }
                </SongList>
            </Pager>
            {
                showMes.is ? (
                    <ToastWrap>
                        <Toast mes={showMes.mes} icon={showMes.icon} />
                    </ToastWrap>
                ) : null
            }
            {
                renderRoutes(routes)
            }
        </HomeUnderWrap >
    )
}

const
    mapState = state => {
        const
            res = state.get('searchResult'),
            currentType = res.get('currentType'),
            results = res.get('results'),
            showMes = res.get('showMes')
        return {
            result: results.getIn([currentType, 'songs']),
            currentType,
            showMes
        }
    },
    mapDispatch = dispatch => ({
        getSearchResult(keywords) {
            const action = actionsCreator.getSearchResult(keywords)
            dispatch(action)
        },
        setCurrentType(num) {
            const action = actionsCreator.setCurrentType(num)
            dispatch(action)
        },
        getMore(keywords) {
            const action = actionsCreator.getMore(keywords)
            dispatch(action)
        },
        addSong(song) {
            const action = addSong(song)
            dispatch(action)
        }
    })

export default connect(mapState, mapDispatch)(memo(SearchResult))


