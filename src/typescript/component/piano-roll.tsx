import * as React from 'react';
import { Message } from '../domain/message/interface';

export const PianoRoll: React.FunctionComponent<{notes: Message[]}> = (props) => {
  return (
      <div className="piano-roll" {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" id="piano-roll" width="1240" height="1240" onClick={onClick}>
        {
          (function(){
            const paths = [];
            for(let i = 1; i <= 60; i++){
              const direction = `M 0 ${i * 15} L 1240 ${i * 15}`;
              const color = i % 12 === 0 ? "red" : "gray";
              const path = <path d={direction} stroke={color} strokeWidth={1} key={"pianoroll-horizon" + i}/>;
              paths.push(path);
            }
             return paths;
          }())
        }
        </svg>
      </div>
  );
}

const onClick = (window) => {
  const pianoRoll = document.getElementById('piano-roll');
  if(!pianoRoll){
    return;
  }

  const rect = pianoRoll.getBoundingClientRect();
  const clickY = window.pageY - (rect.top + scrollY);
  const clickX = window.pageX - (rect.left + scrollX);
}