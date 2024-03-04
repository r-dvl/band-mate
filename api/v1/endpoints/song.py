import os
from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import Response

import motor.motor_asyncio
from pymongo import ReturnDocument

from bson import ObjectId

from v1.models.song import SongModel, UpdateSongModel, SongCollection


client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
db = client.mekgo
songs_collection = db.get_collection("songs")

router = APIRouter()

#### CRUD ####
## Create ##
# Post Song
@router.post(
    "/new/",
    response_description="Add new song",
    response_model = SongModel,
    status_code = status.HTTP_201_CREATED,
    response_model_by_alias=False,
)
async def create_song(song: SongModel = Body(...)):
    new_song = await songs_collection.insert_one(
        song.model_dump(by_alias=True, exclude=["id"])
    )
    created_song = await songs_collection.find_one(
        {"_id": new_song.inserted_id}
    )
    return created_song

## Read ##
# Get All Songs
@router.get(
    "/",
    response_description="List all songs",
    response_model=SongCollection,
    response_model_by_alias=False,
)
async def list_songs():
    return SongCollection(songs=await songs_collection.find().to_list(1000))

# Get Specific Song
@router.get(
    "/{id}",
    response_description="Get a single song",
    response_model=SongModel,
    response_model_by_alias=False,
)
async def show_song(id: str):
    if (
        song := await songs_collection.find_one({"_id": ObjectId(id)})
    ) is not None:
        return song

    raise HTTPException(status_code=404, detail=f"Song {id} not found")

## Update ##
# Update Specific Song
@router.put(
    "/update/{id}",
    response_description="Update a song",
    response_model=SongModel,
    response_model_by_alias=False,
)
async def update_song(id: str, song: UpdateSongModel = Body(...)):
    song = {
        k: v for k, v in song.model_dump(by_alias=True).items() if v is not None
    }

    if len(song) >= 1:
        update_result = await songs_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": song},
            return_document=ReturnDocument.AFTER,
        )
        if update_result is not None:
            return update_result
        else:
            raise HTTPException(status_code=404, detail=f"Song {id} not found")

    # The update is empty, but we should still return the matching document:S
    if (existing_song := await songs_collection.find_one({"_id": id})) is not None:
        return existing_song

    raise HTTPException(status_code=404, detail=f"Song {id} not found")

## Delete ##
# Delete Specific Song
@router.delete("/{id}", response_description="Delete a song")
async def delete_song(id: str):
    delete_result = await songs_collection.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Song {id} not found")