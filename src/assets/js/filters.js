// 年龄
export function dealAge (val) {
    if (val) {
        let date = new Date()
        let year = date.getFullYear()
        return Number(year) - Number(val)
    } else {
        return val
    }
}
// 性别
export function dealGender (val) {
    var gender = ''
    if (val === 1) {
        gender = '男'
    } else if (val === 2) {
        gender = '女'
    } else if (val === 9) {
        gender = '其他'
    } else {
        gender = ''
    }
    // switch (val) {
    //     case 1:
    //         gender = '男'
    //         break
    //     case 2:
    //         gender = '女'
    //         break
    //     case 9:
    //         gender = '其他'
    //         break
    //     default:
    //         gender = ''
    // }
    return gender
}
