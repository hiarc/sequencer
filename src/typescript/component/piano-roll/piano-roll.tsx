import * as React from 'react';
import NoteOnMessage, { Message } from '../../domain/message';

/** 音程の最大値 */
export const MAX_NOTE_NUMBER = 127;
/** 1音程を表す水平線の縦方向の間隔 */
export const X_LINE_SPACING = 15;
/** 8分音符を表す垂直線の水平方向の間隔 */
export const Y_LINE_SPACING = 48;
/** ピアノロール全体の横幅。初期幅は1280 */
export const PIANO_ROLL_WIDTH = 1280;
/** ピアノロール全体の縦幅 */
export const PIANO_ROLLE_HEIGHT = X_LINE_SPACING * (MAX_NOTE_NUMBER + 1);

/** ノートオンメッセージのカラーコード */
const NOTE_ON_COLOR = "70F050";
/** 白鍵の入力領域の内側のカラーコード */
const X_WHITE_KEY_COLOR = "202020";
/** 黒鍵の入力領域の内側のカラーコード */
const X_BLACK_KEY_COLOR = "1A1A1A";
/** 1音程を表す水平線のカラーコード */
const X_LINE_COLOR = X_BLACK_KEY_COLOR
/** 1オクターブを表す水平線のカラーコード */
const X_OCTAVE_LINE_COLOR = "303030"
/** 8分音符を表す垂直線のカラーコード */
const Y_LINE_COLOR = "101010"
/** 1小節を表す垂直線のカラーコード */
const Y_MEASURE_LINE_COLOR = X_OCTAVE_LINE_COLOR


export const PianoRoll: React.FunctionComponent<{
  messages: Message[], 
  addMessage: (message: NoteOnMessage) => void
}> = (props) => {

  // 読み込み時に画面中央部までスクロールする。
  const pianoRollElement = React.useRef(null)
  React.useEffect(() => {
    pianoRollElement.current.scrollTop = PIANO_ROLLE_HEIGHT / 2;
  }, []);

  // ピアノロールを縦スクロールしたら白鍵・黒鍵のスクロールを追従させる。
  const onScroll = (e) => {
    const pianoKey = document.getElementById("piano-key");
    if(!pianoKey){
      return;
    }
    pianoKey.scrollTop = e.target.scrollTop;
  }
  var pianoRollWidth = PIANO_ROLL_WIDTH;

  /**
   * ノートオンメッセージのrect要素。
   * 
   * rect はSVG上で長方形を表現する。
   * width は長方形の横幅、height は長方形の縦幅、x 及び y は長方形の左上の開始位置を表す。
   */
  const messageRects = props.messages.map(message => {
    const noteOn = message as NoteOnMessage;
    const width = widthFromTick(noteOn.tick);
    const height = X_LINE_SPACING;
    const x = widthFromTick(noteOn.startedAt);
    // x座標＋発声の長さが画面右端に到達したら、水平スクロールを1小説分足す
    if(pianoRollWidth < x + Y_LINE_SPACING * 8){
      pianoRollWidth = x + Y_LINE_SPACING * 8;
    }
    // yは画面最上部を0にとるが、ノートナンバー（音程）は画面最下部を0とするため最大値を基準にして逆転させる
    const y = (MAX_NOTE_NUMBER - noteOn.noteNumber) * X_LINE_SPACING;
    return <rect width={width} height={height} x={x} y={y} fill={`#${NOTE_ON_COLOR}`} stroke={`black`} strokeWidth={0.1} rx={1} ry={1} key={crypto.randomUUID()}/>
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

  /**
   * ピアノロールの水平方向の入力領域を表すSVG要素。
   * 入力の目安になるように、音程ごと（白鍵・黒鍵）に色を塗り分ける。
   */
  const xRollElements = () => {
    var totalY = 0;
    const elements = [];
    for(let i = 1; i <= MAX_NOTE_NUMBER + 1; i++){
      const fill = [8, 9, 11, 1, 3, 4, 6].some(number => i % 12 === number) ? X_WHITE_KEY_COLOR : X_BLACK_KEY_COLOR;
      const rect = <rect width={pianoRollWidth} height={X_LINE_SPACING} x={0} y={totalY} fill={`#${fill}`}  key={crypto.randomUUID()}/>
      elements.push(rect);
      totalY += X_LINE_SPACING;
    }
    return elements;
  }

  /**
   * 入力領域の音程を表す平行線のSVG要素。
   * 音程ごと、1オクターブごとに色分けして区切る。
   */
    const xLineElements = () => {
      const elements = [];
      for(let i = 0; i <= MAX_NOTE_NUMBER + 1; i++){
        // ピアノロールの最上部の音程Gを0とすると、オクターブの区切りのCは8音目のため、12の余剰が8の時にオクターブの区切りとする。
        const stroke = i % 12 === 8 ? X_OCTAVE_LINE_COLOR : X_LINE_COLOR;
        const direction = `M 0 ${i * X_LINE_SPACING} L ${pianoRollWidth} ${i * X_LINE_SPACING}`;
        const path = <path d={direction} stroke={`#${stroke}`} strokeWidth={1} key={crypto.randomUUID()}/>;
        elements.push(path);
      }
      return elements;
    }

  /**
   * 音符の長さを表す垂直線のSVG要素。
   * 8分音符ごと、1小節ごとに色分けして区切る。
   */
  const yLineElements = () => {
    const elements = [];
    for(let i = 1; i <= pianoRollWidth / Y_LINE_SPACING; i++){
      const direction = `M ${i * Y_LINE_SPACING} 0 L ${i * Y_LINE_SPACING} ${PIANO_ROLLE_HEIGHT}`;
      const color = i % 8 === 0 ? Y_MEASURE_LINE_COLOR : Y_LINE_COLOR;
      const path = <path d={direction} stroke={`#${color}`} strokeWidth={1} key={crypto.randomUUID()}/>;
      elements.push(path);
    }
    return elements;
  }

  return (
    <div className="main-piano-roll" onScroll={(e) => onScroll(e)} ref={pianoRollElement}>
      <svg xmlns="http://www.w3.org/2000/svg" id="piano-roll" width={pianoRollWidth} height={PIANO_ROLLE_HEIGHT} onClick={addMessage}>
        {xRollElements()}
        {xLineElements()}
        {yLineElements()}
        {messageRects}
      </svg>
    </div>
  );
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