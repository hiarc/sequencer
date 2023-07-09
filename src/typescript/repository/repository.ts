import axios, { ResponseType } from "axios";
import NoteOnMessage from "../domain/message";
import { Tracks } from "../domain/track";

// TODO: FQDNを共通化する

export const saveAndDownload = (messages: NoteOnMessage[], filename: string) => {
  const data = { messages: messages, filename: filename }; 
  const option = {
    responseType: "blob" as ResponseType,
  };

  axios.post('http://localhost:8000/v1.0/save', data, option).then(response => {
    const blob = new Blob([response.data], { type: response.data.type });

    const anchor = document.createElement("a");
    anchor.href = window.URL.createObjectURL(blob);
    anchor.setAttribute("download", filename);
    anchor.click();

  }).catch(error => {
    alert(error);
  })
}

export const play = (portName: string, tracks: Tracks) => {
  const data = {tracks: tracks.tracks, portName: portName}; 
  axios.post('http://localhost:8000/v1.0/player', data)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export const fetchPortNames = () => {
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