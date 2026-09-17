import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';

const eyebrowKeys: Record<string, string> = {
  services: 'nav.services',
  doctors: 'nav.doctors',
  patientCategories: 'nav.categories',
  whyChooseUs: 'nav.whyChooseUs',
  consultationProcess: 'nav.consultation',
  faq: 'nav.faq',
  location: 'nav.location',
  appointment: 'nav.bookAppointment',
  testimonials: 'testimonials.eyebrow',
};

interface SectionTitleProps {
  section: string;
  align?: 'center' | 'left';
  light?: boolean;
}

export function SectionTitle({ section, align = 'center', light = false }: SectionTitleProps) {
  const { language } = useLanguageContext();

  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <p
        className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide uppercase ${
          light ? 'bg-white/10 text-teal-200' : 'bg-teal-50 text-teal-700'
        }`}
      >
        {t(eyebrowKeys[section] ?? `nav.${section}`, language)}
      </p>
      <h2
        className={`mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        {t(`${section}.sectionTitle`, language)}
      </h2>
      <p
        className={`mt-4 text-base md:text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${
          light ? 'text-teal-100/80' : 'text-slate-600'
        }`}
      >
        {t(`${section}.sectionSubtitle`, language)}
      </p>
    </div>
  );
}