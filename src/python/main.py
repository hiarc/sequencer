from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from presentation.parameter import NoteOnMessageParameter


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/v1.0/player")
async def createTrack(messages: list[NoteOnMessageParameter]):
    for message in messages:
        print(message)
