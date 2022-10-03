FROM node:15
WORKDIR /app
# COPY  ./app/. ./
COPY ./app/package*.json ./
RUN apt update && apt install --no-install-recommends -y python make g++\
    && rm -rf /var/lib/apt/lists/*

RUN npm install
RUN npm install -g npm@8.19.1 && npm update chokidar
RUN npm rebuild node-sass

COPY ./app/. ./

CMD ["npm", "start"]
