import { ChannelVoiceMessage } from "../../interface";

/**
 * ノートオンメッセージを表すクラス。
 */
export default class NoteOnMessage implements ChannelVoiceMessage {
  noteNumber: NoteNumber;
  startedOn: StartedOn;
  duration: Duration;
  
  constructor(noteNumber: number, startOn: number, duration: number){
    this.noteNumber = new NoteNumber(noteNumber);
    this.startedOn = new StartedOn(startOn);
    this.duration = new Duration(duration);
  }
}

/**
 * ノートナンバー。音程のこと。
 * 0を最も低い音程とする。最高は127。
 * デフォルトは60。中央のドを表す
 */
class NoteNumber {
  value: number = 60;

  constructor(noteNumber: number){
    if(noteNumber < 0 || noteNumber > 127){
      throw new Error("Illegal NoteNumber. NoteNumber must be between 0-127.");
    }
    this.value = noteNumber;
  }
}

/**
 * ノートオンを開始する、シーケンサー上のタイミング。
 */
class StartedOn {
  value: number = 0;
  
  constructor(startedOn: number){
    if(startedOn < 0){
      throw new Error("Illegal Number Of 'StartedOn'. The Number must be greater than 0.");
    }
    this.value = startedOn;
  }
}

/**
 * 発声時間。
 * ノートオンからノートオフまでの間とする。
 */
class Duration {
  value: number = 0;
  
  constructor(duration: number){
    if(duration < 0){
      throw new Error("Illegal Duration. Duration must be greater than 0.");
    }
    this.value = duration;
  }
}