import { Quote, Info } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';
import { useTestimonials } from '../../services/api';
import { SectionTitle } from '../ui/SectionTitle';
import type { Testimonial } from '../../types';

export function Testimonials() {
  const { language } = useLanguageContext();
  const { data: tes, loading, error } = useTestimonials();

  const verified = (tes ?? []).filter((tm: Testimonial) => tm.is_verified);

  if (loading) {
    return (
      <section id="testimonials" className="bg-[#fdf3f2] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle section="testimonials" />
          <div className="mx-auto max-w-2xl">
            <figure className="relative flex flex-col items-center rounded-3xl border border-white bg-white p-10 text-center shadow-lg shadow-rose-900/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 animate-pulse">
                <Quote size={22} />
              </span>
            </figure>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className="bg-[#fdf3f2] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle section="testimonials" />
          <div className="mx-auto max-w-2xl">
            <figure className="relative flex flex-col items-center rounded-3xl border border-white bg-white p-10 text-center shadow-lg shadow-rose-900/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                <Quote size={22} />
              </span>
              <blockquote className="mt-5 text-base leading-relaxed text-slate-600">
                &ldquo;{t('testimonials.pendingBody', language)}&rdquo;
              </blockquote>
              <p className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-rose-700">
                <Info size={14} className="flex-shrink-0" />
                {t('testimonials.disclaimer', language)}
              </p>
            </figure>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="bg-[#fdf3f2] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle section="testimonials" />

        {verified.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {verified.map((tm: Testimonial) => (
              <figure key={tm.id} className="relative flex flex-col rounded-3xl border border-white bg-white p-8 shadow-lg shadow-rose-900/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                  <Quote size={20} />
                </span>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  &ldquo;{language === 'te' && tm.quote_te ? tm.quote_te : tm.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-slate-100 pt-4">
                  <p className="text-sm font-bold text-slate-900">
                    {language === 'te' && tm.name_te ? tm.name_te : tm.name}
                  </p>
                  {tm.designation && (
                    <p className="text-xs font-medium text-slate-400">
                      {language === 'te' && tm.designation_te ? tm.designation_te : tm.designation}
                    </p>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <figure className="relative flex flex-col items-center rounded-3xl border border-white bg-white p-10 text-center shadow-lg shadow-rose-900/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                <Quote size={22} />
              </span>
              <blockquote className="mt-5 text-base leading-relaxed text-slate-600">
                &ldquo;{t('testimonials.pendingBody', language)}&rdquo;
              </blockquote>
              <p className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-rose-700">
                <Info size={14} className="flex-shrink-0" />
                {t('testimonials.disclaimer', language)}
              </p>
            </figure>
          </div>
        )}
      </div>
    </section>
  );
}