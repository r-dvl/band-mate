from pydantic import ConfigDict, BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator

from typing import Optional, List
from typing_extensions import Annotated

from bson import ObjectId


PyObjectId = Annotated[str, BeforeValidator(str)]

class UserModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    username: str = Field(...)
    full_name: str = Field(...)
    email: str = Field(...)
    city: str = Field(default="")
    hashed_password: str = Field(default="")
    rrss: List[str] = Field(Field(default=[]))
    disabled: bool = Field(default=True)
    photo: str = Field(default="")
    band_ids: List[str] = Field(default=[])
    model_config = ConfigDict(
        populate_by_name = True,
        arbitrary_types_allowed = True,
        json_schema_extra = {
            "example": {
                "username": "lizard_king",
                "full_name": "Jim Morrison",
                "email": "li.king@thedoors.com",
                "city": "Heaven",
                "hashed_password": "latuyaporsiacaso",
                "rrss": [
                    "..."
                ],
                "disabled": False,
                "photo": "",
                "band_ids": [
                    "..."
                ]
            }
        },
    )

class CreateUser(UserModel):
    password: str

class UpdateUserModel(BaseModel):
    username: Optional[str] = None
    full_name: Optional[str] = None
    email: Optional[str] = None
    city: Optional[str] = None
    hashed_password: Optional[List[str]] = None
    rrss: Optional[List[str]] = None
    photo: Optional[str] = None
    band_ids: Optional[List[str]] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders = {ObjectId: str},
        json_schema_extra = {
            "example": {
                "username": "lizard_king",
                "full_name": "Jim Morrison",
                "email": "li.king@thedoors.com",
                "city": "Heaven",
                "hashed_password": "latuyaporsiacaso",
                "rrss": [
                    "..."
                ],
                "disabled": False,
                "photo": "",
                "band_ids": [
                    "..."
                ]
            }
        },
    )

class UserCollection(BaseModel):
    users: List[UserModel]