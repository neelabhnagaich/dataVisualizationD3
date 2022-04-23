import React from 'react';

const width = 960;
const height = 500;
const centerX = width/2;
const centerY = height/2;
const strokeWidth = 10;

const eyeRadius = 40;
const eyeOffSetX = 100;
const eyeOffSetY = 80;


 const App = () =>{
  return (
    <svg width={width} height={height}>
      <circle
          r={centerY - strokeWidth/2 }
          cx={centerX}
          cy = {centerY}
          fill="yellow"
          stroke="black"
          stroke-width={strokeWidth}
          >
      </circle>
      <circle
          r={eyeRadius}
          cx={centerX - eyeOffSetX}
          cy={centerY - eyeOffSetY }
          fill="black"          
          >
      </circle>
      <circle
          r={eyeRadius}
          cx={centerX + eyeOffSetX}
          cy={centerY - eyeOffSetY }
          fill="black"          
          >
      </circle>
    </svg>
  );
}

export default App;
