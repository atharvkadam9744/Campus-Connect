# Campus Connect

Campus Connect is a real-time faculty availability tracking system built for colleges and campuses. It helps students instantly check whether faculty members, admin office staff, or library staff are available without physically visiting their office.

---

# Features

## Faculty Features

* Faculty Signup & Login
* Real-time status updates
* Persistent login session
* Status options:

  * Available
  * Busy
  * Offline

## Student Features

* View all faculty and staff
* Real-time availability updates
* Search faculty by name
* Filter by department
* View:

  * Department
  * Room Number
  * Office Block

## Departments Supported

* Computer Engineering
* IT
* Mechanical
* Civil
* ENTC
* Library
* Admin Office

---

# Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM
* Socket.IO Client

## Backend

* Node.js
* Express.js
* Socket.IO
* JWT Authentication
* bcryptjs

## Database

* MongoDB Atlas

---

# Real-Time Functionality

Campus Connect uses Socket.IO to provide instant live updates.

When faculty updates their availability status, students immediately see the changes without refreshing the page.

---

# Project Structure

```bash
Campus Connect/
│
├── client/
│   ├── src/
│   ├── pages/
│   └── components/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/atharvkadam9744/Campus-Connect.git
```

---

# Backend Setup

```bash
cd server
npm install
npm run dev
```

Create `.env` file inside `server` folder:

```env
MONGO_URI=YOUR_MONGODB_URI
PORT=5000
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# Routes

## Frontend Routes

| Route      | Description       |
| ---------- | ----------------- |
| `/`        | Home Page         |
| `/faculty` | Faculty Dashboard |
| `/student` | Student Dashboard |
| `/signup`  | Faculty Signup    |

---

# Future Improvements

* Mobile App Version
* Push Notifications
* QR Office Check-in
* Faculty Timetable Integration
* Appointment Booking System
* Admin Dashboard
* Cloud Deployment

---

# Author

Atharva Kadam

GitHub
