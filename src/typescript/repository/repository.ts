import axios from "axios";
import NoteOnMessage from "../domain/message";

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

export const uploadFile = async (file: File) => {
    const blob = new Blob([file], {type: "audio/midi"});
    const formData = new FormData();
    formData.set("file", blob, file.name);

    const response = await axios.post('http://localhost:8000/v1.0/upload', formData);
    return response.data.map(
      message => new NoteOnMessage(
        message.noteNumber, message.startedAt, message.velocity, message.tick)
    );
}

export const selectFile = () => {
  return new Promise<File>(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.mid, audio/midi, audio/x-midi';

    input.onchange = (event) => {
      const input = event.target as HTMLInputElement;
      const file = input.files[0] as File;
      return resolve(file);
    }

    input.click();
  });
}