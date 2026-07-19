# UniConnect – University Society & Events Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase" />
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?logo=vite" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
</p>

## Overview

**UniConnect** is a centralized platform designed to connect all university societies in one place. It enables students to discover societies, explore upcoming events, and stay updated with campus activities, while providing society administrators with an easy way to manage their profiles and publish events.

This project was developed as a hackathon solution to address the common problem of students missing opportunities due to scattered communication across

---
#
# Team Members 

---

| Member   | Responsibility                          |
| -------- | --------------------------------------- |
| Syeda Maham Fatima | Frontend UI & UX and Deployment                       |
| Nawal Abid | Backend Integration & Application Logic |
| Aaisha Jamil | Database Design, Supabase |

## Features
#
### Student Features

* Browse all university societies
* View society profiles
* Explore upcoming events
* Search and filter events
* View event details
* Responsive interface for desktop and mobile

### Society Features

* Secure authentication
* Society dashboard
* Create events
* Edit events
* Delete events
* Manage society profile
* Upload society logos and event posters

### Security Features

* Authentication using Supabase
* Protected routes
* Session management
* Input validation
* Error handling

---
#

# Tech Stack

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

# Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/uniconnect.git
cd uniconnect
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Start Development Server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

# Database

The application uses **Supabase PostgreSQL**.

Storage buckets include:

* Society Logos
* Event Posters
* Media Uploads

---

# Application Flow

```text
Student
    │
    ▼
View Societies
    │
    ▼
View Events/Posts 
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
Create / Edit / Delete Events/Posts 
      │
      ▼
Events/Posts Published
      │
      ▼
Students View Events/Posts 
```

---
#
# Version Control 

---

The complete project source code was managed using **Git** and hosted on **GitHub**. Throughout the development process, Git was used to track changes, collaborate among team members, and maintain different versions of the project.

---

# Core Modules

* Authentication
* Society Management
* Event Management
* Dashboard
* Search & Filtering
* Protected Routes
* Storage Management

---
#
# Testing

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

# Future Enhancements

* Event registration system
* Email notifications
* AI-based event recommendations
* Real-time chat
* Event analytics
* QR Code event check-in
* Push notifications

---


---

# License

This project is licensed under the **MIT License**.

---



---

<p align="center">
<b>UniConnect — Bringing University Societies Together Through One Connected Platform.</b>
</p>
