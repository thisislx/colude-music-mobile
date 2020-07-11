import React, { useCallback, memo } from 'react'
import { navListConfig } from './config'
import { renderRoutes } from 'react-router-config'
import { Wrap, Header, Tab, TabItem } from './style'
import { NavLink } from 'react-router-dom'
import Player from '../Player'

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
                <span>晕音乐</span>

                <span
                    className="iconfont"
                    onClick={e => enterDetail()}
                >
                    &#xe8b9;
                </span>
            </Header>

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

            <Player />
        </Wrap>
    )
}

export default memo(Home)