/* ==========================================================
   Jerry & Hazel — Wedding Website
   script.js

   Note on WHEN this runs: the <script> tag sits at the very
   bottom of <body>, so by the time the browser reaches it,
   every element above already exists. That's why we can go
   looking for things straight away, with no "wait until the
   page is ready" wrapper.
   ========================================================== */

'use strict';
/* 'use strict' turns on stricter error checking. Mostly it stops
   JavaScript from silently forgiving typos — mistyping a variable
   name becomes an error instead of quietly creating a new one. */


/* ----------------------------------------------------------
   COPY
   Write the words from copy.js into the page.

   Every element carrying a data-copy="…" attribute gets its text
   replaced by the matching entry in COPY. The elements in
   index.html are EMPTY — copy.js is the only place the words
   exist, so there is exactly one file to edit and nothing that
   can drift out of sync.

   If a label is missing, that element simply stays empty and a
   warning naming it appears in the browser Console (F12). Run
   `node --check js/copy.js` before pushing to catch typos first.
   ---------------------------------------------------------- */

var copyTargets = document.querySelectorAll('[data-copy]');

for (var c = 0; c < copyTargets.length; c++) {
  var key = copyTargets[c].getAttribute('data-copy');

  /* typeof …=== "undefined" is the safe way to ask whether a
     variable exists at all. Writing `if (COPY)` would itself throw
     an error when copy.js hasn't loaded. */
  if (typeof COPY !== 'undefined' && typeof COPY[key] === 'string') {

    /* textContent, not innerHTML. textContent treats the value as
       plain text; innerHTML would run any HTML or script inside it.
       Since this text will eventually be edited by hand and may one
       day come from elsewhere, plain text is the habit to keep. */
    copyTargets[c].textContent = COPY[key];

  } else {
    /* A quiet note in the browser Console (F12) naming exactly which
       label is missing. Invisible to guests. */
    console.warn('copy.js: no text found for "' + key + '" — using the wording in index.html');
  }
}

/* Some copy is an ATTRIBUTE rather than text inside a tag — a field's
   placeholder, or the machine-readable datetime. Each gets its own
   hook named after the attribute it sets:

     data-copy-placeholder="…"  ->  placeholder="…"
     data-copy-datetime="…"     ->  datetime="…"

   To support another attribute later, add its name to this list. */
var COPY_ATTRIBUTES = ['placeholder', 'datetime'];

for (var a = 0; a < COPY_ATTRIBUTES.length; a++) {
  var attribute = COPY_ATTRIBUTES[a];
  var attrTargets = document.querySelectorAll('[data-copy-' + attribute + ']');

  for (var t = 0; t < attrTargets.length; t++) {
    var attrKey = attrTargets[t].getAttribute('data-copy-' + attribute);

    if (typeof COPY !== 'undefined' && typeof COPY[attrKey] === 'string') {
      attrTargets[t].setAttribute(attribute, COPY[attrKey]);
    } else {
      console.warn('copy.js: no text found for "' + attrKey + '"');
    }
  }
}


/* ----------------------------------------------------------
   SCROLL CUE
   Keep the hero's arrow pointing at the first section that is
   actually on the page.

   Why bother, when the HTML already says href="#rsvp"?
   Because sections get hidden by the phase rules in style.css.
   A hardcoded target would point at a hidden section and do
   nothing when clicked. Working it out at run time means the
   arrow is always right, with nothing to remember to update.

   It also handles the case we are in TODAY: with both sections
   hidden there is nothing to scroll to, so the arrow hides
   itself rather than lying. Un-hide a section in style.css and
   the arrow comes back on its own.
   ---------------------------------------------------------- */

/* document.getElementById finds one element by its id attribute.
   querySelector takes a CSS selector — the same kind you write in
   the stylesheet — and returns the first match. */
var scrollCue = document.getElementById('scroll-cue');
var main = document.querySelector('main');

/* DEFENSIVE CHECK. If either is missing (a typo in the HTML, or a
   section we delete later), everything below would throw an error
   and stop the whole file from running — including code we add
   further down in Phase C. Checking first means a small mistake
   stays small. */
if (scrollCue && main) {

  /* querySelectorAll returns EVERY match, not just the first.
     'section[id]' means "any <section> that has an id attribute" —
     an id is what an href like "#rsvp" needs to point at. */
  var sections = main.querySelectorAll('section[id]');
  var firstVisible = null;

  for (var i = 0; i < sections.length; i++) {

    /* offsetParent is null when an element is hidden with
       display:none — the browser gives no position to something
       it isn't drawing. It's a compact way to ask "is this
       actually on screen?" without checking styles by hand. */
    if (sections[i].offsetParent !== null) {
      firstVisible = sections[i];
      break; /* stop at the first one; we don't need the rest */
    }
  }

  if (firstVisible) {
    /* Setting .href updates the real attribute in the page. The
       CSS scroll-behavior:smooth we set on <html> then handles
       the gliding — no scrolling code needed here. */
    scrollCue.href = '#' + firstVisible.id;
  } else {
    /* Nothing below the hero to scroll to, so an arrow would be
       lying. .hidden is a real HTML attribute: it removes the
       element for sighted users AND screen readers, which
       display:none in CSS alone would not do as clearly. */
    scrollCue.hidden = true;
  }
}
