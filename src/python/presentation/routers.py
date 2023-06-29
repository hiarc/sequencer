from fastapi import APIRouter
from presentation.parameter import NoteOnMessageParameter
from domain.player import Player

router = APIRouter()


@router.post("/v1.0/player")
async def play(messages: list[NoteOnMessageParameter]):
    player = Player(messages)
    player.play()
