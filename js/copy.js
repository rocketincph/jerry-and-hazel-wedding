/* ==========================================================
   Jerry & Hazel — ALL THE WORDS ON THE SITE

   THIS IS THE FILE YOU EDIT. Change the text between the
   "quote marks" and save. Nothing else on the site needs
   touching.

   ----------------------------------------------------------
   THREE RULES, and the page keeps working:

   1. Only ever change what is INSIDE the "double quotes".
      Never the part before the colon — that is the label the
      page uses to find this line.

   2. Keep the comma at the end of every line. The last line
      before a } does not need one, but an extra comma there
      is harmless.

   3. If your text contains a double quote, write it as \"
      (backslash first). An apostrophe like Jerry's is fine
      as-is — it only matters for double quotes.

   Broken something? The page falls back to the wording built
   into index.html, so it will never go blank. Press F12 in
   the browser and look at the Console tab — a red message
   there names the line number of the problem.
   ----------------------------------------------------------

   NAMING: the labels read left to right, from broad to
   specific. "hero.invitation.fil" is the Filipino half of the
   invitation line in the hero. ".fil" is Filipino, ".en" is
   the smaller English translation underneath it.
   ========================================================== */

var COPY = {

  /* ----------------------------------------------------------
     HERO — the first screenful
     ---------------------------------------------------------- */

  "hero.invitation.fil": "Malugod namin kayong inaanyayahan sa pag-iisang dibdib nina",
  "hero.invitation.en":  "We cordially invite you to the wedding of",

  /* The joiner between the names. "+" was chosen over "at" or
     "&" because it reads the same in every language. */
  "hero.name.first":  "Jerry",
  "hero.name.joiner": "+",
  "hero.name.second": "Hazel",

  /* The Filipino date is split across two lines — date, then time —
     so it reads as an invitation rather than a dense sentence.
     The English line beneath carries the fuller, practical version. */
  "hero.date.fil.day":  "Ika-27 ng Disyembre",
  "hero.date.fil.time": "1:00 ng hapon",
  "hero.date.en":       "December 27, 2026, 1:00 PM",

  /* ⚠️ VENUE — one of only two places it appears. The other is
     the meta description in index.html.
     Only the venue NAME is public. The full street address and the
     Google Maps link are deliberately NOT on the site yet. */
  "hero.venue": "Lazuri Hotel Resort — Tagaytay",

  /* --- The phase message ---
     The only part of the page that changes by date. Phase C
     will switch between these three sets automatically.
     Right now the page shows the "savethedate" one. */

  "hero.savethedate.title":    "Save the Date",
  "hero.savethedate.note.fil": "Susundan ito ng pormal na paanyaya.",
  "hero.savethedate.note.en":  "A formal invitation will follow.",

  "hero.rsvpopen.title":    "Please Respond",
  "hero.rsvpopen.note.fil": "Mangyaring tumugon bago mag-ika-30 ng Nobyembre.",
  "hero.rsvpopen.note.en":  "Kindly respond by November 30.",

  "hero.married.title":    "We're Married!",
  "hero.married.note.fil": "Maraming salamat sa pagdiriwang kasama namin.",
  "hero.married.note.en":  "Thank you for celebrating with us.",

  /* Scroll arrow. Not shown on screen — read aloud to guests
     using a screen reader, and shown if the image fails. */
  "hero.scrollcue.label": "Scroll down for more",


  /* ----------------------------------------------------------
     RSVP
     ---------------------------------------------------------- */

  "rsvp.title": "RSVP",
  "rsvp.lead":  "Kindly respond by November 30, 2026.",

  "rsvp.name.label": "Full name",

  "rsvp.attending.question": "Will you be joining us?",
  "rsvp.attending.yes":      "Joyfully accepts",
  "rsvp.attending.no":       "Regretfully declines",

  "rsvp.seats.label": "How many of you are coming?",
  "rsvp.seats.help":  "One response per invitation — it covers everyone named on yours.",

  "rsvp.message.label":       "Anything we should know?",
  "rsvp.message.optional":    "(optional)",
  "rsvp.message.placeholder": "Dietary needs, or a note for the couple",

  "rsvp.submit": "Send RSVP",


  /* ----------------------------------------------------------
     GOOD TO KNOW
     ---------------------------------------------------------- */

  "gtk.title": "Good to Know",
  "gtk.lead":  "A few things to help you plan. More will be added here as the day gets closer.",

  "gtk.day.title": "The Day",
  "gtk.day.text":  "Ceremony and reception details, and the full order of the day, to follow.",

  "gtk.attire.title": "Attire",
  "gtk.attire.text":  "Formal. Exact dress code and colour palette to be confirmed — check back closer to the date.",

  "gtk.getting.title": "Getting There",
  "gtk.getting.text":  "Tagaytay is roughly a two-hour drive south of Metro Manila, traffic depending. Directions and parking details to follow.",

  "gtk.staying.title": "Staying Over",
  "gtk.staying.text":  "December is peak season in Tagaytay, so book early. Recommended hotels to follow."

};
