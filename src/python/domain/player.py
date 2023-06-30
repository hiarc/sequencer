import copy
import mido
from presentation.parameter import NoteOnMessageParameter
from domain.message.channel.voice.note_on import NoteOnMessage

from mido import Message, MidiFile, MidiTrack
from domain.message.channel.voice.note_off import NoteOffMessage
from domain.message.interface import ChannelVoiceMessage


class Player:
    def __init__(self, messages: list[NoteOnMessageParameter]):
        self._messages: list[NoteOnMessage] = []

        for message in messages:
            self._messages.append(
                NoteOnMessage(message.noteNumber, message.startedOn, message.duration)
            )

    def play(self, output_name: str):
        # シーケンサーの入力内容をMIDIノートオン、及びノートオフメッセージに変換する。
        # TODO: メッセージ生成のコアロジックのため、個別ドメインに移動する
        # TODO: 同様の理由でユニットテスト化してメンテナンス性を保つ
        seek_time: int = 0
        queue_messages: list[ChannelVoiceMessage] = copy.deepcopy(self._messages)
        queue_messages.sort(key=lambda queue: queue._started_on)
        fixed_messages: list[Message] = []

        while len(queue_messages) > 0:
            queue = queue_messages.pop(0)

            fixed_message = queue.toMIDIMessage(seek_time)
            fixed_messages.append(fixed_message)

            # TODO: 後でPrivateからPublicにする。Pythonはカプセル化を推奨していないため
            seek_time = queue._started_on

            if type(queue) is NoteOnMessage:
                paired_note_off = queue.toNoteOffMessage()
                queue_messages.append(paired_note_off)
                queue_messages.sort(key=lambda queue: queue._started_on)

        # トラックの生成
        # TODO: ドメインに移動する
        sys_track = MidiTrack()
        sys_track.name = "System Track"

        # TODO: マルチトラック化する
        track0 = MidiTrack()
        track0.name = "Track 0"

        for message in fixed_messages:
            track0.append(message)

        # 再生用の一時ファイルを生成する
        midi = MidiFile(type=1)
        midi.tracks.append(sys_track)
        midi.tracks.append(track0)

        # 出力ポートの取得
        # TODO: 例外処理
        outport = mido.open_output(output_name)

        # 再生
        for msg in midi.play():
            outport.send(msg)
