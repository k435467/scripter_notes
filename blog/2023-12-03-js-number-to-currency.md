---
slug: js-number-to-currency
title: JS Number to Currency
authors: ethan
tags: [JavaScript, JS, number, currency, Intl]
---

```ts
/**
 * @example
 * currencyFormat(89900) // returns '$89,900'
 */
const currencyFormat = (value: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(value)
}
```

[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

:::danger

Use native `Intl` in React Native would cause an error on Android 13.
Therefore, use the [**intl package**](https://www.npmjs.com/package/intl) instead.

```ts
import 'intl'
import 'intl/locale-data/jsonp/en'
// Use as the same as the native `intl` below
//...
```

:::
