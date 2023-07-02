from abc import ABC, abstractmethod
from tempfile import SpooledTemporaryFile


class IFileRepository(ABC):
    @abstractmethod
    def save(self, file: SpooledTemporaryFile, filename: str):
        pass
