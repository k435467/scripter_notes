---
sidebar_position: 2
---

# Sentry

Near real-time monitoring and see the results in a minute (except in batches).

:::caution

In performance monitoring, auto collection will treat a HTTP request as a **span** instead of a **transaction**. See the [doc](https://docs.sentry.io/product/sentry-basics/tracing/distributed-tracing/) and [stack overflow](https://stackoverflow.com/questions/77181741/sentry-dio-integration-not-auto-collecting-http-request-tracing-data-in-flutter).

:::

1. Add packages.

```yaml
sentry_flutter: ^7.10.1
sentry_dio: ^7.10.1
dio: ^5.3.3
```

2. Init Sentry.

```dart
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:sentry_dio/sentry_dio.dart';
import 'package:sentry_flutter/sentry_flutter.dart';

Future<void> main() async {
  await SentryFlutter.init(
    (options) {
      options.dsn = '<my dsn>';
      options.tracesSampleRate = 1.0;
    },
    appRunner: () => runApp(MyApp()),
  );
}
```

3. Create a test button.

```dart
FilledButton(
  onPressed: () async {
    final transaction = Sentry.startTransaction('POST /post_ok', 'http');

    try {
      final dio = Dio();
      dio.addSentry();

      final response =
          await dio.post('http://localhost:3000/post_ok');
      print(response);
    } catch (e) {
      transaction.throwable = e;
      transaction.status = SpanStatus.internalError();
    }

    transaction.finish();
  },
  child: const Text('TEST PERFORMANCE'),
),
```
After above setup, we can see the following data in the breadcrumbs of a transaction or an issue.

```json
POST http://localhost/post_ok [200]
{
  duration: 0:00:00.041514, 
  reason: OK, 
  response_body_size: 63
}
```

We can init Sentry condition on `kReleaseMode == true`.