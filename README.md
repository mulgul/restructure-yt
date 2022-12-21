## Youtube-audio-downloader

A full service client, and server implementation for downloading audio from youtube videos.

## TODO:

### Backend:

- [ ] Change SSH for git from root, to user on EC2
- [ ] Add prisma client for postgres
    - [ ] Oauth2 Token should be stored
        - [ ] Gmail
        - [ ] Apple
    Note: Before Oauth2 is in I should really make sure to release the site first, and see what user traffic is like. Accordingly we can move forward with it. 
    - [ ] Tracking of endpoints. See how many downloads
- [ ] NGinx
    - [ ] Reverse Proxy
    - [ ] Rate limit by ip

### Frontend

- [ ] Create simple frontend template for searching and downloading videos audio
- [ ] Figure out how to generate randomized css id's and classes
