import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

type Language = "en" | "ru" | "ua";

interface Translations {
  settings: string;
  appearance: string;
  language: string;
  information: string;
  version: string;
  helpText: string;
  order: string;
  orderEmpty: string;
  tapToAdd: string;
  clearAll: string;
  submitOrder: string;
  confirmOrder: string;
  confirmOrderText: string;
  cancel: string;
  sendToMicah: string;
  sending: string;
  back: string;
  done: string;
  added: string;
  tapToRemove: string;
  tapToAddItem: string;
  selectItems: string;
  variants: string;
  inCart: string;
  manager: string;
  orderSent: string;
  orderSentDesc: string;
  orderSaved: string;
  orderSavedDesc: string;
  error: string;
  errorDesc: string;
  addedToCart: string;
  alreadyInCart: string;
  activeTrucks: string;
  truckNumber: string;
  noActiveTrucks: string;
  addTruckHint: string;
}

const translations: Record<Language, Translations> = {
  en: {
    settings: "Settings",
    appearance: "Appearance",
    language: "Language",
    information: "Information",
    version: "Version 1.0",
    helpText: "Tap categories to add items to your cart, then submit your order.",
    order: "Order",
    orderEmpty: "Your order is empty",
    tapToAdd: "Tap items to add them",
    clearAll: "Clear All",
    submitOrder: "Submit Order",
    confirmOrder: "Confirm Order",
    confirmOrderText: "You are about to submit an order. This will be sent to the manager for review.",
    cancel: "Cancel",
    sendToMicah: "Send it to Micah",
    sending: "Sending...",
    back: "Back",
    done: "Done",
    added: "Added",
    tapToRemove: "Tap to remove",
    tapToAddItem: "Tap to add",
    selectItems: "Select items to add to your order",
    variants: "variants",
    inCart: "In Cart",
    manager: "Manager",
    orderSent: "Order Sent!",
    orderSentDesc: "Your order has been sent to Micah.",
    orderSaved: "Order Saved",
    orderSavedDesc: "Order was saved but email could not be sent.",
    error: "Error",
    errorDesc: "Failed to send order. Please try again.",
    addedToCart: "Added to Cart",
    alreadyInCart: "Already in Cart",
    activeTrucks: "Active Trucks",
    truckNumber: "Truck number...",
    noActiveTrucks: "No active trucks",
    addTruckHint: "Add trucks you're working on",
  },
  ru: {
    settings: "Настройки",
    appearance: "Внешний вид",
    language: "Язык",
    information: "Информация",
    version: "Версия 1.0",
    helpText: "Нажмите на категорию чтобы добавить товар, затем отправьте заказ.",
    order: "Заказ",
    orderEmpty: "Заказ пуст",
    tapToAdd: "Нажмите на товар для добавления",
    clearAll: "Очистить всё",
    submitOrder: "Отправить заказ",
    confirmOrder: "Подтвердите заказ",
    confirmOrderText: "Вы собираетесь отправить заказ. Он будет отправлен менеджеру на рассмотрение.",
    cancel: "Отмена",
    sendToMicah: "Отправить Micah",
    sending: "Отправка...",
    back: "Назад",
    done: "Готово",
    added: "Добавлено",
    tapToRemove: "Нажмите для отмены",
    tapToAddItem: "Нажмите для добавления",
    selectItems: "Выберите товары для заказа",
    variants: "вариантов",
    inCart: "В заказе",
    manager: "Менеджер",
    orderSent: "Заказ отправлен!",
    orderSentDesc: "Ваш заказ отправлен Micah.",
    orderSaved: "Заказ сохранён",
    orderSavedDesc: "Заказ сохранён, но email не был отправлен.",
    error: "Ошибка",
    errorDesc: "Не удалось отправить заказ. Попробуйте снова.",
    addedToCart: "Добавлено в заказ",
    alreadyInCart: "Уже в заказе",
    activeTrucks: "Активные траки",
    truckNumber: "Номер трака...",
    noActiveTrucks: "Нет активных траков",
    addTruckHint: "Добавьте траки над которыми работаете",
  },
  ua: {
    settings: "Налаштування",
    appearance: "Зовнішній вигляд",
    language: "Мова",
    information: "Інформація",
    version: "Версія 1.0",
    helpText: "Натисніть на категорію щоб додати товар, потім відправте замовлення.",
    order: "Замовлення",
    orderEmpty: "Замовлення порожнє",
    tapToAdd: "Натисніть на товар для додавання",
    clearAll: "Очистити все",
    submitOrder: "Відправити замовлення",
    confirmOrder: "Підтвердіть замовлення",
    confirmOrderText: "Ви збираєтесь відправити замовлення. Воно буде надіслано менеджеру на розгляд.",
    cancel: "Скасувати",
    sendToMicah: "Надіслати Micah",
    sending: "Надсилання...",
    back: "Назад",
    done: "Готово",
    added: "Додано",
    tapToRemove: "Натисніть для скасування",
    tapToAddItem: "Натисніть для додавання",
    selectItems: "Виберіть товари для замовлення",
    variants: "варіантів",
    inCart: "У замовленні",
    manager: "Менеджер",
    orderSent: "Замовлення відправлено!",
    orderSentDesc: "Ваше замовлення надіслано Micah.",
    orderSaved: "Замовлення збережено",
    orderSavedDesc: "Замовлення збережено, але email не був надісланий.",
    error: "Помилка",
    errorDesc: "Не вдалося відправити замовлення. Спробуйте знову.",
    addedToCart: "Додано до замовлення",
    alreadyInCart: "Вже у замовленні",
    activeTrucks: "Активні траки",
    truckNumber: "Номер трака...",
    noActiveTrucks: "Немає активних траків",
    addTruckHint: "Додайте траки над якими працюєте",
  },
};

const languageNames: Record<Language, string> = {
  en: "English",
  ru: "Русский",
  ua: "Українська",
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languageNames: Record<Language, string>;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "supply-hub-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (stored === "en" || stored === "ru" || stored === "ua")) {
        return stored as Language;
      }
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        languageNames,
        languages: ["en", "ru", "ua"],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
