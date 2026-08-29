# Briefing: Jerry & Hazel Wedding Website

Paste this whole message to Claude Code as your first prompt in the project folder.

---

## Who I am / how to work with me

I'm a complete beginner to coding (though I have a design/UX eye and 15+ years as a content writer). I understand logic fine, I just don't know syntax yet. Please:
- Explain concepts in plain English (ELI5) before or alongside any code
- Walk me through things step by step, not in big dumps
- Explain *why* something works, not just *what* to type
- I'm learning HTML/CSS/JS for the first time through this real project

## The project

A wedding website for my brother **Jerry** and his fiancée **Hazel**.
- **Wedding date:** December 27, 2026
- **Venue:** Tagaytay City (placeholder — real venue TBD, easy to swap since it's only referenced in one place)
- **Target launch:** October 2026

**Concept:** One single scrolling HTML page (not multiple pages) that automatically shifts its focus based on today's date, using JavaScript:

| Phase | Live dates | What's emphasized |
|---|---|---|
| Save the Date | Oct 2026 – mid Nov 2026 | Headline: mark your calendars |
| RSVP open | Mid Nov 2026 – Dec 27, 2026 | Headline: please respond |
| Wedding details | Dec 27, 2026 onward | Full event details |

Other sections are planned for later (not yet built): Photo Gallery, Our Story, FAQs, Registry.

## Tech decisions (already locked, don't relitigate)

- Plain HTML/CSS/JS — no framework, no site builder
- Editor: VS Code
- Hosting: **GitHub Pages** (free; I already have a GitHub account)
- Domain: **jerryandhazel.com** (registering via Porkbun)
- RSVP backend: **Google Sheets + Google Apps Script** (no traditional database)
- Fonts: **Alex Brush** (script, headlines/names only) + **Cormorant Garamond** (serif, everything else) — both free via Google Fonts

## Locked color palette (design tokens)

| Role | Hex | Use |
|---|---|---|
| Background | `#F7ECE6` | Main page background (cream) |
| Primary | `#6B1F3A` | Headlines, borders, main brand color (burgundy) |
| Primary-dark | `#4A1420` | Dark section backgrounds (deep wine) |
| Secondary | `#E8B4BE` | Soft accent cards, subtle backgrounds (blush) |
| Accent | `#C9A15A` | Sparingly — dividers, buttons, small highlights only (gold) |
| Text-on-light | `#2B2320` | Body text on cream/blush backgrounds |
| Text-on-dark | `#FBF5F1` | Body text on burgundy/wine backgrounds |

Rule of thumb we're using: 60% background/cream, 30% primary burgundy, 10% gold accent — gold should almost never be a large fill, just lines/details/buttons.

## Where I'm at right now

I've just set up (or am setting up) the project folder structure:

```
jerry-and-hazel-wedding/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

`style.css` should get these CSS variable design tokens as the very first thing in it:

```css
:root {
  --color-background: #F7ECE6;
  --color-primary: #6B1F3A;
  --color-primary-dark: #4A1420;
  --color-secondary: #E8B4BE;
  --color-accent: #C9A15A;
  --text-on-light: #2B2320;
  --text-on-dark: #FBF5F1;
  --font-script: 'Alex Brush', cursive;
  --font-body: 'Cormorant Garamond', serif;
}
```

Nothing else has been coded yet — no HTML skeleton, no JavaScript, no RSVP integration.

## What I need help with next (Phase B)

1. Confirm/finish the folder + file setup above
2. Build the `index.html` skeleton with placeholder sections for: Save the Date, RSVP, Details (structure only, using semantic HTML — explain what that means)
3. Load the Google Fonts (Alex Brush + Cormorant Garamond) into the HTML
4. Style the Save the Date section first, since that's the default/first-visible state
5. Make sure everything is responsive/mobile-first — most guests will view this on their phones

Please teach me each concept as we hit it (semantic HTML, flexbox/grid, responsive design, etc.) rather than just writing it for me.
