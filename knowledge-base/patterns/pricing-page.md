# Pricing Page Patterns — AuraDKit

> Derived from analysis of: stripe.com/pricing, vercel.com/pricing, linear.app/pricing, cal.com/pricing, resend.com/pricing, raycast.com/pricing, loom.com/pricing.

## Structure Overview

```
1. Header: "Simple, transparent pricing" + billing toggle
2. Plan grid (2–4 columns, middle tier highlighted)
3. Feature comparison table (optional, enterprise-tier pages)
4. FAQ accordion
5. CTA banner: "Still have questions? Talk to us"
6. Social proof: logos or testimonials
```

Minimum viable pricing page: Plan grid + FAQ.

---

## 1. Billing Toggle (Monthly / Annual)

The toggle is the first interactive element — annual toggle drives revenue uplift.

```html
<!-- Billing toggle -->
<div style="display: flex; align-items: center; justify-content: center;
            gap: var(--aurad-space-3); margin-block-end: var(--aurad-space-10);">
  <span style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);">
    Monthly
  </span>

  <!-- Toggle switch -->
  <button type="button"
          role="switch"
          aria-checked="false"
          aria-label="Toggle annual billing"
          id="billing-toggle"
          style="position: relative;
                 inline-size: 44px; block-size: 24px;
                 background: var(--aurad-primary);
                 border-radius: var(--aurad-radius-full);
                 border: none; cursor: pointer;
                 transition: background var(--aurad-duration-fast);">
    <span style="position: absolute;
                 inset-block-start: 2px; inset-inline-start: 2px;
                 inline-size: 20px; block-size: 20px;
                 background: white;
                 border-radius: var(--aurad-radius-full);
                 transition: transform var(--aurad-duration-fast);">
    </span>
  </button>

  <span style="font-size: var(--aurad-text-sm); color: var(--aurad-text);">
    Annual
    <!-- Savings badge -->
    <span style="display: inline-flex; align-items: center;
                 margin-inline-start: var(--aurad-space-2);
                 padding: 2px 8px;
                 background: var(--aurad-success-subtle);
                 color: var(--aurad-success);
                 border-radius: var(--aurad-radius-full);
                 font-size: var(--aurad-text-xs); font-weight: 600;">
      Save 20%
    </span>
  </span>
</div>

<script>
const toggle = document.getElementById('billing-toggle');
let isAnnual = false;

toggle.addEventListener('click', () => {
  isAnnual = !isAnnual;
  toggle.setAttribute('aria-checked', String(isAnnual));
  toggle.querySelector('span').style.transform = isAnnual ? 'translateX(20px)' : 'translateX(0)';

  // Update all prices on page
  document.querySelectorAll('[data-monthly]').forEach(el => {
    el.textContent = isAnnual
      ? el.dataset.annual
      : el.dataset.monthly;
  });
  document.querySelectorAll('[data-period]').forEach(el => {
    el.textContent = isAnnual ? '/mo, billed annually' : '/month';
  });
});
</script>
```

---

## 2. Plan Grid (3-Tier — Reference Pattern)

```html
<div style="display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: var(--aurad-space-6);
            align-items: start;
            max-inline-size: 1100px;
            margin-inline: auto;">

  <!-- Tier 1: Free / Starter -->
  <article style="background: var(--aurad-surface-raised);
                  border: 1px solid var(--aurad-border);
                  border-radius: var(--aurad-radius-xl);
                  padding: var(--aurad-space-8);">

    <div style="margin-block-end: var(--aurad-space-6);">
      <h3 style="font-size: var(--aurad-text-lg); font-weight: 600;
                 color: var(--aurad-text);">
        Starter
      </h3>
      <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                margin-block-start: var(--aurad-space-1);">
        For individuals and small projects
      </p>
    </div>

    <div style="margin-block-end: var(--aurad-space-6);">
      <p style="font-size: var(--aurad-text-4xl); font-weight: 700;
                color: var(--aurad-text); line-height: 1;">
        $0
      </p>
      <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                margin-block-start: var(--aurad-space-1);">
        Free forever
      </p>
    </div>

    <a href="/signup"
       style="display: block; text-align: center;
              padding: var(--aurad-space-3);
              border: 1px solid var(--aurad-border);
              border-radius: var(--aurad-radius-md);
              font-size: var(--aurad-text-sm); font-weight: 500;
              color: var(--aurad-text);
              text-decoration: none;
              margin-block-end: var(--aurad-space-6);
              transition: background var(--aurad-duration-fast);">
      Get started free
    </a>

    <ul style="list-style: none; display: flex; flex-direction: column;
               gap: var(--aurad-space-3);">
      <li style="display: flex; gap: var(--aurad-space-2); align-items: flex-start;
                 font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);">
        <svg aria-hidden="true" width="16" height="16"
             style="flex-shrink: 0; margin-block-start: 1px;
                    color: var(--aurad-success);"><!-- check --></svg>
        Up to 3 projects
      </li>
      <li style="display: flex; gap: var(--aurad-space-2); align-items: flex-start;
                 font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);">
        <svg aria-hidden="true" width="16" height="16"
             style="flex-shrink: 0; margin-block-start: 1px;
                    color: var(--aurad-success);"><!-- check --></svg>
        1 team member
      </li>
      <li style="display: flex; gap: var(--aurad-space-2); align-items: flex-start;
                 font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);">
        <svg aria-hidden="true" width="16" height="16"
             style="flex-shrink: 0; margin-block-start: 1px;
                    color: var(--aurad-success);"><!-- check --></svg>
        Community support
      </li>
    </ul>

  </article>

  <!-- Tier 2: Pro — HIGHLIGHTED (most popular) -->
  <article style="background: var(--aurad-surface-raised);
                  border: 2px solid var(--aurad-primary);
                  border-radius: var(--aurad-radius-xl);
                  padding: var(--aurad-space-8);
                  position: relative;">

    <!-- Popular badge -->
    <span style="position: absolute;
                 inset-block-start: -13px;
                 inset-inline-start: 50%;
                 transform: translateX(-50%);
                 background: var(--aurad-primary);
                 color: var(--aurad-text-inverse);
                 padding: 2px 12px;
                 border-radius: var(--aurad-radius-full);
                 font-size: var(--aurad-text-xs); font-weight: 600;
                 white-space: nowrap;">
      Most popular
    </span>

    <div style="margin-block-end: var(--aurad-space-6);">
      <h3 style="font-size: var(--aurad-text-lg); font-weight: 600;
                 color: var(--aurad-text);">
        Pro
      </h3>
      <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                margin-block-start: var(--aurad-space-1);">
        For growing teams
      </p>
    </div>

    <div style="margin-block-end: var(--aurad-space-6);">
      <p style="font-size: var(--aurad-text-4xl); font-weight: 700;
                color: var(--aurad-text); line-height: 1;">
        <span data-monthly="$19" data-annual="$16">$19</span>
      </p>
      <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                margin-block-start: var(--aurad-space-1);"
         data-period>/month</p>
    </div>

    <a href="/signup?plan=pro"
       style="display: block; text-align: center;
              padding: var(--aurad-space-3);
              background: var(--aurad-primary);
              color: var(--aurad-text-inverse);
              border-radius: var(--aurad-radius-md);
              font-size: var(--aurad-text-sm); font-weight: 600;
              text-decoration: none;
              margin-block-end: var(--aurad-space-6);
              transition: opacity var(--aurad-duration-fast);">
      Start free trial
    </a>

    <ul style="list-style: none; display: flex; flex-direction: column;
               gap: var(--aurad-space-3);">
      <li style="display: flex; gap: var(--aurad-space-2); font-size: var(--aurad-text-sm);">
        <svg aria-hidden="true" width="16" height="16"
             style="flex-shrink: 0; margin-block-start: 1px;
                    color: var(--aurad-primary);"><!-- check --></svg>
        <span><strong>Everything in Starter</strong>, plus:</span>
      </li>
      <li style="display: flex; gap: var(--aurad-space-2); font-size: var(--aurad-text-sm);
                 color: var(--aurad-text-muted);">
        <svg aria-hidden="true" width="16" height="16"
             style="flex-shrink: 0; margin-block-start: 1px;
                    color: var(--aurad-success);"><!-- check --></svg>
        Unlimited projects
      </li>
      <li style="display: flex; gap: var(--aurad-space-2); font-size: var(--aurad-text-sm);
                 color: var(--aurad-text-muted);">
        <svg aria-hidden="true" width="16" height="16"
             style="flex-shrink: 0; margin-block-start: 1px;
                    color: var(--aurad-success);"><!-- check --></svg>
        Up to 20 team members
      </li>
      <li style="display: flex; gap: var(--aurad-space-2); font-size: var(--aurad-text-sm);
                 color: var(--aurad-text-muted);">
        <svg aria-hidden="true" width="16" height="16"
             style="flex-shrink: 0; margin-block-start: 1px;
                    color: var(--aurad-success);"><!-- check --></svg>
        Priority support (24h response)
      </li>
    </ul>

  </article>

  <!-- Tier 3: Enterprise -->
  <article style="background: var(--aurad-surface-raised);
                  border: 1px solid var(--aurad-border);
                  border-radius: var(--aurad-radius-xl);
                  padding: var(--aurad-space-8);">

    <div style="margin-block-end: var(--aurad-space-6);">
      <h3 style="font-size: var(--aurad-text-lg); font-weight: 600;
                 color: var(--aurad-text);">
        Enterprise
      </h3>
      <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                margin-block-start: var(--aurad-space-1);">
        For large organizations
      </p>
    </div>

    <div style="margin-block-end: var(--aurad-space-6);">
      <p style="font-size: var(--aurad-text-4xl); font-weight: 700;
                color: var(--aurad-text); line-height: 1;">
        Custom
      </p>
      <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                margin-block-start: var(--aurad-space-1);">
        Volume discounts available
      </p>
    </div>

    <a href="/contact"
       style="display: block; text-align: center;
              padding: var(--aurad-space-3);
              border: 1px solid var(--aurad-border);
              border-radius: var(--aurad-radius-md);
              font-size: var(--aurad-text-sm); font-weight: 500;
              color: var(--aurad-text);
              text-decoration: none;
              margin-block-end: var(--aurad-space-6);">
      Talk to sales
    </a>

    <ul style="list-style: none; display: flex; flex-direction: column;
               gap: var(--aurad-space-3);">
      <li style="display: flex; gap: var(--aurad-space-2); font-size: var(--aurad-text-sm);">
        <svg aria-hidden="true" width="16" height="16"
             style="flex-shrink: 0; margin-block-start: 1px;
                    color: var(--aurad-primary);"><!-- check --></svg>
        <span><strong>Everything in Pro</strong>, plus:</span>
      </li>
      <li style="display: flex; gap: var(--aurad-space-2); font-size: var(--aurad-text-sm);
                 color: var(--aurad-text-muted);">
        <svg aria-hidden="true" width="16" height="16"
             style="flex-shrink: 0; margin-block-start: 1px;
                    color: var(--aurad-success);"><!-- check --></svg>
        SSO / SAML
      </li>
      <li style="display: flex; gap: var(--aurad-space-2); font-size: var(--aurad-text-sm);
                 color: var(--aurad-text-muted);">
        <svg aria-hidden="true" width="16" height="16"
             style="flex-shrink: 0; margin-block-start: 1px;
                    color: var(--aurad-success);"><!-- check --></svg>
        Dedicated SLA
      </li>
      <li style="display: flex; gap: var(--aurad-space-2); font-size: var(--aurad-text-sm);
                 color: var(--aurad-text-muted);">
        <svg aria-hidden="true" width="16" height="16"
             style="flex-shrink: 0; margin-block-start: 1px;
                    color: var(--aurad-success);"><!-- check --></svg>
        On-premise deployment
      </li>
    </ul>

  </article>

</div>
```

---

## 3. Feature Comparison Table

Used on enterprise-facing pages (stripe.com, linear.app). Optional — adds conversion friction for consumer plans.

```html
<section style="margin-block-start: var(--aurad-space-16);"
         aria-label="Plan comparison">

  <h2 style="font-size: var(--aurad-text-2xl); font-weight: 700;
             text-align: center; margin-block-end: var(--aurad-space-8);">
    Compare plans
  </h2>

  <div style="overflow-x: auto;">
    <table style="inline-size: 100%; border-collapse: collapse;
                  font-size: var(--aurad-text-sm);">
      <thead>
        <tr>
          <th scope="col"
              style="padding: var(--aurad-space-4); text-align: start;
                     font-weight: 600; color: var(--aurad-text);
                     border-block-end: 2px solid var(--aurad-border);">
            Feature
          </th>
          <th scope="col"
              style="padding: var(--aurad-space-4); text-align: center;
                     font-weight: 600; color: var(--aurad-text-muted);
                     border-block-end: 2px solid var(--aurad-border);">
            Starter
          </th>
          <th scope="col"
              style="padding: var(--aurad-space-4); text-align: center;
                     font-weight: 600; color: var(--aurad-primary);
                     border-block-end: 2px solid var(--aurad-primary);
                     background: var(--aurad-primary-subtle);">
            Pro
          </th>
          <th scope="col"
              style="padding: var(--aurad-space-4); text-align: center;
                     font-weight: 600; color: var(--aurad-text-muted);
                     border-block-end: 2px solid var(--aurad-border);">
            Enterprise
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Feature group row -->
        <tr>
          <td colspan="4"
              style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     font-size: var(--aurad-text-xs); font-weight: 600;
                     text-transform: uppercase; letter-spacing: 0.05em;
                     color: var(--aurad-text-muted);
                     background: var(--aurad-surface-sunken);">
            Core features
          </td>
        </tr>
        <!-- Feature row: check / limit / dash -->
        <tr style="border-block-end: 1px solid var(--aurad-border);">
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     color: var(--aurad-text);">
            Projects
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     text-align: center; color: var(--aurad-text-muted);">
            3
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     text-align: center;
                     background: var(--aurad-primary-subtle);">
            <svg aria-label="Included" width="16" height="16"
                 style="display: inline-block; color: var(--aurad-primary);"><!-- check --></svg>
            Unlimited
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     text-align: center; color: var(--aurad-text-muted);">
            <svg aria-label="Included" width="16" height="16"
                 style="display: inline-block; color: var(--aurad-success);"><!-- check --></svg>
            Unlimited
          </td>
        </tr>
        <!-- Feature row: boolean check -->
        <tr style="border-block-end: 1px solid var(--aurad-border);">
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     color: var(--aurad-text);">
            SSO / SAML
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     text-align: center; color: var(--aurad-text-disabled);">
            <svg aria-label="Not included" width="16" height="16"><!-- dash --></svg>
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     text-align: center; color: var(--aurad-text-disabled);
                     background: var(--aurad-primary-subtle);">
            <svg aria-label="Not included" width="16" height="16"><!-- dash --></svg>
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     text-align: center; color: var(--aurad-success);">
            <svg aria-label="Included" width="16" height="16"><!-- check --></svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</section>
```

---

## 4. FAQ Accordion

```html
<section style="max-inline-size: 640px; margin-inline: auto;
                margin-block-start: var(--aurad-space-16);"
         aria-label="Frequently asked questions">

  <h2 style="font-size: var(--aurad-text-2xl); font-weight: 700;
             text-align: center; margin-block-end: var(--aurad-space-8);">
    Frequently asked questions
  </h2>

  <div style="display: flex; flex-direction: column; gap: 0;">

    <!-- FAQ item -->
    <div style="border-block-start: 1px solid var(--aurad-border);">
      <h3>
        <button type="button"
                aria-expanded="false"
                aria-controls="faq-1-answer"
                id="faq-1"
                style="inline-size: 100%;
                       display: flex; justify-content: space-between; align-items: center;
                       padding: var(--aurad-space-5) 0;
                       background: none; border: none; cursor: pointer;
                       font-size: var(--aurad-text-base); font-weight: 500;
                       color: var(--aurad-text); text-align: start;">
          Can I change plans later?
          <svg aria-hidden="true" width="20" height="20"
               style="flex-shrink: 0; transition: transform var(--aurad-duration-fast);
                      color: var(--aurad-text-muted);">
            <!-- chevron-down -->
          </svg>
        </button>
      </h3>
      <div id="faq-1-answer"
           role="region"
           aria-labelledby="faq-1"
           hidden
           style="padding-block-end: var(--aurad-space-5);
                  font-size: var(--aurad-text-sm);
                  color: var(--aurad-text-muted);
                  line-height: var(--aurad-leading-normal);">
        Yes. You can upgrade, downgrade, or cancel at any time from your account settings.
        Changes take effect at the start of the next billing cycle.
      </div>
    </div>

    <div style="border-block-start: 1px solid var(--aurad-border);
                border-block-end: 1px solid var(--aurad-border);">
      <h3>
        <button type="button"
                aria-expanded="false"
                aria-controls="faq-2-answer"
                id="faq-2"
                style="inline-size: 100%;
                       display: flex; justify-content: space-between; align-items: center;
                       padding: var(--aurad-space-5) 0;
                       background: none; border: none; cursor: pointer;
                       font-size: var(--aurad-text-base); font-weight: 500;
                       color: var(--aurad-text); text-align: start;">
          Is there a free trial?
          <svg aria-hidden="true" width="20" height="20"
               style="flex-shrink: 0; transition: transform var(--aurad-duration-fast);
                      color: var(--aurad-text-muted);">
            <!-- chevron-down -->
          </svg>
        </button>
      </h3>
      <div id="faq-2-answer"
           role="region"
           aria-labelledby="faq-2"
           hidden
           style="padding-block-end: var(--aurad-space-5);
                  font-size: var(--aurad-text-sm);
                  color: var(--aurad-text-muted);
                  line-height: var(--aurad-leading-normal);">
        The Pro plan includes a 14-day free trial. No credit card required to start.
      </div>
    </div>

  </div>
</section>

<script>
document.querySelectorAll('[aria-controls]').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    panel.hidden = expanded;
    const chevron = btn.querySelector('svg');
    chevron.style.transform = expanded ? '' : 'rotate(180deg)';
  });
});
</script>
```

---

## 5. Key Pricing Patterns

| Pattern | Frequency | Impact |
|---------|-----------|--------|
| Middle tier highlighted with 2px primary border | 7/7 reference | Anchors user attention, increases Pro conversion |
| "Everything in [lower tier], plus:" feature list | 6/7 reference | Reduces cognitive load — don't repeat features |
| Annual toggle with savings badge | 7/7 reference | Annual saves 15–25%, drives LTV |
| "Most popular" badge centered above card | 7/7 reference | Social proof at decision point |
| Starter CTA: ghost/outline style | 7/7 reference | Visual hierarchy — primary CTA only on Pro |
| Enterprise CTA: "Talk to sales" | 7/7 reference | Enterprise = human touch, not self-serve |
| Free trial on Pro, not Starter | 5/7 reference | Trial reduces risk perception on paid tier |

---

## 6. Pricing Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| 4+ pricing tiers | Decision paralysis | Max 3 tiers (Free / Pro / Enterprise) |
| Hiding price behind "Contact us" for non-enterprise | Breaks trust | Show price; hide only for custom enterprise |
| Feature list longer than 8 items | Cognitive overload | Show 5–6 key differentiators; link to full comparison |
| No billing toggle | Forces monthly pricing (lower perceived value) | Always offer annual option with savings label |
| Same button style for all tiers | No visual hierarchy | Ghost for Free, Primary for Pro, Secondary for Enterprise |
| Price change on toggle without animation | Jarring UX | `transition: opacity 150ms` on price element |
| "Free forever" without clarifying limitations | Creates churn when limits hit | State the limit: "Free for up to 3 projects" |
