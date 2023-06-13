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
  public add(): void {
    const track = new Track(this.size + 1);
    this.tracks.push(track);
  }
  public get asList(): Track[]{
    return this.tracks;
  }
  public get size(): number {
    return this.tracks.length;
  }
}