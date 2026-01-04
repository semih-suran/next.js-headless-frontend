# 🛍️ Headless Commerce Frontend - Next.js + Shopify Storefront GraphQL

This project is a **production-style frontend architecture demo** built with **Next.js, TypeScript, and the Shopify Storefront GraphQL API**. It focuses on **frontend engineering craft**, data-oriented UI design, resilient UX flows, accessibility, performance discipline, and a mature testing approach, while treating Shopify as the **headless commerce backend**.

The application implements a modern e-commerce experience:

* Product browsing, filtering, search, and variant selection
* Cart and checkout (Shopify-hosted payment redirect)
* Secure customer login and protected account area
* Orders, tracking UI, invoice downloads (mocked / metafield-driven)
* Favourites, parts-lists, and quote-style B2B behaviours
* SWR-based GraphQL orchestration with graceful loading + error states

The intent is to demonstrate **how a senior frontend engineer structures, reasons about, and delivers a headless commerce application**.

---

## 🎯 Goals & Principles

This project is explicitly **frontend-focused**:

* Shopify owns commerce logic (catalog, cart, checkout, customer accounts).
* The frontend is responsible for **architecture, UX behaviour, and data flow quality**.
* Where Shopify does not expose functionality (e.g., quotes, parts lists), features are implemented using **metafields or simulated persistence**, with trade-offs documented.

Design priorities:

* **Clarity of architecture over feature volume**
* **Predictable data-flow and state boundaries**
* **Resilient UX over “happy-path only” behaviour**
* **Readable code that models intent, not just outcome**

---

## 🧱 Tech Stack

* **Next.js (App Router) + React + TypeScript (strict mode)**
* **Shopify Storefront GraphQL API**
* **SWR + graphql-request** for data-fetching and caching
* **httpOnly cookie session** for `customerAccessToken`
* **Tailwind / design-system-style UI components**
* **Jest + React Testing Library + MSW (integration mocks)**
* **Playwright / Cypress for E2E**
* **ESLint, Prettier, CI gates (lint → typecheck → tests → build)**

---

## 🧭 Architecture & Information Flow

### Backend model (by design)

Shopify provides:

* Products, Collections, Variants
* Cart & Checkout (redirect-based payment)
* Customers & Orders

The frontend consumes the API via **GraphQL**, and models:

* page-level loading & error strategies
* optimistic interactions
* background revalidation semantics
* graceful failure & recovery states

### Data & state boundaries

| Concern                                      | Where it lives                      |
| -------------------------------------------- | ----------------------------------- |
| Product / Cart / Customer / Orders           | Shopify GraphQL                     |
| UI state (filters, modals, local selections) | React state                         |
| Session token                                | httpOnly cookie                     |
| Favourites / Parts Lists / Quotes            | metafields or simulated persistence |
| SEO-critical data                            | server / RSC fetch                  |
| Interactive flows                            | SWR + client caching                |

Revalidation model: **on-focus + after mutations**, optional polling on order status pages.

---

## 🧭 Routes & Feature Surface

### Catalog & Product Experience

* `/products` : listing with search + filters
* `/products/[handle]` : details, variants, price, availability

Filters map to Shopify attributes:

* MPN → tag / metafield
* Type → `productType`
* Style/category → collections / tags
* Colour/size → variant options
* Price range → GraphQL price filters

### Cart & Checkout

* `/cart` : quantity editing, price totals, validation states
* `/checkout` : review → redirect to Shopify checkout URL
* Guest carts persist locally, and are **merged into the user cart on login**

### Authentication (Shopify-aligned)

* Login uses `customerAccessTokenCreate`
* Account lifecycle (registration, email verification, password reset) follows **Shopify’s native model**
* Focus is on **secure login + session handling**, with simulated flows where admin APIs would otherwise be required

### My Account

* `/account/overview`
* `/account/orders` + `/account/orders/[id]`
* `/account/favourites`
* `/account/parts-lists`
* `/account/quotes`
* `/account/invoices`
* `/account/profile`
* `/account/preferences`

#### Restored enterprise-style behaviours

* **Parcel tracking timeline** (metafield or deterministic mock)
* **Invoice downloads** (mock PDFs or metafield URLs)
* **B2B-style features**:

  * favourites
  * named parts lists (“Add list to cart”)
  * quote-style flows with visual statuses

These features are intentionally implemented to demonstrate **information-rich account UX patterns beyond basic storefronts**.

---

## 🛠️ Data-Fetching Patterns

* All remote data retrieved via **GraphQL queries + SWR caching keys**
* Mutations trigger:

  * optimistic UI updates where safe
  * SWR revalidation on success
* SEO-relevant pages may prefetch via server functions / RSC

This approach keeps **server truth authoritative**, while the UI remains responsive and failure-tolerant.

---

## ♿ UX, Accessibility & Performance

* Skeleton loading + soft-transitions
* Empty-state and failure-state UX (not just happy paths)
* Semantic HTML, keyboard operability, ARIA-aware controls
* Next Image for Shopify media optimisation
* Bundle discipline & lazy-loading of non-critical UI
* Browser + network stress testing for cart/order flows

---

## 🧪 Testing Strategy

* **Unit tests**

  * components, utilities, UI logic
* **Integration tests**

  * SWR + GraphQL behaviours with MSW mocks
* **End-to-End**

  * browse → add to cart → checkout redirect
  * login → view orders
  * favourites / parts-lists interactions
* CI blocks merges on lint, type, and tests

---

## 📝 Trade-Offs & Scope Notes

* Some account features (quotes, parts lists, invoices) are implemented via **metafields or simulated persistence**, because Shopify does not expose them directly via Storefront.
* This is intentional: the goal is to demonstrate **UX architecture and feature modelling**, not to build a custom backend.
* Where appropriate, the README and code explain how these features would evolve in a **full composable-commerce environment**.

---

## 🚀 Roadmap (Incremental Enhancements)

* Expand metafield-based persistence for favourites & lists
* Add order webhooks → UI refresh without polling
* Support multi-currency price formatting
* A/B compare catalog search strategies
* Lighthouse & bundle-regression CI step

---
