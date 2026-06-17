# StepCafeGacha 引継ぎ

## 現状

`D:\Codex\StepCafeGacha` を新規作成し、歩数連動・放置カフェ経営・ガチャ収集育成ゲームとして仕様書 v0.1、デザイン方向 v0.1、Web確認用プロトタイプを作成した。

GitHub公開とGitHub PagesでのWeb確認まで完了。

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
- `D:\Codex\StepCafeGacha\tools\static-server.mjs`
- `D:\Codex\StepCafeGacha\web\index.html`
- `D:\Codex\StepCafeGacha\web\styles.css`
- `D:\Codex\StepCafeGacha\web\app.js`
- `D:\Codex\StepCafeGacha\web\assets\cafe-hero.png`
- `D:\Codex\StepCafeGacha\NEXT_CHAT_HANDOFF.md`

## 作業前バックアップ記録

- `D:\Codex\backups\StepCafeGacha_before_spec_20260618_0001\NO_EXISTING_PROJECT.txt`
- `D:\Codex\backups\StepCafeGacha_before_design_direction_20260618_0002\SPEC_v0.1.md`
- `D:\Codex\backups\StepCafeGacha_before_design_direction_20260618_0002\NEXT_CHAT_HANDOFF.md`
- `D:\Codex\backups\StepCafeGacha_before_web_preview_20260618_0003\SPEC_v0.1.md`
- `D:\Codex\backups\StepCafeGacha_before_web_preview_20260618_0003\DESIGN_DIRECTION_v0.1.md`
- `D:\Codex\backups\StepCafeGacha_before_web_preview_20260618_0003\NEXT_CHAT_HANDOFF.md`
- `D:\Codex\backups\StepCafeGacha_before_publish_handoff_20260618_0004\NEXT_CHAT_HANDOFF.md`

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

## Web確認結果

ローカルURL: `http://127.0.0.1:4178/`
公開URL: `https://ailiferyoya-gif.github.io/StepCafeGacha/`

確認済み:

- HTTP 200で表示。
- `Walk Cafe Days` のタイトル表示。
- ChatGPT生成背景 `assets/cafe-hero.png` の読み込み成功。
- ホーム、歩数、ガチャ、編成、強化タブの表示。
- 歩数タブ切り替え成功。
- 疑似歩数 `+1,000歩` 操作成功。
- ガチャ `1回引く` 操作成功。
- デスクトップ幅でコンソールエラーなし。
- モバイル幅相当で横はみ出しなし。
- GitHub Pages上でも画像読み込みとガチャ操作成功。

## Git状態

- Repository: `ailiferyoya-gif/StepCafeGacha`
- Branch: `main`
- Initial commit: `483c7ea Add Walk Cafe Days web prototype`
- Publish handoff commit: 作成後にpushする

## 未完了

- iOSプロジェクト作成。
- SwiftUI実装。
- HealthKit実装。
- キャラクター画像生成。
- ガチャ演出設計。
- バランス調整。

## 次にやること

1. `D:\Codex\StepCafeGacha` 配下にSwiftUI iOSプロジェクトを作成する。
2. WebプロトタイプのゲームループをSwiftUIへ移植する。
3. 疑似歩数で先にゲームループを動かす。
4. HealthKit連携を追加する。
5. ChatGPT生成のキャラクター透過PNGを順次作成する。

## 2026-06-18 内装・店員画像アップデート

追加内容:

- 参照画像のような箱庭カフェ経営ゲーム寄りの画面へ改修。
- ChatGPT生成の新背景 `assets/cafe-room-isometric.png` を追加。
- ChatGPT生成 + クロマキー透過の内装アイテムを追加。
  - `assets/decor/red-sofa.png`
  - `assets/decor/pastry-counter.png`
- ChatGPT生成 + クロマキー透過の店員キャラを追加。
  - `assets/staff/barista-mina.png`
- ホーム画面で内装アイテムを個別に切り替え可能にした。
- 赤ソファ、ショーケースは表示/配置変更可能。
- 店員ミナは表示/非表示を切り替え可能。

確認済み:

- ローカルで背景、家具、店員画像の読み込み成功。
- 内装切替ボタンが動作。
- 店員表示切替が動作。
- `app.js` 構文チェックOK。
- モバイル幅相当で横はみ出しなし。

次にやると良いこと:

1. 店員キャラをミナ以外にも個別生成する。
2. テーブル、観葉植物、看板、厨房設備などの内装アイテムを追加生成する。
3. 内装アイテムにレベル・所持状態・購入コストを持たせる。
4. iOS/SwiftUI側へ同じ内装レイヤー構造を移植する。
