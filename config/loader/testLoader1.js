// 测试loader执行顺序
module.exports = (source) => {
    const str = '\n  console.log(loader1);'
    console.log('executed in loader1')
    return source + str
}

module.exports.pitch = function () {
    console.log('pitch in loader1')
};
