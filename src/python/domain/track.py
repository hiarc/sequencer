import copy
from mido import MidiTrack
from domain.message import NoteOnMessage
from domain.message import IChannelVoiceMessage


class Track:
    @staticmethod
    def system_track():
        sys_track = MidiTrack()
        sys_track.name = "System Track"
        return sys_track

    @staticmethod
    def instrument_track(name: str, messages: list[NoteOnMessage]):
        track = MidiTrack()
        track.name = name

        # シーケンサーの入力内容をMIDIノートオン、及びノートオフメッセージに変換する。
        # TODO: シーケンサーからノートオンメッセージに変換するコアドメインのため、ユニットテスト化してメンテナンス性を保つ
        seek_time: int = 0
        queue_messages: list[IChannelVoiceMessage] = copy.deepcopy(messages)
        queue_messages.sort(key=lambda queue: queue.started_at)

        while len(queue_messages) > 0:
            queue = queue_messages.pop(0)

            fixed_message = queue.toMidoChannelVoiceMessage(seek_time)
            track.append(fixed_message)

            seek_time = queue.started_at

            if type(queue) is NoteOnMessage:
                paired_note_off = queue.toNoteOffMessage()
                queue_messages.append(paired_note_off)
                queue_messages.sort(key=lambda queue: queue.started_at)

        return track
