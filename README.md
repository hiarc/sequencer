# sequencer

## 技術スタック

- Python 3.11.4
- FastAPI
- Mido 1.2.10
- Typescript 5.1.3
- React 18.2.0
- bootstrap 5.3.0
- axios 1.4.0
- npm 9.5.0
- webpack 5
- babel
  
## 環境構築

1. Python3xをインストールする
2. リポジトリをクローンする
3. ルートディレクトリで以下のコマンドを実行する

```shell
# 初回のみ：FastAPI、tringcase, Midoのインストール
pip3 install "fastapi[all]" stringcase mido

# 初回のみ：フロントエンドのライブラリインストール
npm install

# フロントエンドのソースビルド
npm run build

# 開発用：フロントエンドサーバーの起動（localhost:3000）
npm start

# アプリケーションサーバーの起動（localhost:8000）
cd /{ルートディレクトリ}/src/python
uvicorn main:app --reload
```
