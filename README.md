# Battlesnake JavaScript Starter Project

### An official Battlesnake template written in JavaScript. Get started at [play.battlesnake.com](https://play.battlesnake.com).

![Battlesnake Logo](https://media.battlesnake.com/social/StarterSnakeGitHubRepos_JavaScript.png)

This is a Battlesnake project built with modern best practices including code linting, formatting, testing, CI workflows, and cloud deployment using Railway.

---

## 🛠 Technologies Used

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Railway](https://railway.app/) for deployment
- Code quality tools:
  - [Prettier](https://prettier.io/) for automatic formatting
  - [EditorConfig](https://editorconfig.org/) for consistent styling
  - [ESLint](https://eslint.org/) with:
    - `eslint-config-prettier`
    - `eslint-plugin-sonarjs`
    - `eslint-plugin-unicorn`
    - `eslint-plugin-eslint-comments`
- [Jest](https://jestjs.io/) for testing

---

## 🚀 Deployment

This Battlesnake is deployed using [Railway](https://railway.app/). No local server setup is required.

### 🔗 Live Endpoint

After deployment, Railway provides a public URL for your Battlesnake. Use this URL when registering your snake on [play.battlesnake.com](https://play.battlesnake.com).

### 🧭 Deploy Instructions

1. Go to [Railway](https://railway.app/) and create a new project.
2. Connect your GitHub repository (`ggacaferi/    software-development`).
3. Set the following:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Deploy the project.
5. Copy the generated public URL and use it on the Battlesnake website.

To manually deploy locally with Railway CLI:

```bash
railway up
```

---

## 🧹 Code Quality

This project uses ESLint and Prettier to maintain clean and consistent code.

### ▶️ Format Code (Prettier)

```bash
npm run format
```

To format your code using Prettier.

### ▶️ Lint Code (ESLint)

```bash
npm run lint
```

To check for lint issues.

```bash
npm run lint:fix
```

To automatically fix lint issues.

---

## 🧪 Testing

This project uses [Jest](https://jestjs.io/) for unit testing.

### ▶️ Run Tests

```bash
npm test
```

Runs the test suite and shows test coverage.

- ✅ Code coverage threshold: **50% minimum**
- Use this to validate any PR or change before pushing

---

## ⚙️ GitHub Actions Workflows

We use GitHub Actions to automate code quality and deployment tasks.

### 🔍 1. Lint Check

- **Workflows:** `Lint.yml`
- **Triggered on:** Pull requests targeting `main` or `develop`
- **What they do:** Run ESLint and Prettier to ensure code is properly linted and formatted

### ✅ 2. Test & Coverage

- **Workflow:** `Coverage.yml`
- **Triggered on:** Pull requests to `main` or `develop`
- **What it does:**
  - Runs all Jest tests
  - Verifies that code coverage is **≥ 50%**

### 🚀 3. Deploy to Railway

- **Workflow:** `Deployment.yml`
- **Triggered on:** Push to the `main` branch
- **What it does:**
  - Builds and deploys your Battlesnake to Railway

---

## 🛡 Dependabot

We use **Dependabot** for automatic security and dependency updates:

- Actively scans for vulnerabilities
- Creates pull requests to upgrade affected packages
- Pull requests are required to pass lint, format, and test checks

---

## 🔁 Developer Workflow Summary

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Format & Lint**
   ```bash
   npm run format
   npm run lint
   ```

3. **Run Tests**
   ```bash
   npm test
   ```

4. **Create a PR**
   - Target `develop` or `main`
   - CI will run tests, linting, formatting, and coverage checks

5. **Merge to `main`**
   - Deploys automatically to Railway

---

## 📘 Next Steps

- Edit `snakeLogic.js` to customize your Battlesnake’s strategy.
- Follow the Quickstart Guide to iterate and test your Battlesnake.
- Battle it out in the arena!
