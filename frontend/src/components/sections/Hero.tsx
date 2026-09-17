import { Calendar, MessageCircle, Users, Sparkles, Award, Stethoscope } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';
import { useWhatsApp } from '../../services/whatsapp';
import { useDoctors } from '../../services/api';
import { Button } from '../ui/Button';
import type { Doctor } from '../../types';

function initials(name: string): string {
  const parts = name.replace(/^Dr\.\s*/i, '').trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? '';
  const last = parts[parts.length - 1]?.charAt(0) ?? '';
  return `${first}${last}`.toUpperCase();
}

export function Hero() {
  const { language } = useLanguageContext();
  const { open } = useWhatsApp();
  const { data: doctors } = useDoctors();
  const list: Doctor[] = doctors ?? [];

  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const handwritten = t('hero.handwritten', language);

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#faf7f2] to-white pt-24 pb-16">
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 rounded-full bg-teal-300/20 blur-[120px] w-[800px] h-[600px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full bg-rose-200/15 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-sm font-bold text-teal-800 ring-1 ring-teal-200">
              <Stethoscope size={16} className="text-teal-600" />
              {t('hero.tagline', language)}
            </span>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              {language === 'en'
                ? t('hero.title', language).split('Confident You').map((part, i) =>
                    i === 0 ? (
                      <span key={i}>
                        {part.trim()}
                        <br />
                        <span className="bg-gradient-to-r from-teal-700 to-rose-500 bg-clip-text text-transparent">Confident You</span>
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )
                : t('hero.title', language).split(' ').map((word, i, arr) => (
                    <span key={i} className={arr.length > 2 && i >= arr.length - 2 ? 'block' : 'mr-1'}>
                      {word}
                    </span>
                  ))}
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-slate-600 md:text-xl">
              {t('hero.subtitle', language)}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => go('#appointment')}>
                <Calendar size={20} />
                {t('hero.cta1', language)}
              </Button>
              <Button variant="whatsapp" size="lg" onClick={() => open()}>
                <MessageCircle size={20} />
                {t('hero.cta2', language)}
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal-100 to-rose-100 blur-2xl opacity-60" />
            <div className="relative rounded-[2rem] bg-gradient-to-br from-teal-100 via-[#faf7f2] to-rose-100 p-6 sm:p-8">
              <div className="space-y-5">
                <span className="inline-block rounded-full bg-white/80 px-4 py-1.5 text-sm font-bold text-teal-800 ring-1 ring-teal-100">
                  {t('hero.advancedServices', language)}
                </span>

                {list.slice(0, 2).map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-xl shadow-slate-900/5 ring-1 ring-slate-100">
                    <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-xl font-bold text-white shadow-lg shadow-teal-800/25">
                      {initials(doc.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-lg font-bold text-slate-900">
                        {language === 'te' && doc.name_te ? doc.name_te : doc.name}
                      </p>
                      <p className="text-sm font-medium text-teal-700">{doc.qualifications}</p>
                      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {language === 'te' && doc.specializations_te ? doc.specializations_te : doc.specializations}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-4 rounded-3xl border border-rose-100 bg-rose-50/70 px-5 py-4">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white text-rose-500 shadow-sm">
                    <Sparkles size={20} />
                  </span>
                  <p className="text-sm font-semibold leading-snug text-rose-800">
                    {t('hero.doctorCaption', language)}
                  </p>
                </div>
              </div>

              <div className="absolute -right-2 -top-8 rotate-6 rounded-3xl bg-white/90 px-5 py-4 text-center shadow-xl shadow-slate-900/10 ring-1 ring-slate-100 backdrop-blur">
                <p className="font-serif text-xl italic leading-relaxed text-teal-800">
                  {handwritten.split(' ').map((word, i) => (
                    <span key={i} className="block">
                      {word}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 rounded-[2rem] border border-slate-100 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur sm:grid-cols-2 lg:grid-cols-3 lg:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
              <Award size={22} />
            </span>
            <div>
              <p className="text-3xl font-bold text-teal-800">{t('hero.stat1Value', language)}</p>
              <p className="text-sm font-medium text-slate-500">{t('hero.stat1Label', language)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
              <Users size={22} />
            </span>
            <div>
              <p className="text-3xl font-bold text-rose-600">{t('hero.stat2Value', language)}</p>
              <p className="text-sm font-medium text-slate-500">{t('hero.stat2Label', language)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-1">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Sparkles size={22} />
            </span>
            <div>
              <p className="text-2xl font-bold text-amber-700">{t('hero.stat3Value', language)}</p>
              <p className="text-sm font-medium text-slate-500">{t('hero.stat3Label', language)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}