## Youtube-audio-downloader

This is a full service REST api, and UI used for downloading audio files from youtube videos. 

## Requirements

### General

This repository uses `yarn berry`, which means you need both `npm` and `yarn` downloaded locally. If you use nvm for managing your node enviornment then you will have `npm`, and just need to download `yarn` 1.X.X. For more info refer [here](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).

### Backend

- Node.js >= v14.X.X

**Note**: For the following packages below, you may run `sh ./backend/install.sh`. The script supports macOS, and Ubunutu. For Mac's it will use `brew`, and for Ubunutu `apt`. 
- ffmpeg
- yt-dlp

## Running the Backend

1. `cd backend`
2. `yarn install`
3. `export LOG_LEVEL=http`
4. `yarn build && yarn main` or `yarn dev` for development mode.

## Running the Frontend

1. `cd frontend`
2. `yarn install`
3. `yarn build && yarn start`

## TODO:

### General

- [ ] License on each file, and main page.

### Backend:

- [ ] Clean up static downtime route.
- [ ] DOTENV for local env file.
- [ ] Ship the backend as an npm package.

### Frontend

- [ ] CSS
    - [ ] Loading template for format Cards
    - [X] Format Cards
        - [ ] Expanding format cards
    - [X] Header
    - [ ] Footer
