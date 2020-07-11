import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { headerConfig } from './config'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import actionsCreator from './store/actionsCreator'

import { Wrap, HistoryWrap, HotWrap } from './style'
import Scroll from '../../components/Scroll'
import HomeUnderWrap from '../../baseUI/HomeUnderWrap'
import SearchHistory from '../../components/SearchHistory'
import SearchHot from '../../components/SearchHot'
import SearchHeader from '../../components/SearchHeader'

const Search = function (props) {
    const
        { route: { routes } } = props,
        {
            searchHistory: searchHistory_imm,
            hotSearch: hotSearch_imm,
            inputSuggest: inputSuggest_imm,
            inputDefault: inputDefault_imm } = props,
        {
            getInputDefault,
            getInputSuggest,
            getHotSearch,
            unshiftSearchHistory,
            clearSearchHistory } = props,
        searchHistory = useMemo(() => searchHistory_imm.toJS(), [searchHistory_imm]),
        hotSearch = useMemo(() => hotSearch_imm.toJS(), [hotSearch_imm]),
        inputSuggest = useMemo(() => inputSuggest_imm.toJS(), [inputSuggest_imm]),
        inputDefault = useMemo(() => inputDefault_imm.toJS(), [inputDefault_imm])

    const
        onInputChange = useCallback(newVal => {
            newVal && getInputSuggest(newVal)
        }, [getInputSuggest]),
        unShiftSearchHistoryHanlde = useCallback((newVal) => {
            if (newVal) {
                props.history.push(`/search/${newVal}`)
                unshiftSearchHistory(newVal)
            }
        }, [unshiftSearchHistory, props.history])

    useEffect(() => {
        getInputDefault()
        getHotSearch()
    }, [getInputDefault, getHotSearch])

    return (
        <HomeUnderWrap top={0}>
            <Scroll>
                <Wrap>
                    <SearchHeader
                        placeholder={inputDefault.realkeyword || headerConfig.placeholder}
                        suggest={inputSuggest}
                        defaultValue={inputDefault.realkeyword}
                        onChange={onInputChange}
                        onSubmit={unShiftSearchHistoryHanlde}
                    />
                    <HistoryWrap>
                        <SearchHistory
                            list={searchHistory}
                            onClick={unShiftSearchHistoryHanlde}
                            onClear={clearSearchHistory}
                        />
                    </HistoryWrap>

                    <HotWrap>
                        <SearchHot
                            list={hotSearch}
                            onClick={unShiftSearchHistoryHanlde}
                        />
                    </HotWrap>
                </Wrap>
            </Scroll>
            {
                renderRoutes(routes)
            }
        </HomeUnderWrap>
    )
}

const
    mapState = state => {
        const
            search = state.get('search'),
            searchHistory = search.get('searchHistory'),
            hotSearch = search.get('hotSearch'),
            inputSuggest = search.get('inputSuggest'),
            inputDefault = search.get('inputDefault')

        return {
            searchHistory,
            hotSearch,
            inputSuggest,
            inputDefault
        }
    },
    mapDispatch = dispatch => ({
        getInputDefault() {
            const action = actionsCreator.getInputDefault()
            dispatch(action)
        },
        getInputSuggest(keywords) {
            const action = actionsCreator.getInputSuggest(keywords)
            dispatch(action)
        },
        getHotSearch() {
            const action = actionsCreator.getHotSearch()
            dispatch(action)
        },
        unshiftSearchHistory(keywords) {
            const action = actionsCreator.unshiftSearchHistory(keywords)
            dispatch(action)
        },
        clearSearchHistory() {
            const action = actionsCreator.clearSearchHistory()
            dispatch(action)
        }
    })

export default connect(mapState, mapDispatch)(memo(Search))