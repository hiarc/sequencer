export default class Notes {
  notes: Note[];

  constructor(notes:Note[]){
    this.notes = notes;
  }

  public static empty(): Notes{
    return new Notes([]);
  }
}

export class Note {
  eventAt: number;
  type: string;
  pitch: number;
  duration: number;
}