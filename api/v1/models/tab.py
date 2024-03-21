from pydantic import ConfigDict, BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator

from typing import Optional, List
from typing_extensions import Annotated

from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]

class TabModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str = Field(...)
    instrument: str = Field(...)
    tuning: str = Field(default="Standard")
    data: str = Field(default="")
    song_id: str = Field(default=[])
    model_config = ConfigDict(
        populate_by_name = True,
        arbitrary_types_allowed = True,
        json_schema_extra = {
            "example": {
                "title": "Lead and Rythm",
                "instrument": "Guitar",
                "tuning": "Standard",
                "data": "...",
                "song_id": "60a4b5c0f0a4c9f1d4e7d6b1"
            }
        },
    )

class UpdateTabModel(BaseModel):
    title: Optional[str] = None
    instrument: Optional[str] = None
    tuning: Optional[str] = None
    data: Optional[str] = None
    song_id: Optional[str] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders = {ObjectId: str},
        json_schema_extra = {
            "example": {
                "title": "Lead and Rythm",
                "instrument": "Guitar",
                "tuning": "Standard",
                "data": "...",
                "song_id": "60a4b5c0f0a4c9f1d4e7d6b1"
            }
        },
    )


class TabCollection(BaseModel):
    tabs: List[TabModel]