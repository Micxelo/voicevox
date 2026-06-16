import { language } from "@vue/eslint-config-prettier";

export default {
  dialog: {
    fileNameTemplateDialog: {
      title: "导出文件名格式",
      description: "使用「角色」等标签自定义导出的文件名。",
      inputLabel: "文件名格式",
      resetButton: "重置为默认值",
      previewLabel: "输出示例：",
      cancelButton: "取消",
      submitButton: "确定",
      empty: "请输入文本",
      invalidCharacters: "包含无法使用的字符：「{char}」",
      invalidTag: "存在不合法的标签或 $ 单独存在",
      missingIndexTag: "{indexTag} 是必需的",
    },

    settingDialog: {
      title: "设置/选项",
      close: "关闭设置",

      engine: {
        title: "引擎",
        mode: "引擎模式",
        gpuModeUnsupported: "{engineName} 是 CPU 版本，因此无法使用 GPU 模式。",
        modeDescription: "使用 GPU 模式需要 GPU 。 Linux 仅支持 NVIDIA™ GPU 。",
        samplingRate: "音频采样率",
        samplingRateDescription: "更改播放和保存时的音频采样率。（提高采样率不会提高音频质量）",
        samplingRateDefault: "默认",
        samplingRateConfirmTitle: "是否更改输出采样率？",
        samplingRateConfirmMessage: "更改输出采样率不会改变音质，并且音频生成处理可能会稍微耗时。",
        samplingRateConfirmAction: "更改",
      },

      operation: {
        title: "操作",
        preset: "预设功能",
        presetDescription: "启用时，启用预设功能。可以注册和应用参数。",
        applyDefaultPreset: "风格变更时自动应用默认预设",
        applyDefaultPresetDescription: "启用时，在角色或风格变更时自动应用默认预设。",
        inheritParams: "继承参数",
        inheritParamsDescription: "启用时，在添加文本栏时，会继承当前的语速等参数。",
        scrollMode: "跟踪播放位置",
        scrollModeDescription: "音频播放时详细调整栏的自动滚动模式。",
        scrollModeOptions: {
          continuous: "连续",
          continuousDescription: "将当前播放位置显示在中间。",
          page: "翻页",
          pageDescription: "当前播放位置超出显示范围时滚动。",
          none: "关闭",
          noneDescription: "不自动滚动。",
        },
        textSplit: "文本自动分割",
        textSplitDescription: "选择粘贴文本时的文本分割位置。",
        textSplitOptions: {
          periodNewline: "句号和换行",
          periodNewlineDescription: "基于句号和换行分割文本。",
          newline: "换行",
          newlineDescription: "基于换行分割文本。",
          none: "关闭",
          noneDescription: "不进行分割。",
        },
        memo: "备注功能",
        memoDescription: "启用时，可以用 [] 将文本包围，在文本中写入备注。",
        ruby: "注音功能",
        rubyDescription: "启用时，可以用 {leftBrace}注音对象{bar}读法{rightBrace} 来改变文本的读法。",
        resetHints: "重置提示",
        resetHintsDescription: "重新显示过去隐藏的所有提示。",
        resetHintsButton: "重新显示",
        multiSelect: "多选",
        multiSelectDescription: "启用时，可以同时选择多个文本栏。",
      },

      saving: {
        title: "保存",
        fixedExport: "固定导出文件夹",
        fixedExportDescription: "启用时，可以预先指定导出时的文件夹。",
        fixedExportDir: "导出文件夹",
        fixedExportButton: "选择文件夹",
        talkFileNamePattern: "对话模式导出文件名格式",
        talkFileNamePatternDescription: "自定义在对话模式下导出时使用的文件名格式。",
        avoidOverwrite: "防止覆盖",
        avoidOverwriteDescription: "启用时，如果导出时已存在同名文件，则在文件名后添加序号另存。",
        encoding: "字符编码",
        encodingDescription: "选择导出文本文件时使用的字符编码。",
        exportTxt: "导出 TXT 文件",
        exportTxtDescription: "启用时，导出音频时会同时将文本导出为 TXT 文件。",
        exportLab: "导出 LAB 文件",
        exportLabDescription: "启用时，导出音频时会同时导出用于唇形同步的 LAB 文件。",
        songTrackFileNamePattern: "歌唱模式导出轨道文件名格式",
        songTrackFileNamePatternDescription: "自定义在歌唱模式下导出轨道时使用的文件名格式。",
        selectExportFolderTitle: "选择文件夹",
      },

      theme: {
        title: "外观",
        language: "语言",
        languageDescription: "选择编辑器使用的语言。",
        theme: "主题",
        themeDescription: "选择编辑器的颜色。",
        font: "字体",
        fontDescription: "选择编辑器使用的字体。",
        fontOptions: {
          default: "默认",
          os: "系统",
        },
        showLineNumber: "显示行号",
        showLineNumberDescription: "启用时，文本栏左侧会显示行号。",
        showAudioLength: "显示音频时长",
        showAudioLengthDescription: "启用时，文本栏右侧会显示音频的时长。",
        showAddButton: "显示添加文本按钮",
        showAddButtonDescription: "禁用时，右下角不显示添加文本按钮。（可以使用 Shift+Enter 添加文本栏）",
      },

      advanced: {
        title: "高级设置",
        multiEngine: "多引擎功能",
        multiEngineDescription: "启用时，可以使用多个兼容 VOICEVOX 的引擎。",
        stereo: "将音频转为立体声",
        stereoDescription: "启用时，音频数据会在播放和保存前从单声道转换为立体声。",
        audioDeviceUnsupported: "此功能在您的环境中不受支持，因此无法使用。",
        audioDevice: "音频输出设备",
        audioDeviceDescription: "更改音频播放设备。",
        katakanaEnglish: "将未知英文单词转换为片假名读音",
        katakanaEnglishDescription: "启用时，如果引擎支持，会将未知英文单词转换为片假名读音。",
        katakanaEnglishNoEngine: "没有引擎可使用此功能。",
        katakanaEnglishSomeEngine: "部分引擎无法使用此功能。",
        defaultLyric: "歌唱模式默认歌词",
        defaultLyricDescription: "设置未设置歌词的音符的默认歌词。",
        defaultLyricOptions: {
          doremi: "唱名（Do-Re-Mi）",
          la: "La （固定）",
        },
        undoTrackOperation: "歌唱模式撤销轨道操作",
        undoTrackOperationDescription: "指定“撤销”功能的目标轨道操作。",
        undoTrackOperationOptions: {
          soloMute: "静音・独奏",
          panGain: "声像・音量",
        },
      },

      experimental: {
        title: "实验性功能",
        interrogative: "自动调整疑问句",
        interrogativeDescription: "启用时，疑问句句尾的音调会自动提高。",
        morphing: "变形功能",
        morphingDescription: "启用时，可以混合两种声音。",
        keepTuning: "[仅开发时功能] 保留调整结果",
        keepTuningDescription: "启用时，在文本变更时，保持相同读音的重音区间内的调整结果。",
        showParameterPanel: "[仅开发时功能] 歌唱模式显示参数面板",
        showParameterPanelDescription: "启用时，在歌唱编辑器中会显示参数面板。",
      },

      telemetry: {
        title: "数据收集",
        allow: "允许收集软件使用状况数据",
        allowDescription: "启用时，会发送各 UI 的使用率等数据以用于改善 VOICEVOX。不会发送文本数据和音频数据。",
        telemetryDisableTitle: "禁用软件使用状况数据收集",
        telemetryDisableMessage: "要完全禁用软件使用状况数据收集，需要重启 VOICEVOX。",
        telemetryDisableOk: "确定",
      }
    }
  },

  menu: {
    menuBar: {
      menuBar: {
        file: "文件",
        edit: "编辑",
        view: "视图",
        engine: "引擎",
        setting: "设置",
        help: "帮助",
      },

      minMaxCloseButtons: {
        minimize: "最小化",
        maximize: "最大化",
        close: "关闭",
      },

      titleBarButtons: {
        unpinToTop: "取消置顶",
        pinToTop: "置顶",
      },

      titleBarEditorSwitcher: {
        talk: "对话",
        song: "歌唱",
      },

      useCommonMenuBarData: {
        file: {
          noRecentProjects: "没有最近的项目",
          newProject: "新建项目",
          saveProject: "保存项目",
          saveProjectAs: "另存项目",
          saveProjectCopy: "保存项目副本",
          importProject: "导入项目",
          recentProjects: "最近的项目",
        },

        edit: {
          undo: "撤销",
          redo: "重做",
          selectAll: "全选",
        },

        view: {
          fullScreen: "全屏",
          zoomIn: "放大",
          zoomOut: "缩小",
          zoomReset: "重置缩放",
        },

        settings: {
          hotkeySetting: "快捷键设置",
          toolbarSetting: "自定义工具栏",
          characterList: "角色与风格管理",
          characterOrder: "角色排序・试听",
          defaultStyle: "默认风格",
          dictionaryManage: "读音与重音词典",
          setting: "选项",
        }
      }
    }
  },

  sing: {
    menuBarData: {
      exportAudio: "导出音频",
      exportLabFile: "导出 LAB 文件",
      importProject: "导入项目",
      exportProject: "导出项目",

      copy: "复制",
      cut: "剪切",
      paste: "粘贴",
      selectAll: "全选",
      deselectAll: "取消全选",
      quantize: "量化",

      showPortrait: "显示角色立绘",
      hidePortrait: "隐藏角色立绘",
    },
  },

  talk: {
    menuBarData: {
      exportAudio: "导出音频",
      exportSelectedAudio: "导出选定的音频",
      connectAndExportAudio: "拼接并导出音频",
      connectAndExportText: "拼接并导出文本",
      importText: "导入文本",
      showLineNumber: "显示行号",
      hideLineNumber: "隐藏行号",
    },
  },
};