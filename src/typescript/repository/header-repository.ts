import axios from "axios";
import NoteOnMessage from "../domain/message/channel/voice/note-on";

export const play = (messages: NoteOnMessage[]) => {
  // TODO: FQDNを共通化する
  axios.post('http://localhost:8000/player', messages)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}