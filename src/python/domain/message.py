from abc import ABC, abstractmethod
from mido import Message


class IMessage(ABC):
    pass


class IChannelMessage(Message):
    pass


class IChannelVoiceMessage(IChannelMessage):
    @abstractmethod
    def toMidoChannelVoiceMessage(self, seek_time: int):
        """Midoで扱えるチャンネルボイスメッセージに変換する。
        seek_time: int
            シーケンス全体の経過時間。
        """
        pass


class NoteOnMessage(IChannelVoiceMessage):
    def __init__(self, note_number: int, started_on: int, duration: int):
        self._note_number: int = note_number
        self._started_on: int = started_on
        self._duration: int = duration

    def toMidoChannelVoiceMessage(self, seek_time: int):
        # 直前のメッセージからの待機時間。シーケンス上の開始位置から、経過時間(seek_time)を引くことで算出する
        time = self._started_on - seek_time
        return Message("note_on", note=self._note_number, time=time)

    def toNoteOffMessage(self):
        # ノートオフメッセージの開始位置は、ノートオンの開始位置＋発声時間
        note_of_at = self._started_on + self._duration
        return NoteOffMessage(self._note_number, started_on=note_of_at)


class NoteOffMessage(IChannelVoiceMessage):
    def __init__(self, note_number: int, started_on: int):
        self._note_number: int = note_number
        self._started_on: int = started_on

    def toMidoChannelVoiceMessage(self, seek_time: int):
        # 直前のメッセージからの待機時間。シーケンス上の開始位置から、経過時間(seek_time)を引くことで算出する
        time = self._started_on - seek_time
        return Message("note_off", note=self._note_number, time=time)
