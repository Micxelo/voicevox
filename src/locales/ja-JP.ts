export default {
  "dialog": {
    "fileNameTemplateDialog": {
      "title": "書き出しファイル名パターン",
      "description": "「$キャラ$」のようなタグを使って書き出すファイル名をカスタマイズできます。",
      "inputLabel": "ファイル名パターン",
      "resetButton": "デフォルトにリセット",
      "previewLabel": "出力例：",
      "cancelButton": "キャンセル",
      "submitButton": "確定",
      "empty": "何か入力してください",
      "invalidCharacters": "使用できない文字が含まれています：「{char}」",
      "invalidTag": "不正なタグが存在するか、$が単体で含まれています",
      "missingIndexTag": "{indexTag}は必須です"
    },

    "settingDialog": {
      "title": "設定 / オプション",
      "close": "設定を閉じる",

      "engine": {
        "title": "エンジン",
        "mode": "エンジンモード",
        "gpuModeUnsupported": "{engineName}はCPU版のためGPUモードを利用できません。",
        "modeDescription": "GPU モードの利用には GPU が必要です。Linux は NVIDIA™ 製 GPU のみ対応しています。",
        "samplingRate": "音声のサンプリングレート",
        "samplingRateDescription": "再生・保存時の音声のサンプリングレートを変更できます（サンプリングレートを上げても音声の品質は上がりません）。",
        "samplingRateDefault": "デフォルト",
        "samplingRateConfirmTitle": "出力サンプリングレートを変更しますか？",
        "samplingRateConfirmMessage": "出力サンプリングレートを変更しても、音質は変化しません。また、音声の生成処理に若干時間がかかる場合があります。",
        "samplingRateConfirmAction": "変更する"
      },

      "operation": {
        "title": "操作",
        "preset": "プリセット機能",
        "presetDescription": "ONの場合、プリセット機能を有効にします。パラメータを登録したり適用したりできます。",
        "applyDefaultPreset": "スタイル変更時にデフォルトプリセットを適用",
        "applyDefaultPresetDescription": "ONの場合、キャラやスタイルの変更時にデフォルトプリセットが自動的に適用されます。",
        "inheritParams": "パラメータの引き継ぎ",
        "inheritParamsDescription": "ONの場合、テキスト欄追加の際に、現在の話速等のパラメータが引き継がれます。",
        "scrollMode": "再生位置を追従",
        "scrollModeDescription": "音声再生中の、詳細調整欄の自動スクロールのモードを選べます。",
        "scrollModeOptions": {
          "continuous": "連続",
          "continuousDescription": "現在の再生位置を真ん中に表示します。",
          "page": "ページめくり",
          "pageDescription": "現在の再生位置が表示範囲外にある場合にスクロールします。",
          "none": "オフ",
          "noneDescription": "自動でスクロールしません。"
        },
        "textSplit": "テキスト自動分割",
        "textSplitDescription": "テキスト貼り付けの際のテキストの分割箇所を選べます。",
        "textSplitOptions": {
          "periodNewline": "句点と改行",
          "periodNewlineDescription": "句点と改行を基にテキストを分割します。",
          "newline": "改行",
          "newlineDescription": "改行のみを基にテキストを分割します。",
          "none": "オフ",
          "noneDescription": "分割を行いません。"
        },
        "memo": "メモ機能",
        "memoDescription": "ONの場合、テキストを [] で囲むことで、テキスト中にメモを書けます。",
        "ruby": "ルビ機能",
        "rubyDescription": "ONの場合、テキストに {leftBrace}ルビ対象{bar}よみかた{rightBrace} と書くことで、テキストの読み方を変えられます。",
        "resetHints": "非表示にしたヒントを全て再表示",
        "resetHintsDescription": "過去に非表示にしたヒントを全て再表示できます。",
        "resetHintsButton": "再表示する",
        "multiSelect": "複数選択",
        "multiSelectDescription": "ONの場合、複数のテキスト欄を選択できるようにします。"
      },

      "saving": {
        "title": "保存",
        "fixedExport": "書き出し先を固定",
        "fixedExportDescription": "ONの場合、書き出す際のフォルダをあらかじめ指定できます。",
        "fixedExportDir": "書き出し先のフォルダ",
        "fixedExportButton": "フォルダ選択",
        "talkFileNamePattern": "トーク：書き出しファイル名パターン",
        "talkFileNamePatternDescription": "書き出す際のファイル名のパターンをカスタマイズできます。",
        "avoidOverwrite": "上書き防止",
        "avoidOverwriteDescription": "ONの場合、書き出す際に同名ファイルが既にあったとき、ファイル名に連番を付けて別名で保存されます。",
        "encoding": "文字コード",
        "encodingDescription": "テキストファイルを書き出す際の文字コードを選べます。",
        "exportTxt": "txtファイルを書き出し",
        "exportTxtDescription": "ONの場合、音声書き出しの際にテキストがtxtファイルとして書き出されます。",
        "exportLab": "labファイルを書き出し",
        "exportLabDescription": "ONの場合、音声書き出しの際にリップシンク用のlabファイルが書き出されます。",
        "songTrackFileNamePattern": "ソング：トラックファイル名パターン",
        "songTrackFileNamePatternDescription": "書き出す際のファイル名のパターンをカスタマイズできます。",
        "selectExportFolderTitle": "書き出し先のフォルダを選択"
      },

      "theme": {
        "title": "外観",
        "language": "言語",
        "languageDescription": "エディタの言語を選べます。",
        "theme": "テーマ",
        "themeDescription": "エディタの色を選べます。",
        "font": "フォント",
        "fontDescription": "エディタのフォントを選べます。",
        "fontOptions": {
          "default": "デフォルト",
          "os": "OS標準"
        },
        "showLineNumber": "行番号の表示",
        "showLineNumberDescription": "ONの場合、テキスト欄の左側に行番号が表示されます。",
        "showAudioLength": "音声の長さの表示",
        "showAudioLengthDescription": "ONの場合、テキスト欄の右側に音声の長さが表示されます。",
        "showAddButton": "テキスト追加ボタンの表示",
        "showAddButtonDescription": "OFFの場合、右下にテキスト追加ボタンが表示されません。（テキスト欄は Shift + Enter で追加できます）"
      },

      "advanced": {
        "title": "高度な設定",
        "multiEngine": "マルチエンジン機能",
        "multiEngineDescription": "ONの場合、複数のVOICEVOX準拠エンジンを利用可能にします。",
        "stereo": "音声をステレオ化",
        "stereoDescription": "ONの場合、音声データがモノラルからステレオに変換されてから再生・保存が行われます。",
        "audioDeviceUnsupported": "この機能はお使いの環境でサポートされていないため、使用できません。",
        "audioDevice": "再生デバイス",
        "audioDeviceDescription": "音声の再生デバイスを変更できます。",
        "katakanaEnglish": "未知の英単語をカタカナ読みに変換",
        "katakanaEnglishDescription": "ONの場合、エンジンが対応している場合は、未知の英単語をカタカナ読みに変換します。",
        "katakanaEnglishNoEngine": "この機能を利用できるエンジンがありません。",
        "katakanaEnglishSomeEngine": "一部のエンジンではこの機能を利用できません。",
        "defaultLyric": "ソング：デフォルト歌詞",
        "defaultLyricDescription": "歌詞が未設定の音符に対してデフォルトで設定される歌詞を設定できます。",
        "defaultLyricOptions": {
          "doremi": "ドレミ（階名）",
          "la": "ら（固定）"
        },
        "undoTrackOperation": "ソング：元に戻すトラック操作",
        "undoTrackOperationDescription": "「元に戻す」機能の対象とするトラック操作を指定します。",
        "undoTrackOperationOptions": {
          "soloMute": "ミュート・ソロ",
          "panGain": "パン・音量"
        }
      },

      "experimental": {
        "title": "実験的機能",
        "interrogative": "疑問文を自動調整",
        "interrogativeDescription": "ONの場合、疑問文の語尾の音高が自動的に上げられます。",
        "morphing": "モーフィング機能",
        "morphingDescription": "ONの場合、モーフィング機能を有効にします。2つの音声混ぜられるようになります。",
        "keepTuning": "[開発時のみ機能] 調整結果の保持",
        "keepTuningDescription": "ONの場合、テキスト変更時、同じ読みのアクセント区間内の調整結果を保持します。",
        "showParameterPanel": "[開発時のみ機能] ソング：パラメーターパネルの表示",
        "showParameterPanelDescription": "ONの場合、ソングエディタでパラメーターパネルが表示されます。"
      },

      "telemetry": {
        "title": "データ収集",
        "allow": "ソフトウェア利用状況のデータ収集を許可",
        "allowDescription": "ONの場合、各UIの利用率などのデータが送信され、VOICEVOXの改善に役立てられます。テキストデータや音声データは送信されません。",
        "telemetryDisableTitle": "ソフトウェア利用状況のデータ収集の無効化",
        "telemetryDisableMessage": "ソフトウェア利用状況のデータ収集を完全に無効にするには、VOICEVOXを再起動する必要があります",
        "telemetryDisableOk": "OK"
      }
    }
  },

  menu: {
    menuBar: {
      menuBar: {
        file: 'ファイル',
        edit: '編集',
        view: '表示',
        engine: 'エンジン',
        setting: '設定',
        help: 'ヘルプ',
      },

      minMaxCloseButtons: {
        minimize: '最小化',
        maximize: '最大化',
        close: '閉じる',
      },

      titleBarButtons: {
        unpinToTop: '最前面固定を解除',
        pinToTop: '最前面に固定',
      },

      titleBarEditorSwitcher: {
        talk: 'トーク',
        song: 'ソング',
      },
      
      useCommonMenuBarData: {
        file: {
          noRecentProjects: '最近使ったプロジェクトはありません',
          newProject: '新規プロジェクト',
          saveProject: 'プロジェクトを上書き保存',
          saveProjectAs: 'プロジェクトを名前を付けて保存',
          saveProjectCopy: 'プロジェクトの複製を保存',
          importProject: 'プロジェクトを読み込む',
          recentProjects: '最近使ったプロジェクト',
        },

        edit: {
          undo: '元に戻す',
          redo: 'やり直す',
          selectAll: 'すべて選択',
        },

        view: {
          fullScreen: '全画面表示を切り替え',
          zoomIn: '拡大',
          zoomOut: '縮小',
          zoomReset: '拡大率のリセット',
        },
        
        settings: {
          hotkeySetting: 'キー割り当て',
          toolbarSetting: 'ツールバーのカスタマイズ',
          characterList: 'キャラクター＆スタイルの管理',
          characterOrder: 'キャラクター並び替え・試聴',
          defaultStyle: 'デフォルトスタイル',
          dictionaryManage: '読み方＆アクセント辞書',
          setting: 'オプション',
        },
      },
    },
  },

  "sing": {
    "menuBarData": {
      "exportAudio": "音声書き出し",
      "exportLabFile": "labファイルを書き出し",
      "importProject": "プロジェクトをインポート",
      "exportProject": "プロジェクトをエクスポート",
      "copy": "コピー",
      "cut": "切り取り",
      "paste": "貼り付け",
      "selectAll": "すべて選択",
      "deselectAll": "選択解除",
      "quantize": "クオンタイズ",
      "showPortrait": "立ち絵を表示",
      "hidePortrait": "立ち絵を非表示"
    }
  },

  talk: {
    menuBarData: {
      exportAudio: '音声書き出し',
      exportSelectedAudio: '選択音声を書き出し',
      connectAndExportAudio: '音声を繋げて書き出し',
      connectAndExportText: 'テキストを繋げて書き出し',
      importText: 'テキスト読み込み',
      hideLineNumber: '行番号を非表示',
      showLineNumber: '行番号を表示',
    },
  },
};