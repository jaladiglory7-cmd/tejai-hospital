import { useLanguageContext } from '../hooks/useLanguageContext';
import { t } from '../i18n';

export function useWhatsApp() {
  const { language } = useLanguageContext();

  const buildLink = (message?: string): string => {
    const base = import.meta.env.VITE_WHATSAPP_PHONE || '919876543210';
    const text = message ?? t('whatsapp.defaultMessage', language);
    return `https://wa.me/${base}?text=${encodeURIComponent(text)}`;
  };

  const open = (message?: string) => {
    window.open(buildLink(message), '_blank', 'noopener,noreferrer');
  };

  return { buildLink, open };
}