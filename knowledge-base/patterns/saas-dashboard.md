# SaaS Dashboard Patterns — AuraDKit

> Derived from analysis of: app.posthog.com, app.cal.com, app.plane.so, Linear app, Vercel dashboard.

## Structure Overview

```
┌──────────────────────────────────────────────────────────┐
│ Sidebar (256px)     │ Topbar (64px height)               │
│                     ├────────────────────────────────────│
│ Logo                │ Page title + breadcrumb            │
│ ─────────           │ ─────────────────────────────────  │
│ Nav section A       │                                    │
│   • Item (active)   │   MAIN CONTENT AREA                │
│   • Item            │                                    │
│   • Item            │   Stats row (2–4 cards)            │
│ ─────────           │   ─────────────────────────────    │
│ Nav section B       │   Chart / Table / Feed             │
│   • Item            │                                    │
│ ─────────           │   Secondary widgets                │
│ [User avatar]       │                                    │
└─────────────────────┴────────────────────────────────────┘
```

---

## 1. Sidebar

```html
<aside class="sidebar" aria-label="Application navigation">
  <!-- Logo -->
  <div class="sidebar-header">
    <a href="/dashboard" aria-label="Dashboard home">
      <img src="/logo.svg" alt="[App] logo" height="24">
    </a>
  </div>

  <!-- Nav groups -->
  <nav>
    <ul role="list">
      <li class="nav-section-label">Workspace</li>
      <li>
        <a href="/dashboard" aria-current="page" class="nav-item active">
          <svg aria-hidden="true" width="16" height="16"><!-- icon --></svg>
          Dashboard
        </a>
      </li>
      <li>
        <a href="/analytics" class="nav-item">
          <svg aria-hidden="true" width="16" height="16"><!-- icon --></svg>
          Analytics
        </a>
      </li>
    </ul>

    <ul role="list" style="margin-block-start: var(--aurad-space-6);">
      <li class="nav-section-label">Settings</li>
      <li><a href="/settings" class="nav-item">Settings</a></li>
    </ul>
  </nav>

  <!-- User -->
  <div class="sidebar-footer">
    <button type="button" class="user-menu" aria-label="Account menu" aria-haspopup="true">
      <img src="/avatar.jpg" alt="User avatar" width="28" height="28" class="avatar">
      <span class="user-name">Jane Smith</span>
    </button>
  </div>
</aside>

<style>
.sidebar {
  inline-size: 256px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--aurad-surface-raised);
  border-inline-end: 1px solid var(--aurad-border);
  padding: var(--aurad-space-4);
}
.sidebar-header {
  block-size: 48px;
  display: flex;
  align-items: center;
  margin-block-end: var(--aurad-space-4);
}
.nav-section-label {
  font-size: var(--aurad-text-xs);
  font-weight: 500;
  color: var(--aurad-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--aurad-space-2) var(--aurad-space-3);
}
.nav-item {
  display: flex;
  align-items: center;
  gap: var(--aurad-space-2);
  padding: var(--aurad-space-2) var(--aurad-space-3);
  border-radius: var(--aurad-radius-md);
  font-size: var(--aurad-text-sm);
  color: var(--aurad-text-muted);
  text-decoration: none;
  transition: background var(--aurad-duration-fast);
}
.nav-item:hover {
  background: var(--aurad-surface-sunken);
  color: var(--aurad-text);
}
.nav-item.active {
  background: var(--aurad-primary-subtle);
  color: var(--aurad-primary);
  font-weight: 500;
}
.sidebar-footer {
  margin-block-start: auto;
  padding-block-start: var(--aurad-space-4);
  border-block-start: 1px solid var(--aurad-border);
}
</style>
```

---

## 2. Stats Cards Row

```html
<div style="display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: var(--aurad-space-4);
            margin-block-end: var(--aurad-space-6);">

  <!-- Stat card (4-state) -->
  <article data-state="default" role="region" aria-label="Total users"
           style="background: var(--aurad-surface-raised);
                  border: 1px solid var(--aurad-border);
                  border-radius: var(--aurad-radius-lg);
                  padding: var(--aurad-space-5);">

    <div style="display: flex; justify-content: space-between; align-items: start;">
      <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                font-weight: 500;">
        Total Users
      </p>
      <!-- Trend icon -->
      <span aria-label="Trending up">↑</span>
    </div>

    <p style="font-size: var(--aurad-text-3xl); font-weight: 700;
              color: var(--aurad-text); margin-block-start: var(--aurad-space-2);">
      12,840
    </p>

    <p style="font-size: var(--aurad-text-sm); margin-block-start: var(--aurad-space-1);">
      <span style="color: var(--aurad-success); font-weight: 500;">+8.2%</span>
      <span style="color: var(--aurad-text-muted);"> vs last month</span>
    </p>

  </article>

  <!-- LOADING state -->
  <article data-state="loading" aria-busy="true" aria-label="Loading stat"
           style="background: var(--aurad-surface-raised);
                  border: 1px solid var(--aurad-border);
                  border-radius: var(--aurad-radius-lg);
                  padding: var(--aurad-space-5);">
    <div class="skeleton" style="block-size: 14px; inline-size: 80px;
                                  border-radius: var(--aurad-radius-sm);"></div>
    <div class="skeleton" style="block-size: 32px; inline-size: 100px;
                                  margin-block-start: var(--aurad-space-3);
                                  border-radius: var(--aurad-radius-sm);"></div>
    <div class="skeleton" style="block-size: 14px; inline-size: 60px;
                                  margin-block-start: var(--aurad-space-2);
                                  border-radius: var(--aurad-radius-sm);"></div>
  </article>

</div>
```

---

## 3. Data Table Pattern

```html
<section aria-label="Recent orders" data-state="default">

  <!-- Table header -->
  <div style="display: flex; justify-content: space-between; align-items: center;
              margin-block-end: var(--aurad-space-4);">
    <h2 style="font-size: var(--aurad-text-lg); font-weight: 600;">Recent Orders</h2>
    <a href="/orders" style="font-size: var(--aurad-text-sm); color: var(--aurad-primary);">
      View all →
    </a>
  </div>

  <!-- Table -->
  <div style="overflow-x: auto; border: 1px solid var(--aurad-border);
              border-radius: var(--aurad-radius-lg);">
    <table style="inline-size: 100%; border-collapse: collapse; font-size: var(--aurad-text-sm);">
      <thead>
        <tr style="background: var(--aurad-surface-sunken);">
          <th scope="col" style="padding: var(--aurad-space-3) var(--aurad-space-4);
                                  text-align: start; font-weight: 500;
                                  color: var(--aurad-text-muted);">
            Order
          </th>
          <th scope="col" style="padding: var(--aurad-space-3) var(--aurad-space-4);
                                  text-align: start; font-weight: 500;
                                  color: var(--aurad-text-muted);">
            Status
          </th>
          <th scope="col" style="padding: var(--aurad-space-3) var(--aurad-space-4);
                                  text-align: end; font-weight: 500;
                                  color: var(--aurad-text-muted);">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-block-start: 1px solid var(--aurad-border);">
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     color: var(--aurad-text);">
            #1042
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);">
            <span style="display: inline-flex; align-items: center;
                         padding: 2px 8px; border-radius: var(--aurad-radius-full);
                         font-size: var(--aurad-text-xs); font-weight: 500;
                         background: var(--aurad-success-subtle);
                         color: var(--aurad-success);">
              Completed
            </span>
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     text-align: end; color: var(--aurad-text); font-weight: 500;">
            $148.00
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- EMPTY state -->
  <div data-state="empty" style="text-align: center; padding: var(--aurad-space-12);">
    <p style="color: var(--aurad-text-muted);">No orders yet.</p>
    <a href="/products" style="color: var(--aurad-primary); margin-block-start: var(--aurad-space-2);
                                display: inline-block;">
      Browse products to get started →
    </a>
  </div>

</section>
```

---

## 4. Topbar

```html
<header style="block-size: 64px; flex-shrink: 0;
               background: var(--aurad-surface-raised);
               border-block-end: 1px solid var(--aurad-border);
               display: flex; align-items: center;
               padding-inline: var(--aurad-space-6);
               gap: var(--aurad-space-4);">

  <!-- Mobile hamburger -->
  <button type="button" class="lg:hidden" aria-label="Open sidebar">
    <svg aria-hidden="true" width="20" height="20"><!-- hamburger --></svg>
  </button>

  <!-- Breadcrumb -->
  <nav aria-label="Breadcrumb">
    <ol style="display: flex; align-items: center; gap: var(--aurad-space-2);
               list-style: none; font-size: var(--aurad-text-sm);">
      <li><a href="/dashboard" style="color: var(--aurad-text-muted);">Dashboard</a></li>
      <li aria-hidden="true" style="color: var(--aurad-text-muted);">/</li>
      <li><span aria-current="page" style="color: var(--aurad-text);">Analytics</span></li>
    </ol>
  </nav>

  <!-- Right actions -->
  <div style="margin-inline-start: auto; display: flex; align-items: center;
              gap: var(--aurad-space-3);">
    <button type="button" aria-label="Notifications (3 new)">
      <svg aria-hidden="true" width="20" height="20"><!-- bell --></svg>
      <span style="background: var(--aurad-error); color: white;
                   font-size: 10px; border-radius: var(--aurad-radius-full);
                   padding: 0 5px; position: absolute; top: -4px; right: -4px;">
        3
      </span>
    </button>
    <button type="button" aria-label="Account menu" aria-haspopup="true">
      <img src="/avatar.jpg" alt="" width="32" height="32"
           style="border-radius: var(--aurad-radius-full);">
    </button>
  </div>

</header>
```

---

## 5. Key Dashboard Patterns

| Pattern | Frequency | Score Impact |
|---------|-----------|-------------|
| Sticky sidebar with section grouping | 5/5 reference | +1.2 layout |
| Stats row with delta indicators | 5/5 reference | +0.8 visual hierarchy |
| Table with status badges | 4/5 reference | +0.6 component |
| Breadcrumb navigation | 4/5 reference | +0.5 layout |
| Mobile: sidebar as drawer | 4/5 reference | +0.7 responsive |
| Empty state with action | 3/5 reference | +0.9 component |
