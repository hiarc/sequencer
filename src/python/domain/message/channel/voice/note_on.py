from mido import Message
from domain.message.interface import ChannelVoiceMessage


class NoteOnMessage(ChannelVoiceMessage):
    def __init__(self, note_number: int, started_on: int, duration: int):
        self._note_number: int = note_number
        self._started_on: int = started_on
        self._duration: int = duration

    def toMIDIMessage(self):
        # TODO: ノートオフメッセージを返す
        return Message("note_on", note=self._note_number)
