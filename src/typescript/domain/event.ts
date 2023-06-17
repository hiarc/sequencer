const EVENT = {
  NOTE_ON: "NOTE_ONE",
  PROGRAM_CHANGE: "PROGRAM_CHANGE"
} as const;

export type Event = typeof Event[keyof typeof Event];
