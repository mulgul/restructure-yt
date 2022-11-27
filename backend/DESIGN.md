## Routes

### `/audio/metadata?encodedURI`

**Response:**
```
{
    title: string,
    channel: string,
    formats: IFormat[],
    duration: number,
    upload_date: string,
    views: number,
    thumbnail_url: string,
}
```

#### TODO
- [X] Get endpoint working
- [X] Format the audio formatting correctly
- [X] Tests
- [] Benchmarks
- [X] Error Handling
- [] Documentation (Includes examples)

Notes:
- Use `--write-info-json` with `--skip-download` together to get all the metadata, or use `--dump-json` in order to get the metadata without writing to disk. 

### `/audio/download?encodedURI={string}&format={string}&metadata={boolean}`

**Headers:**
```
Headers:
{
    Content-type: audio/*
}
```

**Response:**
```
Audio File.
```

## Process Handling

### `launchExecProcess`

#### TODO
- [X] Promisify Exec, and get it working
- [X] Handle errors with Status Codes
- [X] Should there be error handling cmd attached to call?
- [ ] Add prisma client for postgres
    - [ ] Oauth2 Token should be stored
        - [ ] Gmail
        - [ ] Apple
    Note: Before Oauth2 is in I should really make sure to release the site first, and see what user traffic is like. Accordingly we can move forward with it. 
    - [ ] Tracking of endpoints. See how many downloads
- [ ] NGinx
    - [ ] Reverse Proxy
    - [ ] Rate limit by ip

### `launchSpawnProcess`
- [X] Test and run the code (See if it downloads correctly)
- [X] run it against `/audio/download`

## Middleware

- [X] dynamically take in a set of query params to check instead of just one. 

## USEFUL LINKS

**Audio Formats**
https://gist.github.com/AgentOak/34d47c65b1d28829bb17c24c04a0096f

**
https://forums.bunsenlabs.org/viewtopic.php?id=7637