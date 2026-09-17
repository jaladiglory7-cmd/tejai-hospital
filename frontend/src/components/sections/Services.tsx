import { Sparkles, Heart, Sun, Shield, Zap, Eye, Crown, Clock, Scissors, Search, Bug, Stethoscope } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { useServices } from '../../services/api';
import { Card } from '../ui/Card';
import { SectionTitle } from '../ui/SectionTitle';
import { t } from '../../i18n';
import type { Service } from '../../types';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Sparkles, Heart, Sun, Shield, Zap, Eye, Crown, Clock, Scissors, Search, Bug, Stethoscope,
};

const colors = [
  'bg-teal-100 text-teal-700',
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
  'bg-blue-100 text-blue-700',
  'bg-indigo-100 text-indigo-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-orange-100 text-orange-700',
  'bg-cyan-100 text-cyan-700',
  'bg-emerald-100 text-emerald-700',
  'bg-red-100 text-red-700',
  'bg-lime-100 text-lime-700',
];

export function Services() {
  const { language } = useLanguageContext();
  const { data: services } = useServices();

  const go = () => document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle section="services" />

        <div className="flex flex-wrap justify-center gap-6">
          {(services ?? []).map((svc: Service, i: number) => {
            const Icon = iconMap[svc.icon ?? ''] ?? Sparkles;
            return (
              <Card
                key={svc.id}
                hover
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colors[i % colors.length]}`}>
                  <Icon size={26} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {language === 'te' && svc.name_te ? svc.name_te : svc.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {language === 'te' && svc.description_te ? svc.description_te : svc.description}
                </p>
                <button
                  onClick={go}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 transition-colors hover:text-teal-800"
                >
                  {t('services.knowMore', language)}
                  <span aria-hidden>→</span>
                </button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}