import { useRef, useState, useEffect, useCallback } from 'react';
import { Bot, Send, X, MessageCircle, Calendar, User } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';
import { sendChatMessage } from '../../services/client';
import { useWhatsApp } from '../../services/whatsapp';
import type { ChatLocalMessage } from '../../types';

interface DermaAIChatProps {
  open: boolean;
  onClose: () => void;
}

function buildSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

const WELCOME_ID = 'welcome';

export function DermaAIChat({ open, onClose }: DermaAIChatProps) {
  const { language } = useLanguageContext();
  const { open: openWhatsApp } = useWhatsApp();
  const [messages, setMessages] = useState<ChatLocalMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const sessionRef = useRef<string>(buildSessionId());
  const scrollRef = useRef<HTMLDivElement>(null);
  const welcomeInitializedRef = useRef(false);

  const getWelcomeMessage = (lang: 'en' | 'te') =>
    lang === 'te' ? t('ai.welcomeTe', 'te') : t('ai.welcome', 'en');

  // Initialize welcome message when chat opens
  useEffect(() => {
    if (open && !welcomeInitializedRef.current) {
      welcomeInitializedRef.current = true;
      setMessages([{
        id: WELCOME_ID,
        role: 'assistant',
        content: getWelcomeMessage(language),
      }]);
    }
    if (!open) {
      welcomeInitializedRef.current = false;
      setMessages([]);
    }
  }, [open, language]);

  // Update welcome message content when language changes
  useEffect(() => {
    if (messages.length > 0 && messages[0].id === WELCOME_ID) {
      setMessages(prev => [{
        ...prev[0],
        content: getWelcomeMessage(language),
      }, ...prev.slice(1)]);
    }
  }, [language]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || busy) return;
    const userMessage: ChatLocalMessage = { id: `u-${Date.now()}`, role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setBusy(true);
    try {
      const result = await sendChatMessage({ message: text, language, session_id: sessionRef.current });
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: result.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: language === 'te' ? t('ai.networkError', 'te') : t('ai.networkError', 'en'),
        },
      ]);
    } finally {
      setBusy(false);
    }
  }, [input, busy, language]);

  const goToAppointment = () => {
    onClose();
    document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!open) return null;

  return (
    <div className="fab-widget fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl ring-1 ring-slate-200 sm:bottom-6 sm:left-auto sm:right-6 sm:inset-x-auto sm:max-h-[min(640px,calc(100vh-2rem))] sm:h-[600px] sm:rounded-3xl">
      <div className="flex items-center justify-between bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
            <Bot size={22} />
          </span>
          <div>
            <p className="font-bold leading-tight">{t('ai.title', language)}</p>
            <p className="text-xs text-teal-100">
              {language === 'te' ? 'చర్మ వ్యాధి సహాయకుడు • తెలుగు & English' : 'Dermatology assistant • English & తెలుగు'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-xl p-2 text-white/90 transition-colors hover:bg-white/10"
        >
          <X size={22} />
        </button>
      </div>

      <div className="border-b border-amber-200 bg-amber-50 px-5 py-2.5">
        <p className="flex items-start gap-2 text-xs font-medium leading-snug text-amber-800">
          <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
          {t('ai.disclaimer', language)}
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-5">
        {messages.map((msg) =>
          msg.role === 'user' ? (
            <div key={msg.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-r from-teal-700 to-teal-600 px-4 py-3 text-sm leading-relaxed text-white shadow-md">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow ring-1 ring-slate-100">
                <Bot size={16} className="text-teal-700" />
              </span>
              <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm leading-relaxed text-slate-800 shadow-sm ring-1 ring-slate-100">
                {msg.content}
              </div>
            </div>
          ),
        )}
        {busy && (
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow ring-1 ring-slate-100">
              <Bot size={16} className="text-teal-700" />
            </span>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
              <span className="h-2 w-2 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-teal-600" />
              <span className="ml-1 text-xs text-slate-400">{t('ai.thinking', language)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={goToAppointment}
            className="inline-flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 px-3.5 py-2 text-xs font-semibold text-teal-800 transition-colors hover:bg-teal-100"
          >
            <Calendar size={14} />
            {t('ai.bookNow', language)}
          </button>
          <button
            onClick={() => openWhatsApp()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-3.5 py-2 text-xs font-semibold text-green-700 transition-colors hover:bg-green-100"
          >
            <MessageCircle size={14} />
            {t('ai.whatsappChat', language)}
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSend();
          }}
          className="mt-3 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('ai.placeholder', language)}
            aria-label="Chat message"
            className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send message"
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-teal-700 to-teal-600 text-white shadow-lg shadow-teal-700/25 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
          <User size={12} />
          {t('ai.escalation', language)}
        </p>
      </div>
    </div>
  );
}