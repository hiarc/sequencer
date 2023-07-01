from pydantic import BaseModel
import stringcase
from domain.message import NoteOnMessage


class NoteOnMessageRequest(BaseModel):
    note_number: int
    started_at: int
    tick: int

    class Config:
        alias_generator = stringcase.camelcase

    def toDomain(self):
        return NoteOnMessage(
            self.note_number,
            self.started_at,
            self.tick,
        )


class PlayRequest(BaseModel):
    messages: list[NoteOnMessageRequest]
    port_name: str

    class Config:
        alias_generator = stringcase.camelcase

    def message(self):
        return list(message.toDomain() for message in self.messages)
