import { computed } from "vue";
import type { Store } from "@/store";
import { useRootMiscSetting } from "@/composables/useRootMiscSetting";
import type {
  MaybeComputedMenuBarContent,
  MenuBarContent,
} from "@/components/Menu/MenuBar/menuBarData";
import { useI18n } from "vue-i18n";

export const useMenuBarData = (store: Store): MaybeComputedMenuBarContent => {
  const { t } = useI18n();
  // 「ファイル」メニュー
  const fileSubMenuData = computed<MenuBarContent["file"]>(() => ({
    audioExport: [
      {
        type: "button",
        label: t("talk.menuBarData.exportAudio"),
        onClick: () => {
          void store.actions.SHOW_GENERATE_AND_SAVE_ALL_AUDIO_DIALOG();
        },
        disableWhenUiLocked: true,
      },
      {
        type: "button",
        label: t("talk.menuBarData.exportSelectedAudio"),
        onClick: () => {
          void store.actions.SHOW_GENERATE_AND_SAVE_SELECTED_AUDIO_DIALOG();
        },
        disableWhenUiLocked: true,
      },
      {
        type: "button",
        label: t("talk.menuBarData.connectAndExportAudio"),
        onClick: () => {
          void store.actions.SHOW_GENERATE_AND_CONNECT_ALL_AUDIO_DIALOG();
        },
        disableWhenUiLocked: true,
      },
    ],
    externalProject: [
      {
        type: "button",
        label: t("talk.menuBarData.connectAndExportText"),
        onClick: () => {
          void store.actions.SHOW_CONNECT_AND_EXPORT_TEXT_DIALOG();
        },
        disableWhenUiLocked: true,
      },
      {
        type: "button",
        label: t("talk.menuBarData.importText"),
        onClick: () => {
          void store.actions.COMMAND_IMPORT_FROM_FILE({ type: "dialog" });
        },
        disableWhenUiLocked: true,
      },
    ],
  }));

  // 「表示」メニュー
  const [showTextLineNumber, changeShowTextLineNumber] = useRootMiscSetting(
    store,
    "showTextLineNumber",
  );
  const viewSubMenuData = computed<MenuBarContent["view"]>(() => ({
    guide: [
      {
        type: "button",
        label: showTextLineNumber.value
          ? t("talk.menuBarData.hideLineNumber")
          : t("talk.menuBarData.showLineNumber"),
        onClick: () => {
          changeShowTextLineNumber(!showTextLineNumber.value);
        },
        disableWhenUiLocked: true,
      },
    ],
  }));

  return {
    file: fileSubMenuData,
    view: viewSubMenuData,
  };
};
