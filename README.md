# JobMatch

> A web platform connecting Saudi job seekers — especially fresh graduates — with local employers, aligned with **Vision 2030** national-employment goals.

[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248.svg)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](#)

JobMatch is a full-stack hiring platform built as a **team project** for the Software Engineering course (SWE-363) at King Fahd University of Petroleum and Minerals (KFUPM). Job seekers create profiles, search and save listings, and message employers. Employers post openings, manage applicants, and view analytics on a personal dashboard.

<!--
  📸  Recommended: add a screenshot or two of the running app here.
       Suggested shots: landing page, job search results, employer dashboard, messaging view.
       Save them to assets/ and uncomment:
  ![Landing page](assets/landing.png)
  ![Search](assets/search.png)
-->

---

## Highlights

- **Authentication backend** with JWT-based sessions and `bcryptjs` password hashing.
- **Role-based UX** — distinct flows for job seekers and employers (profile management, posting, applications).
- **Job search & discovery** — keyword + location filters, paginated listings, save-for-later.
- **Messaging** between job seekers and employers (REST-based; not WebSocket real-time).
- **Email notifications** via `nodemailer` (e.g. password reset, account events).
- **Employer analytics** dashboard with charts powered by `chart.js`.
- **Responsive UI** built with React 18, React Router 6, and CSS Modules.

---

## Tech stack

**Frontend** &nbsp; React 18, React Router DOM 6, React Icons, Chart.js / `react-chartjs-2`, CSS Modules, Create React App
**Backend** &nbsp; Node.js, Express 4, Mongoose 8 (MongoDB ODM)
**Auth & Security** &nbsp; `jsonwebtoken` (JWT), `bcryptjs` (password hashing), `dotenv` (config)
**Email** &nbsp; `nodemailer`
**Tooling** &nbsp; `nodemon` (dev), Git / GitHub

---

## Repository layout

```
JobMatch/
├── src/                # React frontend (components, pages, routing)
├── public/             # CRA static assets
├── backend/            # Express API + Mongoose models
│   ├── index.js
│   └── package.json
├── package.json        # Frontend dependencies
└── README.md
```

---

## Getting started

### 1. Prerequisites

- Node.js 18+ and npm
- A MongoDB connection string (Atlas or local)

### 2. Clone

```bash
git clone https://github.com/Fai1Dude/JobMatch.git
cd JobMatch
```

### 3. Backend

```bash
cd backend
npm install

# create a .env file with your secrets
cat > .env <<EOF
MONGO_URI=mongodb://localhost:27017/jobmatch
JWT_SECRET=replace-with-a-long-random-string
EMAIL_USER=your@email
EMAIL_PASS=your-app-password
PORT=5000
EOF

npm run dev      # starts the API on http://localhost:5000
```

### 4. Frontend (in a separate terminal)

```bash
cd ..             # back to repo root
npm install
npm start         # opens http://localhost:3000
```

The React app will talk to the Express API running on port 5000.

---

## Features

**For job seekers**
- Register and log in with JWT-protected sessions
- Build a profile (skills, experience, resume, cover letter)
- Search jobs by keyword and location, browse paginated results
- Save listings for later, manage saved-jobs list
- Message employers directly
- Get email notifications for account events

**For employers**
- Post new openings and manage existing listings
- Review and contact applicants
- See activity through a chart-based dashboard

---

## My contribution (Faisal Alhamdi)

JobMatch was a team project, and I want to be accurate about who did what.

I led the project and wrote the majority of the code, owning the **end-to-end architecture, backend API and authentication, database schema, and integration with the React frontend**. Specific contributions include:

- Designed and built the Express + Mongoose backend (routes, controllers, models)
- Implemented JWT-based authentication and bcrypt password hashing
- Set up the email pipeline using `nodemailer`
- Wired the frontend (React Router, API integration, state)
- Coordinated the team and shipped the final integration

Other team members contributed to UI components, styling, and user research; full credit to everyone listed in the original course submission.

---

## What's not in this version (honest scope)

To set expectations properly:

- The messaging system is **REST-based, not WebSocket real-time** — messages send/load on user action, not via push.
- The app **runs locally**; it is not currently deployed to a public URL.
- The repo was imported as a single commit from the original course repository, so the commit history doesn't reflect day-to-day iteration.

---

## License

ISC. See [LICENSE](#) (or update to MIT if preferred).

---

## Author

**Faisal Alhamdi** — B.Sc. Software Engineering, KFUPM
[LinkedIn](https://linkedin.com/in/faisal-alhamdi) · [GitHub](https://github.com/Fai1Dude)
