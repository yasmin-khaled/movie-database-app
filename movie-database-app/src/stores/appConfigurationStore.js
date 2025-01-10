import { create } from "zustand";
import i18n from "../i18n";

const useAppConfigurationStore = create((set) => ({
  hideFlag: false,
  language: i18n.language,
  setHideFlag: (flag) => set({ hideFlag: flag }),
  changeLanguage: () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    set({ language: newLanguage });
  },
}));

export default useAppConfigurationStore;