# Walk Cafe Days / StepCafeGacha

歩数連動、放置カフェ経営、キャラ・レシピ・設備ガチャを組み合わせたiOSゲーム企画のWeb確認用プロトタイプです。

## Web確認

公開URL:

```text
https://ailiferyoya-gif.github.io/StepCafeGacha/
```

ローカル確認:

```powershell
cd D:\Codex\StepCafeGacha
C:\Users\kogit\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe tools\static-server.mjs
```

ブラウザで `http://localhost:4178` を開きます。

## 現在の見どころ

- ChatGPT生成の箱庭風カフェ背景
- 個別生成した内装アイテムの切り替え
- 赤ソファ、ショーケースの表示/配置変更
- 背景透過PNGの店員キャラ表示
- 疑似歩数、報酬、ガチャ、編成、強化の基本挙動

## 主要ファイル

- `SPEC_v0.1.md`: ゲーム仕様
- `DESIGN_DIRECTION_v0.1.md`: タイトル・ビジュアル方向
- `index.html`: Webプロトタイプ
- `styles.css`: Webプロトタイプの見た目
- `app.js`: 疑似歩数、報酬、ガチャ、内装切替、店員表示の挙動
- `assets/cafe-room-isometric.png`: ChatGPT生成の箱庭風カフェ背景
- `assets/decor/red-sofa.png`: ChatGPT生成 + クロマキー透過の赤ソファ
- `assets/decor/pastry-counter.png`: ChatGPT生成 + クロマキー透過のショーケース
- `assets/staff/barista-mina.png`: ChatGPT生成 + クロマキー透過の店員キャラ
- `NEXT_CHAT_HANDOFF.md`: 作業引継ぎ
