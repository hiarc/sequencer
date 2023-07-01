# sequencer

## 技術スタック

- Python 3.11.4
- FastAPI
- MySQL 8.0
- SQLAlchemy 2.0.17
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
# FastAPI、SQLAlchemy, stringcase, Midoのインストール
pip3 install "fastapi[all]" stringcase sqlalchemy mido

# DBサーバーの起動（localhost:33306）
docker compose up -d db

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
