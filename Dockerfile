# frontend/Dockerfile (Next.js 15.4+)
# 1) Build 단계
FROM node:20-alpine AS builder
WORKDIR /app

# 종속성 설치
COPY package.json package-lock.json ./
RUN npm ci

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# 2) Production 단계
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# 빌드 결과 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json .
RUN npm ci --production

# Next.js 15.4+ 기본 포트
EXPOSE 3000
CMD ["npm", "start"]