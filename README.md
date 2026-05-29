# Betty Digital Dental Solutions Frontend

React and Vite frontend for Betty Digital Dental Solutions.

## Local Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Netlify

Netlify uses `netlify.toml`:

- Build command: `npm ci && npm run build`
- Publish directory: `dist`

Required environment variables:

```env
VITE_API_URL=https://betty-digital-dental-backend.vercel.app/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Vercel

Vercel uses `vercel.json`:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

Required environment variables are the same as Netlify.

Do not use `http://localhost:5000/api` in Vercel. The browser will try to call the visitor's own computer instead of your deployed backend.
