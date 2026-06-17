# StepCafeGacha 引継ぎ

## 現状

`D:\Codex\StepCafeGacha` で、歩数連動・放置カフェ経営・ガチャ収集育成ゲームとして仕様書 v0.1、デザイン方向 v0.1、Web確認用プロトタイプを作成済み。

現在のWebプロトタイプは、Webサイト風の説明画面ではなく、スマホゲームのメイン画面として見える構成に変更済み。カフェ店内は6列 x 7行のマス目で管理し、家具パレットから好きなマスへ内装アイテムを配置できる。

## 公開先

- GitHub: `https://github.com/ailiferyoya-gif/StepCafeGacha`
- GitHub Pages: `https://ailiferyoya-gif.github.io/StepCafeGacha/`

## 作成ファイル

- `D:\Codex\StepCafeGacha\SPEC_v0.1.md`
- `D:\Codex\StepCafeGacha\DESIGN_DIRECTION_v0.1.md`
- `D:\Codex\StepCafeGacha\README.md`
- `D:\Codex\StepCafeGacha\index.html`
- `D:\Codex\StepCafeGacha\styles.css`
- `D:\Codex\StepCafeGacha\app.js`
- `D:\Codex\StepCafeGacha\assets\cafe-hero.png`
- `D:\Codex\StepCafeGacha\assets\cafe-room-isometric.png`
- `D:\Codex\StepCafeGacha\assets\decor\red-sofa.png`
- `D:\Codex\StepCafeGacha\assets\decor\round-table.png`
- `D:\Codex\StepCafeGacha\assets\decor\pastry-counter.png`
- `D:\Codex\StepCafeGacha\assets\decor\potted-plant.png`
- `D:\Codex\StepCafeGacha\assets\staff\barista-mina.png`
- `D:\Codex\StepCafeGacha\tools\static-server.mjs`
- `D:\Codex\StepCafeGacha\web\index.html`
- `D:\Codex\StepCafeGacha\web\styles.css`
- `D:\Codex\StepCafeGacha\web\app.js`
- `D:\Codex\StepCafeGacha\web\assets\...`
- `D:\Codex\StepCafeGacha\NEXT_CHAT_HANDOFF.md`

## 作業前バックアップ記録

- `D:\Codex\backups\StepCafeGacha_before_spec_20260618_0001\NO_EXISTING_PROJECT.txt`
- `D:\Codex\backups\StepCafeGacha_before_design_direction_20260618_0002\SPEC_v0.1.md`
- `D:\Codex\backups\StepCafeGacha_before_design_direction_20260618_0002\NEXT_CHAT_HANDOFF.md`
- `D:\Codex\backups\StepCafeGacha_before_web_preview_20260618_0003\SPEC_v0.1.md`
- `D:\Codex\backups\StepCafeGacha_before_web_preview_20260618_0003\DESIGN_DIRECTION_v0.1.md`
- `D:\Codex\backups\StepCafeGacha_before_web_preview_20260618_0003\NEXT_CHAT_HANDOFF.md`
- `D:\Codex\backups\StepCafeGacha_before_publish_handoff_20260618_0004\NEXT_CHAT_HANDOFF.md`
- `D:\Codex\backups\StepCafeGacha_before_grid_game_screen_20260618_0007\index.html`
- `D:\Codex\backups\StepCafeGacha_before_grid_game_screen_20260618_0007\styles.css`
- `D:\Codex\backups\StepCafeGacha_before_grid_game_screen_20260618_0007\app.js`
- `D:\Codex\backups\StepCafeGacha_before_grid_game_screen_20260618_0007\README.md`
- `D:\Codex\backups\StepCafeGacha_before_grid_game_screen_20260618_0007\NEXT_CHAT_HANDOFF.md`

## 決定済み

- テーマは小さな現代カフェ経営。
- ゲーム方向は「歩数連動 × 放置カフェ経営 × キャラ/レシピ/設備ガチャ」。
- MVPではリアルマネー課金なし。
- ガチャは歩数報酬とゲーム内報酬で回す無料ガチャ。
- ミニゲーム操作は入れず、編成・育成・放置営業結果でゲーム性を出す。
- アプリ表示名の第一候補は `Walk Cafe Days`。
- ビジュアル方向は「かわいい現代カフェ + 少しだけファンタジー感」。
- 画像素材はChatGPT生成。
- キャラクター画像は背景透過PNG。
- スプライトシートは禁止。
- iOSはSwiftUI、歩数取得はHealthKit優先。

## 2026-06-18 グリッド内装編集アップデート

追加内容:

- Webサイト風の説明エリアを外し、スマホゲーム画面風のHUD、リソースバー、下部ナビへ変更。
- 店内画面を6列 x 7行の配置グリッドとして実装。
- 家具パレットから以下を選択し、好きなマスへ配置可能にした。
  - ソファ: `assets/decor/red-sofa.png`
  - 丸テーブル: `assets/decor/round-table.png`
  - ショーケース: `assets/decor/pastry-counter.png`
  - 植木: `assets/decor/potted-plant.png`
  - 店員ミナ: `assets/staff/barista-mina.png`
- 配置時に範囲外、他アイテムとの重なり、配置上限をチェック。
- 撤去モード、全撤去、おまかせ配置を追加。
- 配置数、満足度、内装効果、予測売上を配置内容から更新。
- `web/` 配下にも同じ変更を反映。

確認済み:

- `app.js` 構文チェックOK。
- 日本語ラベルの文字化けチェックOK。
- ローカルURLで背景、家具、店員画像の読み込み成功。
- ローカルURLで丸テーブル選択、空きマス配置、全撤去の操作成功。
- ローカルURLでモバイル幅390pxの横はみ出しなし。

## 未完了

- iOSプロジェクト作成。
- SwiftUI実装。
- HealthKit実装。
- 店員キャラをミナ以外にも個別生成。
- 家具ごとの所持数、購入コスト、レベル、回転の実装。
- 配置データの永続保存。
- ガチャ演出強化。
- バランス調整。

## 次にやること

1. Webプロトタイプのグリッド配置をSwiftUIへ移植する。
2. 配置データを保存できるようにする。
3. 家具に所持数、レベル、購入導線を追加する。
4. HealthKit連携前に疑似歩数でゲームループを固める。
5. ChatGPT生成のキャラクター透過PNGを増やす。
