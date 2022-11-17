## Routes

### `/audio/metadata?encodedURI`

**Response:**
```
{
    title: string,
    channel: string,
    formats: string[],
    duration: number,
    upload_date: string,
    views: number,
    thumbnail_url: string,
}
```

Notes:
- Use `--write-info-json` with `--skip-download` together to get all the metadata, or use `--dump-json` in order to get the metadata without writing to disk. 

### `/audio?encodedURI`

**Response:**
```

```

## USEFUL LINKS

**Audio Formats**
https://gist.github.com/AgentOak/34d47c65b1d28829bb17c24c04a0096f

**
https://forums.bunsenlabs.org/viewtopic.php?id=7637