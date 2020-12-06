FROM node:lts-alpine3.10

WORKDIR /app

COPY package.json .

RUN set -xe; \
    mkdir ./scripts && touch ./scripts/linkPackages.js && \
    yarn

COPY . .

RUN set -xe; \
    yarn --prod && \
    yarn build:all

EXPOSE 3000
CMD ["yarn", "start:prod"]