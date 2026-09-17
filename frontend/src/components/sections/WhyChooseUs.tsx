import { ShieldCheck, ClipboardList, Palette } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';

const points = [
  { key: 'evidence', icon: ShieldCheck, accent: 'bg-teal-50 text-teal-700 ring-teal-100' },
  { key: 'personalized', icon: ClipboardList, accent: 'bg-rose-50 text-rose-600 ring-rose-100' },
  { key: 'allTones', icon: Palette, accent: 'bg-amber-50 text-amber-700 ring-amber-100' },
];

export function WhyChooseUs() {
  const { language } = useLanguageContext();

  return (
    <section id="why-choose-us" className="relative overflow-hidden bg-[#faf6ef] py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-rose-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-teal-700 ring-1 ring-teal-100">
          {t('nav.whyChooseUs', language)}
        </p>

        <blockquote className="mx-auto mt-8 max-w-3xl">
          <p className="font-serif text-3xl font-medium italic leading-snug text-slate-900 md:text-4xl lg:text-5xl">
            &ldquo;{t('whyChooseUs.sectionTitle', language)}&rdquo;
          </p>
          <footer className="mt-5 text-base font-bold text-teal-800">
            — {t('whyChooseUs.sectionQuoteAttr', language)}
          </footer>
        </blockquote>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          {t('whyChooseUs.sectionSubtitle', language)}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.key}
                className="rounded-3xl border border-white bg-white/70 p-8 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-900/5"
              >
                <span className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${point.accent}`}>
                  <Icon size={26} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {t(`whyChooseUs.${point.key}Title`, language)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t(`whyChooseUs.${point.key}Desc`, language)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}