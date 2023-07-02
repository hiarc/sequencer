from abc import ABC, abstractmethod
from mido import Message


class IMessage(ABC):
    pass


class IChannelMessage(IMessage):
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
    def __init__(self, note_number: int, started_at: int, velocity: int, tick: int):
        self.note_number: int = note_number
        self.started_at: int = started_at
        self.velocity: int = velocity
        self.tick: int = tick

    def toMidoChannelVoiceMessage(self, seek_time: int):
        # 直前のメッセージからの待機時間。シーケンス上の開始位置から、経過時間(seek_time)を引くことで算出する
        time = self.started_at - seek_time
        return Message(
            "note_on", note=self.note_number, velocity=self.velocity, time=time
        )

    def toNoteOffMessage(self):
        # ノートオフメッセージの開始位置は、ノートオンの開始位置＋発声時間
        note_of_at = self.started_at + self.tick
        return NoteOffMessage(self.note_number, started_at=note_of_at)

    def add_tick(self, tick: int):
        self.tick += tick


class NoteOffMessage(IChannelVoiceMessage):
    def __init__(self, note_number: int, started_at: int):
        self.note_number: int = note_number
        self.started_at: int = started_at

    def toMidoChannelVoiceMessage(self, seek_time: int):
        # 直前のメッセージからの待機時間。シーケンス上の開始位置から、経過時間(seek_time)を引くことで算出する
        time = self.started_at - seek_time
        return Message("note_off", note=self.note_number, time=time)


class MidoMessageHelper:
    """
    Midoのメッセージをラップして扱うクラス。
    """

    def __init__(self, mido_message: Message) -> None:
        self.value = mido_message

    def has_attr(self, name: str):
        return hasattr(self.value, "time")

    def is_mido_note_on_message(self):
        """
        Midoのノートオン・メッセージかどうかを返却する。
        MIDIの規約上、ベロシティが0の場合はノートオフとして扱われるためベロシティによる判定を加えている。
        """
        if self.value.type != "note_on":
            return False

        if not hasattr(self.value, "velocity"):
            return False

        if self.value.velocity == 0:
            return False

        return True

    def is_mido_note_off_message(self):
        """
        Midoのノートオフ・メッセージかどうかを返却する。
        MIDIの規約上、ベロシティが0の場合はノートオフとして扱われるためベロシティによる判定を加えている。
        """
        if self.value.type == "note_off":
            return True

        if self.value.type != "note_on":
            return False

        if not hasattr(self.value, "velocity"):
            return False

        if self.value.velocity == 0:
            return True

        return False

    def create_queue(self, seek_time: int):
        """
        変換待ちのノートオンメッセージを生成する。
        発声時間（tick）の初期値は0とし、ノートオフメッセージが見つかるまで加算する。
        """
        return NoteOnMessage(self.value.note, seek_time, self.value.velocity, 0)
