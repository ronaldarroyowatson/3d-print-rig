# Documentation / ドキュメント案内

現在選べる機種・部品の組み合わせは、[公開対応表](https://psych0h3ad.github.io/3d-print-rig/support/?lang=ja)を参照してください。
対応表は公開ビュワーと同じカタログ・合成ルールから生成します。
個別のMDは操作、取付条件、出典、検証範囲を説明します。
リリース番号や検証時点を記した件数は、その時点の記録です。

## 利用方法と現在の対応範囲

| 目的 | 資料 |
| --- | --- |
| 対応済み／未対応、機体組込と単体表示、構成数の数え方 | [Combination support](COMBINATION_SUPPORT.md) |
| 構成を選ぶ・適用する・戻す、スマホの設定パネル | [Viewer workspace](UI_WORKSPACE.md) |
| 機種切替、戻る／進む、テーマ・言語の保持 | [Workspace navigation](WORKSPACE_NAVIGATION.md) |
| 自分のサイトへの埋め込みと自動更新の範囲 | [Embedding](EMBEDDING.md) |
| 壁紙、分解図・断面図・複数配置の追加 | [Wallpapers](WALLPAPERS.md) |
| ビュワー背景のCAD線画 | [CAD background](CAD_BACKGROUND.md) |

## 機体・取付・部品ごとの条件

| 対象 | 資料 |
| --- | --- |
| V0.2 / V0.2r1の装着Modと依存条件 | [V0 installations](V0_INSTALLATIONS.md) |
| Tridentのサイズ別CAD・V2.4の配色、導入時の検証記録 | [Trident sizes / V2.4 colors](TRIDENT_SIZE_COLOR_QA.md) |
| Monolithの機体組込、固定／交換式、ベルトと移動範囲 | [Monolith in complete printers](MONOLITH_MACHINE.md) |
| StealthChanger単独ヘッドの取付と、複数ドックの別条件 | [Mounts](STEALTHCHANGER_MOUNTS.md) · [Changer banks](CHANGER_BANK.md) |
| INDXのSmart Head・パッシブツール、機種別制限 | [INDX](INDX.md) |
| FilamATrixカッターとMadMax取付・未登録ドック | [FilamATrix / MadMax](CUTTERS_MADMAX.md) |
| Sphinx tLW・旧世代、ホットエンド・プローブ | [Sphinx assemblies](SPHINX_ASSEMBLIES.md) · [Goliath](GOLIATH.md) |
| Stealthburnerの部品・プローブ構成 | [Stealthburner combinations](SB_PROBE_COMBINATIONS.md) |
| A4T・Archetype、Yavoth、Rapido X | [Armchair](ARMCHAIR.md) · [Yavoth](YAVOTH.md) · [Rapido X](RAPIDO_X.md) |
| Micron / Micron Plus、Rat Rig元CAD | [Micron](MICRON.md) · [Rat Rig](RATRIG.md) |
| DoomCube 2の350 mm原本・フレーム・静止表示 | [DoomCube 2](DOOMCUBE.md) |
| HYDRAの交換プレート・ダクト原本と組付けの検証範囲 | [HYDRA](HYDRA.md) |
| Trinity Crossbowの原本ハードウェア組立と検証範囲 | [Trinity Crossbow](TRINITY_CROSSBOW.md) |
| Tridentスカート、VORON背面パネル・排気ユニット | [Stealth Skirts](STEALTH_SKIRTS.md) · [Rear enclosures](REAR_ENCLOSURES.md) |

専用MDのない機体も対応表とビュワーの出典・注意事項を参照できます。
共通ツールヘッド一覧に存在することだけを、各機体への装着対応とは扱いません。

## 検証と更新

| 目的 | 資料 |
| --- | --- |
| 機種・部品・組み合わせ追加時に更新する場所と手順 | [Maintenance](MAINTENANCE.md) |
| 全機種の必須レビュー項目と証拠の扱い | [Machine review](MACHINE_REVIEW.md) · [Coverage record](MACHINE_REVIEW_COVERAGE.json) |
| ベルト・チェーン・可動部の実装と確認範囲 | [Motion audit](MOTION_AUDIT.md) |
| TicTac、THE 100、Rook、Satsuma、SV08、Annex、FYSETCのXYZ操作 | [Native assembly motion](NATIVE_MOTION.md) |
| プローブ選択時の警告、限定された連続移動検証 | [Probe clearance](PROBE_CLEARANCE.md) · [Probe travel](PROBE_TRAVEL.md) |
| ヘッド／駐機ツールの干渉例と表示条件 | [Head travel](HEAD_TRAVEL.md) |
| 選択バグの過去の修正・v18/v19検証記録 | [Selection audit — historical](SELECTION_AUDIT.md) |
| 5言語の文言更新と翻訳チェック | [Translating](TRANSLATING.md) |
| 原作者・ライセンス・原本と表示モデルの差 | [Third-party notices](THIRD_PARTY_NOTICES.md) |

## フォーク運用と将来設計（Owner fork planning）

| 目的 | 資料 |
| --- | --- |
| ライセンス、帰属、所有戦略 | [Licensing and ownership](licensing-and-ownership.md) |
| ベースライン保存と構成の現状分析 | [Baseline analysis](baseline-analysis.md) |
| 実装アーキテクチャの逆解析 | [Architecture review](architecture-review.md) |
| 技術的負債の優先度評価 | [Technical debt report](technical-debt-report.md) |
| 長期運用向けの目標構成 | [Target architecture](target-architecture.md) |
| 段階移行の実行計画 | [Migration roadmap](migration-roadmap.md) |
| コア改変なしで拡張する構成案 | [Custom extension system](custom-extension-system.md) |
| 追加予定部品のギャップ分析 | [Missing components](missing-components.md) |
| 拡張レイヤー向けの検証フロー | [Validation system](validation-system.md) |
| 部品選択・表示制御計画 | [Part roadmap](PART_INTERACTION_ROADMAP.md) |
| 現在実装の棚卸し（構造・運用・検証） | [Current state analysis](current-state-analysis.md) |
| Copilot標準への準拠監査（スコアカード） | [Copilot compliance report](copilot-compliance-report.md) |
| 優先度付きリファクタ計画 | [Refactor backlog](refactor-backlog.md) |
| 主要設計判断の記録 | [ADR index](adr/README.md) |

[プロジェクトREADMEに戻る](../README.md)

- [SOVOL SV08](SOVOL.md): complete native CAD reference, XYZ motion,
  source scope and display controls.
