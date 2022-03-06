import { createI18n } from "vue-i18n";
import { messages } from "./labels";

export const i18n = createI18n({
  locale: "ru",
  fallbackLocale: "en",
  messages,
});
