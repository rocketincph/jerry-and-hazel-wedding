# Briefing: Fix rose clipping, mobile names, and type hierarchy

## Context

The Save the Date page is live with the watercolor background and rose frames. Three issues need fixing before it's ready to share widely.

## Who I am

Complete beginner coder. Explain what you're doing and why as you go.

---

## Fix 1: Rose frames look clipped / contained

**Problem:** The rose frames appear to be cropped where they meet the central text area, as if the roses are trapped inside an invisible box. The result is a visible boundary between "rose zone" and "text zone" instead of a seamless layered effect where roses sit naturally behind the content.

**Goal:** The roses should feel like they're painted onto the same surface as the background — no hard edges, no visible containers, no clipping. They sit behind the text (lower z-index) but in front of the background texture. The text simply floats over them where they overlap. Nothing clips, nothing contains.

**Likely cause:** The `.page-decor` wrapper or the rose images themselves may have `overflow: hidden` on a parent, or the decoration container isn't truly covering the full viewport. Check for:
- `overflow: hidden` on `.page-decor` or any ancestor
- The decoration container not being full-width/full-height
- Any `clip-path` or `mask` properties
- The content area having its own opaque background that covers the roses (this would explain the "invisible container" look — the content's background is painting over the roses instead of being transparent)

**That last point is critical.** If `.site-header`, `.container`, or `.site-header__inner` has a `background-color` set (even `var(--color-background)`), it will paint a solid rectangle over the roses wherever content sits. The content containers must have `background: transparent` (or no background at all) so the roses show through behind the text.

---

## Fix 2: Names layout on mobile

**Problem:** On narrow screens, the names currently break as:
```
Jerry +
Hazel
```
This looks accidental — like a line that ran out of room.

**Goal:** On mobile, the names should intentionally stack as:
```
    Jerry
      +
    Hazel
```
Center-aligned, each on its own line, with the `+` joiner visually smaller between them.

**Implementation:** The `<h1 class="site-header__names">` contains three spans. On mobile (use whatever breakpoint the site already uses, or ~768px), set:
```css
.site-header__names {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

On desktop, the names can stay on one line as they are now (either `flex-direction: row` or just inline flow).

The `.site-header__joiner` (the `+`) should be noticeably smaller than the names on both mobile and desktop — it's a connector, not a name.

---

## Fix 3: Typography hierarchy — simplify to 4 levels

**Problem:** There's no clear visual hierarchy on the page. Too many similar font sizes competing with each other — a guest can't instantly tell what's most important.

**Goal:** Exactly 4 type levels. Every piece of text on the hero belongs to one of these. No exceptions, no in-betweens.

### The 4 levels:

**Level 1 — H1 (Names)**
The couple's names. Largest thing on the page by a wide margin. Script font (Alex Brush). This is the emotional anchor — it should dominate.

**Level 2 — H2 (Title)**
"Save the Date" (and later, "Please Respond" / "We're Married"). Prominent but clearly subordinate to the names. Can be uppercase Cormorant Garamond with letter-spacing for that formal invitation feel. Noticeably smaller than the names.

**Level 3 — Primary body**
All practical information at normal reading size. This level applies to:
- The Filipino invitation line ("Malugod namin kayong inaanyayahan...")
- The date ("Ika-27 ng Disyembre")
- The time ("A la 1 ng hapon")
- The venue ("Lazuri Hotel Resort — Tagaytay")
- The note ("Susundan ito ng pormal na paanyaya." — this is NOT fine print, it's practical info at the same level as the date)

All of these should feel like they belong together — same font, same weight, same size. Cormorant Garamond, regular weight.

**Level 4 — Secondary body (whisper)**
English translations only. Noticeably smaller AND lighter/more transparent than Level 3. These are for bilingual guests who want the English version — they should be visible but clearly secondary. Cormorant Garamond, italic, reduced opacity or lighter color.

### What this means in practice:

- The `.bilingual__fil` spans are Level 3 (primary body)
- The `.bilingual__en` spans are Level 4 (secondary/whisper)
- `.hero-message__title` ("Save the Date") is Level 2
- `.site-header__names` is Level 1
- `.site-header__location` (venue) is Level 3
- `.hero-message__note .bilingual__fil` ("Susundan ito...") is Level 3, NOT smaller than the date/venue
- `.hero-message__note .bilingual__en` ("A formal invitation will follow.") is Level 4

### Size relationships:

Use `clamp()` for every font-size so each level scales fluidly between mobile and desktop without needing separate breakpoints or mobile-specific classes. The syntax is `clamp(minimum, preferred, maximum)` — the preferred value should use `vw` (viewport width) so it scales with the screen.

Example shape (use your judgment on exact values, but the GAPS between levels must be dramatic enough that a guest squinting at their phone instantly sees the hierarchy):

- **Level 1 (H1 names):** `clamp(2.5rem, 10vw, 5rem)` — dominant on every screen size
- **Level 2 (H2 title):** `clamp(1.2rem, 4vw, 1.8rem)` — clearly subordinate to names, clearly above body text
- **Level 3 (Primary body):** `clamp(0.95rem, 2.5vw, 1.15rem)` — comfortable reading size
- **Level 4 (Secondary body):** `clamp(0.75rem, 2vw, 0.9rem)` — noticeably smaller than Level 3, always readable

The joiner (`+`) between names should scale too, but stay smaller than the names themselves — roughly 40-50% of the name size.

These are starting points, not gospel. What matters is: the jump from one level to the next should be obvious at every screen width, and nothing should ever get so small it's unreadable or so large it overflows the screen.

---

---

## Fix 4: Background image should scroll with the page, not shrink to fit

**Problem:** The background texture (JH_BG_MASTER.jpg, 1920×2880) is being scaled to fit the viewport height, throwing away the extra vertical space. The whole point of preserving the full 2880px height was that it's tall enough to serve as one continuous canvas behind all sections — no tiling needed.

**Goal:** The background image should:
- Span the full width of the page (`100%` wide)
- Keep its natural aspect ratio (let the height be whatever it is at full width — `auto`)
- Be pinned to the top of the page (`background-position: top center`)
- Scroll with the content — NOT fixed to the viewport
- As the guest scrolls down, they travel down the watercolor. The hero sits against the top of the texture, future sections (Good to Know, RSVP) sit against the middle/bottom

**Important context:** Right now, in Phase 1 (Save the Date only), the RSVP and Good to Know sections are hidden. The page is a single screenful — there is nothing to scroll to yet. The scrolling behavior is being set up now so it works correctly LATER when those sections become visible. Don't worry about how the bottom of the background looks right now, and don't add any scroll affordances. Just set the background properties correctly so everything works when the page eventually grows taller.

**Implementation:**
```css
background-size: 100% auto;    /* full width, natural height */
background-position: top center;
background-repeat: no-repeat;
/* Do NOT use background-attachment: fixed */
/* Do NOT use background-size: cover — it crops the height */
```

The fallback `background-color: var(--color-background)` should remain — if the image somehow doesn't load, or if the page ever grows taller than the image, the cream color fills in seamlessly below since the bottom of the watercolor is close to cream anyway.

---

## What NOT to change

- Don't restructure the HTML (tag order, sections, data-copy attributes)
- Don't touch copy.js or the phase-switching system
- Don't change the color palette or font families
- Don't modify the RSVP or Good to Know sections (they're hidden and still being built)

## After making changes

Commit and push to GitHub with a message like "Fix rose clipping, mobile names, type hierarchy, and background scroll."
