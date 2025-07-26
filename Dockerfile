FROM node:20-alpine AS builder
WORKDIR /app

# 종속성 설치: package.json & yarn.lock 복사
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 소스 복사 및 빌드
COPY . .
RUN yarn build

# 2) Production 단계
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# 빌드 결과 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

# 프로덕션 의존성만 설치
RUN yarn install --production --frozen-lockfile

EXPOSE 3000
CMD ["yarn", "start"]