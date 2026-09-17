import { MapPin, Clock, Phone, MessageCircle, Navigation } from 'lucide-react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { t } from '../../i18n';
import { clinicConfig } from '../../data/config';
import { useWhatsApp } from '../../services/whatsapp';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';

export function Location() {
  const { language } = useLanguageContext();
  const { open: openWhatsApp } = useWhatsApp();

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${clinicConfig.latitude},${clinicConfig.longitude}`;
  const embedUrl = `https://maps.google.com/maps?q=${clinicConfig.latitude},${clinicConfig.longitude}&z=15&output=embed`;

  return (
    <section id="location" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle section="location" />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
                  <MapPin size={22} />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">
                    {language === 'te' ? clinicConfig.clinicNameTe : clinicConfig.clinicName}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {language === 'te' ? clinicConfig.addressTe : clinicConfig.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <Clock size={22} />
                </span>
                <h4 className="mt-4 font-bold text-slate-900">{t('footer.clinicHours', language)}</h4>
                <p className="mt-1 text-sm text-slate-600">
                  {language === 'te' ? clinicConfig.timingsMonSatTe : clinicConfig.timingsMonSatEn}
                </p>
                <p className="mt-0.5 text-sm text-slate-600">
                  {language === 'te' ? clinicConfig.timingsSundayTe : clinicConfig.timingsSundayEn}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Phone size={22} />
                </span>
                <h4 className="mt-4 font-bold text-slate-900">{language === 'te' ? 'ఫోన్' : 'Phone'}</h4>
                <a href={`tel:${clinicConfig.phone.replace(/[^0-9+]/g, '')}`} className="mt-1 block text-sm font-semibold text-slate-700 hover:text-teal-700">
                  {clinicConfig.phone}
                </a>
                {clinicConfig.email && (
                  <a href={`mailto:${clinicConfig.email}`} className="mt-1 block text-sm text-slate-600 hover:text-teal-700">
                    {clinicConfig.email}
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => window.open(mapsUrl, '_blank', 'noopener,noreferrer')}>
                <Navigation size={18} />
                {t('location.getDirections', language)}
              </Button>
              <Button variant="primary" onClick={() => window.open(`tel:${clinicConfig.phone.replace(/[^0-9+]/g, '')}`)}>
                <Phone size={18} />
                {t('location.callNow', language)}
              </Button>
              <Button variant="whatsapp" onClick={() => openWhatsApp()}>
                <MessageCircle size={18} />
                {t('location.bookOnWhatsApp', language)}
              </Button>
            </div>
          </div>

          <div className="min-h-[320px] overflow-hidden rounded-3xl border border-slate-100 shadow-lg shadow-slate-900/5">
            <iframe
              title="Clinic location map"
              src={embedUrl}
              className="h-full min-h-[320px] w-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}