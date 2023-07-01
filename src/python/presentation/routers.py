from fastapi import APIRouter, Body, UploadFile
from presentation.request_body import PlayRequest
from domain.player import Player
from domain.ports import Ports

router = APIRouter()


@router.get("/v1.0/devices/output")
async def port_names():
    return Ports.get_output_ports()


@router.post("/v1.0/upload")
async def openFile(file: UploadFile):
    print(type(file))
    print(file)


@router.post("/v1.0/player")
async def play(body: PlayRequest = Body()):
    player = Player(body.message())
    player.play(body.port_name)
