import * as React from 'react';
import { Message } from '../domain/message/interface';
import NoteOnMessage from '../domain/message/channel/voice/note-on';
import { notes } from '..';

/** 平行線の間隔 */
const X_LINE_SPACING = 15;
/** 垂直線の間隔 */
const Y_LINE_SPACING = 50;

export const PianoRoll: React.FunctionComponent<{notes: Message[]}> = (props) => {
  return (
      <div className="piano-roll" {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" id="piano-roll" width="1240" height="2480" onClick={onClick}>
        {
          // 平行線の描画。
          // 1オクターブ（12音）毎に赤線で区切る。
          (function(){
            const paths = [];
            for(let i = 1; i <= 128; i++){
              // d="M {x1} {y1} L {x2} {y2}"
              // 起点（x1y1）から終点（x2y2）に線を引く
              const direction = `M 0 ${i * X_LINE_SPACING} L 1240 ${i * X_LINE_SPACING}`;
              const color = i % 12 === 0 ? "red" : "gray";
              const path = <path d={direction} stroke={color} strokeWidth={1} key={"pianoroll-horizon" + i}/>;
              paths.push(path);
            }
             return paths;
          }())
        }
        {
          // 垂直線の描画。
          // 8分音符毎に白線で区切る。
          (function(){
            const paths = [];
            for(let i = 1; i <= 60; i++){
              // d="M {x1} {y1} L {x2} {y2}"
              // 起点（x1y1）から終点（x2y2）に線を引く
              const direction = `M ${i * Y_LINE_SPACING} 0 L ${i * Y_LINE_SPACING} 2480`;
              const color = i % 8 === 0 ? "white" : "gray";
              const path = <path d={direction} stroke={color} strokeWidth={1} key={"pianoroll-vertical" + i}/>;
              paths.push(path);
            }
             return paths;
          }())
        }
        </svg>
      </div>
  );
}

/**
 * ピアノロール上でクリックした時のイベント。
 */
const onClick = (window) => {
  const pianoRoll = document.getElementById('piano-roll');
  if(!pianoRoll){
    return;
  }

  const rect = pianoRoll.getBoundingClientRect();
  const clickY = window.pageY - (rect.top + scrollY);
  const clickX = window.pageX - (rect.left + scrollX);
  const message = toNoteOnMessage(clickX, clickY);
  notes.push(message);
}

/**
 * 左クリックした座標を元にノートオンメッセージを生成する。
 * 
 * @param x 左クリックしたX座標
 * @param y 左クリックしたY座標
 * @returns ノートオンメッセージ
 */
const toNoteOnMessage = (x: number, y: number) => {
  // window.pageYは画面最上部を0にとるが、ノートナンバー（音程）は画面最下部を0とするため逆転させる
  const noteNumber = 127 - Math.floor(y / X_LINE_SPACING);
  // ノートの開始位置は8分音符でクォンタイズして入力する
  const startX = Math.floor(x / Y_LINE_SPACING) * Y_LINE_SPACING;
  const message = new NoteOnMessage(noteNumber, startX, X_LINE_SPACING);
  return message;
}