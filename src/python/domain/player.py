import mido
from presentation.parameter import NoteOnMessageParameter
from domain.message.channel.voice.note_on import NoteOnMessage


class Player:
    def __init__(self, messages: list[NoteOnMessageParameter]):
        self._messages: list[NoteOnMessageParameter] = []

        for message in messages:
            self._messages.append(
                NoteOnMessage(message.noteNumber, message.startedOn, message.duration)
            )

    def play(self, output_name: str):
        # TODO: 例外処理
        outport = mido.open_output(output_name)

        for message in self._messages:
            outport.send(message.toMIDIMessage())
