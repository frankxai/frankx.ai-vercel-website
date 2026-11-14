# Architecture blueprints

A visitor can open `/blueprints`, read the offer cards, and start a checkout from a card action without leaving the page.

## Sub-features

- `blueprints-open` shows the page heading and the offer grid.
- `blueprint-cards` lists the published blueprint offers inside `#blueprint-cards`.
- `checkout-entry` opens the checkout modal from a card button. Completing a payment is out of scope and will degrade without Stripe or Lemon Squeezy keys.

## How to get to it (user POV)

- Open `/blueprints`.
- Choose `Choose your blueprint` to jump to `#blueprint-cards`.
- Choose a card's call-to-action button to open the checkout modal.

## Driving it with Python Playwright

Preconditions:

- Local or production doctor is clean, as in the skill.
- Stripe, Lemon Squeezy, and other payment secrets are unset on a local no-secrets build. The cards and modal entry must still render.

- **Open the page.** Go to `/blueprints`. Wait for an `h1` that contains `Architecture blueprints`.
- **Grid.** `#blueprint-cards` is visible and contains at least one offer card. Capture the grid at 1280, 1024, and 375.
- **Checkout entry.** Click a visible card button (the control rendered by `BlueprintCardAction`). A checkout modal appears. Capture that resulting state, then close the modal (do not fill payment fields, do not confirm a purchase).
- **Proof.** Screenshots of the grid and of the opened modal, plus `measurements.json` (heading text, card count, modal opened).
- **Command.** `python scripts/verify/run-journey.py --journey blueprints --target local` or `--target prod`.

## Gotchas

- Local verification is deliberately run without payment secrets. A checkout that cannot complete is expected; failing to render the cards or to open the modal is not.
- Do not drive a real purchase against production.
- The hero link `Choose your blueprint` only scrolls to `#blueprint-cards`. The purchase action is the card button.
