# 1) Builder
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build   # next.config.js 에 output: "standalone" 필요

# 2) Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# standalone 서버 + prod deps
COPY --from=builder /app/.next/standalone ./

# **정적 파일들** (.next/static) 복사
COPY --from=builder /app/.next/static ./.next/static

# public 폴더 복사
COPY --from=builder /app/public ./public

EXPOSE 3000

# standalone 안에 생성된 server.js 실행
CMD ["node", "server.js"]
