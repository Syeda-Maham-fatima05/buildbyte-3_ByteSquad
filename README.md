# UniConnect – University Society & Events Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase" />
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?logo=vite" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
</p>

## 📖 Overview

**UniConnect** is a centralized platform designed to connect all university societies in one place. It enables students to discover societies, explore upcoming events, and stay updated with campus activities, while providing society administrators with an easy way to manage their profiles and publish events.

This project was developed as a hackathon solution to address the common problem of students missing opportunities due to scattered communication across different platforms.

---

## ✨ Features

### 👨‍🎓 Student Features

* Browse all university societies
* View society profiles
* Explore upcoming events
* Search and filter events
* View event details
* Responsive interface for desktop and mobile

### 🏛 Society Features

* Secure authentication
* Society dashboard
* Create events
* Edit events
* Delete events
* Manage society profile
* Upload society logos and event posters

### 🔒 Security Features

* Authentication using Supabase
* Protected routes
* Session management
* Input validation
* Error handling

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* React Router DOM
* CSS

## Backend

* Supabase
* Supabase Authentication
* Supabase Storage
* JavaScript

## Database

* PostgreSQL (Supabase)

## Deployment

* Vercel

---

# 📁 Project Structure

```text
client/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── lib/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
└── vite.config.js
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/your-username/uniconnect.git
cd uniconnect
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Start Development Server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

# 🗄 Database

The application uses **Supabase PostgreSQL**.

Main tables include:

* societies
* events
* posts
* registration_requests

Storage buckets include:

* Society Logos
* Event Posters
* Media Uploads

---

# 🔄 Application Flow

```text
Student
    │
    ▼
Browse Societies
    │
    ▼
View Events
    │
    ▼
Register for Events
```

```text
Society Admin
      │
      ▼
Login
      │
      ▼
Dashboard
      │
      ▼
Create / Edit / Delete Events
      │
      ▼
Events Published
      │
      ▼
Students View Events
```

---

# 📌 Core Modules

* Authentication
* Society Management
* Event Management
* Dashboard
* Search & Filtering
* Protected Routes
* Storage Management

---

# 📷 Screens

* Home Page
* Login Page
* Register Page
* Dashboard
* Society Directory
* Society Profile

---

# 🧪 Testing

The project has been tested for:

* User Registration
* Login & Logout
* Protected Routes
* Create Event
* Edit Event
* Delete Event
* Event Listing
* Society Listing
* Responsive Layout
* Supabase Integration

---

# 👥 Team

| Member   | Responsibility                          |
| -------- | --------------------------------------- |
| Syeda Maham Fatima | Frontend UI & UX                        |
| Nawal Abid | Backend Integration & Application Logic |
| Aaisha Jamil | Database Design, Supabase & Deployment  |

---

# 🔮 Future Enhancements

* Event registration system
* Email notifications
* AI-based event recommendations
* Real-time chat
* Society announcements
* Event analytics
* Admin approval dashboard
* Calendar integration
* QR Code event check-in
* Push notifications

---


---

# 📄 License

This project is licensed under the **MIT License**.

---



---

<p align="center">
<b>UniConnect — Bringing University Societies Together Through One Connected Platform.</b>
</p>
