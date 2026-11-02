#!/usr/bin/env bash
# Regression check for release-check.sh: builds throwaway repos and asserts
# pass/fail per scenario. Run: scripts/release-check.test.sh
set -uo pipefail

CHECK="$(cd "$(dirname "$0")" && pwd)/release-check.sh"
FAILURES=0

setup() {
  DIR=$(mktemp -d)
  cd "$DIR"
  git init -q -b main
  git config user.email t@t && git config user.name t
  mkdir lib && echo a > lib/a.ts
  echo '{"version":"1.0.0"}' > package.json
  printf '# Changelog\n\n## v1.0.0 — 2026-01-01\n\n- init\n' > CHANGELOG.md
  git add -A && git commit -qm init && git tag v1.0.0
  git checkout -qb pr
}

bump() { echo "{\"version\":\"$1\"}" > package.json; }
log() { printf '# Changelog\n\n## v%s — 2026-02-02\n\n- change\n\n## v1.0.0 — 2026-01-01\n' "$1" > CHANGELOG.md; }

expect() { # expect <pass|fail> <name>
  git add -A && git commit -qm change --allow-empty
  if "$CHECK" main >/dev/null 2>&1; then got=pass; else got=fail; fi
  if [ "$got" = "$1" ]; then echo "ok   $2"; else echo "FAIL $2 (expected $1, got $got)"; FAILURES=$((FAILURES+1)); fi
  rm -rf "$DIR"
}

setup; echo x > README.md;                               expect pass "non-lib change needs no bump"
setup; echo b > lib/a.ts;                                expect fail "lib change without bump"
setup; echo b > lib/a.ts; bump 1.0.1;                    expect fail "bump without CHANGELOG entry"
setup; echo b > lib/a.ts; bump 1.0.1; log 1.0.1;         expect pass "bump + CHANGELOG entry"
setup; echo b > lib/a.ts; bump 0.9.0; log 0.9.0;         expect fail "version goes backwards"
setup; echo b > lib/a.ts; bump 1.0.1; log 1.0.1; git tag v1.0.1; expect fail "version already tagged"
setup; echo b > lib/a.ts; bump 1.0.1; log 1.0.10;        expect fail "CHANGELOG entry for a different version"

exit "$FAILURES"
