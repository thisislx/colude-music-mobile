import React, { useEffect } from 'react'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import { Container } from './style'

function Slide({ list = [] }) {
    useEffect(() => {
        new Swiper('.swiper-container', {
            loop: true, // 循环模式选项

            autoplay: true,
            delay: 3000,

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
        })
    }, [])

    return (
        <Container>
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        list.map((item, key) => (
                            <img
                                alt={item.typeTitle}
                                key={item.imageUrl}
                                src={item.imageUrl}
                                className="swiper-slide" />
                        ))
                    }

                </div>
                <div className="swiper-pagination"></div>
            </div>
        </Container>
    )
}

export default React.memo(Slide)