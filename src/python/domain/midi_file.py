from mido import MidiFile, MidiTrack
from domain.track import MidoTrackHelper
from domain.track import Track


class MIDIFile:
    def __init__(self, tracks: list[Track]):
        self.midi: MidiFile = MidiFile(type=1)

        for track in tracks:
            mido_track: MidiTrack = MidoTrackHelper.mido_instrument_track(track)
            self.midi.tracks.append(mido_track)

    @staticmethod
    def file_to_sequencer_model(path: str):
        midi = MidiFile(path)
        tracks = list(
            MidoTrackHelper.to_sequencer_track(idx, track)
            for idx, track in enumerate(midi.tracks)
        )
        return tracks
