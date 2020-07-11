export const getTenThousand = count => {
    if (count <= 1) return 1

    const w = 10 ** 4,
        y = 10 ** 8;

    switch (true) {

        case count < y:
            return `${(count / w).toFixed(1)}万`

        case count >= y:
            return `${(count / y).toFixed(1)}亿`

        default: return 'xxx'
    }
}

export const setElMaxWidth = el => {
    if (!el instanceof HTMLElement) {
        throw new Error('setElMaxWidth(): 输入不是dom节点')
    }
    el.style.width = el.scrollWidth + 'px'
}

export const setElMaxHeight = el => {
    if (!el instanceof HTMLElement) {
        throw new Error('setElMaxHeight(): 输入不是dom节点')
    }
    el.style.height = el.scrollHeight + 'px'
}

export function debounce(fn, wait = 100) {
    let timer = null,
        that = this

    return (...args) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(that, args)
        }, wait)
    }
}

export const throttle = function (fn, wait) {
    let old = Date.now()

    return (...args) => {
        const present = Date.now()
        if (present - old < wait) return
        old = present
        return fn.apply(this, args)
    }
}

// 接受一个未分类的数组，返回{全球排行榜, 官方榜}
export const rankListFiter = (list) => {
    // 按照数组 tracks.length判断
    const global = [], official = []

    list.forEach(element => {
        if (element.tracks.length) {
            official.push(element)
        } else {
            global.push(element)
        }
    });

    return {
        global,
        official
    }
}


export const greateNumberToText = number => {
    const w = 10 ** 4, y = 10 ** 8
    if (number < w) return number
    switch (true) {
        case number < y:
            return (number / w).toFixed(1) + '万'

        case number >= y:
            return (number / y).toFixed(1) + '亿'
    }
}


export const sToMinute = s => {
    const m = 60
    s = ~~s
    return s >= m ?
        `${~~(s / m)}:${(s % m + '').padStart(2, 0)}` :
        `0:${(s + '').padStart(2, 0)}`
}


export const overLoad = function (obj, name, fn) {
    const old = obj[name]

    obj[name] = function () {
        return fn.length == arguments.length ?
            fn.apply(this, arguments) :
            old.apply(this, arguments)
    }
}

export const randomNumber = (a, b, isInteger) => {
    const count = a + Math.random() * (b - a)
    return isInteger ? Math.floor(count) : count
}

export class Storage {

    constructor(application) {
        this.application = application
        Storage._key || (Storage._key = '__coludMusic@adasxszcx')
    }

    set(key, data) {
        const json = JSON.stringify(data)
        return localStorage.setItem(`${Storage._key}-${this.application}-${key}`, json)
    }

    get(key) {
        const json = localStorage.getItem(`${Storage._key}-${this.application}-${key}`)
        return JSON.parse(json)
    }

    //sessionStorage
    sset(key, data) {
        const json = JSON.stringify(data)
        return sessionStorage.setItem(`${Storage._key}-${this.application}-${key}`, json)
    }

    sget(key) {
        const json = sessionStorage.getItem(`${Storage._key}-${this.application}-${key}`)
        return JSON.parse(json)
    }
}

// 歌曲信息获取歌手名字
export const arToArtistNames = (ar) => {
    if (!Array.isArray(ar)) 
        throw new Error('arToArtistNames(): 不是数组')
    
    return ar.map((item, key) => key ? ` - ${item.name}` : item.name).join('')
}



