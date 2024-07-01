FROM docker.io/library/node:20.13.0-alpine

ENV PYTHONUNBUFFERED=1

RUN set -ex && \
    apk add --no-cache gcc g++ musl-dev python3 py3-pip openjdk17 ruby iptables ip6tables go rust php chromium lsof

RUN set -ex && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/cc1obj && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto1 && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto-wrapper && \
    rm -f /usr/bin/x86_64-alpine-linux-musl-gcj

RUN ln -sf python3 /usr/bin/python

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --upgrade pip
RUN pip install openai

COPY . /usr/bin/
COPY start.sh /usr/bin/

RUN npm --prefix /usr/bin/ install

EXPOSE 8080

#  add a dummy user that will run the server, hence sandboxing the rest of the container
RUN addgroup -S -g 2000 runner && adduser -S -D -u 2000 -s /sbin/nologin -h /tmp -G runner runner

COPY testOpenApiKey.py /usr/src/app/
RUN chmod +x /usr/src/app/testOpenApiKey.py

# USER runner
CMD sh /usr/bin/start.sh
