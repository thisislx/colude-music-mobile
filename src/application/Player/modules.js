export const Lyric = (() => {
    const
        reg = /\[([^\]]+)\]\s*([^\[]+)/g,
        trimStart = /^\s\s*/,
        trimEnd = /\s\s*$/

    class Lyric {
        // 未翻译歌词， 与翻译歌词
        constructor(origin, local) {
            this.lines = init(origin, local)
            this.current = 0
            this.last = {
                current: 0,
                time: 0
            }
            this.next = {
                current: 1,
                time: this.lines[1].time
            }
        }

        // 计算第几行
        // params[0] string or number
        cacular(ms) {
            ms += 800
            const
                { last, next, lines, } = this,
                max = lines.length,
                nextNext = next.current + 1 === max ? next.current : next.current + 1,
                _this = this

            switch (true) {
                // 只有一条歌词
                case max === 1:
                    return 0

                // 没有下一条歌词
                case ms >= lines[max - 1].time || next.current === max:
                    return this.current = max - 1

                // 闭环
                case next.time === last.time:
                    setTimeout(() => this.cacular(ms), 20)
                    return pubicHandle(next.current)

                // 正常播放未到下一条歌词
                case ms > last.time && ms < next.time:
                    return last.current

                // 正常播放到下一条歌词
                case ms >= next.time && ms < lines[nextNext].time:
                    return pubicHandle(next.current)

                // 快进
                case ms >= lines[nextNext].time:
                    console.log('快进')
                    for (let i = nextNext; i < max; i++) {
                        if (lines[i].time >= ms) {
                            pubicHandle(i)
                            return i
                        }
                    }

                // 后退
                case ms <= last.time:
                    console.log('后退')
                    // 回退点在第一条歌词前
                    if (ms <= lines[0].time)
                        return pubicHandle(0)

                    let backCount = last.current
                    while (backCount--) {
                        // 大于当前播放的时间
                        if (ms >= lines[backCount].time)
                            return pubicHandle(backCount)
                    }

                default: return false
            }

            // 相同操作
            function pubicHandle(current) {
                _this.last = {
                    current: current,
                    time: lines[current].time
                }
                _this.next = {
                    current: current + 1,
                    time: current === max - 1 ? Number.MAX_SAFE_INTEGER : lines[current + 1].time
                }

                return _this.current = current
            }
        }
    }

    function init(origin, local) {
        if (!local)
            return translate(origin)
        const
            torigin = translate(origin),
            tlocal = translate(local),
            ol = torigin.length,
            ll = tlocal.length,
            result = []

        switch (true) {
            case ol === ll:
                for (let i = 0; i < ol; i++) {
                    result.push({
                        time: torigin[i].time,
                        txt: `${torigin[i].txt} \n ${tlocal[i].txt}`
                    })
                }
                return result

            case ol > ll:
                return irregularMixin(tlocal, torigin)

            case ol < ll:
                return irregularMixin(torigin, tlocal, false)

            default: return torigin
        }

        // local 与 origin长度不一
        // @params(3): Boolean ---- true: max的文本在前  false： min文本在前
        function irregularMixin(min, max, ahead = true) {
            const result = [], minLen = min.length, maxLen = max.length
            let trace = 0

            for (let i = 0; i < maxLen; i++) {
                if (trace < minLen && max[i].time === min[trace].time) {
                    result.push({
                        time: max[i].time,
                        txt: ahead ?
                            `${max[i].txt} \n ${min[trace++].txt}` :
                            `${min[i].txt} \n ${max[trace++].txt}`
                    })
                } else {
                    result.push(max[i])
                }
            }
            return result
        }
    }

    function translate(str) {
        const res = []
        let record = reg.exec(str)
        while (record) {
            const isEmpty = trim(record[2])
            isEmpty && res.push({
                txt: isEmpty,
                time: minuteToMS(trim(record[1])) || 0
            })
            record = reg.exec(str)
        }
        return res
    }

    function minuteToMS(str) {
        const arr = str.split(':'),
            m = 1000 * 60,
            s = 1000
        return arr[0] * m + arr[1] * s
    }

    function trim(str) {
        return str.replace(trimStart, '').replace(trimEnd, '')
    }

    return Lyric
})()
