from abc import ABC, abstractmethod


class Message(ABC):
    pass


class ChannelMessage(Message):
    pass


class ChannelVoiceMessage(ChannelMessage):
    @abstractmethod
    def toMIDIMessage(self, seek_time: int):
        pass
