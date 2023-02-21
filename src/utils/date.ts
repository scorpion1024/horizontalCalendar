/**
 * 
 * @param {*} val 今天明天后天
 * @returns hh:mm
 */
export function getDayName(d: string | Date): string {
    let td = new Date();
    td = new Date(td.getFullYear(), td.getMonth(), td.getDate());
    if (typeof d === 'string') {
        d = d.replace(/-/g, '/')//防止IOS环境下报错
    }
    let od = new Date(d);
    od = new Date(od.getFullYear(), od.getMonth(), od.getDate());
    const xc = (+od - +td) / 1000 / 60 / 60 / 24;
    if (xc < -2) {
        return -xc + "天前";
    } else if (xc < -1) {
        return "前天";
    } else if (xc < 0) {
        return "昨天";
    } else if (xc == 0) {
        return "今天";
    } else if (xc < 2) {
        return "明天";
    } else if (xc < 3) {
        return "后天";
    } else {
        return ''
    }
}

/**
 * 
 * @param {*} val 日期
 * @returns 'yyyy-MM-dd'
 */
export function formatDate(val: string | Date | undefined): string {
    if (!val) {
        return ''
    }
    try {
        if (typeof val === 'string') {
            val = val.replace(/-/g, '/')
        }
        const date = new Date(val)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const monthStr = month > 9 ? month : '0' + month
        const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        return year + '-' + monthStr + '-' + day
    } catch (err) {
        return ''
    }
}

/**
 *
 * @param date 2022/01/01
 * @returns {string} 周六
 */
export function getWeekByDate1(date: string | Date): string {
    if (typeof date === 'string') {
        date = date.replace(/-/g, '/')
    }
    const weekDay = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"];
    const d = typeof date === 'string' ? new Date(date) : date;
    return weekDay[d.getDay()];
}