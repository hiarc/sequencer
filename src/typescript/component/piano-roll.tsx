import * as React from 'react';
import Notes from '../domain/notes';


export const PianoRoll: React.FunctionComponent<{notes: Notes}> = (props) => {
  return (
      <div className="bg-svg" {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1240" height="1240">
        {
          (function(){
            const span = [];
            for(let i = 1; i <= 60; i++){
              const m = "M 0 "
              const l = " L 1240 "
              const color = i % 12 === 0 ? "red" : "gray"
              span.push(<path d={m + i * 15 + l + i * 15} stroke={color} strokeWidth={1} key={"pianoroll-horizon" + i}/>)
            }
             return span;
          }())
        }
        </svg>
      </div>
  );
}