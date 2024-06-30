FROM docker.io/library/node:20.13.0-alpine

ENV PYTHONUNBUFFERED=1
RUN set -ex && \
    apk add --no-cache gcc g++ musl-dev python3 openjdk17 ruby iptables ip6tables lsof

# Allow container to bind to privileged ports (like 3000) without root
RUN apk add --no-cache libcap && \
    setcap 'cap_net_bind_service=+ep' /usr/local/bin/node

RUN ln -sf python3 /usr/bin/python

ADD . /usr/bin/
ADD start.sh /usr/bin/

RUN npm --prefix /usr/bin/ install
EXPOSE 8080

# add a dummy user that will run the server, hence sandboxing the rest of the container
RUN addgroup -S -g 2000 runner && adduser -S -D -u 2000 -s /sbin/nologin -h /tmp -G runner runner
#   USER runner
CMD sh /usr/bin/start.sh
