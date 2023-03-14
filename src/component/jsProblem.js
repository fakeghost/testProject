// 数组扁平化
const _flatten = (array) => {
    let result = []

    for(let i = 0; i < array.length; i++) {
        if(Array.isArray(array[i])) {
            // 记住，concat不会改变原数组
            result = result.concat(_flatten(array[i]))
        } else {
            result.push(array[i])
        }
    }

    return result;
}

// 手动实现bind函数
// 背诵
Function.prototype.bind = function(context) {
    let self = this

    // 错误思维，arguments不能直接切割, 常用转化数组方式 Array.prototype.slice.call
    // let outerArgs = arguments.slice(1)
    let outerArgs = Array.prototype.slice.call(arguments, 1)

    function constructor() {
        let innerArgs = Array.prototype.slice.call(arguments)

        // 这里非常重要，好像是没有懂
        // a = foo.bind(this) 这种传递并且a作为构造函数的时候，需要改变this指向

        // this本身传入的context，如果是构造函数 new a这种调用的话，context会失效，变成自己

        // 例如：a = foo.bind({b: 123}) b = new a() foo(b){ this.b = b } this实际并不指向{b: 123}
        
        self.apply(this instanceof constructor ? this : context, outerArgs.concat(innerArgs))
    }

    constructor.prototype = this.prototype

    return constructor
}



// 防抖和节流
const debounce = (fn, wait) => {
    let timer = null

    // 错误思考，只有throtte需要比较，记住
    // let pre = new Date()

    return function() {
        let self = this
        let args = arguments
        // if(new Date() - pre < wait) {
        //     timer = setTimeout(fn, wait)
        // } else {
        //     clearTimeout(timer)
        // }
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(self, args)
        }, wait)
    }

}

const throtte = (fn, time) => {
    let pre = 0

    return function() {
        let self = this
        let args = arguments

        if(new Date().getTime() - pre > time) {
            fn.apply(self, args)
            pre = new Date().getTime()
        }
    }
}

// 字符串大小写反转
const reverseWord = (string) => {
    const array = string.split('')

    const newArray = array.map(item => {
        if(item.toLowerCase() === item) {
            return item.toUpperCase()
        } else {
            return item.toLowerCase()
        }
    })

    return newArray.join('')
}

// call函数实现
Function.prototype.call2 = function(context) {
    // 严重错误思维，想改变this指向, 往传入的context添加一个fn属性就行了
    // this[this] = context

    let result = ''
    context.fn = this || window
    let arg = []
    // 严重错误思维, 想执行用eval
    // this(args)

    // 错误了，写call函数还用call?

    for(let i = 1; i < arguments.length; i++) {
        arg.push(arguments[i])
    }
    result = eval(`context.fn(${arg})`)

    delete context.fn

    return result
}

const deepClone = (sourceTarget) => {
    let obj = {}
    if(typeof sourceTarget !== 'object') {
        return sourceTarget
    }

    if(Array.isArray(sourceTarget)) {
        return sourceTarget
    }

    for(let key in sourceTarget) {
        let value = sourceTarget[key]
        if(Object.prototype.hasOwnProperty.call(sourceTarget, key)) {
            if(typeof value === 'object') {
                obj[key] = deepClone(value)
            } else {
                obj[key] = value
            }
        }
    }

    return obj
}

export {
    _flatten,
    debounce,
    throtte,
    reverseWord
}