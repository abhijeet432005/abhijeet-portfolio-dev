# Studio — freelance portfolio (Next.js 16)
1. `npm install`
2. Copy `.env.example` to `.env.local`, add a free access key from https://web3forms.com
3. Edit `lib/site.ts` (name, email) and the copy in `app/page.tsx`
4. `npm run dev` -> http://localhost:3000
5. Deploy: push to GitHub, import in Vercel, add `NEXT_PUBLIC_WEB3FORMS_KEY` env var.
