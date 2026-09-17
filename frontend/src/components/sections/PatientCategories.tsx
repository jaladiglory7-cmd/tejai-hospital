import { Briefcase, Crown, Smartphone, Sparkles, Baby } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';
import { Card } from '../ui/Card';
import { SectionTitle } from '../ui/SectionTitle';

const items = [
  { key: 'youngProfessionals', icon: Briefcase, color: 'bg-teal-100 text-teal-700' },
  { key: 'preBridal', icon: Crown, color: 'bg-rose-100 text-rose-700' },
  { key: 'genZ', icon: Smartphone, color: 'bg-indigo-100 text-indigo-700' },
  { key: 'antiAging', icon: Sparkles, color: 'bg-amber-100 text-amber-700' },
  { key: 'newMothers', icon: Baby, color: 'bg-pink-100 text-pink-700' },
];

export function PatientCategories() {
  const { language } = useLanguageContext();

  return (
    <section id="who-we-serve" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle section="patientCategories" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.key} hover className="text-center">
                <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}>
                  <Icon size={28} />
                </span>
                <h3 className="mt-5 text-base font-bold text-slate-900">
                  {t(`patientCategories.${item.key}`, language)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t(`patientCategories.${item.key}Desc`, language)}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}