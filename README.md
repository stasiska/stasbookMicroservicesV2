<h1 align="center">📖 Stasbook — Facebook Clone with Microservices</h1>

<p align="center">
  A scalable social network clone built with Node.js, NestJS, and a full microservice architecture using gRPC, RabbitMQ, Redis, Docker, and more.
</p>

---
<a href="https://github.com/stasiska/stasbookrepo/blob/main/nestjsmicroservice.png"><strong>Explore the docs »</strong></a>

## 🧩 Description

**Stasbook** is a distributed clone of Facebook developed with a microservices architecture. It includes isolated services communicating via **gRPC** and **RabbitMQ**, with core social features like authentication, posts, comments, likes, and notifications.

The system is fully containerized with **Docker**, and each service is monitored via **Prometheus** and **Grafana**, with metrics pushed from services using **Pushgateway**. This ensures observability for critical operations like queue processing, DB replication, and performance tracking.

---

## 📐 System Design

![System Design](https://github.com/stasiska/stasbookrepo/blob/main/nestjsmicroservice.png?raw=true)


## 🛠 Tech Stack

- **Frameworks**: Node.js, NestJS
- **Database**: PostgreSQL, Redis (Cache & Session)
- **Transport**: gRPC, Protocol Buffers, RabbitMQ
- **ORMs**: Prisma, TypeORM, Drizzle
- **Logging**: Pino
- **Monitoring**: Prometheus, Grafana, Pushgateway
- **Object Storage**: S3
- **Authentication**: Session-based, OAuth2 (Google/Yandex), Mail (SMTP via Mailhog)
- **Containerization**: Docker, Docker Compose
- **CRON**: Scheduled DB replication

## 📊 Monitoring

Observability and metrics are integral to the system's design. The following tools are used:

- **Prometheus** — scrapes metrics from each service
- **Pushgateway** — services push custom metrics (e.g., background job durations, queue size)
- **Grafana** — visualizes dashboards for system health and performance
- **Node Exporter** — optional for low-level Docker/container metrics

You can track events such as:
- RabbitMQ queue length & processing times
- gRPC request latency
- DB replication success
- Custom app metrics (e.g., post creation rate, login frequency)

All components are containerized and available in the `docker-compose.ymlEXZAMPLE`.



## Setup project

# 🔧 Environment Setup

[api-gateway](https://github.com/stasiska/stasbookrepo/tree/main/apps/api-gateway)

[auth-service](https://github.com/stasiska/stasbookrepo/tree/main/apps/auth-service)

[post-service](https://github.com/stasiska/stasbookrepo/tree/main/apps/post-service)

[social-service](https://github.com/stasiska/stasbookrepo/tree/main/apps/social-service)

[notification-service](https://github.com/stasiska/stasbookrepo/tree/main/apps/notification-service)


## 🚀 Getting Started

### Clone the repo

```bash
git clone https://github.com/stasiska/stasbookrepo.git
cd stasbookrepo
 
```

## Stay in touch!!!

- Author - stasika

