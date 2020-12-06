FROM node:lts-alpine3.10

WORKDIR /app

COPY package.json .

RUN set -xe; \
    mkdir ./scripts && touch ./scripts/linkPackages.js && \
    yarn --prod

COPY . .

RUN set -xe; \
    rm -rf ./scripts/linkPackages.js && \
    touch ./scripts/linkPackages.js && \
    yarn --prod && \
    yarn build:all

EXPOSE 3000
CMD ["yarn", "start:prod"]