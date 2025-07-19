# 🐞 MERN Bug Tracker

A full-stack **Bug Tracking System** built with the **MERN** stack (MongoDB, Express, React, Node.js). This project was developed as part of the Week 6 Testing & Debugging assignment.

---

## 🚀 Features

- 🔐 **Authentication**: User registration & login
- 🐛 **Bug Management**: Create, update, delete bugs
- 🧪 **Testing**: Backend tested with Jest & Supertest
- 🔧 **Error Handling**: Graceful error responses & validations
- 🗃 **Modular Structure**: Clean separation of concerns

---

## 📁 Folder Structure

mern-bug-tracker/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Pages like Dashboard, Login, etc.
│ │ ├── utils/ # Auth & API utils
│ │ └── main.jsx
│ └── index.html
│
├── server/ # Express backend
│ ├── controllers/ # Request handlers
│ ├── middleware/ # Auth, error handling
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── tests/ # Jest/Supertest tests
│ └── server.js # Entry point
│
└── README.md # Project documentation

---

## ⚙️ Getting Started

### 🔽 Clone the Repository

```bash
git clone https://github.com/yourusername/mern-bug-tracker.git
cd mern-bug-tracker
📦 Backend Setup

cd server
pnpm install
🔧 Environment Variables
Create a .env file in /server:


PORT=5000
MONGODB_URI=mongodb://localhost:27017/bug-tracker
JWT_SECRET=your_jwt_secret
▶️ Run Backend Server

pnpm dev
💻 Frontend Setup

cd client
pnpm install
pnpm run dev
🧪 Running Tests

cd server
pnpm test
Tests include:

*User auth
*Bug creation
*Protected route access
*Invalid inputs


👨‍💻 Contributors
Moses Jengo — University of Nairobi





---
