import { Bot, X } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';

interface ChatLauncherProps {
  openChat: boolean;
  onToggle: () => void;
}

export function ChatLauncher({ openChat, onToggle }: ChatLauncherProps) {
  const { language } = useLanguageContext();

  return (
    <button
      onClick={onToggle}
      aria-label={openChat ? t('ai.closeChat', language) : t('ai.openChat', language)}
      className="flex items-center rounded-full bg-gradient-to-r from-teal-700 to-teal-600 p-3 font-semibold text-white shadow-2xl shadow-teal-800/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-teal-800/60"
    >
      {openChat ? <X size={22} /> : <Bot size={22} />}
    </button>
  );
}