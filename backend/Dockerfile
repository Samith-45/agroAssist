# syntax=docker/dockerfile:1.4
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies only when needed
COPY package*.json ./
RUN npm ci --only=production

# Copy application source
COPY src ./src

# Create non-root user for enterprise container security
USER node

EXPOSE 5000

ENV PORT=5000 \
    NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["node", "src/server.js"]
