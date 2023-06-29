from abc import ABC


class Message(ABC):
    pass


class ChannelMessage(Message):
    pass


class ChannelVoiceMessage(ChannelMessage):
    pass
