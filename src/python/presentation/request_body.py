from pydantic import BaseModel
import stringcase
from domain.message import NoteOnMessage


class NoteOnMessageModel(BaseModel):
    note_number: int
    started_at: int
    velocity: int
    tick: int

    class Config:
        """属性名の変換
        入力(キャメル)と出力(スネーク)の相互変換をする
        """

        alias_generator = stringcase.camelcase
        allow_population_by_field_name = True

    def toDomain(self):
        return NoteOnMessage(
            self.note_number,
            self.started_at,
            self.velocity,
            self.tick,
        )

    @staticmethod
    def fromDomain(message: NoteOnMessage):
        return NoteOnMessageModel(
            note_number=message.note_number,
            started_at=message.started_at,
            velocity=message.velocity,
            tick=message.tick,
        )


class TrackModel(BaseModel):
    no: int
    name: str
    instrumentId: int
    messages: list[NoteOnMessageModel]

    class Config:
        alias_generator = stringcase.camelcase
        allow_population_by_field_name = True


class PlayRequest(BaseModel):
    messages: list[NoteOnMessageModel]
    port_name: str

    class Config:
        alias_generator = stringcase.camelcase

    def toDomain(self):
        return list(message.toDomain() for message in self.messages)


class SaveRequest(BaseModel):
    messages: list[NoteOnMessageModel]
    filename: str

    class Config:
        alias_generator = stringcase.camelcase

    def toDomain(self):
        return list(message.toDomain() for message in self.messages)
