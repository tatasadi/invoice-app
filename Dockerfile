# syntax=docker/dockerfile:1.7-labs

# 1) Builder - use build platform for compilation
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder
WORKDIR /app

# Install dependencies needed for Prisma and native packages
RUN apk add --no-cache libc6-compat openssl

# Copy package files and Prisma schema
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
COPY prisma ./prisma

# Install dependencies with the preferred package manager
RUN if [ -f yarn.lock ]; then corepack enable && corepack prepare yarn@stable --activate && yarn --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile; \
    else npm ci; fi

# Copy source code
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application (this includes Prisma generate from package.json build script)
RUN \
  if [ -f yarn.lock ]; then corepack enable && yarn build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm run build; \
  else npm run build; fi

# 2) Runner (production image)
FROM --platform=$TARGETPLATFORM node:20-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install OpenSSL for Prisma (required for database connections)
RUN apk add --no-cache openssl

# Create a non-root user
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copy built application from builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy Prisma client and schema (needed for database operations)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

# Create cache directory with proper ownership
RUN mkdir -p .next/cache && chown -R nextjs:nextjs .next

# Expose port
EXPOSE 3000

# Use non-root user
USER nextjs

# Start the Next.js server
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
