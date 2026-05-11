# Logs Dashboard

A small full-stack project built for monitoring and exploring application logs.

The idea behind this project was to create something closer to a real-world dashboard instead of another basic CRUD app. The app allows users to search logs, filter data, inspect transactions, and visualize activity using charts.

Over time, the project was refactored into reusable hooks and smaller components to keep the codebase easier to manage.

---

## Features

- Authentication with JWT
- Search and filter logs
- Filter logs using custom date ranges
- Charts for log activity
- Hour/day based grouping
- Pagination and sorting
- Expandable log messages
- Dynamic table columns
- Responsive UI

---

## Tech Stack

### Frontend

- React
- Vite
- Axios
- React Router
- React Hot Toast
- React Icons

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT

---

## Folder Structure

```txt
project-root/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   └── vite.config.js
```

---

## Running the Project Locally

### 1. Clone the repository

```bash
git clone <repo-url>
cd <project-folder>
```

---

## Backend Setup

Move into backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

## Frontend Setup

Move into frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## Production Build

```bash
npm run build
npm run preview
```

---

## Things I Refactored During Development

- Moved repeated filter logic into custom hooks
- Separated date utilities into helper functions
- Split dashboard sections into reusable components
- Reduced inline styles and moved styling into CSS
- Improved API handling using a shared axios instance

---

## Future Improvements

Some things that can still be added:

- Live log streaming
- Export logs as CSV
- Better chart controls
- Dark mode
- Role-based access
- Unit tests

---

## Final Notes

This project was mainly built for learning and improving full-stack development skills.

The biggest focus areas while building this were:

- handling frontend state cleanly
- working with reusable hooks
- managing filtered data
- improving component structure
- building a dashboard UI that feels practical

A lot of changes were made during refactoring, especially around filters, table handling, and reusable utilities.

---

## License

Open for learning and personal use.
