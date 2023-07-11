from mido import MidiFile
from domain.ports import Ports
from domain.message import NoteOnMessage
from domain.midi_file import MIDIFile
from domain.track import Track


class Player:
    def __init__(self, tracks: list[Track]):
        self.tracks: list[Track] = tracks

    def play(self, output_port_name: str):
        midi: MidiFile = MIDIFile(self.tracks).midi
        port = Ports.open_output_port(output_port_name)

        for message in midi.play():
            port.send(message)
