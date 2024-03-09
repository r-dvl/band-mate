from pydantic import ConfigDict, BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator

from typing import Optional, List
from typing_extensions import Annotated

from bson import ObjectId

from datetime import datetime


PyObjectId = Annotated[str, BeforeValidator(str)]  

class Comment(BaseModel):
    user: str
    comment: str
    date_time: datetime   

class BandModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(...)
    photo: str = Field(default="")
    description: str = Field(default="")
    comments: List[Comment] = Field(default=[])
    song_ids: List[str] = Field(default=[])
    user_ids: List[str] = Field(default=[])
    model_config = ConfigDict(
        populate_by_name = True,
        arbitrary_types_allowed = True,
        json_schema_extra = {
            "example": {
                "name": "The Sodawaves",
                "photo": "...",
                "description": "Indie Rock band from Algeciras",
                "comments": [
                    "..."
                ],
                "song_ids": [
                    "65e6d5cb2258227facc570c1",
                    "..."
                ],
                "user_ids": [
                    "65e6d5cb2258227facc570c1",
                    "65e6d5cb2258227facc570c0",
                    "..."
                ]
            }
        },
    )

class UpdateBandModel(BaseModel):
    name: Optional[str] = None
    photo: Optional[str] = None
    description: Optional[str] = None
    comments: Optional[List[Comment]] = None
    song_ids: Optional[List[str]] = None
    user_ids: Optional[List[str]] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders = {ObjectId: str},
        json_schema_extra = {
            "example": {
                "name": "The Sodawaves",
                "photo": "...",
                "description": "Indie Rock band from Algeciras",
                "comments": [
                    "..."
                ],
                "song_ids": [
                    "65e6d5cb2258227facc570c1",
                    "..."
                ],
                "user_ids": [
                    "65e6d5cb2258227facc570c1",
                    "65e6d5cb2258227facc570c0",
                    "..."
                ]
            }
        },
    )


class BandCollection(BaseModel):
    bands: List[BandModel]