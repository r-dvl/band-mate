import uvicorn
from fastapi import FastAPI
from v1.endpoints import song


app = FastAPI()

app.include_router(wc.router, prefix="/song", tags=["song"])

if __name__ == "__main__":
    uvicorn.run("api.main:app", host="0.0.0.0", port=8080, reload=True)