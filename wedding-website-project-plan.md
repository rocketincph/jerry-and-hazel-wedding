# Jerry & Hazel Wedding Website — Project Plan

**Wedding date:** December 27, 2026 · **Venue:** Tagaytay City (placeholder)
**Last updated:** August 29, 2026 · **Target launch:** October 2026

---

## 1. The big picture

One scrolling website with three built-in "phases" that automatically change **what is on the page** based on the date.

**Revised Aug 29, 2026** — originally the plan was to keep every section on the page and shift *emphasis* by date. We changed to **showing and removing** sections instead, because de-emphasis is invisible to a guest who never saw the louder version, and because the site would otherwise carry a stale countdown and a closed RSVP form well into 2027.

| Phase | Live dates | The page is |
|---|---|---|
| 1 — Save the Date | Oct 2026 – mid Nov 2026 | Hero **+ Save the Date message** › Good to Know |
| 2 — RSVP open | Mid Nov 2026 – Dec 27, 2026 | Hero › **RSVP** › Good to Know |
| 3 — After the day | Dec 27, 2026 onward | Hero (*"We're married"*) › Good to Know › Gallery |

Three structural decisions that fall out of this:

- **The Save the Date message lives in the hero**, not in its own section — so the whole message lands in the first screenful and a guest who never scrolls still gets it. There is no separate Save the Date section.
- **There is no standalone "Details" section.** It only restated the date, which the hero already carries. The ceremony time lives in the "The Day" card under Good to Know; the venue appears in exactly two places (the `<head>` meta description and the hero). The RSVP section is the form and nothing else — no repeated facts competing with the thing we want the guest to actually do.
- **Each full-height section snaps.** `scroll-snap-type: y proximity` on `html` stops a guest settling half-way between two sections. `proximity`, never `mandatory` — see the note in `style.css`.
- **"Good to Know" is visible in every phase.** It holds what a guest needs in order to *plan*: attire, getting there, staying over, and later registry/FAQs/gallery. Guests book flights and leave months ahead for a December wedding in Tagaytay. It also guarantees there is always something below the fold for the scroll cue to point at.

### Copy lives in one file

**All text on the site is in `js/copy.js`.** Edit there; nothing else needs touching. The wording in `index.html` is a mirror that only appears if the script fails, so the page can never come up blank — it may go slightly stale, and can be refreshed from `copy.js` at any time.

Copy is **plain text only** — no HTML tags inside `copy.js`. The script writes it with `textContent`, which treats tags as literal characters.

**Bilingual:** Filipino leads, a smaller italic English translation sits underneath. Keys ending `.fil` and `.en` are the two halves of one line. Names use `+` rather than "at" or "&" so they read the same in any language.

### Visual decoration (roses, borders — planned, art TBC)

Groundwork is in place so art can be dropped in without restructuring:

- Every `.section` is `position: relative`, so decoration positions against its own section
- z-index tokens `--z-decor` / `--z-content` / `--z-overlay` keep decoration behind content
- `.decor` class handles positioning, `pointer-events: none` and `user-select: none`
- Decorative images take `alt=""` (empty but present) so screen readers skip them
- Art goes in `assets/img/` — see the README there

### What actually changes by date

Only two things: the hero message (`#hero-message`), and whether the RSVP section is present. Everything else is static.

**Failure mode to respect:** if the JavaScript never runs, the page must show *everything* rather than nothing. A guest seeing a slightly early RSVP form is a small problem; a guest seeing a blank page is a disaster. So sections are present in the HTML by default and removed by script — never the reverse.

Sections planned but not built yet (added later, in this order of priority): Photo Gallery → Our Story → FAQs → Registry.

**How we're building it:** Plain HTML, CSS, and JavaScript in VS Code — no site builder, no framework. RSVP responses save to a Google Sheet (via Google Apps Script) instead of a database.

---

## 2. Decisions already made

- [x] Couple's names: Jerry & Hazel
- [x] Wedding date: December 27, 2026
- [x] Venue: Tagaytay City (placeholder — swap later)
- [x] Structure: single scrolling page, not multiple pages
- [x] Tech stack: HTML/CSS/JS + Google Sheets for RSVP
- [x] Editor: VS Code
- [x] Domain name: jerryandhazel.com (registering via Porkbun, ~$11/yr)
- [x] Hosting: GitHub Pages (free, account already set up)
- [x] Fonts: Alex Brush (script headlines) + Cormorant Garamond (body/serif text) — free via Google Fonts, SIL Open Font License
- [x] Color palette locked: cream `#F7ECE6` (background), burgundy `#6B1F3A` (primary), deep wine `#4A1420` (primary-dark), blush `#E8B4BE` (secondary), gold `#C9A15A` (accent), `#2B2320` (text-on-light), `#FBF5F1` (text-on-dark)

## 3. Open decisions (blocking next steps)

| Decision | Status | Notes |
|---|---|---|
| Final venue name | Pending (couple) | Using "Tagaytay City" until confirmed |

---

## 4. Phase-by-phase build plan

### Phase A — Foundation (this week)
- [x] Finalize color palette (hex codes, all 7 roles)
- [x] Pick font pairing (script headline font + sans body/label font)
- [x] Set up project folder + file structure in VS Code
- [x] Write `style.css` design tokens (CSS variables for colors)

### Phase B — Static structure (build the skeleton)
- [x] Build `index.html` page skeleton with all section placeholders
- [x] Style the hero, with the Save the Date message merged into it
- [x] Add the animated scroll cue
- [x] Style the RSVP section — form only, its own screenful (not yet functional)
- [ ] Style the "Good to Know" section (info cards)
- [ ] Make the layout responsive (mobile-first, since most guests will view on phone)

### Phase C — The "phase-shifting" logic
- [ ] Write JavaScript date-check logic (today vs. milestone dates)
- [ ] Swap the hero message text per phase (`#hero-message`)
- [ ] Show/remove the RSVP section per phase (removed by JS, present by default)
- [x] Repoint the scroll cue at the first visible section (done early — `js/script.js`)
- [ ] Make sure the page still works if JavaScript fails (show everything rather than nothing)
- [ ] Test by manually faking different dates

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

## 6. Where we left off — August 29, 2026

**Paused here.** The hero and RSVP are a solid first draft; Good to Know is written but unstyled.

### Done
- Design tokens, reset, base styles, container/layout system
- **Hero** — full screen, bilingual, gold bar dividing identity from announcement, short-screen (landscape) two-column handling, animated scroll cue that finds its own target
- **RSVP** — its own screenful, form only (name · attending · seats · message), seats field appears only on acceptance, blush wash to separate it from the hero
- **`js/copy.js`** — every word on the site in one editable file, with the HTML as a fallback mirror
- Scroll snapping (`proximity`), decoration groundwork (`.decor`, z-index tokens, `assets/img/`)

### Next, in order
1. Style the **Good to Know** section — four info cards via CSS Grid (four-across to stacked, no media query needed)
2. Full responsive pass: phone, tablet, desktop, landscape
3. Then Phase C — the date logic

### Open questions for the couple
- Final venue name (still "Tagaytay City")
- Whether the Filipino date line should carry the year
- Real copy for the four Good to Know cards
