import React, { useState, useCallback, useEffect, useRef, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"
import { debounce } from '../../utils'
import BScroll from "better-scroll"
import { Container } from './style'

// useImperativeHandle不能获取最新bScroll(刚new的时候)
let _bScroll = null

const Scroll = forwardRef((props, ref) => {
    const
        { direction, click, refresh, bounceTop, bounceBottom, enable } = props,
        [bScroll, setBScroll] = useState(null),
        scrollContaninerRef = useRef(),
        { onPullUp, onPullDown, onScroll } = props,
        // 防抖处理
        onPullUp_de = useCallback(debounce(onPullUp, 100), [onPullUp]),
        onPullDown_de = useCallback(debounce(onPullDown, 100), [onPullDown])

    if (refresh && bScroll) {
        requestAnimationFrame(() => {
            bScroll.refresh()
        })
    }

    useImperativeHandle(ref, () => {
        return {
            refresh() {
                if (refresh && _bScroll) {
                    _bScroll.refresh()
                }
            },
            size() {
                return {
                    x: _bScroll.maxScrollX,
                    y: _bScroll.maxScrollY
                }
            },
            toElement(el, time = 1000) {
                _bScroll.scrollToElement(el, time, true, true)
            },

            toTop(time = 1000) {
                _bScroll.scrollTo(0, 0, time)
            }
        }
    })

    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",

            //  可选值：1、2、3
            // 作用：有时候我们需要知道滚动的位置。
            probeType: 3,
            click,
            bounce: {
                // 向上吸顶
                top: bounceTop,

                //向下吸顶
                bottom: bounceBottom
            }
        });
        setBScroll(scroll);
        scroll.disable()

        _bScroll = scroll
        return () => {
            setBScroll(null);
        }
    }, [scrollContaninerRef, direction, click, bounceTop, bounceBottom])


    // 每次刷新

    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll);
        })
        return () => {
            bScroll.off('scroll');
        }
    }, [onScroll, bScroll]);

    //  滑动到了底部
    useEffect(() => {
        if (!bScroll || !onPullUp) return;
        bScroll.on('scrollEnd', () => {
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                // bScroll.maxScrollY   类型：Number
                // 作用：scroll 最大纵向滚动位置。
                // 备注：scroll 纵向滚动的位置区间是 0 - maxScrollY，并且 maxScrollY 是负值。
                //负值表示方向

                //   y     类型：Number
                // 作用：scroll 纵轴坐标。
                onPullUp_de();
            }
        });
        return () => {
            bScroll.off('scrollEnd');
        }
    }, [onPullUp, bScroll]);

    // 下拉
    useEffect(() => {
        if (!bScroll || !onPullDown) return;
        bScroll.on('touchEnd', (pos) => {
            // pos{x, y} 滚动结束的位置坐
            if (pos.y > 50) {
                onPullDown_de();
            }
        });
        return () => {
            bScroll.off('touchEnd');
        }
    }, [onPullDown, bScroll]);

    useEffect(() => {
        if (!bScroll) return
        enable ? bScroll.enable() : bScroll.disable()
    }, [bScroll, enable])

    return (
        <Container ref={scrollContaninerRef}>
            {props.children}
        </Container>
    );
})

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    onPullUp: null,
    onPullDown: null,
    bounceTop: true,
    bounceBottom: true,
    enable: true
};

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    onPullUp: PropTypes.func,
    onPullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,// 是否支持向上吸顶
    bounceBottom: PropTypes.bool,// 是否支持向上吸顶
    enable: PropTypes.bool  // 停止滑动
};

export default React.memo(Scroll)