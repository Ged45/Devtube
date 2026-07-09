# 🎥 DevTube

A full-stack YouTube clone built with modern web technologies and production-ready architecture.

DevTube is a learning project designed to demonstrate how large-scale video platforms such as YouTube are built using React, Express, PostgreSQL, Docker, Prisma, JWT authentication, and modern backend engineering practices.

---

## 🚀 Features

### Authentication

- User Registration
- Secure Login
- Password Hashing (bcrypt)
- JWT Authentication
- Protected Routes
- Authentication Middleware

### Video Management

- Upload Videos
- Store Video Metadata
- File Uploads with Multer
- Video Streaming
- Video Processing (FFmpeg)
- Thumbnail Generation
- Video Metadata Extraction
- Multi-resolution Video Support (Upcoming)

### Docker

- Dockerized Frontend
- Dockerized Backend
- Dockerized PostgreSQL
- Docker Compose
- Persistent Volumes
- Health Checks
- Environment Variables

### Database

- PostgreSQL
- Prisma ORM
- Database Migrations
- Relationships
- Type-safe Queries

### Future Features

- Comments
- Likes
- Dislikes
- Subscriptions
- Notifications
- Watch History
- Search
- Recommendations
- HLS Streaming
- Redis Job Queue
- Background Workers
- Object Storage (S3)
- CDN Integration

---

# 🏗 Project Architecture

```
                   React
                     │
                     ▼
              Express Backend
                     │
     ┌───────────────┼────────────────┐
     ▼               ▼                ▼
 PostgreSQL      Uploads Folder     Redis (Upcoming)
     │               │                │
     ▼               ▼                ▼
 Prisma ORM      Video Files     Background Jobs
```

---

# 📂 Project Structure

```
devtube/

├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── validators/
│   │
│   ├── uploads/
│   │   ├── videos/
│   │   └── thumbnails/
│   │
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Axios
- React Router
- Tailwind CSS (Planned)

## Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- JWT
- bcrypt
- Multer
- FFmpeg

## Database

- PostgreSQL

## DevOps

- Docker
- Docker Compose



---



# 🐳 Running with Docker

Clone the repository

```bash
git clone https://github.com/yourusername/devtube.git
```

Move into the project

```bash
cd devtube
```

Start everything

```bash
docker compose up --build
```

Run in detached mode

```bash
docker compose up -d
```

Stop containers

```bash
docker compose down
```

View logs

```bash
docker compose logs -f
```

---

# 🗄 Database

Run migrations

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# 🔐 Authentication Flow

```
User

↓

Register

↓

Hash Password

↓

Save User

↓

Login

↓

Verify Password

↓

Generate JWT

↓

Return Token

↓

Protected Routes

↓

Authorization Middleware

↓

Access Granted
```

---

# 🎬 Video Upload Flow

```
Upload Video

↓

JWT Authentication

↓

Multer

↓

Save File

↓

Store Metadata

↓

FFmpeg Processing

↓

Thumbnail

↓

Video Streaming
```

---

# 🐳 Docker Architecture

```
                    Docker Compose

         ┌──────────────┬──────────────┐

         ▼              ▼              ▼

     Frontend       Backend      PostgreSQL

                        │

                        ▼

                  Upload Volume
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /auth/register | Register User |
| POST | /auth/login | Login User |
| GET | /auth/me | Current User |
| POST | /auth/logout | Logout |

## Videos

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /videos | Upload Video |
| GET | /videos | Get Videos |
| GET | /videos/:id | Get Video |
| GET | /videos/:id/stream | Stream Video |

---

# 📚 What This Project Demonstrates

- Clean Architecture
- Layered Backend Design
- Repository Pattern
- Service Layer
- REST API Design
- Docker Best Practices
- Prisma ORM
- JWT Authentication
- PostgreSQL
- Secure Password Storage
- File Uploads
- Video Streaming
- FFmpeg Integration
- Background Processing
- Scalable Architecture

---

# 🎯 Learning Goals

This project is intended to teach:

- Backend Development
- Full Stack Development
- Docker
- PostgreSQL
- Prisma
- Authentication
- REST APIs
- File Uploads
- Video Streaming
- Software Architecture
- Production Best Practices

---

# 📈 Future Improvements

- Redis Queue
- BullMQ Workers
- HLS Streaming
- Adaptive Bitrate Streaming
- Video Compression
- Email Verification
- OAuth Login
- Live Streaming
- Notifications
- Analytics Dashboard
- Kubernetes Deployment
- CI/CD Pipeline
- Monitoring & Logging

---

# 🤝 Contributing

Contributions are welcome!

Feel free to fork the repository, open issues, and submit pull requests.

---



# 👨‍💻 Author

**Gedion Samuel**

Software Engineering Student

Addis Ababa Science and Technology University

GitHub: https://github.com/Ged45



---
