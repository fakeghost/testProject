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

// instanceof原理
function instance_of(L, R) {//L 表示左表达式，R 表示右表达式 

    var O = R.prototype;   // 取 R 的显示原型 

    L = L.__proto__;  // 取 L 的隐式原型

    while (true) {    

        if (L === null)      

             return false;   

        if (O === L)  // 当 O 显式原型 严格等于  L隐式原型 时，返回true

             return true;   

        L = L.__proto__;  

    }

}

// 需要反复复习!!!!!
/*--------------------------------------------------------------------*/
// js 6种继承模式
// 原型链式继承
function Father() {
    this.name = 'father'
}

function Son() {
    this.age = '11'
}

Son.prototype = new Father()
// 实例
const SonExpamle = new Son()

SonExpamle instanceof Father // true
/*--------------------------------------------------------------------*/

// 构造函数模式继承
function Father() {
    this.name = 'father'
}

function Son() {
    Father.call(this)
    this.age = '11'
}

const SonExpamle = new Son()

SonExpamle instanceof Father // false
/*--------------------------------------------------------------------*/

// 组合式继承
function Father() {
    this.name = 'father'
}

function Son() {
    Father.call(this)
    this.age = '11'
}

Son.prototype = new Father();

const SonExpamle = new Son()

SonExpamle instanceof Father // true

/*--------------------------------------------------------------------*/

// 原型继承 忘记了 着重复习!!!!!!!
function Father() {
    this.name = 'father'
}

function inherit(fatherObj) {
    function son(){}
    son.prototype = fatherObj
    return new son()
}

const SonExpamle = inherit(new Father())

SonExpamle instanceof Father // true

/*--------------------------------------------------------------------*/

// 寄生式继承 忘记了 着重复习!!!!!!
function Father() {
    this.name = 'father'
}

function inherit(obj) {
    function son(){}
    son.prototype = obj;
    return new son()
}

// 错误思维 inherit函数不需要把原型传给inherit函数
// inherit.prototype = new Father();
const FatherExample = new Father()

function addAttribute() {
    const newObj = inherit(FatherExample)
    newObj.age = '11'
    return newObj;
}

const SonExpamle = new addAttribute()

SonExpamle instanceof Father // true

/*--------------------------------------------------------------------*/

// 寄生式组合继承 完全忘记 着重复习!!!!!

function Father() {
    this.name = 'father'
}

Father.prototype.age = '11'

function repairProtoType(obj) {
    function son(){}
    son.prototype = obj;
    return new son()
}

// 错误思维，无论是寄生还是组合寄生继承 都不需要设置继承函数的protoType
// inherit.prototype = new Father()

// 错误思维
// function addAttribute() {
//     const newObj = inherit(Father.prototype)
//     newObj.age = '11'
//     return newObj;
// }

const sonRepair = new repairProtoType(Father.prototype)

function inherit() {
    Father.call(this)
}

// 错误思维，上面搞糊涂了，有修复protoType的操作，但是是从其他函数来的
inherit.prototype = sonRepair
inherit.prototype.constructor = inherit;

// addAttribute.prototype.constructor = addAttribute

const SonExpamle = new inherit()

SonExpamle instanceof Father // true


