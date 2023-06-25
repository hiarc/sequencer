import * as React from 'react';
import NoteOn from '../domain/message/channel/voice/note-on';


export const PianoRoll: React.FunctionComponent<{notes: NoteOn[]}> = (props) => {
  return (
      <div className="bg-svg" {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1240" height="1240">
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