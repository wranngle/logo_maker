#!/usr/bin/env bash
set -euo pipefail

if command -v bun >/dev/null 2>&1; then
  exec bun "$@"
fi

if [[ -x "$HOME/.bun/bin/bun" ]]; then
  exec "$HOME/.bun/bin/bun" "$@"
fi

printf 'bun-local: Bun is not installed or not on PATH\n' >&2
exit 127
