import { MapPin, Phone, Mail, Clock, MessageCircle, Globe, AtSign, Share2, Link } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';
import { clinicConfig } from '../../data/config';
import { useWhatsApp } from '../../services/whatsapp';

const quarterLinks = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.services', href: '#services' },
  { key: 'nav.doctors', href: '#doctors' },
];

const secondLinks = [
  { key: 'nav.whyChooseUs', href: '#why-choose-us' },
  { key: 'nav.faq', href: '#faq' },
  { key: 'nav.location', href: '#location' },
];

const socialIcons = [
  { key: 'facebook', icon: Globe },
  { key: 'instagram', icon: AtSign },
  { key: 'twitter', icon: Share2 },
  { key: 'youtube', icon: Link },
] as const;

export function Footer() {
  const { language } = useLanguageContext();
  const { open: openWhatsApp } = useWhatsApp();
  const year = new Date().getFullYear();

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socials = clinicConfig.socials ?? {};

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-36 sm:px-6 lg:px-8 lg:pb-44">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-lg font-bold text-white">
                T
              </span>
              <span className="text-left leading-tight">
                <span className="block text-xl font-bold text-white">
                  Tej<span className="text-teal-400">AI</span>
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  {t('footer.brandTech', language)}
                </span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">{t('footer.description', language)}</p>
            {clinicConfig.website && (
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <Globe size={15} className="text-teal-400" />
                <a
                  href={`https://${clinicConfig.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-teal-300 hover:text-teal-200"
                >
                  {clinicConfig.website}
                </a>
              </p>
            )}
            {socialIcons.some((s) => socials[s.key]) && (
              <div className="mt-5 flex items-center gap-3">
                {socialIcons.map(({ key, icon: Icon }) =>
                  socials[key] ? (
                    <a
                      key={key}
                      href={socials[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition-colors hover:bg-teal-500 hover:text-white"
                    >
                      <Icon size={16} />
                    </a>
                  ) : null,
                )}
              </div>
            )}
            <button
              onClick={() => openWhatsApp()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-500"
            >
              <MessageCircle size={16} />
              {t('whatsapp.float', language)}
            </button>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{t('footer.quickLinks', language)}</h3>
            <ul className="mt-5 space-y-3">
              {quarterLinks.concat(secondLinks).map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => go(link.href)}
                    className="text-slate-400 transition-colors hover:text-teal-300"
                  >
                    {t(link.key, language)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{t('footer.contactUs', language)}</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-teal-400" />
                <span className="text-slate-400">
                  {language === 'te' ? clinicConfig.addressTe : clinicConfig.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-teal-400" />
                <a href={`tel:${clinicConfig.phone.replace(/[^0-9+]/g, '')}`} className="text-slate-400 hover:text-teal-300">
                  {clinicConfig.phone}
                </a>
              </li>
              {clinicConfig.email && (
                <li className="flex items-center gap-3">
                  <Mail size={18} className="flex-shrink-0 text-teal-400" />
                  <a href={`mailto:${clinicConfig.email}`} className="text-slate-400 hover:text-teal-300">
                    {clinicConfig.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{t('footer.clinicHours', language)}</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Clock size={18} className="flex-shrink-0 text-teal-400" />
                <span className="text-slate-400">{language === 'te' ? clinicConfig.timingsMonSatTe : clinicConfig.timingsMonSatEn}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="flex-shrink-0 text-teal-400" />
                <span className="text-slate-400">{language === 'te' ? clinicConfig.timingsSundayTe : clinicConfig.timingsSundayEn}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-slate-800 pt-8">
          <p className="text-center text-sm text-slate-500">
            &copy; {year} {t('footer.copyright', language)}
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-center text-xs leading-relaxed text-slate-600">
            {t('footer.disclaimer', language)}
          </p>
        </div>
      </div>
    </footer>
  );
}