# E-Commerce Patterns — AuraDKit

> Derived from analysis of: vercel.com/commerce, stripe.com payments UI, shopify.com storefront patterns, linear.app checkout.

## Structure Overview

```
Product listing → Product detail → Cart (sidebar) → Checkout → Confirmation
```

Each step is a separate screen or panel. Never combine checkout with product detail.

---

## 1. Product Card (Listing Grid)

```html
<section aria-label="Product catalog" data-state="default">

  <!-- Grid -->
  <div style="display: grid;
              grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
              gap: var(--aurad-space-6);">

    <article aria-label="Midnight Hoodie — $89">

      <a href="/products/midnight-hoodie"
         style="display: block; text-decoration: none;"
         tabindex="-1"
         aria-hidden="true">
        <!-- Product image with hover second image -->
        <div style="position: relative; aspect-ratio: 3/4; overflow: hidden;
                    border-radius: var(--aurad-radius-lg);
                    background: var(--aurad-surface-sunken);">
          <img src="/products/hoodie-front.jpg"
               alt=""
               loading="lazy"
               style="inline-size: 100%; block-size: 100%; object-fit: cover;
                      transition: opacity var(--aurad-duration-normal);">
          <!-- Hover image (hidden by default) -->
          <img src="/products/hoodie-back.jpg"
               alt=""
               loading="lazy"
               aria-hidden="true"
               style="position: absolute; inset: 0;
                      inline-size: 100%; block-size: 100%; object-fit: cover;
                      opacity: 0;
                      transition: opacity var(--aurad-duration-normal);">
          <!-- Badge -->
          <span style="position: absolute; inset-block-start: var(--aurad-space-3);
                       inset-inline-start: var(--aurad-space-3);
                       padding: 2px 8px;
                       background: var(--aurad-error);
                       color: var(--aurad-text-inverse);
                       border-radius: var(--aurad-radius-full);
                       font-size: var(--aurad-text-xs); font-weight: 600;">
            Sale
          </span>
        </div>
      </a>

      <div style="padding-block-start: var(--aurad-space-3);">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <h2 style="font-size: var(--aurad-text-sm); font-weight: 500;
                     color: var(--aurad-text); margin-block-end: var(--aurad-space-1);">
            <a href="/products/midnight-hoodie"
               style="color: inherit; text-decoration: none;">
              Midnight Hoodie
            </a>
          </h2>
          <!-- Quick add button (visible on hover) -->
          <button type="button"
                  aria-label="Quick add Midnight Hoodie to cart"
                  style="padding: var(--aurad-space-1) var(--aurad-space-3);
                         border: 1px solid var(--aurad-border);
                         border-radius: var(--aurad-radius-full);
                         background: var(--aurad-surface-raised);
                         font-size: var(--aurad-text-xs); font-weight: 500;
                         color: var(--aurad-text); cursor: pointer;">
            + Add
          </button>
        </div>

        <!-- Color swatches -->
        <div style="display: flex; gap: var(--aurad-space-1);
                    margin-block: var(--aurad-space-2);"
             role="group"
             aria-label="Available colors">
          <button type="button"
                  aria-label="Black — selected"
                  aria-pressed="true"
                  style="inline-size: 16px; block-size: 16px;
                         border-radius: var(--aurad-radius-full);
                         background: #1a1a1a;
                         border: 2px solid var(--aurad-border-focus);
                         cursor: pointer; padding: 0;">
          </button>
          <button type="button"
                  aria-label="Slate"
                  aria-pressed="false"
                  style="inline-size: 16px; block-size: 16px;
                         border-radius: var(--aurad-radius-full);
                         background: #64748b;
                         border: 2px solid transparent;
                         cursor: pointer; padding: 0;">
          </button>
        </div>

        <!-- Price -->
        <div style="display: flex; align-items: baseline; gap: var(--aurad-space-2);">
          <span style="font-size: var(--aurad-text-sm); font-weight: 600;
                       color: var(--aurad-text);">
            $71
          </span>
          <span style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                       text-decoration: line-through;">
            $89
          </span>
        </div>
      </div>

    </article>

    <!-- LOADING state card (skeleton) -->
    <article aria-busy="true" aria-label="Loading product">
      <div style="aspect-ratio: 3/4; border-radius: var(--aurad-radius-lg);"
           class="skeleton"></div>
      <div style="padding-block-start: var(--aurad-space-3); display: flex;
                  flex-direction: column; gap: var(--aurad-space-2);">
        <div class="skeleton" style="block-size: 16px; inline-size: 60%;
                                      border-radius: var(--aurad-radius-sm);"></div>
        <div class="skeleton" style="block-size: 14px; inline-size: 40%;
                                      border-radius: var(--aurad-radius-sm);"></div>
      </div>
    </article>

  </div>

</section>

<style>
.skeleton {
  background: var(--aurad-surface-sunken);
  animation: skeleton-pulse 2s ease-in-out infinite;
}
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; }
}
</style>
```

---

## 2. Cart Sidebar (Slide-in Drawer)

```html
<!-- Cart overlay backdrop -->
<div id="cart-backdrop"
     style="position: fixed; inset: 0;
            background: var(--aurad-overlay);
            z-index: var(--aurad-z-overlay);"
     aria-hidden="true">
</div>

<!-- Cart drawer -->
<div id="cart-sidebar"
     role="dialog"
     aria-modal="true"
     aria-label="Shopping cart"
     aria-live="polite"
     style="position: fixed;
            inset-block: 0; inset-inline-end: 0;
            inline-size: min(420px, 100vw);
            background: var(--aurad-surface-raised);
            border-inline-start: 1px solid var(--aurad-border);
            z-index: var(--aurad-z-modal);
            display: flex; flex-direction: column;">

  <!-- Cart header -->
  <div style="display: flex; align-items: center; justify-content: space-between;
              padding: var(--aurad-space-5) var(--aurad-space-6);
              border-block-end: 1px solid var(--aurad-border);">
    <h2 style="font-size: var(--aurad-text-lg); font-weight: 600;
               color: var(--aurad-text);">
      Cart
      <span style="font-size: var(--aurad-text-sm); font-weight: 400;
                   color: var(--aurad-text-muted); margin-inline-start: var(--aurad-space-2);">
        (3 items)
      </span>
    </h2>
    <button type="button"
            aria-label="Close cart"
            style="padding: var(--aurad-space-2);
                   background: none; border: none; cursor: pointer;
                   color: var(--aurad-text-muted);
                   border-radius: var(--aurad-radius-md);">
      <svg aria-hidden="true" width="20" height="20"><!-- x --></svg>
    </button>
  </div>

  <!-- Cart items (scrollable) -->
  <div style="flex: 1; overflow-y: auto; padding: var(--aurad-space-4) var(--aurad-space-6);">

    <ul role="list" style="list-style: none;
                            display: flex; flex-direction: column;
                            gap: var(--aurad-space-4);">

      <li style="display: flex; gap: var(--aurad-space-4);
                 padding-block-end: var(--aurad-space-4);
                 border-block-end: 1px solid var(--aurad-border);">

        <!-- Thumbnail -->
        <img src="/products/hoodie-thumb.jpg"
             alt="Midnight Hoodie, Black, size M"
             width="72" height="96"
             style="object-fit: cover; border-radius: var(--aurad-radius-md); flex-shrink: 0;">

        <!-- Item details -->
        <div style="flex: 1; min-inline-size: 0;">
          <p style="font-size: var(--aurad-text-sm); font-weight: 500;
                    color: var(--aurad-text);">
            Midnight Hoodie
          </p>
          <p style="font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);
                    margin-block-start: var(--aurad-space-1);">
            Black / M
          </p>

          <!-- Quantity stepper -->
          <div style="display: flex; align-items: center; gap: var(--aurad-space-2);
                      margin-block-start: var(--aurad-space-3);">
            <button type="button"
                    aria-label="Decrease quantity"
                    style="inline-size: 28px; block-size: 28px;
                           display: flex; align-items: center; justify-content: center;
                           border: 1px solid var(--aurad-border);
                           border-radius: var(--aurad-radius-md);
                           background: var(--aurad-surface-raised);
                           cursor: pointer; font-size: var(--aurad-text-sm);">
              −
            </button>
            <span aria-live="polite"
                  style="inline-size: 24px; text-align: center;
                         font-size: var(--aurad-text-sm); font-weight: 500;
                         color: var(--aurad-text);">
              1
            </span>
            <button type="button"
                    aria-label="Increase quantity"
                    style="inline-size: 28px; block-size: 28px;
                           display: flex; align-items: center; justify-content: center;
                           border: 1px solid var(--aurad-border);
                           border-radius: var(--aurad-radius-md);
                           background: var(--aurad-surface-raised);
                           cursor: pointer; font-size: var(--aurad-text-sm);">
              +
            </button>
          </div>
        </div>

        <!-- Price + remove -->
        <div style="display: flex; flex-direction: column; align-items: flex-end;
                    gap: var(--aurad-space-2);">
          <p style="font-size: var(--aurad-text-sm); font-weight: 600;
                    color: var(--aurad-text);">
            $71
          </p>
          <button type="button"
                  aria-label="Remove Midnight Hoodie from cart"
                  style="background: none; border: none; cursor: pointer;
                         font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);
                         text-decoration: underline; padding: 0;">
            Remove
          </button>
        </div>

      </li>
    </ul>
  </div>

  <!-- Cart footer: totals + CTA -->
  <div style="border-block-start: 1px solid var(--aurad-border);
              padding: var(--aurad-space-5) var(--aurad-space-6);">

    <!-- Subtotal -->
    <div style="display: flex; justify-content: space-between;
                margin-block-end: var(--aurad-space-2);">
      <span style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);">Subtotal</span>
      <span style="font-size: var(--aurad-text-sm); font-weight: 500;
                   color: var(--aurad-text);">$213</span>
    </div>
    <p style="font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);
              margin-block-end: var(--aurad-space-5);">
      Taxes and shipping calculated at checkout.
    </p>

    <!-- Checkout CTA -->
    <a href="/checkout"
       style="display: block; text-align: center;
              padding: var(--aurad-space-3);
              background: var(--aurad-text);
              color: var(--aurad-text-inverse);
              border-radius: var(--aurad-radius-md);
              font-weight: 600; font-size: var(--aurad-text-sm);
              text-decoration: none;">
      Continue to checkout
    </a>

    <!-- Trust signals -->
    <p style="text-align: center; font-size: var(--aurad-text-xs);
              color: var(--aurad-text-muted);
              margin-block-start: var(--aurad-space-3);">
      Free returns · Secure checkout
    </p>

  </div>

</div>
```

---

## 3. Key E-Commerce Patterns

| Pattern | Frequency | Impact |
|---------|-----------|--------|
| Hover second image on product card | 4/5 reference | Reduces need to open PDP; increases engagement |
| Cart as slide-in drawer (not page) | 5/5 reference | Keeps browsing context; reduces funnel drop-off |
| Color swatch buttons with `aria-pressed` | 5/5 reference | Accessible selection state |
| Quantity stepper with `aria-live` | 4/5 reference | Screen reader announces updated quantity |
| `aria-live="polite"` on cart drawer | 4/5 reference | Dynamic cart updates announced without interrupting |
| Strikethrough sale price | 5/5 reference | Anchors perceived value |
| Trust signals near checkout CTA | 5/5 reference | "Free returns · Secure checkout" reduces abandonment |

---

## 4. E-Commerce Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Checkout as separate site/subdomain | Breaks visual trust; kills conversion | Same domain, consistent design |
| 6+ step checkout | Each step loses ~10% of users | Consolidate: email → shipping → payment → confirm |
| No guest checkout | Forces account creation | Always offer "Continue as guest" |
| Out-of-stock items hidden | Users can't set alerts | Show "Out of stock" with waitlist option |
| Quantity input (text field) instead of stepper | Mis-entry risk; poor mobile UX | +/− stepper buttons |
| Color shown only as text label | Not visually intuitive | Always show color swatch alongside label |
| Cart badge without live region | Cart count not announced to screen readers | `aria-live="polite"` on cart count element |
