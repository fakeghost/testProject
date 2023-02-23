// 测试loader执行顺序
module.exports = (source) => {
    const str = '\n  console.log(loader2);'
    console.log('executed in loader2')
    return source + str
}

module.exports.pitch = function () {
    console.log('pitch in loader2')
};