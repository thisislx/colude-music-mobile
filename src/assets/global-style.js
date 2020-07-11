const
    extendClick = () => {
        return `
        position: relative;
        &::before {
            content: '';
            position: absolute;
            top: -.5rem;
            right: -.5rem;
            bottom: -.5rem;
            left: -.5rem;
        }
    `
    },
    noWrap = () => {
        return `
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        `
    },
    underColor = () => {
        return `
            text-shadow: 0 0 .2rem rgba(0,0,0,.5),.2rem .2rem .4rem rgba(0,0,0,.5),
                0 0 1rem rgba(0,0,0,.5);
            `
    }


export default {
    'max-width': '40rem',
    'theme-color': '#d44439',
    'theme-back-color': 'hsla(0, 0%, 97%, 1)',
    'theme-back-color-v2': 'hsla(0, 0%, 90%, 1)',
    'font-color-light': 'hsla(0,0%,100%,.7)',
    'font-color-light-v2': '#f1f1f1',
    'font-color-light-v3': '#fff',
    'font-color-desc': '#333333',
    'font-color-desc-v2': '#888',// 略淡
    'font-size-ss': '0.625rem',
    'font-size-s': '0.75rem',
    'font-size-m': '0.875rem',
    'font-size-l': '1rem',
    'font-size-ll': '1.125rem',
    'font-size-lll': '1.4rem',
    'font-size-big': '1.8rem',
    "border-color": 'rgba(0, 0, 0, .1)',
    extendClick,
    noWrap,
    underColor
}



