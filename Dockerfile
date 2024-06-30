FROM docker.io/library/node:20.13.0-alpine

ENV PYTHONUNBUFFERED=1
RUN set -ex && \
    apk add --no-cache gcc g++ musl-dev python3 openjdk17 ruby iptables ip6tables


# Install Go, PHP, fortan, rust
RUN apk add --no-cache rust cargo
RUN apk add --no-cache go
RUN apk add --no-cache php php-cli

# Add C# (Mono) support
RUN apk add --no-cache mono --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing


# # Add Swift support
# RUN apk add --no-cache swift --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing

# # Add Kotlin support
# RUN apk add --no-cache kotlin --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing

RUN set -ex && \
    apk add --no-cache chromium lsof

RUN set -ex && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/cc1obj && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto1 && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto-wrapper && \
    rm -f /usr/bin/x86_64-alpine-linux-musl-gcj

RUN ln -sf python3 /usr/bin/python

ADD . /usr/bin/
ADD start.sh /usr/bin/

RUN npm --prefix /usr/bin/ install
EXPOSE 8080

RUN addgroup -S -g 2000 runner && adduser -S -D -u 2000 -s /sbin/nologin -h /tmp -G runner runner
CMD sh /usr/bin/start.sh

