import { useEffect, useState } from 'react';
import { ChatLauncher } from '../ai/ChatLauncher';
import { WhatsAppFloat } from '../whatsapp/WhatsAppFloat';
import { DermaAIChat } from '../ai/DermaAIChat';

const SCROLL_TOP_SHOW = 160;
const SCROLL_BOTTOM_REVEAL = 220;

export function FloatingActions() {
  const [openChat, setOpenChat] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const atTop = y < SCROLL_TOP_SHOW;
      const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - SCROLL_BOTTOM_REVEAL;
      setHidden(!(atTop || atBottom));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        className={`fab-widget fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2.5 transition-all duration-300 sm:bottom-5 sm:right-5 sm:gap-3 ${
          hidden ? 'pointer-events-none translate-y-6 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <ChatLauncher openChat={openChat} onToggle={() => setOpenChat((v) => !v)} />
        <WhatsAppFloat isChatOpen={openChat} />
      </div>
      <DermaAIChat open={openChat} onClose={() => setOpenChat(false)} />
    </>
  );
}