# Platform services (non-device)

Everything in this directory is outside the medical device boundary: account
management, scheduling, billing, the web shell, infrastructure.

It releases on the `v*` tag train, daily, with no design controls and no items
synced to Ketryx. The Ketryx project that watches this path tracks dependencies
and vulnerabilities only.

If code here starts doing something the device relies on for safety or
performance, it belongs under `device/` instead — moving the file is what moves
it under design control.
