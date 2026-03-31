# Settings Page Patterns — AuraDKit

> Derived from analysis of: linear.app/settings, vercel.com/settings, cal.com/settings, app.posthog.com/settings, github.com/settings.

## Structure Overview

```
┌─────────────────────────────────────────────────────┐
│ Settings sidebar (200–240px) │ Settings panel        │
│                              │                       │
│ Personal                     │ [Section heading]     │
│   Profile                    │ ─────────────────     │
│   Account                    │ [Setting row]         │
│   Billing ← active           │ [Setting row]         │
│                              │ [Setting row]         │
│ Workspace                    │                       │
│   General                    │ ─────────────────     │
│   Members                    │ [Danger zone]         │
│   Integrations               │                       │
│   Security                   │                       │
└──────────────────────────────┴───────────────────────┘
```

---

## 1. Settings Layout

```html
<div style="display: flex; min-block-size: 100dvh;">

  <!-- Settings sidebar nav -->
  <aside style="inline-size: 220px; flex-shrink: 0;
                border-inline-end: 1px solid var(--aurad-border);
                padding: var(--aurad-space-6) var(--aurad-space-4);"
         aria-label="Settings navigation">

    <h1 style="font-size: var(--aurad-text-lg); font-weight: 600;
               color: var(--aurad-text);
               margin-block-end: var(--aurad-space-6);">
      Settings
    </h1>

    <nav>
      <!-- Section group -->
      <div style="margin-block-end: var(--aurad-space-6);">
        <p style="font-size: var(--aurad-text-xs); font-weight: 600;
                  text-transform: uppercase; letter-spacing: 0.05em;
                  color: var(--aurad-text-muted);
                  padding-inline: var(--aurad-space-3);
                  margin-block-end: var(--aurad-space-1);">
          Personal
        </p>
        <ul role="list" style="list-style: none;">
          <li>
            <a href="/settings/profile"
               style="display: block; padding: var(--aurad-space-2) var(--aurad-space-3);
                      border-radius: var(--aurad-radius-md);
                      font-size: var(--aurad-text-sm);
                      color: var(--aurad-text-muted); text-decoration: none;
                      transition: background var(--aurad-duration-fast);">
              Profile
            </a>
          </li>
          <li>
            <a href="/settings/account"
               style="display: block; padding: var(--aurad-space-2) var(--aurad-space-3);
                      border-radius: var(--aurad-radius-md);
                      font-size: var(--aurad-text-sm);
                      color: var(--aurad-text-muted); text-decoration: none;">
              Account
            </a>
          </li>
          <!-- Active item -->
          <li>
            <a href="/settings/billing"
               aria-current="page"
               style="display: block; padding: var(--aurad-space-2) var(--aurad-space-3);
                      border-radius: var(--aurad-radius-md);
                      font-size: var(--aurad-text-sm); font-weight: 500;
                      color: var(--aurad-primary);
                      background: var(--aurad-primary-subtle);
                      text-decoration: none;">
              Billing
            </a>
          </li>
        </ul>
      </div>

      <div>
        <p style="font-size: var(--aurad-text-xs); font-weight: 600;
                  text-transform: uppercase; letter-spacing: 0.05em;
                  color: var(--aurad-text-muted);
                  padding-inline: var(--aurad-space-3);
                  margin-block-end: var(--aurad-space-1);">
          Workspace
        </p>
        <ul role="list" style="list-style: none;">
          <li>
            <a href="/settings/general"
               style="display: block; padding: var(--aurad-space-2) var(--aurad-space-3);
                      border-radius: var(--aurad-radius-md);
                      font-size: var(--aurad-text-sm);
                      color: var(--aurad-text-muted); text-decoration: none;">
              General
            </a>
          </li>
          <li>
            <a href="/settings/members"
               style="display: block; padding: var(--aurad-space-2) var(--aurad-space-3);
                      border-radius: var(--aurad-radius-md);
                      font-size: var(--aurad-text-sm);
                      color: var(--aurad-text-muted); text-decoration: none;">
              Members
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </aside>

  <!-- Settings panel -->
  <main id="main" role="main"
        style="flex: 1; min-inline-size: 0;
               padding: var(--aurad-space-8) var(--aurad-space-10);
               max-inline-size: 720px;">
    <!-- Section content here -->
  </main>

</div>
```

---

## 2. Setting Section Structure

```html
<!-- Settings section (one per panel) -->
<section aria-labelledby="section-profile"
         style="margin-block-end: var(--aurad-space-10);
                padding-block-end: var(--aurad-space-10);
                border-block-end: 1px solid var(--aurad-border);">

  <header style="margin-block-end: var(--aurad-space-6);">
    <h2 id="section-profile"
        style="font-size: var(--aurad-text-lg); font-weight: 600;
               color: var(--aurad-text);">
      Profile
    </h2>
    <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
              margin-block-start: var(--aurad-space-1);">
      This is how you appear to others in the workspace.
    </p>
  </header>

  <form novalidate aria-label="Profile settings"
        style="display: flex; flex-direction: column; gap: var(--aurad-space-6);">

    <!-- Avatar setting row -->
    <div style="display: flex; align-items: center; gap: var(--aurad-space-4);">
      <img src="/avatar.jpg" alt="Current profile photo"
           width="64" height="64"
           style="border-radius: var(--aurad-radius-full);
                  flex-shrink: 0;">
      <div>
        <button type="button"
                style="padding: var(--aurad-space-2) var(--aurad-space-4);
                       border: 1px solid var(--aurad-border);
                       border-radius: var(--aurad-radius-md);
                       background: var(--aurad-surface-raised);
                       font-size: var(--aurad-text-sm); font-weight: 500;
                       color: var(--aurad-text); cursor: pointer;">
          Change photo
        </button>
        <p style="font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);
                  margin-block-start: var(--aurad-space-1);">
          JPG, GIF or PNG. Max 2MB.
        </p>
      </div>
    </div>

    <!-- Inline setting row (label + input side by side) -->
    <div style="display: grid; grid-template-columns: 1fr 2fr;
                gap: var(--aurad-space-4); align-items: start;">
      <div>
        <label for="full-name"
               style="font-size: var(--aurad-text-sm); font-weight: 500;
                      color: var(--aurad-text); display: block;">
          Full name
        </label>
        <p style="font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);
                  margin-block-start: var(--aurad-space-1);">
          Displayed across the app.
        </p>
      </div>
      <input id="full-name"
             type="text"
             name="full_name"
             autocomplete="name"
             value="Jane Smith"
             style="padding: var(--aurad-space-2) var(--aurad-space-3);
                    border: 1px solid var(--aurad-border);
                    border-radius: var(--aurad-radius-md);
                    background: var(--aurad-surface-raised);
                    font-size: var(--aurad-text-sm);
                    color: var(--aurad-text);
                    inline-size: 100%;">
    </div>

    <!-- Save row -->
    <div style="display: flex; justify-content: flex-end;">
      <button type="submit"
              style="padding: var(--aurad-space-2) var(--aurad-space-5);
                     background: var(--aurad-primary);
                     color: var(--aurad-text-inverse);
                     border-radius: var(--aurad-radius-md);
                     font-size: var(--aurad-text-sm); font-weight: 600;
                     border: none; cursor: pointer;">
        Save changes
      </button>
    </div>

  </form>

</section>
```

---

## 3. Toggle Setting Row

```html
<!-- Boolean setting row with toggle -->
<div style="display: flex; justify-content: space-between; align-items: flex-start;
            padding: var(--aurad-space-4) 0;
            border-block-end: 1px solid var(--aurad-border);">

  <div style="flex: 1; padding-inline-end: var(--aurad-space-8);">
    <p style="font-size: var(--aurad-text-sm); font-weight: 500;
              color: var(--aurad-text);">
      Email notifications
    </p>
    <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
              margin-block-start: var(--aurad-space-1);">
      Receive email updates about activity in your workspace.
    </p>
  </div>

  <!-- Toggle (accessible) -->
  <button type="button"
          role="switch"
          aria-checked="true"
          aria-label="Email notifications"
          style="position: relative;
                 inline-size: 44px; block-size: 24px;
                 background: var(--aurad-primary);
                 border-radius: var(--aurad-radius-full);
                 border: none; cursor: pointer; flex-shrink: 0;">
    <span style="position: absolute;
                 inset-block-start: 2px; inset-inline-start: 22px;
                 inline-size: 20px; block-size: 20px;
                 background: white;
                 border-radius: var(--aurad-radius-full);
                 transition: transform var(--aurad-duration-fast),
                             inset-inline-start var(--aurad-duration-fast);">
    </span>
  </button>

</div>
```

---

## 4. Danger Zone Section

Destructive settings must be visually separated and require confirmation.

```html
<!-- Danger zone section — always at bottom -->
<section aria-labelledby="danger-zone-heading"
         style="margin-block-start: var(--aurad-space-12);
                border: 1px solid var(--aurad-error);
                border-radius: var(--aurad-radius-lg);
                padding: var(--aurad-space-6);">

  <h2 id="danger-zone-heading"
      style="font-size: var(--aurad-text-base); font-weight: 600;
             color: var(--aurad-error);
             margin-block-end: var(--aurad-space-4);">
    Danger zone
  </h2>

  <!-- Danger action row -->
  <div style="display: flex; justify-content: space-between; align-items: center;
              padding: var(--aurad-space-4);
              background: var(--aurad-error-subtle);
              border-radius: var(--aurad-radius-md);">
    <div>
      <p style="font-size: var(--aurad-text-sm); font-weight: 500;
                color: var(--aurad-text);">
        Delete this workspace
      </p>
      <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                margin-block-start: var(--aurad-space-1);">
        Once deleted, all data will be permanently removed. This action cannot be undone.
      </p>
    </div>
    <button type="button"
            style="flex-shrink: 0; margin-inline-start: var(--aurad-space-4);
                   padding: var(--aurad-space-2) var(--aurad-space-4);
                   background: var(--aurad-error);
                   color: var(--aurad-text-inverse);
                   border: none; border-radius: var(--aurad-radius-md);
                   font-size: var(--aurad-text-sm); font-weight: 500;
                   cursor: pointer;"
            aria-label="Delete workspace — opens confirmation dialog">
      Delete workspace
    </button>
  </div>

</section>

<!-- Confirmation dialog (rendered separately) -->
<div role="dialog"
     aria-modal="true"
     aria-labelledby="confirm-delete-title"
     style="/* shown via JS when button clicked */
            position: fixed; inset: 0;
            display: flex; align-items: center; justify-content: center;
            z-index: var(--aurad-z-modal);
            background: var(--aurad-overlay);">

  <div style="background: var(--aurad-surface-raised);
              border-radius: var(--aurad-radius-xl);
              padding: var(--aurad-space-6);
              max-inline-size: 480px; inline-size: calc(100% - 2rem);">

    <h2 id="confirm-delete-title"
        style="font-size: var(--aurad-text-lg); font-weight: 600;
               color: var(--aurad-text);">
      Delete workspace?
    </h2>
    <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
              margin-block: var(--aurad-space-3) var(--aurad-space-5);
              line-height: var(--aurad-leading-normal);">
      This will permanently delete <strong>Acme Inc.</strong> and all its data.
      Type the workspace name to confirm.
    </p>

    <!-- Confirmation input -->
    <div style="margin-block-end: var(--aurad-space-5);">
      <label for="confirm-name"
             style="font-size: var(--aurad-text-sm); font-weight: 500;
                    color: var(--aurad-text); display: block;
                    margin-block-end: var(--aurad-space-1);">
        Type <code style="background: var(--aurad-surface-sunken);
                          padding: 0 4px; border-radius: var(--aurad-radius-sm);">
          Acme Inc.
        </code> to confirm
      </label>
      <input id="confirm-name"
             type="text"
             aria-describedby="confirm-name-error"
             style="padding: var(--aurad-space-2) var(--aurad-space-3);
                    border: 1px solid var(--aurad-border);
                    border-radius: var(--aurad-radius-md);
                    font-size: var(--aurad-text-sm);
                    color: var(--aurad-text);
                    inline-size: 100%;">
    </div>

    <div style="display: flex; justify-content: flex-end; gap: var(--aurad-space-3);">
      <button type="button"
              style="padding: var(--aurad-space-2) var(--aurad-space-4);
                     border: 1px solid var(--aurad-border);
                     border-radius: var(--aurad-radius-md);
                     background: var(--aurad-surface-raised);
                     font-size: var(--aurad-text-sm);
                     color: var(--aurad-text); cursor: pointer;">
        Cancel
      </button>
      <button type="button"
              disabled
              style="padding: var(--aurad-space-2) var(--aurad-space-4);
                     background: var(--aurad-error);
                     color: var(--aurad-text-inverse);
                     border: none; border-radius: var(--aurad-radius-md);
                     font-size: var(--aurad-text-sm); font-weight: 500;
                     cursor: not-allowed; opacity: 0.5;"
              aria-disabled="true">
        Delete workspace
      </button>
    </div>

  </div>
</div>
```

---

## 5. Key Settings Patterns

| Pattern | Frequency | Impact |
|---------|-----------|--------|
| Sidebar nav with active state + `aria-current` | 5/5 reference | Clear location context |
| Grouped sections with `aria-labelledby` headings | 5/5 reference | Screen reader navigation |
| Inline label+input grid (1fr 2fr) | 4/5 reference | Efficient use of horizontal space |
| Save button per section (not global) | 4/5 reference | Scoped intent — less anxiety about side effects |
| Danger zone separated by red border | 5/5 reference | Visual separation prevents accidents |
| Typed confirmation for destructive actions | 5/5 reference | Forces conscious intent; prevents misclicks |
| Toggle for boolean settings (not checkbox) | 4/5 reference | Clearer state — on/off semantics |

---

## 6. Settings Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Global save button for entire settings page | Unclear what changed; risky | Save per section, or auto-save with toast |
| Destructive action without confirmation dialog | Accidental data loss | Require typed confirmation for irreversible actions |
| Settings in modal/drawer | Can't deep-link; poor UX on long forms | Dedicated `/settings/*` routes |
| No section hierarchy in sidebar | All settings appear equal | Group: Personal / Workspace / Billing / Security |
| Delete button without warning copy | Users may not understand permanence | Show "this cannot be undone" in error-subtle background |
| Toggle that looks like a checkbox | Ambiguous state | Use pill-style toggle with aria-checked |
