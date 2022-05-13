# DiceBot
This is a dice bot for Descord.
## Description
  Discordでサイコロを振るためのBotです。

  Descordから入力を受け取るコントローラーと実際にサイコロを振るサービスで構成する。

---
  ### 入力仕様(自由入力)
  - 「?D?」形式であること(?は任意の数字)
  - Dは大文字、小文字を区別しない("D" でも"d"でも動く)
  - Dの前はサイコロを振る回数
  - Dの後ろはサイコロの面数
    - ex: 1D6 の場合6面ダイスを一回振る
    - ex2: 3D100 の場合100面ダイスを3回振る
  > サイコロは11回以上振れないこととする。
  
  ### 入力仕様(スラッシュコマンド)
  - 「/」を入力すると「/1d6」「/2d6」が表示される。
  - いずれかを選択し送信すると、コマンドに応じたダイスロール結果が返却される。
  - それぞれの実施結果は自由入力の1d6,2d6と等しいものである。

---
### 出力仕様
  - 出力方式は振った際のダイスを全部表示するようにする
    - ex: 3D100 の場合は以下のように出力予定
```
1回目 : 82
2回目 : 05
3回目 : 15
```

- 出力結果はメンションを送ったユーザーに対しリプライとする。

---

## 起動前提手順

### Windows版起動前準備

1. powershellを管理者として起動して以下を入力する。
    ```
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    ```
    
1. コマンドプロンプトを管理者として起動する。
1. 以下のコマンドを入力して、`git node.js yarn`を導入する。
    ```
    choco install -y git
    choco install -y yarn
    choco install -y nodejs
    ```
    1. 開発も行う場合は`choco install -y vscode`も実施する。
1. PCを再起動しコードを配置する任意のフォルダを作成する。
1. 作成したフォルダ内でコマンドプロンプトを起動する。
1. コマンドプロンプトで以下コードを入力しgit からコードをcloneする。
    ```
    git clone https://github.com/maruru2100/DiceBot.git
    ```
1. `cd DiceBot` をコマンドプロンプトで入力しディレクトリを変更する。
1. `yarn install` をコマンドプロンプトで入力する。

### Mac版起動準備

***TODO***  
windowsなら Chocolatey を入れさせて、nodeとyarnの最新をいれてもらえばいいかなとか思ってる。  
入れたら、このリポジトリを`git clone`してもらって、  
このリポジトリ内で`yarn install`してもらう感じかな。

## 起動前準備
1. botアカウントの作成
    1. 適当に調べてbotアカウントをあらかじめ作成、サーバーへの追加をしておくこと。
        > [参考サイト](https://qiita.com/yuto0214w/items/1ecee25efca6b5b7445b)
1. 各token情報の取得
    1. DISCORD_TOKEN
        1. https://discord.com/developers/applications にアクセス
        1. 追加したDiceBotのアカウントを押下
        1. 左にあるsettingsの「Bot」を押下
        1. TOKENのところの「COPY」を押下 して控える
    1. DICE_BOT_ID
        1. https://discord.com/developers/applications にアクセス
        1. 追加したDiceBotのアカウントを押下
        1. 左にあるsettingsの「General Infomation」を押下
        1. Application ID の「COPY」を押下して控える
    1. SERVER_ID
        1. DiscordにログインしてBotを入れたいサーバーを表示する。
        1. 画面左のサーバー一覧から、Botを入れたいサーバーを右クリックする。
        1. 一番下にある「IDをコピー」を押下して控える
1. 各token情報の設定
    1. 「2.各token情報の取得」で取得した情報を「.env」ファイルに書き込む。


## 起動方法
1. リポジトリ内でターミナル起動
2. `node index.js` で起動

## 停止方法
1. ターミナル内で`Ctrl + c` を押下

---

## テスト起動方法
1. リポジトリ内でターミナル起動
2. `node test.js` で起動

>10件のテスト実施。  
>最初3件は正常系。  
>後の7件は異常系でエラーメッセージが出てくること。

---
## MakeMemo

1. 入力値受け取り(String)
2. 入力値チェック
   1. フォーマットチェック
      1. 文字列チェック(d or D が1つだけ含まれているか？)
      2. 文字分割チェック(d or D で.splitした際にlengthが2か？)
         1. 1文字目チェック(存在するか？数字か？)
         2. 3文字目チェック(存在するか？数字か？)
   2. サイコロ振る
      1. for文で複数回サイコロをランダム関数を使用して算出
      2. 結果は配列形式でstackし、返却する(形式は出力仕様参照)