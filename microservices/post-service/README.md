```markdown
# Post Service

Handles user-generated posts with:

- S3 for media storage
- Redis cache for faster post feeds
- gRPC-based object mappers for data formatting

## Highlights

- Image uploads to S3
- Cached batch post responses
- Integrated with Social Service for notifications
- Communication with SOCIAL-SERVICE <delete events>

## Project setup

# expamle .env

NODE_ENV='false'

POST_SERVICE_URL=

POSTGRES_URI=

S3_ENDPOINT=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_BUCKET_NAME=

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

