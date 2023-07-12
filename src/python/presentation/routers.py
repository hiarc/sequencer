from fastapi import APIRouter, Body, UploadFile
from fastapi.responses import FileResponse
from presentation.request_body import (
    SaveRequest,
    PlayRequest,
    TrackModel,
    NoteOnMessageModel,
)
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
async def openFile(file: UploadFile) -> list[TrackModel]:
    repository.upload(file.file, file.filename)
    tracks = MIDIFile.file_to_sequencer_model(file.filename)
    return list(TrackModel.fromDomain(track) for track in tracks)


@router.post("/v1.0/player")
async def play(body: PlayRequest = Body()):
    player = Player(body.toDomain())
    player.play(body.port_name)
