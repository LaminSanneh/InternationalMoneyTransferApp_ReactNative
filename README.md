# Project Name: Springboot and ReactNative Money Transfer Android Mobile and Web Application

# This repo is the React Native Fromtend android app
## Other Component Repos can be found below

## Important Links
Java Springboot Backend Repository is here: [here](https://github.com/LaminSanneh/international-money-transfer-app-springboot-backend.git)

React Web Frontend Lives here: [here](https://github.com/LaminSanneh/international-money-transfer-app-react-frontend.git)

## Project Status: Work In Progress

## Functional Requirement Items (some in the workings)
- Create new transaction
- See Transactions list
- On Homepage, see a limited (3) number of recent transactions which reuses the same component above
- Update User profile
- Login and Logout Functionality
- Registration Functionality

## Technical Requirement Items (some in the workings)
- Setup detox library for end to end testing
- Secure auth token storage on frontend. Currently stored as plaintext - WIP
- Centralize and make better the error handling from bacend api calls - WIP
- Add token refresh mechanism or detect when it is expired or invalidated - WIP

## Highlighted Technical Aspects and Technologies Used
- Used [React Redux Toolkit](https://redux-toolkit.js.org/) along with redux-persist for storing data for offline usage
- Used [react-native-paper](https://callstack.github.io/react-native-paper) library for the ui styling
- Used [react-navigation](https://reactnavigation.org/)
- Used [Typescript](https://www.typescriptlang.org/)
- Used [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv) for multi environment variable managemment
- Used [axios](https://axios-http.com/docs/intro) for http calls

# React Native Screens
<img src="readme-images/home-screen.png" alt="home-screen.png" width="200" />
<img src="readme-images/new-transaction.png" alt="new-transaction" width="200" />
<img src="readme-images/new-transaction2.png" alt="new-transaction-2" width="200" />
<img src="readme-images/transaction-history.png" alt="transaction-history" width="200" />
<img src="readme-images/update-profile.png" alt="update-profile" width="200" />
<img src="readme-images/logout.png" alt="logout" width="200" />

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


## Backend Repo can be found here
[https://github.com/LaminSanneh/international-money-transfer-app-springboot-backend](https://github.com/LaminSanneh/international-money-transfer-app-springboot-backend)

## Website Frontend Repo can be found here
[https://github.com/LaminSanneh/international-money-transfer-app-react-frontend](https://github.com/LaminSanneh/international-money-transfer-app-react-frontend)

## React Native Mobile App Repo can be found here
[https://github.com/LaminSanneh/InternationalMoneyTransferApp_ReactNative](https://github.com/LaminSanneh/InternationalMoneyTransferApp_ReactNative)
