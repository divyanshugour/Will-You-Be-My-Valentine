# Will You Be My Valentine — React (Vite) + Firebase

A romantic Valentine's web app with animated hearts, custom message sharing, and Firebase backend.

## Features

- 💖 Interactive "Will You Be My Valentine?" page with animated hearts
- 🎉 Create custom Valentine messages with form
- 🔗 Share unique links with recipients
- 📲 View received Valentines with Yes/No interaction

## Setup

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Realtime Database** (create in US region, test mode)
4. Go to Project Settings and copy your Web SDK credentials
5. Create `.env.local` file in the root (copy from `.env.example`):

```
REACT_APP_FIREBASE_API_KEY=xxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxx
REACT_APP_FIREBASE_DATABASE_URL=xxx
REACT_APP_FIREBASE_PROJECT_ID=xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxx
REACT_APP_FIREBASE_APP_ID=xxx
```

### 2. Install & Run

```bash
npm install
npm run dev
```

### 3. Build for Production

```bash
npm run build
npm run preview
```

## Deployment on Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel settings (from `.env.local`)
4. Deploy!

Build command: `npm run build`
Output directory: `dist`

## Usage

- Visit home page and click "Yes" to see celebration
- Click "Create Your Own Valentine" to make a custom message
- Fill form with name, day, optional image, and message
- Copy the generated link to share with your valentine
- When they open the link, they see your message and can respond

# will-you-be-my-valentine