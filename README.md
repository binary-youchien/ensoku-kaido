# 遠足街道

## setup

### db setup0

1. copy config
    * ```bash
      cp application.sample.yml application.local.yml
      ```

### db setup1

dockerをインストールしたくない人は[db setup2](#db-setup2)を行ってください

1. install docker

### db setup2

dockerをインストールした人は飛ばしてください

1. install mongo db
2. rewrite application.local.yml
   * user
   * password
   * database_name

### ktor setup

1. install java

### node setup

1. install node
2. install deps
   * ```bash
     npm i
     ```
## run project

1. run database(if docker installed)
   * run `db` in run configuration
2. run `back` in run configuration
3. run `dev` in run configuration

## コーディング規約

### git

1. `develop`ブランチから新しいブランチをディレクトリごとに作成する
   * docディレクトリ
      * ドキュメントに関する追加
   * featureディレクトリ
      * 機能に関する追加
   * fixディレクトリ
      * 修正に関する追加
2. `PullRequest`を作成し、レビューを依頼する



