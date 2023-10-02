---
sidebar_position: 1
---

# Firebase

## Delay & Debug View

>To give an overview, usually, the initial data logged usually takes up to **24 hours** to display and 3-4 hours delay for the succeeding data.

Use debug view to see the events in roughly **5~10 minutes** delay after enabling the debug mode.

[Debug View Doc](https://firebase.google.com/docs/analytics/debugview). 

- Android
  - `adb shell setprop debug.firebase.analytics.app PACKAGE_NAME`. Check `android/app/build.gradle` in a Flutter project and look up the `namespace` to fill the `PACKAGE_NAME`.
  - ```xml title='android/app/src/profile/AndroidManifest.xml'
    <meta-data
      android:name="firebase_performance_logcat_enabled"
      android:value="true" />
    ```
- iOS - [Ref](https://stackoverflow.com/questions/61976267/enabling-debug-mode-for-firebase-analytics-for-flutter).

## Performance Monitoring

By 2023/09. **Not sure**, but it seems that the Flutter official HTTP package is **not supported** for auto-collection. The requests are not listed in the network request section. On the other hand, it did show the app's start time.

The reply from Firebase support:

>Hi Ethan,
>
>Alvin here. I’ll be handling this case.
>
>If my understanding is correct, there seems to be an issue with your integration of Firebase Performance SDK in your Flutter app since network traces are not  being collected or displayed. Let's see what I can do to help you resolve this.
>
>Could you try the following troubleshooting steps and see if these will solve the issue:
>Confirm if you've run 'flutterfire configure' after adding the Performance Monitoring Gradle plugin in your app. Please refer to his link for details.
>Make sure that you're using the latest SDK version of Performance Monitoring for Flutter. You can check it out here.
>Confirm if you're using a supported library to make network requests. Do note that we currently support:
>Apache HttpClient
>OKHttp 3.X
>HttpURLConnection
>In addition, you can check this documentation to learn more about HTTP/S network request performance data. 
>
>If the issue persists, could you share with me the following so I can have a better view of the issue you're experiencing:
>google-services.json file
>Log messages for performance events. You may follow the instructions mentioned in this link.
>Let me know how it goes.
>
>Regards,
>Alvin
