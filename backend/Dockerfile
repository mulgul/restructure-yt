FROM node:lts-alpine3.17 as builder

WORKDIR /opt/builder

COPY . .

RUN yarn install && \
    yarn build

# ---------------------------------

FROM node:lts-alpine3.17

RUN apk update && apk upgrade
RUN apk add --no-cache \
    ffmpeg \
    yt-dlp

WORKDIR /usr/src/app

COPY --from=builder /opt/builder /usr/src/app

ENV PORT=8080

USER node
EXPOSE ${PORT}
CMD ["node", "build/main.js"]
