# 🎮 GameSwap Backend API

GameSwap is a backend platform built with Node.js, Express, and Prisma that allows gamers to **list**, **browse**, and **swap** physical game discs for consoles and PC.

> This is the backend portion of the GameSwap MVP. A frontend client (React/Next.js) will integrate with this API.

---

## 🚀 Features

- 🔐 JWT-based authentication
- 🎮 Game listing with platform, title, condition, and image upload (via Cloudinary)
- 🔄 Swap request system (offer/request/accept/decline)
- 💾 PostgreSQL + Prisma ORM
- 📦 Secure file uploads via Cloudinary
- 🧾 Swagger API docs (`/api-docs`)

---

## 🧰 Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL (via Prisma)
- **ORM:** Prisma
- **Auth:** JWT + Refresh Tokens
- **File Uploads:** Cloudinary
- **Docs:** Swagger (`swagger-ui-express`)
- **Dev Tools:** ts-node-dev, dotenv, ESLint

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/gameswap-backend.git
cd gameswap-backend
```

### 2.Install Dependencies

```bash
npm install

```

### 3.Set Up Environment Variables
Create a .env file based on .env.example:


```bash
PORT=5000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/gameswap
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx


```
### 4.Run Prisma Migrations

```bash
npm install

```
