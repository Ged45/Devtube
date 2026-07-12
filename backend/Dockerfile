FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apk add --no-cache ffmpeg

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]