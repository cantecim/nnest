FROM node:lts-alpine3.10

WORKDIR /app

COPY package.json .

ENV HUSKY_SKIP_INSTALL=1
RUN set -xe; \
    mkdir ./scripts && touch ./scripts/linkPackages.js && \
    yarn

COPY . .

RUN set -xe; \
    yarn && \
    yarn build:all

EXPOSE 3000
CMD ["yarn", "start:prod"]