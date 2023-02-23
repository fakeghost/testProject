// 测试loader执行顺序
module.exports = (source) => {
    const str = '\n  console.log(loader4);'
    console.log('executed in loader4')
    return source + str
}

module.exports.pitch = function () {
    console.log('pitch in loader4')
};