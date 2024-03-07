# Bandanize
Stop using the Whatsapp group description to organize your repertory.


## Table of Contents

1. [API](#API)
2. [DB](#DB)
3. [UI](#UI)


## 1. API
Built with Python 3.10 and FastAPI and Docker.


### Endpoints
---
#### Auth
Work in progress...


#### Bands
Work in progress...


#### Playlists
Work in progress...


#### Songs
Work in progress...


#### Tabs
Work in progress...


## 2. DB
MongoDB.


### Models
---
#### Entity Relations
```mermaid
erDiagram
    BAND ||--|{ PLAYLIST : Contains
    BAND ||--|{ USER : Contains
    PLAYLIST ||--|{ SONG : Contains
    SONG ||--o{ TAB : Contains
    BAND {
	    string id
	    string name
	    string photo
	    string description
	    array[string] song_ids
	    array[string] user_ids
    }
    USER {
	    string id
	    string username
	    string full_name
	    string email
	    string hashed_password
	    bool disabled
	    string photo
	    array[string] band_ids
	}
    PLAYLIST {
		string id
	    string title
	    string description
	    string band_id
	    array[string] song_ids
    }
    SONG {
		string id
	    string title
	    string band
	    string comment
	    array[string] band_ids
	    array[string] tab_ids
    }
    TAB {
	    string id
	    string title
	    string instrument
	    string comment
	    string tuning
	    string tab
	    array[string] song_id
    }
```


## 3. UI
Built with React Native and Docker.


### Screens
---
Work in progress...


### Components
---
Work in progress...

