// 基础技巧
// 去重
Array.from(new Set([]))

// 计算 解决进制计算问题
eval()

// 判断是否为质数
const isPrime = (number) => {
    let flag = true
    for(let i = 2; i < number; i++) {
        if(number % i) {
            flag = false
        }
    }

    return flag
}

// 计算质因数递归写法，但是时间速度太慢，超1s
const calYin = (number) => {
    if(number === 1) {
        return;
    }

    let cal = 2

    for(let i = 2; i <= number; i++) {
        if(number % i === 0 && isPrime(i)) {
            result.push(i)
            cal = i
            break;
        }
    }
    calYin(number / cal)
}

// 优化后的代码
// 问题1，为何使用平方
// 问题2，为何循环不是2的时候+2，是2的时候+1
// 问题3，为何结束条件是i*i
const calYinGood = (num) => {
    let arr = [];
    while (num != 1) {
        for (var i = 2; i * i <= num; ) {
            if (num % i == 0) {
                arr.push(i);
                num = num / i;
                break;
            }
            if (i != 2) {
                i += 2;
            } else {
                i++;
            }
        }

        // 结束条件 当i的平方>num的时候
        if (i * i > num) {
            arr.push(num);
            num = 1;
        }
    }

    console.log(arr.join(" "));
}

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

    // result1.push(array[0])

    // 错误思维 这样会导致堆栈溢出
    // return quickSort(result1.concat(result2)) 

    // 这样正确的
    // return quickSort(result1).concat(quickSort(result2))

    // 修正完美的
    return quickSort(result1).concat(array[0], result2)
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

// 栈思想
let depthFunc = (node) => {
    let stack = [];
    let result = [];

    if(node) {
        stack.push(node)
        while(stack.length > 0) {
            let item = stack.pop();
            result.push(item)
    
            while(item?.children?.length) {
                stack.push(item.children.pop())
            }
        }
    }

    return result
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

// 队列思想
let dfsFunc = (node) => {
    let queue = [];
    let result = [];

    if(node) {
        queue.push(node)
        while(queue.length) {
            let item = queue.shift()
            result.push(item)

            item.children.forEach((child) => {
                queue.push(child)
            })
        }
    }
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
// 总细胞数 = 2 * f(n - 1) - f(n - 4) 注意 这里一定是n-4不是n-3，因为3周期的细胞第四个周期才死掉
const cellDivid = (n) => {
   if(n === 0) {
        return 1
   }

   if(n === 1) {
    return 2
   }

   if(n === 2) {
    return 4
   }

// 错误思维，n - 3里有1个死细胞
//    if(n >= 3) {
//     return 2 * cellDivid(n - 1) - cellDivid(n - 3)
//    }

   if(n === 3) {
    return 7
   }

   if(n >= 4) {
    return 2 * cellDivid(n - 1) - cellDivid(n - 4)
   }
}

// 1. 问题，如何判断对象根节点并且插入
// 2. 如何根据根节点来进行子子节点的插入, 父母不明?
// 测试用例: 
// const list = [
//     { id: 04, pid: 03 },
//     { id: 01, pid: null },
//     { id: 02, pid: null },
//     { id: 03, pid: 01 },
//     { id: 05, pid: 01 },
//     { id: 06, pid: 03 },
//     { id: 07, pid: 02 },
//     { id: 09, pid: 02 },
//     { id: 10, pid: 07 },
// ]
const toTree = (array) => {
    let obj = {}
    let result = []
    // array.map(item => {
    //     // 插入根节点
    //     if(!item?.pid) {
    //         obj[item?.id] = { ...item, children: [] }
    //     }
    // })

    array.map(item => {
        obj[item?.id] = { ...item, children: obj[item?.id]?.children || [] }
        // 找不到父节点2种情况，一种根节点未插入，一种不存在根节点
        if(obj[item?.pid]) {
            let parent = obj[item?.pid]
            parent.children.push(obj[item?.id])
            // obj[item?.pid].children = parent.children
        } else {
            if(!item?.pid) {
                result.push({ ...obj[item?.id] })
            }
        }
        // if(item?.pid) {
        //     let parent = obj[item?.pid]
        //     parent.children.push(item)
        //     obj[item?.pid].children = parent.children
        // } else {
        //     obj[item?.id] = { ...item, children: [] }
        // }
    })

    return result
}




export { lcs, quickSort, depth, breadth, rain, minWindow, cellDivid, toTree };