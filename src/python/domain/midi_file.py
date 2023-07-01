from mido import MidiFile, MidiTrack
from domain.message import NoteOnMessage
from domain.track import Track


class MIDIFile:
    def __init__(self, messages: list[NoteOnMessage]):
        # TODO: マルチトラック化する
        sys_track: MidiTrack = Track.system_track()
        track0: MidiTrack = Track.instrument_track("track0", messages)

        self.midi: MidiFile = MidiFile(type=1)
        self.midi.tracks.append(sys_track)
        self.midi.tracks.append(track0)
