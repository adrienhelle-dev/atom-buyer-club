import { translations } from "@/lib/i18n";

const BASE_URL = "https://www.atombuyersclub.fr";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Atom Buyers Club",
  legalName: "Microsurfaces SAS",
  url: BASE_URL,
  logo: `${BASE_URL}/icon.svg`,
  description:
    "Club privé d'investisseurs — micro-logements parisiens clé-en-main : sourcing, rénovation premium et loyer garanti en bail société.",
  areaServed: { "@type": "City", name: "Paris" },
  sameAs: ["https://www.instagram.com/atom.living"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "adrien.helle@atom-capital.fr",
    contactType: "sales",
    availableLanguage: ["French", "English"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: translations.fr.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
