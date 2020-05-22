#!/usr/bin/env bash

# Syntax: ./install-browsers.sh

set -e

if [ "$(id -u)" -ne 0 ]; then
    echo 'Script must be run a root. Use sudo or set "USER root" before running the script.'
    exit 1
fi

apt-get -y install --no-install-recommends libasound2-dev \
    fonts-liberation \
    dbus \
    xvfb \
    ttf-freefont \
    fluxbox \
    libappindicator3-1 \
    libnspr4 \
    libdbus-glib-1.2 \
    libnss3-dev \
    libxss1 \
    libxtst6 \
    xdg-utils


mkdir -p /usr/lib/firefox && \
    wget -c "https://ftp.mozilla.org/pub/firefox/releases/${FIREFOX_VERSION}/linux-x86_64/en-GB/firefox-${FIREFOX_VERSION}.tar.bz2"  -O - | tar -xjv -C /usr/lib && \
    ln -s /usr/lib/firefox/firefox /usr/bin/firefox

# To download another version @see https://www.ubuntuupdates.org/package/google_chrome/stable/main/base/google-chrome-stable
wget -O /tmp/google-chrome.deb -q "https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb" && \
    dpkg -i /tmp/google-chrome.deb && \
    rm -rf /tmp/google-chrome.deb

exit 0