// 测试loader执行顺序
module.exports = (source) => {
    const str = '\n  console.log(loader3);'
    console.log('executed in loader3')
    return source + str
}

module.exports.pitch = function () {
    console.log('pitch in loader3')
    return '123';
};