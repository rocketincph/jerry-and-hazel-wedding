# Briefing: Visual styling pass — background texture + rose frames

## Context

The Save the Date page is live at jerryandhazel.com. The layout and copy are done. It currently looks plain — flat cream background, no decoration. This briefing adds the visual layer: a watercolor background texture and burgundy rose frames on both sides.

## Who I am

Complete beginner coder. Explain what you're doing and why as you go. I understand logic, just not syntax.

## Assets to add

Two files go into `assets/img/`:

1. **JH_BG_MASTER.jpg** (137KB, 1920×2880) — blush/cream watercolor texture. Replaces the flat `--color-background` as the page background. Keep `--color-background` as the fallback in case the image fails to load.

2. **ROSE_FRAME.png** (212KB, transparent PNG) — vertical burgundy rose arrangement, designed for the left edge. The right side uses the same file, flipped horizontally with `transform: scaleX(-1)`.

Both files are already in the project folder — just need moving to `assets/img/` if they aren't there already.

## What to build

### 1. Background texture

Replace the flat background color with the watercolor image on `body` or the outermost container:
- `background-image: url('assets/img/JH_BG_MASTER.jpg')`
- `background-size: cover`
- `background-position: center top`
- Keep `background-color: var(--color-background)` as fallback (shows while image loads, or if it fails)

The image is 1920×2880 — tall enough to cover the full page including future sections. No tiling needed.

### 2. Rose frames — fixed positioning

The roses stay fixed to the viewport edges while content scrolls past them, creating a persistent "invitation card" frame effect.

**Approach:** To avoid known `position: fixed` issues on iOS Safari (jittering, address-bar interference), use a wrapper-based approach:
- A fixed viewport wrapper holds the rose decorations
- The actual page content scrolls inside it
- This sidesteps most mobile `position: fixed` bugs

**Left side:** the ROSE_FRAME.png, pinned to the left edge, vertically centered or top-aligned.

**Right side:** the same ROSE_FRAME.png, pinned to the right edge, flipped with `transform: scaleX(-1)`.

**Both sides:**
- `pointer-events: none` and `user-select: none` — so they don't interfere with clicking or selecting text
- `alt=""` on the images (empty but present) — screen readers skip decorative images
- Use the existing `.decor` class and z-index tokens (`--z-decor` / `--z-content`) that are already set up in the codebase

### 3. Responsive scaling

On narrow screens (phones), the roses need to shrink so they don't eat into the text area. Use something like `width: clamp(80px, 18vw, 260px)` — small on phones, generous on desktop. The roses should feel like they're peeking in from the edges on mobile, not crowding the content.

If on very narrow screens (under ~380px) the roses still crowd the text, it's fine to hide them entirely with a media query. A clean reading experience beats decoration.

### 4. Important constraints

- Do NOT restructure the HTML layout, the copy system (copy.js), or the phase-switching architecture
- Do NOT change fonts, colors, or design tokens — those are locked
- The rose images should use the decoration groundwork already in place (`.decor` class, z-index tokens, `assets/img/` directory)
- The background texture fallback color must remain so the page never shows a white flash
- Test that the scroll cue still works correctly with the new wrapper structure (if a wrapper is added)
- The RSVP and Good to Know sections are currently hidden via `.phase-save-the-date` CSS — this should remain unchanged

### 5. Performance notes

- JH_BG_MASTER.jpg is 137KB — already optimized, no further compression needed
- ROSE_FRAME.png is 212KB — since it's used twice (left + right), the browser only downloads it once and reuses it. Total decoration weight is ~350KB, which is acceptable
- Consider adding `loading="eager"` on the background (it's above the fold) and `loading="lazy"` isn't needed since the roses are immediately visible too

## What visitors should see after this

The same Save the Date content as before, but now framed by:
- A soft blush/cream watercolor wash behind everything instead of a flat color
- Deep burgundy roses with gold leaf details running vertically along both edges
- Roses stay in place as the guest scrolls (once more sections are added)
- On mobile: roses scale down to subtle edge decoration, text stays fully readable

## Visual reference

A preview mockup was created at `preview.html` in the outputs — it shows the general composition but is NOT responsive and doesn't match the real site's copy/layout. Use it only as a directional reference for how the three layers stack: background → roses → content.

## After this is done

Commit and push to GitHub. The site at jerryandhazel.com should update within a few minutes.
