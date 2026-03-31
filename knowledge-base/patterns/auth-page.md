# Auth Page Patterns — AuraDKit

> Derived from analysis of auth pages across SaaS products. Auth is the highest-stakes UI — errors here cause direct revenue loss.

## Structure Overview

```
┌────────────────────────────────────────────────┐
│                                                 │
│          [Brand Logo]                           │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │                                         │   │
│  │  Sign in to [Brand]                     │   │
│  │                                         │   │
│  │  [Social Login Buttons]                 │   │
│  │                                         │   │
│  │  ─────── or continue with email ─────── │   │
│  │                                         │   │
│  │  Email ________________________         │   │
│  │  Password ______________________  [👁] │   │
│  │                           [Forgot?]     │   │
│  │                                         │   │
│  │  [Sign in]                              │   │
│  │                                         │   │
│  │  Don't have an account? Sign up         │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└────────────────────────────────────────────────┘
```

---

## 1. Auth Form (Full Implementation)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sign in — Brand</title>
</head>
<body style="min-block-size: 100dvh; display: flex; align-items: center;
             justify-content: center; padding: var(--aurad-space-4);
             background: var(--aurad-surface);">

  <main style="inline-size: 100%; max-inline-size: 400px;">

    <!-- Logo -->
    <div style="text-align: center; margin-block-end: var(--aurad-space-8);">
      <a href="/" aria-label="Go to homepage">
        <img src="/logo.svg" alt="Brand logo" height="32">
      </a>
    </div>

    <!-- Card -->
    <div style="background: var(--aurad-surface-raised);
                border: 1px solid var(--aurad-border);
                border-radius: var(--aurad-radius-xl);
                padding: var(--aurad-space-8);">

      <h1 style="font-size: var(--aurad-text-2xl); font-weight: 700;
                 text-align: center; margin-block-end: var(--aurad-space-6);">
        Sign in
      </h1>

      <!-- Social login -->
      <div style="display: flex; flex-direction: column; gap: var(--aurad-space-3);
                  margin-block-end: var(--aurad-space-6);">
        <button type="button"
                style="display: flex; align-items: center; justify-content: center;
                       gap: var(--aurad-space-2); padding: var(--aurad-space-3);
                       border: 1px solid var(--aurad-border);
                       border-radius: var(--aurad-radius-md);
                       background: var(--aurad-surface-raised);
                       font-size: var(--aurad-text-sm); font-weight: 500;
                       cursor: pointer; inline-size: 100%;"
                aria-label="Continue with Google">
          <img src="/icons/google.svg" alt="" width="18" height="18" aria-hidden="true">
          Continue with Google
        </button>
        <button type="button"
                style="display: flex; align-items: center; justify-content: center;
                       gap: var(--aurad-space-2); padding: var(--aurad-space-3);
                       border: 1px solid var(--aurad-border);
                       border-radius: var(--aurad-radius-md);
                       background: var(--aurad-surface-raised);
                       font-size: var(--aurad-text-sm); font-weight: 500;
                       cursor: pointer; inline-size: 100%;"
                aria-label="Continue with GitHub">
          <img src="/icons/github.svg" alt="" width="18" height="18" aria-hidden="true">
          Continue with GitHub
        </button>
      </div>

      <!-- Divider -->
      <div style="display: flex; align-items: center; gap: var(--aurad-space-3);
                  margin-block-end: var(--aurad-space-6);">
        <div style="flex: 1; block-size: 1px; background: var(--aurad-border);"></div>
        <span style="font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);">
          or continue with email
        </span>
        <div style="flex: 1; block-size: 1px; background: var(--aurad-border);"></div>
      </div>

      <!-- Form -->
      <form novalidate aria-label="Sign in with email"
            style="display: flex; flex-direction: column; gap: var(--aurad-space-4);">

        <!-- Global error -->
        <div role="alert" id="form-error" hidden
             style="padding: var(--aurad-space-3); border-radius: var(--aurad-radius-md);
                    background: var(--aurad-error-subtle); color: var(--aurad-error);
                    font-size: var(--aurad-text-sm);">
          Invalid email or password.
        </div>

        <!-- Email field -->
        <div style="display: flex; flex-direction: column; gap: var(--aurad-space-1);">
          <label for="email" style="font-size: var(--aurad-text-sm); font-weight: 500;">
            Email
          </label>
          <input id="email" type="email" name="email"
                 autocomplete="email" required
                 placeholder="you@example.com"
                 aria-describedby="email-error"
                 style="padding: var(--aurad-space-2) var(--aurad-space-3);
                        border: 1px solid var(--aurad-border);
                        border-radius: var(--aurad-radius-md);
                        background: var(--aurad-surface-raised);
                        font-size: var(--aurad-text-base);
                        color: var(--aurad-text);
                        inline-size: 100%;">
          <p id="email-error" role="alert" hidden
             style="font-size: var(--aurad-text-xs); color: var(--aurad-error);">
            Please enter a valid email address.
          </p>
        </div>

        <!-- Password field -->
        <div style="display: flex; flex-direction: column; gap: var(--aurad-space-1);">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <label for="password" style="font-size: var(--aurad-text-sm); font-weight: 500;">
              Password
            </label>
            <a href="/forgot-password"
               style="font-size: var(--aurad-text-xs); color: var(--aurad-primary);">
              Forgot password?
            </a>
          </div>
          <div style="position: relative;">
            <input id="password" type="password" name="password"
                   autocomplete="current-password" required
                   aria-describedby="password-error"
                   style="padding: var(--aurad-space-2) var(--aurad-space-3);
                          padding-inline-end: 2.5rem;
                          border: 1px solid var(--aurad-border);
                          border-radius: var(--aurad-radius-md);
                          background: var(--aurad-surface-raised);
                          font-size: var(--aurad-text-base);
                          color: var(--aurad-text);
                          inline-size: 100%;">
            <button type="button"
                    style="position: absolute; inset-inline-end: var(--aurad-space-2);
                           inset-block-start: 50%; transform: translateY(-50%);
                           background: none; border: none; cursor: pointer;
                           color: var(--aurad-text-muted); padding: var(--aurad-space-1);"
                    aria-label="Show password" aria-pressed="false">
              <svg aria-hidden="true" width="16" height="16"><!-- eye icon --></svg>
            </button>
          </div>
          <p id="password-error" role="alert" hidden
             style="font-size: var(--aurad-text-xs); color: var(--aurad-error);">
            Password is required.
          </p>
        </div>

        <!-- Submit -->
        <button type="submit"
                style="inline-size: 100%;
                       padding: var(--aurad-space-3);
                       background: var(--aurad-primary);
                       color: var(--aurad-text-inverse);
                       border-radius: var(--aurad-radius-md);
                       font-size: var(--aurad-text-sm); font-weight: 600;
                       border: none; cursor: pointer;">
          Sign in
        </button>

      </form>

    </div>

    <!-- Sign up link -->
    <p style="text-align: center; font-size: var(--aurad-text-sm);
              color: var(--aurad-text-muted); margin-block-start: var(--aurad-space-4);">
      Don't have an account?
      <a href="/signup" style="color: var(--aurad-primary); font-weight: 500;">
        Sign up
      </a>
    </p>

  </main>

</body>
</html>
```

---

## 2. Security Requirements (MANDATORY)

| Requirement | Implementation |
|-------------|----------------|
| Password field `type="password"` | Always — never `type="text"` for passwords |
| `autocomplete="current-password"` | Enables password managers |
| `autocomplete="new-password"` | On signup, prevents autofill of old password |
| No JWT in localStorage | Use `httpOnly` cookies |
| Error message vague | "Invalid email or password" — never "Email not found" |
| Rate limiting indicator | After 5 failed attempts, show CAPTCHA or lockout message |
| CSRF protection | Hidden `<input name="_csrf">` on form submit |

---

## 3. Loading State for Submit Button

```javascript
const form = document.querySelector('form');
const submitBtn = form.querySelector('[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing in…';
  submitBtn.setAttribute('aria-busy', 'true');

  try {
    await signIn(/* ... */);
    window.location.href = '/dashboard';
  } catch (err) {
    document.getElementById('form-error').hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign in';
    submitBtn.removeAttribute('aria-busy');
  }
});
```

---

## 4. Common Auth Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Showing "Email not found" | User enumeration attack | Always "Invalid email or password" |
| No `autocomplete` attributes | Breaks password managers | Add all `autocomplete` values |
| Password strength bar on login | Confusing (only on signup) | Remove from login form |
| Inline password requirements | Clutters login form | Only on signup/change-password |
| Email confirmation on every login | UX friction | Only on suspicious activity |
| No show/hide password toggle | Accessibility issue | Add toggle button |
