from mido import MidiFile, MidiTrack
from domain.message import NoteOnMessage
from domain.track import MidoTrackHelper
from domain.track import Track


class MIDIFile:
    def __init__(self, tracks: list[Track]):
        self.midi: MidiFile = MidiFile(type=1)

        for track in tracks:
            mido_track: MidiTrack = MidoTrackHelper.mido_instrument_track(track)
            self.midi.tracks.append(mido_track)

    @staticmethod
    def file_to_obj(path: str):
        midi = MidiFile(path)
        # TODO: マルチトラックに対応する
        # for track in midi.tracks:
        #     messages = Track.to_messages(track)
        return MidoTrackHelper.to_sequencer_messages(midi.tracks[0])
