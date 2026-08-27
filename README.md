# Neo Nexor Storefront

A modern, responsive e-commerce storefront built for the Neo Nexor Frontend UI Designer assessment. Customer-facing only — no backend, no admin dashboard.

## Live Demo
[neo-nexor-ecommerce.vercel.app](https://neo-nexor-ecommerce.vercel.app/)

## Repository
https://github.com/swapnil-dev-pro/Neo-Nexor-Ecommerce

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Motion:** Framer Motion
- **State:** Zustand (with persist middleware)
- **Data:** Static JSON in `/src/database`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## State Management

Zustand was chosen for cart and wishlist state because it requires minimal boilerplate compared to Redux, while still offering a clean, centralized store — unlike Context, which would need extra work to avoid unnecessary re-renders across the app. The built-in `persist` middleware syncs both stores to `localStorage` automatically, so cart and wishlist contents survive a page refresh, satisfying the assessment's persistence requirement without any custom logic.

## Data Fetching

Since all data is static and small, product/order/category JSON files are imported directly rather than using SWR or React Query. A caching layer would add complexity without benefit here, since there's no network latency to manage — the data is already in the client bundle.

## Assumptions

- **No authentication:** Since the brief didn't require login/auth, all orders in `orders.json` are treated as belonging to a single demo customer on the "My Orders" page — the `customerUuid` field exists for data-shape completeness but isn't used for filtering.
- **Order status grouping:** The API guideline's fuller order lifecycle (pending → confirmed → processing → shipped → out_for_delivery → delivered/completed, plus cancelled/returned) is grouped into the four top-level statuses required by the brief (Pending, Delivered, Cancelled, Returned) for the "My Orders" filter tabs. The full lifecycle is shown on the Order Tracking timeline.
- **Checkout is a mock flow:** Placing an order clears the cart and shows a confirmation screen; it doesn't append to `orders.json` since that file is static (build-time) data.
- **Images:** Product/category photos are sourced from Unsplash for demo purposes and stored in `/public`.

## Project Structure

```
src/
├── app/            # Routes (App Router)
├── components/     # Reusable UI components
├── database/       # Static JSON data (products, categories, brands, orders)
├── store/          # Zustand stores (cart, wishlist)
└── types/          # TypeScript types
```

## Design Approach

I tried to keep the design simple and clear so anyone using the site — not just tech-savvy users — can understand what to do without confusion. A few things I focused on:

- Used one main accent color (indigo) consistently for buttons and important actions, so users can easily spot what's clickable.
- Icons (cart, wishlist, search) are paired with clear positioning and hover states, so their purpose is obvious even without extra labels.
- Every destructive action (like removing an item from cart or wishlist) shows a confirmation popup first, instead of deleting it instantly — this avoids accidental deletions.
- Empty states (empty cart, empty wishlist, no search results) are designed with a friendly message and a clear next step, instead of just showing a blank page.
- Form validation on checkout shows specific error messages (e.g. "Enter a valid phone number") right under the input field, so users know exactly what to fix.

Overall, the goal was to make the shopping experience feel smooth and self-explanatory, without needing any instructions.