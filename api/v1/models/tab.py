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
    comment: str = Field(...)
    url: str = Field(...)
    model_config = ConfigDict(
        populate_by_name = True,
        arbitrary_types_allowed = True,
        json_schema_extra = {
            "example": {
                "title": "Lead and Rythm",
                "instrument": "Guitar",
                "comment": "Solo FX is difficult to reproduce",
                "url": "https://tabs.ultimate-guitar.com/tab/arctic-monkeys/d-is-for-dangerous-tabs-536418",
            }
        },
    )

class UpdateTabModel(BaseModel):
    title: Optional[str] = None
    instrument: Optional[str] = None
    comment: Optional[str] = None
    url: Optional[str] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders = {ObjectId: str},
        json_schema_extra = {
            "example": {
                "title": "Lead and Rythm",
                "instrument": "Guitar",
                "comment": "Solo FX is difficult to reproduce",
                "url": "https://tabs.ultimate-guitar.com/tab/arctic-monkeys/d-is-for-dangerous-tabs-536418",
            }
        },
    )


class TabCollection(BaseModel):
    tabs: List[TabModel]