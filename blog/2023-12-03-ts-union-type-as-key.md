---
slug: ts-union-type-as-key
title: TS Union Type as Key
authors: ethan
tags: [TS, TypeScript, union, key]
---

```ts
type UnionType = 'foo' | 'bar'

type ExampleType = {
  [key in UnionType]: string
}
```
[Union type as key in interface?](https://stackoverflow.com/questions/55023610/union-type-as-key-in-interface)
