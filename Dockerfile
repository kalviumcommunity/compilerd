FROM node:20-alpine

ENV PYTHONUNBUFFERED=1

# Install necessary dependencies
RUN set -ex && \
    apk add --no-cache gcc g++ musl-dev python3 openjdk17 ruby iptables ip6tables && \
    apk add --no-cache chromium lsof make python3-dev

# Clean up unnecessary files
RUN set -ex && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/cc1obj && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto1 && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto-wrapper && \
    rm -f /usr/bin/x86_64-alpine-linux-musl-gcj

# Create a symlink for python
RUN ln -sf python3 /usr/bin/python

# Add application files
ADD . /usr/bin/
ADD start.sh /usr/bin/

# Install Node.js dependencies and rebuild sqlite3
RUN npm --prefix /usr/bin/ install && \
    npm --prefix /usr/bin/ rebuild sqlite3

# Expose the application port
EXPOSE 8080

# Add a dummy user that will run the server, hence sandboxing the rest of the container
RUN addgroup -S -g 2000 runner && adduser -S -D -u 2000 -s /sbin/nologin -h /tmp -G runner runner

# Make sure start.sh is executable
RUN chmod +x /usr/bin/start.sh

# Run the application
CMD sh /usr/bin/start.sh



