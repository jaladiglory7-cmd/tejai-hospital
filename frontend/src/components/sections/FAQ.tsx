import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { useFAQs } from '../../services/api';
import { SectionTitle } from '../ui/SectionTitle';
import type { FAQ } from '../../types';

export function FAQSection() {
  const { language } = useLanguageContext();
  const { data: faqs } = useFAQs();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionTitle section="faq" />

        <div className="space-y-3">
          {(faqs ?? []).map((faq: FAQ) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen ? 'border-teal-300 shadow-lg shadow-teal-900/5' : 'border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-slate-900">
                    {language === 'te' && faq.question_te ? faq.question_te : faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen ? 'rotate-180 bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600">
                      {language === 'te' && faq.answer_te ? faq.answer_te : faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}