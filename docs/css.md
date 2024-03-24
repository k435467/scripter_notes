---
sidebar_position: 2
---

# CSS

Some CSS tricks. Demos use tailwindCSS.

## Scroll Margin

`scroll-mt-1` is useful for extra spacing when scroll to a anchor. see also `scroll-pt-1`.

## Auto Grid

`grid grid-flow-col auto-cols-fr`

## Alternative for `aspect-ratio`

```html
<div className='relative w-full pb-[56.25%]'>
  <div className='absolute inset-0'>
    <img width='100%' height='100%' src="https://picsum.photos/200/300" alt="black dog" />
  </div>
</div>
```

## Emotion

[Ref](https://stackoverflow.com/a/72421565/20943696). Emotion style got error:

> You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).

solved by adding at the top of the file: `/** @jsxImportSource @emotion/react */`

[emotion/react](https://emotion.sh/docs/@emotion/react)
