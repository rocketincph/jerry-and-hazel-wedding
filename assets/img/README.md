# Images

Decorative art (roses, borders, flourishes) goes here.

Use it in `index.html` like this:

```html
<img class="decor" src="assets/img/rose.png" alt="">
```

- `class="decor"` positions it behind the content and stops it
  swallowing taps. See the DECORATION LAYER block in `css/style.css`.
- `alt=""` — empty, but present — marks it decorative so screen
  readers skip it. Omitting `alt` entirely makes them read the
  filename aloud instead.
- Prefer SVG for line art and flourishes (sharp at any size, tiny
  file). Use PNG only when you need soft edges or photographic detail.
- Keep photographs under ~300KB each; most guests are on mobile data.
