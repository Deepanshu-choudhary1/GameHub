# GameHub Setup and Run Guide

## Prerequisites

- Node.js (recommended LTS version)
- npm (bundled with Node.js)
- Expo CLI installed globally (optional but recommended)
  - Install with: `npm install -g expo-cli`
- A web browser for web preview
- Android/iOS device or simulator if you want to run mobile builds

## Install Dependencies

1. Open a terminal at the project root

2. Install project dependencies:
   ```bash
   npm install
   ```

## Run the App

### Web

Start the Expo development server for web:

```bash
npm run web
```

Then open the local URL shown in the terminal, typically `http://localhost:19006`.

### Expo Developer Tools

Start the standard Expo development workflow:

```bash
npm start
```

This launches Expo Developer Tools in the browser, where you can choose Web, Android, or iOS.

### Android

If you have an Android device or emulator connected, run:

```bash
npm run android
```

### iOS

If you are on macOS with Xcode installed, run:

```bash
npm run ios
```

## Reset Project

If you need to reset the project state or clear caches, use:

```bash
npm run reset-project
```

## Notes

- This app is built with Expo and React Native Web.
- The main app entry is `App.js`.
- Screen components are located in `src/screens/`.
- Navigation is configured in `src/navigation/BottomTabs.js`.
- Shared game state lives in `src/context/GameContext.js`.

## Troubleshooting

- If Expo prompts to install ESLint or other optional packages, you can skip it unless you want linting support.
- If the development server fails on port conflicts, stop other running servers or change the port in the Expo CLI settings.
- If dependency issues occur, delete `node_modules` and run `npm install` again.
