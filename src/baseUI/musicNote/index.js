import './style.css'
import style from '../../assets/global-style'

export default function({x, y}, timer = 1600) {
    const div = document.createElement('div')
    div.className = 'music-note iconfont'
    div.style.cssText = `
        animation-duration: ${timer}ms;
        left: ${x}px;
        top: ${y}px;
        color: ${style['theme-color']};
        font-size: ${style['font-size-lll']};
    `
    div.innerHTML = '<h1>&#xe69f;</h1>'
    document.body.appendChild(div)

    setTimeout(() => {
        document.body.removeChild(div)
    }, timer + 1000)
}