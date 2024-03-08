from pydantic import ConfigDict, BaseModel, Field
from pydantic.functional_validators import BeforeValidator

from typing import Optional, List
from typing_extensions import Annotated

from bson import ObjectId


PyObjectId = Annotated[str, BeforeValidator(str)]    

class PlaylistModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str = Field(...)
    description: str = Field(default="")
    band_id: str = Field(...)
    song_ids: List[str] = Field(default=[])
    model_config = ConfigDict(
        populate_by_name = True,
        arbitrary_types_allowed = True,
        json_schema_extra = {
            "example": {
                "title": "Farandula 2024",
                "description": "Live playlist.",
                "band_id": "60a4b5c8f0a4c9f1d4e7d6b2",
                "song_ids": [
                    "60a4b5c8f0a4c9f1d4e7d6b2",
                    "60a4b5d0f0a4c9f1d4e7d6b3"
                ]
            }
        },
    )

class UpdatePlaylistModel(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    band_id: Optional[str] = None
    song_ids: Optional[List[str]] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders = {ObjectId: str},
        json_schema_extra = {
            "example": {
                "title": "Farandula 2024",
                "description": "Live playlist.",
                "band_id": "60a4b5c8f0a4c9f1d4e7d6b2",
                "song_ids": [
                    "60a4b5c8f0a4c9f1d4e7d6b2",
                    "60a4b5d0f0a4c9f1d4e7d6b3"
                ]
            }
        },
    )


class PlaylistCollection(BaseModel):
    playlists: List[PlaylistModel]