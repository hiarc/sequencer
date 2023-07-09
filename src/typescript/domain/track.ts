import { Message } from "./message";

export default class Track {
  no: number;
  name: string;
  instrumentId: number = 0; // TODO: GUIから選択できるようにする。
  messages: Message[] = [];

  static conductorTrack(): Track{
    const track = new Track();
    track.no = 0;
    track.name = `Conductor Track`;

    return track;
  }

  static instrumentalTrack(no: number): Track{
    if(no === 0){
      throw new Error("Track No.0 is used as Conductor Track.");
    }

    const track = new Track();
    track.no = no;
    track.name = `Track${no}`;

    return track;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

}

export class Tracks {
  tracks: Track[];

  constructor(tracks: Track[]){
    this.tracks = tracks;
  }

  static empty(): Tracks {
    return new Tracks([]);
  }

  static default(): Tracks {
    const tracks = [];

    tracks.push(Track.conductorTrack());
    for(let idx = 1; idx <= 16; idx++){
      const track = Track.instrumentalTrack(idx);
      tracks.push(track);
    }

    return new Tracks(tracks);
  }

  add(no: number): void {
    const track = Track.instrumentalTrack(no);
    this.tracks.push(track);
  }

  get(no: number): Track {
    if(no > this.tracks.length){
      throw new Error("OutOfRangeError.");
    }

    return this.tracks[no];
  }

  addMessage(idx: number, message: Message): void {
    const track = this.get(idx);
    track.addMessage(message);
  }
}