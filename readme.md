# 🧠 SmartStudyAI

> **AI-powered study assistant** built with the **MERN stack**, designed to make learning smarter and faster.  
Create subjects and topics, generate AI-based study material with **Gemini**, upload images via **Cloudinary**, and study efficiently through **quizzes, flashcards, and revision tools**.

---

## 🚀 Tech Stack

**Frontend**
- ⚛️ React (Vite)
- 🧭 React Router
- 🔍 TanStack Query (React Query)
- 🧠 Zustand (Global State)
- 🎨 Tailwind CSS
- 📝 React Hook Form

**Backend**
- 🟢 Node.js + Express
- 🍃 MongoDB + Mongoose
- 🔑 JWT Authentication
- 📁 Multer + Cloudinary (Image Uploads)
- 🤖 Google Generative AI (Gemini API)

---

## 🌟 Features

- 👤 **User Authentication**
  - Register, Login, Logout, and Profile Update  
- 📚 **Subjects Management**
  - Create, List, Update, Delete  
  - Toggle Public/Private  
  - Import Shared Subjects  
- 🧾 **Topics Management**
  - AI-generated or Manual topic creation  
  - Image uploads supported  
  - Delete, List, Mark as Done/Undone  
  - supports **text, code, formulas, visuals**
- 🤖 **AI Integrations**
  - Google Gemini for topic suggestions and auto content generation  
- ☁️ **Media Handling**
  - Cloudinary for secure and fast image storage  
- ⚡ **Modern SPA**
  - Query caching, toasts, and responsive UI built with Vite + Tailwind CSS  

---

## 📂 Project Structure

```bash
SmartStudyAI/
│
├── backend/
│   ├── configs/         # mongo, gemini, cloudinary
│   ├── controllers/     # user, subject, topic handlers
│   ├── middlewares/     # auth, AI, validation
│   ├── models/          # mongoose schemas
│   ├── routes/          # user, subject, topic routers
│   ├── services/        # shared service helpers
│   ├── utils/           # ai, cloudinary, validation, helpers
│   └── server.js        # express app entry
│
├── frontend/
│   ├── src/
│   │   ├── components/    # common, form, subject, topicCreation, topics
│   │   ├── hooks/         # data + action hooks
│   │   ├── layouts/       # MainLayout
│   │   ├── pages/         # Landing, Login, Signup, Dashboard, etc.
│   │   ├── services/      # apis.js, auth.js, utils.js
│   │   ├── stores/        # Zustand stores
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── vite.config.js
│
└── README.md
```

## Getting Started

**Prerequisites**

- Node.js v18+
- MongoDB instance
- Cloudinary account (for media)
- Google Gemini API key

**Environment Variables**

Backend (backend/.env)
 
 ```bash
PORT=3000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
CLIENTSERVER=http://localhost:5173

# Cloudinary
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret

# Gemini
GEMINI_API_KEY=your_gemini_api_key
```
Frontend (frontend/.env)

```
# Point to backend root (current routes mount at '/')
VITE_SERVER_URL=http://localhost:3000
```


**Installation**
```
# In project root, open two terminals (backend and frontend)

# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend
cd ../frontend
npm install
npm run dev
```

- Backend dev server: http://localhost:3000
- Frontend dev server: http://localhost:5173
- Ensure CLIENTSERVER (backend) matches the frontend URL.

**Scripts**

Backend (backend/package.json)

- dev: npm run dev — start Express with nodemon

Frontend (frontend/package.json)

- dev: npm run dev — start Vite dev server
- build: npm run build — production build to frontend/dist
- preview: npm run preview — preview production build
- lint: npm run lint — run ESLint

**API Overview (current endpoints)**

Base URL: VITE_SERVER_URL (e.g., http://localhost:3000)

**Auth/User**

- POST /register — register user
- POST /login — login user
- PUT /update-profile — update profile (auth)
- DELETE /logout — logout (auth)


**Subjects**

- POST /subjects — create subject (auth; AI suggestions middleware)
- GET /subjects — list subjects (auth)
- PUT /subjects/suggestions — update subject with AI suggestions (auth)
- DELETE /subjects — delete subject (auth)
- PUT /subjects/public — toggle public status (auth)
- GET /public-subjects — list public subjects (auth)
- POST /subjects/import — import subject (auth)
- GET /imported-subjects — list imported subjects (auth)
- DELETE /imported-subjects — delete imported subject (auth)

**Topics**

- POST /generate-topic — AI-generate topic content (auth)
- POST /create-topic — create topic with images (multipart) (auth)
- GET /:subjectId/topics — list topics by subject (auth)
- DELETE /topics — delete topic (auth)
- PUT /topics/status — mark topic as done/undone (auth)