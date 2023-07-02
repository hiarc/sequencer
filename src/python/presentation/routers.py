from fastapi import APIRouter, Body, UploadFile
from presentation.request_body import PlayRequest, NoteOnMessageRequest
from domain.player import Player
from domain.ports import Ports
from domain.midi_file import MIDIFile
from repository.file_repository import FileRepository

router = APIRouter()
repository = FileRepository()


@router.get("/v1.0/devices/output")
async def port_names():
    return Ports.get_output_ports()


@router.post("/v1.0/upload")
async def openFile(file: UploadFile) -> list[NoteOnMessageRequest]:
    repository.save(file.file, file.filename)
    messages = MIDIFile.file_to_obj(file.filename)
    # TODO: 曲のメタ情報（テンポ）やトラック情報を返す
    # TODO: マルチトラックに対応する
    return list(NoteOnMessageRequest.fromDomain(message) for message in messages)


@router.post("/v1.0/player")
async def play(body: PlayRequest = Body()):
    player = Player(body.message())
    player.play(body.port_name)
