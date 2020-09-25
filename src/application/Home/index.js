import React, { useCallback, memo, useEffect, Suspense } from 'react'
import { navListConfig } from './config'
import { renderRoutes } from 'react-router-config'
import { Wrap, Header, Tab, TabItem } from './style'
import { NavLink } from 'react-router-dom'
import Masker from '../../baseUI/Masker'

function Home(props) {
    const
        { route: { routes }, history } = props,
        enterDetail = useCallback(() => {
            history.push('/search')
        }, [history])
    return (
        <Wrap>
            <Header>
                <span className="iconfont">&#xe8af;</span>
                <span>月之声</span>
                <span
                    className="iconfont"
                    onClick={e => enterDetail()}
                >
                    &#xe8b9;
                </span>
            </Header>

            <Suspense fallback={<Masker />}>
                <Tab>
                    {
                        navListConfig.map(item => (
                            <TabItem key={item.to}>
                                <NavLink
                                    activeClassName={item.active}
                                    to={item.to}
                                >
                                    <div className='click-area'>{item.title}</div>
                                </NavLink>
                            </TabItem>
                        ))
                    }
                </Tab>
                {renderRoutes(routes)}
            </Suspense>




        </Wrap>
    )
}

export default memo(Home)