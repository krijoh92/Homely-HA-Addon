ARG BUILD_FROM=ghcr.io/home-assistant/amd64-base:3.19
FROM ${BUILD_FROM}

# Install bun and other dependencies
RUN apk add --no-cache curl unzip python3 make g++ bash \
	&& curl -fsSL https://bun.sh/install | bash \
	&& ln -s /root/.bun/bin/bun /usr/local/bin/bun \
	&& ln -s /root/.bun/bin/bunx /usr/local/bin/bunx

WORKDIR /app

# Copy the entire application
COPY rootfs/app /app

# Install dependencies
RUN bun install --frozen-lockfile || bun install

# Copy our add-on run script
COPY run.sh /
RUN chmod a+x /run.sh

CMD ["/run.sh"]
