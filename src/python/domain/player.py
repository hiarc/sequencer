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

    def play(self):
        devices = mido.get_output_names()
        print("Available Ports: " + ",".join(devices))
        outport = mido.open_output("IACDriver BUS1")

        for message in self._messages:
            outport.send(message.toMIDIMessage())
