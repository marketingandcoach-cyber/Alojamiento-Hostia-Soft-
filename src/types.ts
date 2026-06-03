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
  // --- NEW LEGAL/ISBN PROPERTIES ---
  isbn?: string;
  safeCreativeId?: string;
  copyrightType?: "todos-derechos" | "creative-commons" | "dominio-publico" | "ninguno";
  licenseDetails?: string;
  publisherLogo?: string; // Base64 image
  logoPlacement?: "credits" | "front_matter" | "both" | "none";
  donationLink?: string; // Optional Buy Me a Coffee or Paypal link
  donationActive?: boolean; // Whether the donation features are enabled
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
    archetype: "Clásico Literario (Cervantes)",
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
    explanation: "El formato clásico por excelencia. Utiliza fuentes serif pulidas tradicionales de alta legibilidad, márgenes profundos para descanso de los dedos y hermosos capitulares con florituras.",
    justification: "justify",
    paragraphIndent: "medium",
    paragraphSpacing: "none",
    titleAlign: "center",
    titleStyle: "classic",
    fontSizeBody: "medium",
    fontSizeTitle: "large"
  },
  modernist: {
    archetype: "Vanguardia Urbana (Cortázar)",
    fontTitle: "Outfit",
    fontBody: "Lora",
    marginSize: "wide",
    lineHeight: "relaxed",
    dropCap: true,
    dropCapStyle: "modern",
    dividerStyle: "geometric",
    dividerChar: "❖",
    pageColor: "white",
    runningHeaderStyle: "chapter-page",
    explanation: "Una puesta en página artística y asimétrica. Ideal para novela moderna o poesía de vanguardia, combinando títulos sans-serif geométricos con un cuerpo estilizado de alto contraste.",
    justification: "justify",
    paragraphIndent: "none",
    paragraphSpacing: "medium",
    titleAlign: "left",
    titleStyle: "bold-uppercase",
    fontSizeBody: "small",
    fontSizeTitle: "medium"
  },
  fantasy: {
    archetype: "Fantasía Épica (Leyenda)",
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
    explanation: "Transporta al lector a mundos arcanos. Emplea mayúsculas solemnes inspiradas en inscripciones romanas, tipografías capitulares heráldicas y un fondo rústico envejecido.",
    justification: "justify",
    paragraphIndent: "large",
    paragraphSpacing: "none",
    titleAlign: "center",
    titleStyle: "classic",
    fontSizeBody: "large",
    fontSizeTitle: "large"
  },
  minimalist: {
    archetype: "Memorias Minimalistas (Borges)",
    fontTitle: "Space Grotesk",
    fontBody: "Inter",
    marginSize: "compact",
    lineHeight: "snug",
    dropCap: false,
    dropCapStyle: "minimal",
    dividerStyle: "none",
    dividerChar: "—",
    pageColor: "white",
    runningHeaderStyle: "none",
    explanation: "Suprime toda decoración superflua. Enfocado exclusivamente en el ritmo puro de la palabra, utilizando tipos de palo seco limpios y una estructura sobria e intelectual.",
    justification: "left",
    paragraphIndent: "none",
    paragraphSpacing: "large",
    titleAlign: "left",
    titleStyle: "minimal-light",
    fontSizeBody: "small",
    fontSizeTitle: "small"
  },
  thriller: {
    archetype: "Noir & Acción (Crimen)",
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
    explanation: "Un contraste de alta tensión. Diseñado con fondo oscuro de confort visual inmediato, tipografías rotundas e implacables, y saltos de escena tajantes cargados de misterio.",
    justification: "justify",
    paragraphIndent: "small",
    paragraphSpacing: "none",
    titleAlign: "center",
    titleStyle: "bold-uppercase",
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

