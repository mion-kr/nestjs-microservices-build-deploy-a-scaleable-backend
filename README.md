# 강의

강의 : https://www.udemy.com/course/nestjs-microservices-build-deploy-a-scaleable-backend/  
github : https://github.com/mguay22/sleepr

## 초기 셋팅

- 프로젝트 생성  
  `nest new nestjs-microservices-build-deploy-a-scaleable-backend`  
  => pnpm 선택

- 의존성 설치  
  `pnpm install`

- mono repo 셋팅 :: common 라이브러리 생성  
  `nest generate library common`  
  => What prefix would you like to use for the library (default: @app)? 엔터

## Database(MongoDB)

- 의존성 설치  
  `pnpm i @nestjs/mongoose mongoose`

- common library에 database module 추가  
  `nest generate module database -p common`

- libs/common에서 파일 삭제

  - common.module.ts
  - common.service.ts
  - common.service.spec.ts

- database 생성

  - mongodb 컨테이너에 접속  
    `docker exec -it {컨테이너 이름}`
  - mongo 접속  
    `mongo -u root -p`
  - database 생성  
    `use sleepr`  
    `db.sleepr.insert({name:"mongodb"})`
    > 새로운 document까지 생성해야 database 생성이 완료 됩니다.
  - 계정 생성  
    `use sleepr`

    > 계정을 생성할 database 선택

    `db.createUser({user:"sleepr", pwd: passwordPrompt(), roles: ["readWrite"]})`

    > 비밀번호 입력창이 나오면 비밀번호 입력

## config

- 의존성 설치  
  `pnpm i @nestjs/config`

- common library에 config module 추가
  `nest generate module config -p common`

- 의존성 설치  
  `pnpm i joi`
