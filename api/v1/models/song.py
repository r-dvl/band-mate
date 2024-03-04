from pydantic import ConfigDict, BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator

from typing import Optional, List
from typing_extensions import Annotated

from bson import ObjectId

from v1.models.tab import TabModel

PyObjectId = Annotated[str, BeforeValidator(str)]    

class SongModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str = Field(...)
    band: str = Field(...)
    comment: str = Field(...)
    tabs: List[TabModel]
    model_config = ConfigDict(
        populate_by_name = True,
        arbitrary_types_allowed = True,
        json_schema_extra = {
            "example": {
                "title": "D is for Dangerous",
                "band": "Arctic Monkeys",
                "comment": "Nice to end a live show.",
                "tabs": [
                    {
                        "title": "Lead and Rythm",
                        "instrument": "Guitar",
                        "comment": "Solo FX is difficult to reproduce",
                        "url": "https://tabs.ultimate-guitar.com/tab/arctic-monkeys/d-is-for-dangerous-tabs-536418"
                    },
                    {
                        "title": "Bassline",
                        "instrument": "Bass",
                        "comment": "Love this one",
                        "url": "https://tabs.ultimate-guitar.com/tab/arctic-monkeys/d-is-for-dangerous-bass-532894"
                    },
                ]
            }
        },
    )

class UpdateSongModel(BaseModel):
    title: Optional[str] = None
    band: Optional[str] = None
    comment: Optional[str] = None
    tabs: Optional[List[TabModel]] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders = {ObjectId: str},
        json_schema_extra = {
            "example": {
                "title": "D is for Dangerous",
                "band": "Arctic Monkeys",
                "comment": "Nice to end a live show.",
                "tabs": [
                    {
                        "title": "Lead and Rythm",
                        "instrument": "Guitar",
                        "comment": "Solo FX is difficult to reproduce",
                        "url": "https://tabs.ultimate-guitar.com/tab/arctic-monkeys/d-is-for-dangerous-tabs-536418"
                    },
                    {
                        "title": "Bassline",
                        "instrument": "Bass",
                        "comment": "Love this one",
                        "url": "https://tabs.ultimate-guitar.com/tab/arctic-monkeys/d-is-for-dangerous-bass-532894"
                    },
                ]
            }
        },
    )


class SongCollection(BaseModel):
    songs: List[SongModel]