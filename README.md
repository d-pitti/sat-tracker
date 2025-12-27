## SAT-TRACKER

Web app built wit React, Next.JS, Tailwind, and React-Flowbite components. 

Displays a list of current information for Satellites in orbit and subsets alike. Listed info is formatted as TLE (Two Line Element) for each given name. All fields are editable except for object name. 

*Screen shot of Main page:*
![sat-tracker main page](https://github.com/d-pitti/sat-tracker/blob/main/public/Screenshot%20sat-tracker.png)

## API WARNING

° Since the data is coming from an external source, an account will need to be set up in order for the app to run. https://www.space-track.org<br/>

­° There are rules for running the api call, *you will lose access and privilages if the rules are not followed!* API's can only be called once every hour 
   </t></t> for tle's. So please be kind and follow the guidelines.<br/>

° Create an .env for credentials and link with *Config.ts files.<br/> 

## Future TO-DO's 

* Implement robust Authentication wihtin the application
* Implement a mult-tiered user schema database
* restrict some functionality for general users.
* set time limit for API call to max times per day

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
