import os
from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import Response

import motor.motor_asyncio
from pymongo import ReturnDocument

from bson import ObjectId

from v1.models.tab import TabModel, UpdateTabModel, TabCollection

client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
db = client.bandanize
tabs_collection = db.get_collection("tabs")

router = APIRouter()

#### CRUD ####
## Create ##
# Post Tab
@router.post(
    "/new/",
    response_description="Add new Tab",
    response_model = TabModel,
    status_code = status.HTTP_201_CREATED,
    response_model_by_alias=False,
)
async def create_tab(tab: TabModel = Body(...)):
    new_tab = await tabs_collection.insert_one(
        tab.model_dump(by_alias=True, exclude=["id"])
    )
    created_tab = await tabs_collection.find_one(
        {"_id": new_tab.inserted_id}
    )
    return created_tab

## Read ##
# Get All Tabs
@router.get(
    "/",
    response_description="List all Tabs",
    response_model=TabCollection,
    response_model_by_alias=False,
)
async def list_tabs():
    return TabCollection(tabs=await tabs_collection.find().to_list(1000))

# Get Specific tab
@router.get(
    "/{id}",
    response_description="Get a single Tab",
    response_model=TabModel,
    response_model_by_alias=False,
)
async def show_tab(id: str):
    if (
        tab := await tabs_collection.find_one({"_id": ObjectId(id)})
    ) is not None:
        return tab

    raise HTTPException(status_code=404, detail=f"Tab {id} not found")

## Update ##
# Update Specific Tab
@router.put(
    "/update/{id}",
    response_description="Update a Tab",
    response_model=TabModel,
    response_model_by_alias=False,
)
async def update_tab(id: str, tab: UpdateTabModel = Body(...)):
    tab = {
        k: v for k, v in tab.model_dump(by_alias=True).items() if v is not None
    }

    if len(tab) >= 1:
        update_result = await tabs_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": tab},
            return_document=ReturnDocument.AFTER,
        )
        if update_result is not None:
            return update_result
        else:
            raise HTTPException(status_code=404, detail=f"Tab {id} not found")

    # The update is empty, but we should still return the matching document:S
    if (existing_tab := await tabs_collection.find_one({"_id": id})) is not None:
        return existing_tab

    raise HTTPException(status_code=404, detail=f"Tab {id} not found")

## Delete ##
# Delete Specific Tab
@router.delete("/{id}", response_description="Delete a Tab")
async def delete_tab(id: str):
    delete_result = await tabs_collection.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Tab {id} not found")