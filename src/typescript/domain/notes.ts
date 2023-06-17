import {Event} from './event';

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
  type: Event;
  pitch: number;
  duration: number;
}