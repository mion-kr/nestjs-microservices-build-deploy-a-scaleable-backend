FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

#RUN pnpm install

# node_modules 파일을 제외하기 위해선 .dockerignore 파일을 사용해야 합니다.
# COPY . .
 
# 운영환경을 위한 도커 파일 copy 변경
COPY apps/notifications apps/notifications
COPY libs libs

# 재귀 의존성 설치. 각각의 워크스페이스의 의존성을 설치 합니다.
RUN pnpm install -r 

#RUN cd apps/notifications && pnpm install

RUN pnpm run build notifications

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

CMD ["node", "dist/apps/notifications/main"]