ARG DEBIAN_VARIANT=bookworm
ARG GO_VERSION=1
# This is probably overkill, but good learning opportunity
FROM golang:${GO_VERSION}-${DEBIAN_VARIANT} AS preflight_builder

RUN apk add --no-cache git
WORKDIR /builds

RUN GOBIN=`pwd` go get -u github.com/spectralops/preflight

# Now the actual build work
FROM debian:${DEBIAN_VARIANT}

ARG NODE_VERSION=22
ARG USERNAME=node

RUN groupadd --gid 1000 ${USERNAME} \
	&& useradd --uid 1000 --gid ${USERNAME} --shell /bin/bash --create-home ${USERNAME}

USER ${USERNAME}

COPY --from=preflight_builder /builds/preflight /usr/local/bin

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | \
	preflight run sha256=06c0735498f1ed383a7e84d4780e73dc961285f1e7d07031f4da51a8d3f0b9be

RUN nvm install ${NODE_VERSION} && nvm alias default ${NODE_VERSION}

RUN corepack enable pnpm

# quick smoke test
RUN pnpm -v && node -v

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "node" ]