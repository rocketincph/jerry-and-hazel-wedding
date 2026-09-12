# Jerry & Hazel Wedding Website

**Live:** [jerryandhazel.com](https://jerryandhazel.com) · **Repo:** github.com/rocketincph/jerry-and-hazel-wedding
**Wedding:** December 27, 2026, 1:00 PM · Lazuri Hotel Resort, Tagaytay
**Last worked on:** September 12, 2026

---

## Who I'm working with

Rocket is a **complete beginner to coding** — 15+ years as a content writer, strong design and UX eye, understands logic fine but is learning HTML/CSS/JS through this project.

**How to work:** explain concepts in plain English before or alongside code. Explain *why*, not just *what*. One step at a time, not big dumps. Introduce each new idea as it comes up. Don't assume vocabulary. He makes the design calls; check measurable claims rather than asserting them.

---

## What this is

A **single-page** wedding site. Plain HTML, CSS and JavaScript — no framework, no build step, no package.json. Hosted on GitHub Pages, custom domain via the `CNAME` file.

Right now the page shows **only the Save the Date hero**. RSVP and Good to Know are written and in the HTML but hidden, still being built.

```
index.html        the page — contains NO text, only labelled empty slots
css/style.css     everything visual, ~1270 lines, organised in 5 numbered sections
js/copy.js        every word on the site
js/script.js      fills the words in, manages the scroll cue
assets/img/       background texture + three rose frames
CNAME             jerryandhazel.com — DO NOT DELETE, it is the custom domain
```

---

## The five things that will bite you

### 1. `copy.js` is the only place text exists

`index.html` elements are **empty**. The script reads each `data-copy="…"` label, looks it up in `copy.js`, and writes the text in.

```html
<p class="site-header__location">
  <span data-copy="hero.venue.name"></span>
</p>
```

There used to be a duplicate of every string in the HTML as a fallback. **It was removed on purpose** — it drifted out of date twice, and a page quietly showing the *wrong ceremony time* is far more dangerous at a wedding than one that is obviously broken.

The cost: a typo in `copy.js` means the page comes up **empty**. So:

```bash
node --check js/copy.js    # silence = fine. Run before every push.
```

Three attribute hooks exist: `data-copy` (text), `data-copy-datetime`, `data-copy-placeholder`. Add more attribute names to `COPY_ATTRIBUTES` in `script.js` if needed.

**Copy is plain text only** — no HTML tags. The script uses `textContent`, so `<em>` would render as literal angle brackets.

### 2. The `<title>` and meta description are the ONE exception

They still hold real text in `index.html`, flagged there with a warning block. They **cannot** move to `copy.js`: Google's crawler and the link-preview scrapers behind Messenger, Viber and Facebook read raw HTML and mostly don't run JavaScript. Move them and share previews go blank.

**So the venue, date and time each live in exactly two places:** `copy.js` and those two lines. Change both.

### 3. Phase switching is MANUAL

There is no date-checking JavaScript. It was planned, then dropped as unnecessary complexity.

One class on `<body>` in `index.html` — `phase-save-the-date` · `phase-rsvp-open` · `phase-married` — and one rule at **style.css section 5.0**:

```css
.phase-save-the-date #rsvp,
.phase-save-the-date #good-to-know,
.phase-save-the-date .site-footer {
  display: none;
}
```

**To publish a section:** delete its line from that rule. That's it. The scroll cue re-points at it automatically.

**The rule that matters:** sections are present in the HTML by default and *hidden* by CSS — never hidden by default and revealed by script. If anything fails, the page shows too much rather than nothing.

### 4. Four type levels, and only four

Every piece of text on the hero is one of these. The wide gaps are the point — a guest squinting at a phone should see the ranking without reading a word.

| | Token | Phone → Desktop | What |
|---|---|---|---|
| 1 | `--font-size-display` | 48 → 104px | the names |
| 2 | `--font-size-lg` | 19 → 29px | "Save the Date" |
| 3 | `--font-size-base` | 16 → 19px | date, time, venue, Filipino note, invitation line |
| 4 | `--font-size-sm` | 13 → 15px | English translations, nothing else |

`--font-size-md` and `--font-size-xl` are **legacy**, used only by the still-hidden sections. Move those onto the four levels when styling them.

Level 3 members should be indistinguishable except for their words. Getting this wrong is what made the venue look like a different class — it was the right *size* but uppercase, wide-tracked, burgundy and 80% opacity.

### 5. `--rose-visible` drives two things

It is the width of rose **actually on screen** — the rest hangs off the edge. It sets both how lush the frame looks and how much room the words get:

```
centre lane = screen width − (2 × --rose-visible)
```

The container padding is calculated from the same token, so **text steps out of the way by itself**. Change one number, everything follows. ~72px on a phone, 300px on a desktop.

---

## Decisions with reasons (don't undo these by accident)

**Roses are anchored by their INNER edge**, not offset by a percentage:

```css
.page-decor__rose--left { right: calc(100% - var(--rose-visible)); }
```

How wide the image renders depends on screen *height*, which CSS can't compute. Anchoring the edge we care about makes the visible strip exact at every size and lets the overhang sort itself out.

**Roses use natural proportions — never `object-fit: cover`.** Cover trims the width with a dead-straight vertical cut, and it landed exactly where the roses met the text. That was the "trapped in an invisible box" look.

**Background is `cover` on `<body>`, deliberately NOT tiled.** The texture is a vertical gradient — top row `RGB(252,241,234)`, bottom `RGB(226,198,166)`, a difference of 85. `repeat-y` would slam dark tan into light cream at every tile and band the page. `cover` scales to the whole *document*, so it extends on its own as sections are added.

**`scroll-snap-type: y proximity`, never `mandatory`.** Good to Know is taller than a phone screen; with `mandatory` its lower half becomes unreachable.

**`.bilingual__en` opacity is 0.85, not 0.7.** Measured against the texture's darkest patch under the text, 0.7 gave 4.28:1 — below the 4.5:1 minimum, on the smallest text on the page. 0.85 gives 6.21:1.

**Focus ring is burgundy, not gold.** Gold on cream is ~1.9:1; a focus indicator needs 3:1.

**Gold is used for hairlines only, never text.** Same contrast reason.

**`[hidden] { display: none !important; }`** is in the reset. Without it, any class setting `display` beats the browser's weak `[hidden]` rule, and `element.hidden = true` silently does nothing.

**Mobile and desktop use different rose artwork** via `<picture>`, which downloads only the file it picks — a phone never fetches the desktop rose.

---

## Colour palette (locked)

| Role | Hex | Use |
|---|---|---|
| Background | `#F7ECE6` | cream |
| Primary | `#6B1F3A` | burgundy — headlines, brand |
| Primary-dark | `#4A1420` | deep wine |
| Secondary | `#E8B4BE` | blush |
| Accent | `#C9A15A` | gold — **hairlines and details only** |
| Text-on-light | `#2B2320` | body text |
| Text-on-dark / surface | `#FBF5F1` | text on dark, input surfaces |

Fonts: **Alex Brush** (names only) + **Cormorant Garamond** (everything else), via Google Fonts.

Rough ratio: 60% cream, 30% burgundy, 10% gold.

---

## Where to pick up

**1. Style Good to Know** — four info cards, currently unstyled plain serif. This is the CSS Grid job: `repeat(auto-fit, minmax(…, 1fr))` gives four-across to stacked with **no media query at all**. Move its text onto the four type levels. Then delete `#good-to-know` from the phase rule.

Watch out: those cards use the full 68rem `.container`, and on a wide screen 300px roses will overlap them. The hero gets away with it because its text is centred and narrow.

**2. Style the footer** — never styled, currently hidden for that reason. It repeats the hero's names and date, so it may not deserve to come back at all.

**3. RSVP backend (Phase D)** — the form is styled and hidden; nothing is wired up. The critical design decision is recorded in the project plan: **key responses on the PARTY, not the person.** Invitations go out per household, so if a husband and wife each RSVP "2 of us", the count becomes 4. Match names to a party ID **server-side** — a browser-side lookup would ship the whole guest list to every visitor.

**4. Favicon** — `TODO` comment sits in `<head>`.

---

## Smaller open items

- **Level 3 has a colour split**: invitation line and note are burgundy `0.02em`; date and venue are `--text-on-light` `0.03em`. Arguably a sensible sub-distinction (ceremonial vs factual) but it's undecided rather than deliberate.
- **The venue's uppercase treatment was dropped** when it was aligned to Level 3. One line to restore if wanted as a considered exception.
- **`assets/img/ROSE_FRAME_MOBILE.png` is unused** — superseded by `ROSE_FRAME_MOBILE2.png`. Tracked but referenced by nothing. Harmless; removing it won't shrink the repo since git keeps history.
- **Mobile payload is ~612KB** of imagery. Rocket has accepted this. WebP would take the rose from 472KB to ~130KB via a second `<source>` line if it ever matters.
- **style.css section 5.1b sits after 5.2** — out of numeric order, cosmetic only.
- **The full venue address and Google Maps link are deliberately NOT on the site** and have never been committed. They belong in Good to Know's "Getting There" card when the couple is ready.

---

## Workflow

```bash
node --check js/copy.js      # before every push, if copy changed
git add -A
git commit -m "what changed"
git push
```

GitHub Pages redeploys in 30–60 seconds. **Hard-refresh with `Ctrl+Shift+R`** — a normal refresh serves the cached old version.

Rocket can now do this himself; he pushed `New Invitation Time` and `Copyedit` unaided.

`preview/` is gitignored — local design mockups, duplicates of `assets/img/`.

The longer-range roadmap and the couple's open decisions live in `wedding-website-project-plan.md`.
