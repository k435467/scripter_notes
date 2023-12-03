---
sidebar_position: 9
---

# React Native

## Tools

- **react-native-snap-carousel**
- **react-native-auto-height-image**

## Animation

Stop an animation.

> If the animation is done because `stop()` was called on it before it could finish (e.g. because it was interrupted by
> a gesture or another animation), then it will receive `{finished: false}`.

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
      useNativeDriver: false,
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
        if (finished) {
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

## Env Variable

For ECPay and TapPay env

1. define two plist: `info.plist`, `info.prod.plist`
2. Xcode > Build Settings > Packaging > Use different plist file on debug and release

## iOS Simulator Debug

1. Use an iOS simulator to open a website in Safari
2. Use Safari(Desktop) to open the **Development** menu. Click the simulator and the website to open debugger

## Release

Three options:

1. Microsoft CodePush
2. Apple App Store
3. Google Play Store

### Microsoft CodePush

1. Run the
   script `react-native bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios' --assets-dest='./ios'`
2. Run the script `appcenter CodePush release-react -a <A> -t <T> -d Production`
3. Go to App Center > The app > Distribute > CodePush
4. Select and edit the bundle. Switch on the `Enable`, `Required Update` then click done

### Apple App Store

1. Select project > change build version
2. Open the Xcode **Product** menu > **Archive**
3. Open the Xcode **Window** menu > **Organizer**. Find the archive and **Distribute App**
4. Go to App Store Connect > Test Flight. Download the app on mobile phone
5. Click **+ icon** in top left corner to create a new version. Click **Add to review** after edit the version info.
6. Go to **App Review** on the left side menu. Find the version and click **Submit**

### Google Play Store

1. Edit `app/build.gradle` and make sure the `default.versionName` matches. `defaultConfig.versionCode` + 1
2. Open Android Studio and click the elephant icon to **sync project with gradle files** in the top right corner
3. Click Android Studio **Build** menu and click **Generate Signed Bundle/APK**
4. Go to Google **Play Store Console**. 左側選單選擇'正式版' > 建立新版本 >
   上傳檔案 `android/app/release/app-release.apk` > 送審

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