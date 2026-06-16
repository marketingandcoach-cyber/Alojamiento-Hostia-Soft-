export interface BookStyleSettings {
  archetype: string;
  fontTitle: string;
  fontBody: string;
  marginSize: "normal" | "wide" | "compact";
  lineHeight: "relaxed" | "snug";
  dropCap: boolean;
  dropCapStyle: "classic" | "modern" | "ornately" | "minimal";
  dividerStyle: "asterisks" | "diamonds" | "flourish" | "geometric" | "none";
  dividerChar: string;
  pageColor: "cream" | "white" | "sepia" | "charcoal";
  runningHeaderStyle: "title-chapter" | "chapter-page" | "none";
  explanation?: string;
  // --- NEW PROPERTIES FOR SUGGESTION ENGINE ---
  justification?: "justify" | "left";
  paragraphIndent?: "none" | "small" | "medium" | "large";
  paragraphSpacing?: "none" | "small" | "medium" | "large";
  titleAlign?: "center" | "left" | "right";
  titleStyle?: "classic" | "bold-uppercase" | "minimal-light" | "calligraphic";
  fontSizeBody?: "small" | "medium" | "large";
  fontSizeTitle?: "small" | "medium" | "large";
}

export interface Illustration {
  id: string;
  chapterNumber: number;
  paragraphIndex: number; // Insert after this paragraph index (0-indexed) in the chapter
  imageUrl?: string;
  altText?: string;
  caption?: string;
  alignment: "center" | "left" | "right" | "full";
  widthPercent: number; // e.g. 50, 75, 100
  isAiGenerated?: boolean;
  aiPrompt?: string;
}

export interface Chapter {
  chapterNumber: number;
  title: string;
  paragraphs: string[];
  illustrations?: Illustration[];
  voiceSettings?: {
    voiceId: string;
    pitchMultiplier: number;
    speedMultiplier: number;
    vocalModulation: "warm" | "crystalline" | "deep-register" | "studio-reverb" | "none";
    clonedVoiceName?: string;
    isCloned?: boolean;
    voiceRefFile?: string;
  };
  spotifyTrackId?: string;
  spotifyTrackName?: string;
  spotifyArtistName?: string;
  spotifyEmbedUrl?: string;
}

export interface BookMetadata {
  title: string;
  author: string;
  subtitle?: string;
  publisher?: string;
  year?: string;
  isbn?: string;
  safeCreativeId?: string;
  copyrightType?: string;
  licenseDetails?: string;
  publisherLogo?: string; // Base64 image
  logoPlacement?: "credits" | "front_matter" | "both" | "none";
  donationLink?: string; // Optional Buy Me a Coffee or Paypal link
  donationActive?: boolean; // Whether the donation features are enabled
  strictPaywallActive?: boolean; // Whether high-value features require Pro subscription/license activation
  genre?: string;
  trimSize?: string;
  targetPdfImpreso?: boolean;
  targetEpub?: boolean;
  targetEbook?: boolean;
  targetHardcover?: boolean;
  targetAudiolibro?: boolean;
  targetVella?: boolean;
}

export interface SimulatedPage {
  pageNumber: number;
  chapterNumber: number;
  chapterTitle: string;
  paragraphs: string[];
  isChapterOpener: boolean;
  illustrations?: Illustration[];
  isCreditsPage?: boolean;
  isTOCPage?: boolean;
}

export const ARCHETYPES: Record<string, BookStyleSettings> = {
  classic: {
    archetype: "Ficción Narrativa & Novela Histórica",
    fontTitle: "Cormorant Garamond",
    fontBody: "EB Garamond",
    marginSize: "normal",
    lineHeight: "relaxed",
    dropCap: true,
    dropCapStyle: "ornately",
    dividerStyle: "flourish",
    dividerChar: "❦",
    pageColor: "cream",
    runningHeaderStyle: "title-chapter",
    explanation: "El formato bestseller de ficción por excelencia (ej. Planeta, Alfaguara). Emplea fuentes serif pulidas tradicionales de altísima legibilidad, márgenes simétricos equilibrados y hermosos capitulares con florituras tipográficas.",
    justification: "justify",
    paragraphIndent: "medium",
    paragraphSpacing: "none",
    titleAlign: "center",
    titleStyle: "classic",
    fontSizeBody: "medium",
    fontSizeTitle: "large"
  },
  fantasy: {
    archetype: "Fantasía Épica & Ciencia Ficción",
    fontTitle: "Cinzel",
    fontBody: "Crimson Pro",
    marginSize: "wide",
    lineHeight: "relaxed",
    dropCap: true,
    dropCapStyle: "ornately",
    dividerStyle: "diamonds",
    dividerChar: "✦  ✦  ✦",
    pageColor: "sepia",
    runningHeaderStyle: "title-chapter",
    explanation: "Inspirado en los libros de mayor venta de mundos fantásticos y sagas arcanas en Amazon. Emplea mayúsculas solemnes de proporciones romanas clásicas, capitulares heráldicos y un fondo crema envejecido estilo pergamino de lujo.",
    justification: "justify",
    paragraphIndent: "large",
    paragraphSpacing: "none",
    titleAlign: "center",
    titleStyle: "classic",
    fontSizeBody: "large",
    fontSizeTitle: "large"
  },
  thriller: {
    archetype: "Thriller, Intriga & Novela Negra",
    fontTitle: "Outfit",
    fontBody: "Inter",
    marginSize: "normal",
    lineHeight: "snug",
    dropCap: true,
    dropCapStyle: "modern",
    dividerStyle: "asterisks",
    dividerChar: "∗  ∗  ∗",
    pageColor: "charcoal",
    runningHeaderStyle: "chapter-page",
    explanation: "Diseño para novelas de misterio, suspense y acción de ritmo trepidante. Se maqueta con tipografías rotundas de palo seco para títulos, interlineador compacto para aumentar la tensión de lectura y saltos escénicos marcados.",
    justification: "justify",
    paragraphIndent: "small",
    paragraphSpacing: "none",
    titleAlign: "center",
    titleStyle: "bold-uppercase",
    fontSizeBody: "medium",
    fontSizeTitle: "medium"
  },
  selfhelp: {
    archetype: "Desarrollo Personal & Mentalidad",
    fontTitle: "Space Grotesk",
    fontBody: "Lora",
    marginSize: "normal",
    lineHeight: "relaxed",
    dropCap: false,
    dropCapStyle: "minimal",
    dividerStyle: "geometric",
    dividerChar: "❖",
    pageColor: "white",
    runningHeaderStyle: "chapter-page",
    explanation: "Estructura optimizada para los bestsellers de crecimiento, coaching y superación personal. Ofrece una distribución limpia y espaciada con títulos geométricos de alta visibilidad académica y una fuente interior Lora muy placentera.",
    justification: "justify",
    paragraphIndent: "none",
    paragraphSpacing: "medium",
    titleAlign: "left",
    titleStyle: "bold-uppercase",
    fontSizeBody: "medium",
    fontSizeTitle: "medium"
  },
  biography: {
    archetype: "Biografías Oficinales & Ensayos",
    fontTitle: "Playfair Display",
    fontBody: "EB Garamond",
    marginSize: "wide",
    lineHeight: "relaxed",
    dropCap: true,
    dropCapStyle: "modern",
    dividerStyle: "none",
    dividerChar: "—",
    pageColor: "cream",
    runningHeaderStyle: "title-chapter",
    explanation: "La tipografía solemne elegida para memorias ilustres, biografías de líderes y ensayos sociopolíticos rigurosos. Destaca por títulos con serifa noble de gran carisma y un cuerpo de texto señorial e intelectual.",
    justification: "justify",
    paragraphIndent: "medium",
    paragraphSpacing: "none",
    titleAlign: "center",
    titleStyle: "classic",
    fontSizeBody: "medium",
    fontSizeTitle: "large"
  },
  finance: {
    archetype: "Negocios, Finanzas & Emprendimiento",
    fontTitle: "Outfit",
    fontBody: "Inter",
    marginSize: "normal",
    lineHeight: "snug",
    dropCap: false,
    dropCapStyle: "minimal",
    dividerStyle: "geometric",
    dividerChar: "❖",
    pageColor: "white",
    runningHeaderStyle: "chapter-page",
    explanation: "Maquetación pragmática, sobria y limpia ideal para literatura empresarial, startups, marketing o inversión. Centrado en la legibilidad ejecutiva inmediata y la respiración de márgenes idónea para lectura rápida en trayectos.",
    justification: "justify",
    paragraphIndent: "none",
    paragraphSpacing: "medium",
    titleAlign: "left",
    titleStyle: "bold-uppercase",
    fontSizeBody: "small",
    fontSizeTitle: "medium"
  },
  zen: {
    archetype: "Espiritualidad, Yoga & Filosofía Zen",
    fontTitle: "Playfair Display",
    fontBody: "Lora",
    marginSize: "wide",
    lineHeight: "relaxed",
    dropCap: true,
    dropCapStyle: "ornately",
    dividerStyle: "flourish",
    dividerChar: "❦",
    pageColor: "sepia",
    runningHeaderStyle: "none",
    explanation: "Una respiración holística, con amplios espacios sagrados y márgenes soberbios para libros de mindfulness, meditación, espiritualidad o estoicismo clásico. Invita a una lectura pausada y reflexiva de gran confort visual.",
    justification: "justify",
    paragraphIndent: "large",
    paragraphSpacing: "none",
    titleAlign: "center",
    titleStyle: "minimal-light",
    fontSizeBody: "medium",
    fontSizeTitle: "medium"
  },
  romance: {
    archetype: "Romance & Narrativa Escrita Lírica",
    fontTitle: "Cormorant Garamond",
    fontBody: "Crimson Pro",
    marginSize: "normal",
    lineHeight: "relaxed",
    dropCap: true,
    dropCapStyle: "ornately",
    dividerStyle: "diamonds",
    dividerChar: "✦  ✦  ✦",
    pageColor: "cream",
    runningHeaderStyle: "title-chapter",
    explanation: "La elegancia lírica ideal para novelas de amor, drama de época, novelas juveniles románticas o poesía sincera. Utiliza tipos sumamente delicados, capitulares florales y detalles preciosistas de alta costura literaria.",
    justification: "justify",
    paragraphIndent: "medium",
    paragraphSpacing: "none",
    titleAlign: "center",
    titleStyle: "classic",
    fontSizeBody: "medium",
    fontSizeTitle: "large"
  },
  sciencetech: {
    archetype: "Ciencia, Divulgación & Tecnología",
    fontTitle: "Space Grotesk",
    fontBody: "Inter",
    marginSize: "compact",
    lineHeight: "relaxed",
    dropCap: false,
    dropCapStyle: "minimal",
    dividerStyle: "none",
    dividerChar: "—",
    pageColor: "white",
    runningHeaderStyle: "chapter-page",
    explanation: "Estilo ultra-limpio adaptado de los mejores manuales de divulgación científica, IA y ensayos del futuro tecnológico en Amazon. Suprime la capitular clásica a cambio de espaciado técnico exacto y palo seco legible.",
    justification: "justify",
    paragraphIndent: "none",
    paragraphSpacing: "medium",
    titleAlign: "left",
    titleStyle: "bold-uppercase",
    fontSizeBody: "small",
    fontSizeTitle: "small"
  },
  experimental: {
    archetype: "Verso Libre, Poesía & Microrrelato",
    fontTitle: "Cinzel",
    fontBody: "Inter",
    marginSize: "wide",
    lineHeight: "relaxed",
    dropCap: false,
    dropCapStyle: "minimal",
    dividerStyle: "asterisks",
    dividerChar: "∗",
    pageColor: "white",
    runningHeaderStyle: "none",
    explanation: "Formato artístico dedicado a poemarios, microficciones o diarios íntimos de estética minimalista contemporánea. Los textos se justifican o alinean a la izquierda con generosa holgura para abrazar el vacío creador.",
    justification: "left",
    paragraphIndent: "none",
    paragraphSpacing: "large",
    titleAlign: "left",
    titleStyle: "minimal-light",
    fontSizeBody: "medium",
    fontSizeTitle: "medium"
  }
};

// --- MULTI-PUBLISHER SOCIAL GROWTH INTERFACES ---
export interface GroupTarget {
  id: string;
  name: string;
  url: string;
  active: boolean;
}

export interface PlatformConfig {
  code: string;
  name: string;
  enabled: boolean;
  colorClass: string;
  defaultGroups: { name: string; url: string }[];
}

export interface GroupCampaignCopy {
  groupId: string;
  groupName: string;
  uniqueCopy: string;
  shortUrl?: string;
  isPosted?: boolean;
}

export interface MultiPublisherCampaign {
  id: string;
  title: string;
  originalBrief: string;
  niche: string;
  mediaStyle: string;
  createdAt: string;
  copiesByPlatform: Record<string, GroupCampaignCopy[]>;
  mediaPrompt?: string;
  suggestedMime?: string;
  generatedArtUrl?: string;
}

