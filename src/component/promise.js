class MyPromise {
    constructor(fn) {
        this.value = ''
        this.error = ''

        this.status = 'Pedding'
        this.fulfilledCallBackArray = []
        this.errorCallBackArray = []

        let resolve = (value) => {
            this.value = value
            this.status = 'Resolved'

            // 思路阻塞，此处不知道resolve是干嘛的，错误的思维
            // this.fulfilledCallBackArray.forEach((fn) => resolve(fn))

            // 正解
            this.fulfilledCallBackArray.forEach((fn) => fn(value))
        }

        let reject = (error) => {
            this.error = error
            this.status = 'Rejected'

            // 思路阻塞，此处不知道reject是干嘛的, 错误思维
            // this.errorCallBackArray.forEach((fn) => reject(fn))

            // 正解
            this.fulfilledCallBackArray.forEach((fn) => fn(error))
        }

        // 所欠缺的实际调用，此处不完善
        try {
            fn(resolve, reject)
        } catch(error) {
            // 错误思维，实际错误的时候是调用reject完成的
            // throw new Error(error)
            reject(error)
        }
    }
    
    static resolve(value) {
        // 思路阻塞，未能真正理解Promise.resolve()和resolve参数的区别
        if(value instanceof MyPromise) {
            // 思维错误，如果传promise则返回promise
            // return value.resolve()
            return value
        } else {
            return new MyPromise((resolve) => resolve(value))
        }
    }

    static reject(value) {
        // 思路阻塞，未能真正理解Promise.resolve()和resolve参数的区别
        if(value instanceof MyPromise) {
            return value
        } else {
            return new MyPromise((resolve, reject) => reject(value))
        }
    }
 
    then(onFulfilled, onReject){
        const self = this;
        // 错误思维 onFulfilled是函数或者值
        // let fulfilled = onFulfilled instanceof MyPromise ? onFulfilled.resolve() : new MyPromise(() => this.resolve(onFulfilled()))
        let onFulfilledUse = onFulfilled instanceof 'function' ? onFulfilled : value => value

        // 错误思维
        // let rejected = onReject instanceof MyPromise ? onReject.reject() : new MyPromise(() => this.reject(onReject()))
        let onRejectUse = onReject instanceof 'function' ? onReject : () => { throw new Error(self.error) }

        // 参数为函数, constructor内没有体现？
        return new MyPromise((resolve, reject) => {
            let fulfilled = () => {
                try {
                    // 错误思维, 如果不执行resolve，怎么走下一步呢，当传入then是一个promise参数的时候，第一个promise的resolve决定第二个promise的值
                    // return onFulfilledUse instanceof MyPromise ? onFulfilledUse.then(resolve, reject) : onFulfilledUse(self.value)
                    return onFulfilledUse instanceof MyPromise ? onFulfilledUse.then(resolve, reject) : resolve(onFulfilledUse(self.value))
                } catch(error) {
                    onRejectUse(self.error)
                }
            }
    
            let rejected = () => {
                try {
                    // 错误思维
                    // return onRejectUse instanceof MyPromise ? onRejectUse.then(resolve, reject) : onRejectUse(self.value)
                    return onRejectUse instanceof MyPromise ? onRejectUse.then(resolve, reject) : reject(onRejectUse(self.error))
                } catch(error) {
                    onRejectUse(self.error)
                }
            }

            switch(this.status) {
                case 'Pedding':
                    this.fulfilledCallBackArray.push(fulfilled)
                    this.errorCallBackArray.push(rejected)
                    break
                case 'Resolved':
                    fulfilled()
                    break
                case 'Rejected':
                    rejected()
                    break
            }
        })
    }
}

export default MyPromise