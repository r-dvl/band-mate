import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from v1.endpoints import bands, songs, tabs, auth, playlists


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/v1/auth", tags=["auth"])
app.include_router(bands.router, prefix="/v1/bands", tags=["bands"])
app.include_router(playlists.router, prefix="/v1/playlists", tags=["playlists"])
app.include_router(songs.router, prefix="/v1/songs", tags=["songs"])
app.include_router(tabs.router, prefix="/v1/tabs", tags=["tabs"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)