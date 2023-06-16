export default class Track {
  private no: number;
  private name: string;
  private instrumentId: number;
  private sequenseId: number;

  constructor(no: number){
    this.no = no;
    this.name = `track${no}`;
  }
  public get getNo(): number{
    return this.no;
  }
  public get getName(): string{
    return this.name;
  }
}

export class Tracks {
  private tracks: Track[];
  constructor(tracks: Track[]){
    this.tracks = tracks;
  }
  public static empty(): Tracks {
    return new Tracks([]);
  }
  public static default(): Tracks {
    let tracks = this.empty();
    for(let idx = 1; idx <= 16; idx++){
      tracks.add(tracks.size + 1);
    }
    return tracks;
  }
  public add(no: number): void {
    const track = new Track(no);
    this.tracks.push(track);
  }
  public get asList(): Track[]{
    return this.tracks;
  }
  public get size(): number {
    return this.tracks.length;
  }
}