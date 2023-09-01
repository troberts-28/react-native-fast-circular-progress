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
    - [Circular Progress (Dark Mode) 🌚](#circular-progress-dark-mode-)
    - [Circular Progress (Light Mode) 🌞](#circular-progress-light-mode-)
- [Props 💅](#props-)
    - [CircularProgress ⏲️](#circularprogress-️)
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

### Circular Progress (Dark Mode) 🌚

```jsx

```

<!-- <img src="demos/example1.gif" width="250" height="550"/> -->

### Circular Progress (Light Mode) 🌞

```jsx

```

<!-- <img src="demos/example2.gif" width="250" height="550"/> -->

<br>

## Props 💅

### CircularProgress ⏲️

#### Custom Styles 👗

The following custom styles can be supplied to re-style the component in any way. Various styles are applied by default - you can take a look at these [here](src/components/CircularProgress/CircularProgress.styles.ts).

<br>

## Methods 🔄

The library exposes a CircularProgressRef type, which can be used to type your ref to the picker:

```javascript
const circularProgressRef = useRef<CircularProgressRef>(null);
```

It has the following available methods:

`reset` - imperative method to reset the progress ring to its initial state. The `startInPausedState` option defines whether the animation will play when this is called. If that option is not defined, it will fall back to the `startInPausedState` prop (if defined).

```javascript
circularProgressRef.current.reset(options?: { startInPausedState?: boolean });
```

<br>

## License 📝

This project is licensed under the [MIT License](LICENSE).
