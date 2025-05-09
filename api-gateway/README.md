```markdown
# API Gateway

Acts as the entry point to all backend services. It handles:

- Authentication/Authorization Guards
- Role-based access control
- Routing to internal microservices via gRPC

## Project setup

# expamle .env

NODE_ENV='false'

APPLICATION_PORT=
APPLICATION_URL=
ALLOWED_ORIGIN=

AUTH_SERVICE_URL=
POST_SERVICE_URL=
SOCIAL_SERVICE_URL=

COOKIES_SECRET=
SESSION_SECRET=
SESSION_NAME=
SESSION_DOMAIN=
SESSION_MAX_AGE=
SESSION_HTTP_ONLY=
SESSION_SECURE=
SESSION_FOLDER=


REDIS_USER=
REDIS_PASSWORD=
REDIS_HOST=
REDIS_PORT=
REDIS_URI=

S3_ENDPOINT=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_BUCKET_NAME=
S3_GET_STATIC=

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Stay in touch

- Author - stasika

