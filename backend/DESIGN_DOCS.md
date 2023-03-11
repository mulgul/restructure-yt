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

### `/audio/download/event?encodedURI={string}&formatId={string}&title={string}&ext={string}`

Summary: This will open up an event stream to download a specific videos audio. It will not return the download file once completed. You must make a request
using `/audio/download/retrieve` once the status is `completed`.

```
Headers:
{
    Content-Type': 'text/event-stream',
	Connection: 'keep-alive',
	Cache-Control': 'no-cache',
}
```

```
{
    status: 'downloaded' || 'completed',
    percent: string,
    eta: string,
}
```

### `/audio/download/retrieve?title={string}&ext={string}`

Summary: This requires the file to be downloaded already via: `/audio/download/event`.

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

## USEFUL LINKS

**Audio Formats**
https://gist.github.com/AgentOak/34d47c65b1d28829bb17c24c04a0096f

https://forums.bunsenlabs.org/viewtopic.php?id=7637

### `/audio/download?encodedURI={string}&format={string}&title={string}&ext={string}`

Summary: This will download the audio file from scratch and send the file.

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
