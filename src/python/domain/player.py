from mido import MidiFile
from presentation.parameter import NoteOnMessageParameter
from domain.ports import Ports
from domain.message import NoteOnMessage
from domain.midi_file import MIDIFile


class Player:
    def __init__(self, messages: list[NoteOnMessageParameter]):
        self._messages: list[NoteOnMessage] = []

        for message in messages:
            self._messages.append(
                NoteOnMessage(message.noteNumber, message.startedOn, message.duration)
            )

    def play(self, output_port_name: str):
        midi: MidiFile = MIDIFile(self._messages).midi
        port = Ports.open_output_port(output_port_name)

        for message in midi.play():
            port.send(message)
