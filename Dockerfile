FROM docker.io/library/node:20.13.0-alpine

ENV PYTHONUNBUFFERED=1

# Install required packages and Go compiler
RUN set -ex && \
    apk add --no-cache \
        gcc \
        g++ \
        musl-dev \
        python3 \
        openjdk17 \
        ruby \
        iptables \
        ip6tables \
        chromium \
        lsof \
        go && \
    # Remove unnecessary files to keep the image clean
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/cc1obj && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto1 && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto-wrapper && \
    rm -f /usr/bin/x86_64-alpine-linux-musl-gcj

# Ensure Python symlink is correct
RUN ln -sf python3 /usr/bin/python

# Add application files
ADD . /usr/bin/
ADD start.sh /usr/bin/

# Install npm dependencies
RUN npm --prefix /usr/bin/ install

# Expose the application port
EXPOSE 8080

# Add a dummy user for running the server
RUN addgroup -S -g 2000 runner && adduser -S -D -u 2000 -s /sbin/nologin -h /tmp -G runner runner

# Run the application
CMD sh /usr/bin/start.sh
