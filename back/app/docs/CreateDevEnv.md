# 環境構築方法

1. コンテナ作成と起動
2. コンテナ内環境構築
3. Prettier による自動フォーマット有効化

---

## 1.コンテナ作成と起動

### Tree 構造

```
nest new .
```

```
npm
```

- add package

```
npm i -D ts-node-dev nodemon
```

- .prettierrc

```
{
  "singleQuote": true,
  "trailingComma": "all",
  "semi":false
}
```

- package.json

```
"build:watch": "tsc --watch",
"dev": "nodemon /dist/main",
"dev:ts": "ts-node-dev --respawn src/main"
```

- .vscode/settings.json

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```