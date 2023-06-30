from mido import Message
from domain.message.interface import ChannelVoiceMessage
from domain.message.channel.voice.note_off import NoteOffMessage


class NoteOnMessage(ChannelVoiceMessage):
    def __init__(self, note_number: int, started_on: int, duration: int):
        self._note_number: int = note_number
        self._started_on: int = started_on
        self._duration: int = duration

    def toMIDIMessage(self, seek_time: int):
        # 直前のメッセージからの待機時間。シーケンス上の開始位置から、経過時間(seek_time)を引くことで算出する
        time = self._started_on - seek_time
        return Message("note_on", note=self._note_number, time=time)

    def toNoteOffMessage(self):
        # ノートオフメッセージの開始位置は、ノートオンの開始位置＋発声時間
        note_of_at = self._started_on + self._duration
        return NoteOffMessage(self._note_number, started_on=note_of_at)
