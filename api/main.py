import uvicorn
from fastapi import FastAPI
from v1.endpoints import songs


app = FastAPI()

app.include_router(songs.router, prefix="/songs", tags=["songs"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)