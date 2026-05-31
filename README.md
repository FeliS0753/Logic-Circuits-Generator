# Logic-Circuits-Generator
論理式から論理回路図を生成をするWebアプリケーションです。

モバイルアクセスはサポートしておりません。

[デモはこちら](https://logic-circuits-generator.vercel.app/)

## 目次
<details>
  <summary>クリックで開く</summary>
  
- [使用例](#使用例)
- [サイトイメージ](#サイトイメージ)
- [主な機能](#主な機能)
- [使用技術](#使用技術)
- [今後の展望](#今後の展望)
- [環境構築手順](#環境構築手順)
</details>


## 使用例

**画面上の操作で回路図を生成する様子です。**

<img width="760.8" height="399.2" alt="demo1" src="https://github.com/user-attachments/assets/e1f13144-a4d8-4947-be22-dc88617bdf7c" />


---

**キーボード上の操作で回路図を生成し、ダウンロードする様子です。**

<img width="768" height="311.2" alt="demo2" src="https://github.com/user-attachments/assets/368652b7-4514-4bc3-94d4-9e5c8c7c127c" />



## サイトイメージ

### メイン画面
<img width="480" height="300" alt="スクリーンショット 2026-05-31 222026" src="https://github.com/user-attachments/assets/a24a5600-a78a-4684-9be4-282520685c95" />

**この画面で論理式の入力と回路図の生成を行います。**

### 使い方
<img width="479.75" height="277.75" alt="image" src="https://github.com/user-attachments/assets/8386e98c-af4c-4255-9639-392875d56522" />


**このアプリケーションの使い方を簡潔に説明しています。**

### サンプル
<img width="443.9" height="366.5" alt="スクリーンショット 2026-05-03 120033" src="https://github.com/user-attachments/assets/1e1964fe-ef27-4d73-8b57-3038430e035e" />

**出力例のサンプルをいくつか載せています.**


## 主な機能
- **1.** 画面上での入力、キーボードからの入力の両方ができ、ユーザーに使いやすさを提供します。
- **2.** 不正な入力に対しエラーを即座に表示し、ユーザーの入力をサポートします。
- **3.** 生成した回路図をPNG画像としてダウンロードできます。


## 使用技術
### フレームワーク / ビルドツール
- React: v19.2.4
- Vite(build.minify terser v5.48.0): v8.0.4

### ライブラリ / API
- MathLive: v0.109.1
- KaTeX: v0.16.47
- canvas API

## 今後の展望
- [ ] 複数出力がある論理回路にも対応できる処理の実装
- [ ] 論理変数や接点の有無など、回路に対するオプションの追加
- [ ] 回路の描画処理、配置処理の効率化

## 環境構築手順
ローカル環境で動作させる場合は、以下の手順に従ってください。

```bash
# リポジトリをクローン
git clone https://github.com/FeliS0753/Logic-Circuits-Generator

# ディレクトリに移動
cd Logic-Circuits-Generator

# パッケージのインストール
npm install

# 環境変数の設定
cp .env.example .env
# ※ .envの中身を適宜修正してください

# 起動
npm run dev
```
