# Triaging

Repository maintainers triage every issue and PR opened in the repository.

> Note: Feature requests should be opened as discussions, filling out [this template](https://github.com/d-one-design/glimpse/discussions/new?category=ideas).

Issues are opened with one of these labels:

- `template: bug` - unverified issue with Glimpse itself

In the case of a bug report, a maintainer looks at the provided reproduction. If the reproduction is missing or insufficient, a `please add a complete reproduction` label is added. If a reproduction is not provided for more than 30 days, the issue becomes stale and will be automatically closed. If a reproduction is provided within 30 days, the `please add a complete reproduction` label is removed and the issue will not become stale anymore.

Bug reports must be verified against the `canary` release. Some issues may already be fixed in the canary version, so please verify that your issue reproduces before opening a new issue. Issues not verified against `canary` will be closed after 30 days.

If the issue is specific to your project and not to Glimpse itself, it might be converted to a [🎓️ Help discussion](https://github.com/d-one-design/glimpse/discussions/categories/help)

If the bug is verified, it will receive the `kind: bug` label and will be tracked by the maintainers. An `area:` label can be added to indicate which part of Glimpse is affected.

Confirmed issues never become stale or are closed before resolution.

All **closed** PRs and Issues will be locked after 30 days of inactivity (eg.: comment, referencing from elsewhere).
