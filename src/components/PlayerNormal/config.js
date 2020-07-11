export const
    modeConfig = ['&#xe61c;', '&#xe607;', '&#xe60a;'],
    playBtnConfig = {
        [false]: '&#xe726;',
        [true]: '&#xe723;'
    },
    emptyLine = Array.apply(null, { length: 3 }),
    exactValue = (percent, amount) => Math.round(percent * amount)