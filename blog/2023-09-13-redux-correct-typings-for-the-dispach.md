---
slug: redux-correct-typings-for-the-dispatch
title: Redux Correct Typings for Dispatch
authors: ethan
tags: [redux, typescript, dispatch, middleware]
---

TLDR: use `concat` instead of spread operator.

[Ref](https://redux-toolkit.js.org/usage/usage-with-typescript#correct-typings-for-the-dispatch-type). 

> As TypeScript often widens array types when combining arrays using the spread operator, we suggest using the .concat(...) and .prepend(...) methods of the MiddlewareArray returned by getDefaultMiddleware().

<!--truncate-->

```ts {11-23}
import { configureStore } from '@reduxjs/toolkit'
import additionalMiddleware from 'additional-middleware'
import logger from 'redux-logger'
// @ts-ignore
import untypedMiddleware from 'untyped-middleware'
import rootReducer from './rootReducer'

export type RootState = ReturnType<typeof rootReducer>
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        // correctly typed middlewares can just be used
        additionalMiddleware,
        // you can also type middlewares manually
        untypedMiddleware as Middleware<
          (action: Action<'specialAction'>) => number,
          RootState
        >
      )
      // prepend and concat calls can be chained
      .concat(logger),
})

export type AppDispatch = typeof store.dispatch

export default store
```