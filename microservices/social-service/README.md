```markdown
# Social Service

Responsible for:

- Friends, Likes, Comments
- RabbitMQ producer for user activity
- Database indexing for performance

## Relations

- Sends notifications to Notification Service
- Depends on Post Service for content linkage

## Project setup

# expamle .env

NODE_ENV='development'

SOCIAL_SERVICE_URL=

DATABASE_URL=
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

