import React, { memo, forwardRef } from 'react'
import { Wrap, ImgWrap, Bar } from './style'

const SingerAuthor = forwardRef(function (props, ref) {
    const { picUrl, name } = props

    return (
        <Wrap>
            <ImgWrap ref={ref}>
                <img
                    src={picUrl}
                    alt={name}
                />
            </ImgWrap>

            <Bar>
                <section className='left'>
                    <h2 className='name'>
                        {name}
                    </h2>
                </section>

                <section className='right'>
                    <div className='interest-btn'>
                        <span>+</span>关注
                        </div>
                </section>
            </Bar>
        </Wrap>
    )
})

export default memo(SingerAuthor)