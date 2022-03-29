# react-ts-boilerplate

[![TypeScript](./.github/typescript.png)](https://www.typescriptlang.org/)
[![React](./.github/react.png)](https://github.com/facebook/react)
[![Redux](./.github/redux.png)](https://github.com/reactjs/redux)

## Libraries

This boilerplate uses the following libraries and tools:

#### Core

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://github.com/facebook/react) & [React DOM](https://github.com/facebook/react) for views.
- [Router5](https://github.com/router5) handles in-app routing.
- [Redux](https://github.com/reactjs/redux) manages application state.
- [React Redux](https://github.com/reactjs/react-redux) to use React-Redux bindings.
- [React Redux Form](https://github.com/davidkpiano/react-redux-form) to use redux with form bindings.
- [React Router5](https://github.com/router5) & [Redux-Router5](https://github.com/router5) integrate router5 with react
  and redux.

#### Utilities

- [Redux Thunk](https://github.com/reduxjs/redux-thunk) makes side effects (i.e. asynchronous things like data fetching
  and impure things like accessing the browser cache) in React/Redux applications easier and better.

#### Build System

- [Webpack](https://github.com/webpack/webpack) for bundling.
- [TS Loader](https://github.com/TypeStrong/ts-loader) as ts loader.
- [React Hot Loader](https://github.com/gaearon/react-hot-loader) provides hot reload capability to our development
  server
- [File Loader](https://github.com/webpack/file-loader)
- [URL Loader](https://github.com/webpack/url-loader)
- [Manifest Plugin](https://github.com/danethurber/webpack-manifest-plugin)
- [TS Lint Loader](https://github.com/wbuchwalter/tslint-loader) for using tslint as preloader on build process.

#### Dev & Prod Server

- [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware)
- [Webpack Hot Middleware](https://github.com/webpack/webpack-hot-middleware)

#### Developer Experience

- [ESLint](https://github.com/eslint/eslint) for linting.
- [Typescript ESLint](https://github.com/typescript-eslint/typescript-eslint) enables ESLint to support TypeScript.
- [Redux Logger](https://github.com/theaqua/redux-logger)
- [Redux DevTools](https://github.com/gaearon/redux-devtools)

#### Testing

- [Jest](https://github.com/facebook/jest) as test runner.
- [TS Jest](https://github.com/kulshekhar/ts-jest) as Jest preprocessor
- [Enzyme](https://github.com/airbnb/enzyme) for rendering React Components.
- [Jest Enzyme](https://github.com/blainekasten/enzyme-matchers) for asserting React Components.

## Directory Structure

```bash
.
├── build                       # Built, ready to serve app.
├── node_modules                # Node Packages.
├── src                         # Source code.
│   ├── __tests_                # Test cases container folder.
│   │ ├── views                 # Test cases for files under view folder.
│   │ ├── components            # Test cases for base components under components folder.
│   ├── actions                 # Redux actions.
│   ├── assets                  # Container folder for asset files.
│   │ ├── audios                # Container folder for audio files.
│   │ ├── fonts                 # Container folder for font files.
│   │ ├── icons                 # Container folder for icon files.
│   │ ├── images                # Container folder for image files.
│   │ ├── videos                # Container folder for video files.
│   ├── constants               # Constants folder.
│   ├── middleware              # Redux middlewares.
│   ├── models                  # Base models.
│   ├── reducer                 # Redux reducer files container.
│   ├── store                   # Redux store, contains global app state.
│   ├── styles                  # Base folder for base styles.
│   ├── typings                 # Typing interface.
│   ├── utils                   # Utility methods.
│   ├── views                   # Page-like Components.
│   ├── App.tsx                 # Main app file.
│   ├── index.tsx               # Root level index file.
│   ├── setupEnzyme.tsx         # Enzyme setup file.
├── .babelrc                    # Babel setting s for transpiler.
├── .gitignore                  # Tells git which files to ignore.
├── .prettierrc                 # Rules for prettier linter.
├── interfaces.ts               # Immutable interface.
├── package.json                # Package configuration.
├── package-lock.json           # Package lock.
├── tsconfig.json               # TypeScript transpiler configuration.
├── tslint.json                 # Configures tslint.
├── README.md                   # This file.
├── tsconfig.json               # TypeScript transpiler configuration.
└── webpack.config.js           # Webpack configuration.
```

## Installation

You can clone from this repository and use master

```bash
$ git clone https://github.com/amankr308/react-ts-boilerplate
$ cd react-ts-boilerplate
$ npm install
```

## Usage

All commands defaults to development environment. You can set `NODE_ENV` to `production` or use the shortcuts below.

```bash
# Running

$ npm start # This starts the app in development mode

# Building

$ npm run build # This builds the app in development mode

# Testing
$ npm run test # This runs the test cases
$ npm run test:watch # This runs the test cases in watch mode
```

#### Sentry

Create main.local.js in config folder and export an object that has `sentry` key like so:

```
module.exports = {
  sentry: {
    dsn: YOUR_DSN,
    release: YOUR_RELEASE_VERSION
  }

  // other configs
  ...
}
```
