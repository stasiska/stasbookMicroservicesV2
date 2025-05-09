```markdown
# Auth Service

Manages user identity:

- Session-based login (stored in Redis)
- OAuth2 via Google/Yandex
- Email verification & password reset (SMTP via Mailhog)


## Features

- Redis for session store
- SMTP mailer
- OAuth2 integration

## Project setup

# expamle .env

NODE_ENV='development'

APPLICATION_PORT=
APPLICATION_URL=
ALLOWED_ORIGIN=

AUTH_SERVICE_URL=

POSTGRES_URI=

REDIS_USER=
REDIS_PASSWORD=
REDIS_HOST=
REDIS_PORT=
REDIS_URI=

MAIL_HOST=
MAIL_PORT=
MAIL_LOGIN=
MAIL_PASSWORD=


GOOGLE_RECAPTCHA_SECRET_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

YANDEX_CLIENT_ID=
YANDEX_CLIENT_SECRET=


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

