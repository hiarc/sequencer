import copy
from mido import MidiTrack, Message
from domain.message import IChannelVoiceMessage, NoteOnMessage
from domain.message import IMessage
from domain.message import MidoHelper
from logging import getLogger

logger = getLogger(__name__)


class MidoTrackHelper:
    @staticmethod
    def mido_system_track():
        sys_track = MidiTrack()
        sys_track.name = "System Track"
        return sys_track

    @staticmethod
    def mido_instrument_track(name: str, messages: list[NoteOnMessage]):
        mido_track = MidiTrack()
        mido_track.name = name

        # シーケンサーの入力内容をMIDIノートオン、及びノートオフメッセージに変換する。
        # TODO: シーケンサーからノートオンメッセージに変換するコアドメインのため、ユニットテスト化してメンテナンス性を保つ
        seek_time = 0
        queues = QueueMessage(copy.deepcopy(messages))
        queues.sort_by_started_at()

        while queues.size() > 0:
            queue = queues.pop(0)

            mido_message = queue.toMidoChannelVoiceMessage(seek_time)
            mido_track.append(mido_message)

            seek_time = queue.started_at

            if type(queue) is NoteOnMessage:
                paired_note_off = queue.toNoteOffMessage()
                queues.append(paired_note_off)
                queues.sort_by_started_at()

        return mido_track

    @staticmethod
    def to_sequencer_messages(mido_track: MidiTrack[Message]):
        seek_time = 0
        mido_messages = copy.deepcopy(mido_track)
        queues = QueueMessage([])
        sequencer_messages = []

        for mido_message in mido_messages:
            seek_time += mido_message.time

            if hasattr(mido_message, "time"):
                queues.add_tick_all(mido_message.time)

            if MidoHelper.is_mido_note_on_message(mido_message):
                note_on = NoteOnMessage(mido_message.note, seek_time, 0)
                queues.append(note_on)

            if MidoHelper.is_mido_note_off_message(mido_message):
                note_on = queues.find_same_note_number(mido_message.note)
                if note_on == None:
                    continue

                queues.remove(note_on)
                sequencer_messages.append(note_on)

        return sequencer_messages


class QueueMessage:
    """変換待ちのシーケンサーMessageを扱うリスト。"""

    def __init__(self, queues: list):
        self.queues = queues

    def size(self):
        return len(self.queues)

    def append(self, queue):
        self.queues.append(queue)

    def pop(self, idx: int):
        return self.queues.pop(idx)

    def remove(self, queue):
        self.queues.remove(queue)

    def sort_by_started_at(self):
        self.queues.sort(key=lambda queue: queue.started_at)

    def add_tick_all(self, tick: int):
        list(queue.add_tick(tick) for queue in self.queues)

    def find_same_note_number(self, note_number: int):
        note_on = next(
            (queue for queue in self.queues if queue.note_number == note_number),
            None,
        )
        if note_on is None:
            logger.warning(
                "Paired NoteOnMessage is not found. note_number=" + note_number
            )
        return note_on
