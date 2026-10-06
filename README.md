# Abhijeet Kumar | Portfolio

A multi-page freelance developer portfolio built with Next.js 16, React 19, and TypeScript. It presents services, selected work, background, and a project enquiry form in a motion-led interface with light and dark themes.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Customizing the portfolio](#customizing-the-portfolio)
- [Contact form setup](#contact-form-setup)
- [Development and production](#development-and-production)
- [Deployment](#deployment)

## Features

- Home page with services, selected projects, process, testimonials, FAQs, and calls to action
- About page with biography, statistics, skills, and timeline
- Work page listing project links and technology tags
- Contact page with direct email/phone links, social profiles, and a Web3Forms enquiry form
- Responsive navigation with animated page transitions and a mobile menu
- Light/dark theme toggle with the preference saved in local storage
- Smooth scrolling, scroll-triggered reveals, custom pointer treatment, and a Three.js shader background
- Shared site metadata and reusable page components

## Technology

- [Next.js](https://nextjs.org/) App Router and React
- TypeScript for application components, with JavaScript data modules in `data/`
- Tailwind CSS 4
- GSAP and ScrollTrigger for motion, Lenis for smooth scrolling, and Motion for the mobile navigation
- Three.js for the interactive background shader
- Web3Forms for contact form submissions

## Requirements

- Node.js 20.9 or newer
- npm (the repository includes `package-lock.json`)

## Getting started

Clone the repository, install the locked dependencies, and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Next.js refreshes the page as files change.

The contact form requires a Web3Forms access key. Follow [Contact form setup](#contact-form-setup) to enable submissions. The rest of the portfolio can be run without configuring the form, but submitting an enquiry will fail until a valid key is set.

## Project structure

```text
app/
	page.tsx             Home page
	about/page.tsx       About page
	work/page.tsx        Selected work page
	contact/page.tsx     Contact page
	layout.tsx           Shared layout, fonts, and metadata
	globals.css          Theme tokens and global styles
components/            Navigation, animation, form, and page components
data/
	site.js              Name, role, contact details, navigation, and socials
	home.js              Home page copy, services, process, testimonials, and FAQs
	about.js             About page copy, skills, statistics, and timeline
	projects.js          Project list
	contact.js           Contact page copy and service options
```

The `@/*` import alias points to the repository root. Global layout elements such as navigation, footer, smooth scrolling, and background effects are composed in `app/layout.tsx`.

## Customizing the portfolio

Most personal content is kept separate from the page markup in `data/`:

1. Update `data/site.js` with the portfolio owner’s name, role, email, phone, location, short bio, navigation links, and social URLs. These details are used by the shared navigation, footer, contact page, and document metadata.
2. Update `data/home.js` with the home hero copy, technology list, services, process, FAQs, and real client testimonials. Remove or replace the sample testimonial text before publishing.
3. Update `data/about.js` with the biography, stats, skills, and experience timeline. Replace sample or placeholder details with accurate information.
4. Update `data/projects.js` with real project titles, summaries, tags, years, and live URLs. The home page shows the first three projects; the work page shows the complete list. The project links currently open in a new tab.
5. Update `data/contact.js` with the contact page heading, supporting text, availability, and service choices.
6. Adjust colors, typography tokens, and global behavior in `app/globals.css`. Page-specific layout and content composition live in the corresponding files under `app/` and `components/`.

The display and monospace fonts are loaded with `next/font/google` in `app/layout.tsx`, so a build needs network access to retrieve Google Fonts unless those font declarations are changed.

## Contact form setup

The client-side contact form posts directly to the Web3Forms API. To enable it:

1. Create an access key at [web3forms.com](https://web3forms.com/).
2. Copy `.env.example` to `.env.local` and replace the placeholder value:

   ```dotenv
   NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
   ```

3. Restart the development server after changing the environment file.
4. Submit a test enquiry and confirm that it reaches the email configured in Web3Forms.

`NEXT_PUBLIC_` variables are included in the browser bundle. Treat this as a public form access key, not as a private server secret; use Web3Forms’ domain restrictions or other available abuse protections when deploying. Do not commit `.env.local`. The contact page also displays direct email and phone links as an alternative.

## Development and production

Available npm scripts:

| Command         | Purpose                                                       |
| --------------- | ------------------------------------------------------------- |
| `npm run dev`   | Start the Next.js development server                          |
| `npm run build` | Create an optimized production build                          |
| `npm run start` | Serve the production build locally; run `npm run build` first |

There are currently no dedicated lint or test scripts defined in `package.json`. Before publishing, run a production build:

```bash
npm run build
npm run start
```

Then check the main routes (`/`, `/about`, `/work`, and `/contact`) and test the contact form with the configured key.

## Deployment

This Next.js app can be deployed to Vercel or another platform that supports Next.js:

1. Push the repository to your Git provider and import it into the hosting platform.
2. Use the standard Next.js build command, `npm run build`.
3. Add `NEXT_PUBLIC_WEB3FORMS_KEY` to the deployment environment if the contact form should accept submissions.
4. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin (currently `https://abhijeet-tech.vercel.app`). When moving to a custom domain, update this value to the final HTTPS origin, configure the old Vercel URL to redirect to it, and redeploy.
5. Add the production domain to Google Search Console, verify ownership, and submit `https://your-domain/sitemap.xml`. Request indexing for the important pages after checking their live URL inspection results.
6. Verify the metadata, canonical URLs, social preview, social links, project URLs, and a real form submission after deployment.

No database or application server credentials are required by the current project.

The app generates page-specific titles and descriptions, structured data for the portfolio owner and website, a social sharing image, and crawlable `robots.txt` and `sitemap.xml` routes. Search rankings depend on many factors beyond on-page setup, including useful original content, links, competition, and indexing; metadata alone cannot guarantee a position.
