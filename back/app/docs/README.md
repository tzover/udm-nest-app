# 記載事項

---

- 環境構築方法は CreateDevEnv.md を参照

---

## 追加パッケージ

- process.env を使用するために追加
- bcrypt 入れれない -> node image を変更(slim だと NG)

```
npm i @nestjs/config uuid
npm i typeorm @nestjs/typeorm pg
npm remove uuid
npm i bcrypt
npm i @nestjs/jwt @nestjs/passport passport passport-jwt @types/passport-jwt
npm i @hapi/joi
npm i -D @types/hapi__joi
```

- こうやってやってる人もいた

```
FROM node:12-alpine
WORKDIR /app
COPY package.json /app/package.json
## install required packages before npm
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install
COPY . /app
EXPOSE 8080
USER node
CMD ["node", "index.js"]
```
