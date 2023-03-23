import React, { useEffect } from 'react'
import './App.css';
import VideoPlayer from './component/videoPlayer';

// 测试Treeshaking
import { lcs } from './component/algorithmProblem';

function App() {
  useEffect(() => {
    console.log(lcs('ABCDAB', 'BDCABA'))
  }, [])

  return (
    <div className="App">
      <VideoPlayer />
    </div>
  );
}

export default App;
