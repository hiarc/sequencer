import axios from "axios";
import NoteOnMessage from "../domain/message/channel/voice/note-on";

export const play = (messages: NoteOnMessage[], portName: string) => {
  // TODO: FQDNを共通化する
  const data = {messages: messages, portName: portName}; 
  axios.post('http://localhost:8000/v1.0/player', data)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export const fetchPortNames = () => {
  // TODO: FQDNを共通化する
  return axios.get('http://localhost:8000/v1.0/devices/output')
}