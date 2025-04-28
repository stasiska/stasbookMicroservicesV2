FROM node:18-alpine

RUN apk update && \
    apk add --no-cache \
    openssl \
    python3 \
    make \
    g++

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npm install -g prisma

COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma

RUN npm run build


EXPOSE 55014

CMD ["npm", "run", "start:dev"]