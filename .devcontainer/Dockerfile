#-------------------------------------------------------------------------------------------------------------
# The current file is a modified version of Microsoft devcontainer Dockerfile
# @see https://github.com/microsoft/vscode-dev-containers/blob/master/containers/javascript-node-10/.devcontainer/Dockerfile
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------
FROM node:12.0.0

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# The node image includes a non-root user with sudo access. Use the "remoteUser"
# property in devcontainer.json to use it. On Linux, the container user's GID/UIDs
# will be updated to match your local UID/GID (when using the dockerFile property).
# See https://aka.ms/vscode-remote/containers/non-root-user for details.
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Set to false to skip installing zsh and Oh My ZSH!
ARG INSTALL_ZSH="true"

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

ENV PATH=${PATH}:/usr/local/share/npm-global/bin

ARG FIREFOX_VERSION="76.0"
ARG CHROME_VERSION="81.0.4044.92-1"

COPY ./scripts/common-setup.sh /tmp/
COPY ./scripts/install-browsers.sh /tmp/
RUN chmod +x /tmp/*.sh

# Configure apt and install packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils dialog ca-certificates 2>&1 \
    #
    # Verify git, common tools / libs installed, add/modify non-root user, optionally install zsh
    && /bin/bash /tmp/common-setup.sh "$INSTALL_ZSH" "$USERNAME" "$USER_UID" "$USER_GID" \
    && rm /tmp/common-setup.sh \
    #
    # Remove outdated yarn from /opt and install via package 
    # so it can be easily updated via apt-get upgrade yarn
    && rm -rf /opt/yarn-* \
    && rm -f /usr/local/bin/yarn \
    && rm -f /usr/local/bin/yarnpkg \
    && apt-get install -y curl apt-transport-https lsb-release \
    && curl -sS https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/pubkey.gpg | apt-key add - 2>/dev/null \
    && echo "deb https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get -y install --no-install-recommends yarn \
    #
    # Set alternate global install location that both users have rights to access
    && mkdir -p /usr/local/share/npm-global \
    && chown ${USERNAME}:root /usr/local/share/npm-global \
    && npm config -g set prefix /usr/local/share/npm-global \
    && sudo -u ${USERNAME} npm config -g set prefix /usr/local/share/npm-global \
    #
    # Tactically remove imagemagick due to https://security-tracker.debian.org/tracker/CVE-2019-10131
    # Can leave in image once the CVE is resolved upstream or the node images move to "buster".
    && apt-get purge -y imagemagick imagemagick-6-common \
    #
    # Install browsers and X11
    && /bin/bash /tmp/install-browsers.sh \
    && rm /tmp/install-browsers.sh \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

COPY ./scripts/testcafe.sh /usr/local/bin
RUN chmod +x /usr/local/bin/testcafe.sh

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=dialog

USER node

RUN npm install

WORKDIR /opt/quality-assurance-e2e-tests