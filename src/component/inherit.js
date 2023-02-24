// 深入一些问题前所必备的基础知识
Function.prototype.call = function(context, ...args) {
    let contextUse = context || window
    let fn = Symbol('fn')
    contextUse[fn] = this;

    const result = contextUse[fn](...args)
    delete contextUse.fn;
    return result
}

// new函数原理
export const newFunction = (useFn) => (args) => {
  let obj = {
        __proto__: useFn.protoType
    }

    useFn.call(obj, ...args)

    return obj
}

// 寄生式组合继承
export function inherit(children, parent) {
    let protoType = Object.create(parent)

    protoType.constructor = children

    children.protoType = protoType
}


export const parent = () => {
    const parent = this;

    return parent
}

export const newFn = (fn) => {
    let obj = {
        __proto__: fn.protoType
    }

    return obj
}