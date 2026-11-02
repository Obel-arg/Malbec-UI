# @obel-arg/malbec-ui

Malbec UI — React component library, published to GitHub Packages.

## Install (consumers)

Every project that installs `@obel-arg/malbec-ui` must have an `.npmrc` at the repository root so npm can resolve the `@obel-arg` scope from GitHub Packages. Add (or merge) these lines:

```
@obel-arg:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=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
```

Add this alias dependency in your project's `package.json`:

```json
{
  "dependencies": {
    "malbec-ui": "npm:@obel-arg/malbec-ui@latest"
  }
}
```

Alternative (recommended): run this and npm will write the same alias for you:

```bash
npm install malbec-ui@npm:@obel-arg/malbec-ui@latest
```

Then add this to your project's `globals.css`:

```css
@import "tailwindcss";
@import "malbec-ui/style.css";

@custom-variant dark (&:where(.dark, .dark *));

/* Re-export malbec-ui runtime vars as Tailwind theme tokens. */
:root {
  --app-color-primary: var(--color-primary);
  --app-color-primary-foreground: var(--color-primary-foreground);
  --app-color-foreground: var(--color-foreground);
  --app-color-accent: var(--color-accent);
  --app-color-destructive: var(--color-destructive);
  --app-color-destructive-foreground: var(--color-destructive-foreground);
  --app-color-background-100: var(--color-background-100);
  --app-color-background-200: var(--color-background-200);
  --app-color-background-300: var(--color-background-300);
  --app-color-text-default: var(--color-text-default);
  --app-color-text-default-muted: var(--color-text-default-muted);
  --app-color-sidebar-border: var(--color-sidebar-border);
}

@theme inline {
  --color-primary: var(--app-color-primary);
  --color-primary-foreground: var(--app-color-primary-foreground);
  --color-foreground: var(--app-color-foreground);
  --color-accent: var(--app-color-accent);
  --color-destructive: var(--app-color-destructive);
  --color-destructive-foreground: var(--app-color-destructive-foreground);
  --color-background-100: var(--app-color-background-100);
  --color-background-200: var(--app-color-background-200);
  --color-background-300: var(--app-color-background-300);
  --color-text-default: var(--app-color-text-default);
  --color-text-default-muted: var(--app-color-text-default-muted);
  --color-sidebar-border: var(--app-color-sidebar-border);
  --font-sans: "Inter Variable", Inter, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

  --text-xxs: 0.656rem;
}
```


## Releasing

Each PR that changes `lib/**` ships its own release; there is no separate release PR.

1. In your PR, bump the version: `pnpm version <patch|minor|major> --no-git-tag-version`.
2. Add a `## vX.Y.Z — YYYY-MM-DD` entry at the top of `CHANGELOG.md`.
3. Merge. `publish.yml` sees an untagged version on `main`, publishes it to GitHub Packages and creates the tag + GitHub Release with that CHANGELOG entry.

CI (`ci.yml`) fails a PR that touches `lib/**` without a bump or a CHANGELOG entry. If two PRs bump to the same version, the second one must rebase and bump again.
