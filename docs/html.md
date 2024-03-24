---
sidebar_position: 13
---

# HTML

[Ref](https://stackoverflow.com/a/51507806). Prevent submit form by hitting enter.

```html
<form action="...">
  <!-- Prevent implicit submission of the form -->
  <button type="submit" disabled style="display: none" aria-hidden="true"></button>
  <!-- ... -->
  <button type="submit">Submit</button>
</form>
```
