---
sidebar_position: 9
---

# React Native

## Tools

- **react-native-snap-carousel**
- **react-native-auto-height-image**

## Animation

Stop an animation.

> If the animation is done because `stop()` was called on it before it could finish (e.g. because it was interrupted by a gesture or another animation), then it will receive `{finished: false}`.


```jsx
const MyComponent = () => {
  // ...

  // highlight-next-line
  const closeMsgAnim = useRef(null)

  const showMsg = () => {
    // Open msg
    Animated.timing(height, {
      duration: 400,
      toValue: 38,
      useNativeDriver:false,
    }).start(() => {
      // highlight-start
      // Stop previous animation
      if (closeMsgAnim.current) {
        closeMsgAnim.current.stop()
      }
      // highlight-end

      // Close msg
      const anim = Animated.timing(height, {
        delay: 2000,
        duration: 400,
        toValue: 0,
        useNativeDriver: false
      })
      // highlight-start
      closeMsgAnim.current = anim
      anim.start(({finished}) => {
        if(finished) {
          // highlight-end
          // Clean up
          dispatch({type: CLEAR})
        }
      })
    })
  }
  
  // ...
}
```

## MISC.

### `Intl` Error in Android 13

Use native `Intl` in React Native would cause an error on Android 13.
Therefore, use the [**intl package**](https://www.npmjs.com/package/intl) instead.

```ts
import 'intl'
import 'intl/locale-data/jsonp/en'
// Use as the same as the native `intl` below
//...
```