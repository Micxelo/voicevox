<template>
  <QDialog
    v-model="dialogOpened"
    maximized
    allowFocusOutside
    transitionShow="jump-up"
    transitionHide="jump-down"
    class="setting-dialog transparent-backdrop"
  >
    <QLayout container view="hHh Lpr fFf" class="bg-background">
      <QPageContainer class="root">
        <QHeader class="q-pa-sm">
          <QToolbar>
            <QToolbarTitle class="text-display"
              >{{ t("dialog.settingDialog.title") }}</QToolbarTitle
            >
            <QSpace />
            <!-- close button -->
            <QBtn
              round
              flat
              icon="close"
              color="display"
              :aria-label="t('dialog.settingDialog.close')"
              @click="dialogOpened = false"
            />
          </QToolbar>
        </QHeader>
        <QPage>
          <div class="container">
            <BaseScrollArea>
              <!-- Engine Mode Card -->
              <div class="setting-card">
                <div class="title-row">
                  <h5 class="headline">{{ t("dialog.settingDialog.engine.title") }}</h5>
                  <template v-if="engineIds.length > 1">
                    <BaseSelect v-model="selectedEngineId">
                      <BaseSelectItem
                        v-for="engineId in engineIds"
                        :key="engineId"
                        :value="engineId"
                        :label="renderEngineNameLabel(engineId)"
                      />
                    </BaseSelect>
                  </template>
                </div>
                <BaseTooltip
                  :label="
                    t('dialog.settingDialog.engine.gpuModeUnsupported', {
                      engineName: engineInfos[selectedEngineId].name,
                    })
                  "
                  :disabled="gpuSwitchEnabled(selectedEngineId)"
                >
                  <ButtonToggleCell
                    :title="t('dialog.settingDialog.engine.mode')"
                    :description="t('dialog.settingDialog.engine.modeDescription')"
                    :options="engineUseGpuOptions"
                    :disable="!gpuSwitchEnabled(selectedEngineId)"
                    :modelValue="selectedEngineUseGpu ? 'GPU' : 'CPU'"
                    @update:modelValue="
                      (mode) => (selectedEngineUseGpu = mode === 'GPU')
                    "
                  />
                </BaseTooltip>
                <SelectCell
                  :title="t('dialog.settingDialog.engine.samplingRate')"
                  :description="t('dialog.settingDialog.engine.samplingRateDescription')"
                  :modelValue="outputSamplingRate.toString()"
                  :options="
                    samplingRateOptions.map((option) => {
                      return {
                        value: option.toString(),
                        label: renderSamplingRateLabel(option),
                      };
                    })
                  "
                  @update:modelValue="
                    (value) =>
                      (outputSamplingRate = Number(value) || 'engineDefault')
                  "
                />
              </div>
              <!-- Preservation Setting -->
              <div class="setting-card">
                <h5 class="headline">{{ t("dialog.settingDialog.operation.title") }}</h5>
                <ToggleCell
                  :title="t('dialog.settingDialog.operation.preset')"
                  :description="t('dialog.settingDialog.operation.presetDescription')"
                  :modelValue="enablePreset"
                  @update:modelValue="changeEnablePreset"
                />
                <QSlideTransition>
                  <!-- q-slide-transitionはheightだけをアニメーションするのでdivで囲う -->
                  <div v-show="enablePreset" class="transition-container">
                    <ToggleCell
                      :title="t('dialog.settingDialog.operation.applyDefaultPreset')"
                      :description="t('dialog.settingDialog.operation.applyDefaultPresetDescription')"
                      class="in-slide-transition-workaround"
                      :modelValue="shouldApplyDefaultPresetOnVoiceChanged"
                      @update:modelValue="
                        changeShouldApplyDefaultPresetOnVoiceChanged($event)
                      "
                    />
                  </div>
                </QSlideTransition>
                <ToggleCell
                  :title="t('dialog.settingDialog.operation.inheritParams')"
                  :description="t('dialog.settingDialog.operation.inheritParamsDescription')"
                  :modelValue="inheritAudioInfoMode"
                  @update:modelValue="changeinheritAudioInfo"
                />
                <ButtonToggleCell
                  v-model="activePointScrollMode"
                  :title="t('dialog.settingDialog.operation.scrollMode')"
                  :description="t('dialog.settingDialog.operation.scrollModeDescription')"
                  :options="[
                    {
                      label: t('dialog.settingDialog.operation.scrollModeOptions.continuous'),
                      value: 'CONTINUOUSLY',
                      description: t('dialog.settingDialog.operation.scrollModeOptions.continuousDescription'),
                    },
                    {
                      label: t('dialog.settingDialog.operation.scrollModeOptions.page'),
                      value: 'PAGE',
                      description: t('dialog.settingDialog.operation.scrollModeOptions.pageDescription'),
                    },
                    {
                      label: t('dialog.settingDialog.operation.scrollModeOptions.none'),
                      value: 'OFF',
                      description: t('dialog.settingDialog.operation.scrollModeOptions.noneDescription'),
                    },
                  ]"
                />
                <ButtonToggleCell
                  :title="t('dialog.settingDialog.operation.textSplit')"
                  :description="t('dialog.settingDialog.operation.textSplitDescription')"
                  :modelValue="splitTextWhenPaste"
                  :options="[
                    {
                      label: t('dialog.settingDialog.operation.textSplitOptions.periodNewline'),
                      value: 'PERIOD_AND_NEW_LINE',
                      description: t('dialog.settingDialog.operation.textSplitOptions.periodNewlineDescription'),
                    },
                    {
                      label: t('dialog.settingDialog.operation.textSplitOptions.newline'),
                      value: 'NEW_LINE',
                      description: t('dialog.settingDialog.operation.textSplitOptions.newlineDescription'),
                    },
                    {
                      label: t('dialog.settingDialog.operation.textSplitOptions.none'),
                      value: 'OFF',
                      description: t('dialog.settingDialog.operation.textSplitOptions.noneDescription'),
                    },
                  ]"
                  @update:modelValue="
                    changeSplitTextWhenPaste(
                      $event as RootMiscSettingType['splitTextWhenPaste'],
                    )
                  "
                />
                <ToggleCell
                  :title="t('dialog.settingDialog.operation.memo')"
                  :description="t('dialog.settingDialog.operation.memoDescription')"
                  :modelValue="enableMemoNotation"
                  @update:modelValue="changeEnableMemoNotation"
                />
                <ToggleCell
                  :title="t('dialog.settingDialog.operation.ruby')"
                  :description="t('dialog.settingDialog.operation.rubyDescription', { leftBrace: '{', bar: '|', rightBrace: '}' })"
                  :modelValue="enableRubyNotation"
                  @update:modelValue="changeEnableRubyNotation"
                />
                <BaseRowCard
                  :title="t('dialog.settingDialog.operation.resetHints')"
                  :description="t('dialog.settingDialog.operation.resetHintsDescription')"
                >
                  <BaseButton
                    :label="t('dialog.settingDialog.operation.resetHintsButton')"
                    :disabled="isDefaultConfirmedTips"
                    @click="
                      () => {
                        store.actions.RESET_CONFIRMED_TIPS();
                        hasResetConfirmedTips = true;
                      }
                    "
                  />
                </BaseRowCard>
                <ToggleCell
                  :title="t('dialog.settingDialog.operation.multiSelect')"
                  :description="t('dialog.settingDialog.operation.multiSelectDescription')"
                  :modelValue="enableMultiSelect"
                  @update:modelValue="setEnableMultiSelect($event)"
                />
              </div>
              <!-- Saving Card -->
              <div class="setting-card">
                <h5 class="headline">{{ t("dialog.settingDialog.saving.title") }}</h5>
                <ToggleCell
                  :title="t('dialog.settingDialog.saving.fixedExport')"
                  :description="t('dialog.settingDialog.saving.fixedExportDescription')"
                  :modelValue="savingSetting.fixedExportEnabled"
                  @update:modelValue="
                    handleSavingSettingChange('fixedExportEnabled', $event)
                  "
                >
                </ToggleCell>
                <QSlideTransition>
                  <!-- q-slide-transitionはheightだけをアニメーションするのでdivで囲う -->
                  <div
                    v-show="savingSetting.fixedExportEnabled"
                    class="transition-container"
                  >
                    <BaseRowCard :title="t('dialog.settingDialog.saving.fixedExportDir')">
                      {{ savingSetting.fixedExportDir }}
                      <BaseButton
                        icon="folder_open"
                        :label="t('dialog.settingDialog.saving.fixedExportButton')"
                        @click="selectFixedExportDir()"
                      >
                      </BaseButton>
                    </BaseRowCard>
                  </div>
                </QSlideTransition>

                <FileNameTemplateDialog
                  v-model:dialogOpened="showAudioFilePatternEditDialog"
                  :savedTemplate="audioFileNamePattern"
                  :defaultTemplate="DEFAULT_AUDIO_FILE_NAME_TEMPLATE"
                  :availableTags="[
                    'index',
                    'characterName',
                    'styleName',
                    'text',
                    'date',
                    'projectName',
                  ]"
                  :fileNameBuilder="buildAudioFileNameFromRawData"
                  extension=".wav"
                  @update:template="
                    handleSavingSettingChange('fileNamePattern', $event)
                  "
                />
                <FileNameTemplateDialog
                  v-model:dialogOpened="showSongTrackAudioFilePatternEditDialog"
                  :savedTemplate="songTrackFileNamePattern"
                  :defaultTemplate="DEFAULT_SONG_AUDIO_FILE_NAME_TEMPLATE"
                  :availableTags="[
                    'index',
                    'characterName',
                    'styleName',
                    'trackName',
                    'date',
                    'projectName',
                  ]"
                  :fileNameBuilder="buildSongTrackAudioFileNameFromRawData"
                  extension=".wav"
                  @update:template="
                    handleSavingSettingChange(
                      'songTrackFileNamePattern',
                      $event,
                    )
                  "
                />

                <EditButtonCell
                  :title="t('dialog.settingDialog.saving.talkFileNamePattern')"
                  :description="t('dialog.settingDialog.saving.talkFileNamePatternDescription')"
                  :currentValue="audioFileNamePatternWithExt"
                  @buttonClick="showAudioFilePatternEditDialog = true"
                />

                <ToggleCell
                  :title="t('dialog.settingDialog.saving.avoidOverwrite')"
                  :description="t('dialog.settingDialog.saving.avoidOverwriteDescription')"
                  :modelValue="savingSetting.avoidOverwrite"
                  @update:modelValue="
                    handleSavingSettingChange('avoidOverwrite', $event)
                  "
                />
                <ButtonToggleCell
                  :title="t('dialog.settingDialog.saving.encoding')"
                  :description="t('dialog.settingDialog.saving.encodingDescription')"
                  :modelValue="savingSetting.fileEncoding"
                  :options="[
                    { label: 'UTF-8', value: 'UTF-8' },
                    { label: 'Shift_JIS', value: 'Shift_JIS' },
                  ]"
                  @update:modelValue="
                    handleSavingSettingChange('fileEncoding', $event as string)
                  "
                />
                <ToggleCell
                  :title="t('dialog.settingDialog.saving.exportTxt')"
                  :description="t('dialog.settingDialog.saving.exportTxtDescription')"
                  :modelValue="savingSetting.exportText"
                  @update:modelValue="
                    handleSavingSettingChange('exportText', $event)
                  "
                />
                <ToggleCell
                  :title="t('dialog.settingDialog.saving.exportLab')"
                  :description="t('dialog.settingDialog.saving.exportLabDescription')"
                  :modelValue="savingSetting.exportLab"
                  @update:modelValue="
                    handleSavingSettingChange('exportLab', $event)
                  "
                />

                <EditButtonCell
                  :title="t('dialog.settingDialog.saving.songTrackFileNamePattern')"
                  :description="t('dialog.settingDialog.saving.songTrackFileNamePatternDescription')"
                  :currentValue="songTrackFileNamePatternWithExt"
                  @buttonClick="showSongTrackAudioFilePatternEditDialog = true"
                />
              </div>
              <!-- Theme Card -->
              <div class="setting-card">
                <h5 class="headline">{{ t("dialog.settingDialog.theme.title") }}</h5>
                <ButtonToggleCell
                  v-model="currentLocaleComputed"
                  :title="t('dialog.settingDialog.theme.language')"
                  :description="t('dialog.settingDialog.theme.languageDescription')"
                  :options="localeOptions"
                />
                <ButtonToggleCell
                  v-model="currentThemeNameComputed"
                  :title="t('dialog.settingDialog.theme.theme')"
                  :description="t('dialog.settingDialog.theme.themeDescription')"
                  :options="availableThemeNameComputed"
                />
                <ButtonToggleCell
                  :title="t('dialog.settingDialog.theme.font')"
                  :description="t('dialog.settingDialog.theme.fontDescription')"
                  :modelValue="editorFont"
                  :options="[
                    { label: t('dialog.settingDialog.theme.fontOptions.default'), value: 'default' },
                    { label: t('dialog.settingDialog.theme.fontOptions.os'), value: 'os' }
                  ]"
                  @update:modelValue="
                    changeEditorFont($event as EditorFontType)
                  "
                />
                <ToggleCell
                  :title="t('dialog.settingDialog.theme.showLineNumber')"
                  :description="t('dialog.settingDialog.theme.showLineNumberDescription')"
                  :modelValue="showTextLineNumber"
                  @update:modelValue="changeShowTextLineNumber"
                />
                <ToggleCell
                  :title="t('dialog.settingDialog.theme.showAudioLength')"
                  :description="t('dialog.settingDialog.theme.showAudioLengthDescription')"
                  :modelValue="showAudioLength"
                  @update:modelValue="changeShowAudioLength"
                />
                <ToggleCell
                  :title="t('dialog.settingDialog.theme.showAddButton')"
                  :description="t('dialog.settingDialog.theme.showAddButtonDescription')"
                  :modelValue="showAddAudioItemButton"
                  @update:modelValue="changeShowAddAudioItemButton"
                />
              </div>

              <!-- Advanced Card -->
              <div class="setting-card">
                <h5 class="headline">{{ t("dialog.settingDialog.advanced.title") }}</h5>
                <ToggleCell
                  :title="t('dialog.settingDialog.advanced.multiEngine')"
                  :description="t('dialog.settingDialog.advanced.multiEngineDescription')"
                  :modelValue="enableMultiEngine"
                  @update:modelValue="setEnableMultiEngine"
                />
                <ToggleCell
                  :title="t('dialog.settingDialog.advanced.stereo')"
                  :description="t('dialog.settingDialog.advanced.stereoDescription')"
                  :modelValue="savingSetting.outputStereo"
                  @update:modelValue="
                    handleSavingSettingChange('outputStereo', $event)
                  "
                />
                <BaseTooltip
                  :label="t('dialog.settingDialog.advanced.audioDeviceUnsupported')"
                  :disabled="canSetAudioOutputDevice"
                >
                  <SelectCell
                    v-model="currentAudioOutputDeviceComputed"
                    :title="t('dialog.settingDialog.advanced.audioDevice')"
                    :description="t('dialog.settingDialog.advanced.audioDeviceDescription')"
                    :disable="!canSetAudioOutputDevice"
                    :options="
                      availableAudioOutputDevices
                        ? availableAudioOutputDevices.map((option) => {
                            return { value: option.key, label: option.label };
                          })
                        : []
                    "
                  >
                  </SelectCell>
                </BaseTooltip>
                <BaseTooltip
                  :label="enableKatakanaEnglish.tooltip.value"
                  :disabled="
                    enableKatakanaEnglish.availableEngines.value === 'all'
                  "
                >
                  <ToggleCell
                    v-model="enableKatakanaEnglish.enabled.value"
                    :title="t('dialog.settingDialog.advanced.katakanaEnglish')"
                    :description="t('dialog.settingDialog.advanced.katakanaEnglishDescription')"
                  />
                </BaseTooltip>
                <ButtonToggleCell
                  v-model="defaultLyricModeComputed"
                  :title="t('dialog.settingDialog.advanced.defaultLyric')"
                  :description="t('dialog.settingDialog.advanced.defaultLyricDescription')"
                  :options="[
                    { label: t('dialog.settingDialog.advanced.defaultLyricOptions.doremi'), value: 'doremi' },
                    { label: t('dialog.settingDialog.advanced.defaultLyricOptions.la'), value: 'la' },
                  ]"
                />
                <BaseRowCard
                  :title="t('dialog.settingDialog.advanced.undoTrackOperation')"
                  :description="t('dialog.settingDialog.advanced.undoTrackOperationDescription')"
                >
                  <div class="checkbox-list">
                    <BaseCheckbox
                      v-for="(value, key) in undoableTrackOperations"
                      :key
                      :checked="value"
                      :label="
                        undoableTrackOperationsLabels[
                          key as keyof typeof undoableTrackOperationsLabels
                        ]
                      "
                      @update:checked="
                        (newValue) =>
                          (undoableTrackOperations = {
                            ...undoableTrackOperations,
                            [key]: newValue,
                          })
                      "
                    />
                  </div>
                </BaseRowCard>
              </div>

              <!-- Experimental Card -->
              <div class="setting-card">
                <h5 class="headline">{{ t("dialog.settingDialog.experimental.title") }}</h5>
                <!-- 今後実験的機能を追加する場合はここに追加 -->
                <ToggleCell
                  :title="t('dialog.settingDialog.experimental.interrogative')"
                  :description="t('dialog.settingDialog.experimental.interrogativeDescription')"
                  :modelValue="experimentalSetting.enableInterrogativeUpspeak"
                  @update:modelValue="
                    changeExperimentalSetting(
                      'enableInterrogativeUpspeak',
                      $event,
                    )
                  "
                />
                <ToggleCell
                  :title="t('dialog.settingDialog.experimental.morphing')"
                  :description="t('dialog.settingDialog.experimental.morphingDescription')"
                  :modelValue="experimentalSetting.enableMorphing"
                  @update:modelValue="
                    changeExperimentalSetting('enableMorphing', $event)
                  "
                />
                <ToggleCell
                  v-if="!isProduction"
                  :title="t('dialog.settingDialog.experimental.keepTuning')"
                  :description="t('dialog.settingDialog.experimental.keepTuningDescription')"
                  :modelValue="experimentalSetting.shouldKeepTuningOnTextChange"
                  @update:modelValue="
                    changeExperimentalSetting(
                      'shouldKeepTuningOnTextChange',
                      $event,
                    )
                  "
                />
                <ToggleCell
                  v-if="!isProduction"
                  :title="t('dialog.settingDialog.experimental.showParameterPanel')"
                  :description="t('dialog.settingDialog.experimental.showParameterPanelDescription')"
                  :modelValue="experimentalSetting.showParameterPanel"
                  @update:modelValue="
                    changeExperimentalSetting('showParameterPanel', $event)
                  "
                />
              </div>
              <div class="setting-card">
                <h5 class="headline">{{ t("dialog.settingDialog.telemetry.title") }}</h5>
                <ToggleCell
                  :title="t('dialog.settingDialog.telemetry.allow')"
                  :description="t('dialog.settingDialog.telemetry.allowDescription')"
                  :modelValue="acceptRetrieveTelemetryComputed"
                  @update:modelValue="acceptRetrieveTelemetryComputed = $event"
                />
              </div>
            </BaseScrollArea>
          </div>
        </QPage>
      </QPageContainer>
    </QLayout>
  </QDialog>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import FileNameTemplateDialog from "./FileNameTemplateDialog.vue";
import ToggleCell from "./ToggleCell.vue";
import ButtonToggleCell from "./ButtonToggleCell.vue";
import EditButtonCell from "./EditButtonCell.vue";
import SelectCell from "./SelectCell.vue";
import BaseRowCard from "@/components/Base/BaseRowCard.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseScrollArea from "@/components/Base/BaseScrollArea.vue";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import BaseSelectItem from "@/components/Base/BaseSelectItem.vue";
import BaseCheckbox from "@/components/Base/BaseCheckbox.vue";
import BaseTooltip from "@/components/Base/BaseTooltip.vue";
import { useStore } from "@/store";
import {
  DEFAULT_AUDIO_FILE_NAME_TEMPLATE,
  DEFAULT_SONG_AUDIO_FILE_NAME_TEMPLATE,
  buildAudioFileNameFromRawData,
  buildSongTrackAudioFileNameFromRawData,
} from "@/store/utility";
import type {
  SavingSetting,
  EngineSettingType,
  ExperimentalSettingType,
  ActivePointScrollMode,
  RootMiscSettingType,
  EngineId,
  EditorFontType,
} from "@/type/preload";
import { createLogger } from "@/helpers/log";
import { useRootMiscSetting } from "@/composables/useRootMiscSetting";
import { isProduction } from "@/helpers/platform";
import { ExhaustiveError } from "@/type/utility";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

type SamplingRateOption = EngineSettingType["outputSamplingRate"];

const dialogOpened = defineModel<boolean>("dialogOpened");

const store = useStore();
const { warn } = createLogger("SettingDialog");

const engineIds = computed(() => store.state.engineIds);
const engineInfos = computed(() => store.state.engineInfos);
const engineManifests = computed(() => store.state.engineManifests);
const inheritAudioInfoMode = computed(() => store.state.inheritAudioInfo);
const activePointScrollMode = computed({
  get: () => store.state.activePointScrollMode,
  set: (activePointScrollMode: ActivePointScrollMode) => {
    void store.actions.SET_ACTIVE_POINT_SCROLL_MODE({
      activePointScrollMode,
    });
  },
});
const experimentalSetting = computed(() => store.state.experimentalSetting);

const handleSavingSettingChange = (
  key: keyof SavingSetting,
  data: string | boolean | number,
) => {
  void store.actions.SET_SAVING_SETTING({
    data: { ...savingSetting.value, [key]: data },
  });
};

// エンジン：エンジンモード
const selectedEngineUseGpu = computed({
  get: () => {
    return store.state.engineSettings[selectedEngineId.value].useGpu;
  },
  set: (mode: boolean) => {
    void changeUseGpu(mode);
  },
});

// エンジン：音声のサンプリングレート
const samplingRateOptions: SamplingRateOption[] = [
  "engineDefault",
  24000,
  44100,
  48000,
  88200,
  96000,
];
const renderSamplingRateLabel = (value: SamplingRateOption): string => {
  if (value === "engineDefault") {
    return t('dialog.settingDialog.engine.samplingRateDefault');
  } else {
    return `${value / 1000} kHz`;
  }
};
const outputSamplingRate = computed({
  get: () => {
    return store.state.engineSettings[selectedEngineId.value]
      .outputSamplingRate;
  },
  set: async (outputSamplingRate: SamplingRateOption) => {
    if (outputSamplingRate !== "engineDefault") {
      const result = await store.actions.SHOW_CONFIRM_DIALOG({
        title: t('dialog.settingDialog.engine.samplingRateConfirmTitle'),
        message: t('dialog.settingDialog.engine.samplingRateConfirmMessage'),
        actionName: t('dialog.settingDialog.engine.samplingRateConfirmAction'),
      });
      if (result !== "OK") {
        return;
      }
    }

    void store.actions.SET_ENGINE_SETTING({
      engineId: selectedEngineId.value,
      engineSetting: {
        ...store.state.engineSettings[selectedEngineId.value],
        outputSamplingRate,
      },
    });
  },
});

// 非表示にしたヒントの再表示
const hasResetConfirmedTips = ref(false);
const isDefaultConfirmedTips = computed(() => {
  const confirmedTips = store.state.confirmedTips;
  // すべて false (= 初期値) かどうか確認
  return Object.values(confirmedTips).every((v) => !v);
});

// ソング：元に戻すトラック操作
const undoableTrackOperationsLabels = computed(() => ({
  soloAndMute: t('dialog.settingDialog.advanced.undoTrackOperationOptions.soloMute'),
  panAndGain: t('dialog.settingDialog.advanced.undoTrackOperationOptions.panGain'),
}));
const undoableTrackOperations = computed({
  get: () => store.state.undoableTrackOperations,
  set: (undoableTrackOperations) => {
    void store.actions.SET_ROOT_MISC_SETTING({
      key: "undoableTrackOperations",
      value: undoableTrackOperations,
    });
  },
});

// 外観
const localeOptions = [
  { label: '日本語', value: 'ja-JP' },
  { label: '中文', value: 'zh-CN' },
];

const currentLocaleComputed = computed({
  get: () => store.state.locale,
  set: (newLocale: string) => {
    store.actions.SET_LOCALE({ locale: newLocale });
    locale.value = newLocale;
  },
});

const currentThemeNameComputed = computed({
  get: () => store.state.currentTheme,
  set: (currentTheme: string) => {
    void store.actions.SET_CURRENT_THEME_SETTING({ currentTheme });
  },
});

const availableThemeNameComputed = computed(() => {
  return [...store.state.availableThemes]
    .sort((a, b) => a.order - b.order)
    .map((theme) => {
      return { label: theme.displayName, value: theme.name };
    });
});

const [editorFont, changeEditorFont] = useRootMiscSetting(store, "editorFont");

const [enableMultiEngine, setEnableMultiEngine] = useRootMiscSetting(
  store,
  "enableMultiEngine",
);

const [showTextLineNumber, changeShowTextLineNumber] = useRootMiscSetting(
  store,
  "showTextLineNumber",
);

const [showAudioLength, changeShowAudioLength] = useRootMiscSetting(
  store,
  "showAudioLength",
);

const [_enableKatakanaEnglish, setEnableKatakanaEnglish] = useRootMiscSetting(
  store,
  "enableKatakanaEnglish",
);
const enableKatakanaEnglish = {
  enabled: computed({
    get: () => _enableKatakanaEnglish.value,
    set: (enableKatakanaEnglish: boolean) => {
      setEnableKatakanaEnglish(enableKatakanaEnglish);
    },
  }),
  availableEngines: computed(() => {
    const supportedEngines = engineIds.value.filter(
      (engineId) =>
        engineManifests.value[engineId].supportedFeatures.applyKatakanaEnglish,
    );
    if (supportedEngines.length === 0) {
      return "none";
    }
    if (supportedEngines.length === store.state.engineIds.length) {
      return "all";
    }

    return "some";
  }),
  tooltip: computed(() => {
    switch (enableKatakanaEnglish.availableEngines.value) {
      case "none":
        return t('dialog.settingDialog.advanced.katakanaEnglishNoEngine');
      case "some":
        return t('dialog.settingDialog.advanced.katakanaEnglishSomeEngine');
      case "all":
        // この場合はツールチップを表示しない
        return "";
      default:
        throw new ExhaustiveError(enableKatakanaEnglish.availableEngines.value);
    }
  }),
};

const [showAddAudioItemButton, changeShowAddAudioItemButton] =
  useRootMiscSetting(store, "showAddAudioItemButton");

const [enableMemoNotation, changeEnableMemoNotation] = useRootMiscSetting(
  store,
  "enableMemoNotation",
);

const [enableRubyNotation, changeEnableRubyNotation] = useRootMiscSetting(
  store,
  "enableRubyNotation",
);

const [enablePreset, _changeEnablePreset] = useRootMiscSetting(
  store,
  "enablePreset",
);

const [
  shouldApplyDefaultPresetOnVoiceChanged,
  changeShouldApplyDefaultPresetOnVoiceChanged,
] = useRootMiscSetting(store, "shouldApplyDefaultPresetOnVoiceChanged");

const [enableMultiSelect, setEnableMultiSelect] = useRootMiscSetting(
  store,
  "enableMultiSelect",
);

const [defaultLyricMode, setDefaultLyricMode] = useRootMiscSetting(
  store,
  "defaultLyricMode",
);

const defaultLyricModeComputed = computed({
  get: () => defaultLyricMode.value,
  set: (value: "doremi" | "la") => {
    setDefaultLyricMode(value);
  },
});

const canSetAudioOutputDevice = computed(() => {
  return !!HTMLAudioElement.prototype.setSinkId;
});
const currentAudioOutputDeviceComputed = computed<string | undefined>({
  get: () => {
    // 再生デバイスが見つからなかったらデフォルト値に戻す
    // FIXME: watchなどにしてgetter内で操作しないようにする
    const device = availableAudioOutputDevices.value?.find(
      (device) => device.key === store.state.savingSetting.audioOutputDevice,
    );
    if (device) {
      return device.key;
    } else if (store.state.savingSetting.audioOutputDevice !== "default") {
      handleSavingSettingChange("audioOutputDevice", "default");
    }
    return undefined;
  },
  set: (device) => {
    if (device) {
      handleSavingSettingChange("audioOutputDevice", device);
    }
  },
});

const availableAudioOutputDevices = ref<{ key: string; label: string }[]>();
const updateAudioOutputDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  availableAudioOutputDevices.value = devices
    .filter((device) => device.kind === "audiooutput")
    .map((device) => {
      return { label: device.label, key: device.deviceId };
    });
};
if (navigator.mediaDevices) {
  navigator.mediaDevices.addEventListener(
    "devicechange",
    updateAudioOutputDevices,
  );
  void updateAudioOutputDevices();
} else {
  warn("navigator.mediaDevices is not available.");
}

const acceptRetrieveTelemetryComputed = computed({
  get: () => store.state.acceptRetrieveTelemetry == "Accepted",
  set: (acceptRetrieveTelemetry: boolean) => {
    void store.actions.SET_ACCEPT_RETRIEVE_TELEMETRY({
      acceptRetrieveTelemetry: acceptRetrieveTelemetry ? "Accepted" : "Refused",
    });

    if (acceptRetrieveTelemetry) {
      return;
    }

    void store.actions.SHOW_ALERT_DIALOG({
      title: t('dialog.settingDialog.telemetry.telemetryDisableTitle'),
      message: t('dialog.settingDialog.telemetry.telemetryDisableMessage'),
      ok: t('dialog.settingDialog.telemetry.telemetryDisableOk'),
    });
  },
});

const changeUseGpu = async (useGpu: boolean) => {
  await store.actions.CHANGE_USE_GPU({
    useGpu,
    engineId: selectedEngineId.value,
  });
};

const changeinheritAudioInfo = async (inheritAudioInfo: boolean) => {
  if (store.state.inheritAudioInfo === inheritAudioInfo) return;
  void store.actions.SET_INHERIT_AUDIOINFO({ inheritAudioInfo });
};

const changeEnablePreset = (value: boolean) => {
  if (value) {
    // プリセット機能をONにしたときは「デフォルトプリセットを自動で適用」もONにする
    _changeEnablePreset(true);
    changeShouldApplyDefaultPresetOnVoiceChanged(true);
  } else {
    _changeEnablePreset(false);
    changeShouldApplyDefaultPresetOnVoiceChanged(false);
  }
};

const changeExperimentalSetting = async (
  key: keyof ExperimentalSettingType,
  data: boolean,
) => {
  void store.actions.SET_EXPERIMENTAL_SETTING({
    experimentalSetting: { ...experimentalSetting.value, [key]: data },
  });
};

const savingSetting = computed(() => store.state.savingSetting);

const engineUseGpuOptions = [
  { label: "CPU", value: "CPU" },
  { label: "GPU", value: "GPU" },
];

const audioFileNamePattern = computed(
  () => store.state.savingSetting.fileNamePattern,
);
const songTrackFileNamePattern = computed(
  () => store.state.savingSetting.songTrackFileNamePattern,
);
const audioFileNamePatternWithExt = computed(() =>
  audioFileNamePattern.value ? audioFileNamePattern.value + ".wav" : "",
);
const songTrackFileNamePatternWithExt = computed(() =>
  songTrackFileNamePattern.value ? songTrackFileNamePattern.value + ".wav" : "",
);

const gpuSwitchEnabled = (engineId: EngineId) => {
  // CPU版でもGPUモードからCPUモードに変更できるようにする
  return (
    store.getters.ENGINE_CAN_USE_GPU(engineId) || selectedEngineUseGpu.value
  );
};

const openFileExplore = () => {
  return window.backend.showSaveDirectoryDialog({
    title: t('dialog.settingDialog.saving.selectExportDir'),
  });
};

const selectFixedExportDir = async () => {
  const path = await openFileExplore();
  if (path != undefined) {
    handleSavingSettingChange("fixedExportDir", path);
  }
};

// 書き出し先を固定を有効にしたときに書き出し先が未選択の場合は自動的にダイアログを表示する
watchEffect(async () => {
  if (
    savingSetting.value.fixedExportEnabled &&
    savingSetting.value.fixedExportDir === ""
  ) {
    const path = await openFileExplore();
    if (path != undefined) {
      handleSavingSettingChange("fixedExportDir", path);
    } else {
      // キャンセルした場合書き出し先の固定を無効化する
      handleSavingSettingChange("fixedExportEnabled", false);
    }
  }
});

const [splitTextWhenPaste, changeSplitTextWhenPaste] = useRootMiscSetting(
  store,
  "splitTextWhenPaste",
);

const showAudioFilePatternEditDialog = ref(false);
const showSongTrackAudioFilePatternEditDialog = ref(false);

const selectedEngineIdRaw = ref<EngineId | undefined>(undefined);
const selectedEngineId = computed({
  get: () => {
    return selectedEngineIdRaw.value || engineIds.value[0];
  },
  set: (engineId: EngineId) => {
    selectedEngineIdRaw.value = engineId;
  },
});
const renderEngineNameLabel = (engineId: EngineId) => {
  return engineInfos.value[engineId].name;
};
</script>

<style scoped lang="scss">
@use "@/styles/visually-hidden" as visually-hidden;
@use "@/styles/colors" as colors;
@use "@/styles/v2/colors" as colors-v2;
@use "@/styles/v2/variables" as vars;
@use "@/styles/v2/mixin" as mixin;

.container {
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  background-color: colors-v2.$background;
}

.headline {
  @include mixin.headline-2;
}

// NOTE: なぜか:globalしないと効かない
:global(.setting-dialog) {
  z-index: vars.$z-index-fullscreen-dialog !important;
}

.setting-card {
  margin: auto;
  max-width: 960px;
  padding: vars.$padding-2;
  display: flex;
  flex-direction: column;
  gap: vars.$gap-1;
}

.setting-dialog .q-layout-container :deep(.absolute-full) {
  right: 0 !important;
  .scroll {
    left: unset !important;
    right: unset !important;
    width: unset !important;
    max-height: unset;
  }
}

.transition-container {
  display: flex;
  flex-direction: column;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: vars.$gap-1;
}

.checkbox-list {
  display: flex;
  gap: vars.$gap-2;
}
</style>
