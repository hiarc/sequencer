import shutil
from tempfile import SpooledTemporaryFile
from mido import MidiFile
from domain.file_repository import IFileRepository


class FileRepository(IFileRepository):
    def upload(self, file: SpooledTemporaryFile, filename: str):
        with open(filename, mode="bw") as dist:
            shutil.copyfileobj(file, dist)

    def save(self, midi: MidiFile, filename: str):
        midi.save(filename=filename)
