from mido import MidiTrack, Message
from domain.message import NoteOnMessage
from domain.parser import Parser


class Track:
    def __init__(
        self, no: int, name: str, instrument_id: int, messages: list[NoteOnMessage]
    ) -> None:
        self.no = no
        self.name = name
        self.instrument_id = instrument_id
        self.messages = messages


class MidoTrackHelper:
    @staticmethod
    def mido_instrument_track(track: Track):
        mido_track = MidiTrack()
        mido_track.name = track.name
        for message in Parser.to_mido_messages(track.messages):
            mido_track.append(message)
        return mido_track

    @staticmethod
    def to_sequencer_track(no: int, mido_track: MidiTrack[Message]):
        messages = Parser.to_sequencer_messages(mido_track)
        # TODO: メッセージからinstrument_id を取得できるようにする
        return Track(no, mido_track.name, 0, messages)
