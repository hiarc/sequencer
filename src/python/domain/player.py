from mido import MidiFile
from domain.ports import Ports
from domain.message import NoteOnMessage
from domain.midi_file import MIDIFile


class Player:
    def __init__(self, messages: list[NoteOnMessage]):
        self.messages: list[NoteOnMessage] = messages

    def play(self, output_port_name: str):
        midi: MidiFile = MIDIFile(self.messages).midi
        port = Ports.open_output_port(output_port_name)

        for message in midi.play():
            port.send(message)
