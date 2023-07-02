import shutil
from tempfile import SpooledTemporaryFile
from domain.file_repository import IFileRepository


class FileRepository(IFileRepository):
    def save(self, file: SpooledTemporaryFile, filename: str):
        with open(filename, mode="bw") as dist:
            shutil.copyfileobj(file, dist)
