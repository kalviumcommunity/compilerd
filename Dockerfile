FROM docker.io/library/node:20.13.0-alpine

ENV PYTHONUNBUFFERED=1

# Install compilers and dependencies
RUN set -ex && \
    apk add --no-cache gcc g++ musl-dev python3 go rust cargo openjdk17 php ruby iptables ip6tables 
    
RUN set -ex && \
    apk add --no-cache chromium lsof


# Cleanup unnecessary files
RUN set -ex && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/cc1obj && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto1 && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto-wrapper && \
    rm -f /usr/bin/x86_64-alpine-linux-musl-gcj

# Create a symlink for python3
RUN ln -sf python3 /usr/bin/python

# Add local files
ADD . /usr/bin/
ADD start.sh /usr/bin/

# Install Node.js dependencies
RUN npm --prefix /usr/bin/ install

# Expose port 8080
EXPOSE 8080

# Add a dummy user to sandbox the container
RUN addgroup -S -g 2000 runner && adduser -S -D -u 2000 -s /sbin/nologin -h /tmp -G runner runner

# Switch to the runner user
# USER runner

# Start the script
CMD sh /usr/bin/start.sh 
