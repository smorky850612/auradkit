# Onboarding Flow Patterns — AuraDKit

> Derived from analysis of: linear.app onboarding, vercel.com onboarding, loom.com onboarding, cal.com onboarding, notion.so onboarding.

## Structure Overview

```
1. Welcome screen (brand moment + value restatement)
2. Setup steps (3–6 steps, never more)
3. Progress indicator (step dots or numbered bar)
4. Completion screen / first value moment
```

Optimal onboarding: ≤5 minutes to first "aha" moment.

---

## 1. Progress Indicator

The progress bar is the first element users look for — it signals how much work remains.

```html
<!-- Step indicator (dots variant — for 3–6 steps) -->
<nav aria-label="Setup progress"
     style="display: flex; align-items: center; justify-content: center;
            gap: var(--aurad-space-2); margin-block-end: var(--aurad-space-8);">

  <!-- Step 1 — completed -->
  <button type="button"
          aria-label="Step 1: Account — completed"
          style="inline-size: 8px; block-size: 8px;
                 border-radius: var(--aurad-radius-full);
                 background: var(--aurad-primary);
                 border: none; cursor: pointer;
                 padding: 0;">
  </button>

  <!-- Connector -->
  <div style="inline-size: 24px; block-size: 1px;
              background: var(--aurad-primary);" aria-hidden="true"></div>

  <!-- Step 2 — active -->
  <button type="button"
          aria-label="Step 2: Workspace — current"
          aria-current="step"
          style="inline-size: 8px; block-size: 8px;
                 border-radius: var(--aurad-radius-full);
                 background: var(--aurad-primary);
                 border: 2px solid var(--aurad-primary);
                 outline: 2px solid var(--aurad-primary-subtle);
                 cursor: default;
                 padding: 0;">
  </button>

  <!-- Connector -->
  <div style="inline-size: 24px; block-size: 1px;
              background: var(--aurad-border);" aria-hidden="true"></div>

  <!-- Step 3 — upcoming -->
  <button type="button"
          aria-label="Step 3: Invite team — upcoming"
          disabled
          style="inline-size: 8px; block-size: 8px;
                 border-radius: var(--aurad-radius-full);
                 background: var(--aurad-border);
                 border: none; cursor: default;
                 padding: 0;">
  </button>

</nav>

<!-- Numbered bar variant (for wizards with named steps) -->
<div aria-label="Setup progress (step 2 of 4)"
     style="display: flex; align-items: center; gap: 0;
            margin-block-end: var(--aurad-space-8);">

  <!-- Step pill -->
  <div style="display: flex; align-items: center; gap: var(--aurad-space-2);
              padding: var(--aurad-space-1) var(--aurad-space-3);
              border-radius: var(--aurad-radius-full);
              background: var(--aurad-primary);
              color: var(--aurad-text-inverse);
              font-size: var(--aurad-text-xs); font-weight: 600;">
    <span aria-hidden="true">1</span>
    Account
  </div>
  <div style="flex: 1; block-size: 1px; background: var(--aurad-primary);"
       aria-hidden="true"></div>
  <div style="display: flex; align-items: center; gap: var(--aurad-space-2);
              padding: var(--aurad-space-1) var(--aurad-space-3);
              border-radius: var(--aurad-radius-full);
              border: 2px solid var(--aurad-primary);
              color: var(--aurad-primary);
              font-size: var(--aurad-text-xs); font-weight: 600;"
       aria-current="step">
    <span aria-hidden="true">2</span>
    Workspace
  </div>
  <div style="flex: 1; block-size: 1px; background: var(--aurad-border);"
       aria-hidden="true"></div>
  <div style="display: flex; align-items: center; gap: var(--aurad-space-2);
              padding: var(--aurad-space-1) var(--aurad-space-3);
              border-radius: var(--aurad-radius-full);
              color: var(--aurad-text-disabled);
              font-size: var(--aurad-text-xs); font-weight: 600;">
    <span aria-hidden="true">3</span>
    Invite
  </div>

</div>
```

---

## 2. Single-Step Card (Reference Pattern)

Each step is a focused, single-purpose card. One decision per screen.

```html
<main id="main" role="main"
      style="min-block-size: 100dvh; display: flex; align-items: center;
             justify-content: center; padding: var(--aurad-space-6);
             background: var(--aurad-surface);">

  <div style="inline-size: 100%; max-inline-size: 480px;">

    <!-- Logo -->
    <div style="text-align: center; margin-block-end: var(--aurad-space-6);">
      <img src="/logo.svg" alt="Brand logo" height="28">
    </div>

    <!-- Progress -->
    <!-- [progress indicator here] -->

    <!-- Step card -->
    <div style="background: var(--aurad-surface-raised);
                border: 1px solid var(--aurad-border);
                border-radius: var(--aurad-radius-xl);
                padding: var(--aurad-space-8);">

      <!-- Step label -->
      <p style="font-size: var(--aurad-text-xs); font-weight: 600;
                text-transform: uppercase; letter-spacing: 0.05em;
                color: var(--aurad-primary);
                margin-block-end: var(--aurad-space-2);">
        Step 2 of 4
      </p>

      <h1 style="font-size: var(--aurad-text-2xl); font-weight: 700;
                 color: var(--aurad-text);
                 margin-block-end: var(--aurad-space-2);">
        Create your workspace
      </h1>
      <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                margin-block-end: var(--aurad-space-6);
                line-height: var(--aurad-leading-normal);">
        Your workspace is where your team collaborates. You can change this later.
      </p>

      <!-- Form -->
      <form novalidate aria-label="Workspace setup"
            style="display: flex; flex-direction: column; gap: var(--aurad-space-4);">

        <div style="display: flex; flex-direction: column; gap: var(--aurad-space-1);">
          <label for="workspace-name"
                 style="font-size: var(--aurad-text-sm); font-weight: 500;
                        color: var(--aurad-text);">
            Workspace name
          </label>
          <input id="workspace-name"
                 type="text"
                 name="workspace_name"
                 autocomplete="organization"
                 required
                 placeholder="Acme Inc."
                 autofocus
                 aria-describedby="workspace-name-hint"
                 style="padding: var(--aurad-space-2) var(--aurad-space-3);
                        border: 1px solid var(--aurad-border);
                        border-radius: var(--aurad-radius-md);
                        background: var(--aurad-surface-raised);
                        font-size: var(--aurad-text-base);
                        color: var(--aurad-text);
                        inline-size: 100%;">
          <p id="workspace-name-hint"
             style="font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);">
            This is how your workspace will appear to team members.
          </p>
        </div>

        <!-- URL slug -->
        <div style="display: flex; flex-direction: column; gap: var(--aurad-space-1);">
          <label for="workspace-slug"
                 style="font-size: var(--aurad-text-sm); font-weight: 500;
                        color: var(--aurad-text);">
            Workspace URL
          </label>
          <div style="display: flex; border: 1px solid var(--aurad-border);
                      border-radius: var(--aurad-radius-md);
                      overflow: hidden;">
            <span style="display: flex; align-items: center;
                         padding: var(--aurad-space-2) var(--aurad-space-3);
                         background: var(--aurad-surface-sunken);
                         border-inline-end: 1px solid var(--aurad-border);
                         font-size: var(--aurad-text-sm);
                         color: var(--aurad-text-muted);
                         white-space: nowrap;">
              app.brand.com/
            </span>
            <input id="workspace-slug"
                   type="text"
                   name="workspace_slug"
                   pattern="[a-z0-9\-]+"
                   aria-describedby="slug-hint"
                   style="flex: 1; padding: var(--aurad-space-2) var(--aurad-space-3);
                          border: none; background: var(--aurad-surface-raised);
                          font-size: var(--aurad-text-sm); color: var(--aurad-text);">
          </div>
          <p id="slug-hint"
             style="font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);">
            Lowercase letters, numbers, and hyphens only.
          </p>
        </div>

        <!-- Actions -->
        <div style="display: flex; justify-content: space-between;
                    align-items: center; margin-block-start: var(--aurad-space-2);">
          <button type="button"
                  style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                         background: none; border: none; cursor: pointer;
                         padding: var(--aurad-space-2);">
            ← Back
          </button>
          <button type="submit"
                  style="padding: var(--aurad-space-2) var(--aurad-space-6);
                         background: var(--aurad-primary);
                         color: var(--aurad-text-inverse);
                         border-radius: var(--aurad-radius-md);
                         font-size: var(--aurad-text-sm); font-weight: 600;
                         border: none; cursor: pointer;">
            Continue →
          </button>
        </div>

      </form>
    </div>

    <!-- Skip option (non-mandatory steps only) -->
    <p style="text-align: center; font-size: var(--aurad-text-sm);
              color: var(--aurad-text-muted); margin-block-start: var(--aurad-space-4);">
      <a href="/dashboard?skip_onboarding=1"
         style="color: var(--aurad-text-muted); text-decoration: underline;">
        Skip for now
      </a>
    </p>

  </div>
</main>
```

---

## 3. Completion Screen (First Value Moment)

```html
<div style="text-align: center; max-inline-size: 480px; margin-inline: auto;
            padding: var(--aurad-space-16) var(--aurad-space-6);">

  <!-- Success illustration or checkmark -->
  <div style="inline-size: 72px; block-size: 72px;
              background: var(--aurad-success-subtle);
              border-radius: var(--aurad-radius-full);
              display: flex; align-items: center; justify-content: center;
              margin-inline: auto; margin-block-end: var(--aurad-space-6);">
    <svg aria-hidden="true" width="36" height="36"
         style="color: var(--aurad-success);"><!-- check --></svg>
  </div>

  <h1 style="font-size: var(--aurad-text-3xl); font-weight: 700;
             color: var(--aurad-text); margin-block-end: var(--aurad-space-3);">
    You're all set!
  </h1>
  <p style="font-size: var(--aurad-text-base); color: var(--aurad-text-muted);
            line-height: var(--aurad-leading-normal);
            margin-block-end: var(--aurad-space-8);">
    Your workspace <strong style="color: var(--aurad-text);">Acme Inc.</strong> is ready.
    Invite your team to start collaborating.
  </p>

  <!-- Primary CTA: the "aha" action -->
  <div style="display: flex; flex-direction: column; gap: var(--aurad-space-3);
              max-inline-size: 320px; margin-inline: auto;">
    <a href="/dashboard"
       style="display: block; text-align: center;
              padding: var(--aurad-space-3) var(--aurad-space-6);
              background: var(--aurad-primary);
              color: var(--aurad-text-inverse);
              border-radius: var(--aurad-radius-md);
              font-weight: 600; text-decoration: none;">
      Go to dashboard
    </a>
    <a href="/invite"
       style="display: block; text-align: center;
              padding: var(--aurad-space-3) var(--aurad-space-6);
              border: 1px solid var(--aurad-border);
              border-radius: var(--aurad-radius-md);
              font-size: var(--aurad-text-sm);
              color: var(--aurad-text); text-decoration: none;">
      Invite team members first
    </a>
  </div>

</div>
```

---

## 4. Key Onboarding Patterns

| Pattern | Frequency | Impact |
|---------|-----------|--------|
| ≤5 steps total | 5/5 reference | Each additional step loses ~15% of users |
| One question per screen | 5/5 reference | Reduces abandonment vs. long-form |
| `autofocus` on first input | 5/5 reference | Signals readiness, reduces friction |
| Back button always visible | 4/5 reference | Reduces anxiety — users feel less trapped |
| Skip option on optional steps | 4/5 reference | Respect user time; don't force profile completeness |
| Completion screen with "aha" action | 5/5 reference | Direct users to value immediately |
| Progress indicator with step count | 5/5 reference | Known endpoint reduces drop-off |

---

## 5. Onboarding Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Asking for credit card before value delivery | Friction spike → abandonment | Trial-first; card later |
| 8+ question single-page form | Overwhelm → abandonment | Break into steps ≤3 questions each |
| No skip option on optional steps | Forces friction | Mark optional steps; allow skip |
| Email verification blocking first login | Kills momentum | Allow access first, verify in background |
| Mandatory company size / role dropdown | Unwanted profiling | Remove if not needed for product routing |
| No progress indicator | Users don't know when it ends | Always show step N of M |
| Sending to empty dashboard without guidance | "Now what?" moment | Completion screen with one clear CTA |
