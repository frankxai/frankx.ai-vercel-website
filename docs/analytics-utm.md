# Analytics events and UTM convention

## Events (Vercel Web Analytics)

Defined in `lib/track.ts`. Names and props are fixed. Never send an email, name, or free text.

| Event | Props | Fires |
|---|---|---|
| `waitlist_join` | `product`, `source` | After `/api/subscribe` returns ok in every signup form |
| `cta_click` | `cta`, `location` | Product hero and final CTAs, and the product buy button while checkout is not live |
| `checkout_start` | `product`, `price_band` | Product buy button, only when a live checkout URL exists |

`price_band` is one of `free`, `under-50`, `50-199`, `200-999`, `1000-plus`, `unknown`. Exact prices are not sent.

`waitlist_join` is skipped when `/api/subscribe` answers `duplicate: true` (contact already on file). Each event also carries `utm_source`, `utm_medium`, `utm_campaign` when the visit landed with them. They are read on the landing page and kept in `sessionStorage` for the tab, so a conversion on a later page keeps its campaign. Events respect Do Not Track and Global Privacy Control through `lib/privacy-safe-analytics-client.ts`.

## UTM convention

| Param | Value | Examples |
|---|---|---|
| `utm_source` | platform | `x`, `linkedin`, `youtube`, `newsletter`, `circle`, `github`, or the partner name |
| `utm_medium` | `social`, `email`, `community`, `referral`, `partner` | `social` |
| `utm_campaign` | `yyyy-mm-slug` | `2026-11-launch` |
| `utm_content` | optional, lowercase slug | `hero-video` |

Values are lowercased, with anything outside `a-z 0-9 _ -` turned into `-`.

Build links with `withUtm` from `lib/utm.ts`:

```ts
withUtm('https://frankx.ai/start-here', { source: 'linkedin', medium: 'social', campaign: '2026-11-launch' })
// https://frankx.ai/start-here?utm_source=linkedin&utm_medium=social&utm_campaign=2026-11-launch
```

Existing `utm_*` on a URL are never overwritten. `mailto:` and `tel:` links are returned unchanged.
