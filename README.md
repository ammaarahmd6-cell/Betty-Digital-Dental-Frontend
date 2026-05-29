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
VITE_API_URL=https://your-render-backend-url.onrender.com/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
