# docker build --network=host -t geekle-ai .
# docker run -it --net="host" --env-file ./.env -p 7001:7001 -p 9000:9000 geekle-ai

#FROM ubuntu:22.04
FROM node:17.1.0
#RUN apt-get update

# install curl
#RUN apt-get install -y curl
# get install script and pass it to execute:
#RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
# and install node
#RUN apt-get install -y nodejs

#RUN mkdir /app
WORKDIR /app

RUN apt-get update
RUN apt-get install -y python
RUN npm install -g @medusajs/medusa-cli@latest

COPY package.json package-lock.json ./
#RUN npm install @medusajs/medusa-cli -g
RUN npm ci
#RUN npm install ajv-keywords@5.1.0 --save


COPY . .

RUN npm run build
#RUN medusa migrations run

ENTRYPOINT medusa migrations run;  npm run dev