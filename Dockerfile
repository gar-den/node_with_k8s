# docker build .

FROM node:16.3.0-alpine

# bash install
RUN apk add bash

# language
ENV LANG = ko_KR.UTF-8 \
    LANGUAGE = ko_KR.UTF-8

# timezone
RUN apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    echo 'Asia/Seoul' > /etc/timezone

# create directory for the container
WORKDIR /server

# copy package.json and install packages
COPY ["package.json", "yarn.lock", "./"]

RUN npm install -g cross-env
RUN npm install -g rimraf
RUN npm install -g typescript

COPY . .

RUN ["yarn", "install", "--production"]

# docker demon port mapping
EXPOSE 8080

# node env
ENV NODE_ENV=dev