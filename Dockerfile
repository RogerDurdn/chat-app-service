FROM golang:1.18rc1-buster

RUN apt update \
    && apt upgrade \
    && apt install vim -y
# Default powerline10k theme, no plugins installed
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)"

ENV NODE_VERSION=16.13.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

RUN apt-get update && \
 apt-get install -y \
    nodejs npm

RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && \
 apt-get install -y nodejs

RUN node --version
RUN npm --version

RUN npm install -g @vue/cli && vue --version
RUN npm install --global yarn

WORKDIR /usr/apps

CMD ["bash"]

