// Texte für Impressum und Datenschutz (DE + EN).
// Jeder Abschnitt: Überschrift + Absätze. Zeilenumbrüche innerhalb eines Absatzes mit \n.
// Rechtlich maßgeblich ist die deutsche Fassung.

import type { Locale } from "./i18n";

export type LegalSection = { h: string; p: string[] };
export type LegalDoc = { title: string; intro?: string; sections: LegalSection[]; updated: string };

const anschrift = "Tanju Houssein Oglou\nTH Ventures\nBachstr. 3\n49610 Quakenbrück\nDeutschland";
const anschriftEn = "Tanju Houssein Oglou\nTH Ventures\nBachstr. 3\n49610 Quakenbrück\nGermany";

export const imprint: Record<Locale, LegalDoc> = {
  de: {
    title: "Impressum",
    updated: "Stand: November 2026",
    sections: [
      { h: "Angaben gemäß § 5 DDG", p: [anschrift] },
      { h: "Kontakt", p: ["E-Mail: office@venyou-event.com\nBooking: booking@venyou-event.com"] },
      { h: "Umsatzsteuer-ID", p: ["Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:\nDE430909240"] },
      { h: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV", p: ["Tanju Houssein Oglou\nBachstr. 3, 49610 Quakenbrück"] },
      {
        h: "Verbraucherstreitbeilegung",
        p: ["Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."],
      },
      {
        h: "Haftung für Inhalte und Links",
        p: [
          "Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte, insbesondere von Eventangaben wie Line-up, Uhrzeit und Ort, übernehmen wir keine Gewähr; kurzfristige Änderungen sind möglich.",
          "Diese Website enthält Links zu externen Websites Dritter (z. B. Ticketanbieter, Instagram, Newsletter-Anmeldung). Auf deren Inhalte haben wir keinen Einfluss; für sie ist der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir solche Links umgehend.",
        ],
      },
      {
        h: "Urheberrecht",
        p: ["Texte, Fotos, Logos und Musik auf dieser Website sind urheberrechtlich geschützt. Eine Verwendung außerhalb dieser Website ist nur mit vorheriger schriftlicher Zustimmung erlaubt."],
      },
      { h: "Design & Development", p: ["Klarwerk Digital – klarwerk-digital.com"] },
    ],
  },
  en: {
    title: "Imprint",
    intro: "Translation for convenience. The German version is legally binding.",
    updated: "Last updated: November 2026",
    sections: [
      { h: "Information pursuant to § 5 DDG (German Digital Services Act)", p: [anschriftEn] },
      { h: "Contact", p: ["Email: office@venyou-event.com\nBooking: booking@venyou-event.com"] },
      { h: "VAT ID", p: ["VAT identification number pursuant to § 27a UStG:\nDE430909240"] },
      { h: "Responsible for content pursuant to § 18 (2) MStV", p: ["Tanju Houssein Oglou\nBachstr. 3, 49610 Quakenbrück, Germany"] },
      {
        h: "Consumer dispute resolution",
        p: ["We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board."],
      },
      {
        h: "Liability for content and links",
        p: [
          "The content of this website has been created with the greatest possible care. We do not guarantee that it is accurate, complete or up to date, in particular event details such as line-up, time and venue; changes at short notice are possible.",
          "This website contains links to external third-party websites (e.g. ticket providers, Instagram, newsletter sign-up). We have no influence on their content; the respective provider is responsible for it. If we become aware of any infringement, we will remove such links immediately.",
        ],
      },
      {
        h: "Copyright",
        p: ["Texts, photos, logos and music on this website are protected by copyright. Any use outside this website requires prior written consent."],
      },
      { h: "Design & Development", p: ["Klarwerk Digital – klarwerk-digital.com"] },
    ],
  },
};

export const privacy: Record<Locale, LegalDoc> = {
  de: {
    title: "Datenschutz",
    intro: "Wir nehmen den Schutz deiner Daten ernst. Diese Website kommt ohne Tracking, ohne Analyse-Tools und ohne Werbe-Cookies aus. Auf der Startseite ist ein Spotify-Player eingebunden (siehe Abschnitt 9). Hier steht, welche Daten trotzdem anfallen und was mit ihnen passiert.",
    updated: "Stand: November 2026",
    sections: [
      {
        h: "1. Verantwortlicher",
        p: [`${anschrift}\nE-Mail: office@venyou-event.com`],
      },
      {
        h: "2. Hosting und Server-Logfiles",
        p: [
          "Diese Website wird von Klarwerk Digital betreut und auf Servern der Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Deutschland, betrieben. Die Server stehen in der EU.",
          "Beim Aufruf der Website verarbeitet der Server automatisch Daten, die dein Browser übermittelt: IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL, Browser und Betriebssystem. Das ist technisch nötig, um die Website auszuliefern und ihre Sicherheit und Stabilität zu gewährleisten.",
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren, funktionierenden Betrieb). Die Logfiles werden nur so lange gespeichert, wie es dafür erforderlich ist, und anschließend gelöscht. Mit den Dienstleistern bestehen bzw. werden Verträge zur Auftragsverarbeitung nach Art. 28 DSGVO geschlossen.",
        ],
      },
      {
        h: "3. Kontakt per E-Mail",
        p: [
          "Wenn du uns per E-Mail schreibst (z. B. an booking@venyou-event.com), verarbeiten wir deine Angaben, um deine Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um eine Buchung oder Zusammenarbeit geht, sonst Art. 6 Abs. 1 lit. f DSGVO. Wir löschen die Daten, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
        ],
      },
      {
        h: "4. Spracheinstellung",
        p: [
          "Wenn du die Sprache (DE/EN) umschaltest, wird deine Auswahl im lokalen Speicher deines Browsers (Local Storage) abgelegt, damit die Seite beim nächsten Besuch in deiner Sprache erscheint. Diese Information verlässt dein Gerät nicht und wird nicht an uns übertragen. Das Speichern erfolgt nur auf deinen ausdrücklichen Wunsch (§ 25 Abs. 2 Nr. 2 TDDDG). Du kannst den Eintrag jederzeit über die Einstellungen deines Browsers löschen.",
        ],
      },
      {
        h: "5. Schriftarten, Bilder und Musik",
        p: [
          "Schriftarten, Fotos und die Musik auf dieser Website werden direkt von unserem Server geladen. Es besteht keine Verbindung zu Google Fonts oder anderen externen Diensten. Die Hintergrundmusik kannst du unten links jederzeit ausschalten.",
        ],
      },
      {
        h: "6. Newsletter",
        p: [
          "Für unseren Newsletter „Beyond Public“ nutzen wir rapidmail (rapidmail GmbH, Wentzingerstraße 21, 79106 Freiburg i. Br., Deutschland). Der Button „Step inside“ führt zum Anmeldeformular bei rapidmail. Erst dort gibst du Daten ein (mindestens deine E-Mail-Adresse).",
          "Die Anmeldung erfolgt im Double-Opt-in-Verfahren: Du bekommst eine E-Mail und bestätigst die Anmeldung. Rechtsgrundlage ist deine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Du kannst sie jederzeit widerrufen, z. B. über den Abmeldelink in jedem Newsletter oder per E-Mail an uns. rapidmail verarbeitet die Daten in unserem Auftrag in der EU; eine Übermittlung in Drittstaaten findet nicht statt.",
        ],
      },
      {
        h: "7. Tickets",
        p: [
          "Tickets für unsere Events werden über externe Ticketanbieter oder die jeweilige Location verkauft. Wenn du einem Ticket-Link folgst, verlässt du diese Website. Für die Datenverarbeitung beim Ticketkauf ist der jeweilige Anbieter verantwortlich; es gilt dessen Datenschutzerklärung.",
        ],
      },
      {
        h: "8. Links zu Instagram, SoundCloud, WhatsApp und anderen Websites",
        p: [
          "Auf dieser Website verlinken wir auf Instagram (Meta Platforms Ireland Ltd.), SoundCloud (SoundCloud Global Limited & Co. KG), unsere WhatsApp-Community (WhatsApp Ireland Ltd.) und Spotify. Es handelt sich um einfache Links, nicht um eingebettete Inhalte oder Plugins: Erst wenn du einen Link anklickst, werden Daten an den jeweiligen Anbieter übertragen. Dafür gilt dessen Datenschutzerklärung.",
          "Wenn du unserer WhatsApp-Community beitrittst, sehen die Administratoren und andere Mitglieder deine Telefonnummer und deinen Profilnamen. Du kannst die Community jederzeit wieder verlassen.",
        ],
      },
      {
        h: "9. Spotify-Player",
        p: [
          "Auf der Startseite kannst du unsere Playlist in einem Spotify-Player abspielen (Spotify AB, Regeringsgatan 19, 111 53 Stockholm, Schweden). Der Player wird geladen, sobald du zu diesem Bereich der Seite scrollst.",
          "Dabei überträgt dein Browser Daten an Spotify, u. a. deine IP-Adresse und technische Informationen über dein Gerät; Spotify kann dabei Cookies setzen. Wir binden den Player ein, um unsere Musik direkt auf der Website hörbar zu machen (Art. 6 Abs. 1 lit. f DSGVO). Weitere Infos: spotify.com/de/legal/privacy-policy",
        ],
      },
      {
        h: "10. Fotos von Events",
        p: [
          "Auf unseren Events wird fotografiert und gefilmt. Ausgewählte Aufnahmen zeigen wir auf dieser Website und auf Social Media, um über unsere Events zu berichten (Art. 6 Abs. 1 lit. f DSGVO). Wenn du auf einem Foto zu sehen bist und es entfernt haben möchtest, schreib uns einfach an office@venyou-event.com.",
        ],
      },
      {
        h: "11. Deine Rechte",
        p: [
          "Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21). Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen.",
          "Du kannst dich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren. Für uns zuständig ist: Der Landesbeauftragte für den Datenschutz Niedersachsen, Prinzenstraße 5, 30159 Hannover.",
          "Für alle Anfragen zum Datenschutz: office@venyou-event.com",
        ],
      },
      {
        h: "12. Verschlüsselung",
        p: ["Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Du erkennst das am Schloss-Symbol und an „https://“ in der Adresszeile."],
      },
    ],
  },
  en: {
    title: "Privacy",
    intro: "We take the protection of your data seriously. This website uses no tracking, no analytics tools and no advertising cookies. The home page includes an embedded Spotify player (see section 9). This page explains which data is still processed and what happens to it. Translation for convenience; the German version is legally binding.",
    updated: "Last updated: November 2026",
    sections: [
      {
        h: "1. Controller",
        p: [`${anschriftEn}\nEmail: office@venyou-event.com`],
      },
      {
        h: "2. Hosting and server log files",
        p: [
          "This website is maintained by Klarwerk Digital and runs on servers of Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Germany. The servers are located in the EU.",
          "When you visit the website, the server automatically processes data sent by your browser: IP address, date and time of access, page requested, referrer URL, browser and operating system. This is technically necessary to deliver the website and to keep it secure and stable.",
          "The legal basis is Art. 6 (1) (f) GDPR (legitimate interest in secure and reliable operation). Log files are kept only as long as necessary for this purpose and are then deleted. Data processing agreements pursuant to Art. 28 GDPR are in place or being concluded with the service providers.",
        ],
      },
      {
        h: "3. Contact by email",
        p: [
          "If you email us (e.g. at booking@venyou-event.com), we process your details to answer your request. The legal basis is Art. 6 (1) (b) GDPR where it concerns a booking or collaboration, otherwise Art. 6 (1) (f) GDPR. We delete the data once your request has been dealt with, unless statutory retention obligations apply.",
        ],
      },
      {
        h: "4. Language setting",
        p: [
          "If you switch the language (DE/EN), your choice is saved in your browser's local storage so the site appears in your language on your next visit. This information stays on your device and is not sent to us. It is only stored at your explicit request (§ 25 (2) no. 2 TDDDG). You can delete it at any time in your browser settings.",
        ],
      },
      {
        h: "5. Fonts, images and music",
        p: [
          "Fonts, photos and music on this website are loaded directly from our own server. There is no connection to Google Fonts or other external services. You can switch off the background music at any time at the bottom left.",
        ],
      },
      {
        h: "6. Newsletter",
        p: [
          "For our newsletter “Beyond Public” we use rapidmail (rapidmail GmbH, Wentzingerstraße 21, 79106 Freiburg i. Br., Germany). The “Step inside” button leads to the sign-up form hosted by rapidmail. You only enter data there (at least your email address).",
          "Sign-up uses a double opt-in: you receive an email and confirm your subscription. The legal basis is your consent pursuant to Art. 6 (1) (a) GDPR. You can withdraw it at any time, e.g. via the unsubscribe link in every newsletter or by emailing us. rapidmail processes the data on our behalf within the EU; no data is transferred to third countries.",
        ],
      },
      {
        h: "7. Tickets",
        p: [
          "Tickets for our events are sold through external ticket providers or the respective venue. When you follow a ticket link, you leave this website. The respective provider is responsible for data processing during ticket purchase; their privacy policy applies.",
        ],
      },
      {
        h: "8. Links to Instagram, SoundCloud, WhatsApp and other websites",
        p: [
          "This website links to Instagram (Meta Platforms Ireland Ltd.), SoundCloud (SoundCloud Global Limited & Co. KG), our WhatsApp community (WhatsApp Ireland Ltd.) and Spotify. These are plain links, not embedded content or plugins: data is only transferred to the respective provider once you click a link. Their privacy policy applies.",
          "If you join our WhatsApp community, the admins and other members can see your phone number and profile name. You can leave the community at any time.",
        ],
      },
      {
        h: "9. Spotify player",
        p: [
          "On the home page you can play our playlist in a Spotify player (Spotify AB, Regeringsgatan 19, 111 53 Stockholm, Sweden). The player is loaded as soon as you scroll to this part of the page.",
          "Your browser then sends data to Spotify, including your IP address and technical information about your device; Spotify may set cookies. We embed the player so that our music can be played directly on the website (Art. 6 (1) (f) GDPR). More information: spotify.com/legal/privacy-policy",
        ],
      },
      {
        h: "10. Event photos",
        p: [
          "Photos and videos are taken at our events. We show selected shots on this website and on social media to report on our events (Art. 6 (1) (f) GDPR). If you appear in a photo and would like it removed, just email us at office@venyou-event.com.",
        ],
      },
      {
        h: "11. Your rights",
        p: [
          "You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and to object to processing based on legitimate interests (Art. 21). You can withdraw any consent at any time with effect for the future.",
          "You also have the right to lodge a complaint with a data protection supervisory authority. The authority responsible for us is: Der Landesbeauftragte für den Datenschutz Niedersachsen, Prinzenstraße 5, 30159 Hannover, Germany.",
          "For all privacy enquiries: office@venyou-event.com",
        ],
      },
      {
        h: "12. Encryption",
        p: ["For security reasons this website uses SSL/TLS encryption. You can recognise this by the padlock icon and “https://” in the address bar."],
      },
    ],
  },
};
