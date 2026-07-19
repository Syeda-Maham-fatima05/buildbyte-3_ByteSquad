# UniConnect – University Society & Events Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase" />
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?logo=vite" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
</p>

#
## Live Demo

The application is deployed and can be accessed using the link below.

### Note:

**The information available on the platform or project "UniConnect" is intended to showcase the functionality of the system.**

**In the future, after obtaining official permission and approval from the university respective student societies administration, the platform will be deployed with verified society information, authentic event details, and real-time updates**

#

**Note:** For the best experience, please open the application link on a **laptop or desktop browser**. The current deployment is optimized for larger screens. While the application may open on mobile devices, some UI elements and layouts may not display correctly in the current version.

**Live URL:** https://buildbyte-3bytesquad.vercel.app/


**Video Link:**
https://drive.google.com/file/d/13dLh_IbHF10dMYRJqF3N7S95bKfRHpai/view?usp=drivesdk

--- 
## Overview

**UniConnect** is a centralized platform designed to connect all university societies in one place. It enables students to discover societies, explore upcoming events, and stay updated with campus activities, while providing society administrators with an easy way to manage their profiles and publish events.

This project was developed as a hackathon solution to address the common problem of students missing opportunities due to scattered communication across.

**This project is currently developed as a prototype for demonstration and evaluation purposes. The information available on the platform is intended to showcase the functionality of the system.**

**In the future, after obtaining official permission and approval from the university respective student societies administration, the platform will be deployed with verified society information, authentic event details, and real-time updates. The goal is to provide students with a centralized and reliable platform for discovering university societies and campus events.**

---
#
# Team Members 

---

| Member   | Responsibility                          |
| -------- | --------------------------------------- |
| Syeda Maham Fatima | Frontend UI & UX and Deployment                       |
| Nawal Abid | Backend Integration & Application Logic |
| Aaisha Jamil | Database Design & Supabase |

#
## Features
#
### Student Features

* Browse all university societies
* View society profiles
* Explore upcoming events
* Search and filter events
* View event details
* Responsive interface for desktop 

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
# Solution

UniConnect provides a centralized digital platform that brings all university societies together in one place. Instead of relying on multiple social media platforms, WhatsApp groups, or word-of-mouth communication, students can access verified information about societies and their upcoming events through a single website.

Each registered society has its own secure dashboard where authorized representatives can manage their profile and publish events. These events are instantly available to students, making it easier to stay informed about workshops, seminars, hackathons, competitions, and other campus activities.

The platform also includes a searchable society directory, allowing students to discover societies based on their interests and view details such as descriptions, contact information, and upcoming events. This improves visibility for student organizations while helping students find communities that match their academic and extracurricular goals.

To ensure reliability, society authentication and event management are handled through secure user accounts, and all data is stored in a centralized database. In the current prototype, demo data is used to demonstrate the platform's functionality. In the production version, the platform will be populated with verified information only after obtaining official permission from the university administration and the respective student societies.

By replacing fragmented communication with one unified system, UniConnect improves event awareness, increases student participation, enhances collaboration between societies, and creates a more connected university community.

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
git clone https://github.com/Syeda-Maham-fatima05/buildbyte-3_ByteSquad.git
cd buildbyte-3_ByteSquad 
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

# Database Setup

Created a new project in Supabase.

Configured the project by obtaining the Supabase URL and Anon Key.Connected the React application to Supabase using environment variables (.env).

Created the required database tables

Established relationships between tables using foreign keys.

Enabled Supabase Authentication for secure user login and session management.

Created Storage Buckets for society logos, event posters, and other media files.

Applied Row-Level Security (RLS) policies to ensure users can only access and modify authorized data.

Added sample data for testing and demonstration.

Verified all CRUD operations (Create, Read, Update, Delete) by integrating the database with the React frontend.


This setup provides a secure, scalable, and efficient backend for managing societies, events, authentication, and media files within the UniConnect platform.


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
