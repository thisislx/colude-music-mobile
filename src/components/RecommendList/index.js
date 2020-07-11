import React, { useCallback } from 'react'
import { Container, List, ListItem } from './style'
import { getTenThousand } from '../../utils'
import LazyLoad from 'react-lazyload'
import lazyImg from '../../assets/imgs/lazy.png'
import { useHistory } from 'react-router-dom'

//避免连续点击
let lockEnterAlbum = false

function RecommendList(props) {
    const
        { list } = props,
        history = useHistory(),
        onEnterAlbum = useCallback(id => {
            if (!lockEnterAlbum && id !== undefined) {
                lockEnterAlbum = true
                history.push(`/recommend/${id}`)
                setTimeout(() => {
                    lockEnterAlbum = false
                }, 500)
            }
        }, [history])

    return (
        <Container>
            <h3>推荐歌单</h3>
            <List >
                {
                    list.map(item => (
                        <ListItem key={item.id} onClick={e => onEnterAlbum(item.id)}>
                            <div className='img-wrap'>
                                <div className='decorate'></div>

                                <p className='listen-count'>
                                    {getTenThousand(item.playCount)}
                                </p>

                                <LazyLoad placeholder={<img src={lazyImg} alt='music' />}>
                                    <img
                                        _id={item.id}
                                        src={`${item.picUrl}?param=300x300`}
                                        alt='加载失败'
                                    />
                                </LazyLoad>
                            </div>

                            <footer _id={item.id}>{item.name}</footer>
                        </ListItem>
                    ))
                }
            </List>
        </Container>
    )
}

export default React.memo(RecommendList)