// 最长子序列问题
// 我个人的理解，设立一个矩阵，如果横竖不相等的话，就取左边和上边2个比较的最大值，如果相同就取斜对角（递归

// 注意，需要创建二维数组，不能直接赋值

let lcs = (str1, str2) => {
    // 空字符串也需要算进去啊
    const row = str1.split('')
    row.unshift('')
    const col = str2.split('')
    col.unshift('')

    let result = []

    for(let i = 0; i < row.length; i++) {
        // 需要创建二维数组, 注意，第一次写我错了这里，没有估计到二维数组的初始化
        result[i] = []
        for(let j = 0; j < col.length; j++) {
            if(i === 0 || j === 0) {
                result[i][j] = 0
                
            } else {
                if(row[i] === col[j]) {
                    result[i][j] = result[i-1][j-1] + 1
                } else {
                    result[i][j] = Math.max(result[i-1][j], result[i][j-1])
                }
            }
        }
        
    }
    return result[row.length - 1][col.length - 1]
}

export default lcs;