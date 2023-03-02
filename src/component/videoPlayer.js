// 测试朋友问的一个问题
import React, { useEffect } from 'react';

const VideoPlayer = () => {
    // const [useSource, setSource] = useState("http://192.168.0.1/av.mp4")
    useEffect(() => {})

    return (
      <div className="App">
        <header className='header'>
          <p className='text'>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            textContent
          </p>
          <p>
            textContent
          </p>
          {/* <video onError={(e) => {if(e.nativeEvent.type === 'error'){ setSource('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4') }}} width={400} height={400} className='videoPlayer' controls src={useSource}>
          </video> */}
          {/* 测试下LVHA问题 */}
          <a className='testHover' href='https://www.baidu.com'>哈哈哈哈</a>
        </header>

        {/* 三角形 */}
        <div className='triangle'></div>

        {/* 品字布局 */}
        <div className='layoutP'>
          <div className='box1'></div>
          <div className='boxContainer'>
            <div className='box2'></div>
            <div className='box3'></div>
          </div>
        </div>

        {/* 多列等高 */}
        <div className='divTree'>
          <div className='box1'>
            <p>大师的撒多撒大所大所多</p>
          </div>
          <div className='box2'>
            <p>大师的撒多撒大所大所多大师的撒多撒大所大所多</p> 
          </div>
          <div className='box3'>
            <p>大师的撒多撒大所大所多大师的撒多撒大所大所多大师的撒多撒大所大所多大师的撒多撒大所大所多大师的撒多撒大所大所多</p>
          </div>
        </div>

        {/* margin重叠问题 */}
        <div className='marginProblem'>
          <div className='margin1'></div>
          <div className='margin2'></div>
        </div>

        {/* 宽高2: 1的矩形 */}
        <div className='rec'></div>
        
        {/* 三列式上下固定高度，中间高度自适应布局 */}
        <div className='testBox1'>
          <div className='box1'></div>
          <div className='box2'></div>
          <div className='box3'></div>
        </div>

        {/* 三列式布局 */}
        <div className='testBox2'>
          <div className='box1'></div>
          <div className='box2'></div>
          <div className='box3'></div>
        </div>
      </div>
    )
}

export default VideoPlayer