import { ChannelVoiceMessage } from "../../interface";

/**
 * ノートオンメッセージを表すクラス。
 */
export default class NoteOnMessage implements ChannelVoiceMessage {
  /**
   * ノートナンバー。音程のこと。
   * 0を最も低い音程とする。最高は127。
   * デフォルトは60。中央のドを表す
   */
  noteNumber: number;

  /**
   * ノートオンを開始する、シーケンサー上のタイミング。
   */
  startedOn: number;

  /**
   * 発声時間。
   * ノートオンからノートオフまでの間とする。
   */
  duration: number;
  
  constructor(noteNumber: number = 60, startOn: number = 0, duration: number = 0){
    this.noteNumber = noteNumber;
    this.startedOn = startOn;
    this.duration = duration;
  }
}