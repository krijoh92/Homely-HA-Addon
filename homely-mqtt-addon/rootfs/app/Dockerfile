FROM oven/bun:latest

ARG TARGETPLATFORM

WORKDIR /app

# Copy package-install.sh
COPY package-install.sh ./

# Install build-dependencies on armv7 (not required on arm64)
ENV PYTHONUNBUFFERED=1
RUN ./package-install.sh

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install

# Copy app source code
COPY . .

# Run app
CMD ["bun", "run", "index.ts"]
