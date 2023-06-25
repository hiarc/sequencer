import ChannelVoiceMessage from "./channel-voice-message";

/**
 * ノートオンメッセージを表すクラス。
 */
export default class NoteOn implements ChannelVoiceMessage {
  noteNumber: NoteNumber;
  duration: Duration;
  constructor(noteNumber: number, duration: number){
    this.noteNumber = new NoteNumber(noteNumber);
    this.duration = new Duration(duration);
  }
  
}

/**
 * ノート番号。
 * デフォルトは60（中央のド）
 */
export class NoteNumber {
  noteNumber: number = 60;

  constructor(noteNumber: number){
    if(noteNumber < 0 || noteNumber > 127){
      throw new Error("Illegal NoteNumber. NoteNumber must be between 0-127.");
    }
    this.noteNumber = noteNumber;
  }
}

/**
 * 発声時間。
 * ノートオンからノートオフまでの間とする。
 */
export class Duration {
  duration: number = 0;
  
  constructor(duration: number){
    if(duration < 0){
      throw new Error("Illegal Duration. Duration must be greater than 0.");
    }
    this.duration = duration;
  }
}