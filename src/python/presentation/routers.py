from typing import Annotated
from fastapi import APIRouter, Body
from presentation.parameter import NoteOnMessageParameter
from domain.player import Player
from domain.ports import Ports

router = APIRouter()


@router.get("/v1.0/devices/output")
async def portNames():
    return Ports.get_output_ports()


@router.post("/v1.0/player")
async def play(
    messages: list[NoteOnMessageParameter], portName: Annotated[str, Body()]
):
    player = Player(messages)
    player.play(portName)
