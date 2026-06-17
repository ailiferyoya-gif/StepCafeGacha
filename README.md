# Walk Cafe Days / StepCafeGacha

歩数連動、放置カフェ経営、キャラ・レシピ・設備ガチャを組み合わせたiOSゲーム企画のWeb確認用プロトタイプです。

## Web確認

依存なしの静的サイトです。

```powershell
cd D:\Codex\StepCafeGacha
python -m http.server 4178
```

ブラウザで `http://localhost:4178` を開きます。

GitHub Pagesではリポジトリルートを公開対象にすれば `index.html` が表示されます。

## 主要ファイル

- `SPEC_v0.1.md`: ゲーム仕様
- `DESIGN_DIRECTION_v0.1.md`: タイトル・ビジュアル方向
- `index.html`: Webプロトタイプ
- `styles.css`: Webプロトタイプの見た目
- `app.js`: 疑似歩数、報酬、ガチャ、編成、強化の挙動
- `assets/cafe-hero.png`: ChatGPT生成のカフェ背景
- `NEXT_CHAT_HANDOFF.md`: 作業引継ぎ
