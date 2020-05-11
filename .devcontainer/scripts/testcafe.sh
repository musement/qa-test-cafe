#!/usr/bin/env bash

set -e

dbus-daemon --session --fork
Xvfb :1 -screen 0 "${XVFB_SCREEN_WIDTH}x${XVFB_SCREEN_HEIGHT}x24" >/dev/null 2>&1 &
export DISPLAY=:1.0
fluxbox >/dev/null 2>&1 &
node /opt/quality-assurance-e2e-tests/index.js "$@"