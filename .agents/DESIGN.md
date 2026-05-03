# Design — UI/UX Source of Truth

This file is the canonical record of design decisions for any UI work in this
project. Every visual or UX change should reference and, where appropriate,
update this document. Treat it as living: when you make a design call worth
preserving, write it down here.

`.agents/AGENTS.md` points here from its UI customization section. If you
fork or adapt this dotfiles deployment, this file is yours to rewrite — the
defaults below are starting points, not commandments.

## README and repo-metadata authority

The README.md, GitHub About field, topics, homepage, and right-sidebar display
checkboxes are stamped uniformly across every wranngle repo by `.dotfiles.sh`.
The single authority for that pipeline is:

`~/.dotfiles/docs/exec-plans/active/WRANNGLE-README-SYSTEM.md`

That spec defines the wranngle voice (lowercase taglines, sentence-case
headers, no em-dashes, no exclamation points, single Primer-purple accent
`#A371F7`), the deterministic badge planner (max 4 slots: CI, License, Status,
Package), the project-status classifier (showcase / experiment / active /
reference / tool), and the metadata writers' validation + reconciliation
rules. Read that spec before editing README prose or repo About-field text;
update the spec first if you discover a gap, then re-bootstrap.

## Mission

One sentence describing the aesthetic posture and product feeling.
(Replace with project-specific intent.)

## Audience & posture

- Primary user:
- Reading level / expertise:
- Density bias (information-dense vs. spacious):
- Tone (clinical, playful, terse, conversational):

## Tokens

### Color

- Primary:        ` `
- Surface (bg):   ` `
- Text:           ` `
- Subtle text:    ` `
- Border:         ` `
- Success:        ` `
- Warning:        ` `
- Error:          ` `
- Info:           ` `

Light/dark parity is mandatory unless explicitly opted out.

### Typography

- Display:  ` `
- Body:     ` `
- Mono:     ` `
- Scale (px): 12 · 14 · 16 · 18 · 20 · 24 · 32 · 48
- Line-height ratios: 1.2 (display) · 1.5 (body) · 1.4 (mono)

### Spacing

4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 (px). Compose, don't free-form.

### Radius

0 · 2 · 4 · 8 · 12 · 999. Pick one per surface tier.

### Motion

- Snap (UI feedback):    100ms · ease-out
- Reveal (panels, menus): 200ms · ease-out
- Settle (cross-page):    400ms · ease-in-out
- Respect `prefers-reduced-motion`. Default to reduced when in doubt.

## Components

Decision tree for any new UI:

1. Use a built-in primitive if it exists.
2. Use the project's component library if a primitive composes the need.
3. Custom only when (1) and (2) provably fail. Justify in PR description.

Document component variants here as they're chosen.

## Layout primitives

- Stack (vertical), Inline (horizontal), Grid, Center, Spacer.
- Avoid raw flex/grid in feature code; reach for primitives.
- Page-level shell: define here.

## Accessibility floor

- WCAG 2.2 AA, no exceptions without an issue tracking the gap.
- Contrast: 4.5:1 body, 3:1 large/icon.
- Keyboard reachable, focus visible, focus order sane.
- Screen-reader names + landmarks on every interactive surface.
- Hit targets ≥ 24×24 CSS px (44×44 on touch).
- Form fields have visible labels (placeholders are not labels).

## Iconography

- Source:
- Stroke weight:
- Size scale: 16 · 20 · 24 · 32

## Copy & voice

- Voice:    ` `
- Tone:     ` `
- Banned phrases / patterns:
- Capitalization (sentence vs. title case):
- Numerals, units, dates: spell out under 10? ISO dates?

## Don'ts

- (Curate a list of design anti-patterns observed and rejected here.)

## Sources of truth (links)

- Design system / Figma:
- Token registry / Tailwind config:
- Component library:
- Production reference URL:

## Customization checklist (for new projects)

- [ ] Replace mission sentence.
- [ ] Fill color tokens.
- [ ] Fill typography stack.
- [ ] Pick spacing/radius/motion tiers.
- [ ] Link sources of truth.
- [ ] Pin iconography source.
- [ ] Add project-specific don'ts.
