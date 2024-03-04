import uvicorn
from fastapi import FastAPI
from v1.endpoints import songs
from v1.endpoints import tabs


app = FastAPI()

app.include_router(songs.router, prefix="/v1/songs", tags=["songs"])
app.include_router(tabs.router, prefix="/v1/tabs", tags=["tabs"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)