import React, { memo, useRef, useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { debounce } from '../../utils'
import { Wrap, Progress } from './style'

let
    _maxWidth = 0,
    _offsetLeft = 0,
    _newPercent = 0

const ProgressBar = function (props) {
    const
        { percent, wait} = props,
        { onChange, onMove, onMoveEnd } = props,
        [selectBtn, setSelectBtn] = useState(false),
        WrapRef = useRef(null),
        progressRef = useRef(null),
        onClickJump = useCallback((x) => {
            // 计算当前的位置
            const
                present = Math.min(
                    _maxWidth,
                    Math.max(0, x - _offsetLeft)
                ),
                newPercent = (present / _maxWidth).toFixed(2)
            onChange(newPercent)
        }, [onChange]),
        // 移动
        onTouchMove = useCallback(debounce(x => {
            setSelectBtn(true)
            // 计算当前的位置
            const present = Math.min(
                _maxWidth,
                Math.max(0, x - _offsetLeft)
            )
            _newPercent = (present / _maxWidth).toFixed(2)
            progressRef.current.style.width = `${_newPercent * 100}%`
            onMove && onMove(_newPercent)
        }, 4), [onMove]),
        // 移动到末尾, 与onTouchMove保持异步顺序
        onTouchEnd = useCallback(debounce(e => {
            onMoveEnd && onMoveEnd(_newPercent)
            setTimeout(() => {
                setSelectBtn(false)
            })
        }, 4), [onMoveEnd])

    useEffect(() => {
        progressRef.current.style.width = `${(percent ? percent : 0) * 100}%`
    }, [percent])

    useEffect(() => {
        const
            resizeHandle = debounce(() => {
                const rect = WrapRef.current.getBoundingClientRect()
                _maxWidth = rect.width
                _offsetLeft = rect.x
            }, 50)

        resizeHandle()
        window.addEventListener('resize', resizeHandle)
        return () => {
            window.removeEventListener('resize', resizeHandle)
        }
    }, [WrapRef])

    return (
        <Wrap
            ref={WrapRef}
            onClick={e => { onClickJump(e.clientX) }}
            onTouchMove={e => { onTouchMove(e.touches[0].clientX) }}
            onTouchEnd={onTouchEnd}
        >
            <Progress
                ref={progressRef}
            >
                {
                    wait ?
                        <div className={`btn waiting`}></div> :
                        <div className={`btn ${selectBtn ? 'attention' : ''}`}></div>
                }
            </Progress>

        </Wrap>
    )
}

ProgressBar.defaultProps = {
    percent: 0,
    onChange: null,
    onMove: null,
    onMoveEnd: null
}

ProgressBar.propTypes = {
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onMove: PropTypes.func,
    onMoveEnd: PropTypes.func
}

export default memo(ProgressBar)