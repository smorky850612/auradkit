# Admin Panel Patterns — AuraDKit

> Derived from analysis of: app.posthog.com, app.plane.so, linear.app (admin), vercel dashboard team settings, retool.com.

## Structure Overview

```
┌─────────────────────────────────────────────────────────┐
│ Sidebar (256px)     │ Topbar (64px)                     │
│                     ├──────────────────────────────────│
│ Logo                │ Page title + search + actions      │
│ ─────────────────── │ ──────────────────────────────────│
│ Dashboard           │                                    │
│ ▶ Users ← active    │  Filter bar     [Search...]        │
│   Members           │  ──────────────────────────────    │
│   Roles             │  [Bulk action dropdown] [+ Invite] │
│ ▶ Content           │  ──────────────────────────────    │
│ ▶ Analytics         │  Data table (sortable, selectable) │
│ ▶ Settings          │  ──────────────────────────────    │
│ ─────────────────── │  Pagination                        │
│ [User avatar]       │                                    │
└─────────────────────┴────────────────────────────────────┘
```

---

## 1. Data Table with Actions (Admin Core Pattern)

```html
<section aria-label="User management" data-state="default">

  <!-- Table toolbar -->
  <div style="display: flex; align-items: center; justify-content: space-between;
              flex-wrap: wrap; gap: var(--aurad-space-3);
              margin-block-end: var(--aurad-space-4);">

    <div style="display: flex; align-items: center; gap: var(--aurad-space-3);">
      <!-- Search -->
      <div style="position: relative;">
        <svg aria-hidden="true" width="16" height="16"
             style="position: absolute; inset-block-start: 50%;
                    inset-inline-start: var(--aurad-space-3);
                    transform: translateY(-50%);
                    color: var(--aurad-text-muted); pointer-events: none;">
          <!-- search icon -->
        </svg>
        <input type="search"
               placeholder="Search users…"
               aria-label="Search users"
               style="padding: var(--aurad-space-2) var(--aurad-space-3);
                      padding-inline-start: 2.25rem;
                      border: 1px solid var(--aurad-border);
                      border-radius: var(--aurad-radius-md);
                      background: var(--aurad-surface-raised);
                      font-size: var(--aurad-text-sm);
                      color: var(--aurad-text);
                      inline-size: 240px;">
      </div>

      <!-- Filter dropdown -->
      <select aria-label="Filter by role"
              style="padding: var(--aurad-space-2) var(--aurad-space-3);
                     border: 1px solid var(--aurad-border);
                     border-radius: var(--aurad-radius-md);
                     background: var(--aurad-surface-raised);
                     font-size: var(--aurad-text-sm);
                     color: var(--aurad-text); cursor: pointer;">
        <option value="">All roles</option>
        <option value="admin">Admin</option>
        <option value="member">Member</option>
        <option value="viewer">Viewer</option>
      </select>

      <!-- Active filter chips -->
      <div style="display: flex; gap: var(--aurad-space-2);" aria-label="Active filters">
        <span style="display: inline-flex; align-items: center;
                     gap: var(--aurad-space-1);
                     padding: 2px 8px;
                     background: var(--aurad-primary-subtle);
                     color: var(--aurad-primary);
                     border-radius: var(--aurad-radius-full);
                     font-size: var(--aurad-text-xs); font-weight: 500;">
          Role: Admin
          <button type="button" aria-label="Remove role filter"
                  style="background: none; border: none; cursor: pointer;
                         color: var(--aurad-primary); padding: 0; line-height: 1;">
            ×
          </button>
        </span>
      </div>
    </div>

    <!-- Primary action -->
    <button type="button"
            style="display: flex; align-items: center; gap: var(--aurad-space-2);
                   padding: var(--aurad-space-2) var(--aurad-space-4);
                   background: var(--aurad-primary);
                   color: var(--aurad-text-inverse);
                   border: none; border-radius: var(--aurad-radius-md);
                   font-size: var(--aurad-text-sm); font-weight: 500;
                   cursor: pointer;">
      <svg aria-hidden="true" width="16" height="16"><!-- plus --></svg>
      Invite user
    </button>
  </div>

  <!-- Bulk action bar (visible when rows selected) -->
  <div hidden
       role="toolbar"
       aria-label="Bulk actions"
       style="display: flex; align-items: center; gap: var(--aurad-space-3);
              padding: var(--aurad-space-3) var(--aurad-space-4);
              background: var(--aurad-primary-subtle);
              border: 1px solid oklch(0.80 0.08 250);
              border-radius: var(--aurad-radius-md);
              margin-block-end: var(--aurad-space-3);">
    <span style="font-size: var(--aurad-text-sm); font-weight: 500;
                 color: var(--aurad-primary);">
      <span id="selected-count">3</span> selected
    </span>
    <button type="button"
            style="padding: var(--aurad-space-1) var(--aurad-space-3);
                   border: 1px solid var(--aurad-border);
                   border-radius: var(--aurad-radius-md);
                   background: var(--aurad-surface-raised);
                   font-size: var(--aurad-text-xs); font-weight: 500;
                   color: var(--aurad-text); cursor: pointer;">
      Change role
    </button>
    <button type="button"
            style="padding: var(--aurad-space-1) var(--aurad-space-3);
                   border: 1px solid var(--aurad-error);
                   border-radius: var(--aurad-radius-md);
                   background: var(--aurad-error-subtle);
                   font-size: var(--aurad-text-xs); font-weight: 500;
                   color: var(--aurad-error); cursor: pointer;">
      Remove
    </button>
    <button type="button"
            style="margin-inline-start: auto;
                   background: none; border: none; cursor: pointer;
                   font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);">
      Clear selection
    </button>
  </div>

  <!-- Data table -->
  <div style="border: 1px solid var(--aurad-border);
              border-radius: var(--aurad-radius-lg); overflow: hidden;">
    <table style="inline-size: 100%; border-collapse: collapse;
                  font-size: var(--aurad-text-sm);">

      <thead>
        <tr style="background: var(--aurad-surface-sunken);">
          <!-- Select all checkbox -->
          <th scope="col"
              style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     inline-size: 40px;">
            <input type="checkbox"
                   aria-label="Select all users"
                   style="cursor: pointer;">
          </th>
          <!-- Sortable column -->
          <th scope="col"
              style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     text-align: start; font-weight: 500;
                     color: var(--aurad-text-muted);">
            <button type="button"
                    aria-sort="ascending"
                    style="display: flex; align-items: center; gap: var(--aurad-space-1);
                           background: none; border: none; cursor: pointer;
                           font-size: var(--aurad-text-sm); font-weight: 500;
                           color: var(--aurad-text-muted); padding: 0;">
              Name
              <svg aria-hidden="true" width="12" height="12"><!-- sort-asc --></svg>
            </button>
          </th>
          <th scope="col"
              style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     text-align: start; font-weight: 500;
                     color: var(--aurad-text-muted);">
            Role
          </th>
          <th scope="col"
              style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     text-align: start; font-weight: 500;
                     color: var(--aurad-text-muted);">
            Status
          </th>
          <th scope="col"
              style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     text-align: start; font-weight: 500;
                     color: var(--aurad-text-muted);">
            Joined
          </th>
          <!-- Actions column: no header text -->
          <th scope="col"
              style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     inline-size: 48px;">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- Row: selected state -->
        <tr style="border-block-start: 1px solid var(--aurad-border);
                   background: var(--aurad-primary-subtle);">
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);">
            <input type="checkbox" checked aria-label="Select Jane Smith"
                   style="cursor: pointer;">
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);">
            <div style="display: flex; align-items: center; gap: var(--aurad-space-3);">
              <img src="/avatars/jane.jpg" alt=""
                   width="28" height="28"
                   style="border-radius: var(--aurad-radius-full); flex-shrink: 0;">
              <div>
                <p style="font-weight: 500; color: var(--aurad-text);">Jane Smith</p>
                <p style="font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);">
                  jane@example.com
                </p>
              </div>
            </div>
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     color: var(--aurad-text-muted);">
            Admin
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);">
            <span style="display: inline-flex; align-items: center;
                         gap: var(--aurad-space-1);
                         padding: 2px 8px;
                         background: var(--aurad-success-subtle);
                         color: var(--aurad-success);
                         border-radius: var(--aurad-radius-full);
                         font-size: var(--aurad-text-xs); font-weight: 500;">
              Active
            </span>
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     color: var(--aurad-text-muted);">
            Jan 12, 2024
          </td>
          <!-- Row action menu -->
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);">
            <button type="button"
                    aria-label="Actions for Jane Smith"
                    aria-haspopup="true"
                    style="background: none; border: none; cursor: pointer;
                           color: var(--aurad-text-muted); padding: var(--aurad-space-1);
                           border-radius: var(--aurad-radius-md);">
              <svg aria-hidden="true" width="16" height="16"><!-- ellipsis --></svg>
            </button>
          </td>
        </tr>

        <!-- Row: pending invite state -->
        <tr style="border-block-start: 1px solid var(--aurad-border);">
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);">
            <input type="checkbox" aria-label="Select pending invite john@example.com"
                   style="cursor: pointer;">
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);">
            <div style="display: flex; align-items: center; gap: var(--aurad-space-3);">
              <div style="inline-size: 28px; block-size: 28px;
                          background: var(--aurad-surface-sunken);
                          border-radius: var(--aurad-radius-full);
                          display: flex; align-items: center; justify-content: center;
                          flex-shrink: 0;">
                <svg aria-hidden="true" width="14" height="14"
                     style="color: var(--aurad-text-disabled);"><!-- user --></svg>
              </div>
              <div>
                <p style="color: var(--aurad-text-muted);">john@example.com</p>
                <p style="font-size: var(--aurad-text-xs); color: var(--aurad-text-disabled);">
                  Invitation pending
                </p>
              </div>
            </div>
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     color: var(--aurad-text-muted);">
            Member
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);">
            <span style="display: inline-flex; align-items: center;
                         padding: 2px 8px;
                         background: var(--aurad-warning-subtle);
                         color: var(--aurad-warning);
                         border-radius: var(--aurad-radius-full);
                         font-size: var(--aurad-text-xs); font-weight: 500;">
              Pending
            </span>
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);
                     color: var(--aurad-text-muted);">
            —
          </td>
          <td style="padding: var(--aurad-space-3) var(--aurad-space-4);">
            <button type="button"
                    aria-label="Actions for john@example.com"
                    aria-haspopup="true"
                    style="background: none; border: none; cursor: pointer;
                           color: var(--aurad-text-muted); padding: var(--aurad-space-1);
                           border-radius: var(--aurad-radius-md);">
              <svg aria-hidden="true" width="16" height="16"><!-- ellipsis --></svg>
            </button>
          </td>
        </tr>
      </tbody>

    </table>
  </div>

  <!-- Pagination -->
  <div style="display: flex; align-items: center; justify-content: space-between;
              padding-block-start: var(--aurad-space-4);
              font-size: var(--aurad-text-sm);">
    <p style="color: var(--aurad-text-muted);">
      Showing <strong>1–25</strong> of <strong>142</strong> users
    </p>
    <nav aria-label="Pagination">
      <div style="display: flex; gap: var(--aurad-space-1);">
        <button type="button"
                disabled
                aria-label="Previous page"
                style="padding: var(--aurad-space-1) var(--aurad-space-3);
                       border: 1px solid var(--aurad-border);
                       border-radius: var(--aurad-radius-md);
                       background: var(--aurad-surface-raised);
                       color: var(--aurad-text-disabled); cursor: not-allowed;">
          ←
        </button>
        <button type="button"
                aria-label="Page 1" aria-current="page"
                style="padding: var(--aurad-space-1) var(--aurad-space-3);
                       border: 1px solid var(--aurad-primary);
                       border-radius: var(--aurad-radius-md);
                       background: var(--aurad-primary);
                       color: var(--aurad-text-inverse); cursor: pointer;
                       font-weight: 500;">
          1
        </button>
        <button type="button"
                aria-label="Page 2"
                style="padding: var(--aurad-space-1) var(--aurad-space-3);
                       border: 1px solid var(--aurad-border);
                       border-radius: var(--aurad-radius-md);
                       background: var(--aurad-surface-raised);
                       color: var(--aurad-text); cursor: pointer;">
          2
        </button>
        <button type="button"
                aria-label="Next page"
                style="padding: var(--aurad-space-1) var(--aurad-space-3);
                       border: 1px solid var(--aurad-border);
                       border-radius: var(--aurad-radius-md);
                       background: var(--aurad-surface-raised);
                       color: var(--aurad-text); cursor: pointer;">
          →
        </button>
      </div>
    </nav>
  </div>

</section>
```

---

## 2. Key Admin Patterns

| Pattern | Frequency | Impact |
|---------|-----------|--------|
| Sortable column headers with `aria-sort` | 5/5 reference | Data exploration; screen reader announces sort state |
| Bulk action toolbar (appears on row select) | 4/5 reference | Batch operations without per-row menus |
| Row ellipsis menu for per-item actions | 5/5 reference | Keeps table clean; reveals context-sensitive actions |
| Active filter chips with remove button | 4/5 reference | Clear applied filters at a glance |
| Selected row highlighted with primary-subtle | 5/5 reference | Immediate visual confirmation |
| Pending/inactive states in table rows | 4/5 reference | Different visual treatment for incomplete records |
| Pagination with count "Showing X of Y" | 5/5 reference | Context for large datasets |

---

## 3. Admin Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| No bulk actions | Forces repetitive per-row actions | Checkbox column + bulk action toolbar |
| Non-sortable columns | Users can't find data | `aria-sort` on sortable `<th>` + click handler |
| Action buttons in every row | Visual noise | Ellipsis menu revealed on row hover/focus |
| Filtering without chip display | Applied filters invisible | Show filter chips below toolbar |
| Deleting with only one confirmation click | Accidental deletions | Require confirmation dialog or undo toast |
| Search without debounce | API floods on every keystroke | Debounce 300ms before querying |
