# Exclusive Online Store

## Run locally

1. Copy `.env.example` to `.env`.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.

## Deploy to Vercel

1. Import this repository into Vercel.
2. Keep the project root at the repository root.
3. Add the environment variable `VITE_API` with the backend URL: `https://store-beckend-exam4.onrender.com`.
4. Deploy. Vercel uses `npm run build` and publishes the `dist` folder.

The `vercel.json` rewrite supports direct navigation and refresh on React Router routes.
