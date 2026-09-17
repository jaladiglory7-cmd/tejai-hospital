import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';
import { useWhatsApp } from '../../services/whatsapp';

interface WhatsAppFloatProps {
  isChatOpen?: boolean;
}

export function WhatsAppFloat({ isChatOpen = false }: WhatsAppFloatProps) {
  const { language } = useLanguageContext();
  const { open } = useWhatsApp();
  const [visible, setVisible] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setShowTip(true), 2500);
    const hide = setTimeout(() => setShowTip(false), 9000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hide);
    };
  }, [visible]);

  if (isChatOpen) return null;

  return (
    <div className="relative flex flex-col items-end">
      {showTip && (
        <div className="absolute bottom-full right-0 mb-3 max-w-[230px] rounded-2xl rounded-br-sm bg-white px-4 py-3 shadow-xl ring-1 ring-slate-100">
          <button
            onClick={() => setShowTip(false)}
            className="absolute -left-2 -top-2 rounded-full bg-slate-800 p-1 text-white"
            aria-label="Dismiss"
          >
            <X size={12} />
          </button>
          <p className="text-sm font-semibold text-slate-800">
            {language === 'te' ? 'మీ చర్మ సమస్యను పంచుకోండి 👋' : 'Share your skin concern 👋'}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {language === 'te' ? 'WhatsApp లో సంప్రదించండి' : 'Reach us on WhatsApp'}
          </p>
        </div>
      )}
      <button
        onClick={() => open()}
        aria-label={t('whatsapp.float', language)}
        className={`flex items-center rounded-full bg-gradient-to-r from-green-600 to-green-500 p-3 font-semibold text-white shadow-2xl shadow-green-600/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-green-600/60 ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-16 opacity-0'
        }`}
      >
        <MessageCircle size={22} className="fill-white/20" />
      </button>
    </div>
  );
}