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

// 快速排序 二分法
let quickSort = (array) => {
    if(!Array.isArray(array) || array.length <= 1) {
        return array
    }

    let result1 = []
    let result2 = []

    for(let i = 1; i < array.length; i++) {
        if(array[i] < array[0]) {
            result1.push(array[i])
        } else {
            result2.push(array[i])
        }
    }

    result1.push(array[0])

    // 错误思维 这样会导致堆栈溢出
    // return quickSort(result1.concat(result2)) 

    // 这样正确的
    return quickSort(result1).concat(quickSort(result2))
}

// 数据结构, 深度广度的遍历
let obj = {
    children: [
    {
        index: 1,
        children: [{
            index: 3,
            children: [{
                index: 4
            }]
        }]
    },
    {
        index: 2,
        children: [{
            index: 5,
            children: [
            {
                index: 6
            },
            {
                index: 7
            }
            ]
        }]
    }
    ]
}

// 深度优先算法
let depth = (node, nodeList = []) => {

    if(node !== null) {
        nodeList.push(node)
        const children = node?.children
        for(let i = 0; i < children?.length; i++) {
            // 错误思维，nodeList仅作为辅助传出整个结果的，并非深度优先相关
            // depth(children[i], children[i]?.children)
            depth(children[i], nodeList)
        }
    }

    return nodeList
}

// 广度优先算法(死记的，一定要每天复习)
let breadth = (node) => {
    let stack = []
    let nodeList = []

    if(node) {
        stack.push(node)
        while(stack.length) {
            const item = stack.shift()
            // 错误思维，应该取item的children
            // const children = node?.children
            const children = item?.children
            nodeList.push(item)
            for(let i = 0; i < children?.length; i++) {
                stack.push(children[i])
            }
        }
    
    }

    return nodeList
}

// 接雨水问题，双指针 有点困难，需要反复记忆
let rain = (array) => {
    let leftIndex = 0
    let leftMax = array[0]
    
    let rightIndex = array.length - 1
    let rightMax = array.at(-1)

    // 错误思维，双指针不需要当前位置的index
    // let nowIndex = 0

    let result = 0

    while(leftIndex < rightIndex) {
        leftMax = Math.max(leftMax, array[leftIndex])
        rightMax = Math.max(rightMax, array[rightIndex])
        if(leftMax < rightMax) {
            result += leftMax - array[leftIndex]
            leftIndex++
        } else {
            result += rightMax - array[rightIndex]
            rightIndex--
        }
    }

    return result
}

// 滑动窗口算法
const minWindow = function(s, t) {
    let leftIndex = 0
    let rightIndex = 0

    let m = new Map()

    let resultStr = ''

    for(let i = 0; i < t.length; i++) {
        let c = t[i]
        m.set(c, m.get(c) ? m.get(c) + 1: 1)
    }

    let type = m.size

    // 当窗口内不包含字符时，rightIndex右移动，当窗口内字符包含全量字符时，leftIndex右移动
    while(rightIndex < s.length) {
        let c = s[rightIndex]

        // 严重错误思维，在写代码时完全忽略要记得，必须窗口内要有这个字符，才会set, map.has()这个方法完全忘记了
        // m.set(c, m.get(c) - 1)

        if(m.has(c)) {
            m.set(c, m.get(c) - 1)

            if(m.get(c) === 0) {
                type--
            }
        }
        
        // 
        while(type === 0) {
            let c2 = s[leftIndex]
    
            // 错误思维，比的应该是旧resultStr和新resultStr
            // if(resultStr && resultStr.length > 0) {
            //     resultStr = s.slice(leftIndex, rightIndex - 1)
            // }

            const newRes = s.slice(leftIndex, rightIndex + 1)

            // 记住这个判断
            if(!resultStr || resultStr.length > newRes.length) {
                resultStr = newRes
            }

            if(m.has(c2)) {
                m.set(c2, m.get(c2) + 1)
                if(m.get(c2) === 1) {
                    type++
                }
            }

            leftIndex++
        }
        
        rightIndex++
    }

    return resultStr  
};

// 细胞分裂问题
const cellDivid = () => {
   
}


export default lcs;