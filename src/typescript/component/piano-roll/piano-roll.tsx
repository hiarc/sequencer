import * as React from 'react';
import NoteOnMessage from '../../domain/message';

/** 音程の最大値 */
const MAX_NOTE_NUMBER = 127;
/** 平行線の間隔 */
const X_LINE_SPACING = 15;
/** 垂直線の間隔 */
const Y_LINE_SPACING = 48;

export const PianoRoll: React.FunctionComponent<{messages: NoteOnMessage[], addMessage: Function}> = (props) => {
  /**
   * ノートオンメッセージのrect要素。
   * 
   * rect はSVG上で長方形を表現する。
   * width は長方形の横幅、height は長方形の縦幅、x 及び y は長方形の左上の開始位置を表す。
   */
  const messageRects = props.messages.map(message => {
    const width = widthFromTick(message.tick);
    const height = X_LINE_SPACING;
    const x = widthFromTick(message.startedAt);
    // yは画面最上部を0にとるが、ノートナンバー（音程）は画面最下部を0とするため最大値を基準にして逆転させる
    const y = (MAX_NOTE_NUMBER - message.noteNumber) * X_LINE_SPACING;
    return <rect width={width} height={height} x={x} y={y} fill="gray" stroke="gray" key={crypto.randomUUID()}/>
  });

  /**
   * ノートオンメッセージを追加する。
   * ピアノロール上で左クリックした座標を元に、開始位置・音程を判定してメッセージを生成する。
   */
  const addMessage = (window) => {
    const pianoRoll = document.getElementById('piano-roll');
    if(!pianoRoll){
      return;
    }

    const rect = pianoRoll.getBoundingClientRect();
    const clickY = window.pageY - (rect.top + scrollY);
    const clickX = window.pageX - (rect.left + scrollX);
    const message = toNoteOnMessage(clickX, clickY);
    props.addMessage(message);
  }

  /**
   * ピアノロール上の座標をノートオンメッセージに変換する。
   * 
   * @param x ピアノロール上のX座標
   * @param y ピアノロール上のY座標
   * @returns ノートオンメッセージ
   */
  const toNoteOnMessage = (x: number, y: number) => {
    // window.pageYは画面最上部を0にとるが、ノートナンバー（音程）は画面最下部を0とするため最大値を基準にして逆転させる
    const noteNumber = MAX_NOTE_NUMBER - Math.floor(y / X_LINE_SPACING);
    // ノートの開始位置は8分音符でクォンタイズして入力する
    // TODO: クォンタイズする基準を変更できるようにする
    const startedAt = tickFromWidth(Math.floor(x / Y_LINE_SPACING) * Y_LINE_SPACING);
    // ノートオンメッセージの発声の長さ。入力モードで選択している音の長さ（Rect要素の横幅）を基準にする
    const tick = tickFromWidth(Y_LINE_SPACING);
    // TODO: 編集時にベロシティを調整できるようにする
    return new NoteOnMessage(noteNumber, startedAt, 100, tick);
  }

  return (
    <div className="piano-roll">
      <svg xmlns="http://www.w3.org/2000/svg" id="piano-roll" width="1240" height="2480" onClick={addMessage}>
      {horizontalPaths}
      {verticalPaths}
      {messageRects}
      </svg>
    </div>
  );
}

/**
 * 平行線を表すpath要素。
 * 1オクターブ（12音）毎に赤線で区切る。
 * 
 * path の d は以下の構文を取り、SVG上で直線を表現する。
 * d="M {x1} {y1} L {x2} {y2}"
 * 上記のように指定すると、起点（x1y1）から終点（x2y2）に線を引く。
 */
const horizontalPaths = [];
for(let i = 1; i <= MAX_NOTE_NUMBER + 1; i++){
  const direction = `M 0 ${i * X_LINE_SPACING} L 1240 ${i * X_LINE_SPACING}`;
  const color = i % 12 === 0 ? "red" : "gray";
  const path = <path d={direction} stroke={color} strokeWidth={1} key={"pianoroll-horizon" + i}/>;
  horizontalPaths.push(path);
}

/**
 * 垂直線を表すpath要素。
 * 8分音符毎に白線で区切る。
 */
const verticalPaths = [];
for(let i = 1; i <= 60; i++){
  const direction = `M ${i * Y_LINE_SPACING} 0 L ${i * Y_LINE_SPACING} 2480`;
  const color = i % 8 === 0 ? "white" : "gray";
  const path = <path d={direction} stroke={color} strokeWidth={1} key={"pianoroll-vertical" + i}/>;
  verticalPaths.push(path);
}

/**
 * シーケンサー上のX方向の距離を、ノートオンメッセージの発声の長さ(tick)に変換して返す。
 * @returns ノートオンメッセージのtick数
 */
const tickFromWidth = (rectWidth: number) => {
  // 選択中の音の長さ × (480: ticks per beat / 48: 8分音符のrect要素の横幅)
  return rectWidth * 10;
}

/**
 * ノートオンメッセージの時間表現を、シーケンサー上のX方向の距離にして返す。
 * @returns シーケンサー上のX方向の距離
 */
const widthFromTick = (tick: number) => {
  return tick / 10;
}