/**
 * ═══════════════════════════════════════════════════════════════════
 *  SINGLE SOURCE OF TRUTH
 * ═══════════════════════════════════════════════════════════════════
 *  Everything you'll want to change before launch lives in this file.
 *  The name is used in ~20 places across the page — change it here
 *  once and it updates everywhere.
 * ═══════════════════════════════════════════════════════════════════
 */

export const site = {
  /** Product name. Swap this when you lock in the final name. */
  name: 'YouChoose',

  /** Used in the <title> tag and social previews. */
  tagline: 'Stop deciding. Start doing.',

  /** Meta description — keep under ~155 characters for search results. */
  description:
    'YouChoose ends the "what do you want to do?" loop. You both swipe, it finds what you actually agree on, and it gets smarter every time you use it.',

  /** Absolute URL of the deployed site, used for canonical + OG tags. */
  url: 'https://YOUR-GITHUB-USERNAME.github.io/youchoose-landing',

  /** Shown in the footer. */
  contactEmail: 'hello@youchoose.app',
  copyrightYear: new Date().getFullYear(),
} as const;

/**
 * ───────────────────────────────────────────────────────────────────
 *  EMAIL SIGNUP  ⚠️  PASTE YOUR GOOGLE FORM URL HERE
 * ───────────────────────────────────────────────────────────────────
 *
 *  Two modes are supported:
 *
 *  ══ EASIEST WAY — paste ONE link ═══════════════════════════════════
 *
 *  In your Google Form: the ⋮ menu (top right) → "Get pre-filled link"
 *  → type anything into the email question (e.g. a@b.com) → "Get link"
 *  → "COPY LINK". Paste that whole URL into PREFILLED_LINK below.
 *
 *  That single URL contains both things this needs — the form ID and
 *  the `entry.XXXXXXXXX` name of the email question — so they're pulled
 *  out automatically. No devtools, nothing else to fill in.
 *
 *  ══ OR set the two values by hand ═══════════════════════════════════
 *
 *    actionUrl    Your form's /viewform URL with `viewform` swapped for
 *                 `formResponse`, e.g.
 *                 https://docs.google.com/forms/d/e/1FAIpQLSxxxx/formResponse
 *    emailFieldId The email input's `name` attribute — right-click the
 *                 field on the live form → Inspect. Looks like
 *                 `entry.1234567890`.
 *
 *  ══ Either way, check these two Form settings ═══════════════════════
 *
 *    • "Limit to 1 response" must be OFF (it requires Google sign-in)
 *    • The form must not be restricted to your organization
 *
 *  Until one of the two routes above is filled in, the field still
 *  renders but submitting shows a setup reminder instead of silently
 *  dropping the address.
 *
 *  Prefer sending people to the form itself? Set mode: 'link' and the
 *  CTA becomes a button that opens it in a new tab.
 * ───────────────────────────────────────────────────────────────────
 */

/** Your live form. Taken from the embed code — this one is done. */
const FORM_ID = '1FAIpQLScFvN5X1tFs6lfWBkptA28j1fqmccFGFgmUwDz-xTz3WmJB3Q';

/**
 * ⚠️  THE ONE VALUE STILL NEEDED — the email question's field name.
 *
 * It isn't in the embed code (that's just an iframe pointing at the form),
 * and it can't be read from the published form remotely. 30 seconds to get:
 *
 *   Easiest — in the form, ⋮ menu (top right) → "Get pre-filled link" →
 *   type anything in the email box → "Get link" → "COPY LINK". Paste the
 *   whole URL into PREFILLED_LINK below and you're done; the entry name is
 *   pulled out of it automatically.
 *
 *   Or — open the live form, right-click the email box → Inspect, and copy
 *   the input's `name` attribute (looks like `entry.1234567890`) into
 *   EMAIL_FIELD_ID below.
 *
 * Either one works. Until one is filled in, the button still validates the
 * address and shows the thank-you state, but nothing reaches your form —
 * and a console warning says so, so you can't ship it by accident.
 */
const EMAIL_FIELD_ID = 'entry.1825157573';
const PREFILLED_LINK = '';

/**
 * Pulls the POST endpoint and the email field name out of a Google Forms
 * pre-filled link. Returns null if the link is empty or isn't one.
 */
function parsePrefilledLink(link: string): { actionUrl: string; emailFieldId: string } | null {
  if (!link.trim()) return null;
  try {
    const url = new URL(link.trim());
    const field = [...url.searchParams.keys()].find((key) => key.startsWith('entry.'));
    if (!field || !url.pathname.includes('/forms/')) return null;
    return {
      actionUrl: `${url.origin}${url.pathname.replace(/\/viewform\/?$/, '/formResponse')}`,
      emailFieldId: field,
    };
  } catch {
    return null;
  }
}

const derived = parsePrefilledLink(PREFILLED_LINK);
const fieldId = derived?.emailFieldId ?? EMAIL_FIELD_ID.trim();

export const signup = {
  mode: 'post' as 'post' | 'link',

  /** Google Form POST endpoint. */
  actionUrl:
    derived?.actionUrl ?? `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`,

  /** Public link to the form itself, used by `mode: 'link'`. */
  viewUrl: `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`,

  /** The `entry.XXXXXXXXX` name of the email question. */
  emailFieldId: fieldId,

  /** True once responses will actually reach the form. */
  configured: /^entry\.\d+$/.test(fieldId),

  /** Microcopy around the form. */
  heading: 'Get in before everyone else',
  subheading:
    'Early access opens in waves. Drop your email and you go in the first one — plus you help pick which categories we build next.',
  buttonLabel: 'Join the waitlist',
  buttonLabelBusy: 'Adding you…',

  /** The thank-you block that replaces the form in place after a signup. */
  successTitle: 'Thanks for joining the waitlist',
  successBody:
    "You're in. We'll email you the moment early access opens — and you'll get first say on which categories we build next.",

  /** Validation messages. Each says what's wrong and what to do about it. */
  errorEmpty: 'Enter your email address to join the waitlist.',
  errorNoAt: 'That needs to be an email address — the @ is missing.',
  errorMalformed: "That doesn't look like a complete email address. Mind checking it?",
  errorNetwork: 'Something went wrong on our end. Mind trying again in a moment?',

  privacyNote: 'One email when we launch. No spam, no sharing your address, unsubscribe in a click.',
};

/**
 * ───────────────────────────────────────────────────────────────────
 *  APP STORE LINKS
 * ───────────────────────────────────────────────────────────────────
 *  You don't have these yet, and that's fine — the badges render as
 *  "Coming soon" placeholders that are visible but not clickable.
 *
 *  When your listings go live: paste the URL into `url` and flip
 *  `live` to true. The badge becomes a real link automatically, the
 *  "Coming soon" ribbon disappears, and nothing else needs to change.
 * ───────────────────────────────────────────────────────────────────
 */
export const stores = [
  {
    id: 'apple',
    name: 'App Store',
    preLabel: 'Coming soon to the',
    live: false,
    url: '', // e.g. https://apps.apple.com/us/app/youchoose/id0000000000
  },
  {
    id: 'google',
    name: 'Google Play',
    preLabel: 'Coming soon to',
    live: false,
    url: '', // e.g. https://play.google.com/store/apps/details?id=app.youchoose
  },
] as const;

/**
 * ───────────────────────────────────────────────────────────────────
 *  PAGE CONTENT
 * ───────────────────────────────────────────────────────────────────
 */

/** Above-the-fold hero. Benefit-led, second person, no product jargon.
 *  Nothing sits above the headline — it gets the first read on its own. */
export const hero = {
  headline: 'Never say "I don\'t know, you pick" again',
  subhead:
    'You both swipe. YouChoose finds the one thing you actually agree on — dinner, a movie, a hike, a board game — in about 30 seconds.',
  primaryCta: 'Get early access',
  secondaryCta: 'See how it works',
  proofPoints: ['Free to join the waitlist', 'No credit card', 'iOS & Android at launch'],
} as const;

/** The three-step "how it works" band. */
export const steps = [
  {
    number: '01',
    title: 'Pair up in one tap',
    body: 'Send a code to your partner, your roommate, or the whole group chat. No accounts to juggle, no setup night.',
  },
  {
    number: '02',
    title: 'Swipe for 30 seconds',
    body: 'Restaurants, movies, date ideas, trails, board games. Left for no, right for yes. Do it from the couch, separately or together.',
  },
  {
    number: '03',
    title: 'Get one answer',
    body: 'The second you both like the same thing, it surfaces as a match — with hours, price range, and directions already attached.',
  },
] as const;

/** Differentiator cards. This is where we separate from dumb random pickers. */
export const features = [
  {
    icon: 'sparkle',
    title: 'It learns what you two like',
    body: 'Every swipe teaches it. By week three it stops suggesting the sushi place you keep rejecting and starts finding the ones you would have never searched for.',
  },
  {
    icon: 'dice',
    title: 'Two moods, one button',
    body: 'Sure Thing plays it safe with something you are almost certain to love. Wildcard pushes you just far enough outside your usual to be interesting.',
  },
  {
    icon: 'filter',
    title: 'Your rules, respected',
    body: 'Budget, drive time, dietary needs, genres you refuse to watch. Set it once in onboarding and nothing that breaks your rules ever shows up.',
  },
  {
    icon: 'users',
    title: 'Works for the group, not just the pair',
    body: 'Six people, six sets of opinions, one plan. Group mode weights the overlap so nobody gets steamrolled and nobody has to be the decider.',
  },
  {
    icon: 'clock',
    title: 'Built for the 7pm scramble',
    body: 'No feed to scroll, no reviews to cross-reference. Open it hungry, close it with a plan and a table.',
  },
  {
    icon: 'shield',
    title: 'Your data stays yours',
    body: 'We match you with your people — not with advertisers. Your swipe history is never sold and never leaves your pair.',
  },
] as const;

/** The band directly under the hero: who it's for, then what it covers.
 *  The audience line lives here rather than above the headline so the
 *  headline gets the first read uninterrupted — this is the first thing
 *  the eye lands on after it. */
export const strip = {
  audience: 'Built for couples, roommates, and group chats that can never decide.',
  /* Says what the row below IS. "Swipe across" read like an instruction to
     swipe the carousel itself, which is not what these are. */
  label: 'These are the kinds of activities you swipe on:',
} as const;

/** Categories shown as chips — signals breadth at a glance. */
export const categories = [
  'Restaurants',
  'Movies & TV',
  'Date ideas',
  'Board games',
  'Hikes & outdoors',
  'Local events',
  'Takeout',
  'Weekend trips',
  'Coffee shops',
  'At-home nights',
] as const;

/** Objection-handling FAQ. Short answers only. */
export const faqs = [
  {
    q: 'When does it launch?',
    a: 'We are building toward a public beta and inviting waitlist members in waves before that. Joining the list is how you get in first.',
  },
  {
    q: 'Is it free?',
    a: 'The core loop — pairing, swiping, and matching — will be free. We are exploring a small optional tier for power features like trip planning.',
  },
  {
    q: 'How is this different from spinning a wheel?',
    a: 'A random picker ignores both of you. YouChoose only surfaces things you have both said yes to, and it gets measurably better at guessing as it learns your history.',
  },
  {
    q: 'Do I need my partner to sign up before I can try it?',
    a: 'No. You can set your preferences and start swiping solo — your matches just start appearing once someone joins your pair.',
  },
] as const;
