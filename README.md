# React Native Progress Ring 🛟📈✅

<!-- [![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)]()
![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS%20%7C%20Web-brightgreen.svg?style=for-the-badge&colorB=191A17)
[![Version](https://img.shields.io/npm/v/react-native-timer-picker.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-timer-picker)
[![npm](https://img.shields.io/npm/dt/react-native-timer-picker.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-timer-picker) -->

A performant, simple, flexible circular progress ring component for React Native apps 🔥

Great for progress indicators, goals and countdown timers 📈🏆⏳

Works with Expo and bare React Native apps.

- [Demos 📱](#demos-)
- [Peer Dependencies 👶](#peer-dependencies-)
- [Installation 🚀](#installation-)
- [Examples 😎](#examples-)
    - [Progress Ring (Dark Mode) 🌚](#progress-ring-dark-mode-)
    - [Progress Ring (Light Mode) 🌞](#progress-ring-light-mode-)
- [Props 💅](#props-)
    - [ProgressRing ⏲️](#progressring-️)
        - [Custom Styles 👗](#custom-styles-)
- [Methods 🔄](#methods-)
- [License 📝](#license-)

<br>

## Demos 📱

<br>

## Peer Dependencies 👶

This component **only requires one peer dependency** to work in your React Native Project:

-   [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/)

<br>

## Installation 🚀

Supports React Native >= 0.59.0 and React >= 16.8.0.

Just run:

```bash
npm install react-native-progress-ring
```

or

```bash
yarn add react-native-progress-ring
```

**Remember to follow the installation instructions for react-native-reanimated if you do not already have it installed.**

<br>

## Examples 😎

### Progress Ring (Dark Mode) 🌚

```jsx

```

<!-- <img src="demos/example1.gif" width="250" height="550"/> -->

### Progress Ring (Light Mode) 🌞

```jsx

```

<!-- <img src="demos/example2.gif" width="250" height="550"/> -->

<br>

## Props 💅

### ProgressRing ⏲️

#### Custom Styles 👗

The following custom styles can be supplied to re-style the component in any way. Various styles are applied by default - you can take a look at these [here](src/components/ProgressRing/ProgressRing.styles.ts).

<br>

## Methods 🔄

The library exposes a ProgressRingRef type, which can be used to type your ref to the picker:

```javascript
const progressRingRef = useRef<ProgressRingRef>(null);
```

It has the following available methods:

`reset` - imperative method to reset the progress ring to its initial state. The `startInPausedState` option defines whether the animation will play when this is called. If that option is not defined, it will fall back to the `startInPausedState` prop (if defined).

```javascript
progressRingRef.current.reset(options?: { startInPausedState?: boolean });
```

<br>

## Contributing 🧑‍🤝‍🧑

Contributions to this project are more than welcome.

### Dev Setup

To get this project running locally:

1. Clone the Git repo.
2. Run `yarn` to install the base dependencies
3. Run `yarn setup` from the project root (this installs the example's additional dependencies)
4. Run `yarn start` to start the example in Expo Go.
5. Start adding cool stuff! Your changes should be immediately reflected in the Expo Go app.

You can also run the library in bare React Native:
1. Clone the Git repo.
2. Run `yarn` to install the base dependencies
3. Run `yarn setup-dev`.
4. Run `yarn start-bare:android` or `start-bare:ios` to start the project on an emulator/device.

### GitHub Guidelines

There are two permenant branches: `main` and `develop`. You should never work directly on either of these branches.

1. Create a new branch off `develop` for your work using the pattern `feature/{DESCRIPTION}`.
2. When you think your work is ready for review, submit a PR from your branch back to `develop`.
3. Once the PR is resolved, your work will be merged into `develop`, and will be included in the next major/minor release.

<br>

## License 📝

This project is licensed under the [MIT License](LICENSE).
