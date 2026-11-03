export type Locale = "de" | "en";

export const dict = {
  de: {
    nav_events: "Events", nav_impressions: "Eindrücke", nav_tanju: "Tanju", nav_contact: "Kontakt", nav_archive: "Archiv",
    nav_imprint: "Impressum", nav_privacy: "Datenschutz",
    events: "Events", all_events: "Alle Events", archive: "Archiv", impressions: "Eindrücke", upcoming_empty: "Neue Termine folgen.",
    founder: "Founder & Creative Director",
    tanju_teaser: "DJ, Produzent und Kopf hinter VENYOU. Deep und Melodic House bis Melodic Techno.",
    tanju_more: "Mehr über Tanju",
    tanju_p1: "TANJU ist DJ und Produzent zwischen Wien und Deutschland. Sein Sound bewegt sich durch die Facetten moderner House-Musik: von Deep und Melodic House über treibenden Tech House bis zu Melodic Techno. Hypnotische Grooves, dunklere Atmosphären und starke Percussions prägen seine Sets.",
    tanju_p2: "Seine Geschichte begann 2018 als Produzent im Hip-Hop und R&B, mit Beiträgen zu Projekten im Umfeld internationaler Artists. Mit dem Umzug nach Wien 2024 rückte die Clubkultur in den Vordergrund. Ende 2024 spielte er seinen ersten Club-Gig, seitdem folgten Clubs, Open Airs und besondere Locations in Wien und Deutschland, darunter PRST, X Club, Heaven und das Alando Palais.",
    tanju_p3: "2026 gründete er VENYOU: ein community-orientiertes Eventkonzept, das elektronische Musik mit ausgewählten Locations, hochwertigem Sound und einem starken Gemeinschaftsgefühl verbindet. Driven by sound. Connected by people.",
    booking: "Booking", booking_contact: "Booking & Kontakt",
    newsletter: "Newsletter", newsletter_sub: "Early access. Hidden drops. Extras.", newsletter_cta: "Step inside",
    lineup: "Line-up", tickets: "Tickets", back_program: "Programm", from: "ab",
    kw_label: "Design & Development",
    kw_head1: "Diese Seite", kw_head2: "kommt von Klarwerk.",
    kw_copy: "Websites, 3D und KI-Systeme",
    kw_cta: "Klarwerk Digital entdecken",
    sound_on: "Sound an", sound_off: "Sound aus", menu_open: "Menü öffnen", menu_close: "Menü schließen",
  },
  en: {
    nav_events: "Events", nav_impressions: "Impressions", nav_tanju: "Tanju", nav_contact: "Contact", nav_archive: "Archive",
    nav_imprint: "Imprint", nav_privacy: "Privacy",
    events: "Events", all_events: "All events", archive: "Archive", impressions: "Impressions", upcoming_empty: "New dates coming soon.",
    founder: "Founder & Creative Director",
    tanju_teaser: "DJ, producer and the mind behind VENYOU. Deep and melodic house to melodic techno.",
    tanju_more: "More about Tanju",
    tanju_p1: "TANJU is a DJ and producer based between Vienna and Germany. His sound moves through the shades of contemporary house music: from deep and melodic house to driving tech house and melodic techno. Hypnotic grooves, darker atmospheres and strong percussion shape his sets.",
    tanju_p2: "His story began in 2018 as a producer in hip-hop and R&B, contributing to projects connected to international artists. Moving to Vienna in 2024 brought club culture to the front. He played his first club show at the end of 2024, followed by clubs, open airs and special locations in Vienna and Germany, including PRST, X Club, Heaven and Alando Palais.",
    tanju_p3: "In 2026 he founded VENYOU: a community-driven event concept combining electronic music with selected locations, high-quality sound and a strong sense of community. Driven by sound. Connected by people.",
    booking: "Booking", booking_contact: "Booking & Contact",
    newsletter: "Newsletter", newsletter_sub: "Early access. Hidden drops. Extras.", newsletter_cta: "Step inside",
    lineup: "Line-up", tickets: "Tickets", back_program: "Programme", from: "from",
    kw_label: "Design & Development",
    kw_head1: "This site", kw_head2: "is made by Klarwerk.",
    kw_copy: "Websites, 3D and AI systems",
    kw_cta: "Discover Klarwerk Digital",
    sound_on: "Sound on", sound_off: "Sound off", menu_open: "Open menu", menu_close: "Close menu",
  },
} as const;

export type Key = keyof typeof dict.de;
