# docker build -t geekle-ai-front .
# docker run -it --env-file ./.env -p 8000:8000 geekle-ai-front

#FROM ubuntu:22.04
FROM node:20
#RUN apt-get update

# install curl
#RUN apt-get install -y curl
# get install script and pass it to execute:
#RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
# and install node
#RUN apt-get install -y nodejs

WORKDIR /app

COPY package.json package-lock.json ./
#RUN npm install @medusajs/medusa-cli -g
RUN npm ci

COPY . /app

#ENTRYPOINT npm run dev
CMD ["npm", "run", "dev"]