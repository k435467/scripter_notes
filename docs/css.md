---
sidebar_position: 5
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