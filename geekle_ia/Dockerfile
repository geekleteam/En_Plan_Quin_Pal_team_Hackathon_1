# docker build -t geekle-ai .

FROM ubuntu:22.04

RUN apt-get update

# install curl
RUN apt-get install -y curl
# get install script and pass it to execute:
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
# and install node
RUN apt-get install -y nodejs

RUN mkdir /app

COPY geekle_ia /app
COPY ../geekle_ia_storefront /app

WORKDIR /app/geekle_ia
RUN npm install @medusajs/medusa-cli -g
RUN npm install
RUN npm run build
RUN medusa migrations run

ENTRYPOINT npm dev
