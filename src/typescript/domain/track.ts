import { Message } from "./message";

export default class Track {
  no: number;
  name: string;
  instrumentId: number;
  messages: Message[] = [];

  static systemTrack(): Track{
    const track = new Track();
    track.no = 0;
    track.name = `System Track`;

    return track;
  }

  static instrumentalTrack(no: number): Track{
    if(no === 0){
      throw new Error("Track No.0 is used as System Track.");
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

    for(let idx = 1; idx <= 16; idx++){
      const track = Track.instrumentalTrack(tracks.length + 1);
      tracks.push(track);
    }

    return new Tracks(tracks);
  }

  add(no: number): void {
    const track = Track.instrumentalTrack(no);
    this.tracks.push(track);
  }

  select(no: number): Track {
    if(no > this.tracks.length){
      throw new Error("OutOfRangeError.");
    }

    return this.tracks[no];
  }
}