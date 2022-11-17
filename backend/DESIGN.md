## Routes

### `/audio/metadata?encodedURI`

**Response:**
```
{
    title: string,
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
