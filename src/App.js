import React, { useEffect } from 'react'
import './App.css';
import VideoPlayer from './component/videoPlayer';
import lcs from './component/LCS';

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
