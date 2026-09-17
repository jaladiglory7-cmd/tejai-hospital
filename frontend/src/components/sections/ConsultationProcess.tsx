import { MessageCircle, Stethoscope, ListChecks, ThumbsUp } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';
import { SectionTitle } from '../ui/SectionTitle';

const steps = [
  { key: 'step1', icon: MessageCircle, color: 'from-teal-500 to-teal-700' },
  { key: 'step2', icon: Stethoscope, color: 'from-rose-500 to-rose-600' },
  { key: 'step3', icon: ListChecks, color: 'from-amber-500 to-amber-600' },
  { key: 'step4', icon: ThumbsUp, color: 'from-green-500 to-green-600' },
];

export function ConsultationProcess() {
  const { language } = useLanguageContext();

  return (
    <section id="consultation-process" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle section="consultationProcess" />

        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden className="absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-teal-200 via-rose-200 to-green-200 lg:block" />
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="relative text-center">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${step.color} shadow-xl shadow-slate-900/10`}>
                  <Icon size={28} className="text-white" />
                </div>
                <span className="mx-auto mt-4 flex h-9 w-12 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700 ring-1 ring-slate-200">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {t(`consultationProcess.${step.key}Title`, language)}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
                  {t(`consultationProcess.${step.key}Desc`, language)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}