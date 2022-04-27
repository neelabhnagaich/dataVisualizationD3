import React from 'react';
import * as d3 from "d3"

const width = 960;
const height = 500;
const centerX = width/2;
const centerY = height/2;
const strokeWidth = 10;

const eyeRadius = 40;
const eyeOffSetX = 100;
const eyeOffSetY = 80;

const mouthRadius = 180
const mouthWidth = 20;


const mouthArc = d3.arc()
      .innerRadius(mouthRadius)
      .outerRadius(mouthRadius + mouthWidth)
      .startAngle(Math.PI/2)
      .endAngle(Math.PI* 3 / 2);

const eyeArcLeft = d3.arc()
      .innerRadius(eyeRadius + 10)
      .outerRadius(eyeRadius + 10 + 10)
      .startAngle(0)
      .endAngle(Math.PI *2);


 const App = () =>{
  return (
    <svg width={width} height={height}>
      <g  transform={`translate(${centerX},${centerY})`}>
        <circle
            r={centerY - strokeWidth/2 }
            fill="yellow"
            stroke="black"
            strokeWidth={strokeWidth}
            >
        </circle>
        <circle
            r={eyeRadius}
            cx={- eyeOffSetX}
            cy={- eyeOffSetY }
            fill="black"          
            >
        </circle>
        <circle
            r={eyeRadius}
            cx={eyeOffSetX}
            cy={- eyeOffSetY }
            fill="black"          
            >
        </circle>

        <path d={mouthArc()} />

        <path 
          d={eyeArcLeft()}
          transform={`translate(${-eyeOffSetX},${-eyeOffSetY})`} 
          />
        <path 
          d={eyeArcLeft()}
          transform={`translate(${eyeOffSetX},${-eyeOffSetY})`} 
          />
      </g>
    </svg>
  );
}

export default App;
