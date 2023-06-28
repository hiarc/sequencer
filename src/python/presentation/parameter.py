from pydantic import BaseModel


class NoteOnMessageParameter(BaseModel):
    noteNumber: int
    startedOn: int
    duration: int
