# Uber Clone

A full-stack Uber-like ride-hailing application built with **Node.js**, **Express**, **MongoDB** (backend), and **React** (frontend). This project demonstrates user and captain (driver) registration, authentication, ride booking, fare calculation, real-time ride status, and map-based features.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Overview](#api-overview)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Features

- User registration, login, profile, and logout
- Captain (driver) registration, login, profile, and logout
- Secure JWT authentication for both users and captains
- Ride booking with pickup and destination address
- Real-time fare calculation for different vehicle types (car, auto, bike)
- Ride confirmation, start, and finish flows
- Google Maps integration for address suggestions and distance/time calculation
- Socket.io for real-time ride status updates
- Protected routes for users and captains
- Responsive, modern UI with React and Tailwind CSS

---

## Project Structure

```
Uber-Clone/
│
├── backend/
│   ├── controllers/         # Express route controllers
│   ├── db/                  # Database connection
│   ├── middleware/          # Auth and other middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # Express route definitions
│   ├── services/            # Business logic/services
│   ├── app.js               # Express app setup
│   ├── server.js            # Server entry point
│   ├── socket.js            # Socket.io setup
│   ├── .env                 # Backend environment variables
│   ├── package.json
│   └── README.md            # Backend API documentation
│
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # React context providers
│   │   ├── pages/           # React pages/views
│   │   ├── App.jsx          # Main app and routes
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles
│   ├── .env                 # Frontend environment variables
│   ├── package.json
│   ├── vite.config.js
│   └── README.md            # Frontend usage and API docs
│
├── .gitignore
├── README.md                # Main project overview (this file)
```

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router, GSAP, Google Maps API
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, express-validator, Socket.io
- **Other:** dotenv, cookie-parser, CORS

---

## Screenshots

> _Add screenshots or GIFs of the main user flows, e.g. registration, booking a ride, captain dashboard, etc._

---

## Getting Started

### Backend Setup

1. **Install dependencies:**

   ```sh
   cd backend
   npm install
   ```

2. **Configure environment variables:**  
   Create a `.env` file in `/backend` with:

   ```
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/uber-clone
   JWT_SECRET_KEY=your_jwt_secret
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

3. **Start the backend server:**
   ```sh
   npm start
   ```
   The backend runs on `http://localhost:8080` by default.

---

### Frontend Setup

1. **Install dependencies:**

   ```sh
   cd frontend
   npm install
   ```

2. **Configure environment variables:**  
   Create a `.env` file in `/frontend` with:

   ```
   VITE_BASE_URL=http://localhost:8080
   ```

3. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` by default.

---

## API Overview

- **User Endpoints:** Register, login, profile, logout
- **Captain Endpoints:** Register, login, profile, logout
- **Ride Endpoints:** Create ride, find fare, confirm ride, start ride, finish ride
- **Maps Endpoints:** Get coordinates, get distance/time, get address suggestions

> For detailed API documentation, see [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md).

---

## Environment Variables

### Backend (`backend/.env`)

```
PORT=8080
MONGODB_URI=mongodb://localhost:27017/uber-clone
JWT_SECRET_KEY=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Frontend (`frontend/.env`)

```
VITE_BASE_URL=http://localhost:8080
```

---

## License

MIT

---

## Credits

- Inspired by Uber and other ride-hailing apps.
- Built for learning and demonstration purposes.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

For questions or support, open an issue or contact the project maintainer.
