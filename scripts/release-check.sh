#!/usr/bin/env bash
# Fails a PR that changes lib/** without releasing it: package.json must carry
# a version greater than the base branch's, not yet tagged, with a matching
# `## vX.Y.Z` entry in CHANGELOG.md. Usage: scripts/release-check.sh <base-ref>
set -euo pipefail

BASE="${1:?usage: release-check.sh <base-ref>}"

if ! git diff --name-only "${BASE}...HEAD" | grep -q '^lib/'; then
  echo "No changes under lib/; no release required."
  exit 0
fi

version_of() { node -p "JSON.parse(require('fs').readFileSync(0, 'utf8')).version"; }
BASE_V=$(git show "${BASE}:package.json" | version_of)
HEAD_V=$(version_of < package.json)

fail() {
  echo "::error::$1" >&2
  echo "Bump with: pnpm version <patch|minor|major> --no-git-tag-version" >&2
  echo "and add a '## v<version> — <date>' entry at the top of CHANGELOG.md." >&2
  exit 1
}

HIGHEST=$(printf '%s\n%s\n' "$BASE_V" "$HEAD_V" | sort -V | tail -1)
if [ "$HEAD_V" = "$BASE_V" ] || [ "$HIGHEST" != "$HEAD_V" ]; then
  fail "lib/ changed but package.json version ${HEAD_V} is not greater than ${BASE} (${BASE_V})."
fi

if git rev-parse -q --verify "refs/tags/v${HEAD_V}" >/dev/null; then
  fail "v${HEAD_V} is already tagged; rebase on ${BASE} and bump again."
fi

if ! grep -Eq "^## v${HEAD_V//./\\.}( |$)" CHANGELOG.md; then
  fail "CHANGELOG.md has no '## v${HEAD_V}' entry."
fi

echo "Release v${HEAD_V} (base ${BASE_V}) looks good."
