import axios from "axios";
import NoteOnMessage from "../domain/message/channel/voice/note-on";

export const play = (messages: NoteOnMessage[]) => {
  // TODO: FQDNを共通化する
  // TODO: フロントで選んだポート名を送信する
  const data = {messages: messages, portName: 'IACDriver BUS1'}; 
  axios.post('http://localhost:8000/v1.0/player', data)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}