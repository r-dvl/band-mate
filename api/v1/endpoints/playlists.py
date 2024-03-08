import os
from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import Response

import motor.motor_asyncio
from pymongo import ReturnDocument

from bson import ObjectId

from v1.models.playlist import PlaylistModel, UpdatePlaylistModel, PlaylistCollection

client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
db = client.bandanize
playlists_collection = db.get_collection("playlists")

router = APIRouter()

#### CRUD ####
## Create ##
# Post Playlist
@router.post(
    "/new/",
    response_description="Add new playlist",
    response_model = PlaylistModel,
    status_code = status.HTTP_201_CREATED,
    response_model_by_alias=False,
)
async def create_playlist(playlist: PlaylistModel = Body(...)):
    new_playlist = await playlists_collection.insert_one(
        playlist.model_dump(by_alias=True, exclude=["id"])
    )
    created_playlist = await playlists_collection.find_one(
        {"_id": new_playlist.inserted_id}
    )
    return created_playlist

## Read ##
# Get All Playlists
@router.get(
    "/",
    response_description="List all playlists",
    response_model=PlaylistCollection,
    response_model_by_alias=False,
)
async def list_playlists():
    return PlaylistCollection(playlists=await playlists_collection.find().to_list(1000))

# Get Specific Playlist
@router.get(
    "/{id}",
    response_description="Get a single playlist",
    response_model=PlaylistModel,
    response_model_by_alias=False,
)
async def show_playlist(id: str):
    if (
        playlist := await playlists_collection.find_one({"_id": ObjectId(id)})
    ) is not None:
        return playlist

    raise HTTPException(status_code=404, detail=f"Playlist {id} not found")

## Update ##
# Update Specific Playlist
@router.put(
    "/update/{id}",
    response_description="Update a playlist",
    response_model=PlaylistModel,
    response_model_by_alias=False,
)
async def update_playlist(id: str, playlist: UpdatePlaylistModel = Body(...)):
    playlist = {
        k: v for k, v in playlist.model_dump(by_alias=True).items() if v is not None
    }

    if len(playlist) >= 1:
        update_result = await playlists_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": playlist},
            return_document=ReturnDocument.AFTER,
        )
        if update_result is not None:
            return update_result
        else:
            raise HTTPException(status_code=404, detail=f"Playlist {id} not found")

    # The update is empty, but we should still return the matching document:S
    if (existing_playlist := await playlists_collection.find_one({"_id": id})) is not None:
        return existing_playlist

    raise HTTPException(status_code=404, detail=f"Playlist {id} not found")

## Delete ##
# Delete Specific Playlist
@router.delete("/{id}", response_description="Delete a playlist")
async def delete_playlist(id: str):
    delete_result = await playlists_collection.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Playlist {id} not found")