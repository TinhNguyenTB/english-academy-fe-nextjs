# EngLearn FE

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 1. Requirements

- Node.js >= 18
- npm, yarn, pnpm, or bun (choose one)
- Git

## 2. Getting Started

Clone the repository:

```bash
git clone https://github.com/TinhNguyenTB/english-academy-fe-nextjs.git
cd englearn-fe
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## 3. Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 4. Building and Running in Production

Build the app:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 5. Project Structure

- `src/`  
  Main source code for the frontend application.
  - `components/` – Reusable React components (buttons, forms, layouts, etc.)
  - `hooks/` – Custom React hooks for logic reuse
  - `services/` – API calls and service logic
  - `constants/` – Application-wide constants and enums

- `public/`  
  Static assets such as images, icons, and fonts. Files here are served directly at the root URL.

- `messages/`  
  Localization files for supporting multiple languages (i18n).

- `.env.*`  
  Environment variable files for different environments (development, production, etc.).

## 6. Guidelines for New Contributors

- Always create a new branch for each feature or bugfix.
- Run lint checks before committing code:
  ```bash
  npm run lint
  ```
- Read any documentation or `README.md` files inside each folder.
- If you encounter errors, check your Node.js version and installed packages.
- Update this `README.md` if you add new folders or major features.

## 7. References

- [Next.js Documentation](https://nextjs.org/docs)
- [Ant Design](https://ant.design/)
- [React Query](https://tanstack.com/query/latest)

---

For questions, contact the project leader or open an issue on
