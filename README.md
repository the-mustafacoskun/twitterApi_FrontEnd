# Twitter Clone Frontend

This project is a lightweight Twitter-style social media frontend where users can sign up, log in, create tweets, view the public feed, interact with posts, and participate in discussions through comments. It communicates with a Spring Boot backend API and is designed to work as the frontend companion for the backend project below.

- Backend repository: https://github.com/the-mustafacoskun/twitter_api
- The frontend expects the API to be available at `http://localhost:9000/twitter`.

## Project Overview

This application provides the following core flows:

- User registration
- User login
- Viewing the tweet feed
- Seeing personal tweets in a dedicated tab
- Creating new tweets
- Liking and disliking tweets
- Retweeting and undoing retweets
- Viewing and adding comments
- Relative time formatting such as `now`, `min`, `hr`, and `day`
- Client-side routing with React Router

## Features

### User Management

- Registration page
- Login page
- Sending authenticated requests to the backend using HTTP Basic Auth
- Storing the logged-in user in app state after successful login
- Clearing auth information on logout

### Main App Flow

- `/login` route for authentication
- `/register` route for account creation
- `/` route for the main feed and tweet interactions
- Unauthenticated users are redirected to `/login`

### Tweet functionality

- Create new tweets
- Fetch all tweets
- View a user's own tweets and retweets together
- Toggle between `All Tweets` and `My Tweets`
- Track retweet state and counts
- Support like/dislike reactions
- Open and add comments to a tweet

### UI Behavior

- Clean social-media style card layout
- Display username, timestamps, content, and interaction counts for each tweet
- Hover states and active button styling
- Expandable comment panel for each tweet

## Tech Stack

- React 19
- Vite 8
- React Router DOM
- Tailwind CSS 4
- Axios
- React Hook Form
- Lucide React
- JavaScript / JSX

## Requirements

Make sure the following are installed:

- Node.js 20.19+ or 22.12+
- npm
- Java 21
- PostgreSQL
- Spring Boot backend application

Note: This repository contains only the frontend. User data, tweet content, and application logic are managed by the backend service.

## Project Structure

```text
twitterreact/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── profile.png
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CommentInput.jsx
│   │   ├── Header.jsx
│   │   ├── LogIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── TweetCardTemplate.jsx
│   │   ├── TweetCommentCard.jsx
│   │   └── TweetInput.jsx
│   ├── data/
│   │   └── api.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── LogInAndSignUp.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── ...
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── ...
```

## Getting Started

### 1) Prepare the backend

Clone the backend project:

```bash
git clone https://github.com/the-mustafacoskun/twitter_api.git
```

Then start PostgreSQL and configure the database connection settings in the backend file `src/main/resources/application.properties`.

The default backend configuration used by this frontend is:

- Port: `9000`
- Context path: `/twitter`

To run the backend:

Windows PowerShell:

```powershell
cd twitter_api
.\mvnw.cmd spring-boot:run
```

Linux / macOS:

```bash
cd twitter_api
./mvnw spring-boot:run
```

The frontend connects to the backend at `http://localhost:9000/twitter`.

### 2) Install frontend dependencies

Go to the project folder:

```bash
cd TwitterReact
npm install
```

### 3) Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```
- Starts the Vite development server.

```bash
npm run build
```
- Creates a production build in the `dist/` directory.

```bash
npm run preview
```
- Serves the production build locally for preview.

```bash
npm run lint
```
- Runs Oxlint to check code quality.

## Routes

The app uses the following main routes:

| Route | Description | Access |
| --- | --- | --- |
| `/login` | Sign in to an existing account | Public |
| `/register` | Create a new account | Public |
| `/` | Main tweet feed and interactions | Requires login |

### Redirect behavior

- Users who are not signed in cannot access `/`.
- `App.jsx` uses `Navigate` to redirect them to `/login`.
- On logout, `clearAuth()` is called and the user state is cleared.

## API Integration

The frontend uses a shared Axios instance defined in `src/data/api.jsx`.

```js
const api = axios.create({
  baseURL: "http://localhost:9000/twitter",
});
```

### Authentication flow

After a successful login, the following method is used:

```js
setAuth(username, password)
```

This attaches the username and password to the Axios client as HTTP Basic Auth credentials. On logout, the app calls:

```js
clearAuth();
```

which removes the auth information.

### Backend endpoints used

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Authenticate a user |
| `GET` | `/tweet` | Fetch all tweets |
| `GET` | `/tweet/findByUserId?userId={id}` | Fetch tweets for a user |
| `POST` | `/tweet` | Create a new tweet |
| `GET` | `/retweet/mine` | Fetch the current user's retweets |
| `POST` | `/retweet` | Retweet or undo a retweet |
| `GET` | `/reaction?tweetId={id}` | Get the current user's reaction to a tweet |
| `POST` | `/like?tweetId={id}` | Like a tweet or update the reaction |
| `POST` | `/dislike?tweetId={id}` | Dislike a tweet or update the reaction |
| `GET` | `/comment/findByTweetId?tweetId={id}` | Fetch comments for a tweet |
| `POST` | `/comment?tweetId={id}` | Add a comment |

### Changing the backend URL

If you want to point the frontend to a different backend server:

- Update `baseURL` in `src/data/api.jsx`
- Update the registration endpoint in `src/components/SignUp.jsx`

## App Flow

### 1. Sign up

The registration form collects the following fields:

- firstName
- lastName
- username
- email
- password

These values are sent to the backend through `POST /auth/register`.

### 2. Log in

The login form collects the username and password. After a successful login:

- `api.defaults.auth` is set with the username and password
- the user info is passed to the app state in `App.jsx`
- the user is redirected to `/`

### 3. Feed and interactions

When the home page loads:

- all tweets are fetched
- the user's retweets are loaded
- the list is filtered based on the selected tab: `All Tweets` or `My Tweets`

From the tweet card, the user can:

- expand or collapse comments
- add a comment
- retweet or undo retweet
- like or dislike a tweet
- view relative timestamps

## Customization and Notes

- This repository contains only the frontend; data and user operations are stored and handled by the backend.
- The app depends on the backend response structure, field names, and endpoint paths matching the frontend expectations.
- The project currently uses hardcoded localhost values instead of environment variables such as `.env`.
- Profile images and icons are loaded from the `public/` folder.

## Development Notes

This project is built as a fast prototype and learning-oriented frontend for a social media application. It currently uses:

- single-page architecture
- client-side routing
- React state management
- Axios-based backend integration
- form validation with `react-hook-form`

## Troubleshooting

### Backend is not running

- Make sure PostgreSQL is running.
- Check the username, password, and database name in `application.properties`.
- Confirm the backend is reachable at `http://localhost:9000/twitter`.

### Frontend is not running

- Run `npm install` first.
- If the port is occupied, Vite may automatically switch ports.
- Use the URL shown in the terminal output from Vite.

### Authentication problems

- Make sure the username and password are correct after registration.
- If the backend returns `401` or a similar error, the credentials may be wrong.
- Check the `baseURL` value in `src/data/api.jsx`.

## Summary

This project demonstrates the core features of a Twitter-like app using a modern React frontend. It focuses on:

- user registration and session handling
- social media feed interactions
- API integration with a Spring Boot backend
- a simple frontend architecture for learning and rapid iteration

If you want, I can also convert this into a more polished version with:

- bilingual English/Turkish README
- screenshot-based usage guide
- feature matrix and screen flow diagram
- API response examples
- platform-specific installation commands for Windows and Linux
