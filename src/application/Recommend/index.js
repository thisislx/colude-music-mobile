import React, { useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import { actionsCreator } from './store'
import { forceCheck } from 'react-lazyload'

import Slide from '../../components/Slide'
import Scroll from '../../components/Scroll'
import RecommendList from '../../components/RecommendList'
import { Mask } from './style'
import Toast from '../../baseUI/Toast'
import HomeUnderWrap from '../../baseUI/HomeUnderWrap'

function Recommend(props) {
    const
        { route: { routes } } = props,
        { bannerList, recommendList, loaded } = props,
        { getBannerList, getRecommendList } = props

    useEffect(() => {
        if (!loaded) {
            getBannerList()
            getRecommendList()
        }
    }, [loaded, getBannerList, getRecommendList])
    const
        bannerList_JS = bannerList.toJS() || [],
        recommendList_JS = recommendList.toJS() || [];

    return (
        <HomeUnderWrap>
            {renderRoutes(routes)}

            {
                loaded ? (
                    <Scroll onScroll={e =>forceCheck()}>
                        <div>
                            <Mask />
                            <Slide list={bannerList_JS} />
                            <RecommendList list={recommendList_JS} />
                        </div>
                    </Scroll>
                ) : <Toast icon={true} mes={'加载中...'} />
            }
        </HomeUnderWrap>
    )
}

const
    mapState = state => {
        const
            // 不要toJS, 原因：每次toJS返回新的对象
            bannerList = state.getIn(['recommend', 'bannerList']),
            recommendList = state.getIn(['recommend', 'recommendList']),
            loaded = state.getIn(['recommend', 'loaded'])

        return {
            bannerList,
            recommendList,
            loaded
        }
    },
    mapDispatch = dispatch => ({
        // 横幅
        getBannerList() {
            const action = actionsCreator.getBannerList()
            dispatch(action)
        },

        //推荐歌单
        getRecommendList() {
            const action = actionsCreator.getRecommendList()
            dispatch(action)
        }
    })

export default connect(mapState, mapDispatch)(React.memo(Recommend))