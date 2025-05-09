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

COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npx prisma generate --schema=prisma/replica/schema.prisma

RUN npm run build


EXPOSE 55013

CMD ["npm", "run", "start:dev"]