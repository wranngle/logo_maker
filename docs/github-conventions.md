# GitHub Conventions

This repo uses small issue forms, focused pull requests, and Bun-backed CI.

## Issues

Use one of the shipped forms:

- Bug: existing behavior is wrong.
- Feature: a concrete user-facing or maintainer-facing improvement.
- Research: a time-boxed decision or spike.

Each issue includes an Area field. The triage workflow reads that field and
applies the matching `a/<area>` label when the label exists.

## Pull Requests

- Keep the change focused.
- Link the issue with `Closes #N`, `Fixes #N`, or `Resolves #N`.
- Run `bun run check` locally before requesting review.
- Do not include generated `output/` files, local logs, or scratch assets.

## Automation

- `ci.yml` runs shell lint, YAML lint, XO, TypeScript, and Bun tests.
- `gitleaks.yml` scans for committed secrets.
- `pr-link-check.yml` labels PRs that do not link an issue.
- `automerge.yml` only arms auto-merge for explicit automation cases.
