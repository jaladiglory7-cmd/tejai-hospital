import { useEffect, useState } from 'react';
import { Menu, X, Globe, MessageCircle } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';
import { useWhatsApp } from '../../services/whatsapp';

const links = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.services', href: '#services' },
  { key: 'nav.doctors', href: '#doctors' },
  { key: 'nav.categories', href: '#who-we-serve' },
  { key: 'nav.whyChooseUs', href: '#why-choose-us' },
  { key: 'nav.consultation', href: '#consultation-process' },
  { key: 'nav.faq', href: '#faq' },
  { key: 'nav.location', href: '#location' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguageContext();
  const { open: openWhatsApp } = useWhatsApp();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.classList.toggle('menu-open', open);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        open
          ? 'bg-white shadow-lg shadow-slate-900/5'
          : scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-900/5'
            : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={() => go('#home')} className="flex items-center gap-2.5" aria-label="TejAI home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-lg font-bold text-white shadow-lg shadow-teal-800/30">
            T
          </span>
          <span className="text-left leading-tight">
            <span className="block text-xl font-bold tracking-tight text-slate-900">
              Tej<span className="text-teal-700">AI</span>
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-slate-400 sm:block">
              Tech Services
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-0.5 xl:flex">
          {links.map((link) => (
            <button
              key={link.key}
              onClick={() => go(link.href)}
              className="whitespace-nowrap rounded-xl px-2.5 py-2 text-sm font-medium leading-5 text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-800"
            >
              {t(link.key, language)}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-teal-300 hover:text-teal-800"
          >
            <Globe size={16} />
            {language === 'en' ? 'తెలుగు' : 'English'}
          </button>
          <button
            onClick={() => openWhatsApp()}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
          >
            <MessageCircle size={16} />
            WhatsApp
          </button>
          <button
            onClick={() => go('#appointment')}
            className="whitespace-nowrap rounded-xl bg-gradient-to-r from-teal-700 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-700/25 transition-all hover:-translate-y-0.5 hover:shadow-teal-700/40"
          >
            {t('nav.bookAppointment', language)}
          </button>
        </div>

        <div className="relative z-[50] flex items-center gap-2 xl:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
          >
            <Globe size={16} />
            {language === 'en' ? 'తెలుగు' : 'EN'}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className={`rounded-xl p-2 text-slate-700 transition-colors hover:bg-slate-100 ${
              open ? 'bg-slate-100 ring-1 ring-slate-300' : ''
            }`}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {open && (
        <div aria-label="Mobile menu" className="xl:hidden">
          <button
            onClick={() => setOpen(false)}
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 top-20 z-40 cursor-default bg-slate-900/60 backdrop-blur-[2px] xl:hidden"
          />
          <div className="absolute inset-x-0 top-full z-[45] max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-slate-100 bg-white pb-3 pt-2 shadow-2xl shadow-slate-900/20 sm:inset-x-auto sm:right-4 sm:top-[calc(100%+0.5rem)] sm:w-[21rem] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl sm:border-0 sm:ring-1 sm:ring-slate-100 xl:hidden">
            <div className="space-y-0.5 px-3">
              {links.map((link) => (
                <button
                  key={link.key}
                  onClick={() => go(link.href)}
                  className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-slate-800 transition-colors hover:bg-teal-50 hover:text-teal-800"
                >
                  {t(link.key, language)}
                </button>
              ))}
            </div>
            <div className="mx-5 my-1.5 border-t border-slate-100" />
            <div className="grid grid-cols-2 gap-2 px-4">
              <button
                onClick={() => {
                  setOpen(false);
                  openWhatsApp();
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-3 py-2.5 text-sm font-semibold leading-5 text-green-700 transition-colors hover:bg-green-100"
              >
                <MessageCircle size={16} />
                WhatsApp
              </button>
              <button
                onClick={() => go('#appointment')}
                className="rounded-xl bg-gradient-to-r from-teal-700 to-teal-600 px-3 py-2.5 text-sm font-semibold leading-5 text-white shadow-lg shadow-teal-700/25 transition-transform hover:-translate-y-0.5"
              >
                {t('nav.bookAppointment', language)}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}