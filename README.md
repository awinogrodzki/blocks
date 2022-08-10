# Blocks monorepo

### Apps and Packages

- `api`: an `express.js` block api layer
- `web`: a [Next.js](https://nextjs.org) web app
- `domain`: a domain layer of the application used by both api and web client

Each package is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

```
npm install
```

### Build

To build all packages run

```
npm run build
```

### Start

To start both web client and api in parallel run

```
npm run start
```

### Test

```
npm run lint
npm run test
```
