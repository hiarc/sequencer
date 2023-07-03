import * as React from 'react';
import { MAX_NOTE_NUMBER, X_LINE_SPACING, PIANO_ROLLE_HEIGHT, Y_LINE_SPACING } from './piano-roll';

/** 鍵盤の横幅 */
const CONTAINER_WIDTH = 50;
/** 白鍵の高さ。F〜B間（半7音）の白鍵（4つ） */
const WHITE_KEY_HEIGHT_F = X_LINE_SPACING * 7 / 4;
/** 白鍵の高さ。C〜E#間（半5音）の白鍵（3つ） */
const WHITE_KEY_HEIGHT_C = X_LINE_SPACING * 5 / 3;
/** 白鍵の総数。1オクターブに7音が、(黒鍵含むノート総数/1オクターブ)分だけ存在する。 */
const WHITE_KEY_AMOUNT = Math.ceil((MAX_NOTE_NUMBER + 1) / 12 * 7);

/** 白鍵の外枠のカラーコード。 */
const WHITE_KEY_COLOR_STROKE = "606060";
/** 白鍵の内側のカラーコード。 */
const WHITE_KEY_COLOR_FILL = "E0E0E0";
/** 黒鍵の外枠のカラーコード。 */
const BLACK_KEY_COLOR_STROKE = "000000";
/** 黒鍵の内側のカラーコード。 */
const BLACK_KEY_COLOR_FILL = "202020";

export const PianoKey: React.FunctionComponent<{}> = (props) => {
  return (
    <div className="main-piano-key">
      <svg xmlns="http://www.w3.org/2000/svg" id="piano-key" width="50px" height={PIANO_ROLLE_HEIGHT}>
      {whiteKeyElements()}
      {blackKeyElements()}
      </svg>
    </div>
  );
}

/**
 * 白鍵を表すrect要素。
 */
const whiteKeyElements = () => {
  const rects = [];
  /*
   * 白鍵の始点となるY座標。それぞれの白鍵の高さを加えたものを、次の白鍵の始点にする。
   * 水平線と最初の白鍵の縦の軸を合わせるために、始点の初期値は負の値をとる。
   * ピアノロールの最上部の水平線は、最初の白鍵の途中から始まるため。
   */
  var totalY = X_LINE_SPACING * 3 - WHITE_KEY_HEIGHT_F * 2;
  for(let i = 0; i <= WHITE_KEY_AMOUNT + 1; i++){
    /*
     * 白鍵は [C, D, E] と [F, G, A, B] でピアノロール上の高さが異なる。そのため高さを分けて算出する。
     * ピアノロールの最上部はGであり、下側にG, F, E, D…と続く。
     * 起点0をGとして鍵盤の高さを算出する。
     */
    const height = [0, 1, 5, 6].some(note => i % 7 === note) ? WHITE_KEY_HEIGHT_F : WHITE_KEY_HEIGHT_C;
    const rect = <rect width={CONTAINER_WIDTH} height={height} x={0} y={totalY} fill={`#${WHITE_KEY_COLOR_FILL}`} stroke={`#${WHITE_KEY_COLOR_STROKE}`} key={crypto.randomUUID()}/>
    rects.push(rect);
    totalY += height;
  }
  return rects;
}

/**
 * 黒鍵を表すSVG要素。
 */
const blackKeyElements = () => {
  const rects = [];
  for(let i = 0; i <= MAX_NOTE_NUMBER + 1; i++){
    if([1, 4, 6, 9, 11].some(note => i % 12 === note)){
      const width = CONTAINER_WIDTH * 0.65; // 幅は白鍵の65%にする
      const vMergin = 4; // 黒鍵の上下2つのマージンは、それぞれ4ポイントとずつとする
      const height = X_LINE_SPACING - (vMergin * 2); 
      const y = vMergin + i * X_LINE_SPACING;
      const rect = <rect width={width} height={height} x={0} y={y} fill={`#${BLACK_KEY_COLOR_FILL}`} stroke={`#${BLACK_KEY_COLOR_STROKE}`} key={crypto.randomUUID()}/>
      rects.push(rect);
    }
  }
  return rects;
}