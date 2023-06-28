from fastapi import APIRouter
from presentation.parameter import NoteOnMessageParameter

router = APIRouter()


@router.post("/v1.0/player")
async def createTrack(messages: list[NoteOnMessageParameter]):
    for message in messages:
        print(message)
