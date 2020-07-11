import React, { lazy, Suspense } from 'react'
import { Redirect } from 'react-router-dom'

const
    Home = lazy(() => import('../application/Home')),
    Recommend = lazy(() => import('../application/Recommend')),
    Rank = lazy(() => import('../application/Rank')),
    Singers = lazy(() => import('../application/Singers')),
    Singer = lazy(() => import('../application/Singer')),
    Album = lazy(() => import('../application/Album')),
    Player = lazy(() => import('../application/Player/route')),
    Search = lazy(() => import('../application/Search')),
    SearchResult = lazy(() => import('../application/SearchResult'))

const MyComponent = Component => props => {
    return (
        <Suspense fallback={null}>
            <Component {...props} />
        </Suspense>
    )
}

const routesConfig = [
    {
        path: '/',
        component: MyComponent(Home),
        routes: [
            {
                path: '/',
                exact: true,
                render: () => (
                    <Redirect to='/recommend' />
                )
            },
            {
                path: '/player',
                render() {
                    return <Redirect to='/recommend' />
                }
            },
            {
                path: '/recommend',
                component: Recommend,
                routes: [
                    {
                        path: '/recommend/:id',
                        component: Album
                    },

                ]
            },
            {
                path: '/singers',
                component: Singers,
                routes: [
                    {
                        path: '/singers/:id',
                        component: Singer
                    }
                ]
            },
            {
                path: '/rank',
                component: Rank,
                routes: [
                    {
                        path: '/rank/:id',
                        component: Album
                    }
                ]
            },
            {
                path: '/search',
                component: Search,
                routes: [
                    {
                        path: '/search/:keywords',
                        component: SearchResult
                    }
                ]
            }
        ]
    },
]


const reg = /\/player/

const addPlayerRole = (routes) => {

    if (!routes || !routes.length) return

    for (const route of routes) {
        if (reg.test(route.path)) continue
        addPlayerRole(route.routes)

        if (route.path !== '/') {
            route.routes = route.routes || []

            route.routes.unshift({
                path: `${route.path}/player`,
                component: Player
            })
        }
    }
}

addPlayerRole(routesConfig)

export default routesConfig