// 测试朋友问的一个问题
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [useSource, setSource] = useState("http://192.168.0.1/av.mp4")
  useEffect(() => {})

  return (
    <div className="App">
      <header>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <video onError={(e) => {if(e.nativeEvent.type === 'error'){ setSource('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4') }}} width={400} height={400} className='videoPlayer' controls src={useSource}>
        </video>
      </header>
    </div>
  );
}

export default App;
