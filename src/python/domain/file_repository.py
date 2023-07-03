from abc import ABC, abstractmethod
from tempfile import SpooledTemporaryFile
from mido import MidiFile


class IFileRepository(ABC):
    @abstractmethod
    def upload(self, file: SpooledTemporaryFile, filename: str):
        pass

    @abstractmethod
    def save(self, midi: MidiFile, filename: str):
        pass
