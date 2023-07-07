from fastapi import APIRouter, Body, UploadFile
from fastapi.responses import FileResponse
from presentation.request_body import SaveRequest, PlayRequest, NoteOnMessageModel
from domain.player import Player
from domain.ports import Ports
from domain.midi_file import MIDIFile
from repository.file_repository import FileRepository

router = APIRouter()
repository = FileRepository()


@router.get("/v1.0/devices/output")
async def port_names():
    return Ports.get_output_ports()


@router.post("/v1.0/save")
async def save(body: SaveRequest = Body()):
    midi = MIDIFile(body.toDomain()).midi
    repository.save(midi, body.filename)
    return FileResponse(body.filename)


@router.post("/v1.0/upload")
async def openFile(file: UploadFile) -> list[NoteOnMessageModel]:
    repository.upload(file.file, file.filename)
    messages = MIDIFile.file_to_obj(file.filename)
    return list(NoteOnMessageModel.fromDomain(message) for message in messages)


@router.post("/v1.0/player")
async def play(body: PlayRequest = Body()):
    player = Player(body.toDomain())
    player.play(body.port_name)
