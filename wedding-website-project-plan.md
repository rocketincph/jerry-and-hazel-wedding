# Jerry & Hazel Wedding Website — Project Plan

**Wedding date:** December 27, 2026, 1:00 PM · **Venue:** Lazuri Hotel Resort, Tagaytay (confirmed)
**Last updated:** September 12, 2026 · **Status:** Save the Date is LIVE at jerryandhazel.com

> Technical state, conventions and gotchas live in **CLAUDE.md**. This file is the roadmap and the couple’s open decisions.

---

## 1. The big picture

One scrolling website with three "phases" that change **what is on the page** as the date approaches.

**Revised Sep 12, 2026 — phase switching is MANUAL.** The plan was JavaScript that checked the date and switched automatically. Dropped: it is machinery that can only ever fail silently, to save an edit made three times in fifteen months. A class on the body tag plus one CSS rule do the same job, visibly. See CLAUDE.md.

**Revised Aug 29, 2026** — originally the plan was to keep every section on the page and shift *emphasis* by date. We changed to **showing and removing** sections instead, because de-emphasis is invisible to a guest who never saw the louder version, and because the site would otherwise carry a stale countdown and a closed RSVP form well into 2027.

| Phase | Live dates | The page is |
|---|---|---|
| 1 — Save the Date | Oct 2026 – mid Nov 2026 | Hero **+ Save the Date message** › Good to Know |
| 2 — RSVP open | Mid Nov 2026 – Dec 27, 2026 | Hero › **RSVP** › Good to Know |
| 3 — After the day | Dec 27, 2026 onward | Hero (*"We're married"*) › Good to Know › Gallery |

Three structural decisions that fall out of this:

- **The Save the Date message lives in the hero**, not in its own section — so the whole message lands in the first screenful and a guest who never scrolls still gets it. There is no separate Save the Date section.
- **There is no standalone "Details" section.** It only restated the date, which the hero already carries. The ceremony time and venue now sit in the hero; the venue appears in exactly two places (`copy.js` and the meta description). The RSVP section is the form and nothing else — no repeated facts competing with the thing we want the guest to actually do.
- **Each full-height section snaps.** `scroll-snap-type: y proximity` on `html` stops a guest settling half-way between two sections. `proximity`, never `mandatory` — see the note in `style.css`.
- **"Good to Know" is visible in every phase.** It holds what a guest needs in order to *plan*: attire, getting there, staying over, and later registry/FAQs/gallery. Guests book flights and leave months ahead for a December wedding in Tagaytay. It also guarantees there is always something below the fold for the scroll cue to point at.

### Copy lives in one file

**All text on the site is in `js/copy.js`.** `index.html` holds no words at all, only labelled empty slots.

The HTML used to carry a duplicate as a fallback. It was removed in September after drifting out of date twice — a page quietly showing the wrong ceremony time is worse at a wedding than one that is obviously broken. The trade is that a typo in `copy.js` leaves the page blank, so run `node --check js/copy.js` before pushing.

One exception: the page title and meta description keep real text, because link-preview scrapers do not run JavaScript. They are flagged in `index.html`.

Copy is **plain text only** — no HTML tags inside `copy.js`. The script writes it with `textContent`, which treats tags as literal characters.

**Bilingual:** Filipino leads, a smaller italic English translation sits underneath. Keys ending `.fil` and `.en` are the two halves of one line. Names use `+` rather than "at" or "&" so they read the same in any language.

### Visual decoration (roses, borders — planned, art TBC)

Groundwork is in place so art can be dropped in without restructuring:

- Every `.section` is `position: relative`, so decoration positions against its own section
- z-index tokens `--z-decor` / `--z-content` / `--z-overlay` keep decoration behind content
- `.decor` class handles positioning, `pointer-events: none` and `user-select: none`
- Decorative images take `alt=""` (empty but present) so screen readers skip them
- Art goes in `assets/img/` — see the README there

### What actually changes between phases

Two things: the hero message text, and which sections are visible. Everything else is static.

Both are changed **by hand** — the body class in `index.html`, and the one rule in section 5.0 of `style.css`. To publish a finished section, delete its line from that rule.

**Failure mode to respect:** sections are present in the HTML by default and *hidden* by CSS — never hidden by default and revealed by script. If anything fails, the page shows too much rather than nothing.

Sections planned but not built yet (added later, in this order of priority): Photo Gallery → Our Story → FAQs → Registry.

**How we're building it:** Plain HTML, CSS, and JavaScript in VS Code — no site builder, no framework. RSVP responses save to a Google Sheet (via Google Apps Script) instead of a database.

---

## 2. Decisions already made

- [x] Couple's names: Jerry & Hazel
- [x] Wedding date: December 27, 2026
- [x] Venue: Lazuri Hotel Resort, Tagaytay — confirmed Sep 2026. Street address and map link deliberately NOT published yet.
- [x] Structure: single scrolling page, not multiple pages
- [x] Tech stack: HTML/CSS/JS + Google Sheets for RSVP
- [x] Editor: VS Code
- [x] Domain name: jerryandhazel.com (registering via Porkbun, ~$11/yr)
- [x] Hosting: GitHub Pages (free, account already set up)
- [x] Fonts: Alex Brush (script headlines) + Cormorant Garamond (body/serif text) — free via Google Fonts, SIL Open Font License
- [x] Color palette locked: cream `#F7ECE6` (background), burgundy `#6B1F3A` (primary), deep wine `#4A1420` (primary-dark), blush `#E8B4BE` (secondary), gold `#C9A15A` (accent), `#2B2320` (text-on-light), `#FBF5F1` (text-on-dark)

## 3. Open decisions

| Decision | Status | Notes |
|---|---|---|
| Real copy for the four Good to Know cards | Pending (Rocket) | Placeholders in `copy.js` are mine, not his |
| Dress code / colour palette | Pending (couple) | Card currently says "to be confirmed" |
| When to publish the street address + map link | Pending (couple) | Goes in the "Getting There" card |
| Whether to keep the venue in uppercase | Pending (Rocket) | Dropped when it was aligned to type level 3 |

---

## 4. Phase-by-phase build plan

### Phase A — Foundation (this week)
- [x] Finalize color palette (hex codes, all 7 roles)
- [x] Pick font pairing (script headline font + sans body/label font)
- [x] Set up project folder + file structure in VS Code
- [x] Write `style.css` design tokens (CSS variables for colors)

### Phase B — Static structure
- [x] Build `index.html` page skeleton with all section placeholders
- [x] Style the hero, with the Save the Date message merged into it
- [x] Add the animated scroll cue
- [x] Style the RSVP section — form only, its own screenful (not yet functional)
- [x] Responsive: mobile-first throughout, plus landscape and short-screen handling
- [x] Watercolour background + rose frames, separate artwork for phone and desktop
- [x] Four-level type hierarchy
- [ ] **Style the "Good to Know" section (info cards)** — the CSS Grid job, next up
- [ ] Style the footer (never styled; currently hidden for that reason)

### Phase C — Phase switching ~~(mostly cancelled)~~

The date-checking JavaScript was dropped. Switching is manual: change the body class, edit one CSS rule. Roughly three edits across the whole life of the site.

- [x] Scroll cue finds the first visible section on its own (`js/script.js`)
- [x] Phase visibility rule (`style.css` section 5.0)
- [x] Three sets of hero message copy already written in `copy.js`
- [ ] Mid-Nov 2026: switch body class to `phase-rsvp-open`, unhide `#rsvp`
- [ ] Dec 27, 2026: switch to `phase-married`

### Phase D — RSVP backend

**Key everything on the PARTY, not the person.** Invitations go out per household, so responses must be recorded per household. Otherwise a husband and wife who each RSVP "2 of us" produce a count of 4.

Guest list sheet: `Party ID | Members | Seats allotted | Contact | Responded | Attending | Count | Message`

- [ ] Build the guest list sheet, one row per invited party
- [ ] Create the responses sheet (or write back into the guest list row)
- [ ] Apps Script: match a submitted name → party ID, server-side
- [ ] Write the response **against the party ID, overwriting** any earlier one from that party
- [ ] Cap the seat stepper at that party's allotted seats
- [ ] Warn the guest if their party has already responded ("sending this will replace it")
- [ ] Handle no-match ("We couldn't find that name — check the spelling, or message us")
- [ ] Connect the HTML form to the script endpoint
- [ ] Test end-to-end submission, including the double-response case

**Privacy note:** do the name matching *server-side*. If the lookup runs in the browser, the whole guest list ships to every visitor and is readable via view-source.

### Phase E — Content & polish
- [ ] Real venue details once confirmed
- [ ] Proofread all copy
- [ ] Cross-browser / cross-device check (iPhone, Android, desktop)
- [ ] Add favicon + page title/meta info

### Phase F — Domain & launch
- [ ] Register domain
- [ ] Deploy to free hosting (GitHub Pages or Netlify)
- [ ] Point domain to hosted site
- [ ] Go live — target: **October 2026**

### Phase G — Post-launch (ongoing through the site's life)
- [ ] Mid-November: confirm RSVP section is front-and-center
- [ ] Add Photo Gallery / Our Story / FAQs / Registry sections (as time allows)
- [ ] December 27: confirm the Phase 3 hero message displays correctly on the day
- [ ] Keep site live through ~end of 2027, then decide whether to archive or take down

---

## 5. What we're learning along the way

Each phase doubles as a coding lesson:
- **Phase A** → CSS variables / design tokens
- **Phase B** → HTML structure, CSS layout (flexbox/grid), responsive design
- **Phase C** → JavaScript conditionals, the `Date` object, DOM manipulation
- **Phase D** → APIs, forms, connecting front-end to a backend
- **Phase F** → How domains, DNS, and hosting actually work

---

## 6. Where we left off — September 12, 2026

**The Save the Date page is live and public at jerryandhazel.com.** Venue confirmed, copy final, fully decorated. Paused here for a break.

### Live now
- **Hero** — one full screen: bilingual invitation line, *Jerry + Hazel*, gold bar, Save the Date, date and time, venue, note
- **Watercolour background** scrolling with the page, **rose frames** fixed to both edges, separate artwork for phone and desktop
- Four-level type hierarchy, responsive from 320px to 4K, landscape handled
- Everything unfinished is hidden behind one CSS rule

### Built but hidden
- **RSVP** — styled, form only, no backend
- **Good to Know** — four cards written, completely unstyled
- **Footer** — never styled

### Next, in order
1. **Style Good to Know** — four info cards via CSS Grid, four-across to stacked with no media query. Watch for the roses overlapping the wider `.container` on desktop.
2. **Decide the footer** — style it, or drop it (it only repeats the hero)
3. **Phase D, the RSVP backend** — the biggest remaining piece. Party-keyed, server-side matching.
4. Mid-November: switch the body class to `phase-rsvp-open`

See `CLAUDE.md` for the technical state, conventions and the gotchas worth knowing before touching anything.
