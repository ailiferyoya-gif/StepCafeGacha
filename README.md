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

- Webサイト風ではなく、スマホゲームのメイン画面として見えるHUD/下部ナビ構成
- カフェ店内を6列 x 7行のマス目で管理する内装編集画面
- 家具パレットからソファ、丸テーブル、ショーケース、植木、店員を選んで好きなマスへ配置
- 配置上限、範囲外、家具同士の重なりをチェックする簡易ロジック
- 撤去モード、全撤去、おまかせ配置
- 疑似歩数、報酬、ガチャ、編成、強化の基本挙動
- ChatGPT生成の箱庭風カフェ背景、家具、透過店員キャラ

## 主要ファイル

- `SPEC_v0.1.md`: ゲーム仕様
- `DESIGN_DIRECTION_v0.1.md`: タイトル・ビジュアル方向
- `index.html`: Webプロトタイプ
- `styles.css`: Webプロトタイプの見た目
- `app.js`: 疑似歩数、報酬、ガチャ、グリッド内装配置の挙動
- `assets/cafe-room-isometric.png`: ChatGPT生成の箱庭風カフェ背景
- `assets/decor/red-sofa.png`: ChatGPT生成 + クロマキー透過の赤ソファ
- `assets/decor/round-table.png`: ChatGPT生成 + クロマキー透過の丸テーブル
- `assets/decor/pastry-counter.png`: ChatGPT生成 + クロマキー透過のショーケース
- `assets/decor/potted-plant.png`: ChatGPT生成 + クロマキー透過の植木
- `assets/staff/barista-mina.png`: ChatGPT生成 + クロマキー透過の店員キャラ
- `NEXT_CHAT_HANDOFF.md`: 作業引継ぎ
