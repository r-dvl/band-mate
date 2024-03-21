# Bandanize
Stop using the Whatsapp group description to organize your repertory.


## Table of Contents

1. [API](#API)
2. [DB](#DB)
3. [UI](#UI)


## API
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


## DB
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
	    string genre
	    string city
		array[string] members
	    array[string] rrss
	    array[string] song_ids
	    array[string] user_ids
    }
    USER {
	    string id
	    string username
	    string full_name
	    string email
		string city
		array[string] rrss
	    string hashed_password
	    bool disabled
	    string photo
	    array[string] band_ids
    }
    PLAYLIST {
	    string id
	    string title
	    string description
	    string photo
	    string band_id
	    array[string] song_ids
    }
    SONG {
	    string id
	    string title
	    string band
	    string bpm
	    string key
	    array[string] media
 	    array[string] band_ids
	    array[string] tab_ids
    }
    TAB {
	    string id
	    string title
	    string instrument
	    string tuning
	    string tab
	    string song_id
    }
```


## UI
Built with React Native and Docker.


### Screens
---
Work in progress...


### Components
---
Work in progress...

