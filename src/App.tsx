import { Button } from "antd";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { fontSizePx, fontSizeState } from "./store";


const App: React.FC = () => {

  const [ fontSize, setFontSize ] = useRecoilState(fontSizeState)
  const fontSizeV = useRecoilValue(fontSizePx)
 
  return (
    <div className="App" style={{position: 'relative', height: '200px'}}>
      <Button onClick={() => setFontSize(fontSize+1)} style={{ fontSize: fontSizeV }}>{ fontSize }</Button>
    </div>
  );
};

export default App;
