import { createI18n } from "vue-i18n";

import jaJP from "./ja-JP";
import zhCN from "./zh-CN";

export const i18n = createI18n({
  legacy: false,

  locale: "ja-JP",

  fallbackLocale: "ja-JP",

  messages: {
    "ja-JP": jaJP,
    "zh-CN": zhCN,
  },
});