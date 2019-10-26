import localeDict from '@/locale/localize'
import store from '@/store';

export default function localeFilter(key) {
  const locale = store.getters.info.locale === 'ru-RU' ? 'ru' : 'en';
  return localeDict[locale][key] || 'Ошибка локализации';
}