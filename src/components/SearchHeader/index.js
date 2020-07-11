import React, { memo, useRef, useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { debounce } from '../../utils'
import { Wrap, SuggestWrap } from './style'
import Suggest from '../SearchSuggest'

const _PATH = '/search'

const SearchHeader = function (props) {
    const
        { defaultValue, placeholder, suggest, match } = props,
        { onChange, onSubmit } = props,
        [relateInput, setRelateInput] = useState(false),
        [inputVal, setInputVal] = useState(''),
        inputRef = useRef(null),
        history = useHistory(),
        onBack = useCallback(() => {
            const { path } = match
            if (path === _PATH) {
                history.goBack()
            } else {
                history.replace('/search')
            }
        }, [history, match]),
        onInputChange = useCallback(debounce(val => {
            const newVal = val.trim()
            onChange && onChange(newVal)
            newVal && setRelateInput(true)
            setInputVal(val)
            console.log(newVal, relateInput)
        }, 100), [onChange, relateInput]),
        onClearInput = useCallback(() => {
            setInputVal('')
            inputRef.current.value = ''
            inputRef.current.select()
        }, [inputRef]),
        onInputBlur = useCallback(() => {
            relateInput && setTimeout(() => {
                setRelateInput(false)
            }, 200)
        }, [relateInput]),
        onInputFocus = useCallback((val) => {
            // 首次聚焦不进行关联
            if (onInputFocus._already) {
                setInputVal(val)
                val && setRelateInput(true)
            } else {
                onInputFocus._already = true
            }
        }, [inputRef]),
        onSubmitHandle = useCallback((val) => {
            const newVal = typeof val === 'string' ? val.trim() : ''
            if (newVal) {
                setInputVal(val)
                inputRef.current.value = val
                onSubmit && onSubmit(newVal)
                relateInput && setTimeout(() => {
                    setRelateInput(false)
                }, 100)
            }
        }, [relateInput, onSubmit])

    useEffect(() => {
        if (inputVal) {
            setRelateInput(true)
        } else if (!inputVal) {
            setRelateInput(false)
        }
    }, [inputVal])

    useEffect(() => {
        inputRef.current && inputRef.current.select()
    }, [defaultValue])

    return (
        <Wrap>
            <aside
                onClick={e => onBack()}
                className='iconfont'
            >
                &#xe6db;
            </aside>

            <form onSubmit={e => {
                e.preventDefault()
                onSubmitHandle(e.target.input.value)
            }}>
                <input
                    ref={inputRef}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={e => onInputChange(e.target.value)}
                    onBlur={e => onInputBlur()}
                    onFocus={e => onInputFocus(e.target.value)}
                    name='input'
                    autoFocus={true}
                    autoComplete='off'
                />
                <span
                    className={`clear-input iconfont` + (relateInput ? '' : ' hide')}
                    onClick={e => onClearInput()}
                >
                    &#xe6dc;
                </span>
            </form>

            <SuggestWrap className={relateInput ? '' : 'hide'}>
                <Suggest
                    current={inputVal}
                    list={suggest}
                    onClick={onSubmitHandle}
                />
            </SuggestWrap>

        </Wrap>
    )
}

export default memo(SearchHeader)

