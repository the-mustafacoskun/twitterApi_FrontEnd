# Twitter Clone - Frontend

A React single-page application for a small Twitter-style social network. Users can register and log in, publish tweets, browse the public feed, view their own tweets and retweets, react to posts, and join conversations through comments.

The frontend is designed to work with the companion [Twitter API backend](https://github.com/the-mustafacoskun/twitter_api), built with Spring Boot.

## Features

- Account registration and login
- Authenticated home page with a combined tweet feed
- Separate views for all tweets and the signed-in user's tweets and retweets
- Create tweets
- Like and dislike tweets
- Retweet and undo retweets
- View and add comments
- Relative timestamps and reaction/comment/retweet counts
- Client-side routing for the home, login, and registration pages

## Technology

- React 19
- Vite 8
- React Router
- Tailwind CSS 4
- Axios
- React Hook Form
- Lucide React

## Requirements

- Node.js compatible with Vite 8 (Node.js `20.19+` or `22.12+`)
- npm
- The companion backend and its prerequisites. The backend uses Java 21, Spring Boot, and PostgreSQL; see its [README](https://github.com/the-mustafacoskun/twitter_api) for backend-specific setup.

## Getting started

### 1. Start the backend

Clone and configure the [backend repository](https://github.com/the-mustafacoskun/twitter_api). Start PostgreSQL and configure the database connection in the backend's `src/main/resources/application.properties`. The checked-in backend configuration uses port `9000` and the `/twitter` context path.

From the backend project directory, start the Spring Boot application:

```powershell
.\mvnw.cmd spring-boot:run
```

The frontend expects the API at `http://localhost:9000/twitter`.

### 2. Install and start the frontend

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint |

## Application routes

| Route | Description | Access |
| --- | --- | --- |
| `/login` | Sign in to an existing account | Public |
| `/register` | Create an account | Public |
| `/` | Tweet feed and interactions | Requires login |

## Backend integration

The shared Axios client is defined in `src/data/api.jsx`. Its API base URL is currently `http://localhost:9000/twitter`. Login credentials are configured as HTTP Basic Auth after a successful login and cleared on logout.

The UI currently calls these backend endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/auth/register` | Register a user |
| `POST` | `/auth/login` | Authenticate a user |
| `GET` | `/tweet` | Load all tweets |
| `GET` | `/tweet/findByUserId?userId={id}` | Load tweets for a user |
| `POST` | `/tweet` | Create a tweet |
| `GET` | `/retweet/mine` | Load the signed-in user's retweets |
| `POST` | `/retweet` | Retweet or undo a retweet |
| `GET` | `/reaction?tweetId={id}` | Get the current user's reaction to a tweet |
| `POST` | `/like?tweetId={id}` | Like a tweet or update the reaction |
| `POST` | `/dislike?tweetId={id}` | Dislike a tweet or update the reaction |
| `GET` | `/comment/findByTweetId?tweetId={id}` | Load comments for a tweet |
| `POST` | `/comment?tweetId={id}` | Add a comment |

For a different backend address, update the base URL in `src/data/api.jsx` and the registration URL in `src/components/SignUp.jsx`.

## Project structure

```text
src/
  components/       Login, registration, tweet, and comment UI
  data/api.jsx      Shared Axios client and authentication configuration
  pages/            Feed and authentication pages
  App.jsx           Routes and top-level login state
  main.jsx          React application entry point
public/             Static assets
```

## Notes

- This repository contains the frontend only; account data and social content are handled by the backend.
- The frontend expects the backend's API response shapes and endpoint paths shown above.
- The current API URLs are configured directly in source rather than through environment variables.
