This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Password Generator
- A password generator built with React and Next.js.
    - Create Random Password
    - Create a Memorable Password
    - Create a PIN Password

# Demo
### https://www.microtekblue.com/password-generator

#### Author: Asim Ahmad
#### Github: https://github.com/microtekblue

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

Open [http://localhost:3000/password-generator](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deploy on Custom Server

### server.js

- Requires Node.js Server
- Run: 
  ```
  node server.js 
  ```

### Apache Configuration

####

```
ProxyPass /password-generator http://localhost:3000/password-generator
ProxyPassReverse /password-generator http://localhost:3000/password-generator
```

#### Next.js 12 uses websocket
```
<Location /password-generator/_next/webpack-hmr>
RewriteEngine On
RewriteCond %{QUERY_STRING} transport=websocket [NC]
RewriteCond %{HTTP:Upgrade} websocket [NC]
RewriteCond %{HTTP:Connection} upgrade [NC]
RewriteRule /password-generator/(.*) ws://localhost:3000/password-generator/_next/webpack-hmr/$1 [P,L]
ProxyPass ws://localhost:3000/password-generator/_next/webpack-hmr retry=0 timeout=30
ProxyPassReverse ws://localhost:3000/password-generator/_next/webpack-hmr
</Location>
```

