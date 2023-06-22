from fastapi import FastAPI
from pydantic import BaseModel

class Track(BaseModel):
  no: int
  name: str
  instrumentId: int
  sequenseId: int

app = FastAPI()

@app.post("/v1.0/tracks")
async def createTrack(track: Track):
  return track