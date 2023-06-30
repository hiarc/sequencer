from mido import Message
from domain.message.interface import ChannelVoiceMessage


class NoteOffMessage(ChannelVoiceMessage):
    def __init__(self, note_number: int, started_on: int):
        self._note_number: int = note_number
        self._started_on: int = started_on

    def toMIDIMessage(self, seek_time: int):
        # 直前のメッセージからの待機時間。シーケンス上の開始位置から、経過時間(seek_time)を引くことで算出する
        time = self._started_on - seek_time
        return Message("note_off", note=self._note_number, time=time)
