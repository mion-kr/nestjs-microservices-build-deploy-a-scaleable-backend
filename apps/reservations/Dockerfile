FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json

RUN npm install -g pnpm

RUN pnpm install

# node_modules 파일을 제외하기 위해선 .dockerignore 파일을 사용해야 합니다.
# COPY . .

# 운영환경을 위한 도커 파일 copy 변경
COPY apps/reservations apps/reservations
COPY libs libs

RUN pnpm run build

# ---
FROM node:alpine as production

# ARG 빌드 시 재정의할 수 있는 변수를 정의 합니다.
ARG NODE_ENV=production 

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]