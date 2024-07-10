# docker build -t geekle-ai-front .
# docker run -it --env-file ./old.env -p 8000:8000 geekle-ai-front

FROM ubuntu:22.04

RUN apt-get update

# install curl
RUN apt-get install -y curl
# get install script and pass it to execute:
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
# and install node
RUN apt-get install -y nodejs

RUN mkdir /app
WORKDIR /app

COPY package.json /app
#RUN npm install @medusajs/medusa-cli -g
RUN npm install


COPY . /app


ENTRYPOINT npm run dev
