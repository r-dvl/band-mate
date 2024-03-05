import os
from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import Response

import motor.motor_asyncio
from pymongo import ReturnDocument

from bson import ObjectId

from v1.models.band import BandModel, UpdateBandModel, BandCollection

client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
db = client.bandanize
bands_collection = db.get_collection("bands")

router = APIRouter()

#### CRUD ####
## Create ##
# Post Band
@router.post(
    "/new/",
    response_description="Add new band",
    response_model = BandModel,
    status_code = status.HTTP_201_CREATED,
    response_model_by_alias=False,
)
async def create_band(band: BandModel = Body(...)):
    new_band = await bands_collection.insert_one(
        band.model_dump(by_alias=True, exclude=["id"])
    )
    created_band = await bands_collection.find_one(
        {"_id": new_band.inserted_id}
    )
    return created_band

## Read ##
# Get All Bands
@router.get(
    "/",
    response_description="List all bands",
    response_model=BandCollection,
    response_model_by_alias=False,
)
async def list_bands():
    return BandCollection(bands=await bands_collection.find().to_list(1000))

# Get Specific Band
@router.get(
    "/{id}",
    response_description="Get a single band",
    response_model=BandModel,
    response_model_by_alias=False,
)
async def show_band(id: str):
    if (
        band := await bands_collection.find_one({"_id": ObjectId(id)})
    ) is not None:
        return band

    raise HTTPException(status_code=404, detail=f"Band {id} not found")

## Update ##
# Update Specific Band
@router.put(
    "/update/{id}",
    response_description="Update a band",
    response_model=BandModel,
    response_model_by_alias=False,
)
async def update_band(id: str, band: UpdateBandModel = Body(...)):
    band = {
        k: v for k, v in band.model_dump(by_alias=True).items() if v is not None
    }

    if len(band) >= 1:
        update_result = await bands_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": band},
            return_document=ReturnDocument.AFTER,
        )
        if update_result is not None:
            return update_result
        else:
            raise HTTPException(status_code=404, detail=f"Band {id} not found")

    # The update is empty, but we should still return the matching document:S
    if (existing_band := await bands_collection.find_one({"_id": id})) is not None:
        return existing_band

    raise HTTPException(status_code=404, detail=f"Band {id} not found")

## Delete ##
# Delete Specific Band
@router.delete("/{id}", response_description="Delete a band")
async def delete_band(id: str):
    delete_result = await bands_collection.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Band {id} not found")