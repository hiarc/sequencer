import copy
from mido import MidiTrack, Message
from domain.message import IChannelVoiceMessage, NoteOnMessage
from domain.message import IMessage


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

    @staticmethod
    def to_messages(track: MidiTrack[Message]):
        current_time: int = 0
        messages = copy.deepcopy(track)
        queue_messages: list[IMessage] = []
        fixed_messages: list[IMessage] = []

        for message in messages:
            current_time += message.time

            if (
                message.type == "note_on"
                and hasattr(message, "velocity")
                and message.velocity != 0
            ):
                note_on = NoteOnMessage(message.note, current_time, 0)
                list(queue.add_tick(message.time) for queue in queue_messages)
                queue_messages.append(note_on)

            if (
                message.type == "note_off"
                or message.type == "note_on"
                and hasattr(message, "velocity")
                and message.velocity == 0
            ):
                note_on = next(
                    (
                        note
                        for note in queue_messages
                        if note.note_number == message.note
                    ),
                    None,
                )
                if note_on is None:
                    raise RuntimeError(
                        "Paired NoteOnMessage is not found. note_number="
                        + message.note_number
                    )
                queue_messages.remove(note_on)
                note_on.add_tick(message.time)
                fixed_messages.append(note_on)

        return fixed_messages
