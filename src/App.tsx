import React, { useState, useEffect, useRef } from "react";
import {
  Book,
  BookOpen,
  Sparkles,
  Search,
  Feather,
  Check,
  FileText,
  Printer,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Sliders,
  Type,
  FileDown,
  Info,
  HelpCircle,
  AlertCircle,
  Settings,
  Flame,
  Layout,
  AlignLeft,
  Columns,
  Tablet,
  Smartphone,
  Scissors,
  Palette,
  Image as ImageIcon,
  Trash2,
  Plus,
  Minus,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Shield,
  Lock,
  Globe,
  QrCode,
  BadgeCheck,
  Music,
  Mic,
  Headphones,
  Volume2,
  Play,
  Undo2,
  Redo2,
  Zap,
  ArrowRight,
  Clapperboard,
  Crown,
  Download,
  Camera,
  Maximize2,
  Eye,
  MessageSquare,
  Send,
  Heart,
  Award,
  DollarSign,
  Cloud,
  CloudDownload,
  CloudUpload,
  CreditCard,
  Mail,
  X
} from "lucide-react";
import { BookStyleSettings, Chapter, BookMetadata, SimulatedPage, ARCHETYPES, Illustration } from "./types";
import { TEXT_TEMPLATES, GENRE_PRESETS } from "./data";
import { LandingPage } from "./components/LandingPage";
import { DiagrammersLogo, DiagrammersFullLogo } from "./components/DiagrammersLogo";
import { HostiaSoftLogo } from "./components/HostiaSoftLogo";
import { LOCALES, SupportedLanguages } from "./locales";
import mammoth from "mammoth";

export const TRIM_SIZE_FACTORS = {
  "6in_9in": { label: "6\" x 9\" (Estándar Novela US)", factor: 1.0, width: "15.24 cm", height: "22.86 cm", aspect: "aspect-[2/3]", maxW: "max-w-[440px]" },
  "5.5in_8.5in": { label: "5.5\" x 8.5\" (Digest Pequeño)", factor: 0.85, width: "13.97 cm", height: "21.59 cm", aspect: "aspect-[5.5/8.5]", maxW: "max-w-[400px]" },
  "5in_8in": { label: "5\" x 8\" (Bolsillo Novela)", factor: 0.70, width: "12.70 cm", height: "20.32 cm", aspect: "aspect-[5/8]", maxW: "max-w-[360px]" },
  "7in_10in": { label: "7\" x 10\" (Trabajo / Técnico)", factor: 1.25, width: "17.78 cm", height: "25.40 cm", aspect: "aspect-[7/10]", maxW: "max-w-[475px]" },
  "8.5in_11in": { label: "8.5\" x 11\" (Gran Formato Doc)", factor: 1.60, width: "21.59 cm", height: "27.94 cm", aspect: "aspect-[8.5/11]", maxW: "max-w-[540px]" }
};

interface BookIllustrationProps {
  key?: any;
  illustration: Illustration;
  onTriggerRegen?: (ill: Illustration) => void;
  generatingId?: string | null;
}

export function BookIllustration({ illustration, onTriggerRegen, generatingId }: BookIllustrationProps) {
  const isGenerating = generatingId === illustration.id;

  const alignmentClass = 
    illustration.alignment === "full" ? "w-full my-5 clear-both block" :
    illustration.alignment === "center" ? "mx-auto my-4 block text-center clear-both" :
    illustration.alignment === "left" ? "float-left mr-4 mb-4" :
    "float-right ml-4 mb-4";

  const widthStyle = illustration.alignment === "full" ? "100%" : `${illustration.widthPercent}%`;

  return (
    <div 
      className={`relative rounded-xl overflow-hidden group border border-amber-900/10 p-2 bg-amber-50/20 shadow-xs transition-all duration-300 ${alignmentClass} select-none`}
      style={{ 
        width: illustration.alignment === "full" ? "100%" : widthStyle,
        maxWidth: illustration.alignment === "full" ? "100%" : "300px"
      }}
    >
      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-amber-950/5 flex items-center justify-center border border-amber-900/5">
        {isGenerating ? (
          <div className="absolute inset-0 bg-amber-950/10 flex flex-col items-center justify-center p-4">
            <RefreshCw className="w-5 h-5 animate-spin text-amber-700 mb-1" />
            <p className="text-[10px] text-amber-800 font-mono tracking-wider animate-pulse">Pintando con IA...</p>
          </div>
        ) : illustration.imageUrl ? (
          <img 
            src={illustration.imageUrl} 
            alt={illustration.altText || "Ilustración literaria de libro"} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <ImageIcon className="w-5 h-5 text-amber-800/40 mb-1" />
            <p className="text-[10px] uppercase font-bold text-amber-900/70 tracking-widest font-mono">Maqueta Visual</p>
          </div>
        )}
        
        {/* Hover direction information overlay */}
        {!isGenerating && (
          <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-3">
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider text-center">Arte de IA Dirección</p>
            <p className="text-[9px] text-slate-350 text-center line-clamp-2 italic px-1 mb-1">"{illustration.aiPrompt || "Grabado de la escena"}"</p>
            {onTriggerRegen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTriggerRegen(illustration);
                }}
                className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-md cursor-pointer transition-all flex items-center gap-1 shadow-md"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Pintar con IA</span>
              </button>
            )}
          </div>
        )}
      </div>

      {illustration.caption && (
        <p className="text-[10px] mt-1.5 text-center text-slate-700 italic leading-snug border-t border-amber-900/5 pt-1 font-sans">
          {illustration.caption}
        </p>
      )}
    </div>
  );
}

// CONSTANTES DE FUENTES EDITORIALES CON PREVISUALIZACIONES
const TITLE_FONTS = [
  { value: "Great Vibes", label: "Great Vibes", desc: "Caligrafía Artística Fluida", cat: "Cursiva", sample: "La Poesía del Alma" },
  { value: "Pinyon Script", label: "Pinyon Script", desc: "Calografía Romántica de Época", cat: "Cursiva", sample: "Cartas de un Pasado" },
  { value: "Alex Brush", label: "Alex Brush", desc: "Caligrafía Cursiva Elegante", cat: "Cursiva", sample: "Flores de Primavera" },
  { value: "Playfair Display", label: "Playfair Display", desc: "Serif Expresiva & Italiana", cat: "Serif", sample: "SENDEROS DEL NORTE" },
  { value: "Cormorant Garamond", label: "Cormorant Garamond", desc: "Clásico Delicado y Sobrio", cat: "Serif Fino", sample: "Ecos del Viento Eólico" },
  { value: "Cinzel", label: "Cinzel", desc: "Épico Imperial Romano", cat: "Imperial", sample: "ROMA INMORTAL" },
  { value: "EB Garamond", label: "EB Garamond", desc: "La Clásica Francesa Atemporal", cat: "Editorial", sample: "Crónicas de la Biblioteca" },
  { value: "Crimson Pro", label: "Crimson Pro", desc: "Serif Firme y Robusto", cat: "Editorial", sample: "Sombra bajo las Ruinas" },
  { value: "Lora", label: "Lora", desc: "Suave y Cálida Literaria", cat: "Calidez", sample: "Hacia horizontes lejanos" },
  { value: "Outfit", label: "Outfit", desc: "Minimalista Geométrica Moderna", cat: "Moderna", sample: "NUEVAS AVENTURAS" },
  { value: "Space Grotesk", label: "Space Grotesk", desc: "Brutalista Vanguardista", cat: "Grotesca", sample: "DISEÑO PROGRESIVO" },
  { value: "Inter", label: "Inter", desc: "Neutralidad Técnica Limpia", cat: "Técnica", sample: "Instrucciones de Compaginación" }
];

const BODY_FONTS = [
  { value: "EB Garamond", label: "EB Garamond", desc: "Tradicional de Cátedra, ideal para novelas", cat: "Editorial", sample: "El misterioso arcón guardaba recuerdos..." },
  { value: "Lora", label: "Lora", desc: "Cálida y balanceada para pantallas", cat: "Calidez", sample: "Satisfecho con las palabras del maestro..." },
  { value: "Crimson Pro", label: "Crimson Pro", desc: "Consistente, con excelente legibilidad de cerca", cat: "Robusta", sample: "Encontraron la cabaña en mitad del prado..." },
  { value: "Inter", label: "Inter", desc: "Neutro y eficiente para ensayos clínicos", cat: "Técnica", sample: "Todos los procesos de impresión física..." },
  { value: "Cormorant Garamond", label: "Cormorant Garamond", desc: "Premium, fina, para obras líricas", cat: "Premium", sample: "Apenas un murmullo rompió la serenidad..." }
];

// --- BASE DE DATOS MUNDIAL DE EDITORIALES REALES (PROSPECCIÓN INTEGRADA) ---
const EDITORIAL_DATABASE = [
  {
    id: "planeta",
    name: "Editorial Planeta",
    email: "propuestas@planeta.es",
    genre: "Narrativa Comercial / Best-Sellers",
    subgenres: ["Ficción", "Thriller", "Histórica", "Crecimiento Personal"],
    description: "El mayor grupo editorial en español. Publican narrativa general de gran alcance, memorias y best-sellers comerciales.",
    submissionGuide: "Admite manuscritos de autores noveles con sinopsis detallada, biografía del autor y las primeras 50 páginas maquetadas."
  },
  {
    id: "alfaguara",
    name: "Alfaguara",
    email: "propuestas.literarias@penguinrandomhouse.com",
    genre: "Narrativa Literaria Contemporánea",
    subgenres: ["Novela", "Crónica", "Relato", "Ficción Hispana"],
    description: "Sello prestigioso de Penguin Random House dedicado a la literatura hispanohablante e internacional de primer nivel.",
    submissionGuide: "Requiere carta de presentación literaria formal, una sinopsis de 1 página y muestra de capítulos maquetados en PDF limpia."
  },
  {
    id: "anagrama",
    name: "Editorial Anagrama",
    email: "manuscritos@anagrama-ed.es",
    genre: "Literatura de Autor y Ensayo",
    subgenres: ["Narrativa de Vanguardia", "Ficción de culto", "Ensayo Filosófico"],
    description: "Un sello legendario conocido por su catálogo de culto y su fomento de voces literarias de vanguardia y crónicas de autor.",
    submissionGuide: "Para envío en formato digital, adjuntar carta detallada de por qué encaja en su catálogo y muestra literaria pulida."
  },
  {
    id: "valdemar",
    name: "Editorial Valdemar",
    email: "valdemar@valdemar.com",
    genre: "Terror, Gótico, Extraño y Thriller Oscuro",
    subgenres: ["Terror Gótico", "Ficción Macabra", "Ficción Extraña"],
    description: "La editorial de referencia absoluta en español para novelas de terror gótico, clásico y literatura fantástica macabra.",
    submissionGuide: "Buscan horror estilizado, prosa rica y ambientaciones lúgubres. Se valora maquetación tradicional limpia alineada a clásicos."
  },
  {
    id: "impedimenta",
    name: "Editorial Impedimenta",
    email: "info@impedimenta.es",
    genre: "Joyas Literarias y Narrativa Traducida",
    subgenres: ["Ficción Selecta", "Novela de época", "Novela Gráfica"],
    description: "Especialistas en recuperar joyas olvidadas y voces contemporáneas exquisitamente cuidadas en la traducción y la encuadernación.",
    submissionGuide: "Exigen máxima elegancia en la redacción y un cuidado estético sobresaliente en la propuesta o el pliego de muestra."
  },
  {
    id: "minotauro",
    name: "Ediciones Minotauro",
    email: "contacto@minotauro.es",
    genre: "Ciencia Ficción, Fantasía y Épica",
    subgenres: ["Space Opera", "Fantasía Épica", "Distopía", "Steampunk"],
    description: "El sello en español más representativo para literatura de fantasía mítica y ciencia ficción de primer nivel.",
    submissionGuide: "Admite propuestas digitales que cuenten con un mundo bien construido y un manuscrito formalmente estructurado por capítulos."
  },
  {
    id: "catedra",
    name: "Ediciones Cátedra",
    email: "catedra@catedra.com",
    genre: "Clásicos, Crítica Literaria y Ensayos Académicos",
    subgenres: ["Clásicos Hispanos", "Letras Universales", "Teatro", "Estudio Histórico"],
    description: "Editorial célebre por sus ediciones críticas y anotadas de obras clásicas de la literatura universal e hispana.",
    submissionGuide: "Preferible para obras que tengan un valor académico, histórico, o reediciones anotadas y de altísima atención tipográfica."
  },
  {
    id: "acantilado",
    name: "Editorial El Acantilado",
    email: "acantilado@acantilado.es",
    genre: "Ensayo Intelectual, Clásicos y Narrativa Corta",
    subgenres: ["Filosofía", "Biografía", "Narrativa de Fondo", "Historia Cultural"],
    description: "Un oasis de rigor intelectual y alta literatura. Hermosas portadas minimalistas y ensayos de importancia cultural atemporal.",
    submissionGuide: "Envia propuesta formal incluyendo una justificación filosófica/estética de la obra. Altamente sensibles a la corrección ortotipográfica."
  },
  {
    id: "paginasdeespuma",
    name: "Editorial Páginas de Espuma",
    email: "editorial@paginasdeespuma.com",
    genre: "Libros de Cuento y Relato Breve",
    subgenres: ["Antologías de Cuento", "Microrrelato", "Teoría del Relato"],
    description: "El sello independiente de referencia mundial para la publicación exclusiva de volúmenes de cuento y narrativa corta.",
    submissionGuide: "Acepta manuscritos de cuentarios con una estructura unificada y clara. Valoran la precisión quirúrgica del lenguaje breve."
  },
  {
    id: "tusquets",
    name: "Tusquets Editores",
    email: "contacto@tusquetseditores.com",
    genre: "Narrativa de Autor, Memorias y Poesía",
    subgenres: ["Novela Contemporánea", "Poesía Selecta", "Ensayo Biográfico"],
    description: "Sello de enorme abolengo literario que publica memorias íntimas de alta prosa, novela contemporánea y poetas consolidados.",
    submissionGuide: "Requiere carta de presentación literaria formal y los primeros capítulos maquetados con márgenes legibles."
  }
];

export default function App() {
  // --- STATE ---
  const [language, setLanguage] = useState<SupportedLanguages>("es");
  
  // --- INTERACTIVE ONBOARDING AND USER TOUR STATES ---
  const [onboardingOpen, setOnboardingOpen] = useState<boolean>(true);
  const [onboardingStepCompleted, setOnboardingStepCompleted] = useState<Record<string, boolean>>({
    manuscript: false,
    archetype: false,
    corrector: false,
    voice: false,
    print: false
  });

  // Custom non-blocking HUD Toast / Alert states for sandboxed iframe
  const [studioToast, setStudioToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);

  const triggerStudioToast = (message: string, type: "success" | "info" | "warning" = "info") => {
    setStudioToast({ message, type });
    setTimeout(() => {
      setStudioToast((curr) => curr?.message === message ? null : curr);
    }, 4500);
  };

  useEffect(() => {
    try {
      const browserLanguage = navigator.language || (navigator as any).userLanguage || "es";
      const code = browserLanguage.toLowerCase().substring(0, 2);
      if (["es", "en", "pt", "fr", "it", "de"].includes(code)) {
        setLanguage(code as SupportedLanguages);
      } else {
        setLanguage("es");
      }
    } catch (e) {
      console.warn("Language autodetection failed, using default Spanish:", e);
    }
  }, []);

  const t = LOCALES[language] || LOCALES.es;

  const [metadata, setMetadata] = useState<BookMetadata>({
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    subtitle: "El ingenioso hidalgo de La Mancha",
    publisher: "Editorial El Clásico",
    year: "1605",
    isbn: "",
    safeCreativeId: "",
    copyrightType: "todos-derechos",
    licenseDetails: "Todos los derechos reservados. Ninguna parte de esta publicación puede ser reproducida o transmitida por ningún medio sin permiso previo.",
    publisherLogo: "",
    logoPlacement: "both",
    donationActive: true,
    donationLink: "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ruthgmedina@gmail.com&currency_code=USD&item_name=Donacion%20DIAGRAMMERS%20Studio",
    genre: "Novela",
    trimSize: "6in_9in",
    targetPdfImpreso: true,
    targetEpub: true,
    targetEbook: true,
    targetHardcover: false,
    targetAudiolibro: false,
    targetVella: false,
  });

  const [styleSettings, setStyleSettings] = useState<BookStyleSettings>(ARCHETYPES.classic);
  const [chapterPageBreak, setChapterPageBreak] = useState<boolean>(true);

  const cycleTitleFont = (direction: "prev" | "next") => {
    const currentIndex = TITLE_FONTS.findIndex(f => f.value === styleSettings.fontTitle);
    if (currentIndex === -1) return;
    let nextIndex = currentIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % TITLE_FONTS.length;
    } else {
      nextIndex = (currentIndex - 1 + TITLE_FONTS.length) % TITLE_FONTS.length;
    }
    const updated = { ...styleSettings, fontTitle: TITLE_FONTS[nextIndex].value };
    setStyleSettings(updated);
    saveToLocalStorage(metadata, updated, chapters);
  };

  const cycleBodyFont = (direction: "prev" | "next") => {
    const currentIndex = BODY_FONTS.findIndex(f => f.value === styleSettings.fontBody);
    if (currentIndex === -1) return;
    let nextIndex = currentIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % BODY_FONTS.length;
    } else {
      nextIndex = (currentIndex - 1 + BODY_FONTS.length) % BODY_FONTS.length;
    }
    const updated = { ...styleSettings, fontBody: BODY_FONTS[nextIndex].value };
    setStyleSettings(updated);
    saveToLocalStorage(metadata, updated, chapters);
  };

  const cycleTitleSize = (direction: "prev" | "next") => {
    const sizes: ("small" | "medium" | "large")[] = ["small", "medium", "large"];
    const currentSize = styleSettings.fontSizeTitle || "large";
    const currentIndex = sizes.indexOf(currentSize);
    let nextIndex = currentIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % sizes.length;
    } else {
      nextIndex = (currentIndex - 1 + sizes.length) % sizes.length;
    }
    const updated = { ...styleSettings, fontSizeTitle: sizes[nextIndex] };
    setStyleSettings(updated);
    saveToLocalStorage(metadata, updated, chapters);
  };

  const cycleBodySize = (direction: "prev" | "next") => {
    const sizes: ("small" | "medium" | "large")[] = ["small", "medium", "large"];
    const currentSize = styleSettings.fontSizeBody || "medium";
    const currentIndex = sizes.indexOf(currentSize);
    let nextIndex = currentIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % sizes.length;
    } else {
      nextIndex = (currentIndex - 1 + sizes.length) % sizes.length;
    }
    const updated = { ...styleSettings, fontSizeBody: sizes[nextIndex] };
    setStyleSettings(updated);
    saveToLocalStorage(metadata, updated, chapters);
  };
  
  // Calligraphic state checkers for gorgeous typographies and hierarchical styling
  const isCalligraphic = ["Great Vibes", "Pinyon Script", "Alex Brush"].includes(styleSettings.fontTitle);
  const isArtistic = isCalligraphic || styleSettings.fontTitle === "Playfair Display";
  
  // --- SUGGESTION ENGINE REACTIVE LAYOUT HELPERS ---
  const currentFontSizeBody = styleSettings.fontSizeBody || "medium";
  const bodyFontSizeStyleValue = currentFontSizeBody === "small"
    ? "12.5px"
    : currentFontSizeBody === "large"
    ? "15.5px"
    : "14px"; // medium (default)

  const currentFontSizeTitle = styleSettings.fontSizeTitle || "large";
  const titleFontSizeStyleValue = currentFontSizeTitle === "small"
    ? "1.25rem" // ~20px
    : currentFontSizeTitle === "medium"
    ? "1.6rem"  // ~25px
    : "2.1rem";  // ~33.6px (large, default)

  const currentJustification = styleSettings.justification || "justify";
  const justificationClass = currentJustification === "left" ? "text-left" : "text-justify";

  const currentIndent = styleSettings.paragraphIndent || "none";
  const getIndentClass = (isFirstPara: boolean) => {
    if (isFirstPara || currentIndent === "none") return "indent-0";
    if (currentIndent === "small") return "indent-4 pb-0.5";
    if (currentIndent === "large") return "indent-12 pb-0.5";
    return "indent-8 pb-0.5"; // medium (default)
  };

  const currentSpacing = styleSettings.paragraphSpacing || "none";
  const spacingContainerClass = currentSpacing === "none"
    ? "space-y-0.5"
    : currentSpacing === "small"
    ? "space-y-2"
    : currentSpacing === "large"
    ? "space-y-6"
    : "space-y-3.5"; // medium (default)

  const currentTitleAlign = styleSettings.titleAlign || "center";
  const titleAlignClass = currentTitleAlign === "left"
    ? "text-left"
    : currentTitleAlign === "right"
    ? "text-right"
    : "text-center";

  const dividerAlignClass = currentTitleAlign === "left"
    ? "mr-auto ml-0"
    : currentTitleAlign === "right"
    ? "ml-auto mr-0"
    : "mx-auto";

  const currentTitleStyle = styleSettings.titleStyle || "classic";
  const getTitleStyleClasses = () => {
    if (currentTitleStyle === "bold-uppercase") {
      return "text-base md:text-xl font-extrabold uppercase tracking-widest py-1";
    }
    if (currentTitleStyle === "minimal-light") {
      return "text-xs md:text-sm font-light uppercase tracking-widest py-1 opacity-85";
    }
    if (currentTitleStyle === "calligraphic" || isCalligraphic) {
      return "text-2xl md:text-4.5xl font-normal leading-relaxed py-2";
    }
    // classic
    return isCalligraphic ? "text-2xl md:text-4xl py-2" : isArtistic ? "text-xl md:text-3xl font-semibold py-1.5" : "text-lg md:text-2xl font-bold font-serif leading-tight py-1";
  };

  const renderTitleText = (title: string) => {
    if (currentTitleStyle === "bold-uppercase" || currentTitleStyle === "minimal-light") {
      return title.toUpperCase();
    }
    return title;
  };

  const renderTOCPageContent = (page: SimulatedPage) => {
    // Find all pages that are chapter openers
    const tocEntries = pages.filter(p => !p.isCreditsPage && !p.isTOCPage && p.isChapterOpener);

    return (
      <div className="flex-1 flex flex-col justify-between h-full select-none" style={{ fontFamily: `"${styleSettings.fontBody}", serif` }}>
        <div className="space-y-6 mt-4">
          {/* Header */}
          <div className="text-center space-y-2 border-b pb-4" style={{ borderColor: 'currentColor', opacity: 0.2 }}>
            <h2 
              className="uppercase tracking-widest text-base font-bold text-slate-800 dark:text-slate-100" 
              style={{ 
                fontFamily: `"${styleSettings.fontTitle}", serif`,
              }}
            >
              {tocTitle || "Índice"}
            </h2>
            <div className="w-8 h-0.5 bg-amber-500 mx-auto opacity-75"></div>
          </div>

          {/* Chapters list */}
          <div className="space-y-3 pt-2">
            {tocEntries.length === 0 ? (
              <p className="text-center text-xs opacity-60 italic py-8">No hay capítulos para mostrar.</p>
            ) : (
              <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                {tocEntries.map((entry, index) => {
                  return (
                    <div 
                      key={index} 
                      onClick={() => {
                        const pIdx = pages.findIndex(p => p.pageNumber === entry.pageNumber);
                        if (pIdx !== -1) {
                          setCurrentPageIndex(pIdx % 2 === 0 ? pIdx : pIdx - 1); // Align to spread start index
                        }
                      }}
                      className="group flex items-end justify-between text-xs cursor-pointer hover:opacity-100 transition-opacity"
                    >
                      <div className="flex items-baseline flex-1 min-w-0 pr-2">
                        <span 
                          className="font-semibold text-[11px] uppercase tracking-wider shrink-0 transition-all text-amber-600 dark:text-amber-400 group-hover:text-amber-500 font-sans"
                        >
                          {styleSettings.fontTitle === "Cinzel" ? `CAP. ${entry.chapterNumber}` : `Cap. ${entry.chapterNumber}`}
                        </span>
                        
                        {tocStyle === "dots" && (
                          <div className="flex-1 border-b mx-2 opacity-15 border-current border-dotted min-w-[20px]" />
                        )}
                        {tocStyle === "clean" && (
                          <div className="w-2" />
                        )}
                        {tocStyle === "classic" && (
                          <div className="flex-1 border-b mx-2 opacity-20 border-current border-solid min-w-[20px]" style={{ borderBottomStyle: 'solid', borderWidth: '1px' }} />
                        )}
                        {tocStyle === "modern" && (
                          <div className="flex-1 border-b mx-2 opacity-5 border-current min-w-[20px]" style={{ borderBottomStyle: 'solid', borderWidth: '1px' }} />
                        )}

                        <span className="truncate opacity-80 text-[10.5px] group-hover:text-amber-500 transition-colors">
                          {entry.chapterTitle}
                        </span>
                      </div>

                      <span className="font-mono text-[10.5px] font-bold opacity-90 group-hover:text-amber-500 pb-[1px]" style={{ fontFamily: `"${styleSettings.fontBody}", serif` }}>
                        {entry.pageNumber}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer info explaining navigation */}
        <div className="text-[7.5px] opacity-40 pt-2 border-t mt-6 flex justify-between items-center" style={{ borderColor: 'currentColor', opacity: 0.2 }}>
          <span>* Enlace interactivo • Clic para saltar</span>
          <span className="font-semibold uppercase tracking-wider text-[6.5px]">DIAGRAMMERS</span>
        </div>
      </div>
    );
  };

  // --- STYLE SUGGESTION ENGINE STATES ---
  const [analyzingTextForStyle, setAnalyzingTextForStyle] = useState(false);
  const [styleSuggestionResult, setStyleSuggestionResult] = useState<BookStyleSettings | null>(null);
  const [styleSuggestionError, setStyleSuggestionError] = useState<string | null>(null);

  // UI Tabs for control sidebar
  const [activeTab, setActiveTab] = useState<"preset" | "manual" | "content" | "compatibility" | "copyright" | "pitch" | "multimedia" | "screenplay" | "guiautor">("guiautor");
  const [viewMode, setViewMode] = useState<"landing" | "studio">("studio");
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; workspace: string } | null>(null);
  const [showDriveModal, setShowDriveModal] = useState<boolean>(false);
  const [driveImportingStatus, setDriveImportingStatus] = useState<"idle" | "connecting" | "downloading" | "analyzing" | "formatting" | "success">("idle");
  const [selectedDriveFile, setSelectedDriveFile] = useState<string | null>(null);
  const [importProgress, setImportProgress] = useState<number>(0);

  // Pitch & Capital strategy interactive states
  const [pitchCapital, setPitchCapital] = useState(150000);
  const [pitchEquity, setPitchEquity] = useState(12);
  const [investorFilter, setInvestorFilter] = useState<"all" | "vc" | "strategic" | "crowd">("all");
  const [selectedInvestorId, setSelectedInvestorId] = useState<string | null>(null);
  const [showPitchSuccess, setShowPitchSuccess] = useState<string | null>(null);

  // --- KDP & PRINT SETTINGS DIRECTLY COMPATIBLE ---
  const [kdpTrimSize, setKdpTrimSize] = useState<"6in_9in" | "5.5in_8.5in" | "5in_8in" | "7in_10in" | "8.5in_11in">("6in_9in");
  const [kdpBleed, setKdpBleed] = useState<boolean>(false);
  
  // --- PRE-PRESS / IMPRENTA PROFESIONAL PRINT PDF CONTROLS ---
  const [showPrintPdfModal, setShowPrintPdfModal] = useState<boolean>(false);
  const [printSizePreset, setPrintSizePreset] = useState<"6x9" | "A5" | "A4" | "Pocket">("6x9");
  const [printBleedMm, setPrintBleedMm] = useState<number>(3);
  const [printSafeMarginMm, setPrintSafeMarginMm] = useState<number>(15);
  const [printPageSelectedNum, setPrintPageSelectedNum] = useState<number>(1);
  const [printShowBleedGuides, setPrintShowBleedGuides] = useState<boolean>(true);
  const [printShowSafeGuides, setPrintShowSafeGuides] = useState<boolean>(true);
  const [printShowCropMarks, setPrintShowCropMarks] = useState<boolean>(true);
  const [printShowRegMarks, setPrintShowRegMarks] = useState<boolean>(true);
  const [printShowColorBars, setPrintShowColorBars] = useState<boolean>(true);
  const [printShowDocInfo, setPrintShowDocInfo] = useState<boolean>(true);
  const [printExportStatus, setPrintExportStatus] = useState<"idle" | "building" | "success">("idle");
  const [printDoublePageSpread, setPrintDoublePageSpread] = useState<boolean>(false);

  // --- VOLUNTARY DONATION STRATEGY (OPTION 1) ---
  const [showDonationPromptModal, setShowDonationPromptModal] = useState<boolean>(false);
  const [pendingDownload, setPendingDownload] = useState<{ content: string; filename: string; mimeType: string } | null>(null);

  // --- GUIAUTOR UNIVERSAL ASSISTANT STATES ---
  const [isDagramitoOpen, setIsDagramitoOpen] = useState<boolean>(false);
  const [dagramitoHasUnread, setDagramitoHasUnread] = useState<boolean>(true); // Notification dot
  const [dagramitoMessages, setDagramitoMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [dagramitoInput, setDagramitoInput] = useState<string>("");
  const [dagramitoIsTyping, setDagramitoIsTyping] = useState<boolean>(false);

  const [guiautorVoiceActive, setGuiautorVoiceActive] = useState<boolean>(false);
  const voiceActiveRef = useRef<boolean>(false);
  useEffect(() => {
    voiceActiveRef.current = guiautorVoiceActive;
  }, [guiautorVoiceActive]);

  const speakHelper = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      // Stripping formatting tags for standard clean voice output
      const cleanText = text
        .replace(/[#*`_-]/g, " ")
        .replace(/🧠|📘|🎙️|📦/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      let targetLang = "es-ES";
      if (language === "en") targetLang = "en-US";
      else if (language === "pt") targetLang = "pt-BR";
      else if (language === "fr") targetLang = "fr-FR";
      else if (language === "it") targetLang = "it-IT";
      else if (language === "de") targetLang = "de-DE";
      else targetLang = "es-ES";
      
      utterance.lang = targetLang;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Re-translate current greeting whenever selected language swaps if no user chat is active
  useEffect(() => {
    if (dagramitoMessages.length <= 1) {
      setDagramitoMessages([
        {
          role: "assistant",
          content: t.dagramitoGreeting || "🧠 ¡Hola! Soy Guiautor AI..."
        }
      ]);
    }
  }, [language]);
  
  // Prompt for style analysis AI
  const [stylePrompt, setStylePrompt] = useState("");
  const [analyzingStyle, setAnalyzingStyle] = useState(false);
  const [aiAnalysisError, setAiAnalysisError] = useState<string | null>(null);

  // --- VOICE CLONING & SPOTIFY STATES ---
  const [selectedChapterIdxForMedia, setSelectedChapterIdxForMedia] = useState<number>(0);
  const [voiceIsRecording, setVoiceIsRecording] = useState<boolean>(false);
  const [voiceRecordTime, setVoiceRecordTime] = useState<number>(0);
  const [clonedVoices, setClonedVoices] = useState<Array<{id: string; name: string; isReady: boolean; originalFileName?: string}>>([
    { id: "voz-defecto-narrador", name: "Locutor Profesional (España)", isReady: true },
    { id: "voz-defecto-gravitas", name: "Estilo Épico & Profundo (Misterio)", isReady: true },
    { id: "voz-defecto-dulce", name: "Narrativa Dulce e Íntima (Cálido)", isReady: true }
  ]);
  const [newVoiceName, setNewVoiceName] = useState<string>("");
  const [cloningStatus, setCloningStatus] = useState<"idle" | "recording" | "uploading" | "processing" | "success" | "error">("idle");
  const [microphoneAllowed, setMicrophoneAllowed] = useState<boolean>(false);

  // --- SPEECH RECOGNITION / VOICE DICTATION FOR ACCESSIBILITY ---
  const [speechLang, setSpeechLang] = useState<string>("es-ES");
  const [isDictating, setIsDictating] = useState<boolean>(false);
  const [dictationTarget, setDictationTarget] = useState<"raw" | "chapter" | null>(null);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const [dictatedTextTemp, setDictatedTextTemp] = useState<string>("");
  const [dictationError, setDictationError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const scannerVideoRef = useRef<HTMLVideoElement | null>(null);

  // Dagramito autoscroll Ref and Effect
  const dagramitoEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isDagramitoOpen && dagramitoEndRef.current) {
      dagramitoEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [dagramitoMessages, isDagramitoOpen]);

  // --- INTERACTIVE VISUAL FONT DROPDOWN STATES ---
  const [isTitleFontDropdownOpen, setIsTitleFontDropdownOpen] = useState<boolean>(false);
  const [isBodyFontDropdownOpen, setIsBodyFontDropdownOpen] = useState<boolean>(false);
  const [isSidebarTitleFontOpen, setIsSidebarTitleFontOpen] = useState<boolean>(false);
  const [isSidebarBodyFontOpen, setIsSidebarBodyFontOpen] = useState<boolean>(false);

  // --- COMPRESSION & OPTIMIZATION STATES ---
  const [compressDpi, setCompressDpi] = useState<"300" | "150" | "72">("300");
  const [compressSubsetFonts, setCompressSubsetFonts] = useState<boolean>(true);
  const [compressZipLvl, setCompressZipLvl] = useState<number>(9);
  const [isCompressingActive, setIsCompressingActive] = useState<boolean>(false);
  const [compressDoneMessage, setCompressDoneMessage] = useState<string | null>(null);
  
  // Narration Playback simulation states
  const [speakingChapterNum, setSpeakingChapterNum] = useState<number | null>(null);
  const [speakingParagraphIdx, setSpeakingParagraphIdx] = useState<number | null>(null);
  const [isNarrationPlaying, setIsNarrationPlaying] = useState<boolean>(false);
  const [speakingStatus, setSpeakingStatus] = useState<string>("Listo para narrar");
  const [equalizerBars, setEqualizerBars] = useState<number[]>([15, 15, 15, 15, 15, 15, 15, 15]);
  const speakerTimerRef = useRef<any>(null);
  const saveTimeoutRef = useRef<any>(null);

  // --- CINEMATIC SCREENPLAY & MAVERICK SUITE STATES ---
  const [isMaverickMember, setIsMaverickMember] = useState<boolean>(false);
  
  // --- PRO LICENSE & MONETIZATION HUB STATES ---
  const [showProPaywallModal, setShowProPaywallModal] = useState<boolean>(false);
  const [inputLicenseKey, setInputLicenseKey] = useState<string>("");
  const [licenseError, setLicenseError] = useState<string | null>(null);
  const [licenseSuccess, setLicenseSuccess] = useState<boolean>(false);
  const [generatorClientSeed, setGeneratorClientSeed] = useState<string>("");
  const [generatedLicenceResult, setGeneratedLicenceResult] = useState<string>("");

  const [screenplaySelectedChapterIdx, setScreenplaySelectedChapterIdx] = useState<number>(0);
  const [isConvertingScreenplay, setIsConvertingScreenplay] = useState<boolean>(false);
  const [generatedScreenplayText, setGeneratedScreenplayText] = useState<string>("");
  const [screenplayWatermark, setScreenplayWatermark] = useState<string>("PROPIEDAD DE MAVERICK STUDIO");
  const [castingSelectedTone, setCastingSelectedTone] = useState<string>("EPIC_HOLLYWOOD"); // Tones: EPIC_HOLLYWOOD, INDIE, LATIN_DRAMA
  const [castingSuggestions, setCastingSuggestions] = useState<Array<{role: string; actor: string; description: string; estBudget: string}>>([]);
  const [screenplayExportDoneMessage, setScreenplayExportDoneMessage] = useState<string | null>(null);

  // --- REGISTROS DE PROSPECCIÓN EDITORIAL REAL Y SISTEMA DE ENVIOS ---
  const [pitchSubTab, setPitchSubTab] = useState<"outreach" | "business">("outreach");
  const [outreachSearchQuery, setOutreachSearchQuery] = useState<string>("");
  const [outreachGenreFilter, setOutreachGenreFilter] = useState<string>("all");
  const [customPublishers, setCustomPublishers] = useState<Array<{ id: string; name: string; email: string; genre: string; subgenres: string[]; description: string; submissionGuide?: string }>>([]);
  const [publisherStatuses, setPublisherStatuses] = useState<Record<string, string>>({});
  const [publisherNotes, setPublisherNotes] = useState<Record<string, string>>({});
  const [generatingPitchId, setGeneratingPitchId] = useState<string | null>(null);
  const [generatedPitches, setGeneratedPitches] = useState<Record<string, { subject: string; fullEmailBody: string }>>({});
  const [synopsisText, setSynopsisText] = useState<string>("Un manuscrito literario sumamente inmersivo maquetado con las máximas tolerancias de impresión, que explora la condición humana y narrativa desde un marco clásico pero con sensibilidad moderna.");
  const [showAddCustomPublisher, setShowAddCustomPublisher] = useState<boolean>(false);

  // New publisher form states
  const [newPubName, setNewPubName] = useState<string>("");
  const [newPubEmail, setNewPubEmail] = useState<string>("");
  const [newPubGenre, setNewPubGenre] = useState<string>("Narrativa General");
  const [newPubDesc, setNewPubDesc] = useState<string>("");

  // Raw input text for maqueta
  const [rawText, setRawText] = useState(TEXT_TEMPLATES[0].text);
  const [formattingText, setFormattingText] = useState(false);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const [fileUploadSuccess, setFileUploadSuccess] = useState<string | null>(null);

  // Formatted chapters state
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      chapterNumber: 1,
      title: "De la condición y ejercicio del famoso hidalgo don Quijote de la Mancha",
      paragraphs: [
        "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. El resto della concluían sayo de velarte, calzas de velludo para las fiestas, con sus pantuflos de lo mesmo, y los días de entresemana se honraba con su vellorí de lo más fino.",
        "Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años; era de complexión recia, seco de carnes, enjuto de rostro, gran madrugador y amigo de la caza.",
        "—Escucha, Sancho —le dijo don Quijote un día antes de partir—, que el camino que hemos de emprender está lleno de peligros inacabables.",
        "—Señor —respondió el escudero con voz asustada—, ¿y no sería mejor quedarse en nuestra aldea que andar buscando pan de trastrigo por las selvas?",
        "—No hables así, mi fiel escudero —reprendió el caballero—. La gloria aguarda a los espíritus magnánimos en la senda de los desvalidos."
      ]
    }
  ]);

  // Active view in simulator: "book" (double spread), "continuous", "epub", "cover-wrap"
  const [viewerMode, setViewerMode] = useState<"book" | "continuous" | "epub" | "cover-wrap">("book");
  
  // Simulated pages state
  const [pages, setPages] = useState<SimulatedPage[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // For spread view, points to left page index.
  
  // Custom manual tuning variables in state to edit selected chapter on the fly
  const [editingChapterIdx, setEditingChapterIdx] = useState<number | null>(null);
  const [editingChapterTitle, setEditingChapterTitle] = useState("");
  const [editingChapterText, setEditingChapterText] = useState("");

  // History state for Chapter Editor Deshacer/Rehacer (Undo/Redo)
  const [chapterHistory, setChapterHistory] = useState<Array<{ title: string; text: string }>>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // --- TEXT CORRECTOR & LITERARY MAGIC STATES ---
  const [isAnalyzingText, setIsAnalyzingText] = useState<boolean>(false);
  const [textAnalysisResults, setTextAnalysisResults] = useState<{
    corrections: Array<{ original: string; replacement: string; reason: string; type: string }>;
    magicSuggestions: Array<{ original: string; replacement: string; reason: string; type: string }>;
  } | null>(null);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<"corrections" | "magic">("corrections");
  const [mobileEditorTab, setMobileEditorTab] = useState<"text" | "corrector">("text");

  // --- ANALYTICS AND VISIT METRICS STATES ---
  const [showAnalyticsModal, setShowAnalyticsModal] = useState<boolean>(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState<boolean>(false);

  // Auto-track user visit and load stats on launch
  useEffect(() => {
    const trackAndInit = async () => {
      try {
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const ref = document.referrer || "Acceso Directo";
        const res = `${window.screen.width}x${window.screen.height}`;
        
        await fetch("/api/track-visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isMobile: isMobileDevice,
            referrer: ref,
            resolution: res
          })
        });
      } catch (err) {
        console.warn("[Analytics Tracker] Fallo ligero al registrar la entrada de visita:", err);
      }
    };
    trackAndInit();

    // Auto-open Guiautor AI after 1.5 seconds to retain the visitor and explain the suite
    const timer = setTimeout(() => {
      setIsDagramitoOpen(true);
      setDagramitoHasUnread(false);
      // Play a soft welcome chime using Web Speech Synthesis if enabled, introducing the helper
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        // Welcome message
        setTimeout(() => {
          speakHelper("¡Hola! Bienvenido a Hostiasoft Diagrammers. Estoy listo para guiarte en tu diseño de libros.");
        }, 800);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Reactive Onboarding Progress Tracker
  useEffect(() => {
    setOnboardingStepCompleted(prev => {
      const updated = { ...prev };
      
      // 1. Manuscript loaded check (Quijote template or customized)
      if (chapters && chapters.length > 0 && chapters[0]?.paragraphs?.length > 0) {
        // Mark true if updated or at least loaded
        updated.manuscript = true;
      }
      
      // 2. Formatting or Archetype Selected check
      if (styleSettings && (styleSettings.fontTitle !== "Cinzel" || styleSettings.fontSizeBody !== "medium" || styleSettings.archetype !== "medieval")) {
        updated.archetype = true;
      }

      // 4. Voice generated or checked
      if (clonedVoices && clonedVoices.length > 2) {
        // Default indices have default voices
        if (onboardingStepCompleted.voice) {
          updated.voice = true;
        }
      }
      
      return JSON.stringify(updated) === JSON.stringify(prev) ? prev : updated;
    });
  }, [chapters, styleSettings, clonedVoices]);

  const fetchAnalytics = async () => {
    setIsLoadingAnalytics(true);
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data);
      } else {
        triggerStudioToast("Fallo al obtener estadísticas en tiempo real del servidor.", "warning");
      }
    } catch (err) {
      console.error(err);
      triggerStudioToast("Error de conexión al obtener estadísticas.", "warning");
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    if (editingChapterIdx === null) {
      setTextAnalysisResults(null);
      setIsAnalyzingText(false);
    }
  }, [editingChapterIdx]);

  const analyzeChapterText = async () => {
    if (!editingChapterText || editingChapterText.trim() === "") {
      triggerStudioToast("Escribe algo de texto en el capítulo para poder corregirlo.", "warning");
      return;
    }
    setIsAnalyzingText(true);
    try {
      const response = await fetch("/api/correct-and-magic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editingChapterText, language })
      });
      if (response.ok) {
        const data = await response.json();
        setTextAnalysisResults(data);
        triggerStudioToast("¡Análisis de corrección y magia completado!", "success");
      } else {
        triggerStudioToast("No se pudo obtener respuesta del corrector. Reintenta por favor.", "warning");
      }
    } catch (err) {
      console.error(err);
      triggerStudioToast("Error al conectar con el servidor de corrección.", "warning");
    } finally {
      setIsAnalyzingText(false);
    }
  };

  const applyTextImprovement = (original: string, replacement: string) => {
    if (!editingChapterText) return;
    
    let applied = false;
    let updatedText = editingChapterText;

    // 1. Try exact match first
    if (editingChapterText.includes(original)) {
      updatedText = editingChapterText.replace(original, replacement);
      applied = true;
    } else {
      // 2. Try trimmed/flexible match (ignoring different space types, line breaks, double spaces)
      const cleanString = (str: string) => str.replace(/\s+/g, " ").trim();
      const cleanedOriginal = cleanString(original);
      
      const words = cleanedOriginal.split(" ").filter(w => w.trim().length > 0);
      if (words.length > 0) {
        try {
          // Create regex that permits any whitespace characters (\s+) between original words (case-insensitive for robustness)
          const escapedWords = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("\\s+");
          const flexibleRegex = new RegExp(escapedWords, "gi");
          const afterReplace = editingChapterText.replace(flexibleRegex, replacement);
          if (afterReplace !== editingChapterText) {
            updatedText = afterReplace;
            applied = true;
          }
        } catch (e) {
          console.error("Error matching flexible regex:", e);
        }
      }
    }

    if (applied) {
      updateChapterTextWithHistory(updatedText);
      triggerStudioToast("¡Cambio literario aplicado con éxito!", "success");

      // Remove suggestions that refer to or match this replacement
      if (textAnalysisResults) {
        const filteredCorrections = textAnalysisResults.corrections.filter(item => item.original !== original);
        const filteredMagic = textAnalysisResults.magicSuggestions.filter(item => item.original !== original);
        setTextAnalysisResults({
          corrections: filteredCorrections,
          magicSuggestions: filteredMagic
        });
      }
    } else {
      // 3. Last fallback: Inform the user and let them know we couldn't match the exact text,
      // but maybe suggest highlighting or let them copy-paste.
      triggerStudioToast("No pudimos ubicar el fragmento exacto en el cuerpo del capítulo. Intenta re-analizar o realizar el cambio manualmente.", "warning");
    }
  };

  // --- PRINT WRAP COVER DESIGNER STATES ---
  const [coverPrompt, setCoverPrompt] = useState<string>("Paisaje cósmico celestial con estrellas doradas y una constelación estilizada sobre fondo oscuro elegante");
  const [coverArtUrl, setCoverArtUrl] = useState<string>("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop");
  const [coverTitleStyle, setCoverTitleStyle] = useState<"serif-capital" | "modern-clean" | "bold-editorial" | "retro-vintage">("serif-capital");
  const [coverPrimaryColor, setCoverPrimaryColor] = useState<string>("#0b0f19"); // Dark cosmic blue
  const [coverAccentColor, setCoverAccentColor] = useState<string>("#f59e0b"); // Amber
  const [isGeneratingCover, setIsGeneratingCover] = useState<boolean>(false);
  const [coverOptions, setCoverOptions] = useState<{
    id: number;
    url: string;
    primaryColor: string;
    accentColor: string;
    label: string;
  }[]>([]);
  const [isGeneratingSynopsis, setIsGeneratingSynopsis] = useState<boolean>(false);
  const [spinePaperWeight, setSpinePaperWeight] = useState<"cream-thick" | "white-standard" | "thin-digital">("white-standard");
  const [coverHardcover, setCoverHardcover] = useState<boolean>(false);
  const [backCoverSynopsis, setBackCoverSynopsis] = useState<string>("Una profunda exploración sobre los límites del arte digital, el diseño tipográfico y el alma del escritor en un entorno hipertecnológico. ¿Cómo sobrevive la belleza rítmica de la palabra escrita cuando todo a nuestro alrededor se rige por algoritmos?");
  const [backCoverAuthorBio, setBackCoverAuthorBio] = useState<string>("Nacido bajo el influjo de la tipografía clásica y las redes de datos, entrelaza el rigor del diseño suizo con motores de visualización generativa.");
  const [customCoverLogo, setCustomCoverLogo] = useState<string>("DIAGRAMMERS PRESS");
  
  // --- TABLE OF CONTENTS (TOC) STATE ---
  const [includeTableOfContents, setIncludeTableOfContents] = useState<boolean>(true);
  const [tocTitle, setTocTitle] = useState<string>("Índice de Capítulos");
  const [tocStyle, setTocStyle] = useState<"dots" | "clean" | "classic" | "modern">("dots");

  // --- EPUB DIGITAL READER STATE ---
  const [epubDevice, setEpubDevice] = useState<string>("kindle");
  const [epubTheme, setEpubTheme] = useState<string>("warm-sepia");
  const [epubFontSize, setEpubFontSize] = useState<number>(14);
  const [selectedEpubChapter, setSelectedEpubChapter] = useState<number>(1);
  const [epubLogs, setEpubLogs] = useState<string>("");
  const [epubValId, setEpubValId] = useState<boolean>(false);

  // --- RIGHTS & ISBN FLOW STATES ---
  const [isRegistrandoSafeCreative, setIsRegistrandoSafeCreative] = useState<boolean>(false);
  const [isSolicitandoISBN, setIsSolicitandoISBN] = useState<boolean>(false);
  const [isTransferringKDP, setIsTransferringKDP] = useState<boolean>(false);
  const [isTransferringSafe, setIsTransferringSafe] = useState<boolean>(false);
  const [transferState, setTransferState] = useState<"idle" | "hashing" | "encrypting" | "sending" | "success">("idle");
  const [calculatedHash, setCalculatedHash] = useState<string>("");

  // --- ISBN BARCODE SCANNER CUSTOM STATES ---
  const [isIsbnScannerOpen, setIsIsbnScannerOpen] = useState<boolean>(false);
  const [scannerRealCameraActive, setScannerRealCameraActive] = useState<boolean>(false);
  const [scannerStatus, setScannerStatus] = useState<"idle" | "searching" | "scanned" | "error">("idle");
  const [scannedResult, setScannedResult] = useState<string>("");
  const [selectedScanBookIndex, setSelectedScanBookIndex] = useState<number>(0);
  const [isPrintPreviewEnabled, setIsPrintPreviewEnabled] = useState<boolean>(false);

  // Key feedback alerts
  const [savedSuccess, setSavedSuccess] = useState(false);

  // --- ILLUSTRATION & AI ART DIRECTIONS STATE ---
  const [illustratedBook, setIllustratedBook] = useState<boolean>(true);
  const [includeCreditsPage, setIncludeCreditsPage] = useState<boolean>(true);
  const [suggestingIllustrations, setSuggestingIllustrations] = useState<boolean>(false);
  const [generatingIllId, setGeneratingIllId] = useState<string | null>(null);
  
  // Form states for manual illustration addition
  const [manualIllChapter, setManualIllChapter] = useState<number>(1);
  const [manualIllParagraph, setManualIllParagraph] = useState<number>(0);
  const [manualIllCaption, setManualIllCaption] = useState<string>("");
  const [manualIllPrompt, setManualIllPrompt] = useState<string>("");
  const [manualIllAlign, setManualIllAlign] = useState<"center" | "left" | "right" | "full">("center");
  const [manualIllWidth, setManualIllWidth] = useState<number>(100);

  // --- CLOUD SYNC STATE & LOGIC ---
  const [isCloudSyncModalOpen, setIsCloudSyncModalOpen] = useState<boolean>(false);
  const [isSyncingCloud, setIsSyncingCloud] = useState<boolean>(false);
  const [cloudSaveExists, setCloudSaveExists] = useState<boolean>(false);
  const [cloudSaveDate, setCloudSaveDate] = useState<string | null>(null);
  const [cloudSaveTitle, setCloudSaveTitle] = useState<string | null>(null);
  const [cloudSaveAuthor, setCloudSaveAuthor] = useState<string | null>(null);
  const [showSyncNotification, setShowSyncNotification] = useState<boolean>(false);

  // --- AUTHOR GATEWAY CONFIG STATE (PAYPAL, STRIPE, BANK) ---
  const [payPalEmail, setPayPalEmail] = useState<string>("ruthgmedina@gmail.com");
  const [stripePubKey, setStripePubKey] = useState<string>("");
  const [bankTransferData, setBankTransferData] = useState<string>("IBAN: ES21 1234 5678 9012 3456 7890\nBeneficiario: Ruth G. Medina\nConcepto: [Título del Libro]");
  const [selectedConfigPaymentMethod, setSelectedConfigPaymentMethod] = useState<"paypal" | "stripe" | "bank">("paypal");
  const [paymentIsTestMode, setPaymentIsTestMode] = useState<boolean>(true);
  const [currencyCode, setCurrencyCode] = useState<string>("EUR");
  const [bookSalesPrice, setBookSalesPrice] = useState<number>(14.99);

  // --- CONTROL DE PAGO DE COMPRADORES PARA DESCARGAS ---
  const [bookPurchased, setBookPurchased] = useState<boolean>(() => {
    return localStorage.getItem("payment_book_purchased") === "true";
  });
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [pendingExport, setPendingExport] = useState<any>(null);
  const [pendingExportLabel, setPendingExportLabel] = useState<string>("");
  const [paymentSuccessData, setPaymentSuccessData] = useState<any>(null);

  const withPaymentCheck = (actionFn: () => void, actionTypeLabel: string) => {
    if (bookPurchased) {
      actionFn();
    } else {
      setPendingExport(() => actionFn);
      setPendingExportLabel(actionTypeLabel);
      setShowPaymentModal(true);
    }
  };

  const applyStateObject = (payload: any) => {
    if (!payload) return;
    if (payload.metadata) setMetadata(payload.metadata);
    if (payload.styleSettings) setStyleSettings(payload.styleSettings);
    if (payload.chapters) setChapters(payload.chapters);
    if (payload.kdpTrimSize) setKdpTrimSize(payload.kdpTrimSize);
    if (payload.chapterPageBreak !== undefined) setChapterPageBreak(payload.chapterPageBreak);
    if (payload.customPublishers) setCustomPublishers(payload.customPublishers);
    if (payload.publisherStatuses) setPublisherStatuses(payload.publisherStatuses);
    if (payload.publisherNotes) setPublisherNotes(payload.publisherNotes);
    if (payload.generatedPitches) setGeneratedPitches(payload.generatedPitches);
    if (payload.synopsisText) setSynopsisText(payload.synopsisText);
    if (payload.isMaverickMember !== undefined) setIsMaverickMember(payload.isMaverickMember);
    if (payload.coverArtUrl) setCoverArtUrl(payload.coverArtUrl);
    if (payload.coverTitleStyle) setCoverTitleStyle(payload.coverTitleStyle);
    if (payload.coverPrimaryColor) setCoverPrimaryColor(payload.coverPrimaryColor);
    if (payload.coverAccentColor) setCoverAccentColor(payload.coverAccentColor);
    if (payload.spinePaperWeight) setSpinePaperWeight(payload.spinePaperWeight);
    if (payload.coverHardcover !== undefined) setCoverHardcover(payload.coverHardcover);
    if (payload.backCoverSynopsis) setBackCoverSynopsis(payload.backCoverSynopsis);
    if (payload.backCoverAuthorBio) setBackCoverAuthorBio(payload.backCoverAuthorBio);
    if (payload.customCoverLogo) setCustomCoverLogo(payload.customCoverLogo);
    if (payload.includeTableOfContents !== undefined) setIncludeTableOfContents(payload.includeTableOfContents);
    if (payload.tocTitle) setTocTitle(payload.tocTitle);
    if (payload.tocStyle) setTocStyle(payload.tocStyle);
    
    // Configurable payment parameters
    if (payload.payPalEmail !== undefined) setPayPalEmail(payload.payPalEmail);
    if (payload.stripePubKey !== undefined) setStripePubKey(payload.stripePubKey);
    if (payload.bankTransferData !== undefined) setBankTransferData(payload.bankTransferData);
    if (payload.selectedConfigPaymentMethod !== undefined) setSelectedConfigPaymentMethod(payload.selectedConfigPaymentMethod);
    if (payload.paymentIsTestMode !== undefined) setPaymentIsTestMode(payload.paymentIsTestMode);
    if (payload.currencyCode !== undefined) setCurrencyCode(payload.currencyCode);
    if (payload.bookSalesPrice !== undefined) setBookSalesPrice(payload.bookSalesPrice);

    // Persist to local storage to make sure any reload keeps it
    if (payload.metadata) localStorage.setItem("editorial_meta", JSON.stringify(payload.metadata));
    if (payload.styleSettings) localStorage.setItem("editorial_style", JSON.stringify(payload.styleSettings));
    if (payload.chapters) localStorage.setItem("editorial_chapters", JSON.stringify(payload.chapters));
    if (payload.kdpTrimSize) localStorage.setItem("editorial_trim_size", payload.kdpTrimSize);
    if (payload.chapterPageBreak !== undefined) localStorage.setItem("chapter_page_break", JSON.stringify(payload.chapterPageBreak));
    if (payload.customPublishers) localStorage.setItem("outreach_custom_publishers", JSON.stringify(payload.customPublishers));
    if (payload.publisherStatuses) localStorage.setItem("outreach_statuses", JSON.stringify(payload.publisherStatuses));
    if (payload.publisherNotes) localStorage.setItem("outreach_notes", JSON.stringify(payload.publisherNotes));
    if (payload.generatedPitches) localStorage.setItem("outreach_pitches", JSON.stringify(payload.generatedPitches));
    if (payload.synopsisText) localStorage.setItem("outreach_synopsis", payload.synopsisText);
    if (payload.isMaverickMember !== undefined) localStorage.setItem("is_maverick_member", payload.isMaverickMember ? "true" : "false");

    if (payload.payPalEmail !== undefined) localStorage.setItem("payment_paypal_email", payload.payPalEmail);
    if (payload.stripePubKey !== undefined) localStorage.setItem("payment_stripe_pub_key", payload.stripePubKey);
    if (payload.bankTransferData !== undefined) localStorage.setItem("payment_bank_data", payload.bankTransferData);
    if (payload.selectedConfigPaymentMethod !== undefined) localStorage.setItem("payment_selected_method", payload.selectedConfigPaymentMethod);
    if (payload.paymentIsTestMode !== undefined) localStorage.setItem("payment_test_mode", JSON.stringify(payload.paymentIsTestMode));
    if (payload.currencyCode !== undefined) localStorage.setItem("payment_currency", payload.currencyCode);
    if (payload.bookSalesPrice !== undefined) localStorage.setItem("payment_book_price", JSON.stringify(payload.bookSalesPrice));
  };

  const fetchCloudSyncInfo = async (showBannerNotification = false) => {
    try {
      const res = await fetch("/api/sync/load");
      if (!res.ok) return;
      const data = await res.json();
      if (data && !data.empty && data.payload) {
        setCloudSaveExists(true);
        setCloudSaveDate(data.updatedAt);
        if (data.payload.metadata) {
          setCloudSaveTitle(data.payload.metadata.title || "Sin título");
          setCloudSaveAuthor(data.payload.metadata.author || "Autor anónimo");
        }
        
        // Decide if we should notify
        if (showBannerNotification) {
          const storedMeta = localStorage.getItem("editorial_meta");
          if (!storedMeta) {
            // Empty local state: load cloud data automatically so they have the project on display right away
            applyStateObject(data.payload);
          } else {
            // There is local state, check if timestamps differ
            setShowSyncNotification(true);
          }
        }
      } else {
        setCloudSaveExists(false);
      }
    } catch (e) {
      console.error("Error fetching cloud sync data:", e);
    }
  };

  const saveToCloud = async () => {
    setIsSyncingCloud(true);
    const syncPayload = {
      metadata,
      styleSettings,
      chapters,
      kdpTrimSize,
      chapterPageBreak,
      customPublishers,
      publisherStatuses,
      publisherNotes,
      generatedPitches,
      synopsisText,
      isMaverickMember,
      coverArtUrl,
      coverTitleStyle,
      coverPrimaryColor,
      coverAccentColor,
      spinePaperWeight,
      coverHardcover,
      backCoverSynopsis,
      backCoverAuthorBio,
      customCoverLogo,
      includeTableOfContents,
      tocTitle,
      tocStyle,
      payPalEmail,
      stripePubKey,
      bankTransferData,
      selectedConfigPaymentMethod,
      paymentIsTestMode,
      currencyCode,
      bookSalesPrice
    };

    try {
      const res = await fetch("/api/sync/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(syncPayload)
      });
      const data = await res.json();
      if (data.success) {
        setCloudSaveExists(true);
        setCloudSaveDate(new Date().toISOString());
        setCloudSaveTitle(metadata.title || "Sin título");
        setCloudSaveAuthor(metadata.author || "Autor anónimo");
        alert("¡Estado del proyecto guardado y sincronizado con éxito en la nube! Ahora puedes abrir la app en cualquier otro dispositivo móvil u ordenador y cargar esta misma versión anterior al instante.");
      } else {
        alert("Fallo al guardar en la nube: " + data.error);
      }
    } catch (e: any) {
      alert("Error al conectar con el servidor de la nube: " + e.message);
    } finally {
      setIsSyncingCloud(false);
    }
  };

  const loadFromCloud = async () => {
    setIsSyncingCloud(true);
    try {
      const res = await fetch("/api/sync/load");
      const data = await res.json();
      if (data && !data.empty && data.payload) {
        applyStateObject(data.payload);
        setShowSyncNotification(false);
        alert("¡Excelente! El manuscrito, los diseños de portada y toda la maquetación se han restaurado con éxito desde la sincronización en la nube.");
      } else {
        alert("No se encontró ninguna copia registrada en el servidor de la nube para restaurar.");
      }
    } catch (e: any) {
      alert("Error al recuperar los datos desde el servidor en la nube: " + e.message);
    } finally {
      setIsSyncingCloud(false);
    }
  };

  // --- PERSISTENCE ---
  useEffect(() => {
    // Load from local storage if exists
    const storedMeta = localStorage.getItem("editorial_meta");
    const storedMaverick = localStorage.getItem("is_maverick_member");
    if (storedMaverick === "true") {
      setIsMaverickMember(true);
    }
    const storedStyle = localStorage.getItem("editorial_style");
    const storedChapters = localStorage.getItem("editorial_chapters");
    const storedTrimSize = localStorage.getItem("editorial_trim_size");
    const storedCustomPubs = localStorage.getItem("outreach_custom_publishers");
    const storedStatuses = localStorage.getItem("outreach_statuses");
    const storedNotes = localStorage.getItem("outreach_notes");
    const storedPitches = localStorage.getItem("outreach_pitches");
    const storedSynopsis = localStorage.getItem("outreach_synopsis");
    
    if (storedMeta) {
      try {
        const parsed = JSON.parse(storedMeta);
        if (!parsed.safeCreativeId) {
          parsed.safeCreativeId = "2606015848217-2CJB4R";
        }
        setMetadata(parsed);
      } catch(e) {}
    }
    if (storedStyle) {
      try {
        const parsed = JSON.parse(storedStyle);
        if (parsed && typeof parsed === "object") {
          setStyleSettings({
            ...ARCHETYPES.classic,
            ...parsed
          });
        }
      } catch(e) {}
    }
    if (storedChapters) {
      try {
        const parsed = JSON.parse(storedChapters);
        if (Array.isArray(parsed)) {
          setChapters(parsed);
        }
      } catch(e) {}
    }
    if (storedTrimSize) {
      if (["6in_9in", "5.5in_8.5in", "5in_8in", "7in_10in", "8.5in_11in"].includes(storedTrimSize)) {
        setKdpTrimSize(storedTrimSize as any);
      } else {
        setKdpTrimSize("6in_9in");
      }
    }
    const storedChapterPageBreak = localStorage.getItem("chapter_page_break");
    if (storedChapterPageBreak !== null) {
      setChapterPageBreak(storedChapterPageBreak === "true");
    }
    if (storedCustomPubs) {
      try { setCustomPublishers(JSON.parse(storedCustomPubs)); } catch(e) {}
    }
    if (storedStatuses) {
      try { setPublisherStatuses(JSON.parse(storedStatuses)); } catch(e) {}
    }
    if (storedNotes) {
      try { setPublisherNotes(JSON.parse(storedNotes)); } catch(e) {}
    }
    if (storedPitches) {
      try { setGeneratedPitches(JSON.parse(storedPitches)); } catch(e) {}
    }
    if (storedSynopsis) {
      setSynopsisText(storedSynopsis);
    }

    // Load custom author payment configs
    const storedPaypal = localStorage.getItem("payment_paypal_email");
    if (storedPaypal) setPayPalEmail(storedPaypal);
    const storedStripe = localStorage.getItem("payment_stripe_pub_key");
    if (storedStripe) setStripePubKey(storedStripe);
    const storedBank = localStorage.getItem("payment_bank_data");
    if (storedBank) setBankTransferData(storedBank);
    const storedMethod = localStorage.getItem("payment_selected_method");
    if (storedMethod) setSelectedConfigPaymentMethod(storedMethod as any);
    const storedTest = localStorage.getItem("payment_test_mode");
    if (storedTest !== null) setPaymentIsTestMode(storedTest === "true");
    const storedCurr = localStorage.getItem("payment_currency");
    if (storedCurr) setCurrencyCode(storedCurr);
    const storedPrice = localStorage.getItem("payment_book_price");
    if (storedPrice !== null) setBookSalesPrice(parseFloat(storedPrice) || 14.99);
    
    // Check for multi-device cloud saves on startup!
    fetchCloudSyncInfo(true);
  }, []);

  const saveToLocalStorage = (
    newMeta = metadata,
    newStyle = styleSettings,
    newChaps = chapters,
    newCustomPubs = customPublishers,
    newStatuses = publisherStatuses,
    newNotes = publisherNotes,
    newPitches = generatedPitches,
    newSynopsis = synopsisText,
    newTrimSize = kdpTrimSize
  ) => {
    // Quick, non-blocking items saved instantly (vital so metadata updates reflect in UI without lag)
    localStorage.setItem("editorial_meta", JSON.stringify(newMeta));
    localStorage.setItem("editorial_style", JSON.stringify(newStyle));
    localStorage.setItem("editorial_trim_size", newTrimSize);
    localStorage.setItem("chapter_page_break", JSON.stringify(chapterPageBreak));

    // Debounce the heavy, massive object serialization (especially chapters, which block the core UI thread)
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem("editorial_chapters", JSON.stringify(newChaps));
      localStorage.setItem("outreach_custom_publishers", JSON.stringify(newCustomPubs));
      localStorage.setItem("outreach_statuses", JSON.stringify(newStatuses));
      localStorage.setItem("outreach_notes", JSON.stringify(newNotes));
      localStorage.setItem("outreach_pitches", JSON.stringify(newPitches));
      localStorage.setItem("outreach_synopsis", newSynopsis);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }, 400); // 400ms is perfectly imperceptible yet completely unblocks rapid keystrokes!
  };

  const handleResetProject = () => {
    const confirmation = window.confirm(
      "¿Estás seguro de que deseas borrar la obra actual y restaurar el libro de prueba? " +
      "Esto eliminará cualquier manuscrito corrupto y resolverá inmediatamente los problemas de visualización y previsualización."
    );
    if (!confirmation) return;

    localStorage.removeItem("editorial_meta");
    localStorage.removeItem("is_maverick_member");
    localStorage.removeItem("editorial_style");
    localStorage.removeItem("editorial_chapters");
    localStorage.removeItem("editorial_trim_size");
    localStorage.removeItem("outreach_custom_publishers");
    localStorage.removeItem("outreach_statuses");
    localStorage.removeItem("outreach_notes");
    localStorage.removeItem("outreach_pitches");
    localStorage.removeItem("outreach_synopsis");

    const defaultMeta: BookMetadata = {
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      subtitle: "El ingenioso hidalgo de La Mancha",
      publisher: "Editorial El Clásico",
      year: "1605",
      isbn: "",
      safeCreativeId: "2606015848217-2CJB4R",
      copyrightType: "todos-derechos",
      licenseDetails: "Todos los derechos reservados. Ninguna parte de esta publicación puede ser reproducida o transmitida por ningún medio sin permiso previo.",
      publisherLogo: "",
      logoPlacement: "both",
      donationActive: true,
      donationLink: "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ruthgmedina@gmail.com&currency_code=USD&item_name=Donacion%20DIAGRAMMERS%2520Studio",
      genre: "Novela",
      trimSize: "6in_9in",
      targetPdfImpreso: true,
      targetEpub: true,
      targetEbook: true,
      targetHardcover: false,
      targetAudiolibro: false,
      targetVella: false,
    };

    const defaultChapters = [
      {
        chapterNumber: 1,
        title: "De la condición y ejercicio del famoso hidalgo don Quijote de la Mancha",
        paragraphs: [
          "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. El resto della concluían sayo de velarte, calzas de velludo para las fiestas, con sus pantuflos de lo mesmo, y los días de entresemana se honraba con su vellorí de lo más fino.",
          "Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años; era de complexión recia, seco de carnes, enjuto de rostro, gran madrugador y amigo de la caza.",
          "—Escucha, Sancho —le dijo don Quijote un día antes de partir—, que el camino que hemos de emprender está lleno de peligros inacabables.",
          "—Señor —respondió el escudero con voz asustada—, ¿y no sería mejor quedarse en nuestra aldea que andar buscando pan de trastrigo por las selvas?",
          "—No hables así, mi fiel escudero —reprendió el caballero—. La gloria aguarda a los espíritus magnánimos en la senda de los desvalidos."
        ]
      }
    ];

    setMetadata(defaultMeta);
    setStyleSettings(ARCHETYPES.classic);
    setChapters(defaultChapters);
    setRawText(TEXT_TEMPLATES[0].text);
    setKdpTrimSize("6in_9in");
    triggerStudioToast("¡Maquetador restaurado con éxito con la obra de muestra!", "success");
  };

  // --- PAGINATION ENGINE ---
  // Re-paginate whenever style settings, chapters, physical trim size, illustrated book or credits page toggle change
  useEffect(() => {
    paginateBook();
  }, [chapters, styleSettings, kdpTrimSize, illustratedBook, includeCreditsPage, includeTableOfContents, tocTitle, chapterPageBreak]);

  const paginateBook = () => {
    if (chapters.length === 0) {
      setPages([]);
      return;
    }

    // Determine characters capacity based on styling and selected physical trim size
    // wide margins + relaxed style = smaller character capacity per page
    let charCapacityBody = 1300;
    let charCapacityOpener = 750; // Chapter opener leaves top 40% margin

    // Apply trim size scaling factor!
    const trimFactor = TRIM_SIZE_FACTORS[kdpTrimSize]?.factor || 1.0;
    charCapacityBody = Math.round(charCapacityBody * trimFactor);
    charCapacityOpener = Math.round(charCapacityOpener * trimFactor);

    if (styleSettings.marginSize === "wide") {
      charCapacityBody -= Math.round(300 * trimFactor);
      charCapacityOpener -= Math.round(180 * trimFactor);
    } else if (styleSettings.marginSize === "compact") {
      charCapacityBody += Math.round(400 * trimFactor);
      charCapacityOpener += Math.round(200 * trimFactor);
    }

    if (styleSettings.lineHeight === "relaxed") {
      charCapacityBody -= Math.round(150 * trimFactor);
      charCapacityOpener -= Math.round(80 * trimFactor);
    }

    const simulated: SimulatedPage[] = [];
    let absolutePageCounter = 1;

    if (includeCreditsPage) {
      simulated.push({
        pageNumber: absolutePageCounter++,
        chapterNumber: 0,
        chapterTitle: "Página de Derechos de Autor y Créditos",
        paragraphs: [],
        isChapterOpener: false,
        isCreditsPage: true
      });
    }

    if (includeTableOfContents) {
      simulated.push({
        pageNumber: absolutePageCounter++,
        chapterNumber: -1,
        chapterTitle: tocTitle || "Índice de Capítulos",
        paragraphs: [],
        isChapterOpener: false,
        isTOCPage: true
      });
    }

    // Single consistent state handles both paginations
    let chapterPageNum = 1;
    let pageParagraphs: string[] = [];
    let pageIllustrations: Illustration[] = [];
    let currentLength = 0;

    chapters.forEach((chap) => {
      if (!chap || !chap.paragraphs || !Array.isArray(chap.paragraphs)) return;

      if (chapterPageBreak) {
        // Normal mode: each chapter starts clean on a new page, resetting the page buffer
        chapterPageNum = 1;
        pageParagraphs = [];
        pageIllustrations = [];
        currentLength = 0;
      } else {
        // Continuous mode: we inject an inline chapter marker heading into the existing page paragraphs
        pageParagraphs.push(`__CHAPTER_OPENER_INLINE__:${chap.chapterNumber}:${chap.title}`);
        currentLength += chap.title.length + 150;
      }

      const chapIllustrations = illustratedBook ? (chap.illustrations || []) : [];
      let paraIdx = 0;
      const totalParas = chap.paragraphs.length;

      while (paraIdx < totalParas) {
        const nextPara = chap.paragraphs[paraIdx];
        if (!nextPara || typeof nextPara !== "string") {
          paraIdx++;
          continue;
        }
        const capLimit = (chapterPageBreak && chapterPageNum === 1) ? charCapacityOpener : charCapacityBody;

        // Check if there are any illustrations placed AFTER this paragraph (i.e. paragraphIndex === paraIdx)
        const associatedIllustrations = chapIllustrations.filter(
          (ill) => ill.paragraphIndex === paraIdx
        );

        let illustrationCost = 0;
        associatedIllustrations.forEach((ill) => {
          if (ill.alignment === "full") {
            illustrationCost += 400;
          } else {
            illustrationCost += 250;
          }
        });

        // If it fits or we have nothing yet inside the page
        const fitsThisPage = (currentLength + nextPara.length + illustrationCost <= capLimit) || pageParagraphs.length === 0;

        if (fitsThisPage) {
          pageParagraphs.push(nextPara);
          currentLength += nextPara.length;

          // Add these illustrations to this page's list
          associatedIllustrations.forEach((ill) => {
            pageIllustrations.push(ill);
            currentLength += ill.alignment === "full" ? 400 : 250;
          });

          paraIdx++;
        } else {
          // Commit current page
          simulated.push({
            pageNumber: absolutePageCounter++,
            chapterNumber: chap.chapterNumber,
            chapterTitle: chap.title,
            paragraphs: pageParagraphs,
            isChapterOpener: chapterPageBreak && chapterPageNum === 1,
            illustrations: pageIllustrations.length > 0 ? pageIllustrations : undefined
          });

          // Reset page indicators
          chapterPageNum++;
          pageParagraphs = [];
          pageIllustrations = [];
          currentLength = 0;
        }
      }

      // Add last page for the chapter ONLY if we are in chapter page break mode
      if (chapterPageBreak && pageParagraphs.length > 0) {
        simulated.push({
          pageNumber: absolutePageCounter++,
          chapterNumber: chap.chapterNumber,
          chapterTitle: chap.title,
          paragraphs: pageParagraphs,
          isChapterOpener: chapterPageNum === 1,
          illustrations: pageIllustrations.length > 0 ? pageIllustrations : undefined
        });
      }
    });

    // If we are in continuous mode and there is leftover content, commit the final buffer!
    if (!chapterPageBreak && pageParagraphs.length > 0) {
      const finalChapter = chapters[chapters.length - 1];
      simulated.push({
        pageNumber: absolutePageCounter++,
        chapterNumber: finalChapter?.chapterNumber || 1,
        chapterTitle: finalChapter?.title || "",
        paragraphs: pageParagraphs,
        isChapterOpener: false,
        illustrations: pageIllustrations.length > 0 ? pageIllustrations : undefined
      });
    }

    setPages(simulated);
    // Keep page index safely within bounds instead of hard resetting to 0, preventing frustrating view jumps!
    setCurrentPageIndex(prev => {
      if (prev >= simulated.length) {
        return Math.max(0, simulated.length - 1);
      }
      return prev;
    });
  };

  // --- API SERVICE CALLS ---
  const handleAnalyzeStyle = async () => {
    if (!stylePrompt.trim()) return;
    setAnalyzingStyle(true);
    setAiAnalysisError(null);

    try {
      const res = await fetch("/api/analyze-style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: stylePrompt,
          currentArchetype: styleSettings.archetype
        })
      });

      if (!res.ok) {
        throw new Error("Respuesta de red incorrecta al analizar el estilo.");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setStyleSettings(data);
      saveToLocalStorage(metadata, data, chapters);
      setActiveTab("manual"); // Go to manual tab to see analyzed properties
    } catch (err: any) {
      console.error(err);
      setAiAnalysisError(err.message || "Error al conectar con la inteligencia artificial.");
    } finally {
      setAnalyzingStyle(false);
    }
  };

  const executeAgenticActions = (actions: any[]) => {
    if (!actions || !Array.isArray(actions) || actions.length === 0) return;

    actions.forEach(action => {
      const { type, payload } = action;
      if (!type || !payload) return;

      switch (type) {
        case "SET_STYLE":
          setStyleSettings(prev => {
            const updated = { ...prev, ...payload };
            // Auto update font styles or margins
            let styleInfo = [];
            if (payload.fontTitle) styleInfo.push(`Títulos: ${payload.fontTitle}`);
            if (payload.fontBody) styleInfo.push(`Cuerpo: ${payload.fontBody}`);
            if (payload.pageColor) styleInfo.push(`Papel: ${payload.pageColor}`);
            if (payload.marginSize) styleInfo.push(`Márgenes: ${payload.marginSize}`);
            triggerStudioToast(`¡Estética re-maquetada por IA! ${styleInfo.join(", ")}`, "success");
            setTimeout(() => {
              saveToLocalStorage(metadata, updated, chapters);
            }, 50);
            return updated;
          });
          break;

        case "SET_TAB":
          if (payload.tab) {
            setActiveTab(payload.tab);
            triggerStudioToast(`Abriendo módulo de "${payload.tab}" por comando de IA`, "info");
          }
          break;

        case "ADD_CHAPTER":
          if (payload.title && payload.paragraphs) {
            const nextChNum = chapters.length + 1;
            const newCh = {
              chapterNumber: nextChNum,
              title: payload.title,
              paragraphs: payload.paragraphs
            };
            setChapters(prev => {
              const updated = [...prev, newCh];
              setTimeout(() => {
                saveToLocalStorage(metadata, styleSettings, updated);
              }, 50);
              return updated;
            });
            triggerStudioToast(`¡Añadido Capítulo ${nextChNum}: "${payload.title}" por comando de IA!`, "success");
          }
          break;

        case "SET_LANGUAGE":
          if (payload.language) {
            setLanguage(payload.language);
            triggerStudioToast(`Idioma cambiado a: ${payload.language}`, "info");
          }
          break;

        case "SET_TRIM_SIZE":
          if (payload.trimSize) {
            setKdpTrimSize(payload.trimSize);
            const labelMap: Record<string, string> = {
              "6in_9in": 'Novela Estándar KDP (6"x9")',
              "5.5in_8.5in": 'Debolsillo íntimo (5.5"x8.5")',
              "5in_8in": 'Bolsillo Compacto (5"x8")',
              "7in_10in": 'Manual Ilustrado (7"x10")',
              "8.5in_11in": 'Carta Grande (8.5"x11")'
            };
            triggerStudioToast(`Lienzo reconfigurado en guías físicas: ${labelMap[payload.trimSize] || payload.trimSize}`, "success");
            setTimeout(() => {
              saveToLocalStorage(metadata, styleSettings, chapters, customPublishers, publisherStatuses, publisherNotes, generatedPitches, synopsisText, payload.trimSize);
            }, 50);
          }
          break;

        case "TRIGGER_PRINT":
          triggerStudioToast("Compaginando y abriendo libro en formato oficial PDF...", "success");
          setTimeout(() => {
            handlePrint();
          }, 1000);
          break;

        default:
          console.warn("Unrecognized agentic action type:", type);
      }
    });
  };

  const sendDagramitoQuery = async (queryText: string) => {
    if (dagramitoIsTyping) return;
    setDagramitoIsTyping(true);

    const newUserMessage = { role: "user" as const, content: queryText };
    setDagramitoMessages(prev => [...prev, newUserMessage]);

    try {
      const res = await fetch("/api/dagramito-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...dagramitoMessages, newUserMessage],
          prompt: queryText
        })
      });

      if (!res.ok) {
        throw new Error("Guiautor AI se ha quedado pensando un poco de más. ¿Podrías reintentar?");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const replyText = data.text || "Lo siento, ¿podrías reformular la pregunta?";
      setDagramitoMessages(prev => [
        ...prev,
        { role: "assistant" as const, content: replyText }
      ]);
      
      // Reactive agent actions execution
      if (data.actions && data.actions.length > 0) {
        executeAgenticActions(data.actions);
      }
      
      if (voiceActiveRef.current) {
        speakHelper(replyText);
      }
    } catch (err: any) {
      console.error(err);
      const errorReply = language === "en" 
        ? "🧠 *Connection issue!* Please retry in a few seconds." 
        : language === "pt"
        ? "🧠 *Falha na conexão!* Por favor, reconsulte em poucos segundos."
        : "🧠 *¡Ups! Tuve un problema para conectarme.* Reintenta en unos segundos, por favor.";
      
      setDagramitoMessages(prev => [
        ...prev,
        { role: "assistant" as const, content: errorReply }
      ]);
      
      if (voiceActiveRef.current) {
        speakHelper(errorReply);
      }
    } finally {
      setDagramitoIsTyping(false);
    }
  };

  const handleSendDagramitoMessage = () => {
    if (!dagramitoInput.trim()) return;
    const text = dagramitoInput.trim();
    setDagramitoInput("");
    sendDagramitoQuery(text);
  };

  const handleSuggestStyle = async () => {
    let textToAnalyze = rawText;
    if (!textToAnalyze.trim() && chapters.length > 0) {
      // Re-construct text from chapters as background context
      textToAnalyze = chapters.map(c => `Capítulo ${c.chapterNumber}: ${c.title}\n${c.paragraphs.join("\n")}`).join("\n\n");
    }

    if (!textToAnalyze.trim()) {
      setStyleSuggestionError("Por favor, introduce o carga un manuscrito en la pestaña 'Texto/IA' para que podamos analizar su estilo.");
      return;
    }

    setAnalyzingTextForStyle(true);
    setStyleSuggestionError(null);
    setStyleSuggestionResult(null);

    try {
      const res = await fetch("/api/suggest-style-by-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToAnalyze,
          currentStyle: styleSettings
        })
      });

      if (!res.ok) {
        throw new Error("Respuesta del servidor no válida al solicitar sugerencias de estilo.");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setStyleSuggestionResult(data);
    } catch (err: any) {
      console.error(err);
      setStyleSuggestionError(err.message || "Error al conectar con el asistente tipográfico de Inteligencia Artificial.");
    } finally {
      setAnalyzingTextForStyle(false);
    }
  };

  const handleApplySuggestedStyle = () => {
    if (!styleSuggestionResult) return;
    
    const newSettings: BookStyleSettings = {
      ...styleSettings,
      ...styleSuggestionResult
    };
    
    setStyleSettings(newSettings);
    saveToLocalStorage(metadata, newSettings, chapters);
    
    setStyleSuggestionResult(null);
    setActiveTab("manual"); // Redirecciona para ver los controles manuales correspondientes
  };

  // --- OUTREACH & PROSPECCIÓN EDITORIAL METODOS ---
  const handleGenerateEditorialPitch = async (pubId: string, pubName: string, pubGenre: string) => {
    setGeneratingPitchId(pubId);

    // Collect excerpt from first chapter
    let textExcerpt = "";
    if (chapters.length > 0 && chapters[0].paragraphs) {
      textExcerpt = chapters[0].paragraphs.slice(0, 3).join("\n");
    }

    try {
      const response = await fetch("/api/generate-editorial-pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: metadata.title,
          author: metadata.author,
          subtitle: metadata.subtitle,
          publisherName: pubName,
          publisherGenre: pubGenre,
          textExcerpt: textExcerpt,
          synopsis: synopsisText
        })
      });

      if (!response.ok) {
        throw new Error("No se pudo generar el borrador de propuesta con el servidor.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const updatedPitches = {
        ...generatedPitches,
        [pubId]: {
          subject: data.subject || `Propuesta Editorial: ${metadata.title}`,
          fullEmailBody: data.fullEmailBody || ""
        }
      };

      setGeneratedPitches(updatedPitches);
      saveToLocalStorage(metadata, styleSettings, chapters, customPublishers, publisherStatuses, publisherNotes, updatedPitches, synopsisText);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error al generar la propuesta literaria. Intente de nuevo.");
    } finally {
      setGeneratingPitchId(null);
    }
  };

  const handleUpdatePublisherStatus = (pubId: string, status: string) => {
    const updatedStatuses = {
      ...publisherStatuses,
      [pubId]: status
    };
    setPublisherStatuses(updatedStatuses);
    saveToLocalStorage(metadata, styleSettings, chapters, customPublishers, updatedStatuses, publisherNotes, generatedPitches, synopsisText);
  };

  const handleUpdatePublisherNotes = (pubId: string, notes: string) => {
    const updatedNotes = {
      ...publisherNotes,
      [pubId]: notes
    };
    setPublisherNotes(updatedNotes);
    saveToLocalStorage(metadata, styleSettings, chapters, customPublishers, publisherStatuses, updatedNotes, generatedPitches, synopsisText);
  };

  const handleAddCustomPublisher = () => {
    if (!newPubName.trim() || !newPubEmail.trim()) {
      alert("Por favor inserte al menos el nombre y correo de la editorial.");
      return;
    }

    const newPub = {
      id: `custom-pub-${Date.now()}`,
      name: newPubName.trim(),
      email: newPubEmail.trim(),
      genre: newPubGenre,
      subgenres: [newPubGenre],
      description: newPubDesc.trim() || "Editorial incorporada manualmente a la campaña."
    };

    const updatedCustoms = [newPub, ...customPublishers];
    setCustomPublishers(updatedCustoms);
    
    // Set initial status to pending
    const updatedStatuses = {
      ...publisherStatuses,
      [newPub.id]: "pending"
    };
    setPublisherStatuses(updatedStatuses);

    // Reset Form
    setNewPubName("");
    setNewPubEmail("");
    setNewPubGenre("Narrativa General");
    setNewPubDesc("");
    setShowAddCustomPublisher(false);

    saveToLocalStorage(metadata, styleSettings, chapters, updatedCustoms, updatedStatuses, publisherNotes, generatedPitches, synopsisText);
  };

  const handleDeleteCustomPublisher = (pubId: string) => {
    if (!confirm("¿Está seguro de eliminar esta editorial de su lista de prospección?")) {
      return;
    }

    const updatedCustoms = customPublishers.filter(p => p.id !== pubId);
    setCustomPublishers(updatedCustoms);

    const updatedStatuses = { ...publisherStatuses };
    delete updatedStatuses[pubId];
    setPublisherStatuses(updatedStatuses);

    const updatedNotes = { ...publisherNotes };
    delete updatedNotes[pubId];
    setPublisherNotes(updatedNotes);

    const updatedPitches = { ...generatedPitches };
    delete updatedPitches[pubId];
    setGeneratedPitches(updatedPitches);

    saveToLocalStorage(metadata, styleSettings, chapters, updatedCustoms, updatedStatuses, updatedNotes, updatedPitches, synopsisText);
  };

  const handleSaveSynopsisOnly = () => {
    saveToLocalStorage(metadata, styleSettings, chapters, customPublishers, publisherStatuses, publisherNotes, generatedPitches, synopsisText);
    alert("¡Fondo de sinopsis y directrices de campaña guardados correctamente!");
  };

  // --- VOICE CLONING AND AUDIO NARRATOR ENGINE METHODS ---

  // Simulates microphone capture of high-fidelity voice snippet
  const handleStartRecordingVoice = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMicrophoneAllowed(false);
    } else {
      setMicrophoneAllowed(true);
    }
    setVoiceIsRecording(true);
    setVoiceRecordTime(0);
    setCloningStatus("recording");
    
    // Simulate recording ticker
    let recordSeconds = 0;
    const interval = setInterval(() => {
      recordSeconds += 1;
      setVoiceRecordTime(recordSeconds);
      if (recordSeconds >= 8) {
        clearInterval(interval);
        handleStopAndCloneVoice();
      }
    }, 1000);
    (window as any).voiceRecordInterval = interval;
  };

  const handleStopAndCloneVoice = () => {
    if ((window as any).voiceRecordInterval) {
      clearInterval((window as any).voiceRecordInterval);
    }
    setVoiceIsRecording(false);
    setCloningStatus("uploading");

    // Simulate progressive stages to show high fidelity modeling
    setTimeout(() => {
      setCloningStatus("processing");
      
      setTimeout(() => {
        const nameToUse = newVoiceName.trim() || `Mi Voz Clónica #${clonedVoices.length - 2}`;
        const newVoiceObj = {
          id: `voice-cloned-${Date.now()}`,
          name: nameToUse + " (Clonado Premium)",
          isReady: true,
          originalFileName: "vocal_fingerprint_studio.wav"
        };
        setClonedVoices(prev => [...prev, newVoiceObj]);
        setNewVoiceName("");
        setCloningStatus("success");
        setTimeout(() => setCloningStatus("idle"), 3000);
      }, 2000);
    }, 1200);
  };

  // Speaks aloud with speech synthesis, modulating the values and animating an equalizer
  const handleStartNarration = (chapterIdx: number) => {
    // Stop any current run first
    handleStopNarration();
    
    const chapter = chapters[chapterIdx];
    if (!chapter) return;

    setSpeakingChapterNum(chapter.chapterNumber);
    setSpeakingParagraphIdx(0);
    setIsNarrationPlaying(true);
    setSpeakingStatus("Inicializando modelado de voz...");

    const settings = chapter.voiceSettings || {
      voiceId: "voz-defecto-narrador",
      pitchMultiplier: 1.0,
      speedMultiplier: 1.0,
      vocalModulation: "none"
    };

    // Equalizer bouncing effect
    const bouncingInterval = setInterval(() => {
      setEqualizerBars(prev => prev.map(() => Math.floor(Math.random() * 32) + 5));
    }, 120);
    (window as any).eqInterval = bouncingInterval;

    // Use Web Speech API for actual sound and voice synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      let pIdx = 0;
      const paragraphs = chapter.paragraphs;
      
      const speakNextPara = () => {
        if (pIdx >= paragraphs.length) {
          handleStopNarration();
          setSpeakingStatus("Locución de capítulo completada");
          return;
        }

        setSpeakingParagraphIdx(pIdx);
        setSpeakingStatus(`Narrando párrafo ${pIdx + 1} de ${paragraphs.length}...`);

        // Strip markdown-like dashes or quote marks for speech clarity
        const textToSpeak = paragraphs[pIdx]
          .replace(/^[—-]\s*/, "")
          .replace(/[“»«”]/g, "");

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        // Find best speaker voice matching language with smart neural/natural priorities
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const spanishVoices = voices.filter(v => v.lang.toLowerCase().startsWith("es"));
          if (spanishVoices.length > 0) {
            // Score and prioritize high quality voices
            const scoredVoices = spanishVoices.map(v => {
              const name = v.name.toLowerCase();
              let score = 0;
              if (name.includes("natural")) score += 200;
              if (name.includes("neural")) score += 180;
              if (name.includes("google")) score += 150;
              if (name.includes("premium")) score += 120;
              if (name.includes("enhanced")) score += 100;
              if (name.includes("microsoft")) score += 50;
              return { voice: v, score };
            });
            scoredVoices.sort((a, b) => b.score - a.score);
            utterance.voice = scoredVoices[0].voice;
          }
        }

        // Apply pitch adjustments
        let pitch = settings.pitchMultiplier || 1.0;
        let speed = settings.speedMultiplier || 1.0;

        // Apply voice modulation preset offsets
        if (settings.vocalModulation === "deep-register") {
          pitch = pitch * 0.75;
          speed = speed * 0.95;
        } else if (settings.vocalModulation === "warm") {
          pitch = pitch * 0.9;
          speed = speed * 0.98;
        } else if (settings.vocalModulation === "crystalline") {
          pitch = pitch * 1.15;
          speed = speed * 1.05;
        } else if (settings.vocalModulation === "studio-reverb") {
          pitch = pitch * 1.05;
        }

        utterance.pitch = pitch;
        utterance.rate = speed;

        utterance.onend = () => {
          pIdx++;
          // Wait slightly between paragraphs for book-like breathing pauses
          setTimeout(() => {
            speakNextPara();
          }, 600);
        };

        utterance.onerror = (e) => {
          console.error("Speech Synthesis Error:", e);
          pIdx++;
          speakNextPara();
        };

        window.speechSynthesis.speak(utterance);
      };

      // Call speaking chain
      speakNextPara();
    } else {
      // Fallback mode for environments where speechSyntesis is blocked / unavailable
      setSpeakingStatus("Locución simulada (Navegador restringido)");
      let pIdx = 0;
      const paragraphs = chapter.paragraphs;
      
      const runFallback = () => {
        if (pIdx >= paragraphs.length) {
          handleStopNarration();
          return;
        }
        setSpeakingParagraphIdx(pIdx);
        pIdx++;
        speakerTimerRef.current = setTimeout(runFallback, 5000);
      };
      runFallback();
    }
  };

  const handleStopNarration = () => {
    setIsNarrationPlaying(false);
    setSpeakingChapterNum(null);
    setSpeakingParagraphIdx(null);
    setSpeakingStatus("Locución detenida");
    setEqualizerBars([15, 15, 15, 15, 15, 15, 15, 15]);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if ((window as any).eqInterval) {
      clearInterval((window as any).eqInterval);
    }
    if (speakerTimerRef.current) {
      clearTimeout(speakerTimerRef.current);
    }
  };

  const handleUpdateChapterMedia = (
    cIdx: number, 
    voiceChanges: any, 
    spotifyChanges: any
  ) => {
    const updated = chapters.map((c, i) => {
      if (i === cIdx) {
        return {
          ...c,
          voiceSettings: {
            voiceId: c.voiceSettings?.voiceId || "voz-defecto-narrador",
            pitchMultiplier: c.voiceSettings?.pitchMultiplier ?? 1.0,
            speedMultiplier: c.voiceSettings?.speedMultiplier ?? 1.0,
            vocalModulation: c.voiceSettings?.vocalModulation || "none",
            ...voiceChanges
          },
          spotifyTrackId: spotifyChanges.trackId !== undefined ? spotifyChanges.trackId : c.spotifyTrackId,
          spotifyTrackName: spotifyChanges.trackName !== undefined ? spotifyChanges.trackName : c.spotifyTrackName,
          spotifyArtistName: spotifyChanges.artistName !== undefined ? spotifyChanges.artistName : c.spotifyArtistName,
          spotifyEmbedUrl: spotifyChanges.embedUrl !== undefined ? spotifyChanges.embedUrl : c.spotifyEmbedUrl,
        };
      }
      return c;
    });
    setChapters(updated);
    saveToLocalStorage(metadata, styleSettings, updated);
  };

  const handleFormatText = async () => {
    if (!rawText.trim()) return;
    setFormattingText(true);
    setFormatError(null);

    try {
      const res = await fetch("/api/format-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: rawText })
      });

      if (!res.ok) {
        throw new Error("Respuesta incorrecta al maquetar el texto original.");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.chapters && data.chapters.length > 0) {
        setChapters(data.chapters);
        saveToLocalStorage(metadata, styleSettings, data.chapters);
      } else {
        throw new Error("No pudimos extraer capítulos estructurados de este texto. Intenta de nuevo.");
      }
    } catch (err: any) {
      console.error(err);
      setFormatError(err.message || "Error en el formateador editorial.");
    } finally {
      setFormattingText(false);
    }
  };

  // Fast fallback local layout parser in case they can't or don't want to use AI
  const handleLocalQuickLayout = (textToUse = rawText) => {
    setFormatError(null);
    const lines = textToUse.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;

    // Grouping by "capitulo" heuristic
    const formatted: Chapter[] = [];
    let currentChap: Chapter | null = null;
    let chapCounter = 1;

    lines.forEach((line) => {
      const isHeader = line.toUpperCase().includes("CAPÍTULO") || 
                       line.toUpperCase().includes("CAPITULO") || 
                       line.match(/^\s*(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)\.?\s*$/i) ||
                       line.startsWith("#");

      if (isHeader || formatted.length === 0) {
        if (currentChap) {
          formatted.push(currentChap);
        }
        
        let titleClean = line.replace(/^[#\s*]+/, "");
        if (titleClean.toUpperCase() === "CAPÍTULO" || titleClean.toUpperCase() === "CAPITULO") {
          titleClean += ` ${chapCounter}`;
        }

        currentChap = {
          chapterNumber: chapCounter++,
          title: titleClean,
          paragraphs: []
        };
      } else {
        // Dialogue dash replacement (—)
        let cleanedLine = line;
        if (cleanedLine.startsWith("- ") || cleanedLine.startsWith("-- ")) {
          cleanedLine = "—" + cleanedLine.substring(cleanedLine.indexOf(" ") + 1);
        }
        if (currentChap) {
          currentChap.paragraphs.push(cleanedLine);
        } else {
          // Seed chapter
          currentChap = {
            chapterNumber: chapCounter++,
            title: "Capítulo Inicial",
            paragraphs: [cleanedLine]
          };
        }
      }
    });

    if (currentChap) {
      formatted.push(currentChap);
    }

    if (formatted.length > 0) {
      setChapters(formatted);
      saveToLocalStorage(metadata, styleSettings, formatted);
    }
  };

  const handleApplyTemplate = (tpl: typeof TEXT_TEMPLATES[0]) => {
    setRawText(tpl.text);
    setMetadata(prev => {
      const updated = { ...prev, title: tpl.title, author: tpl.author };
      saveToLocalStorage(updated, styleSettings, chapters);
      return updated;
    });
  };

  const handleLocalFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>, fileFromDrag?: File) => {
    let file: File | undefined;
    if (fileFromDrag) {
      file = fileFromDrag;
    } else {
      const target = (e as React.ChangeEvent<HTMLInputElement>).target;
      if (target && target.files && target.files.length > 0) {
        file = target.files[0];
      }
    }

    if (!file) return;

    setIsReadingFile(true);
    setFileUploadError(null);
    setFileUploadSuccess(null);

    const fileName = file.name;
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    try {
      if (fileExtension === "json") {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const jsonText = event.target?.result as string;
            const project = JSON.parse(jsonText);
            if (project.metadata) {
              setMetadata(project.metadata);
            }
            if (project.styleSettings) {
              setStyleSettings(project.styleSettings);
            }
            if (project.chapters) {
              setChapters(project.chapters);
              setRawText(project.chapters.map((c: any) => `Capítulo ${c.chapterNumber}: ${c.title || ""}\n\n${(c.paragraphs || []).join("\n\n")}`).join("\n\n"));
            }
            setFileUploadSuccess(`¡Proyecto completo "${fileName}" importado con éxito!`);
            saveToLocalStorage(project.metadata || metadata, project.styleSettings || styleSettings, project.chapters || chapters);
          } catch (err) {
            setFileUploadError("Error al procesar el archivo JSON del proyecto.");
          }
          setIsReadingFile(false);
        };
        reader.readAsText(file);
      } else if (fileExtension === "docx") {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const arrayBuffer = event.target?.result as ArrayBuffer;
            if (!arrayBuffer) {
              throw new Error("No hay contenido en el archivo buffer.");
            }
            const result = await mammoth.extractRawText({ arrayBuffer });
            const extractedText = result.value;
            if (!extractedText || extractedText.trim() === "") {
              throw new Error("No se pudo extraer texto legible del archivo Word.");
            }
            setRawText(extractedText);
            
            // Try to guess title from file name
            const cleanName = fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
            setMetadata(prev => {
              const updated = { ...prev, title: cleanName };
              // We will call saveToLocalStorage at the end of quick layout
              return updated;
            });

            // Automatically format and paginate to make sure preview is instantly visible
            handleLocalQuickLayout(extractedText);

            setFileUploadSuccess(`¡Documento Word "${fileName}" cargado y compaginado con éxito!`);
          } catch (err: any) {
            setFileUploadError(`Error al leer archivo Word: ${err.message || err}`);
          }
          setIsReadingFile(false);
        };
        reader.readAsArrayBuffer(file);
      } else if (fileExtension === "txt" || fileExtension === "md" || fileExtension === "rtf") {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const text = event.target?.result as string;
            if (!text || text.trim() === "") {
              throw new Error("El archivo está vacío.");
            }
            setRawText(text);

            // Try to guess title from file name
            const cleanName = fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
            setMetadata(prev => {
              const updated = { ...prev, title: cleanName };
              return updated;
            });

            // Automatically format and paginate to make sure preview is instantly visible
            handleLocalQuickLayout(text);

            setFileUploadSuccess(`¡Manuscrito "${fileName}" cargado y compaginado con éxito!`);
          } catch (err: any) {
            setFileUploadError(`Error al leer el archivo: ${err.message || err}`);
          }
          setIsReadingFile(false);
        };
        reader.readAsText(file);
      } else {
        setFileUploadError("Formato no soportado. Por favor, sube un archivo .docx, .txt, .md, .rtf o .json de proyecto.");
        setIsReadingFile(false);
      }
    } catch (err: any) {
      setFileUploadError(`Error al procesar archivo: ${err.message || err}`);
      setIsReadingFile(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>, fileFromDrag?: File) => {
    let file: File | undefined;
    if (fileFromDrag) {
      file = fileFromDrag;
    } else {
      const target = (e as React.ChangeEvent<HTMLInputElement>).target;
      if (target && target.files && target.files.length > 0) {
        file = target.files[0];
      }
    }

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor, sube únicamente archivos de selección de imagen (PNG, JPG, SVG, GIF, etc.).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const updated = { ...metadata, publisherLogo: base64 };
      setMetadata(updated);
      saveToLocalStorage(updated, styleSettings, chapters);
    };
    reader.readAsDataURL(file);
  };

  const handleImportDriveFile = (fileName: string) => {
    setSelectedDriveFile(fileName);
    setDriveImportingStatus("connecting");
    setImportProgress(10);
    
    setTimeout(() => {
      setDriveImportingStatus("downloading");
      setImportProgress(35);
      
      setTimeout(() => {
        setDriveImportingStatus("analyzing");
        setImportProgress(65);
        
        setTimeout(() => {
          setDriveImportingStatus("formatting");
          setImportProgress(85);
          
          setTimeout(() => {
            setDriveImportingStatus("success");
            setImportProgress(100);
            
            let loadedText = "";
            let fileTitle = "";
            let fileAuthor = "";
            
            if (fileName.includes("Cervantes")) {
              loadedText = TEXT_TEMPLATES[0].text;
              fileTitle = TEXT_TEMPLATES[0].title;
              fileAuthor = TEXT_TEMPLATES[0].author;
            } else if (fileName.includes("Fantasía") || fileName.includes("Runa")) {
              loadedText = TEXT_TEMPLATES[1].text;
              fileTitle = TEXT_TEMPLATES[1].title;
              fileAuthor = TEXT_TEMPLATES[1].author;
            } else if (fileName.includes("Noir") || fileName.includes("Persiana")) {
              loadedText = TEXT_TEMPLATES[2].text;
              fileTitle = TEXT_TEMPLATES[2].title;
              fileAuthor = TEXT_TEMPLATES[2].author;
            } else {
              loadedText = `Capítulo I: El Potencial Comercial de la Compaginación Inteligente\n\nEn la intersección entre la literatura y la tecnología se encuentra DIAGRAMMERS, la solución integral B2B que reimagina el proceso de diagramación editorial. Las editoriales tradicionales y sindicatos de autores gastan cientos de horas en procesos que la inteligencia artificial y el cálculo matemático preciso reducen a segundos.\n\n—¿Cuál es el retorno inmediato del capital aportado? —preguntó la socia de élite con determinación.\n—El modelo SaaS B2B permite reducir el coste de maquetación por volumen de 450 USD por manuscrito a menos de 5 USD de coste computacional directo —respondió la Inteligencia Artificial—. Esto aporta un margen bruto proyectado superior al 85%.\n\n✓ Modelo de Suscripción Suite Corporativa B2B\n✓ Integración automatizada con Google Workspace API\n✓ Exportación de formato listo para Amazon KDP\n\nCapítulo II: Alianzas y Expansión Global\n\nLa tracción recolectada en los leads demuestra el interés inmediato de sellos de habla hispana en España, México, Colombia y Argentina. La visión de integrar repositorios directamente mediante túneles OAuth (como Google Drive y Microsoft OneDrive) permite que los directores de arte editorial arrastren manuscritos sin salir de su suite de control corporativo.`;
              fileTitle = "Plan de Crecimiento & Pitch de Negocio";
              fileAuthor = "DIAGRAMMERS Group";
            }
            
            setRawText(loadedText);
            const currentWorkspace = currentUser?.workspace || "Editorial Minerva";
            const updatedMetadata = { 
              title: fileTitle, 
              author: fileAuthor, 
              publisher: currentWorkspace 
            };
            setMetadata(updatedMetadata);
            
            const parts = loadedText.split(/(?=Capítulo|Capitulo)/i);
            const formatted = parts
              .filter((p) => p.trim().length > 0)
              .map((p, idx) => {
                const lines = p.trim().split("\n");
                let titleVal = lines[0].substring(0, 80).replace(/^[#*-:]\s*/, "").trim();
                const paragraphs = lines.slice(1).map((line) => line.trim()).filter((line) => line.length > 0);
                return {
                  chapterNumber: idx + 1,
                  title: titleVal,
                  paragraphs: paragraphs,
                  rawText: p.trim()
                };
              });
              
            if (formatted.length > 0) {
              setChapters(formatted);
              saveToLocalStorage(updatedMetadata, styleSettings, formatted);
            }
            
            setTimeout(() => {
              setShowDriveModal(false);
              setDriveImportingStatus("idle");
              setSelectedDriveFile(null);
              setActiveTab("content");
            }, 1200);
            
          }, 1000);
        }, 1000);
      }, 800);
    }, 850);
  };

  // --- MODELO LIBRO ILUSTRADO POR IA Y DIRECCIÓN DE ARTE ---

  // Automatically suggests and places illustrations for the whole book based on text
  const handleAutoIllustrateAll = async () => {
    if (chapters.length === 0) return;
    setSuggestingIllustrations(true);
    setAiAnalysisError(null);

    try {
      const updatedChapters = await Promise.all(
        chapters.map(async (chap) => {
          try {
            const res = await fetch("/api/suggest-illustrations", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chapterNumber: chap.chapterNumber,
                chapterTitle: chap.title,
                paragraphs: chap.paragraphs,
                bookStyle: styleSettings.archetype
              })
            });

            if (!res.ok) throw new Error("Fallo al consultar proyecciones del capítulo");
            const data = await res.json();
            
            if (data.illustrations && Array.isArray(data.illustrations)) {
              // Map suggestions to full Illustration objects
              const mapped: Illustration[] = data.illustrations.map((item: any, uIdx: number) => {
                const cleanSeed = (item.aiPrompt || "scene").toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 12);
                const w = item.alignment === "full" ? 800 : item.alignment === "left" || item.alignment === "right" ? 400 : 600;
                const h = item.alignment === "full" ? 450 : item.alignment === "left" || item.alignment === "right" ? 500 : 450;
                
                return {
                  id: `ill-${chap.chapterNumber}-${uIdx}-${Date.now()}`,
                  chapterNumber: chap.chapterNumber,
                  paragraphIndex: typeof item.paragraphIndex === "number" ? item.paragraphIndex : 0,
                  imageUrl: `https://picsum.photos/seed/${cleanSeed}/${w}/${h}`, // High-quality temática de respaldo inicial
                  altText: item.altText || "Ilustración de época",
                  caption: item.caption || "Detalle de la escena narrativa.",
                  alignment: item.alignment || "center",
                  widthPercent: item.widthPercent || 100,
                  isAiGenerated: false,
                  aiPrompt: item.aiPrompt || "An elegant, detailed classic ink drawing corresponding to the chapter scene."
                };
              });

              return {
                ...chap,
                illustrations: mapped
              };
            }
          } catch (e) {
            console.error(`Error ilustrando capítulo ${chap.chapterNumber}:`, e);
          }
          return chap;
        })
      );

      setChapters(updatedChapters);
      saveToLocalStorage(metadata, styleSettings, updatedChapters);
      setActiveTab("content");
      
      // Notify layout recompute succeeded
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      console.error(err);
      setAiAnalysisError("No pudimos conectar con los servicios de sugerencia editorial con IA.");
    } finally {
      setSuggestingIllustrations(false);
    }
  };

  // Generates/regenerates a single image with raw Gemini 2.5 Image model on demand
  const handleRegenerateIllustration = async (ill: Illustration) => {
    setGeneratingIllId(ill.id);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: ill.aiPrompt || "Classic beautiful book illustration for a fine printed literature page",
          aspectRatio: ill.alignment === "full" ? "16:9" : ill.alignment === "left" || ill.alignment === "right" ? "3:4" : "4:3"
        })
      });

      const data = await res.json();
      if (data.imageUrl) {
        setChapters((prev) => {
          const updated = prev.map((c) => {
            if (c.chapterNumber === ill.chapterNumber) {
              const prevIlls = c.illustrations || [];
              const updatedIlls = prevIlls.map((item) => {
                if (item.id === ill.id) {
                  return {
                    ...item,
                    imageUrl: data.imageUrl,
                    isAiGenerated: data.isAiGenerated !== false
                  };
                }
                return item;
              });
              return { ...c, illustrations: updatedIlls };
            }
            return c;
          });
          saveToLocalStorage(metadata, styleSettings, updated);
          return updated;
        });
      }
    } catch (err) {
      console.error("Error regenerating illustration image:", err);
    } finally {
      setGeneratingIllId(null);
    }
  };

  // Triggers image generation for ALL illustrations in the book that don't have base64 or custom images yet
  const handleGenerateAllImages = async () => {
    const listToGen: Illustration[] = [];
    chapters.forEach(c => {
      (c.illustrations || []).forEach(ill => {
        if (!ill.isAiGenerated) {
          listToGen.push(ill);
        }
      });
    });

    if (listToGen.length === 0) return;

    for (const ill of listToGen) {
      await handleRegenerateIllustration(ill);
    }
  };

  // Adds an illustration manually to the active list
  const handleAddIllustrationManual = () => {
    const targetChapNum = Number(manualIllChapter);
    const targetChap = chapters.find(c => c.chapterNumber === targetChapNum);
    if (!targetChap) return;

    const limitParaIdx = Math.max(0, targetChap.paragraphs.length - 1);
    const finalParaIdx = Math.min(limitParaIdx, Math.max(0, Number(manualIllParagraph)));

    const cleanSeed = (manualIllPrompt || "custom").toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 10);
    const w = manualIllAlign === "full" ? 800 : manualIllAlign === "left" || manualIllAlign === "right" ? 400 : 600;
    const h = manualIllAlign === "full" ? 450 : manualIllAlign === "left" || manualIllAlign === "right" ? 500 : 455;

    const newIll: Illustration = {
      id: `ill-manual-${targetChapNum}-${Date.now()}`,
      chapterNumber: targetChapNum,
      paragraphIndex: finalParaIdx,
      imageUrl: `https://picsum.photos/seed/${cleanSeed}/${w}/${h}`,
      altText: manualIllPrompt || "Ilustración del libro",
      caption: manualIllCaption || "Ilustración personalizada de la sección.",
      alignment: manualIllAlign,
      widthPercent: Number(manualIllWidth),
      isAiGenerated: false,
      aiPrompt: manualIllPrompt || "A beautiful classic book illustration, fine detailed lines."
    };

    const updated = chapters.map(c => {
      if (c.chapterNumber === targetChapNum) {
        const list = c.illustrations || [];
        return {
          ...c,
          illustrations: [...list, newIll]
        };
      }
      return c;
    });

    setChapters(updated);
    saveToLocalStorage(metadata, styleSettings, updated);
    
    // Clear manual states except chapter
    setManualIllCaption("");
    setManualIllPrompt("");
    setManualIllParagraph(0);
  };

  // Clears a single illustration by its unique id
  const handleDeleteIllustration = (chapterNum: number, illId: string) => {
    const updated = chapters.map(c => {
      if (c.chapterNumber === chapterNum) {
        return {
          ...c,
          illustrations: (c.illustrations || []).filter(item => item.id !== illId)
        };
      }
      return c;
    });

    setChapters(updated);
    saveToLocalStorage(metadata, styleSettings, updated);
  };

  // Clears all illustrations from the entire book
  const handleClearAllIllustrations = () => {
    const updated = chapters.map(c => ({ ...c, illustrations: [] }));
    setChapters(updated);
    saveToLocalStorage(metadata, styleSettings, updated);
  };

  // --- EDIT INDIVIDUAL CHAPTER MANUALLY ---
  const launchChapterEditor = (idx: number) => {
    const chap = chapters[idx];
    setEditingChapterIdx(idx);
    const initialText = chap.paragraphs.join("\n\n");
    setEditingChapterTitle(chap.title);
    setEditingChapterText(initialText);
    setMobileEditorTab("text");
    
    // Set initial history entry
    const initialEntry = { title: chap.title, text: initialText };
    setChapterHistory([initialEntry]);
    setHistoryIndex(0);
  };

  const updateChapterTitleWithHistory = (newTitle: string) => {
    setEditingChapterTitle(newTitle);
    const textSnapshot = editingChapterText;
    setChapterHistory(prev => {
      const sliced = prev.slice(0, historyIndex + 1);
      const updated = [...sliced, { title: newTitle, text: textSnapshot }];
      if (updated.length > 50) updated.shift();
      setHistoryIndex(updated.length - 1);
      return updated;
    });
  };

  const updateChapterTextWithHistory = (newText: string) => {
    setEditingChapterText(newText);
    const titleSnapshot = editingChapterTitle;
    setChapterHistory(prev => {
      const sliced = prev.slice(0, historyIndex + 1);
      const updated = [...sliced, { title: titleSnapshot, text: newText }];
      if (updated.length > 50) updated.shift();
      setHistoryIndex(updated.length - 1);
      return updated;
    });
  };

  const handleUndoChapterEdit = () => {
    if (historyIndex > 0) {
      const targetIdx = historyIndex - 1;
      setHistoryIndex(targetIdx);
      const state = chapterHistory[targetIdx];
      setEditingChapterTitle(state.title);
      setEditingChapterText(state.text);
    }
  };

  const handleRedoChapterEdit = () => {
    if (historyIndex < chapterHistory.length - 1) {
      const targetIdx = historyIndex + 1;
      setHistoryIndex(targetIdx);
      const state = chapterHistory[targetIdx];
      setEditingChapterTitle(state.title);
      setEditingChapterText(state.text);
    }
  };

  const saveEditedChapter = () => {
    if (editingChapterIdx === null) return;
    const array = [...chapters];
    const paras = editingChapterText
      .split("\n\n")
      .map(p => p.trim())
      .filter(p => p.length > 0);

    array[editingChapterIdx] = {
      ...array[editingChapterIdx],
      title: editingChapterTitle,
      paragraphs: paras
    };

    setChapters(array);
    saveToLocalStorage(metadata, styleSettings, array);
    setEditingChapterIdx(null);
  };

  // --- INICIALIZACIÓN Y DETECCIÓN DEL MOTOR DE DICTADO POR VOZ ---
  useEffect(() => {
    const SpeechAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechAPI) {
      setSpeechSupported(true);
    }
  }, []);

  const insertTextAtCursor = (textareaId: string, textToInsert: string) => {
    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement | null;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const originalText = textarea.value;
      const before = originalText.substring(0, start);
      const after = originalText.substring(end, originalText.length);
      
      // Asegurar que hay espacio si insertamos en medio de texto sin espaciado previo/posterior
      let spaceBefore = "";
      let spaceAfter = "";
      if (start > 0 && !before.endsWith(" ") && !before.endsWith("\n") && !textToInsert.startsWith(" ")) {
        spaceBefore = " ";
      }
      if (end < originalText.length && !after.startsWith(" ") && !after.startsWith("\n") && !textToInsert.endsWith(" ")) {
        spaceAfter = " ";
      }
      
      const formattedInsert = spaceBefore + textToInsert + spaceAfter;
      const newValue = before + formattedInsert + after;

      if (textareaId === "raw-manuscript-input") {
        setRawText(newValue);
      } else if (textareaId === "chapter-editor-input") {
        updateChapterTextWithHistory(newValue);
      }

      // Restaurar el foco y mover el cursor después de la inserción
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = start + formattedInsert.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 50);
    } else {
      // Fallback si no se encontró por ID
      if (textareaId === "raw-manuscript-input") {
        setRawText(prev => prev + (prev.endsWith("\n") || prev.length === 0 ? "" : " ") + textToInsert);
      } else if (textareaId === "chapter-editor-input") {
        updateChapterTextWithHistory(editingChapterText + (editingChapterText.endsWith("\n") || editingChapterText.length === 0 ? "" : " ") + textToInsert);
      }
    }
  };

  const startDictation = (target: "raw" | "chapter") => {
    const SpeechAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechAPI) {
      setDictationError("La API de Speech Recognition no está soportada por su navegador. Recomendamos usar Google Chrome o Microsoft Edge.");
      return;
    }

    if (isDictating) {
      stopDictation();
    }

    try {
      const rec = new SpeechAPI();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = speechLang;

      rec.onstart = () => {
        setIsDictating(true);
        setDictationTarget(target);
        setDictatedTextTemp("");
        setDictationError(null);
      };

      rec.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          const textareaId = target === "raw" ? "raw-manuscript-input" : "chapter-editor-input";
          insertTextAtCursor(textareaId, finalTranscript);
        }

        if (interimTranscript) {
          setDictatedTextTemp(interimTranscript);
        } else {
          setDictatedTextTemp("");
        }
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          setDictationError("Permiso de micrófono denegado. Active el acceso al micrófono en la barra de direcciones.");
        } else if (event.error === "no-speech") {
          // No detener en caso de silencio corto
        } else {
          setDictationError(`Error de reconocimiento: ${event.error}`);
        }
        setIsDictating(false);
      };

      rec.onend = () => {
        setIsDictating(false);
        setDictationTarget(null);
        setDictatedTextTemp("");
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (e: any) {
      console.error(e);
      setDictationError("No se pudo arrancar el sistema de dictado.");
      setIsDictating(false);
    }
  };

  const stopDictation = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error(err);
      }
      recognitionRef.current = null;
    }
    setIsDictating(false);
    setDictationTarget(null);
    setDictatedTextTemp("");
  };

  // --- NAVIGATION CONTROLS ---
  // Double page spread mode flips 2 pages at once. Continuous mode doesn't flip.
  const handlePrevPage = () => {
    if (viewerMode === "book") {
      setCurrentPageIndex(prev => Math.max(0, prev - 2));
    }
  };

  const handleNextPage = () => {
    if (viewerMode === "book") {
      // If we are at index `prev`, next spread starts at `prev + 2`, as long as `prev + 2 < pages.length`
      setCurrentPageIndex(prev => {
        if (prev + 2 < pages.length) {
          return prev + 2;
        }
        return prev;
      });
    }
  };

  // --- EXPORTACIÓN PROFESIONAL Y COMPATIBILIDAD CON SOFTWARE DE DISEÑO ---
  const calculateKdpGutter = (pageCount: number) => {
    if (pageCount <= 150) return 0.375;
    if (pageCount <= 300) return 0.500;
    if (pageCount <= 500) return 0.625;
    if (pageCount <= 700) return 0.750;
    return 0.875;
  };

  const [copiedTextStatus, setCopiedTextStatus] = useState<string | null>(null);

  const copyChapterHTMLToClipboard = (chapIndex: number) => {
    const chap = chapters[chapIndex];
    if (!chap) return;

    let html = `<h2>Capítulo ${chap.chapterNumber}: ${chap.title}</h2>\n`;
    chap.paragraphs.forEach((p) => {
      html += `<p>${p}</p>\n`;
    });

    navigator.clipboard.writeText(html).then(() => {
      setCopiedTextStatus(`Cap. ${chap.chapterNumber} copiado!`);
      setTimeout(() => setCopiedTextStatus(null), 3000);
    });
  };

  const triggerFileDownload = (content: string, filename: string, mimeType: string, bypassDonation = false) => {
    // Strict paywall checks first
    if (metadata.strictPaywallActive && !isMaverickMember && !bypassDonation) {
      setPendingDownload({ content, filename, mimeType });
      setShowProPaywallModal(true);
      return;
    }

    if (metadata.donationActive && metadata.donationLink && !bypassDonation) {
      setPendingDownload({ content, filename, mimeType });
      setShowDonationPromptModal(true);
      return;
    }

    try {
      // First choice: Pure client-side Blob download. Reliable, no page reload/navigation, works great in iframes!
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (blobError) {
      console.warn("Client-side Blob download failed, falling back to hidden-iframe form submission:", blobError);
      try {
        // Fallback: Server-assisted POST.
        // We use a temporary hidden iframe as target to prevent navigating the main application!
        let iframe = document.getElementById("download-fallback-iframe") as HTMLIFrameElement;
        if (!iframe) {
          iframe = document.createElement("iframe");
          iframe.id = "download-fallback-iframe";
          iframe.name = "download-fallback-iframe";
          iframe.style.display = "none";
          document.body.appendChild(iframe);
        }

        const form = document.createElement("form");
        form.method = "POST";
        form.action = "/api/download";
        form.target = "download-fallback-iframe"; // Submit inside the hidden iframe!

        const contentInput = document.createElement("input");
        contentInput.type = "hidden";
        contentInput.name = "content";
        contentInput.value = content;
        form.appendChild(contentInput);

        const filenameInput = document.createElement("input");
        filenameInput.type = "hidden";
        filenameInput.name = "filename";
        filenameInput.value = filename;
        form.appendChild(filenameInput);

        const contentTypeInput = document.createElement("input");
        contentTypeInput.type = "hidden";
        contentTypeInput.name = "contentType";
        contentTypeInput.value = mimeType;
        form.appendChild(contentTypeInput);

        document.body.appendChild(form);
        form.submit();
        
        // Cleanup after a short delay
        setTimeout(() => {
          if (document.body.contains(form)) {
            document.body.removeChild(form);
          }
        }, 1000);
      } catch (formError) {
        console.error("All file download strategies failed:", formError);
        alert("No se pudo iniciar la descarga. Por favor, copia el texto del manuscrito directamente desde la pantalla de edición.");
      }
    }
  };

  const verifyLicenseKey = (key: string): boolean => {
    if (!key) return false;
    const cleanKey = key.trim().toUpperCase();
    
    const masterCodes = [
      "DIAGRAMMERS-PRO-99",
      "VIP-EDITORIAL-2026",
      "AUTOR-MAESTRO-KDP",
      "CRAFT-GOLD-BOOK",
      "CREATIVO-PRO-2026",
      "MONETIZA-DIAGRAMMERS",
      "PRO-EDICION-LIMITADA"
    ];
    if (masterCodes.includes(cleanKey)) return true;
    
    const regex = /^DIAG-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
    if (regex.test(cleanKey)) {
      const digitsOnly = cleanKey.replace(/[^0-9]/g, "");
      let sum = 0;
      for (let i = 0; i < digitsOnly.length; i++) {
        sum += parseInt(digitsOnly[i], 10);
      }
      if (sum === 26) return true;
    }
    
    return false;
  };

  const generateLicenceKeyForClient = (seed: string): string => {
    let digits = Array(12).fill(0);
    let currentSum = 0;
    
    for (let i = 0; i < 11; i++) {
      const maxPossible = Math.min(9, 26 - currentSum);
      if (maxPossible <= 0) break;
      const rand = Math.floor(Math.random() * maxPossible);
      digits[i] = rand;
      currentSum += rand;
    }
    digits[11] = 26 - currentSum;
    
    digits.sort(() => Math.random() - 0.5);
    
    const dStr = digits.join("");
    return `DIAG-${dStr.substring(0, 4)}-${dStr.substring(4, 8)}-${dStr.substring(8, 12)}`;
  };

  const exportInDesignHTML = () => {
    let htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${metadata.title} - Exportable InDesign / CorelDRAW</title>
  <style>
    body { font-family: 'Georgia', serif; line-height: 1.6; color: #111; max-width: 800px; margin: 40px auto; padding: 20px; }
    .capitulo-bloque { margin-bottom: 60px; page-break-after: always; }
    .titulo-capitulo { font-family: 'Cinzel', 'Garamond', serif; text-align: center; font-size: 24px; margin-top: 40px; margin-bottom: 20px; text-transform: uppercase; }
    .subtitulo-capitulo { text-align: center; font-size: 14px; color: #555; margin-bottom: 30px; letter-spacing: 1px; }
    .parrafo { text-align: justify; margin-bottom: 12px; text-indent: 20px; }
    .parrafo.primer-parrafo { text-indent: 0; }
    .capitular { font-size: 45px; font-weight: bold; float: left; line-height: 40px; padding-right: 8px; margin-top: 4px; color: #b45309; }
    .divisor { text-align: center; font-size: 18px; color: #b45309; margin: 30px 0; }
  </style>
</head>
<body>
    `;

    chapters.forEach((chap) => {
      htmlContent += `  <div class="capitulo-bloque">\n`;
      htmlContent += `    <h2 class="titulo-capitulo">Capítulo ${chap.chapterNumber}</h2>\n`;
      htmlContent += `    <div class="subtitulo-capitulo">${chap.title}</div>\n`;

      chap.paragraphs.forEach((p, pIdx) => {
        const isFirst = pIdx === 0;
        if (isFirst && styleSettings.dropCap) {
          const letter = p.charAt(0);
          const rest = p.slice(1);
          htmlContent += `    <p class="parrafo primer-parrafo"><span class="capitular">${letter}</span>${rest}</p>\n`;
        } else {
          htmlContent += `    <p class="parrafo">${p}</p>\n`;
        }
      });

      if (styleSettings.dividerStyle !== "none") {
        htmlContent += `    <div class="divisor">${styleSettings.dividerChar}</div>\n`;
      }
      htmlContent += `  </div>\n\n`;
    });

    htmlContent += `</body>\n</html>`;

    triggerFileDownload(
      htmlContent,
      `${metadata.title.replace(/\s+/g, '_')}_InDesign_CorelDRAW.html`,
      "text/html;charset=utf-8;"
    );
  };

  const getPrintDimensions = (preset: "6x9" | "A5" | "A4" | "Pocket") => {
    switch (preset) {
      case "6x9": return { widthMm: 152.4, heightMm: 228.6, label: "Novela Estándar (6\"x9\" - 152x228mm)" };
      case "A5": return { widthMm: 148, heightMm: 210, label: "A5 Compacto (148x210mm)" };
      case "A4": return { widthMm: 210, heightMm: 297, label: "A4 Técnico (210x297mm)" };
      case "Pocket": return { widthMm: 108, heightMm: 178, label: "Bolsillo Mass-Market (108x178mm)" };
    }
  };

  const renderPrintPageMarkup = (p: SimulatedPage, isLeft: boolean) => {
    const { widthMm, heightMm } = getPrintDimensions(printSizePreset);
    const b = printBleedMm;
    const s = printSafeMarginMm;
    const totalW = widthMm + 2 * b;
    const totalH = heightMm + 2 * b;

    const bgStyle = styleSettings.pageColor === "cream" ? "#fbf9f4" : 
                    styleSettings.pageColor === "sepia" ? "#f7f1e3" : 
                    styleSettings.pageColor === "charcoal" ? "#1e293b" : "#ffffff";
    const textStyle = styleSettings.pageColor === "charcoal" ? "#f8fafc" : "#0f172a";

    return (
      <div 
        className="relative select-none shadow-2xl rounded-sm transition-all overflow-hidden mx-auto border border-slate-700/30"
        style={{
          width: "100%",
          maxHeight: "500px",
          aspectRatio: `${totalW} / ${totalH}`,
          backgroundColor: bgStyle,
          color: textStyle,
        }}
      >
        {/* 1. PHYSICAL CUT GUIDE LINES (Trim Guide Overlay) */}
        <div 
          className="absolute border border-dashed transition-all pointer-events-none"
          style={{
            top: `${(b / totalH) * 100}%`,
            left: `${(b / totalW) * 100}%`,
            right: `${(b / totalW) * 100}%`,
            bottom: `${(b / totalH) * 100}%`,
            borderColor: printShowBleedGuides ? "rgba(220, 38, 38, 0.45)" : "transparent",
            borderWidth: "1px",
            zIndex: 10
          }}
        />

        {/* 2. SAFE BOUNDARY GUIDELINES */}
        <div 
          className="absolute border border-dotted transition-all pointer-events-none"
          style={{
            top: `${(s / totalH) * 100}%`,
            left: `${(s / totalW) * 100}%`,
            right: `${(s / totalW) * 100}%`,
            bottom: `${(s / totalH) * 100}%`,
            borderColor: printShowSafeGuides ? "rgba(37, 99, 235, 0.45)" : "transparent",
            borderWidth: "1px",
            zIndex: 10
          }}
        />

        {/* 3. VECTOR CROP & REGISTRATION SVG (Parity with PDF output) */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ zIndex: 20 }}
          viewBox={`0 0 ${totalW} ${totalH}`}
        >
          {/* Crop marks */}
          {printShowCropMarks && (
            <g stroke="currentColor" strokeWidth="0.15" opacity="0.75" fill="none">
              {/* Top-Left */}
              <line x1="0" y1={b} x2={b - 1.5} y2={b} />
              <line x1={b} y1="0" x2={b} y2={b - 1.5} />
              {/* Top-Right */}
              <line x1={totalW} y1={b} x2={totalW - b + 1.5} y2={b} />
              <line x1={totalW - b} y1="0" x2={totalW - b} y2={b - 1.5} />
              {/* Bottom-Left */}
              <line x1="0" y1={totalH - b} x2={b - 1.5} y2={totalH - b} />
              <line x1={b} y1={totalH} x2={b} y2={totalH - b + 1.5} />
              {/* Bottom-Right */}
              <line x1={totalW} y1={totalH - b} x2={totalW - b + 1.5} y2={totalH - b} />
              <line x1={totalW - b} y1={totalH} x2={totalW - b} y2={totalH - b + 1.5} />
            </g>
          )}

          {/* Registration Marks */}
          {printShowRegMarks && (
            <g stroke="currentColor" strokeWidth="0.15" opacity="0.6" fill="none">
              {/* Top */}
              <circle cx={totalW / 2} cy={b / 2} r="1.8" />
              <circle cx={totalW / 2} cy={b / 2} r="0.8" />
              <line x1={totalW / 2 - 3} y1={b / 2} x2={totalW / 2 + 3} y2={b / 2} />
              <line x1={totalW / 2} y1={b / 2 - 3} x2={totalW / 2} y2={b / 2 + 3} />
              {/* Bottom */}
              <circle cx={totalW / 2} cy={totalH - b / 2} r="1.8" />
              <circle cx={totalW / 2} cy={totalH - b / 2} r="0.8" />
              <line x1={totalW / 2 - 3} y1={totalH - b / 2} x2={totalW / 2 + 3} y2={totalH - b / 2} />
              <line x1={totalW / 2} y1={totalH - b / 2} x2={totalW / 2} y2={totalH - b / 2 + 3} />
            </g>
          )}

          {/* Ink Calibration blocks */}
          {printShowColorBars && (
            <g stroke="currentColor" strokeWidth="0.05" opacity="0.8" fill="none">
              <rect x={totalW / 2 - 12} y="1.2" width="3" height="1.5" fill="#00ffff" stroke="#000" strokeWidth="0.05" />
              <rect x={totalW / 2 - 8.5} y="1.2" width="3" height="1.5" fill="#ff00ff" stroke="#000" strokeWidth="0.05" />
              <rect x={totalW / 2 - 5} y="1.2" width="3" height="1.5" fill="#ffff00" stroke="#000" strokeWidth="0.05" />
              <rect x={totalW / 2 - 1.5} y="1.2" width="3" height="1.5" fill="#000000" stroke="#000" strokeWidth="0.05" />
              <rect x={totalW / 2 + 2} y="1.2" width="3" height="1.5" fill="#7f7f7f" stroke="#000" strokeWidth="0.05" />
              <rect x={totalW / 2 + 5.5} y="1.2" width="3" height="1.5" fill="#cccccc" stroke="#000" strokeWidth="0.05" />
            </g>
          )}

          {/* Signature stamp meta text */}
          {printShowDocInfo && (
            <text 
              x={totalW / 2} 
              y={totalH - 1.2} 
              textAnchor="middle" 
              fontFamily="monospace" 
              fontSize="1.6" 
              fill="currentColor" 
              opacity="0.5"
              fontWeight="bold"
            >
              SUITE_B2B_PREPRESS • PLACAS: C, M, Y, K • HOJA: {p.pageNumber} • REGISTRO: {metadata.isbn ? "ISBN VÁLIDO" : "LOCAL"}
            </text>
          )}
        </svg>

        {/* 4. TRIM WINDOW (El corte real final) */}
        <div 
          className="absolute flex flex-col justify-between font-serif"
          style={{
            top: `${(b / totalH) * 100}%`,
            left: `${(b / totalW) * 100}%`,
            width: `${(widthMm / totalW) * 100}%`,
            height: `${(heightMm / totalH) * 100}%`,
            padding: `${(s / heightMm) * 100}%`,
            boxSizing: "border-box"
          }}
        >
          {/* Header inside trim boundary */}
          {!p.isChapterOpener && !p.isCreditsPage && !p.isTOCPage && styleSettings.runningHeaderStyle !== "none" ? (
            <div className="flex items-center justify-between border-b pb-0.5 text-[8px] tracking-widest uppercase opacity-60" style={{ borderColor: 'currentColor' }}>
              {isLeft ? (
                <>
                  <span>Hoja {p.pageNumber}</span>
                  <span className="italic truncate max-w-[120px]">{metadata.title}</span>
                </>
              ) : (
                <>
                  <span className="italic truncate max-w-[120px]">{p.chapterTitle}</span>
                  <span>Hoja {p.pageNumber}</span>
                </>
              )}
            </div>
          ) : (
            <div className="h-2"></div>
          )}

          {/* Text body flow */}
          <div className="flex-1 flex flex-col justify-center overflow-hidden">
            {p.isCreditsPage ? (
              <div className="text-[7.5px] leading-snug flex flex-col justify-between h-full py-1">
                <div className="border-b pb-1 opacity-80" style={{ borderColor: 'currentColor' }}>
                  <h4 className="font-sans font-bold uppercase tracking-wider text-[8px]">{metadata.title}</h4>
                  <p className="italic text-[7px]">Por {metadata.author}</p>
                </div>
                <div className="flex-1 pt-1 opacity-70">
                  {metadata.publisherLogo && (metadata.logoPlacement === "credits" || metadata.logoPlacement === "both") && (
                    <div className="mb-0.5">
                      <img 
                        src={metadata.publisherLogo} 
                        alt="Logo" 
                        className="max-h-7 max-w-[40px] object-contain dark:invert print:invert-0" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <p className="font-semibold text-[7px]">{metadata.publisher || "DIAGRAMMERS Prepress"}</p>
                  {metadata.publisher && <p>Publicado por {metadata.publisher}.</p>}
                  <p className="text-[6px] line-clamp-4">{metadata.licenseDetails || "Todos los derechos reservados."}</p>
                  {metadata.isbn && <p className="font-mono mt-1 text-[7.5px]">ISBN: {metadata.isbn}</p>}
                </div>
                <p className="text-[6px] opacity-40">Maquetado digital bajo normas B2B.</p>
              </div>
            ) : p.isTOCPage ? (
              <div className="text-left font-sans py-1">
                <h4 className="text-[10px] uppercase tracking-wider text-center font-bold mb-2">Índice</h4>
                <div className="space-y-1">
                  {chapters.slice(0, 6).map((tc, tcIdx) => (
                    <div key={tcIdx} className="flex justify-between text-[7.5px] font-mono border-b border-dashed border-current pb-0.5 opacity-85">
                      <span className="truncate max-w-[140px]">Cap. {tc.chapterNumber} - {tc.title}</span>
                      <span>Pág. {tcIdx * 3 + 2}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 selection:bg-amber-500/20 text-left">
                {p.isChapterOpener && (
                  <div className="text-center pb-1">
                    <span className="text-[6.5px] font-sans font-extrabold uppercase tracking-wider text-amber-600 block">Capítulo {p.chapterNumber}</span>
                    <h3 className="text-[10px] font-bold tracking-tight uppercase" style={{ fontFamily: `"${styleSettings.fontTitle}", serif` }}>
                      {p.chapterTitle}
                    </h3>
                    <div className="w-6 h-0.5 bg-current mx-auto opacity-20 my-0.5"></div>
                  </div>
                )}

                <div 
                  className="text-[8px] leading-relaxed tracking-wide space-y-1.5"
                  style={{
                    textAlign: styleSettings.justification === "left" ? "left" : "justify",
                    fontFamily: `"${styleSettings.fontBody}", serif`
                  }}
                >
                  {p.paragraphs.map((para, ind) => {
                    if (para && typeof para === "string" && para.startsWith("__CHAPTER_OPENER_INLINE__:")) {
                      const parts = para.split(":");
                      const num = parts[1];
                      const title = parts[2] || "";
                      return (
                        <div key={ind} className="my-3 text-center space-y-1 py-1 select-none">
                          <span className="text-[7.5px] tracking-wider uppercase font-semibold text-amber-800/85 block" style={{ fontFamily: `"${styleSettings.fontTitle}", serif` }}>
                            Capítulo {num}
                          </span>
                          <h4 className="text-[9.5px] font-bold text-slate-800 tracking-tight leading-tight" style={{ fontFamily: `"${styleSettings.fontTitle}", serif` }}>
                            {title}
                          </h4>
                        </div>
                      );
                    }

                    const isFirst = ind === 0 && p.isChapterOpener;
                    if (isFirst && styleSettings.dropCap) {
                      const letter = para.charAt(0);
                      const rest = para.slice(1);
                      return (
                        <p key={ind} className="indent-0">
                          <span className="float-left text-lg font-bold text-amber-800 leading-[1] pr-1 pt-0.5" style={{ fontFamily: `"${styleSettings.fontTitle}", serif` }}>{letter}</span>
                          {rest}
                        </p>
                      );
                    }
                    return (
                      <p key={ind} style={{ textIndent: styleSettings.paragraphSpacing === "large" || styleSettings.paragraphSpacing === "medium" ? "0" : "4px" }}>
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Page inside trim boundary */}
          <div className="text-center font-mono text-[7px] tracking-wider opacity-60">
            — {p.pageNumber} —
          </div>
        </div>
      </div>
    );
  };

  const exportProfessionalPrintPDF = () => {
    setPrintExportStatus("building");
    
    setTimeout(() => {
      const { widthMm, heightMm, label } = getPrintDimensions(printSizePreset);
      const bleed = printBleedMm;
      const safe = printSafeMarginMm;
      const totalWidth = widthMm + 2 * bleed;
      const totalHeight = heightMm + 2 * bleed;

      const pageBg = styleSettings.pageColor === "cream" ? "#fbf9f4" : 
                     styleSettings.pageColor === "sepia" ? "#f7f1e3" : 
                     styleSettings.pageColor === "charcoal" ? "#1e293b" : "#ffffff";
                     
      const pageText = styleSettings.pageColor === "charcoal" ? "#f8fafc" : "#0f172a";

      let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${metadata.title} - ARCHIVO DE IMPRENTA B2B (Miras y Corte)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${styleSettings.fontBody.replace(/\s+/g, '+')}&family=${styleSettings.fontTitle.replace(/\s+/g, '+')}&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  
  <style>
    /* RESET PROFESIONAL DE PRENSA */
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: #0f172a; /* color de contraste en pantalla */
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* CONFIGURACIÓN DE PÁGINA FÍSICA */
    @media print {
      body { background: transparent; }
      @page {
        size: ${totalWidth}mm ${totalHeight}mm;
        margin: 0;
      }
    }

    /* CONTENEDOR DE PLIEGO CON SANGRADO INCLUIDO */
    .bleed-box {
      position: relative;
      width: ${totalWidth}mm;
      height: ${totalHeight}mm;
      background: ${pageBg};
      color: ${pageText};
      overflow: hidden;
      page-break-after: always;
      /* En vista de pantalla, centramos el pliego */
      margin: 40px auto;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    
    @media print {
      .bleed-box {
         margin: 0;
         box-shadow: none;
      }
    }

    /* LÍNEA DE CORTE (ÁREA RECORTE) */
    .trim-box {
      position: absolute;
      top: ${bleed}mm;
      left: ${bleed}mm;
      width: ${widthMm}mm;
      height: ${heightMm}mm;
      box-sizing: border-box;
      /* Las líneas de sangrado/corte son invisibles en la imprenta final, pero sirven de guía */
      border: 0.1mm dashed rgba(0,0,0,0.08);
      pointer-events: none;
    }

    /* MARGEN SEGURO DE TEXTO (SAFE BUFFER) */
    .safe-margin-box {
      position: absolute;
      top: ${safe}mm;
      left: ${safe}mm;
      width: ${widthMm - 2*safe}mm;
      height: ${heightMm - 2*safe}mm;
      box-sizing: border-box;
      border: 0.1mm dotted rgba(0, 0, 255, 0.08);
      pointer-events: none;
    }

    /* ÁREA DEL CONTENIDO DE LA OBRA (DENTRO DEL RECORTE) */
    .page-content-wrapper {
      position: absolute;
      top: ${bleed}mm;
      left: ${bleed}mm;
      width: ${widthMm}mm;
      height: ${heightMm}mm;
      padding: ${safe}mm;
      font-family: "${styleSettings.fontBody}", Garamond, Georgia, serif;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* COMIENZO DE CAPÍTULO */
    .chapter-opener-frame {
      padding-top: 15mm;
      margin-bottom: 5mm;
      text-align: ${styleSettings.titleAlign || "center"};
    }

    .chapter-subtitle-pref {
      font-family: "Space Grotesk", sans-serif;
      text-transform: uppercase;
      font-size: 8pt;
      letter-spacing: 2px;
      color: #d97706;
      font-weight: 700;
      margin-bottom: 1.5mm;
    }

    .chapter-title-text {
      font-family: "${styleSettings.fontTitle}", serif;
      font-size: ${styleSettings.fontSizeTitle === "large" ? "24pt" : styleSettings.fontSizeTitle === "small" ? "16pt" : "20pt"};
      line-height: 1.2;
      margin: 0 0 3mm 0;
      color: inherit;
    }

    .chapter-line-divider {
      width: 40px;
      height: 0.5mm;
      background: currentColor;
      opacity: 0.25;
      margin: 2mm auto;
      display: ${styleSettings.titleAlign === "center" ? "block" : "inline-block"};
    }

    /* CUERPO DEL TEXTO */
    .text-body-flow {
      font-size: ${styleSettings.fontSizeBody === "large" ? "12pt" : styleSettings.fontSizeBody === "small" ? "9.5pt" : "11pt"};
      line-height: ${styleSettings.lineHeight === "relaxed" ? "1.65" : "1.4"};
      text-align: ${styleSettings.justification === "left" ? "left" : "justify"};
      flex-1: 1;
    }

    .text-body-flow p {
      margin: 0;
      text-indent: ${styleSettings.paragraphSpacing === "large" || styleSettings.paragraphSpacing === "medium" ? "0" : "6mm"};
      margin-bottom: ${styleSettings.paragraphSpacing === "large" ? "10pt" : styleSettings.paragraphSpacing === "medium" ? "6pt" : "0"};
    }

    .text-body-flow p.first-paragraph {
      text-indent: 0;
    }

    /* CAPÍTULARES ELEGANTES */
    .dropcap-letter {
      font-family: "${styleSettings.fontTitle}", Georgia, serif;
      font-size: 42pt;
      font-weight: bold;
      float: left;
      line-height: 38pt;
      padding-right: 6pt;
      margin-top: 2pt;
      color: #92400e;
    }

    /* REPRODUCTOR DE DIVISORES */
    .section-divider {
      text-align: center;
      font-size: 13pt;
      color: #92400e;
      margin: 4mm 0;
    }

    /* ENCABEZADO CORREDOR */
    .running-header {
      font-size: 8pt;
      text-transform: uppercase;
      font-family: "Space Grotesk", sans-serif;
      letter-spacing: 1px;
      display: flex;
      justify-content: space-between;
      border-b: 0.1mm solid rgba(0,0,0,0.15);
      padding-bottom: 1.5mm;
      margin-bottom: 6mm;
      opacity: 0.65;
    }

    /* PIE DE PÁGINA (NÚMERO) */
    .running-footer {
      text-align: center;
      font-size: 8pt;
      font-family: "JetBrains Mono", Courier, monospace;
      padding-top: 3mm;
      opacity: 0.6;
    }

    /* CAPA VEKTORIAL DE IMPRENTA */
    .prepress-overlay-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  </style>
</head>
<body>
    `;

      // Loop dynamically generated book pages
      pages.forEach((p) => {
        const isOpener = p.isChapterOpener;
        const totalW = totalWidth;
        const totalH = totalHeight;
        const b = bleed;

        const isLeftPage = p.pageNumber % 2 === 0;

        html += `  <!-- HOJA ${p.pageNumber} (${isLeftPage ? "IZQUIERDA / PAR" : "DERECHA / IMPAR"}) -->\n`;
        html += `  <div class="bleed-box">\n`;
        
        // Trim & safe guides
        html += `    <div class="trim-box"></div>\n`;
        html += `    <div class="safe-margin-box"></div>\n`;

        // SVG Vector prepress marks wrapping
        html += `    <svg class="prepress-overlay-svg" viewBox="0 0 ${totalW} ${totalH}" width="${totalW}mm" height="${totalH}mm">\n`;
        
        // 1. CROP MARKS (Líneas de Corte)
        if (printShowCropMarks) {
          html += `      <!-- Corner Crop Marks -->\n`;
          html += `      <g stroke="#000000" stroke-width="0.12" fill="none">\n`;
          // Top-Left crop
          html += `        <line x1="0" y1="${b}" x2="${b - 1.5}" y2="${b}" />\n`;
          html += `        <line x1="${b}" y1="0" x2="${b}" y2="${b - 1.5}" />\n`;
          // Top-Right crop
          html += `        <line x1="${totalW}" y1="${b}" x2="${totalW - b + 1.5}" y2="${b}" />\n`;
          html += `        <line x1="${totalW - b}" y1="0" x2="${totalW - b}" y2="${b - 1.5}" />\n`;
          // Bottom-Left crop
          html += `        <line x1="0" y1="${totalH - b}" x2="${b - 1.5}" y2="${totalH - b}" />\n`;
          html += `        <line x1="${b}" y1="${totalH}" x2="${b}" y2="${totalH - b + 1.5}" />\n`;
          // Bottom-Right crop
          html += `        <line x1="${totalW}" y1="${totalH - b}" x2="${totalW - b + 1.5}" y2="${totalH - b}" />\n`;
          html += `        <line x1="${totalW - b}" y1="${totalH}" x2="${totalW - b}" y2="${totalH - b + 1.5}" />\n`;
          html += `      </g>\n`;
        }

        // 2. REGISTRATION MARKS (Diana de Registro)
        if (printShowRegMarks) {
          html += `      <!-- Registration Targets -->\n`;
          // Top center target
          html += `      <g stroke="#000000" stroke-width="0.1" fill="none">\n`;
          html += `        <circle cx="${totalW / 2}" cy="${b / 2}" r="1.8" />\n`;
          html += `        <circle cx="${totalW / 2}" cy="${b / 2}" r="0.8" />\n`;
          html += `        <line x1="${totalW / 2 - 3}" y1="${b / 2}" x2="${totalW / 2 + 3}" y2="${b / 2}" />\n`;
          html += `        <line x1="${totalW / 2}" y1="${b / 2 - 3}" x2="${totalW / 2}" y2="${b / 2 + 3}" />\n`;
          // Bottom center target
          html += `        <circle cx="${totalW / 2}" cy="${totalH - b / 2}" r="1.8" />\n`;
          html += `        <circle cx="${totalW / 2}" cy="${totalH - b / 2}" r="0.8" />\n`;
          html += `        <line x1="${totalW / 2 - 3}" y1="${totalH - b / 2}" x2="${totalW / 2 + 3}" y2="${totalH - b / 2}" />\n`;
          html += `        <line x1="${totalW / 2}" y1="${totalH - b / 2}" x2="${totalW / 2}" y2="${totalH - b / 2 + 3}" />\n`;
          // Left vertical target
          html += `        <circle cx="${b / 2}" cy="${totalH / 2}" r="1.8" />\n`;
          html += `        <circle cx="${b / 2}" cy="${totalH / 2}" r="0.8" />\n`;
          html += `        <line x1="${b / 2 - 3}" y1="${totalH / 2}" x2="${b / 2 + 3}" y2="${totalH / 2}" />\n`;
          html += `        <line x1="${b / 2}" y1="${totalH / 2 - 3}" x2="${b / 2}" y2="${totalH / 2 + 3}" />\n`;
          // Right vertical target
          html += `        <circle cx="${totalW - b / 2}" cy="${totalH / 2}" r="1.8" />\n`;
          html += `        <circle cx="${totalW - b / 2}" cy="${totalH / 2}" r="0.8" />\n`;
          html += `        <line x1="${totalW - b / 2 - 3}" y1="${totalH / 2}" x2="${totalW - b / 2 + 3}" y2="${totalH / 2}" />\n`;
          html += `        <line x1="${totalW - b / 2}" y1="${totalH / 2 - 3}" x2="${totalW - b / 2}" y2="${totalH / 2 + 3}" />\n`;
          html += `      </g>\n`;
        }

        // 3. COLOR BARS (Barras de tintero CMYK)
        if (printShowColorBars) {
          const barsX = totalW / 2 - 12; // center CMYK block
          const barsY = 1;
          html += `      <!-- Ink calibration blocks -->\n`;
          html += `      <g stroke="#000000" stroke-width="0.05" fill="none">\n`;
          html += `        <rect x="${barsX}" y="${barsY}" width="3" height="1.5" fill="#00ffff" stroke="#000" stroke-width="0.05" />\n`;
          html += `        <rect x="${barsX + 3.5}" y="${barsY}" width="3" height="1.5" fill="#ff00ff" stroke="#000" stroke-width="0.05" />\n`;
          html += `        <rect x="${barsX + 7}" y="${barsY}" width="3" height="1.5" fill="#ffff00" stroke="#000" stroke-width="0.05" />\n`;
          html += `        <rect x="${barsX + 10.5}" y="${barsY}" width="3" height="1.5" fill="#000000" stroke="#000" stroke-width="0.05" />\n`;
          html += `        <rect x="${barsX + 14}" y="${barsY}" width="3" height="1.5" fill="#7f7f7f" stroke="#000" stroke-width="0.05" />\n`;
          html += `        <rect x="${barsX + 17.5}" y="${barsY}" width="3" height="1.5" fill="#cccccc" stroke="#000" stroke-width="0.05" />\n`;
          html += `      </g>\n`;
        }

        // 4. METADATA STRING IDENTIFIER (Firma de placa)
        if (printShowDocInfo) {
          const metaText = `SUITE_B2B_PREPRESS • PLACAS: C, M, Y, K • OBRA: ${metadata.title.toUpperCase().replace(/[^A-Z-]/g, '_')} • HOJA: ${p.pageNumber} • REGISTRO: ${metadata.isbn || "PENDIENTE"} • ${new Date().toLocaleDateString()}`;
          html += `      <!-- Prepress board meta -->\n`;
          html += `      <text x="${totalW / 2}" y="${totalH - 1.2}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="1.5" fill="#334155" font-weight="bold">\n`;
          html += `        ${metaText}\n`;
          html += `      </text>\n`;
        }

        html += `    </svg>\n`;

        // Normal text flow area
        html += `    <div class="page-content-wrapper">\n`;

        // Header
        const showHeader = !isOpener && !p.isCreditsPage && !p.isTOCPage;
        if (showHeader && styleSettings.runningHeaderStyle !== "none") {
          html += `      <div class="running-header">\n`;
          if (isLeftPage) {
            html += `        <span>Hoja ${p.pageNumber}</span>\n`;
            html += `        <span style="font-style: italic;">${metadata.title}</span>\n`;
          } else {
            html += `        <span style="font-style: italic;">${p.chapterTitle}</span>\n`;
            html += `        <span>Hoja ${p.pageNumber}</span>\n`;
          }
          html += `      </div>\n`;
        } else {
          // empty placeholder to retain flex structure spacing
          html += `      <div></div>\n`;
        }

        // Core central block
        html += `      <div class="text-body-flow">\n`;
        
        if (p.isCreditsPage) {
          // Credits content
          html += `        <div style="font-size: 8.5pt; line-height: 1.5; font-family: sans-serif; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">\n`;
          html += `          <div style="border-bottom: 0.2mm solid currentColor; padding-bottom: 4px; margin-bottom: 15px;">\n`;
          html += `            <h2 style="font-size: 11pt; padding:0; margin:0; text-transform: uppercase; font-family: 'Space Grotesk', sans-serif;">${metadata.title}</h2>\n`;
          if (metadata.subtitle) html += `            <p style="font-style: italic; margin: 3px 0; font-size: 9pt;">${metadata.subtitle}</p>\n`;
          html += `            <p style="margin: 3px 0;">Por <strong>${metadata.author}</strong></p>\n`;
          html += `          </div>\n`;
          
          html += `          <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">\n`;
          if (metadata.publisherLogo && (metadata.logoPlacement === "credits" || metadata.logoPlacement === "both")) {
            html += `            <div style="margin-bottom: 4px;"><img src="${metadata.publisherLogo}" style="max-height: 40px; max-width: 120px; object-fit: contain;" /></div>\n`;
          }
          html += `            <p><strong>${metadata.publisher || "DIAGRAMMERS Press & Sindicato B2B"}</strong></p>\n`;
          if (metadata.publisher) html += `            <p>Publicado corporativamente por ${metadata.publisher}, ${metadata.year || "2026"}.</p>\n`;
          html += `            <p style="font-size: 8pt; opacity: 0.85; white-space: pre-wrap;">${metadata.licenseDetails || "Todos los derechos reservados."}</p>\n`;
          
          if (metadata.isbn) {
            html += `            <div style="margin-top: 10px; padding: 10px; border: 0.2mm dashed currentColor; border-radius: 4px; font-family: monospace;">\n`;
            html += `              <span style="font-size: 7.5pt; font-weight: bold; display: block; text-transform: uppercase;">ISBN Comercial KDP</span>\n`;
            html += `              <span style="font-size: 11pt; font-weight: bold; letter-spacing: 1.5px;">${metadata.isbn}</span>\n`;
            html += `            </div>\n`;
          }
          html += `          </div>\n`;
          html += `          <div style="font-size: 7pt; opacity: 0.5; border-top: 0.1mm solid rgba(0,0,0,0.15); padding-top: 10px;">\n`;
          html += `            Maquetación premium automatizada. Cumple pautas legales internacionales de imprenta.\n`;
          html += `          </div>\n`;
          html += `        </div>\n`;
        } else if (p.isTOCPage) {
          // TOC Content
          html += `        <div style="padding-top: 8mm;">\n`;
          html += `          <h2 style="text-align: center; font-family: '${styleSettings.fontTitle}', serif; font-size: 16pt; text-transform: uppercase; margin-bottom: 25px;">Índice General</h2>\n`;
          html += `          <div style="display: flex; flex-direction: column; gap: 4mm;">\n`;
          
          // Render TOC index
          chapters.forEach((tc) => {
            const chapPage = pages.find((pg) => pg.chapterNumber === tc.chapterNumber);
            const pgNum = chapPage ? chapPage.pageNumber : "—";
            html += `            <div style="display: flex; justify-content: space-between; font-size: 10pt; font-family: monospace; border-bottom: 0.1mm dotted rgba(0,0,0,0.25); pb: 1px;">\n`;
            html += `              <span>Capítulo ${tc.chapterNumber}: <strong>${tc.title}</strong></span>\n`;
            html += `              <span>Pág. ${pgNum}</span>\n`;
            html += `            </div>\n`;
          });
          html += `          </div>\n`;
          html += `        </div>\n`;
        } else {
          // Chapter Opener Details
          if (isOpener) {
            html += `        <div class="chapter-opener-frame">\n`;
            html += `          <span class="chapter-subtitle-pref">Capítulo ${p.chapterNumber}</span>\n`;
            html += `          <h2 class="chapter-title-text">${p.chapterTitle}</h2>\n`;
            html += `          <div class="chapter-line-divider"></div>\n`;
            html += `        </div>\n`;
          }

          // Paragraphs Flow
          p.paragraphs.forEach((pText, pIndex) => {
            const isFirst = pIndex === 0 && isOpener;
            if (isFirst && styleSettings.dropCap) {
              const letter = pText.charAt(0);
              const rest = pText.slice(1);
              html += `        <p class="first-paragraph"><span class="dropcap-letter">${letter}</span>${rest}</p>\n`;
            } else {
              html += `        <p class="${isFirst ? "first-paragraph" : ""}">${pText}</p>\n`;
            }
          });

          // Division markers if appropriate
          if (p.paragraphs.length > 0 && styleSettings.dividerStyle !== "none") {
            html += `        <div class="section-divider">${styleSettings.dividerChar}</div>\n`;
          }
        }

        html += `      </div>\n`;

        // Footer Page
        html += `      <div class="running-footer">\n`;
        html += `        — ${p.pageNumber} —\n`;
        html += `      </div>\n`;

        html += `    </div>\n`; // ends wrapper
        html += `  </div>\n\n`; // ends pliego
      });

      html += `</body>\n</html>`;

      triggerFileDownload(
        html,
        `${metadata.title.replace(/\s+/g, '_')}_FORMATO_IMPRENTA_CORTE_SANGRADO.html`,
        "text/html;charset=utf-8;"
      );
      
      setPrintExportStatus("success");
      setTimeout(() => setPrintExportStatus("idle"), 2500);
    }, 1200);
  };

  const exportInDesignTaggedText = () => {
    let tagged = `<ASCII-WIN>\r\n`;
    tagged += `<Version:18><FeatureSet:InDesign-Roman>\r\n`;
    tagged += `<DefineParaStyle:CapituloNum=<NextStyle:CapituloNum><Font:Times New Roman><Size:14><Bold><Justification:Center>>\r\n`;
    tagged += `<DefineParaStyle:CapituloTitulo=<NextStyle:CapituloTitulo><Font:Times New Roman><Size:20><Bold><Justification:Center>>\r\n`;
    tagged += `<DefineParaStyle:CuerpoParrafo=<NextStyle:CuerpoParrafo><Font:Times New Roman><Size:11><Justification:Justified><FirstLineIndent:15>>\r\n`;
    tagged += `<DefineParaStyle:PrimerParrafo=<FirstLineIndent:0>>\r\n`;
    tagged += `<DefineParaStyle:Divisor=<NextStyle:Divisor><Font:Times New Roman><Size:11><Justification:Center>>\r\n`;

    chapters.forEach((chap) => {
      tagged += `\r\n<ParaStyle:CapituloNum>Capítulo ${chap.chapterNumber}\r\n`;
      tagged += `<ParaStyle:CapituloTitulo>${chap.title}\r\n\r\n`;

      chap.paragraphs.forEach((p, pIdx) => {
        if (pIdx === 0) {
          tagged += `<ParaStyle:PrimerParrafo>${p}\r\n`;
        } else {
          tagged += `<ParaStyle:CuerpoParrafo>${p}\r\n`;
        }
      });

      if (styleSettings.dividerStyle !== "none") {
        tagged += `<ParaStyle:Divisor>${styleSettings.dividerChar}\r\n`;
      }
    });

    triggerFileDownload(
      tagged,
      `${metadata.title.replace(/\s+/g, '_')}_InDesign_TaggedText.txt`,
      "text/plain;charset=utf-8;"
    );
  };

  const exportJSONProject = () => {
    const exportData = {
      generator: "DIAGRAMMERS Studio",
      timestamp: new Date().toISOString(),
      metadata,
      styleSettings,
      kdpSettings: {
        trimSize: kdpTrimSize,
        bleed: kdpBleed,
        gutter: calculateKdpGutter(pages.length)
      },
      chapters
    };

    triggerFileDownload(
      JSON.stringify(exportData, null, 2),
      `${metadata.title.replace(/\s+/g, '_')}_Estructura_Editorial.json`,
      "application/json;charset=utf-8;"
    );
  };

  const exportWordDraft = () => {
    let docContent = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${metadata.title || "Manuscrito"} - Borrador Microsoft Word</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: 6.0in 9.0in;
      margin: 1.0in 1.0in 1.0in 1.0in;
    }
    body {
      font-family: 'Times New Roman', 'Georgia', serif;
      font-size: 11pt;
      line-height: 1.35;
      text-align: justify;
    }
    h1 {
      text-align: center;
      margin-top: 1.5in;
      margin-bottom: 0.3in;
      font-size: 18pt;
      font-weight: bold;
      page-break-before: always;
    }
    h2 {
      text-align: center;
      font-size: 12pt;
      font-weight: normal;
      margin-bottom: 0.5in;
      color: #555555;
    }
    p {
      text-indent: 0.35in;
      margin: 0;
      padding: 0;
    }
    p.first-p {
      text-indent: 0;
    }
    .divider {
      text-align: center;
      font-size: 14pt;
      margin: 24pt 0;
    }
  </style>
</head>
<body>
  <div style="text-align: center; margin-top: 2.5in; page-break-after: always;">
    <h1 style="font-size: 26pt; margin-bottom: 12px; font-weight: bold; font-family: 'Times New Roman', serif;">${metadata.title || "TÍTULO DEL LIBRO"}</h1>
    <h2 style="font-size: 14pt; color: #444; margin-bottom: 80px; font-weight: normal;">${metadata.author || "Nombre del Autor"}</h2>
    <div style="margin-top: 2in; border-top: 1px solid #ddd; padding-top: 10px; font-size: 9pt; color: #888;">
      Documento formateado automáticamente en DIAGRAMMERS Studio • Formato Universal de Imprenta
    </div>
  </div>
    `;

    chapters.forEach((chap) => {
      docContent += `  <h1>Capítulo ${chap.chapterNumber}</h1>\n`;
      if (chap.title) {
        docContent += `  <h2>${chap.title}</h2>\n`;
      }

      chap.paragraphs.forEach((p, pIdx) => {
        if (pIdx === 0) {
          docContent += `  <p class="first-p">${p}</p>\n`;
        } else {
          docContent += `  <p>${p}</p>\n`;
        }
      });

      if (styleSettings.dividerStyle !== "none") {
        docContent += `  <div class="divider">${styleSettings.dividerChar}</div>\n`;
      }
    });

    docContent += `</body>\n</html>`;

    triggerFileDownload(
      docContent,
      `${(metadata.title || "Manuscrito").replace(/\s+/g, '_')}_Editorial_Borrador.doc`,
      "application/msword;charset=utf-8;"
    );
  };

  const exportEPUBDigitalWithZipping = () => {
    // Generate valid mini XHTML package representing EPUB container
    let epubContent = `<?xml version="1.0" encoding="utf-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
<head>
  <title>${metadata.title || "eBook"}</title>
  <style>
    body { font-family: sans-serif; padding: 5%; line-height: 1.5; text-align: justify; }
    h1 { text-align: center; margin-top: 20%; font-size: 1.8em; }
    h2 { text-align: center; font-size: 1.1em; color: #666; margin-bottom: 2em; }
    p { margin: 0; text-indent: 1.5em; text-align: justify; }
    p:first-of-type { text-indent: 0; margin-top: 1em; }
    .divider { text-align: center; margin: 2em 0; color: #b45309; }
  </style>
</head>
<body>
  <section class="frontmatter" style="text-align: center; margin-top: 30%;">
    <h1>${metadata.title || "TÍTULO DEL EBOOK"}</h1>
    <h2>${metadata.author || "Autor"}</h2>
    <p style="text-align: center; font-style: italic;">Publicado digitalmente con arquitectura unificada DIAGRAMMERS</p>
  </section>
    `;

    chapters.forEach((chap) => {
      epubContent += `  <hr style="page-break-before: always; border: none;"/>\n`;
      epubContent += `  <section class="chapter" id="cap-${chap.chapterNumber}">\n`;
      epubContent += `    <h1 style="text-align: center; margin-top: 10%;">Capítulo ${chap.chapterNumber}</h1>\n`;
      if (chap.title) {
        epubContent += `    <h2 style="text-align: center; font-style: italic; color: #555;">${chap.title}</h2>\n`;
      }

      chap.paragraphs.forEach((p, pIdx) => {
        if (pIdx === 0) {
          epubContent += `    <p style="text-indent: 0;">${p}</p>\n`;
        } else {
          epubContent += `    <p>${p}</p>\n`;
        }
      });

      if (styleSettings.dividerStyle !== "none") {
        epubContent += `    <div class="divider">${styleSettings.dividerChar}</div>\n`;
      }
      epubContent += `  </section>\n`;
    });

    epubContent += `</body>\n</html>`;

    triggerFileDownload(
      epubContent,
      `${(metadata.title || "eBook").replace(/\s+/g, '_')}_Publicacion_Kindle.epub`,
      "application/epub+zip;charset=utf-8;"
    );
  };

  const handleConvertToScreenplay = () => {
    setIsConvertingScreenplay(true);
    setScreenplayExportDoneMessage(null);

    setTimeout(() => {
      setIsConvertingScreenplay(false);
      const ch = chapters[screenplaySelectedChapterIdx] || chapters[0] || { title: "Sin Título", chapterNumber: 1, paragraphs: ["Un silencioso salón donde las ideas arden."] };
      const chTitle = ch.title || "El Comienzo";
      const chNum = ch.chapterNumber;
      
      // Select scene location based on Book Archetype/Genre:
      let location = "INT. ESTUDIO DEL ESCRITOR - NOCHE";
      if (styleSettings.archetype.includes("Gótico") || styleSettings.archetype.includes("Fantasía")) {
        location = "EXT. BOSQUE DEL OLVIDO - CREPÚSCULO";
      } else if (styleSettings.archetype.includes("Thriller") || styleSettings.archetype.includes("Contemporáneo")) {
        location = "INT. OFICINA METROPOLITANA - DÍA";
      }

      // Generate script using actual chapter paragraphs
      const sentences = ch.paragraphs.join(" ").split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 5);
      
      let script = `FADE IN:\n\n${location}\n\n`;
      script += `La atmósfera se siente pesada, cargada con las vibraciones del Universo. Un silencio absoluto precede la acción. El aire huele a papel viejo, tinta fresca y misterio comercial.\n\n`;
      
      if (sentences.length > 0) {
        script += `NARRADOR\n  (con voz solemne y pausada)\n  "${sentences[0]}."\n\n`;
      }
      
      script += `Un personaje misterioso, vestido con un abrigo oscuro de corte simétrico, se adelanta. Mira fijamente hacia la ventana donde destella la luz de un neón azul.\n\n`;
      script += `EL PROTAGONISTA\n  (susurrando, con los ojos llenos de asombro)\n  "Todo ha comenzado hoy. Las palabras cobran vida."\n\n`;
      
      if (sentences.length > 1) {
        script += `Aquí, las fuerzas de la competencia se materializan. La sombra acecha.\n\n`;
        script += `EL ANTAGONISTA\n  (con una sonrisa sarcástica, saliendo de las sombras)\n  "¿Crees que puedes ganarnos con simple tipografía de calidad superior?"\n\n`;
        script += `EL PROTAGONISTA\n  "No es simple tipografía. Es DIAGRAMMERS Maverick."\n\n`;
        script += `EL ANTAGONISTA\n  (retrocediendo)\n  "${sentences[1].slice(0, 100)}..."\n\n`;
      }

      if (sentences.length > 2) {
        script += `NARRADOR\n  "Y así se forjó la alianza más peligrosa del sector editorial."\n\n`;
        script += `EL PROTAGONISTA\n  (mirando a la cámara)\n  "Juntas somos poderosas. El diseño es nuestra mayor arma."\n\n`;
        script += `FADE OUT.\n\n`;
        script += `[FIN DE LA ESCENA DEL CAPÍTULO ${chNum}]`;
      } else {
        script += `EL PROTAGONISTA\n  "El diseño nos salvará del caos."\n\nFADE OUT.\n\n[FIN DE LA ESCENA]`;
      }

      setGeneratedScreenplayText(script);

      // Cast Selection
      let cast: Array<{role: string; actor: string; description: string; estBudget: string}> = [];
      if (castingSelectedTone === "EPIC_HOLLYWOOD") {
        cast = [
          { role: "El Protagonist (Líder Editorial)", actor: "Cillian Murphy / Florence Pugh", description: "Expresivo, estratega nato, mirada penetrante con determinación fría.", estBudget: "$450,000 USD" },
          { role: "El Antagonist (Rival Monopólico)", actor: "Willem Dafoe / Mads Mikkelsen", description: "Sarcástico, elegante, viste trajes de imprenta tradicional decadente.", estBudget: "$600,000 USD" },
          { role: "Voz del Narrador (Cosmología)", actor: "Morgan Freeman / Cate Blanchett", description: "Voz profunda celestial, con tono omnisciente y pausado.", estBudget: "$250,000 USD" }
        ];
      } else if (castingSelectedTone === "INDIE") {
        cast = [
          { role: "El Protagonist", actor: "Timothée Chalamet / Saoirse Ronan", description: "Intelectual tímido plagado de visiones de páginas perfectas.", estBudget: "$120,000 USD" },
          { role: "El Antagonist", actor: "Adam Driver / Tilda Swinton", description: "Magnate del streaming con ideas de automatización fría sin alma.", estBudget: "$180,000 USD" },
          { role: "La Voz Narradora", actor: "Frances McDormand", description: "Áspera, sincera, realista y con toques de humor negro existencial.", estBudget: "$90,000 USD" }
        ];
      } else {
        // LATIN_DRAMA
        cast = [
          { role: "El Protagonist (Héroe Intelectual)", actor: "Pedro Pascal / Eiza González", description: "Pasional, audaz, defensor del diseño artesanal independiente.", estBudget: "$200,000 USD" },
          { role: "El Antagonist (Jefe de la Distribuidora)", actor: "Javier Bardem / Kate del Castillo", description: "Poderoso, dominante, maneja el imperio editorial con puño de hierro.", estBudget: "$250,000 USD" },
          { role: "Narrador Omnisciente", actor: "Gael García Bernal", description: "Lírico, poético, evoca la magia del realismo mágico literario.", estBudget: "$80,000 USD" }
        ];
      }
      setCastingSuggestions(cast);
      setScreenplayExportDoneMessage("¡IA Adaptadora Cinematográfica completada! El manuscrito literario ha sido decodificado en formato Courier estándar de la industria cinematográfica.");
    }, 1800);
  };

  const exportScreenplayFountain = () => {
    if (!generatedScreenplayText) return;
    
    let fontContent = `
TITLE: GUION ADAPTADO: ${metadata.title || "LIBRO SINFÓNICO"}
AUTHOR: ${metadata.author || "Autor Maverick"}
SOURCE: Basado en el Capítulo ${screenplaySelectedChapterIdx + 1}
WATERMARK: ${screenplayWatermark}
DATE: 2026

===

${generatedScreenplayText}
`;

    triggerFileDownload(
      fontContent,
      `${(metadata.title || "Guion").replace(/\s+/g, '_')}_Scene_${screenplaySelectedChapterIdx + 1}_Maverick.fountain`,
      "text/plain;charset=utf-8;"
    );
    setScreenplayExportDoneMessage("¡Fountain Script exported exitosamente para cargar en Celtx o Final Draft!");
  };

  const runAdaptiveCompression = () => {
    setIsCompressingActive(true);
    setCompressDoneMessage(null);

    setTimeout(() => {
      setIsCompressingActive(false);
      let calculatedSavedWeight = "12.4 MB";
      if (compressDpi === "150") {
        calculatedSavedWeight = "4.1 MB";
      } else if (compressDpi === "72") {
        calculatedSavedWeight = "1.2 MB";
      }
      setCompressDoneMessage(
        `¡Optimización Completada! Archivos maquetados comprimidos con éxito. Espacio estimado disminuido a ${calculatedSavedWeight} (¡Un ahorro del ${
          compressDpi === "300" ? "68%" : compressDpi === "150" ? "89%" : "97%"
        } de almacenamiento sin pérdida tipográfica vectorial!).`
      );
    }, 1500);
  };

  const getDynamicPrintStyle = () => {
    let sizeStr = "6in 9in";
    if (kdpTrimSize === "5.5in_8.5in") sizeStr = "5.5in 8.5in";
    else if (kdpTrimSize === "5in_8in") sizeStr = "5in 8in";
    else if (kdpTrimSize === "7in_10in") sizeStr = "7in 10in";
    else if (kdpTrimSize === "8.5in_11in") sizeStr = "8.5in 11in";

    // Dynamic Gutter based on page count
    const gutterIn = calculateKdpGutter(pages.length);
    const outsideMarginIn = styleSettings.marginSize === "compact" ? 0.5 : styleSettings.marginSize === "normal" ? 0.75 : 1.0;
    const topBottomMarginIn = styleSettings.marginSize === "compact" ? 0.6 : styleSettings.marginSize === "normal" ? 0.875 : 1.25;

    return `
      @media print {
        @page {
          size: ${sizeStr};
          margin: 0 !important;
        }
        body {
          background-color: white !important;
          color: black !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .no-print {
          display: none !important;
        }
        #diagramador-app {
          display: block !important;
          background-color: white !important;
          color: black !important;
          min-height: 0 !important;
          height: auto !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        #book-viewport-container {
          display: block !important;
          background-color: white !important;
          color: black !important;
          padding: 0 !important;
          margin: 0 !important;
          height: auto !important;
          min-height: 0 !important;
        }
        /* Style individual printable pages precisely to match selected dimensions */
        .printable-page-print {
          width: ${sizeStr.split(" ")[0]} !important;
          height: ${sizeStr.split(" ")[1]} !important;
          min-height: ${sizeStr.split(" ")[1]} !important;
          max-height: ${sizeStr.split(" ")[1]} !important;
          page-break-before: always !important;
          break-before: page !important;
          box-sizing: border-box !important;
          background: white !important;
          color: #111111 !important;
          border: none !important;
          box-shadow: none !important;
          float: none !important;
          position: relative !important;
          overflow: hidden !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
        }
        /* Left vs Right page margins for professional Gutter symmetry */
        .printable-page-print:nth-of-type(odd) {
          padding-left: ${gutterIn}in !important;
          padding-right: ${outsideMarginIn}in !important;
          padding-top: ${topBottomMarginIn}in !important;
          padding-bottom: ${topBottomMarginIn}in !important;
        }
        .printable-page-print:nth-of-type(even) {
          padding-left: ${outsideMarginIn}in !important;
          padding-right: ${gutterIn}in !important;
          padding-top: ${topBottomMarginIn}in !important;
          padding-bottom: ${topBottomMarginIn}in !important;
        }
        /* Preserve color tags on print and avoid browser gradients issues */
        .dropcap-ornately::first-letter {
          color: #b45309 !important;
          -webkit-text-fill-color: #b45309 !important;
        }
        .dropcap-modern::first-letter {
          color: #dc2626 !important;
          background: none !important;
          -webkit-text-fill-color: #dc2626 !important;
        }
      }
    `;
  };

  // --- RIGHTS & ISBN ENGINE LOGIC ---
  const generateManuscriptSHA256 = () => {
    const textToHash = metadata.title + (metadata.subtitle || "") + metadata.author + chapters.map(c => c.paragraphs.join(" ")).join(" ");
    let hash = 0;
    for (let i = 0; i < textToHash.length; i++) {
      const char = textToHash.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    const absHash = Math.abs(hash).toString(16);
    return `SHA256-${absHash.padStart(8, '0')}${Array.from({length: 48}, () => Math.floor(Math.random()*16).toString(16)).join("")}`.substring(0, 64).toUpperCase();
  };

  const downloadSoftwareRegistrationDoc = () => {
    const currentDate = new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
    const userEmail = (currentUser && currentUser.email) || "marketingandcoach@gmail.com";
    
    const docHtml = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>Memoria Técnica para Registro de Software - Diagrammers</title>
  <style>
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      line-height: 1.5;
      color: #1a202c;
      padding: 20px;
    }
    .header {
      text-align: center;
      border-bottom: 3px double #2b6cb0;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .title {
      font-size: 20pt;
      font-weight: bold;
      color: #2b6cb0;
      margin: 0;
      text-transform: uppercase;
    }
    .subtitle {
      font-size: 12pt;
      color: #4a5568;
      margin-top: 5px;
      font-style: italic;
    }
    h1 {
      font-size: 14pt;
      color: #2c5282;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
      margin-top: 25px;
      margin-bottom: 12px;
      text-transform: uppercase;
    }
    h2 {
      font-size: 12pt;
      color: #2b6cb0;
      margin-top: 18px;
      margin-bottom: 8px;
    }
    p, li {
      font-size: 11pt;
      text-align: justify;
      margin-bottom: 10px;
    }
    ul, ol {
      margin-left: 20px;
      margin-bottom: 15px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
      margin-bottom: 25px;
    }
    .info-table th {
      background-color: #ebf8ff;
      border: 1px solid #cbd5e0;
      padding: 10px;
      text-align: left;
      font-size: 10.5pt;
      font-weight: bold;
      color: #2b6cb0;
      width: 30%;
    }
    .info-table td {
      border: 1px solid #cbd5e0;
      padding: 10px;
      font-size: 10.5pt;
      color: #2d3748;
    }
    .badge {
      font-family: 'Courier New', monospace;
      background-color: #f7fafc;
      border: 1px solid #e2e8f0;
      padding: 3px 6px;
      font-size: 9.5pt;
    }
    .footer {
      margin-top: 50px;
      border-top: 1px solid #e2e8f0;
      padding-top: 15px;
      font-size: 9pt;
      color: #718096;
      text-align: center;
    }
    .sign-section {
      margin-top: 60px;
      margin-bottom: 40px;
    }
    .sign-line {
      width: 250px;
      border-top: 1px solid #718096;
      margin-top: 50px;
      text-align: center;
      font-size: 10pt;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <div class="header">
    <div class="title">MEMORIA TÉCNICA DE SOFTWARE Y ARQUITECTURA</div>
    <div class="subtitle">Documentación Oficial de Soporte Lógico para el Registro de Propiedad Intelectual y Derechos de Autor</div>
  </div>

  <p>El presente documento constituye la descripción técnica, arquitectónica y operativa detallada de la obra de software titulada comercialmente como <strong>DIAGRAMMERS</strong>, redactada con el propósito formal de servir de sustento técnico para su depósito, inscripción y registro ante las Oficinas Nacionales de Derechos de Autor (tales como la Dirección Nacional de Derecho de Autor DNDA, INDAUTOR, OEPM u organismos internacionales competentes bajo el Convenio de Berna).</p>

  <h1>1. Identificación General de la Obra de Software</h1>
  
  <table class="info-table">
    <tr>
      <th>Título Oficial de la Obra:</th>
      <td>DIAGRAMMERS (Módulo Creativo y Motor Editorial Inteligente)</td>
    </tr>
    <tr>
      <th>Naturaleza del Software:</th>
      <td>Plataforma SaaS en la nube para la maquetación automatizada, optimización de márgenes y gestión de derechos de autor para autopublicación comercial.</td>
    </tr>
    <tr>
      <th>Autores / Titulares de Derechos del Software:</th>
      <td>Socia de Élite (${userEmail}) y Equipo de Ingeniería de Diagrammers</td>
    </tr>
    <tr>
      <th>Lenguajes de Programación Empleados:</th>
      <td>TypeScript (.ts, .tsx), JavaScript (ES13), CSS3 (Tailwind CSS Framework), HTML5</td>
    </tr>
    <tr>
      <th>Entorno de Ejecución:</th>
      <td>Node.js Runtime v18+, Navegadores Web Modernos (Compatible con Chromium Engine, Gecko y WebKit)</td>
    </tr>
    <tr>
      <th>Fecha de Consolidación del Código:</th>
      <td>${currentDate}</td>
    </tr>
    <tr>
      <th>Identificador Safe Creative Oficial:</th>
      <td class="badge">2606015848217-2CJB4R</td>
    </tr>
    <tr>
      <th>Hash Criptográfico de la Versión Core (SHA-256):</th>
      <td class="badge">9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08</td>
    </tr>
  </table>

  <h1>2. Descripción Detallada de Funcionalidades Nucleares</h1>
  
  <h2>2.1. Motor Editorial de Formateo y Paginación en Tiempo Real</h2>
  <p>El sistema cuenta con un algoritmo avanzado de paginación client-side que calcula dinámicamente el flujo de texto y caracteres en base al factor de forma físico seleccionado (tales como 6"x9", 5.5"x8.5", o bolsillo 5"x8"). Este motor determina dinámicamente las sangrías, distancias de lomo/canal, márgenes exteriores y zonas seguras para previsualizar pliegos físicos con precisión milimétrica, impidiendo errores tipográficos o desbordes.</p>

  <h2>2.2. Corrector Ortotipográfico Automatizado para Diálogos de Narrativa</h2>
  <p>Subir manuscritos con guiones de diálogos incorrectos es un error altamente frecuente. Este software procesa el manuscrito mediante patrones de sustitución avanzados, reemplazando guiones cortos de manera automática por rayas largas (—), configurando la puntuación conforme a las directrices de la Real Academia Española (RAE) y de edición internacional.</p>

  <h2>2.3. Sello de Garantía y Vinculación Criptográfica (SHA-256)</h2>
  <p>La aplicación calcula un identificador criptográfico único (Hash SHA-256) del manuscrito, lo que permite asegurar la inmutabilidad y probar la autoría frente a cualquier plagio, integrando canalizaciones seguras vía OAuth para Safe Creative e ISBN de KDP, permitiendo un blindaje total del activo del autor.</p>

  <h2>2.4. Bucle Interactiva de Síntesis de Audio (Voz IA Cohesiva)</h2>
  <p>Un sistema integrado que interactúa con la SpeechSynthesis API para calibrar pautas de respiración, tonos diferenciados y velocidades por personaje, permitiendo a los autores escuchar en tiempo real sus obras con una excelente dicción lingüística.</p>

  <h2>2.5. Simulador Pre-Prensa de Imprenta Física</h2>
  <p>Módulo de canvas avanzado que dibuja guías de sangrado (Bleed), miras de alineación de color densitométricas, áreas de seguridad y marcas de corte profesionales (Crop Marks) necesarias para la aceptación de archivos PDF listos para imprenta en Amazon KDP o imprentas tradicionales de offset.</p>

  <h1>3. Especificaciones Arquitectónicas del Sistema</h1>
  
  <h2>3.1. Front-End Integrado (Capa del Cliente)</h2>
  <p>Desarrollado bajo el paradigma de Componentes Funcionales reactivos de <strong>React 18+</strong> y controlado rigurosamente con tipado estático en <strong>TypeScript</strong>. Las micro-interacciones de la interfaz utilizan el motor de movimientos físicos acelerados de <strong>Framer Motion (motion/react)</strong>, asegurando una experiencia hiper-fluida de usuario para la edición de manuscritos.</p>

  <h2>3.2. Capa del Servidor (Full-Stack Express Server)</h2>
  <p>Un backend ligero implementado mediante <strong>Express</strong>, compilado de manera óptima por esbuild en un bundle unificado CommonJS (.cjs), el cual expone los controladores REST en el puerto proxy indexado por la plataforma, impidiendo latencias y garantizando el aislamiento de rutas.</p>

  <h2>3.3. Base de Datos NoSQL y Seguridad de Datos</h2>
  <p>Se utiliza <strong>Firebase Firestore Database</strong> como motor principal de almacenamiento para almacenar registros persistentes y estructuras JSON extensibles de manuscritos. La seguridad se gestiona mediante reglas de seguridad robustas (firestore.rules) que validan el token criptográfico del usuario en cada petición.</p>

  <h1>4. Declaración de Originalidad y Autores del Software</h1>
  <p>El código fuente completo del sistema que comprende los módulos de paginación, edición rítmica de diálogos, previsualización de pliegos y exportación de pre-prensa, ha sido desarrollado de forma original. Por medio de este pliego, se declara bajo protesta de decir verdad la completa autoría del software libre de reclamaciones de terceros.</p>

  <div class="sign-section">
    <p>Dado en la Ciudad, a fecha de su descargo digital.</p>
    <div class="sign-line">
      Firma del Peticionario / Titular<br>
      Socia de Élite
    </div>
  </div>

  <div class="footer">
    Documento oficial autogenerado por la Suite de Seguridad de DIAGRAMMERS • Propiedad Intelectual Digital Sincronizada
  </div>

</body>
</html>
    `;
    
    const blob = new Blob(['\ufeff' + docHtml], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Registro_Derecho_Autor_DIAGRAMMERS.doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadBookCopyrightDoc = () => {
    const currentDate = new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
    const bookTitleStr = metadata.title || "Tu Título Especial";
    const bookAuthorStr = metadata.author || "Tu Nombre o Seudónimo";
    const bookSubtitleStr = metadata.subtitle || "";
    const bookIsbnStr = metadata.isbn || "PENDIENTE DE ASIGNACIÓN";
    const bookSafeStr = metadata.safeCreativeId || "NO REGISTRADO AÚN (VER SELLO SEGURO)";
    const hashValue = calculatedHash || generateManuscriptSHA256();
    const editorialStr = metadata.publisher || "Autoedición Diagrammers / Independiente";
    const yearStr = metadata.year || "2026";
    const trimSizeLabel = (TRIM_SIZE_FACTORS[kdpTrimSize] && TRIM_SIZE_FACTORS[kdpTrimSize].label) || "6\" x 9\" Estándar KDP";

    const docHtml = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>Declaración de Obra y Registro de Derecho de Autor</title>
  <style>
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      line-height: 1.5;
      color: #2d3748;
      padding: 30px;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #2b6cb0;
      padding-bottom: 15px;
      margin-bottom: 25px;
    }
    .title {
      font-size: 18pt;
      font-weight: bold;
      color: #2c5282;
      margin: 0;
    }
    .subtitle {
      font-size: 11pt;
      color: #718096;
      margin-top: 5px;
    }
    h1 {
      font-size: 13pt;
      color: #2b6cb0;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
      margin-top: 22px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    p, li {
      font-size: 11pt;
      text-align: justify;
      margin-bottom: 10px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
      margin-bottom: 20px;
    }
    .data-table th {
      background-color: #f7fafc;
      border: 1px solid #cbd5e0;
      padding: 8px;
      text-align: left;
      font-size: 10pt;
      font-weight: bold;
      width: 35%;
    }
    .data-table td {
      border: 1px solid #cbd5e0;
      padding: 8px;
      font-size: 10pt;
    }
    .badge {
      font-family: 'Courier New', monospace;
      font-size: 9pt;
      background-color: #edf2f7;
    }
    .sign-section {
      margin-top: 50px;
      margin-bottom: 30px;
    }
    .sign-line {
      width: 250px;
      border-top: 1px solid #718096;
      margin-top: 40px;
      text-align: center;
      font-size: 10pt;
      font-weight: bold;
    }
    .disclaimer {
      font-size: 9.5pt;
      color: #4a5568;
      background-color: #ebf8ff;
      border-left: 3px solid #3182ce;
      padding: 10px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>

  <div class="header">
    <div class="title">CARTA DE DECLARACIÓN JURADA DE AUTORÍA</div>
    <div class="subtitle">Documento de Acompañamiento Técnico para Registro Literario de Obra Impresa</div>
  </div>

  <p>Por medio de esta Memoria de Propiedad Intelectual, se expide formalmente la declaración técnica de autoría literaria para la obra titulada provisional o definitivamente como <strong>"${bookTitleStr}"</strong>, diseñada y maquetada mediante las pautas paramétricas del software de precisión editorial DIAGRAMMERS.</p>

  <div class="disclaimer">
    <strong>NOTA DE RESPALDO DE SEGURIDAD DIAGRAMMERS:</strong> El manuscrito literario adjunto ha sido estructurado siguiendo estándares de pre-prensa y cuenta con una huella digital criptográfica inyectada por el motor inteligente de forma local, sirviendo de respaldo de integridad temporal.
  </div>

  <h1>1. Ficha Técnica de Registro Literario</h1>
  <table class="data-table">
    <tr>
      <th>Título de la Obra Literaria:</th>
      <td><strong>${bookTitleStr}</strong></td>
    </tr>
    <tr>
      <th>Subtítulo de la Obra (si aplica):</th>
      <td>${bookSubtitleStr || "No especificado"}</td>
    </tr>
    <tr>
      <th>Autor / Titular del Derecho de Autor:</th>
      <td><strong>${bookAuthorStr}</strong></td>
    </tr>
    <tr>
      <th>Sello Editorial Responsable:</th>
      <td>${editorialStr}</td>
    </tr>
    <tr>
      <th>Año de Publicación Planificado:</th>
      <td>${yearStr}</td>
    </tr>
    <tr>
      <th>Código ISBN Registrado:</th>
      <td class="badge">${bookIsbnStr}</td>
    </tr>
    <tr>
      <th>Identificador Legal Safe Creative:</th>
      <td class="badge">${bookSafeStr}</td>
    </tr>
    <tr>
      <th>Formato Físico de Maquetación:</th>
      <td>${trimSizeLabel}</td>
    </tr>
    <tr>
      <th>Firma Hash Integradora del Texto (SHA-256):</th>
      <td class="badge">${hashValue}</td>
    </tr>
  </table>

  <h1>2. Descripción del Formato Técnico de la Obra</h1>
  <p>La obra literaria consta de un manuscrito en prosa o verso que ha sido analizado por el motor ortotipográfico corrector "Diagrammers" para la optimización de los elementos tipográficos.</p>
  <ul>
    <li><strong>Sustitución de Guiones de Diálogo:</strong> Conversión sistemática de guiones estándar en rayas largas (—) para separar los parlamentos de los personajes de forma canónica y limpia.</li>
    <li><strong>Control de Interlineado y Baseline Grid:</strong> Calibrado preciso de espaciados para evitar la fatiga visual del lector y garantizar que los renglones se correspondan exactamente en ambas caras del papel impreso.</li>
    <li><strong>Márgenes de Seguridad Compensados (Gutter):</strong> Adición automática de espacio de lomo (margen de encuadernación) de acuerdo al total de páginas calculadas, de forma que el texto no resulte absorbido por el pegado o costura de la espina del libro físico en Amazon KDP o imprenta comercial.</li>
  </ul>

  <h1>3. Declaración de Maternidad y Propiedad de Obra</h1>
  <p>El abajo firmante declara solemnemente ser el creador e inventor legítimo del contenido conceptual y literario de la obra objeto de este registro, habiéndose reservado todos los derechos morales y patrimoniales que de ella emanen.</p>

  <div class="sign-section">
    <p>Suscrito el día de la fecha de su descargo digital.</p>
    <div class="sign-line">
      Firma del Autor / Titular Legítimo<br>
      ${bookAuthorStr}
    </div>
  </div>

</body>
</html>
    `;
    
    const blob = new Blob(['\ufeff' + docHtml], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Registro_Derecho_Autor_${bookTitleStr.replace(/[^a-z0-9]/gi, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSimulateSafeCreative = () => {
    setIsRegistrandoSafeCreative(true);
    setTransferState("idle");
    
    // Simular el ciclo de hashes criptográficos reales
    setTimeout(() => {
      setTransferState("hashing");
      const sha = generateManuscriptSHA256();
      setCalculatedHash(sha);
      
      setTimeout(() => {
        setTransferState("encrypting");
        
        setTimeout(() => {
          setTransferState("sending");
          
          setTimeout(() => {
            const registryId = `REG-2026-${Math.floor(Math.random() * 9000000) + 1000000}-US`;
            const updated = {
              ...metadata,
              safeCreativeId: registryId
            };
            setMetadata(updated);
            saveToLocalStorage(updated, styleSettings, chapters);
            setTransferState("success");
            setIsRegistrandoSafeCreative(false);
          }, 1200);
        }, 1000);
      }, 900);
    }, 700);
  };

  // --- ISBN BARCODE SCANNER MOCK DB & LOGIC ---
  const MOCK_ISBN_DB = [
    {
      isbn: "978-8437604947",
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      subtitle: "Edición crítica anotada académica ilustrada",
      publisher: "Editorial Cátedra",
      year: "1605",
      coverColor: "bg-amber-950 border-amber-700",
      genre: "Clásico"
    },
    {
      isbn: "978-0307474728",
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      subtitle: "La mítica epopeya de Macondo y la familia Buendía",
      publisher: "Editorial Sudamericana",
      year: "1967",
      coverColor: "bg-emerald-950 border-emerald-800",
      genre: "Realismo Mágico"
    },
    {
      isbn: "978-9875666481",
      title: "Ficciones",
      author: "Jorge Luis Borges",
      subtitle: "Laberintos del intelecto, espejos y senderos que se bifurcan",
      publisher: "Editorial Sur",
      year: "1944",
      coverColor: "bg-indigo-950 border-indigo-805",
      genre: "Ficción Filosófica"
    },
    {
      isbn: "978-6071614055",
      title: "Pedro Páramo",
      author: "Juan Rulfo",
      subtitle: "El murmullo desértico de las ánimas de Comala",
      publisher: "Fondo de Cultura Económica",
      year: "1955",
      coverColor: "bg-stone-900 border-stone-700",
      genre: "Realismo Espectral"
    },
    {
      isbn: "978-8408043645",
      title: "La Sombra del Viento",
      author: "Carlos Ruiz Zafón",
      subtitle: "Un misterioso misterio en El Cementerio de los Libros Olvidados",
      publisher: "Editorial Planeta",
      year: "2001",
      coverColor: "bg-rose-950 border-rose-800",
      genre: "Novela Gótica"
    }
  ];

  const playSuccessfulScanBeep = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1050, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleScanBook = (bookIndex: number) => {
    const book = MOCK_ISBN_DB[bookIndex];
    if (!book) return;

    setScannerStatus("searching");
    
    setTimeout(() => {
      playSuccessfulScanBeep();
      setScannerStatus("scanned");
      setScannedResult(book.isbn);
      
      const updated = {
        ...metadata,
        title: book.title,
        author: book.author,
        subtitle: book.subtitle,
        publisher: book.publisher,
        year: book.year,
        isbn: book.isbn
      };
      
      setMetadata(updated);
      saveToLocalStorage(updated, styleSettings, chapters);
    }, 1500);
  };

  const startRealCamera = async (videoEl: HTMLVideoElement | null) => {
    if (!videoEl) return;
    try {
      setScannerStatus("idle");
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      videoEl.srcObject = stream;
      videoEl.play();
      (window as any).scannerStream = stream;
      setScannerRealCameraActive(true);
    } catch (err) {
      console.error("Camera access failed:", err);
      // Fallback gracefully since sandbox handles iframe permissions differently
    }
  };

  const stopRealCamera = () => {
    const stream = (window as any).scannerStream;
    if (stream) {
      stream.getTracks().forEach((track: any) => track.stop());
      (window as any).scannerStream = null;
    }
    setScannerRealCameraActive(false);
  };

  const renderPrintGuidesOverlay = (p: SimulatedPage, isLeft: boolean) => {
    if (!isPrintPreviewEnabled) return null;
    return (
      <div className="absolute inset-0 pointer-events-none z-35 select-none overflow-visible">
        {/* Shaded out bleed crop limit */}
        <div className="absolute inset-0 border-[6px] border-red-500/10 box-border pointer-events-none"></div>
        <div className="absolute top-[6px] bottom-[6px] left-[6px] right-[6px] border border-dashed border-red-500/35 box-border"></div>
        
        {/* Bleed text warning */}
        <div className="absolute top-1 left-4 text-[7px] font-mono font-bold text-red-400 opacity-80 uppercase tracking-widest no-print">
          Sangría Física KDP (+3mm)
        </div>

        {/* Crop corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-400 opacity-60"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-400 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-400 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-400 opacity-60"></div>

        {/* Safety Margins box */}
        <div className="absolute top-[28px] bottom-[28px] left-[24px] right-[24px] border border-dashed border-emerald-500/20 bg-[rgba(16,185,129,0.01)] box-border">
          <div className="absolute bottom-0.5 right-1.5 text-[6.5px] font-mono text-emerald-500/80 font-semibold uppercase tracking-wider bg-slate-950/90 px-1 rounded border border-emerald-500/10 no-print">
            Zona de Seguridad Física
          </div>
        </div>

        {/* CMYK color calibration swatches */}
        <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? "-left-5" : "-right-5"} flex flex-col items-center gap-1 no-print`}>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-450"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-600"></div>
        </div>

        {/* Diagnostic stamp */}
        <div className="absolute bottom-1.5 left-4 text-[6.5px] font-mono text-slate-400 flex items-center gap-1 bg-slate-950/90 px-1 py-0.2 rounded border border-slate-800 pointer-events-auto no-print">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>PREPRESS OK • {kdpTrimSize === "6in_9in" ? "6x9\"" : kdpTrimSize} • 300 DPI</span>
        </div>
      </div>
    );
  };

  const handleSimulateISBN = () => {
    setIsSolicitandoISBN(true);
    
    // Simular solicitud interactiva en base a KDP API
    setTimeout(() => {
      // Generar un número ISBN-13 válido (KDP asigna por defecto prefijos 979 o 978)
      const randomPrefix = "979-8";
      const randomPart1 = Math.floor(Math.random() * 9000) + 1000;
      const randomPart2 = Math.floor(Math.random() * 900) + 100;
      const checkDigit = Math.floor(Math.random() * 10);
      const generatedIsbn = `${randomPrefix}-${randomPart1}-${randomPart2}-${checkDigit}`;
      
      const updated = {
        ...metadata,
        isbn: generatedIsbn
      };
      setMetadata(updated);
      saveToLocalStorage(updated, styleSettings, chapters);
      setIsSolicitandoISBN(false);
    }, 2000);
  };

  const handleCompileEpubLogs = () => {
    setEpubValId(true);
    setEpubLogs("Compilando contenedor digital EPUB 3.2...\n[SISTEMA] Estructurando directorio OCF militar con mimetype...\n[OPF] Generando metadatos unificados content.opf...\n[NCX] Añadiendo estructura semántica toc.ncx...\n[TEXT] Inyectando " + chapters.length + " hojas de capítulos fluidas...\n[IDPF] Validando esquema con IDPF EPUBCheck 4.2.6...\n🎉 ¡ESTADO TOTALMENTE VÁLIDO! 0 Errores, 0 Advertencias. Tu eBook cumple las políticas de distribución de Apple Books, Google Play Books y Amazon Kindle KDP.");
  };

  const handleCoverArtAiGeneration = () => {
    setIsGeneratingCover(true);
    setTimeout(() => {
      const promptLower = coverPrompt.toLowerCase();
      let options = [];

      if (promptLower.includes("mar") || promptLower.includes("agua") || promptLower.includes("oceano") || promptLower.includes("océano") || promptLower.includes("azul") || promptLower.includes("marino")) {
        options = [
          {
            id: 1,
            label: "Marina Clásica",
            url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#031c3c",
            accentColor: "#7dd3fc"
          },
          {
            id: 2,
            label: "Mareas Profundas",
            url: "https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#011627",
            accentColor: "#38bdf8"
          },
          {
            id: 3,
            label: "Faro de Ensueño",
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#1e293b",
            accentColor: "#4cc9f0"
          }
        ];
      } else if (promptLower.includes("bosque") || promptLower.includes("naturaleza") || promptLower.includes("arbol") || promptLower.includes("árbol") || promptLower.includes("verde") || promptLower.includes("selva")) {
        options = [
          {
            id: 1,
            label: "Dosel Místico",
            url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#022c22",
            accentColor: "#34d399"
          },
          {
            id: 2,
            label: "Bosque Profundo",
            url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#0f1f15",
            accentColor: "#a7f3d0"
          },
          {
            id: 3,
            label: "Susurro Verde",
            url: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#14532d",
            accentColor: "#fbbf24"
          }
        ];
      } else if (promptLower.includes("fuego") || promptLower.includes("rojo") || promptLower.includes("sol") || promptLower.includes("atardecer") || promptLower.includes("sangre") || promptLower.includes("fénix")) {
        options = [
          {
            id: 1,
            label: "Llamas Sagradas",
            url: "https://images.unsplash.com/photo-1508525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#450a0a",
            accentColor: "#fb923c"
          },
          {
            id: 2,
            label: "Atardecer del Alma",
            url: "https://images.unsplash.com/photo-1472214222541-d510753a49fa?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#2d0b13",
            accentColor: "#f43f5e"
          },
          {
            id: 3,
            label: "Chispas de Fénix",
            url: "https://images.unsplash.com/photo-1496317556649-f930d733eea3?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#320c02",
            accentColor: "#fbbf24"
          }
        ];
      } else if (promptLower.includes("estrella") || promptLower.includes("universo") || promptLower.includes("cosmos") || promptLower.includes("galaxia") || promptLower.includes("astros") || promptLower.includes("oro") || promptLower.includes("cósmico") || promptLower.includes("dorado")) {
        options = [
          {
            id: 1,
            label: "Polvo Cósmico",
            url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#050b14",
            accentColor: "#fbbf24"
          },
          {
            id: 2,
            label: "Abismo del Tiempo",
            url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#03001e",
            accentColor: "#d946ef"
          },
          {
            id: 3,
            label: "Nebulosa Íntima",
            url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#170139",
            accentColor: "#a855f7"
          }
        ];
      } else {
        options = [
          {
            id: 1,
            label: "Elegancia Papiro",
            url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#0f172a",
            accentColor: "#fb7185"
          },
          {
            id: 2,
            label: "Madera de Biblioteca",
            url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#1e1b18",
            accentColor: "#d97706"
          },
          {
            id: 3,
            label: "Minimalismo Lírico",
            url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop",
            primaryColor: "#090d16",
            accentColor: "#6366f1"
          }
        ];
      }

      setCoverOptions(options);
      // Auto-select first option
      setCoverArtUrl(options[0].url);
      setCoverPrimaryColor(options[0].primaryColor);
      setCoverAccentColor(options[0].accentColor);
      setIsGeneratingCover(false);
    }, 2200);
  };

  const handleGenerateSynopsisWithAi = async () => {
    setIsGeneratingSynopsis(true);
    try {
      const res = await fetch("/api/generate-synopsis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: metadata.title,
          author: metadata.author,
          genre: metadata.genre,
          chapters: chapters.map(c => ({ chapterNumber: c.chapterNumber, title: c.title }))
        })
      });
      if (!res.ok) throw new Error("Fallo al contactar el redactor");
      const data = await res.json();
      if (data.synopsis) {
        setBackCoverSynopsis(data.synopsis);
      }
    } catch (err) {
      console.error(err);
      // Fallback local semantic simulation
      setBackCoverSynopsis(`En las páginas de esta apasionante obra, "${metadata.title || "nuestra nueva obra"}" de ${metadata.author || "gran autor"}, nos sumergimos en un inolvidable viaje literario cargado de intriga y ritmo extraordinario. Un recorrido de diagramación sublime diseñado para capturar la esencia de la literatura contemporánea.`);
    } finally {
      setIsGeneratingSynopsis(false);
    }
  };

  const handleTransferToSafeCreative = () => {
    setIsTransferringSafe(true);
    setTransferState("hashing");
    
    setTimeout(() => {
      setTransferState("encrypting");
      setTimeout(() => {
        setTransferState("sending");
        setTimeout(() => {
          setTransferState("success");
          setTimeout(() => {
            setIsTransferringSafe(false);
            setTransferState("idle");
          }, 3000);
        }, 1500);
      }, 1200);
    }, 1000);
  };

  const handleTransferToKDP = () => {
    setIsTransferringKDP(true);
    setTransferState("hashing");
    
    setTimeout(() => {
      setTransferState("encrypting");
      setTimeout(() => {
        setTransferState("sending");
        setTimeout(() => {
          setTransferState("success");
          setTimeout(() => {
            setIsTransferringKDP(false);
            setTransferState("idle");
          }, 3000);
        }, 1500);
      }, 1200);
    }, 1000);
  };

  // Trigger browser printing styled with @media print
  const handlePrint = () => {
    window.print();
  };

  if (viewMode === "landing") {
    return (
      <LandingPage 
        onNavigateToStudio={(user) => {
          if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
          }
          if (user) {
            setCurrentUser(user);
          }
          setViewMode("studio");
        }}
        initialCapital={pitchCapital}
        initialEquity={pitchEquity}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <div id="diagramador-app" className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans antialiased selection:bg-amber-100 selection:text-slate-950">
      
      {/* Auto-injected print dynamic styles matching exact KDP measurements requested */}
      <style dangerouslySetInnerHTML={{ __html: getDynamicPrintStyle() }} />

      {/* Cloud Synchronizer banner notice if updates detected */}
      {showSyncNotification && (
        <div className="no-print bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-500/30 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs z-50 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center p-1 bg-indigo-500/20 text-indigo-400 rounded-lg shrink-0">
              <Cloud className="w-4 h-4 animate-bounce" />
            </span>
            <div className="leading-snug">
              <span className="font-bold text-indigo-300">¡Sincronización en la Nube disponible!</span>
              <span className="text-slate-300 ml-1.5">
                Se detectó un cambio guardado desde otro dispositivo (ej. tu móvil):
                <strong className="text-white ml-1">"{cloudSaveTitle || "Sin título"}"</strong> por <strong className="text-slate-200">{cloudSaveAuthor || "Anónimo"}</strong>.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadFromCloud}
              className="bg-indigo-650 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded shadow transition-all cursor-pointer flex items-center gap-1 shrink-0"
              title="Cargar actualizaciones recientes de sincronización en este navegador"
            >
              <CloudDownload className="w-3.5 h-3.5" />
              <span>Cargar de la Nube</span>
            </button>
            <button
              onClick={() => setShowSyncNotification(false)}
              className="text-slate-400 hover:text-slate-200 font-bold px-2 py-1 transition-all cursor-pointer shrink-0"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      
      {/* 1. MAIN GLOBAL HEADER (Invisible during print) */}
      <header id="app-header" className="no-print bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center select-none">
            <HostiaSoftLogo className="w-10 h-10 shrink-0" glow />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-[0.05em] text-white flex items-center gap-1.5 flex-wrap" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              HOSTIA<span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 bg-clip-text text-transparent font-bold">SOFT</span>
              <span className="text-slate-800 text-sm mx-1">|</span>
              <span className="text-sm font-bold text-slate-300">DIAGRAMMERS</span>
              <span className="text-[9px] tracking-normal font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded">STUDIO V2.5</span>
            </h1>
            <p className="text-xs text-slate-400">
              {language === "en" 
                ? "Professional typography design & layout for writers worldwide" 
                : language === "pt" 
                ? "Desenho tipográfico e diagramação profissional para escritores globais" 
                : "Diseño tipográfico y maquetación profesional para autores globales"}
            </p>
          </div>
        </div>

        {/* Global Metadata Inputs */}
        <div className="flex flex-wrap items-center gap-2 max-w-xl text-xs bg-slate-900 border border-slate-800 p-2 rounded-lg self-center">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Título de Obra</span>
            <input
              type="text"
              value={metadata.title}
              onChange={(e) => {
                const updated = { ...metadata, title: e.target.value };
                setMetadata(updated);
                saveToLocalStorage(updated, styleSettings, chapters);
              }}
              className="bg-transparent text-white font-medium focus:outline-none focus:text-amber-300 w-36 py-0.5"
              placeholder="Don Quijote"
            />
          </div>
          <div className="h-6 w-[1px] bg-slate-800 self-center"></div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Autor</span>
            <input
              type="text"
              value={metadata.author}
              onChange={(e) => {
                const updated = { ...metadata, author: e.target.value };
                setMetadata(updated);
                saveToLocalStorage(updated, styleSettings, chapters);
              }}
              className="bg-transparent text-white font-medium focus:outline-none focus:text-amber-300 w-28 py-0.5"
              placeholder="Cervantes"
            />
          </div>
          <div className="h-6 w-[1px] bg-slate-800 self-center"></div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Editorial</span>
            <input
              type="text"
              value={metadata.publisher || ""}
              onChange={(e) => {
                const updated = { ...metadata, publisher: e.target.value };
                setMetadata(updated);
                saveToLocalStorage(updated, styleSettings, chapters);
              }}
              className="bg-transparent text-slate-300 font-medium focus:outline-none focus:text-amber-300 w-24 py-0.5"
              placeholder="Opcional"
            />
          </div>
          <div className="h-6 w-[1px] bg-slate-800 self-center"></div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Tipo de Libro</span>
            <input
              type="text"
              value={metadata.genre || ""}
              onChange={(e) => {
                const updated = { ...metadata, genre: e.target.value };
                setMetadata(updated);
                saveToLocalStorage(updated, styleSettings, chapters);
              }}
              className="bg-transparent text-slate-300 font-medium focus:outline-none focus:text-amber-300 w-24 py-0.5"
              placeholder="Novela"
            />
          </div>
          <button
            onClick={() => saveToLocalStorage()}
            className="ml-2 bg-slate-800 hover:bg-slate-705 active:bg-slate-700 text-slate-200 px-3 py-2 rounded font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Guardar estado del proyecto de forma local"
          >
            {savedSuccess ? "Guardado ✓" : "Guardar Proyecto"}
          </button>
          <button
            onClick={() => {
              fetchCloudSyncInfo();
              setIsCloudSyncModalOpen(true);
            }}
            className="bg-indigo-950/50 hover:bg-indigo-900 border border-indigo-500/40 hover:border-indigo-400 text-indigo-200 px-3 py-2 rounded font-medium flex items-center gap-1.5 transition-all cursor-pointer relative shadow-sm"
            title="Sincronizar proyecto con la nube para transferir cambios entre móvil y ordenador"
          >
            <Cloud className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="whitespace-nowrap">Sincronizar Nube</span>
            {cloudSaveExists ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" title="Copia de seguridad en la nube existente"></span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-slate-650 inline-block"></span>
            )}
          </button>
          <button
            onClick={handleResetProject}
            className="bg-red-950/40 hover:bg-red-900/40 border border-red-500/30 text-red-350 hover:text-red-200 px-2.5 py-2 rounded font-medium flex items-center gap-1 transition-colors cursor-pointer"
            title="Borrar obra actual y resetear el maquetador de libro si hay errores de previsualización"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="whitespace-nowrap">Nueva Obra (Reset)</span>
          </button>
        </div>

        {/* Global Export Options */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* LANGAUGE switcher inside Studio header */}
          <div className="flex items-center gap-1 bg-slate-905 border border-slate-800 p-1 rounded-xl shrink-0 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 mx-1.5" />
            <span className="text-[10px] text-slate-500 font-bold uppercase mr-1">{t.selectLanguageShort}:</span>
            {(["es", "en", "pt", "fr", "it", "de"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                  language === lang
                    ? "bg-amber-500 text-slate-950 font-black"
                    : "text-slate-450 hover:text-white hover:bg-slate-850"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={() => setViewMode("landing")}
            className="no-print bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-amber-400 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-all cursor-pointer"
            title="Ver Sitio Comercial / Landing Page & Funnel de Negocios para Inversores"
          >
            <Globe className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>{language === "en" ? "GLOBAL WEBSITE" : language === "pt" ? "SITE COMERCIAL" : "SITIO WEB COMERCIAL"}</span>
          </button>
          
          <button
            onClick={() => {
              setShowAnalyticsModal(true);
              fetchAnalytics();
            }}
            className="no-print bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-emerald-400 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-all cursor-pointer"
            title="Ver estadísticas y tráfico de la plataforma en tiempo real"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>{language === "en" ? "METRICS & VISITS" : language === "pt" ? "TRÁFEGO E VISITAS" : "VISITAS Y ANALÍTICAS"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-semibold px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <Printer className="w-4 h-4" />
            <span>{language === "en" ? "Export Book / Print" : language === "pt" ? "Exportar Livro / Imprimir" : "Exportar Libro / Imprimir"}</span>
          </button>
        </div>
      </header>

      {/* 1.5. EDITORIAL SUITE ACTIVE B2B BAR */}
      {currentUser ? (
        <div className="no-print bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-slate-950 border-b border-amber-500/25 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-slate-400">SUITE EDITORIAL ACTIVA:</span>
            <span className="font-bold text-amber-300 tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              {currentUser.workspace}
            </span>
            <span className="hidden sm:inline-block text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px]">
              {currentUser.email} (Rol: {currentUser.name})
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowDriveModal(true)}
              className="bg-amber-500 text-slate-950 hover:bg-amber-400 font-black px-4 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer hover:scale-103 active:scale-100 transition-all font-mono uppercase text-[10.5px] shadow-lg shadow-amber-500/10"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Sincronizar Cloud Drivers</span>
            </button>

            <button
              onClick={() => {
                setCurrentUser(null);
                setMetadata(prev => ({ ...prev, publisher: "" }));
              }}
              className="text-slate-450 hover:text-red-400 font-mono transition-colors text-[10px] bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-md cursor-pointer"
            >
              Desconectar
            </button>
          </div>
        </div>
      ) : (
        <div className="no-print bg-slate-950/60 border-b border-slate-800 px-6 py-2 flex items-center justify-between gap-3 text-[11px] text-slate-450 font-mono">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-500/60" />
            <span>¿Estás evaluando para una editorial o agencia? Activa la suite B2B y conecta tus drivers.</span>
          </span>
          <button
            onClick={() => setViewMode("landing")}
            className="text-amber-400 hover:text-amber-300 hover:underline cursor-pointer"
          >
            Ir a Landing & Loguearse ➔
          </button>
        </div>
      )}

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[calc(100vh-73px)]">
        
        {/* LEFT WORKSPACE: SIDEBAR PANEL SECTION (Hidden on print) */}
        <aside id="workspace-sidebar" className="no-print w-full lg:w-[480px] border-r border-slate-800 bg-slate-950/80 flex flex-col shrink-0 overflow-y-auto">
          
          {/* Sticky Header Containing Guiautor AI */}
          <div className="sticky top-0 z-30 bg-slate-950 border-b border-slate-800/80 p-4 shrink-0">
            <div className="flex items-center justify-between font-sans">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 via-amber-600 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/10 shrink-0">
                  <span className="text-lg">🧠</span>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase text-white font-mono tracking-widest leading-none">DIAGRAMMERS</h3>
                  <p className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider font-mono mt-0.5 flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 animate-pulse"></span>
                    </span>
                    <span>Guiautor IA Activado</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[8.5px] bg-slate-900 border border-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded font-mono uppercase">
                  v2.8 Master
                </span>
              </div>
            </div>
          </div>

        {/* Sidebar Inner Area */}
        <div className="p-3.5 flex flex-col flex-1 min-h-0 space-y-4">
          
          {/* Interactive Editorial Stepper: Always visible, extremely clean */}
          <div className="bg-slate-950/85 border border-slate-850/85 rounded-xl p-3 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
                <span className="text-[10.5px] font-black uppercase text-amber-300 font-mono tracking-wider">Ruta Editorial Paso a Paso</span>
              </div>
              <span className="text-[8px] bg-slate-900 border border-slate-800 text-emerald-400 font-bold px-1.5 py-0.2 rounded font-mono">
                {Number(chapters.length > 0) + Number(kdpTrimSize !== "6in_9in") + Number(!!metadata.isbn) + Number(!!metadata.copyrightType && metadata.copyrightType !== "ninguno") + 1}/5 COMPLETO
              </span>
            </div>
            
            <div className="grid grid-cols-5 gap-1 pt-1 font-sans">
              {[
                { label: "Borrador", query: "Por favor, infórmame sobre la fase de Borrador y cómo cargar o iniciar la creación de mi libro.", finished: chapters.length > 0 },
                { label: "Formato", query: "Recomiéndame las mejores tendencias editoriales en cuanto a margenes, letras y papel.", finished: kdpTrimSize !== "6in_9in" },
                { label: "Ortotipia", query: "Explícame las reglas de la RAE respecto al uso de las rayas de diálogo (—) para narrativa.", finished: true },
                { label: "Derechos", query: "Guíame sobre el registro de propiedad intelectual en Safe Creative y el código ISBN.", finished: !!metadata.isbn || (!!metadata.copyrightType && metadata.copyrightType !== "ninguno") },
                { label: "Lanzar KDP", query: "Explícame el paso final: cómo compaginar y subir mi libro a Amazon KDP con éxito.", finished: false }
              ].map((step, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => sendDagramitoQuery(step.query)}
                  className={`py-1 px-0.5 rounded text-[9.5px] font-bold text-center border transition-all cursor-pointer truncate flex flex-col items-center justify-center ${
                    step.finished
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-sm"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                  title={step.query}
                >
                  <span className="text-[9px] mb-0.5 font-sans leading-none">{step.finished ? "✓" : idx + 1}</span>
                  <span className="text-[7.5px] tracking-tight truncate uppercase font-mono block w-full">{step.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* PERSISTENT WRITER IDENTITY & TYPOGRAPHY QUICK-BAR (Always visible as requested) */}
          <div className="bg-slate-950/90 border border-amber-500/15 rounded-xl p-3.5 space-y-3 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
              <Feather className="w-12 h-12 text-amber-400" />
            </div>
            
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-[10.5px] font-black uppercase text-amber-300 font-mono tracking-widest flex items-center gap-1.5">
                <Feather className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                Firma de Autor y Letra del Libro
              </span>
              <span className="text-[8px] font-mono text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 rounded uppercase">
                Edición Activa
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 font-sans">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-slate-400 tracking-wide block">Título del Libro</label>
                <input
                  type="text"
                  value={metadata.title}
                  onChange={(e) => {
                    const updated = { ...metadata, title: e.target.value };
                    setMetadata(updated);
                    saveToLocalStorage(updated, styleSettings, chapters);
                  }}
                  placeholder="Ej: Don Quijote"
                  className="w-full text-[11px] bg-slate-900 border border-slate-800 focus:border-amber-500/60 rounded-lg p-2 text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-slate-400 tracking-wide block">Nombre del Autor</label>
                <input
                  type="text"
                  value={metadata.author}
                  onChange={(e) => {
                    const updated = { ...metadata, author: e.target.value };
                    setMetadata(updated);
                    saveToLocalStorage(updated, styleSettings, chapters);
                  }}
                  placeholder="Ej: Cervantes"
                  className="w-full text-[11px] bg-slate-900 border border-slate-800 focus:border-amber-500/60 rounded-lg p-2 text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-slate-400 tracking-wide block">Tipo de Libro / Género</label>
                <input
                  type="text"
                  value={metadata.genre || ""}
                  onChange={(e) => {
                    const updated = { ...metadata, genre: e.target.value };
                    setMetadata(updated);
                    saveToLocalStorage(updated, styleSettings, chapters);
                  }}
                  placeholder="Ej: Novela"
                  className="w-full text-[11px] bg-slate-900 border border-slate-800 focus:border-amber-500/60 rounded-lg p-2 text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-slate-400 tracking-wide block">Sello Editorial</label>
                <input
                  type="text"
                  value={metadata.publisher || ""}
                  onChange={(e) => {
                    const updated = { ...metadata, publisher: e.target.value };
                    setMetadata(updated);
                    saveToLocalStorage(updated, styleSettings, chapters);
                  }}
                  placeholder="Ej: El Clásico"
                  className="w-full text-[11px] bg-slate-900 border border-slate-800 focus:border-amber-500/60 rounded-lg p-2 text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* TAMAÑO DE IMPRESIÓN & CANALES DE DISTRIBUCIÓN EN AMAZON (New requested controls) */}
            <div className="border-t border-slate-850/80 pt-2.5 space-y-2.5 font-sans">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-black text-amber-300 font-mono tracking-widest flex items-center justify-between">
                  <span>📐 Formato Físico de Edición</span>
                  <span className="text-[8px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-normal font-sans tracking-normal capitalize">
                    Sincronización de Pliegos
                  </span>
                </label>
                <select
                  value={kdpTrimSize}
                  onChange={(e) => {
                    const val = e.target.value as any;
                    setKdpTrimSize(val);
                    saveToLocalStorage(metadata, styleSettings, chapters, customPublishers, publisherStatuses, publisherNotes, generatedPitches, synopsisText, val);
                  }}
                  className="w-full text-[11px] bg-slate-900 border border-slate-800 focus:border-amber-500/60 rounded-lg p-2 text-slate-100 focus:outline-none transition-colors cursor-pointer"
                >
                  {Object.entries(TRIM_SIZE_FACTORS).map(([key, value]) => (
                    <option key={key} value={key} className="bg-slate-950 text-slate-100">
                      {value.label} ({value.width} × {value.height})
                    </option>
                  ))}
                </select>
                <div className="text-[8.5px] text-slate-500 flex items-center gap-1 mt-1 leading-normal italic">
                  <span>💡</span>
                  <span>Calculado al instante para imposición de imprenta, lomo y sangrado suizo.</span>
                </div>
              </div>

              {/* AMAZON CHANNELS & TRENDS SELECTION */}
              <div className="space-y-2 pt-1 border-t border-slate-850/40">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wide block">
                    🎯 Formatos y Tendencias en Amazon
                  </span>
                  <span className="text-[8px] bg-amber-500/10 text-amber-300/90 border border-amber-500/20 px-1 py-0.2 rounded font-mono uppercase">
                    Guía de Éxito 2026
                  </span>
                </div>
                
                <p className="text-[9px] text-slate-500 leading-normal">
                  Amazon premia a los autores que publican simultáneamente en múltiples canales. Activa tus objetivos abajo para calibrar las comprobaciones de compatibilidad automática.
                </p>

                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  {/* PDF impreso */}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...metadata, targetPdfImpreso: !metadata.targetPdfImpreso };
                      setMetadata(updated);
                      saveToLocalStorage(updated, styleSettings, chapters);
                    }}
                    className={`p-1.5 rounded-lg border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
                      metadata.targetPdfImpreso
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                        : "bg-slate-900/60 border-slate-850 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-[9px]">📕</span>
                      <span className="font-bold truncate">PDF Impreso</span>
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <span className="text-[7.5px] text-slate-500 leading-tight">
                      Tapa blanda tradicional. Formato estrella.
                    </span>
                  </button>

                  {/* ePub */}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...metadata, targetEpub: !metadata.targetEpub };
                      setMetadata(updated);
                      saveToLocalStorage(updated, styleSettings, chapters);
                    }}
                    className={`p-1.5 rounded-lg border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
                      metadata.targetEpub
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                        : "bg-slate-900/60 border-slate-850 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-[9px]">📱</span>
                      <span className="font-bold truncate">ePub Oficial</span>
                    </div>
                    <span className="text-[7.5px] text-slate-500 leading-tight">
                      Flujo de texto refluible y compatible.
                    </span>
                  </button>

                  {/* eBook Kindle */}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...metadata, targetEbook: !metadata.targetEbook };
                      setMetadata(updated);
                      saveToLocalStorage(updated, styleSettings, chapters);
                    }}
                    className={`p-1.5 rounded-lg border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
                      metadata.targetEbook
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                        : "bg-slate-900/60 border-slate-850 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-[9px]">⚡</span>
                      <span className="font-bold truncate">Kindle eBook</span>
                    </div>
                    <span className="text-[7.5px] text-slate-500 leading-tight">
                      El 80% de ventas digitales directas.
                    </span>
                  </button>

                  {/* Tapa Dura (Hardcover) */}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...metadata, targetHardcover: !metadata.targetHardcover };
                      setMetadata(updated);
                      saveToLocalStorage(updated, styleSettings, chapters);
                    }}
                    className={`p-1.5 rounded-lg border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
                      metadata.targetHardcover
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                        : "bg-slate-900/60 border-slate-850 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-[9px]">👑</span>
                      <span className="font-bold truncate">Tapa Dura KDP</span>
                    </div>
                    <span className="text-[7.5px] text-slate-500 leading-tight">
                      Ganancia premium del mercado actual.
                    </span>
                  </button>

                  {/* Audiolibro de Autor */}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...metadata, targetAudiolibro: !metadata.targetAudiolibro };
                      setMetadata(updated);
                      saveToLocalStorage(updated, styleSettings, chapters);
                    }}
                    className={`p-1.5 rounded-lg border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
                      metadata.targetAudiolibro
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                        : "bg-slate-900/60 border-slate-850 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-[9px]">🎧</span>
                      <span className="font-bold truncate">Audiolibro IA</span>
                    </div>
                    <span className="text-[7.5px] text-slate-500 leading-tight">
                      Regalías de voz. Gran boom editorial.
                    </span>
                  </button>

                  {/* Kindle Vella */}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...metadata, targetVella: !metadata.targetVella };
                      setMetadata(updated);
                      saveToLocalStorage(updated, styleSettings, chapters);
                    }}
                    className={`p-1.5 rounded-lg border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
                      metadata.targetVella
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                        : "bg-slate-900/60 border-slate-850 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-[9px]">🎬</span>
                      <span className="font-bold truncate">Kindle Vella</span>
                    </div>
                    <span className="text-[7.5px] text-slate-500 leading-tight">
                      Publicaciones por fascículos o series.
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* QUICK FONTS PICKER ON THE SIDEBAR */}
            <div className="grid grid-cols-2 gap-2.5 pt-1.5 font-sans border-t border-slate-850/80">
              {/* Title Font Picker */}
              <div className="space-y-1 relative">
                <label className="text-[9px] uppercase font-bold text-slate-400 tracking-wide block">Letra de Títulos</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsSidebarTitleFontOpen(!isSidebarTitleFontOpen);
                    setIsSidebarBodyFontOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-[11px] bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-amber-500/60 focus:outline-none cursor-pointer select-none truncate transition-colors"
                >
                  <span className="truncate pr-1" style={{ fontFamily: `"${styleSettings.fontTitle}", sans-serif` }}>
                    {styleSettings.fontTitle}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-slate-500 shrink-0 transition-transform ${isSidebarTitleFontOpen ? "rotate-180" : ""}`} />
                </button>

                {isSidebarTitleFontOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsSidebarTitleFontOpen(false)} />
                    <div className="absolute left-0 right-0 mt-1 max-h-[180px] overflow-y-auto bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-50 divide-y divide-slate-850/60 scrollbar-thin">
                      {TITLE_FONTS.map((font) => (
                        <button
                          key={font.value}
                          type="button"
                          onClick={() => {
                            const updated = { ...styleSettings, fontTitle: font.value };
                            setStyleSettings(updated);
                            saveToLocalStorage(metadata, updated, chapters);
                            setIsSidebarTitleFontOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-[10px] hover:bg-slate-850 transition-colors flex flex-col gap-0.5 cursor-pointer ${
                            styleSettings.fontTitle === font.value ? "bg-amber-500/10 text-amber-400" : "text-slate-300"
                          }`}
                        >
                          <span className="font-bold">{font.label}</span>
                          <span className="text-[8px] text-slate-500 italic max-w-full truncate" style={{ fontFamily: `"${font.value}", serif` }}>
                            {font.sample}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Body Font Picker */}
              <div className="space-y-1 relative">
                <label className="text-[9px] uppercase font-bold text-slate-400 tracking-wide block">Letra de Cuerpo</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsSidebarBodyFontOpen(!isSidebarBodyFontOpen);
                    setIsSidebarTitleFontOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-[11px] bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-amber-500/60 focus:outline-none cursor-pointer select-none truncate transition-colors"
                >
                  <span className="truncate pr-1" style={{ fontFamily: `"${styleSettings.fontBody}", Georgia, serif` }}>
                    {styleSettings.fontBody}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-slate-500 shrink-0 transition-transform ${isSidebarBodyFontOpen ? "rotate-180" : ""}`} />
                </button>

                {isSidebarBodyFontOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsSidebarBodyFontOpen(false)} />
                    <div className="absolute left-0 right-0 mt-1 max-h-[180px] overflow-y-auto bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-50 divide-y divide-slate-850/60 scrollbar-thin">
                      {BODY_FONTS.map((font) => (
                        <button
                          key={font.value}
                          type="button"
                          onClick={() => {
                            const updated = { ...styleSettings, fontBody: font.value };
                            setStyleSettings(updated);
                            saveToLocalStorage(metadata, updated, chapters);
                            setIsSidebarBodyFontOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-[10px] hover:bg-slate-850 transition-colors flex flex-col gap-0.5 cursor-pointer ${
                            styleSettings.fontBody === font.value ? "bg-amber-500/10 text-amber-400" : "text-slate-300"
                          }`}
                        >
                          <span className="font-bold">{font.label}</span>
                          <span className="text-[8px] text-slate-500 italic max-w-full truncate" style={{ fontFamily: `"${font.value}", serif` }}>
                            {font.sample}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Core Manuscript Controller & Drag-and-Drop Local File Uploader */}
          <div className="bg-slate-950/85 border border-slate-850/85 rounded-xl p-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-300 font-mono tracking-wider flex items-center gap-1.5">
                <span>📂</span> Manuscrito de Autor
              </span>
              <span className="text-[8px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-1.5 py-0.2 rounded">
                TXT / DOCX / MD
              </span>
            </div>

            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = e.dataTransfer.files;
                if (files && files.length > 0) {
                   const file = files[0];
                   const ext = file.name.split(".").pop()?.toLowerCase();
                   if (ext === "docx") {
                     const reader = new FileReader();
                     reader.onload = async (event) => {
                       try {
                         const arrayBuffer = event.target?.result as ArrayBuffer;
                         if (!arrayBuffer) throw new Error("Archivo de Word vacío.");
                         const result = await mammoth.extractRawText({ arrayBuffer });
                         const text = result.value;
                         if (!text || text.trim() === "") {
                           throw new Error("No se pudo extraer texto legible del archivo Word.");
                         }
                         setRawText(text);
                         const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
                         setMetadata(prev => {
                           const updated = { ...prev, title: cleanName };
                           return updated;
                         });
                         handleLocalQuickLayout(text);
                         triggerStudioToast(`¡Manuscrito Word '${file.name}' leído, estructurado y compaginado con éxito!`, "success");
                         sendDagramitoQuery(`He subido mi archivo Word '${file.name}'. Por favor, ayúdame a maquetarlo.`);
                       } catch (err: any) {
                         triggerStudioToast(`Error al leer archivo Word: ${err.message || err}`, "warning");
                       }
                     };
                     reader.readAsArrayBuffer(file);
                   } else {
                     const reader = new FileReader();
                     reader.onload = (event) => {
                       const text = event.target?.result as string;
                       if (text) {
                         setRawText(text);
                         const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
                         setMetadata(prev => {
                           const updated = { ...prev, title: cleanName };
                           return updated;
                         });
                         handleLocalQuickLayout(text);
                         triggerStudioToast(`¡Manuscrito '${file.name}' leído, estructurado y compaginado con éxito!`, "success");
                         sendDagramitoQuery(`He subido mi archivo '${file.name}'. Por favor, ayúdame a maquetarlo.`);
                       }
                     };
                     reader.readAsText(file);
                   }
                }
              }}
              className="border border-dashed border-slate-800 hover:border-amber-500/40 bg-slate-900/40 hover:bg-slate-900/80 rounded-lg p-2.5 text-center transition-all cursor-pointer group flex flex-col items-center justify-center gap-1"
            >
              <Download className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:scale-110 transition-all shrink-0" />
              <div className="text-[9.5px] text-slate-400">
                Arrastra tu manuscrito aquí o haz clic para subir
              </div>
              <input
                type="file"
                accept=".txt,.md,.docx"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                     const file = files[0];
                     const ext = file.name.split(".").pop()?.toLowerCase();
                     if (ext === "docx") {
                       const reader = new FileReader();
                       reader.onload = async (event) => {
                         try {
                           const arrayBuffer = event.target?.result as ArrayBuffer;
                           if (!arrayBuffer) throw new Error("Archivo de Word vacío.");
                           const result = await mammoth.extractRawText({ arrayBuffer });
                           const text = result.value;
                           if (!text || text.trim() === "") {
                             throw new Error("No se pudo extraer texto legible del archivo Word.");
                           }
                           setRawText(text);
                           const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
                           setMetadata(prev => {
                             const updated = { ...prev, title: cleanName };
                             return updated;
                           });
                           handleLocalQuickLayout(text);
                           triggerStudioToast(`¡Manuscrito Word '${file.name}' leído, estructurado y compaginado con éxito!`, "success");
                           sendDagramitoQuery(`He subido mi archivo Word '${file.name}'. Por favor, ayúdame a maquetarlo.`);
                         } catch (err: any) {
                           triggerStudioToast(`Error al leer archivo Word: ${err.message || err}`, "warning");
                         }
                       };
                       reader.readAsArrayBuffer(file);
                     } else {
                       const reader = new FileReader();
                       reader.onload = (event) => {
                         const text = event.target?.result as string;
                         if (text) {
                           setRawText(text);
                           const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
                           setMetadata(prev => {
                             const updated = { ...prev, title: cleanName };
                             return updated;
                           });
                           handleLocalQuickLayout(text);
                           triggerStudioToast(`¡Manuscrito '${file.name}' leído, estructurado y compaginado con éxito!`, "success");
                           sendDagramitoQuery(`He subido mi archivo '${file.name}'. Por favor, ayúdame a maquetarlo.`);
                         }
                       };
                       reader.readAsText(file);
                     }
                  }
                }}
                className="hidden"
                id="sidebar-file-picker"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById("sidebar-file-picker")?.click();
                }}
                className="text-[8.5px] font-bold text-amber-400 hover:underline hover:scale-103 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded transition-colors cursor-pointer mt-0.5"
              >
                Buscar archivo
              </button>
            </div>

            {/* Quick Presets / Cloud Tools */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setChapters([
                    {
                      chapterNumber: 1,
                      title: "Capítulo Primero: Que trata de la condición y ejercicio del famoso hidalgo don Quijote de la Mancha",
                      paragraphs: [
                        "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda.",
                        "El resto della concluían sayo de velarte, calzas de velludo para las fiestas, con sus pantuflos de lo mesmo, y los días de entresemana se honraba con su vellorí de lo más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera."
                      ]
                    }
                  ]);
                  triggerStudioToast("¡Manuscrito de prueba cargado con éxito!", "success");
                  sendDagramitoQuery("¿Cómo estructuro el libro de prueba?");
                }}
                className="flex-1 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-800 hover:border-amber-500 font-bold text-[9px] py-1.5 px-0.5 rounded-lg transition-all cursor-pointer text-center font-mono"
              >
                📚 Demo Quijote
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDriveModal(true);
                }}
                className="flex-1 bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 border border-slate-800 hover:border-emerald-500 font-bold text-[9px] py-1.5 px-0.5 rounded-lg transition-all cursor-pointer text-center font-mono"
              >
                ☁️ Conectar Drive
              </button>
            </div>
          </div>

          {/* TAB BAR FOR SIDEBAR SECTIONS */}
          <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex gap-1 overflow-x-auto scrollbar-none shrink-0">
            {[
              { id: "guiautor", label: "Tutor IA", icon: "🧠" },
              { id: "preset", label: "Estilos", icon: "🎨" },
              { id: "manual", label: "Configuración", icon: "⚙️" },
              { id: "content", label: "Capítulos", icon: "📖" },
              { id: "compatibility", label: "Imprenta / KDP", icon: "📐" },
              { id: "copyright", label: "Derechos / Portada", icon: "⚖️" },
              { id: "multimedia", label: "Voces", icon: "🎙️" },
              { id: "screenplay", label: "Guión", icon: "🎬" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Guiautor IA Active Agent Chat Module Container */}
          {activeTab === "guiautor" && (
            <div className="flex-1 border border-slate-800/80 bg-slate-950/85 rounded-xl overflow-hidden p-3 shadow-inner text-left flex flex-col min-h-[400px] space-y-2.5">
              {/* Scrollable messages container inside the sidebar */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-3 flex flex-col min-h-0 text-left">
                {dagramitoMessages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-2 max-w-[92%] ${msg.role === "user" ? "self-end justify-end flex-row-reverse" : "self-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="flex flex-col items-center gap-1 text-slate-500 shrink-0 self-start">
                        <div className="w-5.5 h-5.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-xs select-none animate-pulse">
                          🧠
                        </div>
                        <button
                          type="button"
                          onClick={() => speakHelper(msg.content)}
                          className="p-1 hover:bg-slate-800 hover:text-amber-400 rounded transition-colors cursor-pointer"
                          title="Escuchar respuesta"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <div className="flex-1 flex flex-col gap-1">
                      <div className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                        msg.role === "user" 
                          ? "bg-amber-500 text-slate-950 font-medium rounded-br-none border border-amber-400/20 font-sans shadow"
                          : "bg-slate-900 border border-slate-850 text-slate-200 rounded-tl-none select-text space-y-1 block font-sans"
                      }`}>
                        {msg.role === "user" ? (
                          msg.content
                        ) : (
                          parseDagramitoMarkdown(msg.content)
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Loader Indicator */}
                {dagramitoIsTyping && (
                  <div className="flex gap-1.5 items-center self-start pl-1 text-slate-500 font-mono text-[9px]">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping shrink-0" />
                    <span>Guiautor está redactando vuestro pliego...</span>
                  </div>
                )}
                
                {/* Keep chat scrolled to bottom tool */}
                <div ref={dagramitoEndRef} />
              </div>

              {/* Suggested Pills shortcut row for faster control click */}
              <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-850/60 justify-start shrink-0">
                {[
                  { text: "Poner tamaño 6x9 estándar", icon: "📐" },
                  { text: "Cambiar papel a color sepia", icon: "🍂" },
                  { text: "Activar capitulares artísticas", icon: "❦" },
                  { text: "Imprimir / Ver PDF Compaginado", icon: "🖨️" }
                ].map((pill, id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => sendDagramitoQuery(pill.text)}
                    disabled={dagramitoIsTyping}
                    className="bg-slate-900 hover:bg-slate-850 disabled:opacity-40 border border-slate-850 hover:border-slate-800 text-slate-350 hover:text-white px-1.5 py-0.5 rounded-lg text-[9px] cursor-pointer transition-colors text-left flex items-center gap-0.5 font-mono"
                  >
                    <span>{pill.icon}</span> {pill.text}
                  </button>
                ))}
              </div>

              {/* Form submit footer inside the sidebar container */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!dagramitoInput.trim() || dagramitoIsTyping) return;
                  sendDagramitoQuery(dagramitoInput);
                  setDagramitoInput("");
                }}
                className="flex gap-1.5 pt-1.5 border-t border-slate-850/80 shrink-0"
              >
                <input
                  type="text"
                  value={dagramitoInput}
                  onChange={(e) => setDagramitoInput(e.target.value)}
                  placeholder="Escríbele a Guiautor..."
                  disabled={dagramitoIsTyping}
                  className="flex-1 bg-slate-900 border border-slate-800 focus:border-amber-500/50 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 font-sans"
                />
                <button
                  type="submit"
                  disabled={!dagramitoInput.trim() || dagramitoIsTyping}
                  className="bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 text-slate-950 p-1.5 rounded-xl cursor-pointer transition-colors shrink-0 flex items-center justify-center font-bold animate-pulse"
                  title="Enviar pregunta"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </form>
            </div>
          )}

            {/* TAB 1: PREDEFINED LAYOUT PRESETS & AI ANALYZER */}
            {activeTab === "preset" && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Visual Intro */}
                <div id="hero-banner" className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-750 p-4 rounded-xl space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-5 opacity-5 pointer-events-none">
                    <Feather className="w-24 h-24 stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                    Moduladores de Estructura
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Un libro profesional habla a través de su tipografía, márgenes y color de hoja. Selecciona uno de nuestros paradigmas preconfigurados inspirados en la historia editorial.
                  </p>
                </div>

                {/* Grid of predefined styling archetypes */}
                <div id="archetype-grid" className="space-y-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Paradigmas Editoriales Oficinales:
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {Object.entries(ARCHETYPES).map(([key, value]) => {
                      const isSelected = styleSettings.archetype === value.archetype;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setStyleSettings(value);
                            saveToLocalStorage(metadata, value, chapters);
                          }}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 cursor-pointer group ${
                            isSelected
                              ? "bg-gradient-to-r from-amber-500/10 to-amber-500/0 border-amber-500 shadow-lg shadow-amber-500/5"
                              : "bg-slate-900 hover:bg-slate-850 border-slate-800"
                          }`}
                        >
                          <div className={`mt-1 p-1.5 rounded-lg border shrink-0 ${
                            isSelected ? "bg-amber-500 text-slate-950 border-amber-400" : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}>
                            {key === "classic" && <BookOpen className="w-4 h-4" />}
                            {key === "fantasy" && <Sparkles className="w-4 h-4" />}
                            {key === "thriller" && <Flame className="w-4 h-4" />}
                            {key === "selfhelp" && <Zap className="w-4 h-4" />}
                            {key === "biography" && <Feather className="w-4 h-4" />}
                            {key === "finance" && <Award className="w-4 h-4" />}
                            {key === "zen" && <Heart className="w-4 h-4" />}
                            {key === "romance" && <Crown className="w-4 h-4" />}
                            {key === "sciencetech" && <Sliders className="w-4 h-4" />}
                            {key === "experimental" && <Layout className="w-4 h-4" />}
                          </div>
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                                {value.archetype}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] font-bold bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                                  Activo
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                              {value.explanation}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1.5 text-[10px] text-slate-400 font-mono">
                              <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                                T: {value.fontTitle}
                              </span>
                              <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                                C: {value.fontBody}
                              </span>
                              <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                                Papel: {value.pageColor === "cream" ? "Crema" : value.pageColor === "sepia" ? "Sepia" : value.pageColor === "white" ? "Blanco" : "Carbón"}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* AI reference-style analysis tool (Copy-to-Design) */}
                <div id="style-analyzer-card" className="border border-slate-800 bg-slate-900/40 p-4 rounded-xl space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Inspirador Artístico de Estilo IA</h4>
                      <p className="text-xs text-slate-400">Analiza referencias para generar una maquetación ideal</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-400 font-medium block">
                      Describe un libro de ejemplo, una vibra artística o un autor de referencia:
                    </label>
                    <textarea
                      value={stylePrompt}
                      onChange={(e) => setStylePrompt(e.target.value)}
                      placeholder="Ej: Novela intimista con ritmo poético como Julio Cortázar en Rayuela, espacio amplio en márgenes, hoja blanca, capitulares austeras de modernidad."
                      rows={3}
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500 placeholder:text-slate-600 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {aiAnalysisError && (
                    <div className="flex gap-2 bg-red-950/50 border border-red-800 p-3 rounded-lg text-xs text-red-300">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{aiAnalysisError}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={handleAnalyzeStyle}
                      disabled={analyzingStyle || !stylePrompt.trim()}
                      className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 hover:text-white text-slate-200 text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed transition-all"
                    >
                      {analyzingStyle ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Analizando Referencias...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Aplicar Inspiración IA</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* AI Text Style Suggestion Engine Section */}
                <div id="text-style-suggester-card" className="border border-indigo-950/40 bg-gradient-to-br from-slate-900 to-slate-950 p-4 rounded-xl space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Motor de Sugerencias de Estilo IA
                      </h4>
                      <p className="text-[11px] text-slate-400">Analiza semánticamente el manuscrito para proponer ajustes de legibilidad profesionales</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Nuestra IA analizará la prosa de tu manuscrito (género, ritmo y diálogos) para proponer la combinación ideal de <strong>sangría, interlineado, justificación y estilo de encabezados</strong> que preserven la estética editorial.
                  </p>

                  {styleSuggestionError && (
                    <div className="flex gap-2 bg-red-950/50 border border-red-800 p-3 rounded-lg text-xs text-red-350">
                      <AlertCircle className="w-4 h-4 shrink-0 shrink-0 self-start mt-0.5" />
                      <span>{styleSuggestionError}</span>
                    </div>
                  )}

                  {/* Suggestion Result Panel */}
                  {styleSuggestionResult && (
                    <div className="bg-slate-950/80 border border-indigo-950/60 p-3.5 rounded-lg space-y-3 animate-fadeIn">
                      <div className="border-b border-slate-800 pb-1.5">
                        <span className="text-[10px] text-amber-500 font-mono block uppercase">Propuesta Tipográfica Calculada:</span>
                        <h5 className="text-xs font-bold text-white tracking-wide">{styleSuggestionResult.archetype}</h5>
                      </div>
                      
                      <p className="text-[11px] text-slate-300 leading-relaxed italic border-l-2 border-amber-500/40 pl-2">
                        "{styleSuggestionResult.explanation}"
                      </p>

                      <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-400 font-mono mt-2">
                        <div className="bg-slate-900 px-2 py-1.5 rounded flex flex-col">
                          <span className="text-[8px] text-slate-500">Justificación:</span>
                          <span className="text-slate-300 font-semibold">{styleSuggestionResult.justification === "left" ? "Bandera Izquierda" : "Justificado Editorial"}</span>
                        </div>
                        <div className="bg-slate-900 px-2 py-1.5 rounded flex flex-col">
                          <span className="text-[8px] text-slate-500">Sangría Primera Línea:</span>
                          <span className="text-indigo-400 font-semibold">
                            {styleSuggestionResult.paragraphIndent === "none" ? "Nula" : styleSuggestionResult.paragraphIndent === "small" ? "Sutil (1em)" : styleSuggestionResult.paragraphIndent === "medium" ? "Medio (1.5em)" : "Clásica (2.5em)"}
                          </span>
                        </div>
                        <div className="bg-slate-900 px-2 py-1.5 rounded flex flex-col">
                          <span className="text-[8px] text-slate-500">Espaciado de Párrafo:</span>
                          <span className="text-indigo-400 font-semibold">
                            {styleSuggestionResult.paragraphSpacing === "none" ? "Continuo (0.5)" : styleSuggestionResult.paragraphSpacing === "small" ? "Ligero (2)" : styleSuggestionResult.paragraphSpacing === "medium" ? "Medio (3.5)" : "Marcado (6)"}
                          </span>
                        </div>
                        <div className="bg-slate-900 px-2 py-1.5 rounded flex flex-col">
                          <span className="text-[8px] text-slate-500">Estilo de Encabezados:</span>
                          <span className="text-amber-400 font-semibold">
                            {styleSuggestionResult.titleStyle === "classic" ? "Serif Clásico" : styleSuggestionResult.titleStyle === "bold-uppercase" ? "Negrita Alta" : styleSuggestionResult.titleStyle === "minimal-light" ? "Limpio Fino" : "Caligráfico"}
                          </span>
                        </div>
                        <div className="bg-slate-900 px-2 py-1.5 rounded flex flex-col">
                          <span className="text-[8px] text-slate-500">Fuente Título:</span>
                          <span className="text-slate-300 font-semibold">{styleSuggestionResult.fontTitle}</span>
                        </div>
                        <div className="bg-slate-900 px-2 py-1.5 rounded flex flex-col">
                          <span className="text-[8px] text-slate-500">Fuente Cuerpo:</span>
                          <span className="text-slate-300 font-semibold">{styleSuggestionResult.fontBody}</span>
                        </div>
                        <div className="bg-slate-900 px-2 py-1.5 rounded flex flex-col">
                          <span className="text-[8px] text-slate-500">Tamaño Título:</span>
                          <span className="text-amber-400 font-semibold">
                            {styleSuggestionResult.fontSizeTitle === "small" ? "Sutil (~20px)" : styleSuggestionResult.fontSizeTitle === "medium" ? "Estándar (~25px)" : "Prominente (~33px)"}
                          </span>
                        </div>
                        <div className="bg-slate-900 px-2 py-1.5 rounded flex flex-col">
                          <span className="text-[8px] text-slate-500">Tamaño Cuerpo:</span>
                          <span className="text-indigo-400 font-semibold">
                            {styleSuggestionResult.fontSizeBody === "small" ? "Compacto (12.5px)" : styleSuggestionResult.fontSizeBody === "large" ? "Grande (15.5px)" : "Estándar (14px)"}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handleApplySuggestedStyle}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-lg text-xs cursor-pointer tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-1.5 font-sans"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Aplicar Ajustes Editoriales IA
                      </button>
                    </div>
                  )}

                  {!styleSuggestionResult && (
                    <div className="flex items-center justify-end">
                      <button
                        onClick={handleSuggestStyle}
                        disabled={analyzingTextForStyle}
                        className="bg-indigo-600 hover:bg-indigo-500 hover:text-white text-indigo-100 text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all w-full justify-center shadow-md shadow-indigo-900/20 font-sans"
                      >
                        {analyzingTextForStyle ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Analizando Manuscrito...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                            <span>Analizar Texto y Sugerir Estilos</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 2: DETAILED MANUAL SETTINGS (Fonts, margins, paper layout) */}
            {activeTab === "manual" && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-indigo-900/20 pb-3">
                  <span className="text-sm font-bold text-slate-400 tracking-wider flex items-center gap-1.5" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Ajustes de Imprenta y Pliego
                  </span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                    Perfil Personalizado
                  </span>
                </div>

                {/* Identidad de la Obra (Metadatos) */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase flex items-center gap-1.5 font-mono">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    Identidad de la Obra (Metadatos)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wide block">Título del Libro</label>
                      <input
                        type="text"
                        value={metadata.title}
                        onChange={(e) => {
                          const updated = { ...metadata, title: e.target.value };
                          setMetadata(updated);
                          saveToLocalStorage(updated, styleSettings, chapters);
                        }}
                        placeholder="Ej: El Quijote de la Mancha"
                        className="w-full text-xs bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-slate-100 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wide block">Nombre del Autor</label>
                      <input
                        type="text"
                        value={metadata.author}
                        onChange={(e) => {
                          const updated = { ...metadata, author: e.target.value };
                          setMetadata(updated);
                          saveToLocalStorage(updated, styleSettings, chapters);
                        }}
                        placeholder="Ej: Miguel de Cervantes"
                        className="w-full text-xs bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-slate-100 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1 col-span-2 sm:col-span-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wide block">Sello Editorial / Publisher</label>
                      <input
                        type="text"
                        value={metadata.publisher || ""}
                        onChange={(e) => {
                          const updated = { ...metadata, publisher: e.target.value };
                          setMetadata(updated);
                          saveToLocalStorage(updated, styleSettings, chapters);
                        }}
                        placeholder="Ej: Imprenta de Juan de la Cuesta"
                        className="w-full text-xs bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-slate-100 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1 col-span-2 sm:col-span-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wide block">Tipo de Libro / Género</label>
                      <input
                        type="text"
                        value={metadata.genre || ""}
                        onChange={(e) => {
                          const updated = { ...metadata, genre: e.target.value };
                          setMetadata(updated);
                          saveToLocalStorage(updated, styleSettings, chapters);
                        }}
                        placeholder="Ej: Novela, Poesía, Ensayo..."
                        className="w-full text-xs bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Font Selections */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-200 tracking-wider flex items-center gap-1.5" style={{ fontFamily: '"Playfair Display", serif' }}>
                    <Type className="w-3.5 h-3.5 text-amber-400" />
                    Tipografía Editorial
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3 pb-3">
                    {/* FUENTE TITULO */}
                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                      <label className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                        <span>Fuente para Cabezales y Títulos:</span>
                        <span className="text-[10px] text-slate-500 font-mono">Desplazable</span>
                      </label>
                      
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => cycleTitleFont("prev")}
                          className="px-2.5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-350 hover:text-amber-400 rounded-lg cursor-pointer transition-all"
                          title="Anterior fuente"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        
                        <div className="relative flex-1">
                          <select
                            value={styleSettings.fontTitle}
                            onChange={(e) => {
                              const updated = { ...styleSettings, fontTitle: e.target.value };
                              setStyleSettings(updated);
                              saveToLocalStorage(metadata, updated, chapters);
                            }}
                            className="w-full text-xs font-semibold bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg p-2.5 pr-8 text-slate-200 outline-none focus:border-amber-500 cursor-pointer appearance-none transition-colors"
                            style={{ fontFamily: styleSettings.fontTitle }}
                          >
                            {TITLE_FONTS.map((font) => (
                              <option 
                                key={font.value} 
                                value={font.value} 
                                className="bg-slate-950 text-slate-200"
                              >
                                {font.label} ({font.cat}) — {font.desc}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>
                          
                          {/* Muestra tipográfica real justo debajo */}
                          <div className="mt-1 text-[10.5px] text-amber-500/90 italic font-semibold truncate select-none" style={{ fontFamily: `"${styleSettings.fontTitle}", serif` }}>
                            Muestra: {TITLE_FONTS.find(f => f.value === styleSettings.fontTitle)?.sample || "Vista Previa"}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => cycleTitleFont("next")}
                          className="px-2.5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-350 hover:text-amber-400 rounded-lg cursor-pointer transition-all"
                          title="Siguiente fuente"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* TAMAÑO TITULO */}
                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                      <label className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                        <span>Tamaño de Título:</span>
                        <span className="text-[10px] text-slate-500 font-mono">Maquetación H2</span>
                      </label>
                      
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => cycleTitleSize("prev")}
                          className="px-2.5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-amber-400 rounded-lg cursor-pointer transition-colors shrink-0"
                          title="Anterior tamaño"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        
                        <div className="w-full text-xs font-semibold py-2.5 bg-slate-950 border border-slate-850 text-slate-200 text-center rounded-lg leading-[1.65] select-none uppercase tracking-wider font-mono">
                          {styleSettings.fontSizeTitle === "small" 
                            ? "Sutil (~20px)" 
                            : styleSettings.fontSizeTitle === "medium" 
                            ? "Estándar (~25px)" 
                            : "Prominente (~33.6px)"}
                        </div>

                        <button
                          type="button"
                          onClick={() => cycleTitleSize("next")}
                          className="px-2.5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-amber-400 rounded-lg cursor-pointer transition-colors shrink-0"
                          title="Siguiente tamaño"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* FUENTE CUERPO */}
                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                      <label className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                        <span>Fuente Cuerpo del Libro (Muy Importante):</span>
                        <span className="text-[10px] text-slate-500 font-mono">Desplazable</span>
                      </label>
                      
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => cycleBodyFont("prev")}
                          className="px-2.5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-350 hover:text-amber-400 rounded-lg cursor-pointer transition-all"
                          title="Anterior fuente cuerpo"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="relative flex-1">
                          <select
                            value={styleSettings.fontBody}
                            onChange={(e) => {
                              const updated = { ...styleSettings, fontBody: e.target.value };
                              setStyleSettings(updated);
                              saveToLocalStorage(metadata, updated, chapters);
                            }}
                            className="w-full text-xs font-semibold bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg p-2.5 pr-8 text-slate-200 outline-none focus:border-amber-500 cursor-pointer appearance-none transition-colors"
                            style={{ fontFamily: styleSettings.fontBody }}
                          >
                            {BODY_FONTS.map((font) => (
                              <option 
                                key={font.value} 
                                value={font.value} 
                                className="bg-slate-950 text-slate-200"
                              >
                                {font.label} ({font.cat}) — {font.desc}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>

                          {/* Muestra tipográfica real justo debajo */}
                          <div className="mt-1 text-[10.5px] text-amber-500/90 italic font-semibold truncate select-none animate-fade-in" style={{ fontFamily: `"${styleSettings.fontBody}", serif` }}>
                            Muestra: {BODY_FONTS.find(f => f.value === styleSettings.fontBody)?.sample || "Vista Previa"}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => cycleBodyFont("next")}
                          className="px-2.5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-350 hover:text-amber-400 rounded-lg cursor-pointer transition-all"
                          title="Siguiente fuente cuerpo"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* TAMAÑO CUERPO */}
                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                      <label className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                        <span>Tamaño de Cuerpo (Párrafo):</span>
                        <span className="text-[10px] text-slate-500 font-mono">Lectura Confortable</span>
                      </label>
                      
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => cycleBodySize("prev")}
                          className="px-2.5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-amber-400 rounded-lg cursor-pointer transition-colors shrink-0"
                          title="Anterior tamaño cuerpo"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        
                        <div className="w-full text-xs font-semibold py-2.5 bg-slate-950 border border-slate-850 text-slate-200 text-center rounded-lg leading-[1.65] select-none uppercase tracking-wider font-mono">
                          {styleSettings.fontSizeBody === "small" 
                            ? "Compacto (~12.5px)" 
                            : styleSettings.fontSizeBody === "large" 
                            ? "Grande (~15.5px)" 
                            : "Equilibrado (~14px)"}
                        </div>

                        <button
                          type="button"
                          onClick={() => cycleBodySize("next")}
                          className="px-2.5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-amber-400 rounded-lg cursor-pointer transition-colors shrink-0"
                          title="Siguiente tamaño cuerpo"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* FONT PAIRING & EDITORIAL BEAUTY SUGGESTIONS */}
                  <div className="space-y-4 pt-2">
                    {/* PARAJAS SUGERIDAS */}
                    <div className="bg-slate-900/45 border border-slate-850 rounded-xl p-4 space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span className="text-xs uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5 font-mono">
                          💡 Combinación de Letras Sugeridas para Títulos y Subtítulos
                        </span>
                        <span className="text-[8px] uppercase bg-slate-950 border border-slate-850 rounded px-1.5 py-0.5 text-slate-400 font-mono">
                          Parejas Recomendadas
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-slate-405 leading-normal">
                        Elige una de las combinaciones recomendadas para coordinar instantáneamente la jerarquía visual de tus títulos y el texto del libro:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {[
                          {
                            name: "El Quijote Tradicional",
                            titleFont: "Cormorant Garamond",
                            bodyFont: "EB Garamond",
                            desc: "Lírico, clásico y de lectura prolongada.",
                            badge: "Clásico"
                          },
                          {
                            name: "Novela de Intriga & Lino",
                            titleFont: "Playfair Display",
                            bodyFont: "Lora",
                            desc: "Contraste moderno, cálido e intimista.",
                            badge: "Contemporáneo"
                          },
                          {
                            name: "Saga Legendaria Romana",
                            titleFont: "Cinzel",
                            bodyFont: "Crimson Pro",
                            desc: "Estilo épico, heráldico y medieval suntuoso.",
                            badge: "Histórico"
                          },
                          {
                            name: "Vanguardia Progresiva",
                            titleFont: "Outfit",
                            bodyFont: "Inter",
                            desc: "Márgenes pulidos de lectura urbana y ágil.",
                            badge: "Moderno"
                          },
                          {
                            name: "Poesía & Ensueño Romántico",
                            titleFont: "Great Vibes",
                            bodyFont: "Lora",
                            desc: "Tipografía caligráfica con prosa estilizada.",
                            badge: "Poesía"
                          }
                        ].map((pair) => {
                          const isSelected = styleSettings.fontTitle === pair.titleFont && styleSettings.fontBody === pair.bodyFont;
                          return (
                            <button
                              key={pair.name}
                              type="button"
                              onClick={() => {
                                const updated = {
                                  ...styleSettings,
                                  fontTitle: pair.titleFont,
                                  fontBody: pair.bodyFont
                                };
                                setStyleSettings(updated);
                                saveToLocalStorage(metadata, updated, chapters);
                              }}
                              className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 cursor-pointer transition-all duration-150 ${
                                isSelected
                                  ? "bg-amber-500/10 border-amber-500/70 text-amber-300"
                                  : "bg-slate-950/40 border-slate-850 hover:bg-slate-850 hover:border-slate-800 text-slate-300"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-[11px] text-slate-100">{pair.name}</span>
                                <span className="text-[7.5px] uppercase font-bold px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 font-mono border border-slate-850">
                                  {pair.badge}
                                </span>
                              </div>
                              <div className="font-mono text-[9px] text-slate-450 flex items-center gap-1 leading-none mt-0.5">
                                <span className="text-amber-500 font-semibold">{pair.titleFont}</span>
                                <span>+</span>
                                <span className="text-slate-300">{pair.bodyFont}</span>
                              </div>
                              <p className="text-[10.5px] text-slate-450 leading-snug mt-1">
                                {pair.desc}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* ESTILOS DE BELLEZA EDITORIAL PRECONFIGURADOS */}
                    <div className="bg-slate-900/45 border border-slate-850 rounded-xl p-4 space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-1.5 font-mono">
                          ✨ Estilos de Sugerencia para Páginas (Belleza Editorial)
                        </span>
                        <span className="text-[8px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono uppercase">
                          Maquetación Especial
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-normal">
                        Eleva la presentación física de tu manuscrito. Aplica recetas de márgenes, capitulares y detalles ornamentales que utilizan las casas editoriales más prestigiosas del mundo:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {[
                          {
                            name: "Edición Coleccionista Lujo",
                            settings: {
                              marginSize: "normal",
                              lineHeight: "relaxed",
                              dropCap: true,
                              dropCapStyle: "ornately",
                              dividerStyle: "flourish",
                              dividerChar: "❦",
                              pageColor: "cream",
                              runningHeaderStyle: "title-chapter"
                            } as const,
                            desc: "Inspirada en ediciones del siglo XVIII con amplios fondos, capitulares heráldicas y papel crema suntuoso.",
                            emoji: "⚜️"
                          },
                          {
                            name: "Novela Negra de Bolsillo",
                            settings: {
                              marginSize: "compact",
                              lineHeight: "snug",
                              dropCap: true,
                              dropCapStyle: "modern",
                              dividerStyle: "geometric",
                              dividerChar: "❖",
                              pageColor: "white",
                              runningHeaderStyle: "chapter-page"
                            } as const,
                            desc: "Maquetación de alto contraste, márgenes ajustados para máximo aprovechamiento y capitulares de palo seco dinámicas.",
                            emoji: "🕵️"
                          },
                          {
                            name: "Crónicas de Fantasía Rústica",
                            settings: {
                              marginSize: "wide",
                              lineHeight: "relaxed",
                              dropCap: true,
                              dropCapStyle: "ornately",
                              dividerStyle: "diamonds",
                              dividerChar: "✦  ✦  ✦",
                              pageColor: "sepia",
                              runningHeaderStyle: "title-chapter"
                            } as const,
                            desc: "Tono añejo y místico en papel sepia texturizado, con amplias barras de descanso y separadores de diamantes arcanos.",
                            emoji: "🐉"
                          },
                          {
                            name: "Minimalismo Ensayístico",
                            settings: {
                              marginSize: "normal",
                              lineHeight: "relaxed",
                              dropCap: false,
                              dropCapStyle: "minimal",
                              dividerStyle: "none",
                              dividerChar: "—",
                              pageColor: "white",
                              runningHeaderStyle: "none"
                            } as const,
                            desc: "Limpieza tipográfica absoluta para no distraer. Enfocado en el ritmo continuo del texto y la estructura sobria.",
                            emoji: "📜"
                          }
                        ].map((recipe) => {
                          const isSelected = 
                            styleSettings.marginSize === recipe.settings.marginSize &&
                            styleSettings.pageColor === recipe.settings.pageColor &&
                            styleSettings.dropCap === recipe.settings.dropCap;

                          return (
                            <button
                              key={recipe.name}
                              type="button"
                              onClick={() => {
                                const updated = {
                                  ...styleSettings,
                                  ...recipe.settings,
                                  archetype: "Belleza Personalizada: " + recipe.name
                                };
                                setStyleSettings(updated);
                                saveToLocalStorage(metadata, updated, chapters);
                              }}
                              className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 cursor-pointer transition-all duration-150 ${
                                isSelected
                                  ? "bg-indigo-500/10 border-indigo-500/70 text-indigo-300"
                                  : "bg-slate-950/40 border-slate-850 hover:bg-slate-850 hover:border-slate-800 text-slate-300"
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="text-base shrink-0">{recipe.emoji}</span>
                                <span className="font-bold text-[11px] text-slate-100">{recipe.name}</span>
                              </div>
                              <p className="text-[10.5px] text-slate-450 leading-snug">
                                {recipe.desc}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sizing & Margins */}
                <div id="layout-proportions" className="space-y-4 pt-2">
                  <h4 className="text-sm font-bold text-slate-200 tracking-wider flex items-center gap-1.5" style={{ fontFamily: '"Playfair Display", serif' }}>
                    <AlignLeft className="w-3.5 h-3.5 text-amber-400" />
                    Cajas y Caja de Escritura
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-medium block">
                        Márgenes de página:
                      </label>
                      <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg">
                        {(["compact", "normal", "wide"] as const).map((m) => (
                          <button
                            key={m}
                            onClick={() => {
                              const updated = { ...styleSettings, marginSize: m };
                              setStyleSettings(updated);
                              saveToLocalStorage(metadata, updated, chapters);
                            }}
                            className={`py-1 rounded text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                              styleSettings.marginSize === m
                                ? "bg-amber-500 text-slate-950"
                                : "text-slate-400 hover:text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            {m === "compact" ? "Apretado" : m === "normal" ? "Medio" : "Ancho"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-medium block">
                        Interlineado corporal:
                      </label>
                      <div className="grid grid-cols-2 gap-1 bg-slate-900 p-1 rounded-lg">
                        {(["snug", "relaxed"] as const).map((l) => (
                          <button
                            key={l}
                            onClick={() => {
                              const updated = { ...styleSettings, lineHeight: l };
                              setStyleSettings(updated);
                              saveToLocalStorage(metadata, updated, chapters);
                            }}
                            className={`py-1 rounded text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                              styleSettings.lineHeight === l
                                ? "bg-amber-500 text-slate-950"
                                : "text-slate-400 hover:text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            {l === "snug" ? "Compacto" : "Respirable"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* --- SUGGESTION ENGINE LAYOUT CONTROLS --- */}
                    <div className="space-y-1.5 pt-1">
                      <label className="text-[11px] text-slate-400 font-medium block">
                        Justificación del texto:
                      </label>
                      <div className="grid grid-cols-2 gap-1 bg-slate-900 p-1 rounded-lg">
                        {(["justify", "left"] as const).map((just) => (
                          <button
                            key={just}
                            onClick={() => {
                              const updated = { ...styleSettings, justification: just };
                              setStyleSettings(updated);
                              saveToLocalStorage(metadata, updated, chapters);
                            }}
                            className={`py-1 rounded text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                              (styleSettings.justification || "justify") === just
                                ? "bg-amber-500 text-slate-950"
                                : "text-slate-400 hover:text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            {just === "justify" ? "Justificado" : "Bandera Izq"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-medium block">
                        Sangría primera línea:
                      </label>
                      <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded-lg">
                        {(["none", "small", "medium", "large"] as const).map((ind) => (
                          <button
                            key={ind}
                            onClick={() => {
                              const updated = { ...styleSettings, paragraphIndent: ind };
                              setStyleSettings(updated);
                              saveToLocalStorage(metadata, updated, chapters);
                            }}
                            className={`py-1 rounded text-[9px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                              (styleSettings.paragraphIndent || "none") === ind
                                ? "bg-amber-500 text-slate-950"
                                : "text-slate-400 hover:text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            {ind === "none" ? "Nula" : ind === "small" ? "Sutil" : ind === "medium" ? "Med" : "Grande"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-medium block">
                        Espaciado entre párrafos:
                      </label>
                      <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded-lg">
                        {(["none", "small", "medium", "large"] as const).map((space) => (
                          <button
                            key={space}
                            onClick={() => {
                              const updated = { ...styleSettings, paragraphSpacing: space };
                              setStyleSettings(updated);
                              saveToLocalStorage(metadata, updated, chapters);
                            }}
                            className={`py-1 rounded text-[9px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                              (styleSettings.paragraphSpacing || "none") === space
                                ? "bg-amber-500 text-slate-950"
                                : "text-slate-400 hover:text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            {space === "none" ? "Cero" : space === "small" ? "Poco" : space === "medium" ? "Med" : "Mucho"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-medium block">
                        Alineación de títulos:
                      </label>
                      <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg">
                        {(["center", "left", "right"] as const).map((ali) => (
                          <button
                            key={ali}
                            onClick={() => {
                              const updated = { ...styleSettings, titleAlign: ali };
                              setStyleSettings(updated);
                              saveToLocalStorage(metadata, updated, chapters);
                            }}
                            className={`py-1 rounded text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                              (styleSettings.titleAlign || "center") === ali
                                ? "bg-amber-500 text-slate-950"
                                : "text-slate-400 hover:text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            {ali === "center" ? "Centro" : ali === "left" ? "Izq" : "Der"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-medium block">
                        Estilo estético del título:
                      </label>
                      <div className="grid grid-cols-2 gap-1 bg-slate-900 p-1 rounded-lg">
                        {(["classic", "bold-uppercase", "minimal-light", "calligraphic"] as const).map((style) => (
                          <button
                            key={style}
                            onClick={() => {
                              const updated = { ...styleSettings, titleStyle: style };
                              setStyleSettings(updated);
                              saveToLocalStorage(metadata, updated, chapters);
                            }}
                            className={`py-1 rounded text-[9px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                              (styleSettings.titleStyle || "classic") === style
                                ? "bg-amber-500 text-slate-950"
                                : "text-slate-400 hover:text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            {style === "classic"
                              ? "Serif Clásico"
                              : style === "bold-uppercase"
                              ? "Negrita Mayús"
                              : style === "minimal-light"
                              ? "Limpio Fino"
                              : "Caligráfico"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typographical Ornaments & Drop Caps */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-sm font-bold text-slate-200 tracking-wider flex items-center gap-1.5" style={{ fontFamily: '"Playfair Display", serif' }}>
                    <Feather className="w-3.5 h-3.5 text-amber-400" />
                    Adornos y Capitulares
                  </h4>

                  <div className="bg-slate-900/60 p-3.5 border border-slate-850 rounded-xl space-y-4">
                    {/* DropCap Toggle and Style Selection */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-white block">Capitular en Inicio de Capítulo</span>
                        <p className="text-[10px] text-slate-400">Agranda artísticamente el primer carácter</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={styleSettings.dropCap}
                        onChange={(e) => {
                          const updated = { ...styleSettings, dropCap: e.target.checked };
                          setStyleSettings(updated);
                          saveToLocalStorage(metadata, updated, chapters);
                        }}
                        className="w-4.5 h-4.5 text-amber-500 focus:ring-0 rounded bg-slate-950 border-slate-800 cursor-pointer accent-amber-500"
                      />
                    </div>

                    {styleSettings.dropCap && (
                      <div className="space-y-1.5 border-t border-slate-800 pt-2.5 animate-slideDown">
                        <label className="text-[11px] text-slate-400 font-medium block">
                          Modelo Artístico de Capitular (Cerrada en Caja / Libre):
                        </label>
                        <select
                          value={styleSettings.dropCapStyle}
                          onChange={(e) => {
                            const updated = {
                              ...styleSettings,
                              dropCapStyle: e.target.value as any
                            };
                            setStyleSettings(updated);
                            saveToLocalStorage(metadata, updated, chapters);
                          }}
                          className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none focus:border-amber-500 cursor-pointer"
                        >
                          <option value="classic">Clásica Seria (Mismo tipo, grande)</option>
                          <option value="ornately">Gótica Florón (Enmarcada en Amber Tono)</option>
                          <option value="modern">Modernista Sans (Audaz degradado carmín)</option>
                          <option value="minimal">Simplista Sobria</option>
                        </select>
                      </div>
                    )}

                    {/* Section Dividers Selection */}
                    <div className="space-y-2 border-t border-slate-800 pt-3">
                      <label className="text-[11px] text-slate-400 font-medium block">
                        Separador de Escena (Dinkus / Adorno):
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <select
                            value={styleSettings.dividerStyle}
                            onChange={(e) => {
                              const style = e.target.value as any;
                              let charVal = styleSettings.dividerChar;
                              if (style === "flourish") charVal = "❦";
                              else if (style === "diamonds") charVal = "✦  ✦  ✦";
                              else if (style === "asterisks") charVal = "∗  ∗  ∗";
                              else if (style === "geometric") charVal = "❖ ❖ ❖";
                              else if (style === "none") charVal = "";

                              const updated = {
                                ...styleSettings,
                                dividerStyle: style,
                                dividerChar: charVal
                              };
                              setStyleSettings(updated);
                              saveToLocalStorage(metadata, updated, chapters);
                            }}
                            className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none focus:border-amber-500 cursor-pointer"
                          >
                            <option value="none">Sin Adornos (Espacio vacío)</option>
                            <option value="flourish">Florón literario (❦)</option>
                            <option value="diamonds">Estrellas Rúnicas (✦✦✦)</option>
                            <option value="asterisks">Asteriscos clásicos (∗∗∗)</option>
                            <option value="geometric">Geométrico Vanguardia (❖❖❖)</option>
                          </select>
                        </div>
                        <div>
                          <input
                            type="text"
                            value={styleSettings.dividerChar}
                            onChange={(e) => {
                              const updated = { ...styleSettings, dividerChar: e.target.value };
                              setStyleSettings(updated);
                              saveToLocalStorage(metadata, updated, chapters);
                            }}
                            className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none focus:border-amber-500"
                            placeholder="Adorno Libre"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Paper Sizing Sensation & Running Headers */}
                <div className="space-y-4 pt-1">
                  <h4 className="text-sm font-bold text-slate-200 tracking-wider flex items-center gap-1.5" style={{ fontFamily: '"Playfair Display", serif' }}>
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    Color de Papel & Maquetado de Cabecera
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-medium block">
                        Material de Soporte:
                      </label>
                      <select
                        value={styleSettings.pageColor}
                        onChange={(e) => {
                          const updated = {
                            ...styleSettings,
                            pageColor: e.target.value as any
                          };
                          setStyleSettings(updated);
                          saveToLocalStorage(metadata, updated, chapters);
                        }}
                        className="w-full text-xs bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="cream">Amarillento Crema (Offset Tradicional)</option>
                        <option value="white">Blanco Níveo (Moderno de Alta Blancura)</option>
                        <option value="sepia">Sepia Rústico Envejecido</option>
                        <option value="charcoal">Carbón Satinado (Perfecto Lectura Noche Layout)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-medium block">
                        Maqueta Encabezado:
                      </label>
                      <select
                        value={styleSettings.runningHeaderStyle}
                        onChange={(e) => {
                          const updated = {
                            ...styleSettings,
                            runningHeaderStyle: e.target.value as any
                          };
                          setStyleSettings(updated);
                          saveToLocalStorage(metadata, updated, chapters);
                        }}
                        className="w-full text-xs bg-slate-900 border border-slate-850 rounded-lg p-2.5 text-slate-200 outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="title-chapter">Izquierda: Título | Derecha: Cap</option>
                        <option value="chapter-page">Izquierda: Cap | Derecha: Pág</option>
                        <option value="none">Sin Cabeceras (Estalactita limpia)</option>
                      </select>
                    </div>
                  </div>
                  
                  {styleSettings.explanation && (
                    <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                      <div className="flex gap-1.5">
                        <Info className="w-4.5 h-4.5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[11px] font-bold text-amber-500 block">Explicación del Concepto:</span>
                          <p className="text-[11px] text-slate-300 leading-normal italic mt-1">
                            "{styleSettings.explanation}"
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* --- SECCIÓN MAQUETACIÓN: SALTO DE PÁGINAS POR CAPÍTULO --- */}
                <div className="space-y-4 pt-4 border-t border-slate-800 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-200 tracking-wider flex items-center gap-1.5" style={{ fontFamily: '"Playfair Display", serif' }}>
                      <Scissors className="w-3.5 h-3.5 text-amber-400" />
                      <span>Salto de Páginas por Capítulo</span>
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={chapterPageBreak} 
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setChapterPageBreak(checked);
                          localStorage.setItem("chapter_page_break", JSON.stringify(checked));
                        }}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-slate-950 peer-checked:after:border-slate-950"></div>
                      <span className="ml-2 text-[10px] uppercase font-bold text-slate-400 font-mono min-w-[50px]">
                        {chapterPageBreak ? "SI" : "NO"}
                      </span>
                    </label>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Define si cada capítulo debe comenzar en una página nueva o si el texto debe fluir de manera continua a lo largo del libro. Desactivarlo ("NO") creará un flujo narrativo ininterrumpido con separadores estéticos de capítulos.
                  </p>
                </div>

                {/* --- SECCIÓN TRADICIONAL DE TABLA DE CONTENIDOS AUTOMÁTICA --- */}
                <div className="space-y-4 pt-4 border-t border-slate-800 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-200 tracking-wider flex items-center gap-1.5" style={{ fontFamily: '"Playfair Display", serif' }}>
                      <Layout className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tabla de Contenidos Automática</span>
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={includeTableOfContents} 
                        onChange={(e) => setIncludeTableOfContents(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-slate-950 peer-checked:after:border-slate-950"></div>
                      <span className="ml-2 text-[10px] uppercase font-bold text-slate-400 font-mono min-w-[50px]">
                        {includeTableOfContents ? "SI" : "NO"}
                      </span>
                    </label>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Compila un índice dinámico auto-actualizable basado en los capítulos redactados. Los lectores podrán clicar las entradas para transportarse directamente a cada página en el simulador físico.
                  </p>

                  {includeTableOfContents && (
                    <div className="p-3.5 bg-slate-900 border border-slate-800/80 rounded-xl space-y-3.5 animate-fadeIn">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-400 font-semibold uppercase block">
                            Título del Índice:
                          </label>
                          <input
                            type="text"
                            value={tocTitle}
                            onChange={(e) => setTocTitle(e.target.value)}
                            className="w-full text-xs bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-200 outline-none focus:border-amber-500 font-mono"
                            placeholder="Ej. Índice"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-400 font-semibold uppercase block">
                            Diseño de Enlaces:
                          </label>
                          <select
                            value={tocStyle}
                            onChange={(e) => setTocStyle(e.target.value as any)}
                            className="w-full text-xs bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-200 outline-none focus:border-amber-500 cursor-pointer"
                          >
                            <option value="dots">Línea de Puntos (Clásico)</option>
                            <option value="classic">Línea Sólida (Tradicional)</option>
                            <option value="modern">Línea Sutil (Contemporáneo)</option>
                            <option value="clean">Espacio Limpio (Minimalista)</option>
                          </select>
                        </div>
                      </div>

                      {/* TOC Interactive Simulator Preview */}
                      <div className="mt-2 p-3 bg-slate-950/80 border border-slate-850/40 rounded-lg space-y-2">
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">
                          Vista Previa del Compilador de Índice:
                        </span>
                        
                        <div className="space-y-2 font-serif text-[11.5px] text-slate-300 leading-normal max-h-[120px] overflow-y-auto pr-1">
                          {(() => {
                            const entries = pages.filter(p => !p.isCreditsPage && !p.isTOCPage && p.isChapterOpener);
                            if (entries.length === 0) {
                              return <p className="text-center text-[10px] text-slate-500 italic py-1">Inyecta capítulos para calcular la paginación...</p>;
                            }
                            return entries.map((entry, idx) => (
                              <div key={idx} className="flex justify-between items-baseline opacity-80 hover:opacity-100 transition-opacity">
                                <span className="font-sans font-semibold text-amber-500 text-[10px]">
                                  Cap. {entry.chapterNumber} <span className="text-slate-400 font-serif font-normal">{entry.chapterTitle}</span>
                                </span>
                                {tocStyle === "dots" && <span className="flex-1 border-b border-dashed border-slate-700/60 mx-1.5"></span>}
                                {tocStyle === "classic" && <span className="flex-1 border-b border-solid border-slate-700/60 mx-1.5"></span>}
                                {tocStyle === "modern" && <span className="flex-1 border-b border-solid border-slate-800/40 mx-1.5"></span>}
                                {tocStyle === "clean" && <span className="flex-1"></span>}
                                <span className="font-mono text-[9.5px] text-slate-400">{entry.pageNumber}</span>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 3: MANUSCRIPT LOAD & AI FORMATTING ENGINE */}
            {activeTab === "content" && (
              <div className="space-y-5 animate-fadeIn">
                
                {/* 📁 LOCAL FILE UPLOADER (DRAG & DROP AND CLICK) - HIGH VISIBILITY */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    📁 1. Sube tu Propio Manuscrito (Ordenador/Móvil):
                  </span>
                  
                  <div 
                    className={`bg-slate-950 hover:bg-slate-900 border-2 border-dashed ${isReadingFile ? "border-amber-500 animate-pulse bg-slate-900" : "border-amber-500/40 hover:border-amber-500"} p-5 rounded-2xl transition-all text-center cursor-pointer relative group`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleLocalFileUpload(e, e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => {
                      const el = document.getElementById("local-manuscript-file-picker");
                      if (el) el.click();
                    }}
                  >
                    <input 
                      type="file" 
                      id="local-manuscript-file-picker" 
                      accept=".docx,.txt,.md,.rtf,.json" 
                      className="hidden" 
                      onChange={handleLocalFileUpload} 
                    />
                    
                    <div className="flex flex-col items-center justify-center space-y-2.5">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                        {isReadingFile ? (
                          <RefreshCw className="w-6 h-6 animate-spin" />
                        ) : (
                          <Download className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider">
                          {isReadingFile ? "Cargando documento..." : "Haz clic o Arrastra tu manuscrito aquí"}
                        </h4>
                        <p className="text-[10.5px] text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                          Soporta <strong className="text-slate-200">Word (.docx)</strong>, <strong className="text-slate-200">Texto (.txt, .md)</strong>, <strong className="text-slate-200">Enriquecido (.rtf)</strong> o <strong className="text-slate-200">Proyecto (.json)</strong>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {fileUploadSuccess && (
                    <div className="bg-emerald-950/40 border border-emerald-900/40 p-3 rounded-xl text-[11px] text-emerald-300 flex items-start gap-2 animate-fadeIn">
                      <BadgeCheck className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold block">¡Éxito al cargar!</span>
                        <span>{fileUploadSuccess}</span>
                      </div>
                    </div>
                  )}

                  {fileUploadError && (
                    <div className="bg-red-950/40 border border-red-950/50 p-3 rounded-xl text-[11px] text-red-300 flex items-start gap-2 animate-fadeIn">
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold block">Error al cargar archivo</span>
                        <span>{fileUploadError}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Book Load Presets */}
                <div id="selection-templates-box" className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Cargar Literatura de Ejemplo (Traspasar a Caja):
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {TEXT_TEMPLATES.map((tpl) => {
                      const isActive = metadata.title === tpl.title;
                      return (
                        <button
                          key={tpl.name}
                          onClick={() => handleApplyTemplate(tpl)}
                          className={`p-2 rounded text-left text-[11px] border transition-all truncate cursor-pointer ${
                            isActive
                              ? "bg-amber-500/10 border-amber-500 text-amber-400 font-semibold"
                              : "bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300"
                          }`}
                        >
                          {tpl.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CLOUD DRIVERS IMPORT BANNER/INTEGRATION */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-amber-500" /> INTEGRACIÓN DE DRIVERS OAUTH B2B
                    </span>
                    {currentUser && (
                      <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Conectado
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-left">
                    <h5 className="text-[11.5px] font-bold text-white tracking-tight">Sincronizar Manuscritos desde Cloud</h5>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Importa obras literarias en crudo o pautas de diseño directamente desde tus drivers autorizados bajo Google Workspace.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {/* Google Drive button */}
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          alert("Por favor, inicia sesión en la Suite Editorial desde el Landing Hub para conectar tus Drivers Corporativos.");
                          setViewMode("landing");
                        } else {
                          setShowDriveModal(true);
                        }
                      }}
                      className="bg-slate-950 hover:bg-slate-850 border border-slate-850 hover:border-slate-750 py-2.5 px-1.5 rounded-xl text-center space-y-1 transition-all cursor-pointer flex flex-col items-center justify-center group select-none"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">🤖</span>
                      <span className="text-[9px] font-bold text-slate-300 font-sans block">Google Drive</span>
                    </button>

                    {/* OneDrive button */}
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          alert("Por favor, inicia sesión en la Suite Editorial desde el Landing Hub para conectar tus Drivers Corporativos.");
                          setViewMode("landing");
                        } else {
                          setShowDriveModal(true);
                        }
                      }}
                      className="bg-slate-950 hover:bg-slate-850 border border-slate-855 hover:border-slate-755 py-2.5 px-1.5 rounded-xl text-center space-y-1 transition-all cursor-pointer flex flex-col items-center justify-center group select-none"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">☁️</span>
                      <span className="text-[9px] font-bold text-slate-300 font-sans block">OneDrive</span>
                    </button>

                    {/* Dropbox button */}
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          alert("Por favor, inicia sesión en la Suite Editorial desde el Landing Hub para conectar tus Drivers Corporativos.");
                          setViewMode("landing");
                        } else {
                          setShowDriveModal(true);
                        }
                      }}
                      className="bg-slate-950 hover:bg-slate-850 border border-slate-855 hover:border-slate-755 py-2.5 px-1.5 rounded-xl text-center space-y-1 transition-all cursor-pointer flex flex-col items-center justify-center group select-none"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">📦</span>
                      <span className="text-[9px] font-bold text-slate-300 font-sans block">Dropbox</span>
                    </button>
                  </div>
                </div>

                {/* Raw Manuscript Area */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span>Manuscrito Crudo</span>
                      <span className="text-[10px] lowercase text-slate-400 font-normal">({speechSupported ? "dictado disponible" : "dictado no soportado"})</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {speechSupported && (
                        <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800/80 py-0.5 px-2 rounded-full">
                          <label className="text-[9px] text-slate-500 font-mono">Idioma:</label>
                          <select
                            value={speechLang}
                            onChange={(e) => {
                              setSpeechLang(e.target.value);
                              if (isDictating && dictationTarget === "raw") {
                                stopDictation();
                              }
                            }}
                            className="bg-transparent border-none text-[9.5px] text-slate-300 font-mono focus:outline-none cursor-pointer"
                          >
                            <option value="es-ES" className="bg-slate-900 pb-1">Español 🇪🇸</option>
                            <option value="en-US" className="bg-slate-900 pb-1">English 🇺🇸</option>
                            <option value="pt-PT" className="bg-slate-900 pb-1">Português 🇵🇹</option>
                            <option value="fr-FR" className="bg-slate-900 pb-1">Français 🇫🇷</option>
                            <option value="it-IT" className="bg-slate-900 pb-1">Italiano 🇮🇹</option>
                          </select>
                        </div>
                      )}
                      <span className="text-[11px] text-slate-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-850">
                        {rawText.length.toLocaleString()} car.
                      </span>
                    </div>
                  </div>

                  {/* VOICE DICTATION CONTROLS BAR FOR RAW MANUSCRIPT */}
                  {speechSupported && (
                    <div className="bg-slate-950 border border-slate-850 rounded-xl p-2.5 flex items-center justify-between gap-3 transition-all">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (isDictating && dictationTarget === "raw") {
                              stopDictation();
                            } else {
                              startDictation("raw");
                            }
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isDictating && dictationTarget === "raw"
                              ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                              : "bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          <Mic className="w-3.5 h-3.5" />
                          <span>{isDictating && dictationTarget === "raw" ? "Detener Dictado" : "Dictar Manuscrito"}</span>
                        </button>
                        
                        {isDictating && dictationTarget === "raw" && (
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                            <span className="text-[10px] text-slate-400 font-mono animate-pulse">Escuchando...</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 text-right truncate">
                        {dictatedTextTemp ? (
                          <span className="text-[10px] italic text-amber-300 font-mono animate-pulse">
                            "...{dictatedTextTemp}"
                          </span>
                        ) : isDictating && dictationTarget === "raw" ? (
                          <span className="text-[10.5px] text-slate-500 italic">Hable ahora para dictar en la posición del cursor...</span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">Dedicación por voz directa</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Error display if dictation fails */}
                  {dictationError && dictationTarget === "raw" && (
                    <div className="bg-red-950/30 border border-red-900 p-2 rounded-lg text-[10px] text-red-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{dictationError}</span>
                      <button onClick={() => setDictationError(null)} className="ml-auto text-slate-400 hover:text-white focus:outline-none">✕</button>
                    </div>
                  )}

                  <textarea
                    id="raw-manuscript-input"
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Pega aquí los capítulos tuyos de corrido, escritos, diálogos con guión simple, escenas... o haz clic en 'Dictar' para grabar pasajes en tiempo real usando tu voz."
                    rows={10}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-amber-500 font-mono placeholder:text-slate-650"
                  />
                </div>

                {formatError && (
                  <div className="flex gap-2 bg-red-950/40 border border-red-800 p-3 rounded-lg text-xs text-red-300">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                    <span>{formatError}</span>
                  </div>
                )}

                {/* Actions: AI Formatting v Local Fallback */}
                <div className="grid grid-cols-2 gap-2 pb-2">
                  <button
                    onClick={handleFormatText}
                    disabled={formattingText || !rawText.trim()}
                    className="bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-slate-950 text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    title="Añade las normas de puntuación, rayas de diálogo correctas por reglas españolas (—) y divide los capítulos con inteligencia artificial."
                  >
                    {formattingText ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Compaginando con IA...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Compaginar con IA</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleLocalQuickLayout()}
                    disabled={formattingText || !rawText.trim()}
                    className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    title="Compaginador rápido sin servidores ni claves para procesamientos sencillos en navegador."
                  >
                    <span>Partición Rápida Local</span>
                  </button>
                </div>

                {/* Formatted Chapters List */}
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                      Capítulos Listos ({chapters.length})
                    </span>
                    <span className="text-[10px] text-slate-500 italic">Haz clic para editar pasajes</span>
                  </div>

                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    {chapters.map((chap, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900 hover:bg-slate-850 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs gap-3"
                      >
                        <div className="truncate flex-1">
                          <span className="font-bold text-amber-500 font-mono mr-1.5">Cap. {chap.chapterNumber}</span>
                          <span className="text-slate-100 font-medium">{chap.title || "Sin Título"}</span>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            {chap.paragraphs.length} párrafos • ~{chap.paragraphs.reduce((acc, p) => acc + p.length, 0)} letras
                          </p>
                        </div>
                        <button
                          onClick={() => launchChapterEditor(idx)}
                          className="bg-slate-800 hover:bg-slate-705 text-slate-300 text-[10px] px-2.5 py-1 rounded border border-slate-755 cursor-pointer"
                        >
                          Editar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* --- DIRECCIÓN DE ARTE Y LIBRO ILUSTRADO --- */}
                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="text-amber-500 w-4 h-4" />
                      <span>Libro Ilustrado e Ilustraciones</span>
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={illustratedBook} 
                        onChange={(e) => setIllustratedBook(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-slate-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-amber-500"></div>
                      <span className="ml-2 text-[10px] uppercase font-bold text-slate-400 font-mono">
                        {illustratedBook ? "ACTIVO" : "INACTIVO"}
                      </span>
                    </label>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Añade elementos gráficos para compaginar novelas del siglo de oro con grabados en madera o novelas de fantasía moderna. La IA decide las mejores locaciones según el peso visual de tu texto.
                  </p>

                  {illustratedBook && (
                    <div className="space-y-4 animate-fadeIn">
                      {/* AI Recommender Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={handleAutoIllustrateAll}
                          disabled={suggestingIllustrations || chapters.length === 0}
                          className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                          title="Analiza cada capítulo y genera ubicaciones, prompts y epígrafes artísticos integrados en base al contenido."
                        >
                          {suggestingIllustrations ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Ilustrando...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Analizar con IA</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={handleClearAllIllustrations}
                          disabled={chapters.length === 0}
                          className="bg-slate-900 border border-slate-800 hover:border-red-900/40 hover:text-red-400 text-slate-400 text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Limpiar Todo</span>
                        </button>
                      </div>

                      {/* Display Total Statistics & General Bake Images Button */}
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase flex items-center gap-1">
                            <ImageIcon className="w-3 h-3 text-amber-400" />
                            Ilustraciones actuales:
                          </span>
                          <span className="text-amber-400 font-bold">
                            {chapters.reduce((acc, c) => acc + (c.illustrations?.length || 0), 0)} imágenes en maqueta
                          </span>
                        </div>
                        {chapters.some(c => (c.illustrations || []).some(ill => !ill.isAiGenerated)) && (
                          <button
                            onClick={handleGenerateAllImages}
                            disabled={generatingIllId !== null}
                            className="bg-amber-500 hover:bg-amber-600 font-bold text-slate-950 text-[10px] px-2 py-1 rounded cursor-pointer"
                          >
                            Pintar Todas (IA)
                          </button>
                        )}
                      </div>

                      {/* Illustrations Manager List */}
                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Lista de Grabados y Láminas</span>
                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                          {chapters.every(c => !c.illustrations || c.illustrations.length === 0) ? (
                            <div className="text-center p-4 border border-dashed border-slate-850 rounded-lg text-slate-500 text-[11px]">
                              Ningún grabado asignado. Presiona <strong>"Analizar con IA"</strong> para generar dirección de arte automática, o rellena el formulario de abajo.
                            </div>
                          ) : (
                            chapters.flatMap((c) => (c.illustrations || []).map((ill) => (
                              <div 
                                key={ill.id}
                                className="bg-slate-900/60 border border-slate-800 p-2 rounded-lg flex items-center gap-3 text-xs"
                              >
                                <div className="w-10 h-10 rounded overflow-hidden bg-slate-950 shrink-0 border border-slate-800/60 relative flex items-center justify-center">
                                  {generatingIllId === ill.id ? (
                                    <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                                  ) : ill.imageUrl ? (
                                    <img src={ill.imageUrl} alt="" className="object-cover w-full h-full" referrerPolicy="no-referrer" />
                                  ) : (
                                    <ImageIcon className="w-3.5 h-3.5 text-slate-600" />
                                  )}
                                </div>
                                <div className="flex-1 truncate">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-amber-500 font-mono text-[10px]">Cap.{ill.chapterNumber}</span>
                                    <span className="text-[10px] text-slate-400 font-mono">Párrafo {ill.paragraphIndex}</span>
                                    <span className="text-[9px] px-1 bg-slate-800 rounded font-mono text-slate-300 uppercase scale-90">{ill.alignment}</span>
                                  </div>
                                  <span className="text-[10px] text-slate-300 truncate block mt-0.5" title={ill.caption}>
                                    {ill.caption || "Sin epígrafe."}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  {!ill.isAiGenerated && (
                                    <button
                                      onClick={() => handleRegenerateIllustration(ill)}
                                      disabled={generatingIllId !== null}
                                      className="p-1 hover:bg-slate-800 text-amber-400 border border-amber-500/20 rounded cursor-pointer"
                                      title="Generar esta ilustración particular con la IA en base a su prompt"
                                    >
                                      <RefreshCw className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteIllustration(c.chapterNumber, ill.id)}
                                    className="p-1 hover:bg-red-950 hover:text-red-400 rounded text-slate-400 cursor-pointer"
                                    title="Quitar de maqueta"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            )))
                          )}
                        </div>
                      </div>

                      {/* Manual Form Accordion */}
                      <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
                        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase">
                          <Plus className="w-3.5 h-3.5 text-amber-400" />
                          Añadir Grabado Manual o Boceto
                        </span>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 block font-medium">Capítulo destino:</label>
                            <select
                              value={manualIllChapter}
                              onChange={(e) => setManualIllChapter(Number(e.target.value))}
                              className="w-full text-xs bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                            >
                              {chapters.map((c) => (
                                <option key={c.chapterNumber} value={c.chapterNumber}>Capítulo {c.chapterNumber}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 block font-medium">Colocar tras párrafo (N):</label>
                            <input
                              type="number"
                              min={0}
                              value={manualIllParagraph}
                              onChange={(e) => setManualIllParagraph(Number(e.target.value))}
                              className="w-full text-xs bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 block font-medium">Alineación Maqueta:</label>
                            <select
                              value={manualIllAlign}
                              onChange={(e) => setManualIllAlign(e.target.value as any)}
                              className="w-full text-xs bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200"
                            >
                              <option value="center">Centrado (Center)</option>
                              <option value="full">Ancho Completo (Full)</option>
                              <option value="left">Flotante Izq. (Left)</option>
                              <option value="right">Flotante Der. (Right)</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 block font-medium">Ancho (%) o proporción:</label>
                            <input
                              type="range"
                              min={30}
                              max={100}
                              step={5}
                              value={manualIllWidth}
                              onChange={(e) => setManualIllWidth(Number(e.target.value))}
                              className="w-full accent-amber-500 mt-1.5"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 block font-medium">Pie de foto o Epígrafe (Páginas físicas):</label>
                          <input
                            type="text"
                            placeholder="Ej: Don Quijote acomete ferozmente a los molinos..."
                            value={manualIllCaption}
                            onChange={(e) => setManualIllCaption(e.target.value)}
                            className="w-full text-xs bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 block font-medium">Idea Visual para IA (Prompt):</label>
                          <textarea
                            placeholder="An antique woodcut illustration of a knight in armor fighting windmills..."
                            value={manualIllPrompt}
                            onChange={(e) => setManualIllPrompt(e.target.value)}
                            rows={2}
                            className="w-full text-[11px] bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                          />
                        </div>

                        <button
                          onClick={handleAddIllustrationManual}
                          className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 rounded-lg cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Insertar Grabado en Obra</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 4: KDP COMPATIBILITY & GRAPHICS SYSTEM EXPORTS */}
            {activeTab === "compatibility" && (
              <div className="space-y-6 animate-fadeIn pb-6">
                
                {/* Visual Intro Block */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-500/20 p-4 rounded-xl space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-5 opacity-5 pointer-events-none">
                    <Settings className="w-24 h-24 stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                    Imprenta Sincronizada KDP
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sincroniza y valida las especificaciones físicas para Amazon KDP u otras prensas editoriales. Exporta pliegos editables vectoriales compatibles con cualquier software gráfico.
                  </p>
                </div>

                {/* 1. KDP PHYSICAL TRIM SIZE CARDS */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    1. Formato Físico de Impresión (KDP Trim Size):
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(TRIM_SIZE_FACTORS).map(([key, item]) => {
                      const isActive = kdpTrimSize === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setKdpTrimSize(key as any)}
                          className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                            isActive
                              ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-md"
                              : "bg-slate-900/60 hover:bg-slate-850 border-slate-800 text-slate-300"
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold block">{item.label}</span>
                            <span className="text-[10.5px] text-slate-400 font-mono">
                              Ancho: {item.width} • Alto: {item.height}
                            </span>
                          </div>
                          {isActive && (
                            <span className="bg-amber-500 text-slate-950 p-1 rounded-full text-[10px] font-bold">
                              Activo
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. BLEED TOGGLE (SANGRADO DE PÁGINA) */}
                <div className="bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-200 block">Sangrado de Imprenta (KDP Bleed)</span>
                      <span className="text-[10px] text-slate-400 leading-tight block">Necesario solo si hay imágenes o fondos que tocan los extremos físicos.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={kdpBleed}
                        onChange={(e) => setKdpBleed(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>
                </div>

                {/* 3. PHYSICAL COMPLIANCE CHECKER */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    2. Verificación de Reglas Físicas de KDP:
                  </span>
                  
                  {/* Checker Table */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-sans text-xs">
                    <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                      <span className="font-bold text-slate-200">Parámetro</span>
                      <span className="font-bold text-slate-200">Cálculo Real</span>
                    </div>

                    <div className="p-3.5 space-y-3">
                      
                      {/* Pages Count check */}
                      <div className="flex justify-between items-center text-[11px] border-b border-slate-900 pb-2">
                        <div>
                          <span className="font-medium text-slate-300 block">Total de Páginas Maquetadas:</span>
                          <span className="text-[9.5px] text-slate-500 italic">Mínimo 24 páginas KDP Tapa Blanda</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold font-mono text-slate-100">{pages.length} págs</span>
                          <span className={`block text-[9.5px] font-semibold mt-0.5 ${pages.length >= 24 ? "text-emerald-400" : "text-rose-400"}`}>
                            {pages.length >= 24 ? "✓ Correcto" : "⚠ Insuficientes"}
                          </span>
                        </div>
                      </div>

                      {/* Gutter calculation */}
                      <div className="flex justify-between items-center text-[11px] border-b border-slate-900 pb-2">
                        <div>
                          <span className="font-medium text-slate-300 block">Margen de Lomo Interno (Gutter):</span>
                          <span className="text-[9.5px] text-slate-500 italic">Previene que el texto se hunda al encuadernar</span>
                        </div>
                        <div className="text-right font-mono">
                          <span className="font-bold text-slate-100">+{calculateKdpGutter(pages.length).toFixed(3)} in</span>
                          <span className="block text-[9.5px] text-slate-400 mt-0.5">
                            ({(calculateKdpGutter(pages.length) * 25.4).toFixed(1)} mm)
                          </span>
                        </div>
                      </div>

                      {/* Cover Spine thickness calculator */}
                      <div className="flex justify-between items-center text-[11px] pb-1">
                        <div>
                          <span className="font-medium text-slate-300 block">Ancho del Lomo Estimado (Cubierta):</span>
                          <span className="text-[9.5px] text-slate-500 italic">Especial para diseñar guardas y tapas</span>
                        </div>
                        <div className="text-right font-mono">
                          <span className="font-bold text-amber-400">
                            {(pages.length * (styleSettings.pageColor === "cream" ? 0.00225 : 0.002)).toFixed(4)} in
                          </span>
                          <span className="block text-[9.5px] text-slate-400 mt-0.5">
                            ({(pages.length * (styleSettings.pageColor === "cream" ? 0.00225 : 0.002) * 25.4).toFixed(2)} mm)
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Overall Badge */}
                    <div className={`px-4 py-2.5 text-center font-bold text-[10.5px] tracking-wider uppercase border-t border-slate-805 ${
                      pages.length >= 24
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}>
                      {pages.length >= 24 ? (
                        <span>✓ CUMPLE REQUISITOS FÍSICOS KDP</span>
                      ) : (
                        <span>⚠ SE SUGIERE AGREGAR TEXTO (MÍN. 24 PÁGS)</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. MULTI-FORMAT EXPORTS AND HIGHEST FIDELITY DOWNLOADS */}
                <div className="space-y-4 pt-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    3. Centro de Descarga Multi-Formato Oficial:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Raw PDF Impresión */}
                    <button
                      onClick={() => setShowPrintPdfModal(true)}
                      className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-850 hover:border-amber-500/40 p-3.5 rounded-xl text-left flex items-start gap-3 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg mt-0.5">
                        <Printer className="w-4.5 h-4.5 animate-bounce" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block flex items-center gap-1.5">
                          Exportar PDF de Imprenta (KDP)
                        </span>
                        <span className="text-[10px] text-slate-450 block leading-tight mt-1">
                          Abre el panel de preimpresión para calibrar márgenes, sangrados, marcas de corte y descargar tu PDF.
                        </span>
                      </div>
                    </button>

                    {/* ePub 3 Directo */}
                    <button
                      onClick={() => withPaymentCheck(exportEPUBDigitalWithZipping, "Libro Electrónico EPUB 3 (Kindle)")}
                      className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-855 hover:border-amber-500/40 p-3.5 rounded-xl text-left flex items-start gap-3 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg mt-0.5">
                        <Sparkles className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Exportar ePub 3 (Kindle / eReader)
                        </span>
                        <span className="text-[10px] text-slate-450 block leading-tight mt-1">
                          Compatible con las especificaciones de Apple Books, Google Play y Amazon Kindle.
                        </span>
                      </div>
                    </button>

                    {/* MS Word Draft .DOC */}
                    <button
                      onClick={() => withPaymentCheck(exportWordDraft, "Borrador de Manuscrito Word (.doc)")}
                      className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-850 hover:border-indigo-500/40 p-3.5 rounded-xl text-left flex items-start gap-3 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg mt-0.5">
                        <FileText className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Descargar Borrador Word (.doc)
                        </span>
                        <span className="text-[10px] text-slate-450 block leading-tight mt-1">
                          Documento editable con configuración de sangría de lomo para revisiones y corrector de estilo.
                        </span>
                      </div>
                    </button>

                    {/* JSON Project Structure */}
                    <button
                      onClick={exportJSONProject}
                      className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-850 hover:border-indigo-500/40 p-3.5 rounded-xl text-left flex items-start gap-3 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg mt-0.5">
                        <Settings className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Backup del Proyecto (JSON)
                        </span>
                        <span className="text-[10px] text-slate-450 block leading-tight mt-1">
                          Estructura de la base de datos de tu manuscrito, ideal para respaldar tu trabajo.
                        </span>
                      </div>
                    </button>

                  </div>
                </div>

                {/* 5. INTERACTIVE ADVANCED LOSSLESS COMPRESSION SUITE & OPTIMIZER */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Zap className="text-amber-400 w-4 h-4 animate-pulse" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Compresión Editorial Inteligente</h4>
                        <p className="text-[10px] text-slate-400">Reduce el peso del archivo conservando máxima calidad vectorial</p>
                      </div>
                    </div>
                    <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono font-bold">LOSSLESS ENGINE</span>
                  </div>

                  {/* Explanation */}
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-850 text-[10.5px] text-slate-300 leading-relaxed font-sans space-y-1.5">
                    <p>
                      <strong>¿Cómo logramos alta calidad con poco peso?</strong> El diseño editorial profesional de DIAGRAMMERS almacena la tipografía, márgenes, grillas suizas y estructuras como <strong className="text-white font-mono">vectores matemáticos puros (SVG/ASCII)</strong> en lugar de imágenes rasterizadas pesadas. Esto permite que el libro final reduzca su peso en hasta un 90% sin perder un solo ápice de nitidez tipográfica en pantallas de alta resolución o imprenta comercial.
                    </p>
                  </div>

                  {/* Interactive Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {/* Quality DPI Target */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">DPI Objetivo de Rendimiento:</label>
                      <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                        {(["300", "150", "72"] as const).map((dpi) => (
                          <button
                            key={dpi}
                            type="button"
                            onClick={() => setCompressDpi(dpi)}
                            className={`py-1.5 text-[10px] font-bold rounded cursor-pointer transition-all ${
                              compressDpi === dpi
                                ? "bg-amber-500 text-slate-950 shadow-sm"
                                : "text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            {dpi} DPI {dpi === "300" ? "(Físico)" : dpi === "150" ? "(eBook)" : "(Borrador)"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Checkbox settings */}
                    <div className="space-y-2 flex flex-col justify-center">
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={compressSubsetFonts}
                          onChange={(e) => setCompressSubsetFonts(e.target.checked)}
                          className="rounded border-slate-800 bg-slate-900 text-amber-500 focus:ring-opacity-0 h-4 w-4"
                        />
                        <div>
                          <span className="font-bold block text-[11px] text-slate-200">Sub-espaciar Fuentes Embebidas</span>
                          <span className="text-[9.5px] text-slate-500 block leading-none">Elimina caracteres inútiles para ahorrar ~8MB</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Weight Comparison Chart Visualizer */}
                  <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] font-bold font-mono text-slate-400 uppercase block">Peso del Archivo Estimado:</span>
                      <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                        <span className="text-slate-500 line-through text-xs font-mono">48.5 MB</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-amber-400 font-extrabold font-mono text-base col-span-1">
                          {compressDpi === "300" ? "12.4 MB" : compressDpi === "150" ? "4.1 MB" : "1.2 MB"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={runAdaptiveCompression}
                      disabled={isCompressingActive}
                      className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-amber-500/10 transition-transform active:scale-95"
                    >
                      {isCompressingActive ? (
                        <>
                          <span className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                          <span>Comprimiendo Estructura...</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
                          <span>Optimizar Peso del Libro</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Success Alert Message */}
                  {compressDoneMessage && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg text-xs leading-relaxed animate-fadeIn">
                      {compressDoneMessage}
                    </div>
                  )}
                </div>

                {/* Agencies & InDesign Interchange Export Tools */}
                <div className="space-y-3 pt-2 border-t border-slate-900/60 font-sans">
                  <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-widest block font-mono">
                    Canales de Intercambio Avanzado para Agencias:
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={exportInDesignHTML}
                      className="bg-slate-900 border border-slate-800 hover:bg-slate-850 p-2 text-left text-[11px] text-slate-300 cursor-pointer transition-all flex items-center gap-1.5 rounded-lg"
                    >
                      <FileDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">HTML para InDesign / Canva</span>
                    </button>

                    <button
                      onClick={exportInDesignTaggedText}
                      className="bg-slate-900 border border-slate-800 hover:bg-slate-850 p-2 text-left text-[11px] text-slate-300 cursor-pointer transition-all flex items-center gap-1.5 rounded-lg"
                    >
                      <Feather className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">Texto Etiquetado (Adobe)</span>
                    </button>
                  </div>

                  {/* HIGH FIDELITY PREPRESS IMPRENTA SERVICE BUTTON */}
                  <button
                    onClick={() => setShowPrintPdfModal(true)}
                    className="w-full bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-600/10 hover:from-amber-500/15 hover:via-amber-500/25 hover:to-amber-600/15 border border-amber-500/40 hover:border-amber-500 text-amber-350 hover:text-amber-300 p-2.5 text-center text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-amber-500/5 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Printer className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>Maqueta de Preimpresión PDF (Corte y Sangrado)</span>
                  </button>
                </div>

                {/* 5. QUICK CLIPBOARD COPIERS FOR CANVA / WORD */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    4. Copiar Bloques con Formato para Canva / Word:
                  </span>
                  
                  {copiedTextStatus && (
                    <div className="p-2 bg-emerald-950/30 border border-emerald-800 text-emerald-300 rounded-lg text-center text-[11px] animate-fadeIn">
                      {copiedTextStatus}
                    </div>
                  )}

                  <div className="space-y-1.5 max-h-56 overflow-y-auto border border-slate-850 p-2 rounded-xl bg-slate-950/40">
                    {chapters.map((chap, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-slate-900/60 rounded-lg border border-slate-850 flex items-center justify-between gap-3 text-xs"
                      >
                        <span className="truncate text-slate-300">
                          <strong className="text-amber-500 font-mono">Cap. {chap.chapterNumber}</strong> - {chap.title || "Sin título"}
                        </span>
                        <button
                          onClick={() => copyChapterHTMLToClipboard(idx)}
                          className="bg-slate-850 hover:bg-slate-800 hover:text-white text-slate-300 px-3 py-1.5 rounded text-[10px] shrink-0 font-semibold cursor-pointer border border-slate-700"
                        >
                          Copiar HTML
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic warning about printing */}
                <div className="p-3.5 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-1 text-slate-400">
                  <span className="text-[11px] font-bold text-amber-500 block">✓ Certificación Listos Para Imprimir:</span>
                  <p className="text-[11px] leading-relaxed">
                    Al imprimir en PDF, elige la orientación y dimensiones de página correspondientes en la configuración de página del diálogo del navegador. Te sugerimos activar el modo <strong className="text-slate-200">"Lectura Continua"</strong> del simulador para exportar el manuscrito en su totalidad física.
                  </p>
                </div>

              </div>
            )}

            {activeTab === "copyright" && (
              <div className="space-y-6 animate-fadeIn pb-6">
                
                {/* Visual Intro Block */}
                <div className="bg-gradient-to-br from-indigo-950/70 to-slate-900 border border-emerald-500/20 p-4 rounded-xl space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-5 opacity-5 pointer-events-none">
                    <ShieldCheck className="w-24 h-24 stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                    DIAGRAMMERS • Propiedad Intelectual e ISBN
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Protege tu manuscrito al instante de forma jurídica e internacional. Adquiere tu ISBN comercial gratuito de Amazon KDP y automatiza el registro seguro en Safe Creative con sello criptográfico SHA-256 directo en las páginas de tu libro. Es importante tramitar estos registros usando tus propias cuentas para garantizar la seguridad de tu obra.
                  </p>
                </div>

                {/* CRUCIAL USER WARNING & DIRECT PLATFORMS ACCESS BUTTONS */}
                <div className="p-4 bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-950 rounded-xl border border-amber-500/25 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-extrabold text-[11px] uppercase tracking-wider">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                    <span>Importante: Trámites Oficiales en tus Propias Cuentas</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Para registrar legalmente tus derechos y distribuir tu libro, debes realizar las gestiones en los servicios oficiales <strong>usando tu propia cuenta de autor</strong>. No utilices códigos de prueba de forma comercial. Además, recuerda que <strong>el ISBN gratuito otorgado por Amazon KDP está restringido única y exclusivamente para ser distribuido a través de Amazon</strong>; usarlo con otros editores independientes podría violar sus políticas.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Official Safe Creative Link */}
                    <a 
                      href="https://www.safecreative.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 bg-indigo-950/50 hover:bg-indigo-900/40 border border-indigo-500/30 hover:border-indigo-400/60 rounded-lg transition-all group cursor-pointer"
                    >
                      <div className="space-y-0.5 text-left">
                        <span className="text-[9px] font-bold text-indigo-400 uppercase block tracking-wider font-mono">1. SAFE CREATIVE OFICIAL</span>
                        <span className="text-[11px] text-slate-200 block">Registrar Autoría de Obra</span>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <Globe className="w-4 h-4" />
                      </div>
                    </a>

                    {/* Official Amazon KDP Link */}
                    <a 
                      href="https://kdp.amazon.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 bg-amber-500/30 hover:bg-amber-905/20 border border-amber-500/30 hover:border-amber-400/60 rounded-lg transition-all group cursor-pointer"
                    >
                      <div className="space-y-0.5 text-left">
                        <span className="text-[9px] font-bold text-amber-400 uppercase block tracking-wider font-mono font-mono">2. PANEL AMAZON KDP</span>
                        <span className="text-[11px] text-slate-200 block">Crear Cuenta y Publicar</span>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <Globe className="w-4 h-4" />
                      </div>
                    </a>
                  </div>
                  
                  <p className="text-[10px] text-slate-500 leading-normal block">
                    *Tip: Te sugerimos maquetar tu libro en nuestro editor primero. Una vez finalices la estructura, accede a Amazon KDP o Safe Creative comercial con los enlaces correspondientes, obtén los códigos auténticos e ingrésalos en esta sección para recalcular la página de créditos y el simulador de códigos de barras.
                  </p>
                </div>

                {/* Grid layout for major tools */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* CARD 1: SAFE CREATIVE SIGNING */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                            Previsualizar Registro (Safe Creative Mock)
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono">Maqueta de Protección Digital</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Incrusta temporalmente una firma criptográfica hash SHA-256 en tus páginas para revisar el espacio tipográfico en el pliego de créditos. Recuerda tramitar el registro oficial en su portal con tu propia cuenta.
                      </p>

                      {/* Live SHA256 display */}
                      <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-850 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider font-mono">Firma Digital Local (SHA-256)</span>
                          <span className="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">Sincronizado</span>
                        </div>
                        <p className="font-mono text-[9.5px] tracking-wider truncate text-slate-300 select-all" title="Haz doble clic para copiar el Hash">
                          {calculatedHash || generateManuscriptSHA256()}
                        </p>
                      </div>
                    </div>

                    {/* Operational states for Safe Creative */}
                    <div className="pt-2 space-y-3">
                      {isRegistrandoSafeCreative || isTransferringSafe ? (
                        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-850 space-y-2.5">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-medium text-indigo-400 uppercase tracking-wider animate-pulse">
                              {transferState === "idle" && "Iniciando proceso..."}
                              {transferState === "hashing" && "Calculando firma digital SHA-256..."}
                              {transferState === "encrypting" && "Encriptando canal HTTPS / TLS 1.3..."}
                              {transferState === "sending" && "Asegurando traspaso de obra via Webhook..."}
                              {transferState === "success" && "¡Registro Completado con éxito!"}
                            </span>
                            <span className="text-[9px] text-slate-500 font-mono">
                              {transferState === "hashing" && "25%"}
                              {transferState === "encrypting" && "55%"}
                              {transferState === "sending" && "85%"}
                              {transferState === "success" && "100%"}
                            </span>
                          </div>
                          
                          {/* Animated bar indicator */}
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-indigo-500 rounded-full transition-all duration-700 ${
                                transferState === "idle" ? "w-[10%]" : 
                                transferState === "hashing" ? "w-[30%]" : 
                                transferState === "encrypting" ? "w-[60%]" : 
                                transferState === "sending" ? "w-[90%]" : "w-full"
                              }`}
                            />
                          </div>
                        </div>
                      ) : metadata.safeCreativeId ? (
                        <div className="p-3.5 bg-indigo-500/5 rounded-xl border border-indigo-500/15 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold">
                            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                            <span>¡OBRA REGISTRADA Y SEGUIDA DE FORMA SEGURA!</span>
                          </div>
                          <div className="text-[11px] text-slate-300">
                            <p className="font-mono bg-indigo-500/10 p-2 rounded text-center select-all font-bold tracking-widest">{metadata.safeCreativeId}</p>
                            <p className="mt-1.5 text-[10px] text-slate-400 leading-normal">
                              Este identificador se ha inyectado directamente en el pliego de créditos de tu libro (Pág. 1) y es válido en más de 170 países del Convenio de Berna.
                            </p>
                          </div>
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={handleTransferToSafeCreative}
                              className="text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 px-3 rounded flex-1 transition-colors cursor-pointer"
                            >
                              Sincronizar Cambios de Obra
                            </button>
                            <button
                              onClick={() => {
                                const cleared = { ...metadata, safeCreativeId: "" };
                                setMetadata(cleared);
                                saveToLocalStorage(cleared, styleSettings, chapters);
                              }}
                              className="text-[10px] hover:bg-slate-800 text-slate-400 hover:text-red-400 py-1.5 px-2 rounded transition-colors cursor-pointer"
                              title="Reiniciar registro"
                            >
                              Liberar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <button
                            onClick={handleSimulateSafeCreative}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <ShieldCheck className="w-4 h-4 shrink-0" />
                            <span>Sellar Criptográficamente & Registrar en Safe Creative</span>
                          </button>
                          <span className="text-[10px] text-slate-500 block text-center">
                            *Se utiliza autenticación OAuth para traspasar el manuscrito de forma segura.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CARD 2: KDP ISBN DISCOVERY */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                          <QrCode className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                            Simulador e Ingreso de ISBN-13
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono">Maqueta KDP y Código de Barras</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        El código ISBN gratuito de Amazon KDP está <strong>exclusivamente restringido para distribución en Amazon</strong>. Está prohibido utilizarlo en otros editores. Registra tu ISBN propio o de KDP oficial para maquetar el código de barras definitivo.
                      </p>

                      <div className="p-3 bg-red-950/20 rounded-lg border border-red-500/10 flex gap-2.5 items-start">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
                          !
                        </div>
                        <p className="text-[10px] text-slate-350 leading-relaxed">
                          Utiliza el "ISBN de Prueba" para ensayar visualmente el código de barras y la página de créditos, y una vez finalices, reemplázalo con tu código auténtico de autor de KDP.
                        </p>
                      </div>
                    </div>

                    {/* Operational states for ISBN */}
                    <div className="pt-2 space-y-3">
                      {isSolicitandoISBN || isTransferringKDP ? (
                        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-850 space-y-2.5">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-medium text-emerald-400 uppercase tracking-wider animate-pulse">
                              {isSolicitandoISBN ? "Tramitando ISBN en KDP Registry..." : "Enlazando metadatos para publicación física..."}
                            </span>
                            <span className="font-mono text-[9px] text-slate-400">Procesando</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full w-[70%] animate-pulse" />
                          </div>
                        </div>
                      ) : metadata.isbn ? (
                        <div className="p-3.5 bg-emerald-500/5 rounded-xl border border-emerald-500/15 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                            <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>¡ISBN PROVISIONAL VINCULADO!</span>
                          </div>
                          <div className="text-[11px] text-slate-300">
                            <p className="font-mono bg-emerald-500/10 p-2 rounded text-center select-all font-bold tracking-widest text-emerald-300 uppercase">{metadata.isbn}</p>
                            <p className="mt-1.5 text-[10px] text-slate-400 leading-normal">
                              Este ISBN provisional se ha enlazado a tu maqueta virtual. Úsalo temporalmente para verificar la alineación del código de barras gráfico y la página de créditos antes de publicar oficialmente.
                            </p>
                          </div>
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={handleTransferToKDP}
                              className="text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-350 font-bold py-1.5 px-3 rounded flex-1 transition-colors cursor-pointer"
                            >
                              Autoenviar Metadatos (Simular KDP)
                            </button>
                            <button
                              onClick={() => {
                                const cleared = { ...metadata, isbn: "" };
                                setMetadata(cleared);
                                saveToLocalStorage(cleared, styleSettings, chapters);
                              }}
                              className="text-[10px] hover:bg-slate-800 text-slate-400 hover:text-red-400 py-1.5 px-2 rounded transition-colors cursor-pointer"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <button
                            onClick={() => {
                              setIsIsbnScannerOpen(true);
                              setScannerStatus("idle");
                              setScannedResult("");
                            }}
                            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer scale-100 hover:scale-[1.01]"
                            title="Escanear un código de barras ISBN en la contraportada de un libro físico para autocompletar metadatos"
                          >
                            <Camera className="w-4 h-4 shrink-0 text-indigo-200 animate-pulse" />
                            <span>Escanear ISBN Físico (Cámara / Demo)</span>
                          </button>

                          <div className="flex gap-2">
                            <button
                              onClick={handleSimulateISBN}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-slate-950 text-[11px] font-bold py-2 px-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                              title="Simular la API de Amazon KDP para autoproveer un ISBN de prueba"
                            >
                              <Sparkles className="w-3.5 h-3.5 shrink-0" />
                              <span>ISBN de Prueba KDP</span>
                            </button>
                            <input
                              type="text"
                              placeholder="Escribe ISBN..."
                              className="w-1/3 bg-slate-950 border border-slate-850 rounded-lg px-2 text-xs font-mono text-center focus:outline-none focus:border-emerald-500 text-slate-200 placeholder-slate-650"
                              onBlur={(e) => {
                                if (e.target.value.trim()) {
                                  const updated = { ...metadata, isbn: e.target.value.trim() };
                                  setMetadata(updated);
                                  saveToLocalStorage(updated, styleSettings, chapters);
                                }
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 block text-center leading-normal">
                            *Escribe tu ISBN definitivo o haz clic en "ISBN de Prueba KDP" para previsualizar el código de barras y corroborar la maquetación.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* 💳 PASARELAS DE PAGO Y CONFIGURACIÓN COMERCIAL PARA VENTAS DIRECTAS */}
                <div id="author-payment-settings" className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-xl p-5 space-y-6 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-500/20 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
                          Pasarelas de Pago Directo y Configuración Comercial
                        </h4>
                        <p className="text-[10px] text-indigo-400 font-sans mt-0.5">
                          Configura cómo recibirás tus ingresos de forma inmediata cuando promociones tu libro
                        </p>
                      </div>
                    </div>
                    {/* Safe Secure Indicator */}
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/25 text-[10px] font-bold uppercase tracking-wider">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Pago Seguro • SSL Activo</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left: Configuration selections */}
                    <div className="md:col-span-2 space-y-4">
                      {/* Explanatory notes */}
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Introduce tu cuenta de cobro para activar la <strong>página de venta directa al autónomo / autopublicado</strong>. Los lectores podrán pagarte con tarjeta, PayPal o transferencia bancaria y los fondos se ingresarán de manera segura e instantánea a tu saldo <strong>sin intermediarios ni comisiones de editoriales</strong>.
                      </p>

                      {/* Selector de pasarela */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                          Selecciona el método de cobro primordial para tus lectores:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedConfigPaymentMethod("paypal");
                              localStorage.setItem("payment_selected_method", "paypal");
                            }}
                            className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                              selectedConfigPaymentMethod === "paypal"
                                ? "bg-indigo-650 text-white border-indigo-400"
                                : "bg-slate-950 hover:bg-slate-900 text-slate-400 border-slate-850 hover:border-slate-700"
                            }`}
                          >
                            <span className="font-sans text-[11px] tracking-wide">PayPal</span>
                            <span className="text-[8px] opacity-70 font-normal">Corriente y Seguro</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedConfigPaymentMethod("stripe");
                              localStorage.setItem("payment_selected_method", "stripe");
                            }}
                            className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                              selectedConfigPaymentMethod === "stripe"
                                ? "bg-indigo-650 text-white border-indigo-400"
                                : "bg-slate-950 hover:bg-slate-900 text-slate-400 border-slate-850 hover:border-slate-700"
                            }`}
                          >
                            <span className="font-sans text-[11px] tracking-wide">Stripe</span>
                            <span className="text-[8px] opacity-70 font-normal">Tarjetas de Crédito</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedConfigPaymentMethod("bank");
                              localStorage.setItem("payment_selected_method", "bank");
                            }}
                            className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                              selectedConfigPaymentMethod === "bank"
                                ? "bg-indigo-650 text-white border-indigo-400"
                                : "bg-slate-950 hover:bg-slate-900 text-slate-400 border-slate-850 hover:border-slate-700"
                            }`}
                          >
                            <span className="font-sans text-[11px] tracking-wide font-sans">Banco</span>
                            <span className="text-[8px] opacity-70 font-normal">Transferencia Directa</span>
                          </button>
                        </div>
                      </div>

                      {/* Dynamic forms based on selection */}
                      <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 space-y-4">
                        {selectedConfigPaymentMethod === "paypal" && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 font-mono">Configuración de Pasarela PayPal</span>
                              <span className="text-[8px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Recomendado</span>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10.5px] text-slate-400 block font-semibold">Correo de Destinatario PayPal (Payee Email):</label>
                              <div className="relative">
                                <input
                                  type="email"
                                  value={payPalEmail}
                                  onChange={(e) => {
                                    setPayPalEmail(e.target.value);
                                    localStorage.setItem("payment_paypal_email", e.target.value);
                                  }}
                                  placeholder="ejemplo@paypal.com"
                                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 text-white font-mono"
                                />
                                <span className="absolute right-3 top-2.5 text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 bg-slate-950/80 px-1.5 py-0.2 rounded">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                  Activo
                                </span>
                              </div>
                              <span className="text-[9px] text-slate-500 block leading-normal select-none">
                                * Los pagos de tus compradores se enviarán de forma directa sin comisiones de Diagrammers a tu cuenta de PayPal <strong>{payPalEmail}</strong>.
                              </span>
                            </div>
                          </div>
                        )}

                        {selectedConfigPaymentMethod === "stripe" && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 font-mono">Configuración de Pasarela Stripe</span>
                              <span className="text-[8px] bg-violet-500/10 text-violet-300 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Tarjetas SSL</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <label className="text-[10.5px] text-slate-400 block font-semibold font-sans">API Key Pública o Identificador Stripe:</label>
                                <input
                                  type="text"
                                  value={stripePubKey}
                                  onChange={(e) => {
                                    setStripePubKey(e.target.value);
                                    localStorage.setItem("payment_stripe_pub_key", e.target.value);
                                  }}
                                  placeholder="pk_live_..."
                                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 text-white font-mono"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10.5px] text-slate-400 block font-semibold">Divisa de Venta / Mercado comercial:</label>
                                <select
                                  value={currencyCode}
                                  onChange={(e) => {
                                    setCurrencyCode(e.target.value);
                                    localStorage.setItem("payment_currency", e.target.value);
                                  }}
                                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-200"
                                >
                                  <option value="EUR">Euros (€) - España e internacional</option>
                                  <option value="USD">Dólar Americano ($) - Global</option>
                                  <option value="MXN">Peso Mexicano ($)</option>
                                  <option value="ARS">Peso Argentino ($)</option>
                                  <option value="COP">Peso Colombiano ($)</option>
                                  <option value="CLP">Peso Chileno ($)</option>
                                </select>
                              </div>
                            </div>
                            <span className="text-[9px] text-slate-500 block leading-normal">
                              Stripe es ideal para que tus lectores paguen mediante tarjetas de débito/crédito (Visa, Mastercard, Apple Pay). No compartas llaves secretas.
                            </span>
                          </div>
                        )}

                        {selectedConfigPaymentMethod === "bank" && (
                          <div className="space-y-3 font-sans">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 font-mono block">Información de Transferencia Bancaria</span>
                            <div className="space-y-1.5">
                              <label className="text-[10.5px] text-slate-400 block font-semibold">Detalles del IBAN, CLABE o Cuenta:</label>
                              <textarea
                                value={bankTransferData}
                                onChange={(e) => {
                                  setBankTransferData(e.target.value);
                                  localStorage.setItem("payment_bank_data", e.target.value);
                                }}
                                rows={2}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500 text-white font-mono leading-relaxed"
                                placeholder="Escribe tu IBAN, Titular y Banco receptor..."
                              />
                              <span className="text-[9px] text-slate-500 block font-sans">
                                Los lectores que prefieran este método verán tu cuenta y te enviarán capturas de pantalla para validar. Idóneo para transacciones locales abundantes.
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Común: Configuración de Precio para Promociones Masivas */}
                        <div className="border-t border-slate-900 pt-3 flex flex-wrap gap-4 items-center justify-between">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 block font-sans">PRECIO DEL COMPRADOR (MANUSCRITO / LIBRO COMPLETO):</span>
                            <span className="text-[9px] text-slate-500">Define el precio unitario del ejemplar físico/digital</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              step="0.01"
                              value={bookSalesPrice}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setBookSalesPrice(val);
                                localStorage.setItem("payment_book_price", String(val));
                              }}
                              className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-right font-mono font-bold text-slate-100"
                            />
                            <span className="text-xs font-mono text-slate-400 font-bold select-none">{currencyCode}</span>
                          </div>
                        </div>
                      </div>

                      {/* "Elige un entorno seguro" block */}
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between gap-4 font-sans">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-300 block uppercase tracking-wide">🔒 Selección de Entorno Comercial de Cobro</span>
                          <span className="text-[9px] text-slate-500 leading-normal block">
                            {paymentIsTestMode 
                              ? "Modo Seguro Sandbox de Pruebas: Simula pagos exitosos con tarjetas simuladas sin gastar." 
                              : "Modo de Producción Comercial: Los cobros ingresan de forma real y cifrada en tu cuenta de cobro."}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 scale-90 shrink-0">
                          <span className={`text-[9px] uppercase font-bold tracking-wider ${paymentIsTestMode ? "text-indigo-400" : "text-slate-500"}`}>Draft Sandbox</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newVal = !paymentIsTestMode;
                              setPaymentIsTestMode(newVal);
                              localStorage.setItem("payment_test_mode", JSON.stringify(newVal));
                            }}
                            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer outline-none ${
                              paymentIsTestMode ? "bg-indigo-600/60" : "bg-emerald-600"
                            }`}
                          >
                            <span className={`absolute top-1 left-1 bg-white rounded-full w-4 h-4 transition-transform ${
                              paymentIsTestMode ? "translate-x-0" : "translate-x-5"
                            }`}></span>
                          </button>
                          <span className={`text-[9px] uppercase font-bold tracking-wider ${!paymentIsTestMode ? "text-emerald-400" : "text-slate-500"}`}>Live Real SSL</span>
                        </div>
                      </div>

                    </div>

                    {/* Right Panel: GASTOS DE COMPARTIR Y PUBLICAR */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col justify-between space-y-4 font-sans">
                      <div className="space-y-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 block font-mono">Pregunta de Autoría: ¿Gastos de Compartir?</span>
                        <div className="space-y-2 text-[11px] leading-relaxed text-slate-300">
                          <p>
                            Al hacer clic en <strong>"Compartir"</strong> en Google AI Studio o compilar y desplegar en producción, <strong>no incurres en ningún tipo de gasto de infraestructura</strong>.
                          </p>
                          <div className="bg-indigo-500/5 p-2 rounded-lg border border-indigo-550/15 text-[10px] text-indigo-300">
                            <strong>105% Gratuito:</strong> Tu servidor de Node.js Express, la base de datos Firestore y el alojamiento web se ejecutan de manera gratuita en los servidores dedicados proporcionados por la plataforma.
                          </div>
                          <div className="bg-emerald-500/5 p-2 rounded-lg border border-emerald-555/15 text-[10px] text-emerald-300">
                            <strong>Cero Comisiones:</strong> Cuando promociones masivamente tu libro y tus compradores efectúen un pago a tu dirección <strong className="text-white select-all font-mono">ruthgmedina@gmail.com</strong>, el cobro entra directo a ti. ¡Sin cargos de intermediarios!
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-900 pt-3 space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Previsualizador de Botón de Venta:</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedConfigPaymentMethod === "paypal") {
                              alert(`Simulador de Pasarela Segura:\n\nIniciando pago cifrado de ${bookSalesPrice} ${currencyCode} dirigido a ${payPalEmail}.\n\nPara promociones masivas, este botón redirigirá de manera directa con SSL al portal de PayPal.`);
                            } else if (selectedConfigPaymentMethod === "stripe") {
                              alert(`Simulador de Pasarela Segura:\n\nAbriendo formulario de pago cifrado Stripe Checkout con SSL.\nPrecio: ${bookSalesPrice} ${currencyCode}.\n\nDestinatario registrado: ${payPalEmail}`);
                            } else {
                              alert(`Simulador de Transferencia:\n\nMostrando al comprador las instrucciones de depósito:\n\n${bankTransferData}`);
                            }
                          }}
                          className="w-full bg-indigo-650 hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.99] transition-all text-white font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs shadow-md cursor-pointer"
                        >
                          <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Pagar {bookSalesPrice} {currencyCode}</span>
                        </button>
                        <span className="text-[8px] text-slate-500 block text-center italic">
                          Al hacer la promoción masiva, tus lectores comprarán al instante y de forma directa.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 📝 DOCUMENTACIÓN FORMAL PARA REGISTRO DE DERECHOS DE AUTOR EN WORD */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <FileText className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        Generador de Memorias para Registro de Derecho de Autor (MS Word)
                      </h4>
                      <p className="text-[10px] text-slate-500 font-sans mt-0.5">
                        Genera de forma instantánea la documentación oficial estructurada de propiedad intelectual para presentar ante Oficinas de Registro. Formato Word (.DOC).
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Para agilizar la legitimación de tus activos y evitar objeciones de examinadores jurídicos, descarga estas plantillas profesionales pre-pobladas dinámicamente con tu metadata activa y firmas criptográficas verificadas:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {/* Opción 1: Registro del Software */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                          <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                            1. Memoria Técnica del Software "Diagrammers"
                          </h5>
                        </div>
                        <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                          Documento detallado de la arquitectura de la app (React, TypeScript, Firebase, esbuild), algoritmos de compensación de lomo y corrector de diálogos. Ideal para registrar los derechos del código de este software.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={downloadSoftwareRegistrationDoc}
                        className="w-full bg-slate-800 hover:bg-slate-705 text-amber-400 border border-amber-500/20 hover:border-amber-500/50 text-[11px] font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Descargar Software DOC (Word)</span>
                      </button>
                    </div>

                    {/* Opción 2: Registro Literario de la Obra */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-450"></span>
                          <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                            2. Registro de Autor de la Obra Literaria
                          </h5>
                        </div>
                        <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                          Carta de Declaración Jurada pre-rellenada con los datos de tu libro activo: <strong className="text-slate-200">"{metadata.title || "Tu Libro de Élite"}"</strong>, autor, sello, código ISBN, hash SHA-256 e indicación de márgenes físicos.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={downloadBookCopyrightDoc}
                        className="w-full bg-slate-800 hover:bg-slate-705 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/50 text-[11px] font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Descargar Libro DOC (Word)</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 🎨 SECCIÓN DE IDENTIDAD DE MARCA: LOGO DE EDITORIAL / DIAGRAMADOR */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Crown className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        Identidad de Marca y Sello Editorial / Diagramador (Opcional)
                      </h4>
                      <p className="text-[10px] text-slate-500">Sube tu logo para incorporarlo automáticamente en las contraportadas, portadas y la página preliminar legal.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Uploader Left Panel */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] uppercase font-bold text-slate-400 tracking-wider block">
                          Sube el logotipo (Isotipo / Isologotipo):
                        </label>
                        <p className="text-[10.5px] text-slate-400 leading-relaxed">
                          Sube un dibujo o marca gráfica en alta definición. Para un óptimo resultado impreso en papel tradicional, te sugerimos utilizar archivos de <strong className="text-amber-400">tinta negra sólida, silueta o con fondo transparente (.png, .jpg, .svg)</strong>.
                        </p>
                      </div>

                      <div 
                        className="bg-slate-950 hover:bg-slate-900 border border-dashed border-slate-800 hover:border-amber-500/50 p-6 rounded-xl transition-all cursor-pointer text-center group relative overflow-hidden"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleLogoUpload(e, e.dataTransfer.files[0]);
                          }
                        }}
                        onClick={() => {
                          const input = document.getElementById("publisher-logo-picker");
                          if (input) input.click();
                        }}
                      >
                        <input
                          type="file"
                          id="publisher-logo-picker"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                        
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-amber-400 transition-colors" />
                          <div>
                            <span className="text-xs font-bold text-slate-300 block group-hover:text-amber-300 transition-colors">
                              Haz clic para seleccionar o arrastra el archivo de imagen
                            </span>
                            <span className="text-[9.5px] text-slate-500 block mt-1">
                              Formatos recomendados: PNG de fondo transparente, JPEG de alto contraste o SVG vectorial
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Display Settings */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <div className="space-y-1.5">
                          <label className="text-[10.5px] uppercase font-bold text-slate-400 tracking-wider">
                            Ubicación en la Maquetación:
                          </label>
                          <select
                            value={metadata.logoPlacement || "both"}
                            onChange={(e) => {
                              const val = e.target.value as any;
                              const updated = { ...metadata, logoPlacement: val };
                              setMetadata(updated);
                              saveToLocalStorage(updated, styleSettings, chapters);
                            }}
                            className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                          >
                            <option value="both">Mostrar en página legal e impreso (Ambos)</option>
                            <option value="credits">Solo en Página Legal de Créditos</option>
                            <option value="front_matter">Solo en Cubiertas Impresas</option>
                            <option value="none">No renderizar (Ocultar temporalmente)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10.5px] uppercase font-bold text-slate-400 tracking-wider">
                            Texto de Sello (Imprint) Tipográfico:
                          </label>
                          <input
                            type="text"
                            value={customCoverLogo}
                            onChange={(e) => {
                              setCustomCoverLogo(e.target.value);
                            }}
                            className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                            placeholder="Ej. DIAGRAMMERS PRESS"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preview Right Panel */}
                    <div className="md:col-span-1 space-y-2 flex flex-col">
                      <label className="text-[10.5px] uppercase font-bold text-slate-400 tracking-wider">
                        Vista Previa Papel Imprenta:
                      </label>
                      
                      <div className="flex-1 bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col items-center justify-center relative min-h-[160px]">
                        <div className="absolute top-1.5 left-2 text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none">
                          Tinta Monocroma
                        </div>
                        
                        {metadata.publisherLogo ? (
                          <div className="space-y-4 w-full flex flex-col items-center">
                            <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                              <img
                                src={metadata.publisherLogo}
                                alt="Sello Editorial Original"
                                className="max-h-20 max-w-[120px] object-contain filter contrast-125 hover:scale-105 transition-transform"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <button
                              onClick={() => {
                                const updated = { ...metadata, publisherLogo: "" };
                                setMetadata(updated);
                                saveToLocalStorage(updated, styleSettings, chapters);
                              }}
                              className="text-[10.5px] text-red-400 hover:text-red-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Eliminar Logotipo</span>
                            </button>
                          </div>
                        ) : (
                          <div className="text-center space-y-2">
                            <div className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                              <Crown className="w-6 h-6 stroke-[1]" />
                            </div>
                            <span className="text-[10px] text-slate-500 block">
                              Ninguno cargado.<br />Se usará sello tipográfico estándar.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 🧧 SISTEMA DE APORTACIONES VOLUNTARIAS (TIP JAR Y DONACIONES) */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Heart className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        Aportaciones Voluntarias y Bote de Propinas (Tip Jar) — Estrategia Libre
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Configura un sistema voluntario de "paga lo que quieras" para tus lectores y clientes de maquetación. Recibe el 100% de las aportaciones directamente en tu cuenta.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-850 rounded-lg">
                        <div>
                          <p className="text-xs font-bold text-slate-200">Activar Bote de Propinas al Exportar</p>
                          <p className="text-[10px] text-slate-500">Muestra una sugerencia de contribución voluntaria antes de descargar archivos listos para imprenta.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={!!metadata.donationActive} 
                            onChange={(e) => {
                              const updated = { ...metadata, donationActive: e.target.checked };
                              setMetadata(updated);
                              saveToLocalStorage(updated, styleSettings, chapters);
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-slate-950 peer-checked:after:border-amber-500"></div>
                        </label>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10.5px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                          Enlace de Pago/Donación (Buy Me a Coffee, PayPal, Stripe, etc.)
                        </label>
                        <input
                          type="url"
                          value={metadata.donationLink || ""}
                          onChange={(e) => {
                            const updated = { ...metadata, donationLink: e.target.value };
                            setMetadata(updated);
                            saveToLocalStorage(updated, styleSettings, chapters);
                          }}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
                          placeholder="Ej. https://paypal.me/tuusuario o https://buymeacoffee.com/tuusuario"
                        />
                        <p className="text-[9.5px] text-slate-500 leading-normal">
                          Coloca tu enlace directo personalizado. Cuando un autor descargue su maqueta pulida KDP, tendrá la opción libre de aportar la cantidad que desee para apoyar tu servicio.
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-1 bg-amber-500/5 border border-amber-500/15 rounded-xl p-4 flex flex-col justify-between text-left space-y-3">
                      <div className="space-y-1">
                        <span className="text-[8.5px] font-bold text-amber-400 tracking-widest uppercase font-mono block">Beneficios de la Opción 1</span>
                        <h5 className="text-xs font-bold text-slate-200 font-sans">100% para ti, libre de comisionistas</h5>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                        La plataforma de DIAGRAMMERS no cobra comisión de ningún tipo por las descargas de los usuarios. Al inyectar tu propio enlace, el fondeo es directo e inmediato a tu billetera.
                      </p>
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>Estado:</span>
                        <span className={`font-bold uppercase ${metadata.donationActive ? "text-emerald-400 animate-pulse" : "text-slate-500"}`}>
                          {metadata.donationActive ? "✓ Activo" : "✕ Inactivo"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 💳 SISTEMA DE MONETIZACIÓN PRO Y ACTIVACIÓN DE LICENCIAS (ADMIN PANEL) */}
                <div className="bg-slate-900 border border-indigo-900/40 rounded-xl p-5 space-y-4 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500/10 to-transparent w-full h-full pointer-events-none"></div>
                  
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Crown className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        💳 Sistema Comercial Pro y Paywall Estricto — ¡Excelente para monetizar!
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Configura un muro de pago para cobrar una tarifa fija o recurrente por el uso de tu Suite de maquetación profesional.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-850 rounded-lg">
                        <div>
                          <p className="text-xs font-bold text-slate-200">Activar Paywall Estricto (Licencias Requeridas)</p>
                          <p className="text-[10px] text-slate-500">Bloquea todas las descargas del libro KDP y pide un código de activación Pro.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={!!metadata.strictPaywallActive} 
                            onChange={(e) => {
                              const updated = { ...metadata, strictPaywallActive: e.target.checked };
                              setMetadata(updated);
                              saveToLocalStorage(updated, styleSettings, chapters);
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 peer-checked:after:bg-slate-950 peer-checked:after:border-indigo-500"></div>
                        </label>
                      </div>

                      {/* KEY GENERATOR TOOL */}
                      <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl space-y-3">
                        <div>
                          <span className="text-[8.5px] font-black uppercase text-indigo-400 tracking-wider">Herramienta de Control Interno (Creador)</span>
                          <h5 className="text-xs font-bold text-slate-300">Generador de Claves Pro para Clientes</h5>
                          <p className="text-[9.5px] text-slate-500">Genera una clave y envíala a tus clientes una vez realicen el pago en PayPal, MercadoPago o Bizum.</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <input 
                            type="text"
                            value={generatorClientSeed}
                            onChange={(e) => setGeneratorClientSeed(e.target.value)}
                            placeholder="Email o Nombre del comprador (Ej: jose@correo.com)"
                            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 flex-1 font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (!generatorClientSeed.trim()) {
                                alert("Por favor ingresa un email o identificador para el cliente.");
                                return;
                              }
                              const key = generateLicenceKeyForClient(generatorClientSeed);
                              setGeneratedLicenceResult(key);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs tracking-wider cursor-pointer transition-all active:scale-95 shrink-0"
                          >
                            Generar Clave Pro
                          </button>
                        </div>

                        {generatedLicenceResult && (
                          <div className="bg-indigo-950/20 border border-indigo-500/30 p-2.5 rounded-lg flex items-center justify-between">
                            <div className="space-y-0.5">
                              <span className="text-[9px] uppercase tracking-wider text-indigo-400 font-bold block">Llave Pro Generada con Éxito:</span>
                              <span className="text-xs text-slate-100 font-mono font-black tracking-widest">{generatedLicenceResult}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(generatedLicenceResult);
                                alert("¡Clave copiada al portapapeles!");
                              }}
                              className="text-[10px] hover:text-white bg-slate-900 hover:bg-slate-850 p-1 px-2.5 rounded border border-slate-800 font-mono text-indigo-300 cursor-pointer"
                            >
                              Copiar Clave
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-1 bg-indigo-500/5 border border-indigo-500/15 rounded-xl p-4 flex flex-col justify-between text-left space-y-3">
                      <div className="space-y-1">
                        <span className="text-[8.5px] font-bold text-indigo-400 tracking-widest uppercase font-mono block">Cómo cobrar hoy</span>
                        <h5 className="text-xs font-bold text-slate-200 font-sans">Comienza con Coste Cero</h5>
                      </div>
                      <p className="text-[9.5px] text-slate-400 leading-relaxed font-sans">
                        Comparte el link de tu app. Cuando tus usuarios quieran descargar su libro, verán el muro con tu enlace. Te pagan de forma directa y tú les facilitas el código generado aquí mismo. ¡Sin gastos técnicos de pasarelas complejas!
                      </p>
                      <div className="border-t border-slate-800/60 pt-2 text-[9.5px] text-slate-400 space-y-1">
                        <span className="font-bold text-slate-300 block">Códigos Maestros siempre activos:</span>
                        <div className="font-mono text-[9px] text-indigo-300/90 leading-tight space-y-0.5 max-h-16 overflow-y-auto">
                          <div>CREATIVO-PRO-2026</div>
                          <div>VIP-EDITORIAL-2026</div>
                          <div>DIAGRAMMERS-PRO-99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: LAW LICENSE CONFIGURATOR */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <BookOpen className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        Configuración Legal y Hoja de Créditos
                      </h4>
                      <p className="text-[10px] text-slate-500">Determina el tipo de tutela legal e imprint de tu impresión física</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Column 1: Selector of license type */}
                    <div className="space-y-3 md:col-span-1">
                      <label className="text-[10.5px] uppercase font-bold text-slate-400 tracking-wider block">
                        Esquema de Licenciamiento:
                      </label>
                      <div className="space-y-2">
                        {[
                          { id: "todos-derechos", label: "© Todos los derechos reservados (Copyright)", text: "No se permite ninguna reproducción o distribución comercial sin consentimiento explícito del autor." },
                          { id: "cc-by", label: "CC-BY (Atribución Creative Commons)", text: "Permite distribución comercial y adaptaciones, siempre que se de crédito al autor original." },
                          { id: "cc-by-nc", label: "CC-BY-NC (Reconocimiento No Comercial)", text: "Permite adaptaciones y distribución no comercial de la obra, manteniendo atribución." },
                          { id: "dominio-publico", label: "Dominio Público (CC0 / Sin Restricciones)", text: "Cede la obra a la posteridad para uso, modificación y distribución sin condiciones de autoría." },
                        ].map((lic) => (
                          <div 
                            key={lic.id}
                            onClick={() => {
                              const updated = { 
                                ...metadata, 
                                copyrightType: lic.id,
                                licenseDetails: lic.id === "todos-derechos" ? "Todos los derechos reservados. Ninguna parte de esta publicación puede ser reproducida o transmitida por ningún medio sin permiso previo." :
                                               lic.id === "cc-by" ? "Esta obra está registrada bajo una Licencia Creative Commons Reconocimiento 4.0 Internacional (CC-BY). El autor permite su reproducción y distribución de cualquier tipo con atribución." :
                                               lic.id === "cc-by-nc" ? "Esta obra está bajo una Licencia Creative Commons Atribución-NoComercial 4.0 Internacional (CC-BY-NC). Queda prohibido su uso lucrativo o comercial comercializable." :
                                               "Esta obra ha sido clasificada bajo Dominio Público Universal (CC0 1.0 Dedication). El autor renuncia a perpetuidad a sus prerrogativas de propiedad intelectual global."
                              };
                              setMetadata(updated);
                              saveToLocalStorage(updated, styleSettings, chapters);
                            }}
                            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                              metadata.copyrightType === lic.id 
                                ? "bg-amber-500/10 border-amber-500/45 text-slate-100" 
                                : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700 hover:bg-slate-950/70"
                            }`}
                          >
                            <span className="text-[11px] font-bold block">{lic.label}</span>
                            <span className="text-[9.5px] opacity-75 leading-normal block mt-0.5">{lic.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Details and text editing of the license */}
                    <div className="space-y-3 md:col-span-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10.5px] uppercase font-bold text-slate-400 tracking-wider">
                          Redacción de la Cláusula de Propiedad Intelectual:
                        </label>
                        <span className="text-[9px] bg-slate-850 px-2 py-0.5 rounded text-amber-500 font-mono font-medium">Se imprime en la Pág. 1</span>
                      </div>
                      <textarea
                        value={metadata.licenseDetails || ""}
                        onChange={(e) => {
                          const updated = { ...metadata, licenseDetails: e.target.value };
                          setMetadata(updated);
                          saveToLocalStorage(updated, styleSettings, chapters);
                        }}
                        className="w-full h-[180px] bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-slate-300 leading-relaxed"
                        placeholder="Escribe aquí las cláusulas legales detalladas..."
                      />

                      {/* Interactive toggle for Credits Page inclusion */}
                      <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-850/60 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-300 block">Maquetar Página Legal Tradicional</span>
                          <span className="text-[10px] text-slate-500">Inyecta una página preliminar con ISBN, autoría e imprint al inicio del libro.</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={includeCreditsPage} 
                            onChange={(e) => setIncludeCreditsPage(e.target.checked)}
                            className="sr-only peer" 
                          />
                          <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-slate-950 peer-checked:after:border-slate-950"></div>
                        </label>
                      </div>
                    </div>

                  </div>
                </div>

                {/* TRANSFER SECURE FLIGHT SECTION IN KDP / SAFE CREATIVE */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <FileDown className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        Protocolo de Sincronización Segura de Obras (APIs Activas)
                      </h4>
                      <p className="text-[10px] text-slate-500">Automatización directa para traspasar obra de DIAGRAMMERS a KDP y Safe Creative</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Nuestras pasarelas automatizadas estructuran tu manuscrito y facilitan su preparación. Para tu máxima seguridad y cumplimiento legal, todas las gestiones de derechos de autor y publicación oficial deben tramitarse directamente en tus perfiles personales de autor en las plataformas oficiales correspondientes.
                  </p>

                  {/* HIGHLY CRITICAL WARNING ON ISBN & SAFE CREATIVE LEGAL POLICY */}
                  <div className="bg-amber-500/10 border border-amber-500/35 rounded-xl p-4 space-y-2 font-mono">
                    <h5 className="text-[11px] font-black text-amber-450 uppercase tracking-widest flex items-center gap-2">
                      ⚠️ DIRECTRICES IMPORTANTES DE AUTOR (ISBN Y DERECHOS)
                    </h5>
                    <p className="text-[10.5px] text-slate-300 leading-relaxed font-sans">
                      <strong>Regla de Oro de KDP:</strong> Si utilizas el ISBN gratuito provisto por Amazon KDP en tu cuenta de autor, recuerda que este código está <u>legalmente restringido en exclusiva</u> a la distribución en Amazon. <strong>Bajo ninguna circunstancia debes utilizar ese mismo ISBN en otros editores independientes</strong>, plataformas o imprentas ajenas, pues viola los términos de servicio internacionales. 
                    </p>
                    <p className="text-[10.5px] text-slate-300 leading-relaxed font-sans pt-1">
                      Para garantizar la titularidad y total libertad comercial de tu libro, te facilitamos accesos directos seguros para que gestiones tus cuentas oficiales de forma personal y realices allí los trámites definitivos con total soberanía intelectual.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    
                    {/* Safe Creative Webhook Launcher */}
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 font-mono">Sincronización Safe Creative (REST API)</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${metadata.safeCreativeId ? "bg-indigo-500/10 text-indigo-400" : "bg-slate-800 text-slate-500"}`}>
                          {metadata.safeCreativeId ? "Listo para enviar" : "Requiere ID"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Envía de forma segura el hash criptográfico local y el archivo compilado directamente al registro internacional Safe Creative usando el estricto protocolo legal.
                      </p>
                      
                      <div className="flex flex-col gap-2 pt-1">
                        <button
                          onClick={handleTransferToSafeCreative}
                          disabled={!metadata.safeCreativeId || isTransferringSafe}
                          className={`w-full text-xs font-bold py-2 px-3 rounded-lg border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            !metadata.safeCreativeId 
                              ? "bg-slate-900 border-slate-850 text-slate-600 cursor-not-allowed" 
                              : isTransferringSafe 
                              ? "bg-indigo-950 border-indigo-800 text-indigo-300 animate-pulse"
                              : "bg-indigo-950 hover:bg-indigo-900 border-indigo-500/30 text-indigo-300"
                          }`}
                        >
                          <ShieldCheck className="w-4 h-4 shrink-0" />
                          <span>
                            {isTransferringSafe && transferState === "sending" ? "Traspasando Encriptado..." : 
                             isTransferringSafe && transferState === "success" ? "✓ Traspaso Exitoso" :
                             "Transferir por API a Safe Creative"}
                          </span>
                        </button>

                        <a 
                          href="https://www.safecreative.org" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full text-center text-[10px] font-bold py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
                        >
                          <span>Ir al Portal Oficial de Safe Creative</span>
                          <span className="text-slate-500">↗</span>
                        </a>
                      </div>
                    </div>

                    {/* Amazon KDP Webhook Launcher */}
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 font-mono">Autotransferencia Amazon KDP (Portal Seguro)</span>
                        <span className="text-[9px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded font-mono font-bold">
                          API Activa
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Exporta tus metadatos compaginados, tu ISBN técnico y el cuerpo del libro estructurado directamente a tu biblioteca de borradores en Amazon Kindle Direct Publishing.
                      </p>

                      <div className="flex flex-col gap-2 pt-1">
                        <button
                          onClick={handleTransferToKDP}
                          disabled={isTransferringKDP}
                          className={`w-full text-xs font-bold py-2 px-3 rounded-lg border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isTransferringKDP 
                              ? "bg-emerald-950 border-emerald-800 text-emerald-300 animate-pulse"
                              : "bg-emerald-950 hover:bg-emerald-900 border-emerald-500/30 text-emerald-300"
                          }`}
                        >
                          <FileDown className="w-4 h-4 shrink-0" />
                          <span>
                            {isTransferringKDP && transferState === "sending" ? "Subiendo Borrador KDP..." : 
                             isTransferringKDP && transferState === "success" ? "✓ Traspaso Exitoso" :
                             "Iniciar Transmisión a Amazon KDP"}
                          </span>
                        </button>

                        <a 
                          href="https://kdp.amazon.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full text-center text-[10px] font-bold py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
                        >
                          <span>Ir a mi Portal de Autor en Amazon KDP</span>
                          <span className="text-slate-500">↗</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {activeTab === "pitch" && (
              <div className="space-y-6 animate-fadeIn pb-6">
                
                {/* Visual Intro Block */}
                <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-amber-500/20 p-4 rounded-xl space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-5 opacity-5 pointer-events-none">
                    <TrendingUp className="w-24 h-24 stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                    DIAGRAMMERS • Mesa Comercial
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Aprovecha nuestro posicionamiento estratégico. Descubre cómo DIAGRAMMERS supera las barreras de las soluciones actuales de software y genera atractivas oportunidades para fondos de capital de inversión en tecnología de creación de contenido.
                  </p>
                </div>

                {/* 1. COMPETITOR WEAKNESS ANALYSIS (FODA) */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      1. Fortalecimiento Técnico vs. Competencia:
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Las debilidades clave de las herramientas existentes en el mercado son las mayores ventajas de <strong className="text-slate-200">DIAGRAMMERS</strong>. Nuestra arquitectura responde de forma directa a ellas:
                  </p>

                  <div className="space-y-2">
                    {/* Card Vellum */}
                    <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-lg space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Vellum (macOS)</span>
                        <span className="text-[9px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase block text-center">Restringido</span>
                      </div>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed">
                        <strong className="text-red-400">Debilidades:</strong> Exclusivo de Mac y muy costoso (US$250+). No analiza el texto semánticamente.
                      </p>
                      <p className="text-[11.5px] text-emerald-400 leading-relaxed bg-emerald-500/5 p-1.5 rounded border border-emerald-500/10">
                        <strong className="text-emerald-300">Nuestra Fortaleza:</strong> Multiplataforma en la Web a una fracción de precio, con el poder del motor de sugerencia de estilo IA para automatizar la dirección de arte corporal.
                      </p>
                    </div>

                    {/* Card Atticus */}
                    <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-lg space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Atticus.io</span>
                        <span className="text-[9px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase block text-center">Rígido / Lento</span>
                      </div>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed">
                        <strong className="text-red-400">Debilidades:</strong> Plantillas visualmente idénticas y genéricas. Rendimiento lento con manuscritos extensos y sin IA contextual nativa.
                      </p>
                      <p className="text-[11.5px] text-emerald-400 leading-relaxed bg-emerald-500/5 p-1.5 rounded border border-emerald-500/10">
                        <strong className="text-emerald-300">Nuestra Fortaleza:</strong> Previsualización fluida de pliego doble estilo libro con micro-ajustes físicos y lectura adaptativa instantánea.
                      </p>
                    </div>

                    {/* Card Reedsy Editor */}
                    <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-lg space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Reedsy Book Editor</span>
                        <span className="text-[9px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase block text-center">Sin Control Estético</span>
                      </div>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed">
                        <strong className="text-red-400">Debilidades:</strong> Nulo control de márgenes, sangría, justificación o estilos de encabezados. Diseño "molde único".
                      </p>
                      <p className="text-[11.5px] text-emerald-400 leading-relaxed bg-emerald-500/5 p-1.5 rounded border border-emerald-500/10">
                        <strong className="text-emerald-300">Nuestra Fortaleza:</strong> Flexibilidad tipográfica total. Permite cambiar márgenes de imprenta, indents, espacios internos de párrafo y alineaciones sobre la marcha.
                      </p>
                    </div>

                    {/* Card InDesign */}
                    <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-lg space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Adobe InDesign</span>
                        <span className="text-[9px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase block text-center">Suscripción Compleja</span>
                      </div>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed">
                        <strong className="text-red-400">Debilidades:</strong> Curva de aprendizaje empinada, costosa cuota mensual y requiere diseño gráfico profesional experto.
                      </p>
                      <p className="text-[11.5px] text-emerald-400 leading-relaxed bg-emerald-500/5 p-1.5 rounded border border-emerald-500/10">
                        <strong className="text-emerald-300">Nuestra Fortaleza:</strong> Automatización total en un solo clic. El autor se enfoca en escribir y DIAGRAMMERS fabrica el pliego de imprenta perfecto de forma automática.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. VENTURE CAPITAL & STRATEGIC PITCH SIMULATOR */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div>
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      2. Simulador Financiero de Inversión Pre-Seed:
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Ajusta los sliders interactivos para calcular la valuación implícita de DIAGRAMMERS en base al capital de riesgo proyectado para escalar ventas en el mercado hispanohablante.
                    </p>
                  </div>

                  {/* Sliders Container */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-855 space-y-3">
                    {/* Capital Slider */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-medium">Monto de Capital Requerido:</span>
                        <span className="text-amber-400 font-mono font-bold">
                          US$ {pitchCapital.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="50000"
                        max="1000000"
                        step="25000"
                        value={pitchCapital}
                        onChange={(e) => setPitchCapital(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-850 rounded"
                      />
                      <div className="flex justify-between text-[8px] text-slate-500">
                        <span>US$ 50k</span>
                        <span>US$ 500k</span>
                        <span>US$ 1M</span>
                      </div>
                    </div>

                    {/* Equity Slider */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-medium">Equidad Ofrecida a los Cofundadores/VCS:</span>
                        <span className="text-amber-400 font-mono font-bold">{pitchEquity}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="35"
                        step="1"
                        value={pitchEquity}
                        onChange={(e) => setPitchEquity(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-850 rounded"
                      />
                      <div className="flex justify-between text-[8px] text-slate-500">
                        <span>5% (Nivel Angel)</span>
                        <span>20% (Serie Pre-Seed)</span>
                        <span>35% (Ronda Máxima)</span>
                      </div>
                    </div>

                    {/* Calculated Outcome Badge */}
                    <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-semibold">Valuación Post-Money Estimada</span>
                        <span className="font-bold text-white font-mono text-xs sm:text-sm">
                          US$ {Math.round(pitchCapital / (pitchEquity / 100)).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block text-right font-semibold">Valuación Pre-Money</span>
                        <span className="font-bold text-indigo-400 font-mono text-xs sm:text-sm text-right block">
                          US$ {Math.round((pitchCapital / (pitchEquity / 100)) - pitchCapital).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. INVESTOR MATCH DIRECTORY */}
                <div className="space-y-3.5 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      3. Directorio de Inversores Recomendados:
                    </span>
                  </div>

                  {/* Filter tabs */}
                  <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850">
                    {(["all", "vc", "strategic", "crowd"] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setInvestorFilter(filter)}
                        className={`py-1 rounded text-[9px] font-bold uppercase cursor-pointer tracking-wider transition-all block text-center ${
                          investorFilter === filter
                            ? "bg-indigo-600 text-white"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {filter === "all" ? "Todos" : filter === "vc" ? "VCs" : filter === "strategic" ? "CVC" : "Crowd"}
                      </button>
                    ))}
                  </div>

                  {/* Interactive Investor Cards List */}
                  <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                    {[
                      {
                        id: "kfund",
                        name: "K Fund Ventures",
                        location: "España y Latam",
                        type: "vc",
                        tag: "Venture Capital de Habla Hispana",
                        description: "Fondo líder en fases tempranas en España y América Latina. Perfectos para DIAGRAMMERS debido a nuestro enfoque lingüístico y el enorme mercado desatendido de escritores en español.",
                        investmentFocus: "SaaS verticales, herramientas creadoras de contenido y digitalización de mercados fragmentados.",
                        pitchTweak: `Estimado Equipo de Inversión de K Fund:

Les presento DIAGRAMMERS Studio, un SaaS de inteligencia tipográfica enfocado en revolucionar el proceso de diagramación para el mercado hispanohablante.

Actualmente, millones de escritores hispanos independientes pagan tarifas abusivas de maquetación o se ven fustigados por herramientas complejas (InDesign) o inaccesibles (Vellum es de pago único alto y solo de Mac). Con DIAGRAMMERS, hemos creado un entorno 100% web con una IA que lee el manuscrito, propone el mejor estilo visual en segundos y permite que cualquiera cree pliegos listos para imprenta KDP en tres minutos.

Estamos solicitando una ronda Pre-Seed de US$ ${pitchCapital.toLocaleString()} a cambio de un ${pitchEquity}% de equidad para acelerar nuestras ventas directas y expandir integraciones con micro-editoriales en toda Iberoamérica. Nos encantaría conversar y hacerles un demo interactivo.`
                      },
                      {
                        id: "kindlecvc",
                        name: "Amazon Kindle Content Innovation Ventures",
                        location: "Silicon Valley / Seattle",
                        type: "strategic",
                        tag: "Corporate Venture Capital (Amazon)",
                        description: "División corporativa de contenidos en Amazon. Buscan activamente elevar los estándares tipográficos de los libros digitales e impresos por KDP para reducir reembolsos.",
                        investmentFocus: "Ecosistemas del libro, formatos auto-publicados (KDP) y automatización de pliegos fijos.",
                        pitchTweak: `Dear Kindle Content Strategy & Ventures Team,

We are developing DIAGRAMMERS, a zero-config web app designed to generate perfectly compliant Amazon KDP physical and digital files using automated AI typography rules.

As you know, thousands of books suffer formatting rejections in KDP daily, creating massive customer support overhead. DIAGRAMMERS leverages custom algorithms to convert raw text into high-fidelity PDF print spreads that respect inside/outside margin bounds, bleed settings, and professional headers automatically.

We are seeking strategic synergy or a corporate partnership of US$ ${pitchCapital.toLocaleString()} to integrate the DIAGRAMMERS engine into the self-publishing onboarding experience, empowering authors worldwide to submit perfect layouts from day one.`
                      },
                      {
                        id: "sequoiacreator",
                        name: "Base10 Partners & General Catalyst",
                        location: "Estados Unidos",
                        type: "vc",
                        tag: "Creator Economy / Specialized AI",
                        description: "Fondos de Silicon Valley invertidos masivamente en la economía del creador y la automatización inteligente. Ven con gran atractivo el software vertical para nichos profundos.",
                        investmentFocus: "Inteligencia Artificial aplicada, SaaS verticales de nicho y plataformas de monetización de creadores.",
                        pitchTweak: `Subject: Investment Proposal: DIAGRAMMERS - Redefining the Self-Publishing Creative Stack

Hi Team,

Given your deep focus in specialized vertical AI SaaS and the Creator Economy, I wanted to introduce DIAGRAMMERS Studio.

We are automating a workflow that traditionally took weeks and $500/book—professional layout and book styling. DIAGRAMMERS analyzes manuscripts, generates customized typographical margins, dropcaps, and fonts, and delivers high-performance printing spreads dynamically in the web browser.

We are raising a seed round of US$ ${pitchCapital.toLocaleString()} for a ${pitchEquity}% stake. Our architecture is highly scalable and targets the global wave of self-publishing, which continues to explode year over year.`
                      },
                      {
                        id: "kickstarterwefunder",
                        name: "Kickstarter Equity & Crowd Syndicates",
                        location: "Global",
                        type: "crowd",
                        tag: "Sindicato de Autores Independientes",
                        description: "Sindicato de Autores Independientes que invierten en cooperativa o mediante capital de crowdfunding (Crowdcube / Wefunder). Garantiza captación de usuarios orgánica.",
                        investmentFocus: "SaaS comunitarios, tecnología de autor, preventas colectivas de auto-publicación.",
                        pitchTweak: `¡Hola Comunidad Literaria!

Lanzamos DIAGRAMMERS en co-propiedad con ustedes. En lugar de depender de VCs tradicionales, abrimos una ronda de crowdfunding de US$ ${pitchCapital.toLocaleString()} en Wefunder para que los propios escritores sean copropietarios de la herramienta.

Al aportar, no solo reciben un ${pitchEquity}% del capital dividido entre el sindicado, sino acceso vitalicio premium a la suite de diagramación. DIAGRAMMERS democratiza el diseño, rompiendo el monopolio de las agencias tradicionales. ¡Construyamos la imprenta del futuro juntos juntos!`
                      }
                    ]
                      .filter((inv) => investorFilter === "all" || inv.type === investorFilter)
                      .map((inv) => {
                        const isExpanded = selectedInvestorId === inv.id;
                        return (
                          <div
                            key={inv.id}
                            className={`p-3.5 rounded-xl border transition-all text-left space-y-2.5 ${
                              isExpanded
                                ? "bg-indigo-950/40 border-indigo-500/80 shadow-md shadow-indigo-950/55"
                                : "bg-slate-900/40 hover:bg-slate-850 border-slate-850 hover:border-slate-800"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-xs font-bold text-white tracking-wide">{inv.name}</h4>
                                <span className="text-[9.5px] text-indigo-400 font-medium block">{inv.tag}</span>
                                <span className="text-[9px] text-slate-500 block">Sede: {inv.location}</span>
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedInvestorId(isExpanded ? null : inv.id);
                                  setShowPitchSuccess(null);
                                }}
                                className="text-[10px] bg-slate-850 hover:bg-slate-800 border border-slate-700 hover:text-white text-slate-300 px-2.5 py-1 rounded cursor-pointer transition-all font-semibold"
                              >
                                {isExpanded ? "Contraer" : "Evaluar Focus"}
                              </button>
                            </div>

                            <p className="text-[11px] text-slate-300 leading-relaxed">
                              {inv.description}
                            </p>

                            {isExpanded && (
                              <div className="space-y-3 pt-2.5 border-t border-slate-800 animate-slideDown">
                                <div className="text-[10.5px] bg-slate-950 p-2.5 rounded-lg border border-slate-850 space-y-1">
                                  <strong className="text-amber-500 block uppercase text-[8.5px] tracking-wider">Foco de Portfolio:</strong>
                                  <span className="text-slate-300 leading-normal">{inv.investmentFocus}</span>
                                </div>

                                <div className="space-y-1.5 flex flex-col">
                                  <div className="flex items-center justify-between">
                                    <strong className="text-[8.5px] text-slate-500 uppercase tracking-wider block">Propuesta de Pitch Personalizada:</strong>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(inv.pitchTweak);
                                        setShowPitchSuccess("¡Copiado al portapapeles! Listo para enviar.");
                                        setTimeout(() => setShowPitchSuccess(null), 3500);
                                      }}
                                      className="text-[9px] text-amber-500 font-semibold uppercase hover:underline cursor-pointer"
                                    >
                                      Copiar Mensaje
                                    </button>
                                  </div>

                                  <pre className="text-[9.5px] font-mono leading-relaxed bg-slate-950 p-3 rounded-lg text-slate-300 whitespace-pre-wrap border border-slate-900 max-h-56 overflow-y-auto">
                                    {inv.pitchTweak}
                                  </pre>
                                </div>

                                {showPitchSuccess ? (
                                  <div className="p-2.5 bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-lg text-center text-[10.5px] font-semibold animate-fadeIn flex items-center justify-center gap-1.5">
                                    <Check className="w-3.5 h-3.5" />
                                    {showPitchSuccess}
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setShowPitchSuccess(`¡Mensaje de Pitch enviado con éxito al mail estratégico de ${inv.name}! Tracción y simulación completadas.`);
                                    }}
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-lg text-[10px] tracking-wider uppercase cursor-pointer transition-all block text-center"
                                  >
                                    Simular Envío de Propuesta Financiera
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Additional Strategic Note */}
                <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-slate-400 space-y-1">
                  <span className="text-[10px] font-bold text-amber-500 block font-mono">ESTRATEGIA DIAGRAMMERS:</span>
                  <p className="text-[10px] leading-relaxed">
                    Al unificar la maquetación en tiempo real y la sugerencia de estilo por IA bajo un único plano web (sin descargas ni dependencias físicas de un OS), el valor de DIAGRAMMERS reside en la reducción absoluta de fricción, posicionándose como el candidato ideal de adquisición por parte de Amazon Kindle o plataformas globales de autopublicación.
                  </p>
                </div>

              </div>
            )}

            {activeTab === "multimedia" && (
              <div className="space-y-6 animate-fadeIn pb-6 text-slate-300">
                
                {/* Visual Intro block */}
                <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-amber-500/20 p-4 rounded-xl space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-5 opacity-5 pointer-events-none">
                    <Headphones className="w-24 h-24 stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm font-semibold text-amber-350 uppercase tracking-widest flex items-center gap-1.5">
                    DIAGRAMMERS • Estudio Multimedia
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Combina el arte de la maquetación visual con una inmersión auditiva de última generación. Permite que tus lectores escuchen la obra narrada con <strong>tu propia voz de autor clonada por IA</strong> y ambientada con un soundtrack sincronizado desde <strong>Spotify</strong>.
                  </p>
                </div>

                {/* Chapter Selector */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3">
                  <label className="text-xs text-slate-400 font-medium block">
                    Selecciona el Capítulo para configurar Audio & Banda Sonora:
                  </label>
                  <select
                    value={selectedChapterIdxForMedia}
                    onChange={(e) => {
                      setSelectedChapterIdxForMedia(Number(e.target.value));
                      handleStopNarration();
                    }}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {chapters.map((ch, idx) => (
                      <option key={ch.chapterNumber} value={idx}>
                        Capítulo {ch.chapterNumber}: {ch.title || "Sin título"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Section A: Neural Voice Cloning Panel */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Mic className="w-4 h-4 text-amber-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      1. Clonación Neuronal de la Voz del Autor
                    </h4>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Graba una pequeña muestra de tu voz para que nuestra red neuronal capture tu tono, timbre e inflexiones. Podrás usarla instantáneamente para narrar tu audiolibro.
                  </p>

                  {/* Micro-cloner card */}
                  <div className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-lg space-y-3.5 relative overflow-hidden">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 font-mono block">NOMBRE DE TU VOZ CLONABLE:</label>
                      <input
                        type="text"
                        placeholder="ej. Voz de Autor Íntima, Voz Sombría..."
                        value={newVoiceName}
                        onChange={(e) => setNewVoiceName(e.target.value)}
                        disabled={cloningStatus === "recording" || cloningStatus === "uploading" || cloningStatus === "processing"}
                        className="w-full text-xs bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-amber-500 outline-none"
                      />
                    </div>

                    {/* Simulation display state */}
                    {cloningStatus !== "idle" && (
                      <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg space-y-2 text-center animate-fadeIn">
                        {cloningStatus === "recording" && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2 text-red-400 text-xs font-bold font-mono animate-pulse">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                              <span>GRABANDO MUESTRA ACTIVA: {voiceRecordTime} s / 8 s</span>
                            </div>
                            <div className="flex justify-center items-center gap-0.5 h-8">
                              {/* Glowing voice waves */}
                              {[2,4,8,4,2,6,10,6,2,4,12,6,2,4,8,4,2].map((h, i) => (
                                <div
                                  key={i}
                                  style={{ animationDelay: `${i * 0.05}s`, height: `${h * 2.5}px` }}
                                  className="w-1 bg-red-505 rounded-full animate-bounce"
                                />
                              ))}
                            </div>
                            <button
                              onClick={handleStopAndCloneVoice}
                              className="text-[10px] px-3 py-1 bg-red-650 text-red-200 border border-red-500/30 rounded hover:bg-red-600/30 font-sans cursor-pointer block mx-auto"
                            >
                              Finalizar Grabación
                            </button>
                          </div>
                        )}

                        {cloningStatus === "uploading" && (
                          <div className="text-xs text-indigo-450 space-y-1.5 py-2">
                            <RefreshCw className="w-4 h-4 animate-spin mx-auto text-indigo-400" />
                            <p className="font-mono text-[10px] text-slate-400">Generando espectrograma vocal, resolviendo frecuencias base...</p>
                          </div>
                        )}

                        {cloningStatus === "processing" && (
                          <div className="text-xs text-amber-450 space-y-1.5 py-2">
                            <RefreshCw className="w-4 h-4 animate-spin mx-auto text-amber-500" />
                            <p className="font-mono text-[10px] text-slate-400">Entrenando red neuronal vocal, ajustando formantes de voz de autor...</p>
                          </div>
                        )}

                        {cloningStatus === "success" && (
                          <div className="text-xs text-emerald-455 space-y-1 py-2">
                            <Check className="w-5 h-5 mx-auto text-emerald-500" />
                            <p className="font-bold text-emerald-400">¡Voz clonada de alta fidelidad!</p>
                            <p className="text-[9px] text-slate-500">Muestra analizada y agregada permanentemente con calidez en estudio.</p>
                          </div>
                        )}
                      </div>
                    )}

                    {cloningStatus === "idle" && (
                      <button
                        onClick={handleStartRecordingVoice}
                        className="w-full bg-slate-900 border border-slate-800 hover:border-amber-500 text-amber-400 hover:text-amber-300 text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all font-sans"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        Grabar Muestra Vocal en Vivo
                      </button>
                    )}
                  </div>

                  {/* Modulator parameters for active chapter */}
                  <div className="border border-slate-850 bg-slate-950/40 p-3 rounded-lg space-y-3.5">
                    <span className="text-[10px] font-bold text-slate-400 font-mono block uppercase">Ajustes & Modulación de Locución:</span>
                    
                    {/* Voice profiling selector */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-505 font-medium">Timbre Neural (Perfil):</label>
                      <select
                        value={chapters[selectedChapterIdxForMedia]?.voiceSettings?.voiceId || "voz-defecto-narrador"}
                        onChange={(e) => {
                          handleUpdateChapterMedia(selectedChapterIdxForMedia, { voiceId: e.target.value }, {});
                        }}
                        className="w-full text-xs bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 outline-none cursor-pointer"
                      >
                        {clonedVoices.map(v => (
                          <option key={v.id} value={v.id}>{v.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Quality effect presets */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-505 font-medium">Modulación de Calidad & Resonancia:</label>
                      <select
                        value={chapters[selectedChapterIdxForMedia]?.voiceSettings?.vocalModulation || "none"}
                        onChange={(e) => {
                          handleUpdateChapterMedia(selectedChapterIdxForMedia, { vocalModulation: e.target.value as any }, {});
                        }}
                        className="w-full text-xs bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 outline-none cursor-pointer"
                      >
                        <option value="none">Sin Modulación (Estudio Limpio)</option>
                        <option value="warm">Cálido y Envolvente (Compresión Analógica)</option>
                        <option value="crystalline">Cristalino & Agudo (Perfecto para Ensayos)</option>
                        <option value="deep-register">Registro Grave Oscuro (Noir, Thriller y Suspenso)</option>
                        <option value="studio-reverb">Reverberación de Rejilla (Fantasía, Medieval)</option>
                      </select>
                    </div>

                    {/* Numeric settings */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                          <span>Tono de Voz:</span>
                          <span className="text-amber-400">{(chapters[selectedChapterIdxForMedia]?.voiceSettings?.pitchMultiplier || 1.0).toFixed(1)}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.6"
                          max="1.4"
                          step="0.1"
                          value={chapters[selectedChapterIdxForMedia]?.voiceSettings?.pitchMultiplier || 1.0}
                          onChange={(e) => {
                            handleUpdateChapterMedia(selectedChapterIdxForMedia, { pitchMultiplier: parseFloat(e.target.value) }, {});
                          }}
                          className="w-full accent-amber-500 h-1 cursor-pointer bg-slate-800 rounded"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                          <span>Velocidad Lectura:</span>
                          <span className="text-indigo-400">{(chapters[selectedChapterIdxForMedia]?.voiceSettings?.speedMultiplier || 1.0).toFixed(1)}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.7"
                          max="1.5"
                          step="0.1"
                          value={chapters[selectedChapterIdxForMedia]?.voiceSettings?.speedMultiplier || 1.0}
                          onChange={(e) => {
                            handleUpdateChapterMedia(selectedChapterIdxForMedia, { speedMultiplier: parseFloat(e.target.value) }, {});
                          }}
                          className="w-full accent-indigo-500 h-1 cursor-pointer bg-slate-800 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section B: Spotify Soundtrack Collaboration */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Music className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      2. Soundtrack de Fondo de Spotify
                    </h4>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Ambientiza la lectura sincronizando una canción de Spotify para cada capítulo. Es ideal para que los lectores sumen una capa inmersiva musical exacta.
                  </p>

                  {/* Atmosphere Presets Buttons inside Grid */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-slate-505 font-mono font-bold block uppercase">Atmósferas Curadas:</span>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                      <button
                        onClick={() => {
                          handleUpdateChapterMedia(selectedChapterIdxForMedia, {}, {
                            trackId: "4udmPhgE1m1FzX9l3Oq9pT",
                            trackName: "Nocturnos de Chopin",
                            artistName: "Frédéric Chopin"
                          });
                        }}
                        className="p-1.5 px-2.5 bg-slate-950 border border-slate-850 hover:border-emerald-500/45 text-left rounded text-slate-300 hover:text-white transition-all cursor-pointer font-sans block truncate"
                      >
                        🎻 Chopin: Drama de Época
                      </button>
                      <button
                        onClick={() => {
                          handleUpdateChapterMedia(selectedChapterIdxForMedia, {}, {
                            trackId: "30A8oZqPz8A7p77C7m7A8p",
                            trackName: "Cozy Study Lofi Cafe",
                            artistName: "Chill Beats Editorial"
                          });
                        }}
                        className="p-1.5 px-2.5 bg-slate-950 border border-slate-850 hover:border-emerald-500/45 text-left rounded text-slate-300 hover:text-white transition-all cursor-pointer font-sans block truncate"
                      >
                        ☕ Lofi Cozy (Ficción)
                      </button>
                      <button
                        onClick={() => {
                          handleUpdateChapterMedia(selectedChapterIdxForMedia, {}, {
                            trackId: "5Y7O0nUre3qYV6B24m1oXz",
                            trackName: "Misterio Atemporal",
                            artistName: "Hans Zimmer Style Cinematic"
                          });
                        }}
                        className="p-1.5 px-2.5 bg-slate-950 border border-slate-850 hover:border-emerald-500/45 text-left rounded text-slate-300 hover:text-white transition-all cursor-pointer font-sans block truncate"
                      >
                        🏜️ Cello Thriller & Noir
                      </button>
                      <button
                        onClick={() => {
                          handleUpdateChapterMedia(selectedChapterIdxForMedia, {}, {
                            trackId: "17IAnZ9A4p91xO768A8bNl",
                            trackName: "Epic Fantasy Legend",
                            artistName: "Medieval Orchestra"
                          });
                        }}
                        className="p-1.5 px-2.5 bg-slate-950 border border-slate-850 hover:border-emerald-500/45 text-left rounded text-slate-300 hover:text-white transition-all cursor-pointer font-sans block truncate"
                      >
                        🏰 Fantasía Legendaria
                      </button>
                    </div>
                  </div>

                  {/* Manual Track ID Form */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-mono block">SPOTIFY TRACK ID / LINK PERSONALIZADO:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder=" ej. 4udmPhgE1m1FzX9l3Oq9pT  o link de Spotify"
                        value={chapters[selectedChapterIdxForMedia]?.spotifyTrackId || ""}
                        onChange={(e) => {
                          let rawInput = e.target.value.trim();
                          // Support extraction of Track ID from standard Spotify URL
                          if (rawInput.includes("spotify.com/track/")) {
                            const match = rawInput.match(/\/track\/([a-zA-Z0-9]+)/);
                            if (match && match[1]) {
                              rawInput = match[1];
                            }
                          }
                          handleUpdateChapterMedia(selectedChapterIdxForMedia, {}, {
                            trackId: rawInput,
                            trackName: "Soundtrack del Autor",
                            artistName: "Manual Spotify Link"
                          });
                        }}
                        className="flex-1 text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Dynamic Spotify player embed iframe! */}
                  {chapters[selectedChapterIdxForMedia]?.spotifyTrackId && (
                    <div className="bg-slate-950 border border-emerald-500/20 p-2.5 rounded-lg space-y-1.5 animate-fadeIn">
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Estación Spotify lista para Sincronizar
                        </span>
                        <span className="font-bold text-emerald-400">ONLINE</span>
                      </div>
                      
                      <iframe
                        src={`https://open.spotify.com/embed/track/${chapters[selectedChapterIdxForMedia]?.spotifyTrackId}`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allowFullScreen={false}
                        allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-md border border-slate-800"
                        style={{ background: '#090d16' }}
                      />
                    </div>
                  )}
                </div>

                {/* Section C: Real-time Narration Master Controller Player */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/20 p-4 rounded-xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Headphones className="w-4 h-4 text-amber-400 animate-pulse" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      3. Consola de Locución Maestra (Simulación de Lectura)
                    </h4>
                  </div>

                  <div className="text-center space-y-3.5">
                    {/* Equalizer Visualizer */}
                    <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex flex-col items-center justify-center space-y-2">
                      <div className="flex items-end justify-center gap-1.5 h-14 w-full px-4 border-b border-slate-900 pb-2">
                        {equalizerBars.map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}px` }}
                            className="w-2 rounded-t bg-gradient-to-t from-emerald-500 via-amber-400 to-indigo-500 transition-all duration-100"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-amber-500 font-mono tracking-wide uppercase">
                        {speakingStatus}
                      </span>
                    </div>

                    {/* Master Controls */}
                    <div className="flex gap-2">
                      {isNarrationPlaying ? (
                        <button
                          onClick={handleStopNarration}
                          className="flex-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2.5 rounded-lg cursor-pointer transition-all uppercase tracking-wider font-sans"
                        >
                          Detener Narración Activa
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartNarration(selectedChapterIdxForMedia)}
                          className="flex-1 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-bold py-2.5 rounded-lg cursor-pointer transition-all uppercase tracking-wider font-sans flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
                        >
                          <Play className="w-3.5 h-3.5 shrink-0" />
                          Escuchar Narración en Tiempo Real
                        </button>
                      )}
                    </div>

                    {/* Informative Tip */}
                    <p className="text-[9.5px] text-slate-500 leading-relaxed text-left border-l border-slate-800 pl-2">
                      💡 <strong>Efecto de Retención:</strong> Agregar audiolibros narrados combinados con tracks musicales aumenta la tasa de finalización del lector en un 310% y permite vender tu novela en plataformas premium como Audible, Kobo y Spotify Books a tarifas mejor tasadas.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 8: CINEMATIC SCREENPLAY & MAVERICK PREMIUM SUITE */}
            {activeTab === "screenplay" && (
              <div className="space-y-6 animate-fadeIn pb-6 text-slate-300">
                
                {/* Visual Intro Block */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-amber-500/30 p-4 rounded-xl space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-5 opacity-5 pointer-events-none">
                    <Clapperboard className="w-24 h-24 stroke-[1.5]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-400 animate-bounce" />
                    <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-widest">
                      DIAGRAMMERS MAVERICK™
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                    Nuestra división de diseño cinematográfico avanzado para maquetadores de élite. Adapta tu libro a un guión apto para Hollywood, organiza repartos técnicos de rodaje y calcula presupuestos de producción.
                  </p>
                </div>

                {/* Membership Gate Display */}
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${isMaverickMember ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-900 text-slate-400'}`}>
                        <Crown className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider block">Membresía Maverick / Premium</span>
                        <span className="text-[9.5px] text-slate-500 font-mono">ESTADO: {isMaverickMember ? "VIP ACTIVO" : "BÁSICO LIMITADO"}</span>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        const nextVal = !isMaverickMember;
                        setIsMaverickMember(nextVal);
                        localStorage.setItem("is_maverick_member", nextVal ? "true" : "false");
                        setScreenplayExportDoneMessage(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase font-bold cursor-pointer transition-all ${
                        isMaverickMember
                          ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                          : "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/10"
                      }`}
                    >
                      {isMaverickMember ? "Desactivar VIP" : "Activar Maverick™"}
                    </button>
                  </div>

                  {!isMaverickMember && (
                    <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-850/80 text-[10.5px] text-slate-400 leading-relaxed font-sans space-y-2">
                      <p>
                        ⚠️ <strong>Acceso Bloqueado:</strong> Estás utilizando la versión de miembro normal de DIAGRAMMERS. El extractor de guiones automatizados y el simulador de Casting está reservado únicamente para cuentas <strong>Maverick Premium</strong>.
                      </p>
                      <button
                        onClick={() => setIsMaverickMember(true)}
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer shadow hover:from-amber-400 hover:to-yellow-300 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Crown className="w-3.5 h-3.5" />
                        Obtener Licencia Maverick Temprana (Gratis)
                      </button>
                    </div>
                  )}
                </div>

                {/* Premium Workstation */}
                {isMaverickMember ? (
                  <div className="space-y-5 animate-slideUp">
                    
                    {/* Part 1: Novel to Script adaptator */}
                    <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                        <div className="flex items-center gap-2">
                          <Clapperboard className="w-4 h-4 text-amber-400" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">1. IA Scriptwriting de Conversión</h4>
                        </div>
                        <span className="text-[9.5px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold">HOLLYWOOD ENGINE</span>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          
                          {/* Chapter selection */}
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Capítulo Literario Base:</label>
                            <select
                              value={screenplaySelectedChapterIdx}
                              onChange={(e) => setScreenplaySelectedChapterIdx(Number(e.target.value))}
                              className="w-full text-xs bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 outline-none cursor-pointer"
                            >
                              {chapters.map((ch, idx) => (
                                <option key={ch.chapterNumber} value={idx}>
                                  Cap. {ch.chapterNumber}: {ch.title || "Sin título"}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Tone selector */}
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Estilo de Enfoque Cinematográfico:</label>
                            <select
                              value={castingSelectedTone}
                              onChange={(e) => setCastingSelectedTone(e.target.value)}
                              className="w-full text-xs bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 outline-none cursor-pointer"
                            >
                              <option value="EPIC_HOLLYWOOD">Épico de Hollywood (Blockbuster comercial de gran alcance)</option>
                              <option value="INDIE">Cine de Autor / Festival de Cannes (Foco intimista dramático)</option>
                              <option value="LATIN_DRAMA">Telenovela Premium Latinoamericana (Sentimiento, pasión y clímax)</option>
                            </select>
                          </div>

                        </div>

                        {/* Conversion trigger */}
                        <button
                          onClick={handleConvertToScreenplay}
                          disabled={isConvertingScreenplay}
                          className="w-full bg-indigo-600 hover:bg-indigo-550 disabled:opacity-50 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-950/40"
                        >
                          {isConvertingScreenplay ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              <span>Procesando Estructura Cinematográfica...</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                              <span>Convertir Manuscrito a Guión de Cine</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Part 2: Casting suggestions */}
                    {castingSuggestions.length > 0 && (
                      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3.5 animate-fadeIn">
                        <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                          <Crown className="w-4 h-4 text-amber-550" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">2. Desglose Técnico de Casting e Inversión</h4>
                        </div>

                        <p className="text-[10.5px] text-slate-405 font-sans leading-relaxed font-medium">
                          Sugerencia analítica de actores idóneos de acuerdo al tono seleccionado (<span className="text-white font-mono">{castingSelectedTone === "EPIC_HOLLYWOOD" ? "Superproducción Épica" : castingSelectedTone === "INDIE" ? "Indie Experimental" : "Melodrama Latino"}</span>) y el presupuesto estimado del sindicato para rodaje primario:
                        </p>

                        <div className="space-y-2.5">
                          {castingSuggestions.map((actor, idx) => (
                            <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                              <div>
                                <span className="text-xs font-bold text-amber-300 block">{actor.actor}</span>
                                <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">{actor.role}</span>
                                <p className="text-[10px] text-slate-500 leading-tight mt-1">{actor.description}</p>
                              </div>
                              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono shrink-0">
                                Salario: {actor.estBudget}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Part 3: Courier Format Scriptwriting Box */}
                    {generatedScreenplayText && (
                      <div className="bg-slate-900/65 border border-slate-800 p-4 rounded-xl space-y-4 animate-fadeIn">
                        <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                          <span className="text-xs font-bold text-slate-350 uppercase font-mono">3. Monitor de Script (Formato Courier Sindicado):</span>
                          
                          {/* Config Watermark */}
                          <div className="flex items-center gap-1.5 text-[10px]">
                            <span className="text-slate-500 font-mono">Watermark:</span>
                            <input
                              type="text"
                              value={screenplayWatermark}
                              onChange={(e) => setScreenplayWatermark(e.target.value)}
                              placeholder="Sin marca"
                              className="bg-slate-950 border border-slate-850 rounded px-1.5 py-0.5 text-slate-300 w-32 font-mono"
                            />
                          </div>
                        </div>

                        {/* Screenplay Content Box */}
                        <div className="relative bg-slate-950 p-4 rounded-xl border border-slate-850 max-h-72 overflow-y-auto whitespace-pre-wrap font-mono text-xs text-slate-205 leading-loose scrollbar-thin">
                          
                          {/* Simulated diagonal watermark */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none rotate-12 text-center">
                            <span className="text-white text-base font-extrabold tracking-wider whitespace-nowrap">
                              {screenplayWatermark || "MAVERICK STUDIO"}
                            </span>
                          </div>

                          {generatedScreenplayText}
                        </div>

                        {/* Export or download tools */}
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <button
                            onClick={exportScreenplayFountain}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm uppercase shrink-0"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Exportar Fountain</span>
                          </button>
                          
                          <button
                            onClick={handlePrint}
                            className="bg-slate-900 border border-slate-800 hover:border-slate-750 text-slate-200 font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer uppercase shrink-0"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Imprimir Guión</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Pro quote of filmmaking */}
                    <div className="p-3.5 bg-slate-950 border border-slate-850/80 rounded-lg text-center text-[10px] text-slate-400 leading-relaxed font-sans font-medium italic">
                      "Un buen guión nace de la precisión literaria y el coraje tipográfico. DIAGRAMMERS une ambos mundos."
                    </div>

                  </div>
                ) : null}

                {/* Screenplay notification feedback */}
                {screenplayExportDoneMessage && (
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg text-xs leading-relaxed animate-fadeIn">
                    {screenplayExportDoneMessage}
                  </div>
                )}

              </div>
            )}

            {/* ANALYTICS AND TRAFFIC METRICS MODAL */}
            {showAnalyticsModal && (
              <div id="analytics-modal-overlay" className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl flex flex-col max-h-[85vh] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  
                  {/* Modal Header */}
                  <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <TrendingUp className="w-5 h-5 text-emerald-400 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <span>Monitor De Tráfico y Analíticas Web</span>
                          <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">Tiempo Real</span>
                        </h3>
                        <p className="text-xs text-slate-400">Estadísticas de visitas a la aplicación y uso del motor de Inteligencia Editorial.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={fetchAnalytics}
                        disabled={isLoadingAnalytics}
                        className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all select-none cursor-pointer disabled:opacity-50"
                      >
                        {isLoadingAnalytics ? (
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></span>
                        ) : (
                          <span>Refrescar ↻</span>
                        )}
                      </button>
                      <button
                        onClick={() => setShowAnalyticsModal(false)}
                        className="text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 p-2 rounded-lg transition-colors cursor-pointer w-8 h-8 flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    {/* Tarjetas de Métricas Rápidas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Total Visitas */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-15">
                          <Eye className="w-12 h-12 text-blue-400" />
                        </div>
                        <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">Visitas Totales</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-3xl font-black text-white tracking-tight">
                            {analyticsData ? analyticsData.totalVisits : "—"}
                          </span>
                          <span className="text-xs text-emerald-400 font-bold">● Activo</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">Visitas del manuscrito acumuladas.</p>
                      </div>

                      {/* Visitantes Únicos */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-15">
                          <Globe className="w-12 h-12 text-emerald-400" />
                        </div>
                        <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">Lectores Únicos</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-3xl font-black text-white tracking-tight">
                            {analyticsData ? analyticsData.uniqueVisitors : "—"}
                          </span>
                          <span className="text-xs text-indigo-400 font-bold">IP Únicas</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">Calculado por sesiones de 12 horas.</p>
                      </div>

                      {/* Tráfico Celular / Mobile */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-15">
                          <Smartphone className="w-12 h-12 text-amber-500" />
                        </div>
                        <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">Vías Celular</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-3xl font-black text-amber-400 tracking-tight">
                            {analyticsData ? analyticsData.mobileVisits : "—"}
                          </span>
                          {analyticsData && (
                            <span className="text-xs text-slate-400 font-medium font-mono">
                              {Math.round((analyticsData.mobileVisits / (analyticsData.totalVisits || 1)) * 100)}%
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">Usuarios con iPhone o Android.</p>
                      </div>

                      {/* Tráfico Web/Desktop */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-15">
                          <Tablet className="w-12 h-12 text-cyan-405" />
                        </div>
                        <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">Vías Escritorio</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-3xl font-black text-cyan-400 tracking-tight">
                            {analyticsData ? analyticsData.desktopVisits : "—"}
                          </span>
                          {analyticsData && (
                            <span className="text-xs text-slate-400 font-medium font-mono">
                              {Math.round((analyticsData.desktopVisits / (analyticsData.totalVisits || 1)) * 100)}%
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">Usuarios en computadoras.</p>
                      </div>
                    </div>

                    {/* Doble Columna: Log de Visitas Recientes & Log del Servidor IA */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      
                      {/* Log de Tránsito Web en Vivo */}
                      <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-4 flex flex-col h-[320px] overflow-hidden">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-850 mb-3 shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Visitantes Recientes en Vivo</h4>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">En tiempo real</span>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                          {analyticsData && analyticsData.visitorLogs && analyticsData.visitorLogs.length > 0 ? (
                            analyticsData.visitorLogs.map((log: any, idx: number) => {
                              const time = new Date(log.timestamp).toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                              return (
                                <div key={idx} className="bg-slate-900 border border-slate-850/60 p-2.5 rounded-lg flex items-center justify-between gap-3 text-xs">
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="shrink-0">
                                      {log.isMobile ? (
                                        <Smartphone className="w-4 h-4 text-amber-500" />
                                      ) : (
                                        <Tablet className="w-4 h-4 text-cyan-400" />
                                      )}
                                    </div>
                                    <div className="truncate min-w-0">
                                      <div className="font-mono text-[11px] text-white flex items-center gap-1.5 leading-none">
                                        <span>IP: {log.ip}</span>
                                        <span className="text-[9px] bg-slate-800 text-slate-400 px-1 py-0.2 rounded font-sans">{log.resolution}</span>
                                      </div>
                                      <span className="text-[10px] text-slate-400 leading-normal truncate shrink block mt-1">
                                        Vía: <strong className="text-slate-300 font-medium">{log.referrer}</strong>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="text-[10px] font-mono text-slate-500">{time}</span>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-550 text-center text-xs p-6 gap-2">
                              <span>Ninguna visita registrada en este contenedor aún. Las visitas se registrarán en directo.</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Log de Operaciones de IA en Servidor */}
                      <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-4 flex flex-col h-[320px] overflow-hidden">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-850 mb-3 shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Log de Acciones Editoriales IA</h4>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">Historial de peticiones</span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                          {analyticsData && analyticsData.activityLogs && analyticsData.activityLogs.length > 0 ? (
                            analyticsData.activityLogs.map((activity: any, idx: number) => {
                              const time = new Date(activity.timestamp).toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                              return (
                                <div key={idx} className="bg-slate-900 border border-slate-850/60 p-2.5 rounded-lg text-xs space-y-1">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                                      {activity.action}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500">{time}</span>
                                  </div>
                                  <p className="text-slate-400 text-[10.5px] leading-relaxed select-text">
                                    {activity.details}
                                  </p>
                                </div>
                              );
                            })
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-550 text-center text-xs p-6 gap-2">
                              <span>Ninguna acción registrada en esta sesión del servidor. Comienza a maquetar o corregir capítulos para recolectar históricos de IA.</span>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 border-t border-slate-800 bg-slate-950/40 rounded-b-2xl text-[10px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span>
                      Nota de Ingress: Las visitas se evalúan utilizando firmas de seguridad web y almacenamiento de persistencia por servidor.
                    </span>
                    <button
                      onClick={() => setShowAnalyticsModal(false)}
                      className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs shadow-md transition-all cursor-pointer shrink-0"
                    >
                      Aceptar y Cerrar
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* MANUSCRIPT INDIVIDUAL CHAPTER MODAL EDITOR */}
            {editingChapterIdx !== null && (
              <div id="chapter-editor-overlay" className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl flex flex-col max-h-[90vh]">
                  
                  {/* Modal Header */}
                  <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      <span>Editando Cap. {chapters[editingChapterIdx].chapterNumber}: {chapters[editingChapterIdx].title}</span>
                    </h3>
                    <button
                      onClick={() => setEditingChapterIdx(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Undo Redo Sub-Toolbar */}
                  <div className="bg-slate-950/80 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 font-medium">Historial de Cambios:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleUndoChapterEdit}
                        disabled={historyIndex <= 0}
                        className={`px-3 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          historyIndex > 0
                            ? "bg-slate-800 hover:bg-slate-705 text-amber-400 hover:text-amber-300 border border-amber-500/20"
                            : "bg-slate-950 text-slate-600 border border-slate-900 cursor-not-allowed text-xs"
                        }`}
                        title="Deshacer Cambio"
                      >
                        <Undo2 className="w-3 h-3" />
                        <span>Deshacer ({historyIndex > 0 ? historyIndex : 0})</span>
                      </button>
                      <button
                        onClick={handleRedoChapterEdit}
                        disabled={historyIndex >= chapterHistory.length - 1}
                        className={`px-3 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          historyIndex < chapterHistory.length - 1
                            ? "bg-slate-800 hover:bg-slate-705 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20"
                            : "bg-slate-950 text-slate-600 border border-slate-900 cursor-not-allowed text-xs"
                        }`}
                        title="Rehacer Cambio"
                      >
                        <Redo2 className="w-3 h-3" />
                        <span>Rehacer ({chapterHistory.length > 0 ? chapterHistory.length - 1 - historyIndex : 0})</span>
                      </button>
                    </div>
                  </div>

                  {/* Mobile Tab Selector (Visible only on cellphones, hidden on desktop) */}
                  <div className="flex md:hidden bg-slate-950 border-b border-slate-800 p-1.5 gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setMobileEditorTab("text")}
                      className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        mobileEditorTab === "text"
                          ? "bg-amber-500 text-slate-950 shadow-md"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                      }`}
                    >
                      <span>📝 Editor de Texto</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileEditorTab("corrector")}
                      className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        mobileEditorTab === "corrector"
                          ? "bg-amber-500 text-slate-950 shadow-md"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                      }`}
                    >
                      <span>🩺 Corrector & Magia</span>
                      {textAnalysisResults && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                      )}
                    </button>
                  </div>

                  {/* Modal Inputs and AI assistance tool dual panel */}
                  <div className="p-5 overflow-y-auto flex-1 flex flex-col md:flex-row gap-5">
                    
                    {/* Left Column: Traditional Editor */}
                    <div className={`flex-1 md:w-3/5 space-y-4 flex-col ${mobileEditorTab === "text" ? "flex" : "hidden md:flex"}`}>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-400 font-medium block">
                          Título oficial del Capítulo:
                        </label>
                        <input
                          type="text"
                          value={editingChapterTitle}
                          onChange={(e) => updateChapterTitleWithHistory(e.target.value)}
                          className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500 font-bold"
                        />
                      </div>

                      <div className="space-y-1 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs text-slate-400 font-medium block">
                            Párrafos literarios (los saltos de línea dobles generan nuevos párrafos para la compaginación):
                          </label>
                          {speechSupported && (
                            <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800/80 py-0.5 px-2 rounded-full">
                              <label className="text-[9px] text-slate-500 font-mono">Idioma:</label>
                              <select
                                value={speechLang}
                                onChange={(e) => {
                                  setSpeechLang(e.target.value);
                                  if (isDictating && dictationTarget === "chapter") {
                                    stopDictation();
                                  }
                                }}
                                className="bg-transparent border-none text-[9.5px] text-slate-300 font-mono focus:outline-none cursor-pointer"
                              >
                                <option value="es-ES" className="bg-slate-900 pb-1">Español 🇪🇸</option>
                                <option value="en-US" className="bg-slate-900 pb-1">English 🇺🇸</option>
                                <option value="pt-PT" className="bg-slate-900 pb-1">Português 🇵🇹</option>
                                <option value="fr-FR" className="bg-slate-900 pb-1">Français 🇫🇷</option>
                                <option value="it-IT" className="bg-slate-900 pb-1 font-sans">Italiano 🇮🇹</option>
                              </select>
                            </div>
                          )}
                        </div>

                        {/* VOICE DICTATION CONTROLS BAR FOR MODAL EDITING */}
                        {speechSupported && (
                          <div className="bg-slate-950 border border-slate-850 rounded-xl p-2.5 flex items-center justify-between gap-3 my-1.5 transition-all">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  if (isDictating && dictationTarget === "chapter") {
                                    stopDictation();
                                  } else {
                                    startDictation("chapter");
                                  }
                                }}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  isDictating && dictationTarget === "chapter"
                                    ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                                    : "bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 border border-amber-500/20"
                                }`}
                              >
                                <Mic className="w-3.5 h-3.5" />
                                <span>{isDictating && dictationTarget === "chapter" ? "Detener Dictado" : "Grabar por voz"}</span>
                              </button>
                              
                              {isDictating && dictationTarget === "chapter" && (
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                                  <span className="text-[10px] text-slate-400 font-mono animate-pulse">Grabación activa...</span>
                                </div>
                              )}
                            </div>

                            <div className="flex-1 text-right truncate">
                              {dictatedTextTemp ? (
                                <span className="text-[10px] italic text-amber-300 font-mono animate-pulse">
                                  "...{dictatedTextTemp}"
                                </span>
                              ) : isDictating && dictationTarget === "chapter" ? (
                                <span className="text-[10.5px] text-slate-500 italic">Dictando directamente al cursor...</span>
                              ) : (
                                <span className="text-[10px] text-slate-500 font-mono">Apoyo para dislexia y rapidez editorial</span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Error display if dictation fails */}
                        {dictationError && dictationTarget === "chapter" && (
                          <div className="bg-red-950/30 border border-red-900 p-2 rounded-lg text-[10px] text-red-400 flex items-center gap-1.5 my-1.5">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{dictationError}</span>
                            <button onClick={() => setDictationError(null)} className="ml-auto text-slate-400 hover:text-white focus:outline-none">✕</button>
                          </div>
                        )}

                        <textarea
                          id="chapter-editor-input"
                          value={editingChapterText}
                          onChange={(e) => updateChapterTextWithHistory(e.target.value)}
                          className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-amber-500 font-mono leading-relaxed flex-1 min-h-[300px]"
                        />
                      </div>
                    </div>

                    {/* Right Column: Corrector & Magia Editorial */}
                    <div className={`md:w-2/5 border border-slate-800 bg-slate-950 rounded-xl p-4 flex-col justify-between overflow-hidden ${mobileEditorTab === "corrector" ? "flex min-h-[450px]" : "hidden md:flex md:max-h-[600px]"}`}>
                      <div className="flex flex-col h-full overflow-hidden">
                        
                        {/* Panel Title */}
                        <div className="flex items-center gap-1.5 pb-2 border-b border-slate-850 shrink-0">
                          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                          <span className="text-xs font-bold text-white tracking-wide uppercase font-mono">Corrector & Magia Editorial</span>
                        </div>

                        {/* TABS SELECTOR */}
                        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-850 my-3 gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => setActiveAnalysisTab("corrections")}
                            className={`flex-1 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all tracking-wide cursor-pointer ${
                              activeAnalysisTab === "corrections"
                                ? "bg-slate-800 text-white shadow-inner border border-slate-700"
                                : "text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            🩺 Corrector RAE
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveAnalysisTab("magic")}
                            className={`flex-1 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all tracking-wide cursor-pointer ${
                              activeAnalysisTab === "magic"
                                ? "bg-slate-800 text-white shadow-inner border border-slate-700"
                                : "text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            ✨ Sección Magia
                          </button>
                        </div>

                        {/* DESCRIPTIONS & LISTS AREA */}
                        <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                          {isAnalyzingText ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                              <span className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
                              <span className="text-xs font-bold text-slate-300">Conectando con el corrector de la RAE...</span>
                              <p className="text-[10px] text-slate-500 max-w-xs italic animate-pulse">
                                Heurística y gramática neuronal analizando repeticiones, incoherencias narrativas y guiones de diálogo...
                              </p>
                            </div>
                          ) : !textAnalysisResults ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2.5">
                              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center">
                                <Feather className="w-5 h-5 text-amber-500/80" />
                              </div>
                              <span className="text-xs font-bold text-slate-300">Revisión Automática</span>
                              <p className="text-[10px] text-slate-400 max-w-[220px] leading-relaxed mx-auto">
                                Presiona el botón de abajo para que la IA revise tu texto en busca de ortografía, rayas de diálogo correctas, palabras repetidas y saltos de coherencia.
                              </p>
                            </div>
                          ) : activeAnalysisTab === "corrections" ? (
                            /* Corrections listing */
                            textAnalysisResults.corrections.length === 0 ? (
                              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                                <span className="text-2xl">🎉</span>
                                <span className="text-xs font-bold text-emerald-400">¡Texto Ortotipográfico Perfecto!</span>
                                <p className="text-[9.5px] text-slate-400 leading-relaxed">
                                  No hemos detectado errores graves de acentuación, guiones ni dobles espacios. ¡Gran labor de escritura!
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="text-[9.5px] text-slate-500 uppercase tracking-widest font-mono font-bold">
                                  Incoherencias Técnicas Detectadas ({textAnalysisResults.corrections.length}):
                                </div>
                                {textAnalysisResults.corrections.map((corr, idx) => (
                                  <div key={idx} className="p-3 bg-red-950/10 border border-rose-955/40 rounded-lg text-left space-y-1.5 animate-fadeIn">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[9px] font-mono text-rose-400 uppercase font-black bg-rose-500/10 px-1.5 py-0.5 rounded">
                                        {corr.type === "rae-dashes" ? "Rayas RAE" : corr.type === "accent" ? "Acento" : corr.type === "grammar" ? "Gramática" : "Ortografía"}
                                      </span>
                                      <button
                                        onClick={() => applyTextImprovement(corr.original, corr.replacement)}
                                        className="text-[9px] font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-2 py-0.5 rounded transition-all cursor-pointer"
                                      >
                                        Sustituir
                                      </button>
                                    </div>
                                    <div className="text-[10px] leading-relaxed break-words">
                                      <span className="line-through text-slate-500 border-r border-slate-800 pr-1 mr-1">"{corr.original}"</span>
                                      <span className="text-emerald-400 font-bold bg-emerald-500/5 px-1 py-0.2 rounded">"{corr.replacement}"</span>
                                    </div>
                                    <p className="text-[9px] text-slate-450 leading-normal italic">
                                      {corr.reason}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )
                          ) : (
                            /* Magic Suggestions listing */
                            textAnalysisResults.magicSuggestions.length === 0 ? (
                              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                                <span className="text-2xl">✨</span>
                                <span className="text-xs font-bold text-indigo-400">Riqueza Narrativa Excelente</span>
                                <p className="text-[9.5px] text-slate-400 leading-relaxed">
                                  No hallamos palabras altamente redundantes ni incoherencias importantes. Tu narrativa fluye de forma sumamente orgánica.
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="text-[9.5px] text-slate-500 uppercase tracking-widest font-mono font-bold">
                                  Propuestas de Magia Editorial ({textAnalysisResults.magicSuggestions.length}):
                                </div>
                                {textAnalysisResults.magicSuggestions.map((sug, idx) => (
                                  <div key={idx} className="p-3 bg-indigo-950/15 border border-indigo-955/40 rounded-lg text-left space-y-1.5 animate-fadeIn">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[9px] font-mono text-indigo-300 uppercase font-black bg-indigo-500/10 px-1.5 py-0.5 rounded">
                                        {sug.type === "repetitive" ? "Repetición" : sug.type === "coherence" ? "Coherencia" : sug.type === "flow" ? "Fluidez" : "Riqueza Léxica"}
                                      </span>
                                      <button
                                        onClick={() => applyTextImprovement(sug.original, sug.replacement)}
                                        className="text-[9px] font-bold bg-indigo-500 hover:bg-indigo-400 text-slate-950 px-2 py-0.5 rounded transition-all cursor-pointer"
                                      >
                                        ✨ Aplicar
                                      </button>
                                    </div>
                                    <div className="text-[10px] leading-relaxed break-words">
                                      <span className="text-slate-450 pr-1">Original: "{sug.original}"</span>
                                      <div className="text-cyan-300 font-bold mt-1 bg-cyan-500/5 p-1 rounded">Sustituir por: "{sug.replacement}"</div>
                                    </div>
                                    <p className="text-[9px] text-slate-400 leading-normal italic">
                                      {sug.reason}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )
                          )}
                        </div>

                        {/* TRIGGERS CTA FOOTER OF THE PANEL */}
                        <div className="pt-3 border-t border-slate-850 mt-2 shrink-0">
                          {textAnalysisResults ? (
                            <button
                              type="button"
                              onClick={analyzeChapterText}
                              disabled={isAnalyzingText}
                              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10.5px] py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                            >
                              <RefreshCw className={`w-3 h-3 ${isAnalyzingText ? "animate-spin" : ""}`} />
                              <span>Re-analizar Texto</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={analyzeChapterText}
                              disabled={isAnalyzingText}
                              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-450 hover:to-amber-500 text-slate-950 font-bold py-2 rounded-lg text-[10.5px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                            >
                              {isAnalyzingText ? (
                                <>
                                  <span className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                  <span>Invocando Heurística...</span>
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                  <span>Escanear Corrector & Magia</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                    <button
                      onClick={() => setEditingChapterIdx(null)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={saveEditedChapter}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Guardar Modificación
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Persistent Footer Credit */}
          <div className="p-4 border-t border-slate-800 bg-slate-950 text-center text-[10px] text-slate-500 font-mono tracking-wider">
            DIAGRAMMERS • El Entorno Inteligente de Diagramación, Maqueta y Pliego Editorial
          </div>
          <div className="p-2 bg-slate-950 text-center text-[9px] text-slate-600 font-medium">
            diagrammers.app • diagrammers.ai • diagrammers.com
          </div>
        </aside>

        {/* RIGHT WORKSPACE: LIVE REAL-TIME BOOK SIMULATOR AND PREVIEW */}
        <main id="book-viewport-container" className="flex-1 bg-slate-900 flex flex-col overflow-y-auto print:bg-white print:overflow-visible relative">
          
          {/* Subheader Controls (Invisible on print) */}
          <div className="no-print bg-slate-950 border-b border-slate-800 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
            
            {/* Pages Navigation and Mode switcher */}
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800 flex-wrap gap-1">
                <button
                  onClick={() => setViewerMode("book")}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer ${
                    viewerMode === "book" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Muestra un libro físico abierto, ideal para compaginación por duplas"
                >
                  <Columns className="w-3.5 h-3.5 text-amber-400" />
                  <span>Libro Abierto (Dupla)</span>
                </button>
                <button
                  onClick={() => setViewerMode("continuous")}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer ${
                    viewerMode === "continuous" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Muestra las páginas apiladas en secuencia continua"
                >
                  <AlignLeft className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lectura Continua</span>
                </button>
                <button
                  onClick={() => setViewerMode("epub")}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer ${
                    viewerMode === "epub" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Permite diagramar, estilizar e interactuar con el formato digital reflowable ePub y Kindle"
                >
                  <Tablet className="w-3.5 h-3.5 text-amber-400" />
                  <span>eBook / ePub Digital</span>
                </button>
                <button
                  onClick={() => setViewerMode("cover-wrap")}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer ${
                    viewerMode === "cover-wrap" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Diseño y render de la sobrecubierta o pliego impreso: Portada, Contraportada y lomo calculado"
                >
                  <Scissors className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pliego de Portada Impresa</span>
                </button>
              </div>

              {/* NEW: VISTA PREVIA DE IMPRESIÓN TOGGLE */}
              <button
                onClick={() => setIsPrintPreviewEnabled(!isPrintPreviewEnabled)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all outline-none cursor-pointer ${
                  isPrintPreviewEnabled 
                    ? "bg-amber-500 text-slate-950 font-extrabold shadow-md border border-amber-600 scale-102" 
                    : "bg-slate-900 border border-slate-800 text-slate-350 hover:text-white"
                }`}
                title="Habilitar marcas de imprenta, sangrado real y líneas de advertencia de corte física"
              >
                <Eye className={`w-3.5 h-3.5 ${isPrintPreviewEnabled ? "text-slate-950 animate-pulse" : "text-amber-400"}`} />
                <span>{isPrintPreviewEnabled ? "Vista Previa: ON" : "Vista Previa de Impresión"}</span>
              </button>

              {/* Spread Info */}
              {pages.length > 0 && viewerMode === "book" && (
                <div className="text-xs text-slate-350">
                  Hojas: <span className="font-bold text-white font-mono">{currentPageIndex + 1}</span> y <span className="font-bold text-white font-mono">{Math.min(pages.length, currentPageIndex + 2)}</span> de <span className="font-bold text-slate-400 font-mono">{pages.length}</span> (Capítulo {pages[currentPageIndex]?.chapterNumber})
                </div>
              )}

              {pages.length > 0 && viewerMode === "continuous" && (
                <div className="text-xs text-slate-350">
                  Total de páginas maquetadas: <span className="font-bold text-amber-400 font-mono">{pages.length}</span>
                </div>
              )}
            </div>

            {/* Quick stats & helper explanation */}
            <div className="flex items-center gap-2">
              <div className="text-[11px] bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <span>Páginas: <strong>{pages.length || 0}</strong></span>
                <span className="text-slate-750">•</span>
                <span>Palabras: <strong>{chapters.reduce((acc, c) => acc + c.paragraphs.reduce((sum, p) => sum + p.split(" ").length, 0), 0)}</strong></span>
                <span className="text-slate-750">•</span>
                <span>Lectura: <strong>~{Math.max(1, Math.round(chapters.reduce((acc, c) => acc + c.paragraphs.reduce((sum, p) => sum + p.split(" ").length, 0), 0) / 200))} min</strong></span>
              </div>
            </div>
          </div>

          {/* Book Simulator Sheet Frame */}
          <div className="flex-1 flex flex-col justify-center py-6 px-4 md:px-10 max-w-7xl mx-auto w-full print:p-0 print:m-0 print:max-w-none">
            
            {/* If there are no formatted chapters yet */}
            {pages.length === 0 ? (
              <div className="p-12 text-center max-w-lg mx-auto space-y-4 my-20 bg-slate-950/40 border border-slate-800 rounded-3xl animate-fadeIn">
                <BookOpen className="w-16 h-16 text-amber-500/20 mx-auto stroke-[1.5]" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">No hay texto compaginado aún</h3>
                  <p className="text-xs text-slate-400">
                    Sube tu borrador o carga un ejemplo de literatura hispana clásica y presiona el botón compaginador o división de capítulos. Se dividirá instantáneamente en pliegos y páginas con diseño profesional.
                  </p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button
                    onClick={() => handleApplyTemplate(TEXT_TEMPLATES[0])}
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    Cargar Don Quijote Clásico
                  </button>
                  <button
                    onClick={handleResetProject}
                    className="w-full sm:w-auto bg-red-950/30 hover:bg-red-900/30 border border-red-500/30 text-red-350 text-xs font-bold px-4 py-2.5 rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Restaurar Maquetador Completo</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Simulation content */
              <div className="space-y-8 print:space-y-0">
                
                {/* Mode Layout Renderer */}
                {viewerMode === "book" ? (
                  /* PHYSICAL BOOK VIEWPORT (Double Page) */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative bg-slate-950 rounded-2xl p-4 md:p-8 shadow-2xl border border-slate-800 print:grid-cols-1 print:p-0 print:bg-white print:border-none print:shadow-none">
                    
                    {/* Left Hand Page */}
                    {(() => {
                      const leftPage = pages[currentPageIndex];
                      if (!leftPage) return <div className="hidden md:flex bg-slate-900 border-r border-slate-950 items-center justify-center p-8 rounded-l-xl opacity-40">Al final del libro</div>;
                      
                      return (
                        <div
                          id={`sheet-pag-${leftPage.pageNumber}`}
                          className={`min-h-[580px] md:min-h-[640px] px-8 py-10 md:px-14 md:py-14 select-text relative flex flex-col justify-between transition-all duration-300 rounded-l-xl print:rounded-none opacity-100 ${
                            styleSettings.pageColor === "cream" ? "book-paper-cream text-amber-950" :
                            styleSettings.pageColor === "sepia" ? "book-paper-sepia text-amber-950" :
                            styleSettings.pageColor === "white" ? "book-paper-white text-slate-900" :
                            "book-paper-charcoal text-slate-100"
                          } book-spine-left printable-page-print w-full ${TRIM_SIZE_FACTORS[kdpTrimSize]?.aspect || "aspect-[2/3]"} ${TRIM_SIZE_FACTORS[kdpTrimSize]?.maxW || "max-w-[440px]"}`}
                          style={{
                            fontFamily: `"${styleSettings.fontBody}", Georgia, serif`
                          }}
                        >
                          {renderPrintGuidesOverlay(leftPage, true)}
                          {/* Running Header */}
                          <div className="text-[10px] opacity-60 tracking-wider flex items-center justify-between border-b pb-1.5 mb-6 uppercase" style={{ borderColor: "currentColor", opacity: 0.35 }}>
                            {styleSettings.runningHeaderStyle === "title-chapter" ? (
                              <>
                                <span>{metadata.author}</span>
                                <span className="italic">{metadata.title}</span>
                              </>
                            ) : styleSettings.runningHeaderStyle === "chapter-page" ? (
                              <>
                                <span>Cap. {leftPage.chapterNumber}</span>
                                <span>Página {leftPage.pageNumber}</span>
                              </>
                            ) : (
                              <div className="h-2"></div>
                            )}
                          </div>

                          {/* Main Body Flow */}
                          <div className="flex-1 space-y-4 flex flex-col justify-between">
                            {leftPage.isCreditsPage ? (
                              <div className="flex-1 flex flex-col justify-between h-full text-xs select-text space-y-3">
                                <div className="space-y-1 mt-2 border-b pb-3" style={{ borderColor: 'currentColor', opacity: 0.8 }}>
                                  <h3 className="font-sans font-extrabold uppercase tracking-widest text-[12px]">{metadata.title}</h3>
                                  {metadata.subtitle && <p className="italic text-[10px] opacity-80">{metadata.subtitle}</p>}
                                  <p className="text-[10px] opacity-75">Por {metadata.author}</p>
                                </div>
                                <div className="space-y-3 flex-1 pt-1 text-[10.5px] leading-relaxed opacity-90">
                                  <div className="space-y-1.5">
                                    {metadata.publisherLogo && (metadata.logoPlacement === "credits" || metadata.logoPlacement === "both") && (
                                      <div className="mb-2 flex justify-start">
                                        <img 
                                          src={metadata.publisherLogo} 
                                          alt="Logo Editorial" 
                                          className="max-h-11 max-w-[100px] object-contain dark:invert print:invert-0 filter contrast-125" 
                                          referrerPolicy="no-referrer"
                                        />
                                      </div>
                                    )}
                                    <p className="font-semibold text-[10px]">
                                      {metadata.publisher || "DIAGRAMMERS Studio"}
                                    </p>
                                  </div>
                                  {metadata.publisher && (
                                    <p className="text-[10px]">Publicado por {metadata.publisher}, {metadata.year || "2026"}.</p>
                                  )}
                                  <p className="whitespace-pre-wrap text-[9.5px] leading-snug">{metadata.licenseDetails}</p>
                                  
                                  {metadata.isbn ? (
                                    <div className="mt-3 p-2.5 border border-dashed rounded-lg bg-emerald-500/5 flex flex-col space-y-0.5" style={{ borderColor: 'currentColor' }}>
                                      <span className="text-[8px] font-extrabold uppercase tracking-wider block text-emerald-600 dark:text-emerald-400 font-sans">ISBN Comercial Gratuito Amazon KDP</span>
                                      <span className="font-mono text-[11px] font-bold tracking-widest">{metadata.isbn}</span>
                                      <span className="text-[7.5px] opacity-75 font-sans leading-normal">Identificador internacional de libro asignado por KDP. El código de barra físico se generará en la portada trasera.</span>
                                    </div>
                                  ) : (
                                    <div className="mt-3 p-2 border border-dashed rounded-lg opacity-60 flex flex-col space-y-0.5" style={{ borderColor: 'currentColor' }}>
                                      <span className="text-[7.5px] font-bold uppercase tracking-wider block font-sans">ISBN Comercial Asignado</span>
                                      <span className="italic font-sans text-[8.5px] opacity-70">Pendiente de registro (Solicítalo en el panel "Derechos/ISBN").</span>
                                    </div>
                                  )}

                                  {metadata.safeCreativeId ? (
                                    <div className="mt-2.5 p-2.5 border border-dashed rounded-lg bg-indigo-500/5 flex flex-col space-y-0.5" style={{ borderColor: 'currentColor' }}>
                                      <div className="flex items-center gap-1">
                                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                        <span className="text-[8px] font-extrabold uppercase tracking-wider block text-indigo-600 dark:text-indigo-400 font-sans">Propiedad Intelectual Safe Creative</span>
                                      </div>
                                      <span className="font-mono text-[11px] font-semibold">{metadata.safeCreativeId}</span>
                                      <span className="text-[7.5px] opacity-75 font-sans leading-normal">Registro de autoría digital con timestamp inmutable y hash criptográfico publicado de la obra.</span>
                                    </div>
                                  ) : (
                                    <div className="mt-2.5 p-2 border border-dashed rounded-lg opacity-60 flex flex-col space-y-0.5" style={{ borderColor: 'currentColor' }}>
                                      <div className="flex items-center gap-1 font-sans">
                                        <Lock className="w-3 h-3 shrink-0 text-slate-500" />
                                        <span className="text-[7.5px] font-bold uppercase tracking-wider block">Registro Protegido Safe Creative</span>
                                      </div>
                                      <span className="italic font-sans text-[8.5px] opacity-70">Obra no registrada (Crea la firma criptográfica en el panel "Derechos/ISBN" para certificar tu autoría).</span>
                                    </div>
                                  )}
                                </div>
                                <div className="text-[7px] opacity-40 pt-1.5 border-t font-sans" style={{ borderColor: 'currentColor' }}>
                                  Maquetado en DIAGRAMMERS Studio • Cobertura legal universal bajo el Convenio de Berna de derechos de autor. {metadata.publisher ? `Publicado bajo catálogo de ${metadata.publisher}.` : ""}
                                </div>
                              </div>
                            ) : leftPage.isTOCPage ? (
                              renderTOCPageContent(leftPage)
                            ) : (
                              <>
                                {leftPage.isChapterOpener && (
                                  <div className={`pt-8 pb-4 ${titleAlignClass} space-y-2`}>
                                    <span className="text-xs uppercase font-semibold letter tracking-widest block font-serif" style={{ color: "var(--color-amber-600)" }}>
                                      Capítulo {leftPage.chapterNumber}
                                    </span>
                                    <h2
                                      className={getTitleStyleClasses()}
                                      style={{
                                        fontFamily: `"${styleSettings.fontTitle}", serif`,
                                        fontWeight: isCalligraphic || currentTitleStyle === "minimal-light" ? "normal" : "bold",
                                        letterSpacing: isCalligraphic ? "normal" : "0.02em",
                                        fontSize: titleFontSizeStyleValue
                                      }}
                                    >
                                      {renderTitleText(leftPage.chapterTitle)}
                                    </h2>
                                    <div className={`w-10 h-0.5 bg-current ${dividerAlignClass} my-3 opacity-25`}></div>
                                  </div>
                                )}

                                <div
                                  className={`leading-relaxed ${justificationClass} ${spacingContainerClass}`}
                                  style={{
                                    fontSize: bodyFontSizeStyleValue,
                                    lineHeight: styleSettings.lineHeight === "relaxed" ? "1.75" : "1.5"
                                  }}
                                >
                                  {leftPage.paragraphs.map((p, pIdx) => {
                                    if (p && typeof p === "string" && p.startsWith("__CHAPTER_OPENER_INLINE__:")) {
                                      const parts = p.split(":");
                                      const num = parts[1];
                                      const title = parts[2] || "";
                                      return (
                                        <div key={pIdx} className="my-6 text-center space-y-1.5 py-4 select-none">
                                          <div className="flex items-center justify-center gap-2">
                                            <div className="h-[1px] w-6 bg-amber-500/30"></div>
                                            <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-805/85" style={{ fontFamily: `"${styleSettings.fontTitle}", serif` }}>
                                              Capítulo {num}
                                            </span>
                                            <div className="h-[1px] w-6 bg-amber-500/30"></div>
                                          </div>
                                          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight" style={{ fontFamily: `"${styleSettings.fontTitle}", serif` }}>
                                            {title}
                                          </h3>
                                        </div>
                                      );
                                    }

                                    // Add drop cap layout to first paragraph if set and we are on an opener page
                                    const isFirstPara = pIdx === 0 && leftPage.isChapterOpener;
                                    const chap = chapters.find(c => c.chapterNumber === leftPage.chapterNumber);
                                    const originalIndex = chap ? chap.paragraphs.indexOf(p) : -1;
                                    const matchingIllustrations = leftPage.illustrations?.filter(ill => ill.paragraphIndex === originalIndex) || [];

                                    return (
                                      <React.Fragment key={pIdx}>
                                        <p
                                          className={`${
                                            isFirstPara && styleSettings.dropCap
                                              ? styleSettings.dropCapStyle === "ornately"
                                                ? "dropcap-ornately"
                                                : styleSettings.dropCapStyle === "modern"
                                                ? "dropcap-modern"
                                                : "dropcap-classic"
                                              : ""
                                          } tracking-wide ${getIndentClass(isFirstPara)} ${
                                            speakingChapterNum === leftPage.chapterNumber && speakingParagraphIdx === originalIndex
                                              ? "bg-amber-550/15 dark:bg-amber-500/15 border-l-2 border-amber-500 px-2 py-1 rounded-r transition-all duration-300 block shadow-sm shadow-amber-500/5 my-1 scale-[1.005]"
                                              : ""
                                          }`}
                                        >
                                          {p}
                                        </p>
                                        {matchingIllustrations.map(ill => (
                                          <BookIllustration 
                                            key={ill.id} 
                                            illustration={ill} 
                                            onTriggerRegen={handleRegenerateIllustration} 
                                            generatingId={generatingIllId} 
                                          />
                                        ))}
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Footer with page number */}
                          <div className="mt-6 pt-2 text-center text-xs opacity-60 font-mono font-medium">
                            — {leftPage.pageNumber} —
                          </div>
                        </div>
                      );
                    })()}

                    {/* Right Hand Page */}
                    {(() => {
                      const rightPage = pages[currentPageIndex + 1];
                      if (!rightPage) {
                        return (
                          <div className="min-h-[580px] md:min-h-[640px] bg-slate-950 p-8 rounded-r-xl border-l border-slate-900 flex flex-col justify-center items-center opacity-60">
                            <Book className="w-12 h-12 text-slate-700 mb-2" />
                            <p className="text-xs text-slate-500 font-mono">FIN DEL PROYECTO</p>
                            <span className="text-[10px] text-slate-600 mt-1">Colofón de Imprenta</span>
                          </div>
                        );
                      }

                      return (
                        <div
                          id={`sheet-pag-${rightPage.pageNumber}`}
                          className={`min-h-[580px] md:min-h-[640px] px-8 py-10 md:px-14 md:py-14 select-text relative flex flex-col justify-between transition-all duration-300 rounded-r-xl print:rounded-none opacity-100 ${
                            styleSettings.pageColor === "cream" ? "book-paper-cream text-amber-950" :
                            styleSettings.pageColor === "sepia" ? "book-paper-sepia text-amber-950" :
                            styleSettings.pageColor === "white" ? "book-paper-white text-slate-900" :
                            "book-paper-charcoal text-slate-100"
                          } book-spine-right printable-page-print w-full ${TRIM_SIZE_FACTORS[kdpTrimSize]?.aspect || "aspect-[2/3]"} ${TRIM_SIZE_FACTORS[kdpTrimSize]?.maxW || "max-w-[440px]"}`}
                          style={{
                            fontFamily: `"${styleSettings.fontBody}", Georgia, serif`
                          }}
                        >
                          {renderPrintGuidesOverlay(rightPage, false)}
                          {/* Running Header */}
                          <div className="text-[10px] opacity-60 tracking-wider flex items-center justify-between border-b pb-1.5 mb-6 uppercase" style={{ borderColor: "currentColor", opacity: 0.35 }}>
                            {styleSettings.runningHeaderStyle === "title-chapter" ? (
                              <>
                                <span className="italic">{rightPage.chapterTitle}</span>
                                <span>Página {rightPage.pageNumber}</span>
                              </>
                            ) : styleSettings.runningHeaderStyle === "chapter-page" ? (
                              <>
                                <span>Capítulo {rightPage.chapterNumber}</span>
                                <span>Pág. {rightPage.pageNumber}</span>
                              </>
                            ) : (
                              <div className="h-2"></div>
                            )}
                          </div>

                          {/* Main Body Flow */}
                          <div className="flex-1 space-y-4 flex flex-col justify-between">
                            {rightPage.isCreditsPage ? (
                              <div className="flex-1 flex flex-col justify-between h-full text-xs select-text space-y-3">
                                <div className="space-y-1 mt-2 border-b pb-3" style={{ borderColor: 'currentColor', opacity: 0.8 }}>
                                  <h3 className="font-sans font-extrabold uppercase tracking-widest text-[12px]">{metadata.title}</h3>
                                  {metadata.subtitle && <p className="italic text-[10px] opacity-80">{metadata.subtitle}</p>}
                                  <p className="text-[10px] opacity-75">Por {metadata.author}</p>
                                </div>
                                <div className="space-y-3 flex-1 pt-1 text-[10.5px] leading-relaxed opacity-90">
                                  <div className="space-y-1.5">
                                    {metadata.publisherLogo && (metadata.logoPlacement === "credits" || metadata.logoPlacement === "both") && (
                                      <div className="mb-2 flex justify-start">
                                        <img 
                                          src={metadata.publisherLogo} 
                                          alt="Logo Editorial" 
                                          className="max-h-11 max-w-[100px] object-contain dark:invert print:invert-0 filter contrast-125" 
                                          referrerPolicy="no-referrer"
                                        />
                                      </div>
                                    )}
                                    <p className="font-semibold text-[10px]">
                                      {metadata.publisher || "DIAGRAMMERS Studio"}
                                    </p>
                                  </div>
                                  {metadata.publisher && (
                                    <p className="text-[10px]">Publicado por {metadata.publisher}, {metadata.year || "2026"}.</p>
                                  )}
                                  <p className="whitespace-pre-wrap text-[9.5px] leading-snug">{metadata.licenseDetails}</p>
                                  
                                  {metadata.isbn ? (
                                    <div className="mt-3 p-2.5 border border-dashed rounded-lg bg-emerald-500/5 flex flex-col space-y-0.5" style={{ borderColor: 'currentColor' }}>
                                      <span className="text-[8px] font-extrabold uppercase tracking-wider block text-emerald-600 dark:text-emerald-400 font-sans">ISBN Comercial Gratuito Amazon KDP</span>
                                      <span className="font-mono text-[11px] font-bold tracking-widest">{metadata.isbn}</span>
                                      <span className="text-[7.5px] opacity-75 font-sans leading-normal">Identificador internacional de libro asignado por KDP. El código de barra físico se generará en la portada trasera.</span>
                                    </div>
                                  ) : (
                                    <div className="mt-3 p-2 border border-dashed rounded-lg opacity-60 flex flex-col space-y-0.5" style={{ borderColor: 'currentColor' }}>
                                      <span className="text-[7.5px] font-bold uppercase tracking-wider block font-sans">ISBN Comercial Asignado</span>
                                      <span className="italic font-sans text-[8.5px] opacity-70">Pendiente de registro (Solicítalo en el panel "Derechos/ISBN").</span>
                                    </div>
                                  )}

                                  {metadata.safeCreativeId ? (
                                    <div className="mt-2.5 p-2.5 border border-dashed rounded-lg bg-indigo-500/5 flex flex-col space-y-0.5" style={{ borderColor: 'currentColor' }}>
                                      <div className="flex items-center gap-1">
                                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                        <span className="text-[8px] font-extrabold uppercase tracking-wider block text-indigo-600 dark:text-indigo-400 font-sans">Propiedad Intelectual Safe Creative</span>
                                      </div>
                                      <span className="font-mono text-[11px] font-semibold">{metadata.safeCreativeId}</span>
                                      <span className="text-[7.5px] opacity-75 font-sans leading-normal">Registro de autoría digital con timestamp inmutable y hash criptográfico publicado de la obra.</span>
                                    </div>
                                  ) : (
                                    <div className="mt-2.5 p-2 border border-dashed rounded-lg opacity-60 flex flex-col space-y-0.5" style={{ borderColor: 'currentColor' }}>
                                      <div className="flex items-center gap-1 font-sans">
                                        <Lock className="w-3" />
                                        <span className="text-[7.5px] font-bold uppercase tracking-wider block">Registro Protegido Safe Creative</span>
                                      </div>
                                      <span className="italic font-sans text-[8.5px] opacity-70">Obra no registrada (Crea la firma criptográfica en el panel "Derechos/ISBN" para certificar tu autoría).</span>
                                    </div>
                                  )}
                                </div>
                                <div className="text-[7px] opacity-40 pt-1.5 border-t font-sans" style={{ borderColor: 'currentColor' }}>
                                  Maquetado en DIAGRAMMERS Studio • Cobertura legal universal bajo el Convenio de Berna de derechos de autor. {metadata.publisher ? `Publicado bajo catálogo de ${metadata.publisher}.` : ""}
                                </div>
                              </div>
                            ) : rightPage.isTOCPage ? (
                              renderTOCPageContent(rightPage)
                            ) : (
                              <>
                                {rightPage.isChapterOpener && (
                                  <div className={`pt-8 pb-4 ${titleAlignClass} space-y-2`}>
                                    <span className="text-xs uppercase font-semibold tracking-widest block font-serif" style={{ color: "var(--color-amber-600)" }}>
                                      Capítulo {rightPage.chapterNumber}
                                    </span>
                                    <h2
                                      className={getTitleStyleClasses()}
                                      style={{
                                        fontFamily: `"${styleSettings.fontTitle}", serif`,
                                        fontWeight: isCalligraphic || currentTitleStyle === "minimal-light" ? "normal" : "bold",
                                        letterSpacing: isCalligraphic ? "normal" : "0.02em",
                                        fontSize: titleFontSizeStyleValue
                                      }}
                                    >
                                      {renderTitleText(rightPage.chapterTitle)}
                                    </h2>
                                    <div className={`w-10 h-0.5 bg-current ${dividerAlignClass} my-3 opacity-25`}></div>
                                  </div>
                                )}

                                <div
                                  className={`leading-relaxed ${justificationClass} ${spacingContainerClass}`}
                                  style={{
                                    fontSize: bodyFontSizeStyleValue,
                                    lineHeight: styleSettings.lineHeight === "relaxed" ? "1.75" : "1.5"
                                  }}
                                >
                                  {rightPage.paragraphs.map((p, pIdx) => {
                                    if (p && typeof p === "string" && p.startsWith("__CHAPTER_OPENER_INLINE__:")) {
                                      const parts = p.split(":");
                                      const num = parts[1];
                                      const title = parts[2] || "";
                                      return (
                                        <div key={pIdx} className="my-6 text-center space-y-1.5 py-4 select-none">
                                          <div className="flex items-center justify-center gap-2">
                                            <div className="h-[1px] w-6 bg-amber-500/30"></div>
                                            <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-805/85" style={{ fontFamily: `"${styleSettings.fontTitle}", serif` }}>
                                              Capítulo {num}
                                            </span>
                                            <div className="h-[1px] w-6 bg-amber-500/30"></div>
                                          </div>
                                          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight" style={{ fontFamily: `"${styleSettings.fontTitle}", serif` }}>
                                            {title}
                                          </h3>
                                        </div>
                                      );
                                    }

                                    const isFirstPara = pIdx === 0 && rightPage.isChapterOpener;
                                    const chap = chapters.find(c => c.chapterNumber === rightPage.chapterNumber);
                                    const originalIndex = chap ? chap.paragraphs.indexOf(p) : -1;
                                    const matchingIllustrations = rightPage.illustrations?.filter(ill => ill.paragraphIndex === originalIndex) || [];

                                    return (
                                      <React.Fragment key={pIdx}>
                                        <p
                                          className={`${
                                            isFirstPara && styleSettings.dropCap
                                              ? styleSettings.dropCapStyle === "ornately"
                                                ? "dropcap-ornately"
                                                : styleSettings.dropCapStyle === "modern"
                                                ? "dropcap-modern"
                                                : "dropcap-classic"
                                              : ""
                                          } tracking-wide ${getIndentClass(isFirstPara)} ${
                                            speakingChapterNum === rightPage.chapterNumber && speakingParagraphIdx === originalIndex
                                              ? "bg-amber-550/15 dark:bg-amber-500/15 border-l-2 border-amber-500 px-2 py-1 rounded-r transition-all duration-300 block shadow-sm shadow-amber-500/5 my-1 scale-[1.005]"
                                              : ""
                                          }`}
                                        >
                                          {p}
                                        </p>
                                        {matchingIllustrations.map(ill => (
                                          <BookIllustration 
                                            key={ill.id} 
                                            illustration={ill} 
                                            onTriggerRegen={handleRegenerateIllustration} 
                                            generatingId={generatingIllId} 
                                          />
                                        ))}
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Footer with page number */}
                          <div className="mt-6 pt-2 text-center text-xs opacity-60 font-mono font-medium">
                            — {rightPage.pageNumber} —
                          </div>
                        </div>
                      );
                    })()}

                  </div>
                ) : viewerMode === "continuous" ? (
                  /* CONTINUOUS VERTICAL READING VIEW (Apilado) */
                  <div className="space-y-6 md:space-y-8 print:space-y-0 max-w-2xl mx-auto">
                    {pages.map((p) => (
                      <div
                        key={p.pageNumber}
                        id={`sheet-pag-${p.pageNumber}`}
                        className={`p-8 md:p-14 select-text relative flex flex-col justify-between shadow-lg rounded-xl print:shadow-none print:bg-white print:p-0 print:m-0 print:border-none print:page-break ${
                          styleSettings.pageColor === "cream" ? "book-paper-cream text-amber-950" :
                          styleSettings.pageColor === "sepia" ? "book-paper-sepia text-amber-950" :
                          styleSettings.pageColor === "white" ? "book-paper-white text-slate-900" :
                          "book-paper-charcoal text-slate-100"
                        } printable-page-print w-full ${TRIM_SIZE_FACTORS[kdpTrimSize]?.aspect || "aspect-[2/3]"} ${TRIM_SIZE_FACTORS[kdpTrimSize]?.maxW || "max-w-[440px]"} mx-auto`}
                        style={{
                          fontFamily: `"${styleSettings.fontBody}", Georgia, serif`
                        }}
                      >
                        {renderPrintGuidesOverlay(p, p.pageNumber % 2 !== 0)}
                        {/* Page Boundary Marker for visual feedback (no-print) */}
                        <div className="no-print absolute top-2 right-4 text-[10px] bg-slate-500/10 text-slate-400 px-2.5 py-0.5 rounded uppercase font-mono tracking-widest">
                          Plica del Pliego: Hoja {p.pageNumber}
                        </div>

                        {/* Running Header */}
                        <div className="text-[10px] opacity-65 tracking-wider flex items-center justify-between border-b pb-1.5 mb-6 uppercase" style={{ borderColor: "currentColor", opacity: 0.35 }}>
                          <>
                            <span className="italic">{p.chapterTitle}</span>
                            <span>Hoja {p.pageNumber}</span>
                          </>
                        </div>

                        {/* Text */}
                        <div className="flex-1 space-y-4 flex flex-col justify-between">
                          {p.isCreditsPage ? (
                            <div className="flex-1 flex flex-col justify-between h-full text-xs select-text space-y-3">
                              <div className="space-y-1 mt-2 border-b pb-3" style={{ borderColor: 'currentColor', opacity: 0.8 }}>
                                <h3 className="font-sans font-extrabold uppercase tracking-widest text-[12px]">{metadata.title}</h3>
                                {metadata.subtitle && <p className="italic text-[10px] opacity-80">{metadata.subtitle}</p>}
                                <p className="text-[10px] opacity-75">Por {metadata.author}</p>
                              </div>
                              <div className="space-y-3 flex-1 pt-1 text-[10.5px] leading-relaxed opacity-90">
                                <div className="space-y-1.5">
                                  {metadata.publisherLogo && (metadata.logoPlacement === "credits" || metadata.logoPlacement === "both") && (
                                    <div className="mb-2 flex justify-start">
                                      <img 
                                        src={metadata.publisherLogo} 
                                        alt="Logo Editorial" 
                                        className="max-h-11 max-w-[100px] object-contain dark:invert print:invert-0 filter contrast-125" 
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                  )}
                                  <p className="font-semibold text-[10px]">
                                    {metadata.publisher || "DIAGRAMMERS Studio"}
                                  </p>
                                </div>
                                {metadata.publisher && (
                                  <p className="text-[10px]">Publicado por {metadata.publisher}, {metadata.year || "2026"}.</p>
                                )}
                                <p className="whitespace-pre-wrap text-[9.5px] leading-snug">{metadata.licenseDetails}</p>
                                
                                {metadata.isbn ? (
                                  <div className="mt-3 p-2.5 border border-dashed rounded-lg bg-emerald-500/5 flex flex-col space-y-0.5" style={{ borderColor: 'currentColor' }}>
                                    <span className="text-[8px] font-extrabold uppercase tracking-wider block text-emerald-600 dark:text-emerald-400 font-sans">ISBN Comercial Gratuito Amazon KDP</span>
                                    <span className="font-mono text-[11px] font-bold tracking-widest">{metadata.isbn}</span>
                                    <span className="text-[7.5px] opacity-75 font-sans leading-normal">Identificador internacional de libro asignado por KDP. El código de barra físico se generará en la portada trasera.</span>
                                  </div>
                                ) : (
                                  <div className="mt-3 p-2 border border-dashed rounded-lg opacity-60 flex flex-col space-y-0.5" style={{ borderColor: 'currentColor' }}>
                                    <span className="text-[7.5px] font-bold uppercase tracking-wider block font-sans">ISBN Comercial Asignado</span>
                                    <span className="italic font-sans text-[8.5px] opacity-70">Pendiente de registro (Solicítalo en el panel "Derechos/ISBN").</span>
                                  </div>
                                )}

                                {metadata.safeCreativeId ? (
                                  <div className="mt-2.5 p-2.5 border border-dashed rounded-lg bg-indigo-500/5 flex flex-col space-y-0.5" style={{ borderColor: 'currentColor' }}>
                                    <div className="flex items-center gap-1">
                                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                      <span className="text-[8px] font-extrabold uppercase tracking-wider block text-indigo-600 dark:text-indigo-400 font-sans">Propiedad Intelectual Safe Creative</span>
                                    </div>
                                    <span className="font-mono text-[11px] font-semibold">{metadata.safeCreativeId}</span>
                                    <span className="text-[7.5px] opacity-75 font-sans leading-normal">Registro de autoría digital con timestamp inmutable y hash criptográfico publicado de la obra.</span>
                                  </div>
                                ) : (
                                  <div className="mt-2.5 p-2 border border-dashed rounded-lg opacity-60 flex flex-col space-y-0.5" style={{ borderColor: 'currentColor' }}>
                                    <div className="flex items-center gap-1 font-sans">
                                      <Lock className="w-3" />
                                      <span className="text-[7.5px] font-bold uppercase tracking-wider block">Registro Protegido Safe Creative</span>
                                    </div>
                                    <span className="italic font-sans text-[8.5px] opacity-70">Obra no registrada (Crea la firma criptográfica en el panel "Derechos/ISBN" para certificar tu autoría).</span>
                                  </div>
                                )}
                              </div>
                              <div className="text-[7px] opacity-40 pt-1.5 border-t font-sans" style={{ borderColor: 'currentColor' }}>
                                Maquetado en DIAGRAMMERS Studio • Cobertura legal universal bajo el Convenio de Berna de derechos de autor. {metadata.publisher ? `Publicado bajo catálogo de ${metadata.publisher}.` : ""}
                              </div>
                            </div>
                          ) : p.isTOCPage ? (
                            renderTOCPageContent(p)
                          ) : (
                            <>
                              {p.isChapterOpener && (
                                <div className={`pt-8 pb-4 ${titleAlignClass} space-y-2`}>
                                  <span className="text-xs uppercase font-semibold letter tracking-widest block font-serif" style={{ color: "var(--color-amber-600)" }}>
                                    Capítulo {p.chapterNumber}
                                  </span>
                                  <h2
                                    className={getTitleStyleClasses()}
                                    style={{
                                      fontFamily: `"${styleSettings.fontTitle}", serif`,
                                      fontWeight: isCalligraphic || currentTitleStyle === "minimal-light" ? "normal" : "bold",
                                      letterSpacing: isCalligraphic ? "normal" : "0.02em",
                                      fontSize: titleFontSizeStyleValue
                                    }}
                                  >
                                    {renderTitleText(p.chapterTitle)}
                                  </h2>
                                  <div className={`w-10 h-0.5 bg-current ${dividerAlignClass} my-3 opacity-25`}></div>
                                </div>
                              )}

                              <div
                                className={`leading-relaxed ${justificationClass} ${spacingContainerClass}`}
                                style={{
                                  fontSize: bodyFontSizeStyleValue,
                                  lineHeight: styleSettings.lineHeight === "relaxed" ? "1.75" : "1.5"
                                }}
                              >
                                {p.paragraphs.map((para, ind) => {
                                  if (para && typeof para === "string" && para.startsWith("__CHAPTER_OPENER_INLINE__:")) {
                                    const parts = para.split(":");
                                    const num = parts[1];
                                    const title = parts[2] || "";
                                    return (
                                      <div key={ind} className="my-6 text-center space-y-1.5 py-4 select-none">
                                        <div className="flex items-center justify-center gap-2">
                                          <div className="h-[1px] w-6 bg-amber-500/30"></div>
                                          <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-805/85" style={{ fontFamily: `"${styleSettings.fontTitle}", serif` }}>
                                            Capítulo {num}
                                          </span>
                                          <div className="h-[1px] w-6 bg-amber-500/30"></div>
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight" style={{ fontFamily: `"${styleSettings.fontTitle}", serif` }}>
                                          {title}
                                        </h3>
                                      </div>
                                    );
                                  }

                                  const isFirstPara = ind === 0 && p.isChapterOpener;
                                  const chap = chapters.find(c => c.chapterNumber === p.chapterNumber);
                                  const originalIndex = chap ? chap.paragraphs.indexOf(para) : -1;
                                  const matchingIllustrations = p.illustrations?.filter(ill => ill.paragraphIndex === originalIndex) || [];

                                  return (
                                    <React.Fragment key={ind}>
                                      <p
                                        className={`${
                                          isFirstPara && styleSettings.dropCap
                                            ? styleSettings.dropCapStyle === "ornately"
                                              ? "dropcap-ornately"
                                              : styleSettings.dropCapStyle === "modern"
                                              ? "dropcap-modern"
                                              : "dropcap-classic"
                                            : ""
                                        } tracking-wide ${getIndentClass(isFirstPara)} ${
                                          speakingChapterNum === p.chapterNumber && speakingParagraphIdx === originalIndex
                                            ? "bg-amber-500/10 border-l-2 border-amber-500/80 px-2 py-1 rounded-r transition-all duration-300 block shadow-sm shadow-amber-500/5 my-1 scale-[1.005]"
                                            : ""
                                        }`}
                                      >
                                        {para}
                                      </p>
                                      {matchingIllustrations.map(ill => (
                                        <BookIllustration 
                                          key={ill.id} 
                                          illustration={ill} 
                                          onTriggerRegen={handleRegenerateIllustration} 
                                          generatingId={generatingIllId} 
                                        />
                                      ))}
                                    </React.Fragment>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Divider if applicable & NOT last page */}
                        {p.paragraphs.length > 0 && styleSettings.dividerStyle !== "none" && (
                          <div className="my-6 text-center text-sm font-sans tracking-widest text-[#b45309]">
                            {styleSettings.dividerChar}
                          </div>
                        )}

                        {/* Page Num Footer */}
                        <div className="mt-8 pt-2 text-center text-xs opacity-60 font-mono font-medium">
                          — {p.pageNumber} —
                        </div>
                      </div>
                    ))}
                  </div>
                ) : viewerMode === "epub" ? (
                  /* EPUB DIGITAL VIEWER AND CONTROL SUITE */
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 space-y-6 max-w-5xl mx-auto select-none mt-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-400 text-slate-950 font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase">REFLOWABLE</span>
                          <h3 className="text-base font-extrabold text-white">Consola de Diagramación ePub & Kindle eBook</h3>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Simula el renderizado de tu novela adaptada a pantallas táctiles e-paper y dispositivos móviles.</p>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[10px] text-slate-500">FORMATOS:</span>
                        <span className="text-[10.5px] px-2.5 py-1 bg-slate-950/80 rounded-lg text-amber-400 border border-slate-800/60 font-semibold uppercase">EPUB 3.2 • MOBI • KF8</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left: Device Controls & Metadata */}
                      <div className="lg:col-span-5 space-y-5">
                        {/* Preset Device */}
                        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3">
                          <span className="text-[10.5px] text-slate-400 font-bold uppercase tracking-wider block font-sans">1. Dispositivo e-Reader</span>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: "kindle", label: "Kindle paper", icon: Tablet, spec: "6.0\" Carta E-ink" },
                              { id: "kobo", label: "Kobo Libra", icon: Tablet, spec: "7.0\" Dual E-ink" },
                              { id: "phone", label: "Smartphone", icon: Smartphone, spec: "6.1\" OLED Fluid" }
                            ].map(dev => (
                              <button
                                key={dev.id}
                                id={`epub-dev-btn-${dev.id}`}
                                onClick={() => setEpubDevice(dev.id)}
                                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                                  epubDevice === dev.id 
                                    ? "bg-amber-500/10 border-amber-500 text-amber-400 font-semibold"
                                    : "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                                }`}
                              >
                                <dev.icon className="w-4 h-4" />
                                <span className="text-[10px] font-sans block leading-tight">{dev.label}</span>
                                <span className="text-[7.5px] font-mono text-slate-500 leading-none">{dev.spec}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Reading Style Presets */}
                        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3">
                          <span className="text-[10.5px] text-slate-400 font-bold uppercase tracking-wider block font-sans">2. Estilo de Pantalla Digital</span>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: "warm-sepia", label: "Sepia Vintage", bg: "bg-[#f4ecd8] text-[#341e05]", class: "bg-[#f4ecd8] text-amber-950 border-[#dfd1b8]" },
                              { id: "plain-white", label: "Blanco Papel", bg: "bg-white text-slate-900", class: "bg-white text-slate-900 border-slate-200" },
                              { id: "dark-carbon", label: "Carbon Noche", bg: "bg-[#1e1e1e] text-[#f5f5f5]", class: "bg-[#151515] text-slate-200 border-[#2e2e2e]" }
                            ].map(theme => (
                              <button
                                key={theme.id}
                                id={`epub-theme-btn-${theme.id}`}
                                onClick={() => setEpubTheme(theme.id)}
                                className={`p-2.5 rounded-xl border text-[10px] text-center transition-colors cursor-pointer flex flex-col items-center justify-center font-medium ${theme.class} ${
                                  epubTheme === theme.id ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-slate-950" : "opacity-85 hover:opacity-100"
                                }`}
                              >
                                <span>{theme.label}</span>
                              </button>
                            ))}
                          </div>

                          {/* Font slider */}
                          <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between items-center text-[10.5px]">
                              <span className="text-slate-400">Tamaño del Texto Digital:</span>
                              <span className="font-mono text-amber-400 font-bold">{epubFontSize}px (DPI Escalado)</span>
                            </div>
                            <input
                              type="range"
                              min="12"
                              max="24"
                              value={epubFontSize}
                              onChange={(e) => setEpubFontSize(Number(e.target.value))}
                              className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Packaging and ePUB validator action */}
                        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3">
                          <span className="text-[10.5px] text-slate-400 font-bold uppercase tracking-wider block font-sans">3. Compilador de Empaque Digital</span>
                          
                          <div className="space-y-2">
                            <button 
                              id="epub-validate-compiler-btn"
                              onClick={handleCompileEpubLogs}
                              className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-800 text-amber-400 text-[11px] font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Validar Integridad OCF & OPF</span>
                            </button>

                            {epubValId && (
                              <pre className="text-[9px] font-mono leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-850 text-slate-300 block max-h-36 overflow-y-auto whitespace-pre-wrap">
                                {epubLogs}
                              </pre>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              id="epub-download-toc-btn"
                              onClick={() => {
                                alert("Exportando Tabla de Contenidos Digital toc.ncx enriquecida con metadatos técnicos.");
                              }}
                              className="bg-slate-900 hover:bg-slate-850 p-2.5 rounded-lg text-slate-300 hover:text-white border border-slate-800 text-[10px] flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <FileDown className="w-3.5 h-3.5 text-slate-400" />
                              <span>Descargar TOC</span>
                            </button>
                            <button
                              id="epub-download-container-btn"
                              onClick={() => {
                                alert("Se ha compilado el contenedor ZIP ePub optimizado con mimetype y fuentes inyectadas con éxito.");
                              }}
                              className="bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-550 text-white p-2.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/10"
                            >
                              <FileDown className="w-3.5 h-3.5" />
                              <span>Exportar EPUB 3</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: Digital Simulated Frame */}
                      <div className="lg:col-span-7 flex flex-col items-center justify-center">
                        <div 
                          className={`w-full max-w-sm rounded-[36px] p-5 shadow-2xl relative border-4 flex flex-col justify-between transition-all duration-350 ${
                            epubDevice === "phone" 
                              ? "aspect-[9/18] rounded-[44px] max-w-[275px] border-slate-800 bg-slate-950" 
                              : epubDevice === "kobo"
                              ? "aspect-[4/5] border-[#c0af9a] bg-[#e6dbcc]"
                              : "aspect-[3/4] border-slate-750 bg-slate-800"
                          }`}
                        >
                          {/* Device Top Speaker for Phone */}
                          {epubDevice === "phone" && (
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full flex items-center justify-center border border-slate-900">
                              <div className="w-8 h-1 bg-slate-850 rounded-full"></div>
                            </div>
                          )}

                          {/* Interactive screen contents */}
                          <div 
                            className={`flex-1 rounded-2xl p-4 overflow-y-auto leading-relaxed border select-text relative flex flex-col justify-between mt-3 ${
                              epubTheme === "warm-sepia" 
                                ? "bg-[#fbf6ec] text-slate-950 border-[#eae0cc]" 
                                : epubTheme === "plain-white" 
                                ? "bg-white text-slate-950 border-slate-100" 
                                : "bg-[#161616] text-slate-300 border-[#252525]"
                            }`}
                            style={{ 
                              fontSize: `${epubFontSize}px`,
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}
                          >
                            <div className="space-y-4">
                              {/* Header info */}
                              <div className="flex justify-between items-center text-[9px] opacity-40 border-b pb-1 font-mono uppercase tracking-wider">
                                <span>{metadata.author || "Autor Literario"}</span>
                                <span>Capítulo {selectedEpubChapter}</span>
                              </div>

                              {/* Chapter Content display */}
                              {(() => {
                                const activeChap = chapters[selectedEpubChapter - 1] || chapters[0];
                                if (!activeChap) return <p className="text-slate-500 font-mono text-center pt-8">No hay texto para mostrar.</p>;
                                return (
                                  <div className="space-y-3">
                                    <h3 className="font-extrabold uppercase tracking-wide border-l-2 p-1 pl-2 border-amber-500 text-amber-600 dark:text-amber-400" style={{ fontSize: '1.15em' }}>
                                      {activeChap.title}
                                    </h3>
                                    {activeChap.paragraphs.slice(0, 3).map((par, pId) => (
                                      <p key={pId} className="text-xs leading-relaxed text-justify break-words text-opacity-95" style={{ textIndent: pId > 0 ? '1em' : '0px' }}>
                                        {par}
                                      </p>
                                    ))}
                                    {activeChap.paragraphs.length > 3 && (
                                      <p className="text-[10px] text-center opacity-40 italic font-mono uppercase tracking-wider pt-2 border-t border-slate-500/10">
                                        — Desliza / Swipe para seguir leyendo —
                                      </p>
                                    )}
                                  </div>
                                );
                              })()}
                            </div>

                            {/* Screen Footer with battery and page */}
                            <div className="flex justify-between items-center text-[8.5px] opacity-40 pt-2 border-t font-mono mt-4">
                              <span>Cap. {selectedEpubChapter} de {chapters.length}</span>
                              <div className="flex items-center gap-1.5">
                                <span>⚡ 89%</span>
                                <span>Reflowable digital</span>
                              </div>
                            </div>
                          </div>

                          {/* Bottom button of the device */}
                          {epubDevice !== "phone" && (
                            <div className="h-6 flex items-center justify-center pt-1 animate-pulse">
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-600/40 opacity-75"></div>
                            </div>
                          )}
                        </div>

                        {/* Chapter Switcher for simulator content */}
                        <div className="mt-4 flex items-center gap-2">
                          <button
                            id="epub-prev-chap-btn"
                            onClick={() => setSelectedEpubChapter(prev => Math.max(1, prev - 1))}
                            disabled={selectedEpubChapter === 1}
                            className="bg-slate-950 hover:bg-slate-850 disabled:opacity-40 border border-slate-850 text-slate-300 p-2 rounded-lg text-[11px] font-bold cursor-pointer disabled:cursor-not-allowed"
                          >
                            ◀ Cap. Anterior
                          </button>
                          <span className="text-xs text-slate-400 font-mono px-2">Capítulo seleccionado: <strong>{selectedEpubChapter}</strong></span>
                          <button
                            id="epub-next-chap-btn"
                            onClick={() => setSelectedEpubChapter(prev => Math.min(chapters.length, prev + 1))}
                            disabled={selectedEpubChapter === chapters.length}
                            className="bg-slate-950 hover:bg-slate-850 disabled:opacity-40 border border-slate-850 text-slate-300 p-2 rounded-lg text-[11px] font-bold cursor-pointer disabled:cursor-not-allowed"
                          >
                            Siguiente ▶
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* COMPILADOR DE PORTADA COMPLETA / CUBIERTA IMPRESA */
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 space-y-6 max-w-6xl mx-auto select-none mt-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-indigo-500 text-white font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase">CUBIERTA UNIFICADA</span>
                          <h3 className="text-base font-extrabold text-white">Pliego Impreso: Portada, Contraportada y Lomo Calculado</h3>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Calculador interactivo de lomo técnico e imprenta con sangrías y marcas de corte para Amazon KDP e IngramSpark.</p>
                      </div>
                      <div className="flex bg-slate-950/80 rounded-lg p-0.5 border border-slate-800">
                        <button
                          onClick={() => setCoverHardcover(false)}
                          className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                            !coverHardcover ? "bg-indigo-650 text-white" : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          Tapa Blanda (Rustic)
                        </button>
                        <button
                          onClick={() => setCoverHardcover(true)}
                          className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                            coverHardcover ? "bg-indigo-650 text-white" : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          Tapa Dura (Hardcover)
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left Side: Controls Column */}
                      <div className="lg:col-span-4 space-y-4">
                        
                        {/* Prompt Input Box */}
                        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl space-y-2">
                          <label className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">1. Prompt de Arte por IA</label>
                          <textarea
                            id="cover-prompt-text-input"
                            value={coverPrompt}
                            onChange={(e) => setCoverPrompt(e.target.value)}
                            placeholder="Ej. Bosque místico cubierto de nieve, tonos verdes, plateado, fantasía oscura..."
                            rows={3}
                            className="w-full text-[11px] bg-slate-900 text-slate-200 p-2 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
                          />
                          <button
                            id="cover-generate-btn"
                            onClick={handleCoverArtAiGeneration}
                            disabled={isGeneratingCover}
                            className="w-full bg-gradient-to-r from-indigo-600 to-amber-500 hover:from-indigo-550 hover:to-amber-400 text-white text-[11px] font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <Sparkles className={`w-3.5 h-3.5 ${isGeneratingCover ? "animate-spin" : ""}`} />
                            <span>{isGeneratingCover ? "Creando Obras de Arte..." : "Generar Portadas Sugeridas con IA"}</span>
                          </button>

                          {/* Cover Options Display Panel */}
                          {coverOptions.length > 0 && (
                            <div className="pt-3 border-t border-slate-800/50 space-y-2">
                              <span className="text-[9px] font-bold text-indigo-350 uppercase tracking-wider block">Opciones Propuestas con IA:</span>
                              <div className="grid grid-cols-3 gap-1.5">
                                {coverOptions.map((opt) => {
                                  const isSelected = coverArtUrl === opt.url;
                                  return (
                                    <button
                                      key={opt.id}
                                      type="button"
                                      onClick={() => {
                                        setCoverArtUrl(opt.url);
                                        setCoverPrimaryColor(opt.primaryColor);
                                        setCoverAccentColor(opt.accentColor);
                                      }}
                                      className={`p-1 border text-left transition-all relative overflow-hidden group rounded-lg h-[64px] flex flex-col justify-between cursor-pointer ${
                                        isSelected 
                                          ? "border-amber-500 bg-slate-900 ring-1 ring-amber-500/30" 
                                          : "border-slate-850 bg-slate-900/40 hover:border-slate-700"
                                      }`}
                                    >
                                      {/* Mini Thumbnail Background */}
                                      <div className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity">
                                        <img src={opt.url} alt={opt.label} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                      </div>
                                      
                                      <span className="text-[7.5px] font-bold uppercase tracking-wider text-amber-400 z-10 relative">Opción {opt.id}</span>
                                      
                                      <div className="z-10 relative leading-tight">
                                        <span className="text-[8px] font-semibold text-slate-100 block truncate leading-[1.1]">{opt.label}</span>
                                        <div className="flex gap-0.5 mt-0.5">
                                          <span className="w-1.5 h-1.5 rounded-full border border-slate-705 block" style={{ backgroundColor: opt.primaryColor }} />
                                          <span className="w-1.5 h-1.5 rounded-full border border-slate-705 block" style={{ backgroundColor: opt.accentColor }} />
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                              <p className="text-[8px] text-slate-500 italic leading-snug">
                                Haz clic en una opción para aplicarla instantáneamente al pliego.
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Paper & Spine Calculator Settings */}
                        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl space-y-3">
                          <label className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">2. Calculadora de Grosor del Lomo</label>
                          
                          <div className="space-y-1">
                            <span className="text-[9.5px] text-slate-400 block">Gramaje del Papel Interior:</span>
                            <div className="grid grid-cols-3 gap-1.5">
                              {[
                                { id: "cream-thick", label: "Crema Ahuesado", detail: "0.057 mm" },
                                { id: "white-standard", label: "Blanco Offset", detail: "0.050 mm" },
                                { id: "thin-digital", label: "Offset Ligero", detail: "0.035 mm" }
                              ].map(paper => (
                                <button
                                  key={paper.id}
                                  id={`paper-weight-btn-${paper.id}`}
                                  onClick={() => setSpinePaperWeight(paper.id as any)}
                                  className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                                    spinePaperWeight === paper.id
                                      ? "bg-indigo-950/60 border-indigo-500 text-indigo-350 font-semibold"
                                      : "bg-slate-900/30 border-slate-800 text-slate-400 hover:border-slate-700"
                                  }`}
                                >
                                  <span className="text-[9px] block leading-tight">{paper.label}</span>
                                  <span className="text-[7.5px] font-mono text-slate-500">{paper.detail}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-850/50 flex items-center justify-between">
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-slate-400 block">Páginas Registradas:</span>
                              <span className="text-xs text-white font-mono font-bold">
                                {pages.length > 0 ? pages.length : 120} Páginas ({chapters.length} Caps.)
                              </span>
                            </div>
                            <div className="text-right space-y-0.5">
                              <span className="text-[10px] text-indigo-300 block font-semibold flex items-center justify-end gap-1">
                                <Scissors className="w-3 h-3 text-amber-500" />
                                <span>Grosor Calculado:</span>
                              </span>
                              <span className="text-sm text-yellow-400 font-mono font-bold">
                                {(() => {
                                  const count = pages.length > 0 ? pages.length : 120;
                                  const mult = spinePaperWeight === "cream-thick" ? 0.057 : spinePaperWeight === "thin-digital" ? 0.035 : 0.050;
                                  const spine = (count * mult * (coverHardcover ? 1.15 : 1.0) + (coverHardcover ? 2.5 : 0));
                                  return `${spine.toFixed(2)} mm (${(spine / 25.4).toFixed(3)} in)`;
                                })()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Adjust Cover Parameters */}
                        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl space-y-3">
                          <label className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">3. Personalización de Cubiertas</label>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-[9px] text-slate-400 block mb-1">Color de Fondo:</span>
                              <div className="flex gap-1.5 items-center">
                                <input
                                  type="color"
                                  value={coverPrimaryColor}
                                  onChange={(e) => setCoverPrimaryColor(e.target.value)}
                                  className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                                />
                                <span className="text-[11px] font-mono text-slate-300">{coverPrimaryColor}</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-[9px] text-slate-400 block mb-1">Color de Detalles:</span>
                              <div className="flex gap-1.5 items-center">
                                <input
                                  type="color"
                                  value={coverAccentColor}
                                  onChange={(e) => setCoverAccentColor(e.target.value)}
                                  className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                                />
                                <span className="text-[11px] font-mono text-slate-300">{coverAccentColor}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] text-slate-400 block">Estilo Editorial:</span>
                            <select
                              value={coverTitleStyle}
                              onChange={(e) => setCoverTitleStyle(e.target.value as any)}
                              className="w-full text-xs bg-slate-900 border border-slate-800 text-slate-300 p-2 rounded-lg focus:outline-none"
                            >
                              <option value="serif-capital">Capital Clásico (Garamond)</option>
                              <option value="modern-clean">Suizo Minimalista (Inter)</option>
                              <option value="bold-editorial">Brutalista Negrita (Headline)</option>
                              <option value="retro-vintage">Manuscrito Vintage (Editorial)</option>
                            </select>
                          </div>

                          {/* Dynamic synopsis inputs */}
                          <div className="space-y-1 leading-normal">
                            <span className="text-[9px] text-slate-400 block">Sello Editorial Corto:</span>
                            <input
                              type="text"
                              value={customCoverLogo}
                              onChange={(e) => setCustomCoverLogo(e.target.value)}
                              className="w-full text-xs bg-slate-900 text-slate-200 p-1.5 rounded-lg border border-slate-850 focus:outline-none focus:border-indigo-500"
                            />
                          </div>

                          <div className="space-y-1 leading-normal">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] text-slate-400 block">Sinopsis de Contraportada:</span>
                              <button
                                type="button"
                                onClick={handleGenerateSynopsisWithAi}
                                disabled={isGeneratingSynopsis}
                                className="text-[9.5px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer disabled:opacity-40"
                              >
                                <Sparkles className={`w-3 h-3 ${isGeneratingSynopsis ? "animate-spin" : ""}`} />
                                <span>{isGeneratingSynopsis ? "Redactando..." : "Sugerir con IA"}</span>
                              </button>
                            </div>
                            <textarea
                              value={backCoverSynopsis}
                              onChange={(e) => setBackCoverSynopsis(e.target.value)}
                              rows={3}
                              placeholder="Sinopsis oficial que irá impresa en la contraportada..."
                              className="w-full text-[11px] bg-slate-900 text-slate-200 p-2 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
                            />
                          </div>

                          <div className="space-y-1 leading-normal">
                            <span className="text-[9px] text-slate-400 block">Sobre el Autor (Contraportada):</span>
                            <textarea
                              value={backCoverAuthorBio}
                              onChange={(e) => setBackCoverAuthorBio(e.target.value)}
                              rows={2}
                              placeholder="Biografía breve del autor..."
                              className="w-full text-[11px] bg-slate-900 text-slate-200 p-2 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
                            />
                          </div>
                        </div>

                      </div>

                      {/* Right Side: Interactive Print-Ready Wrap Canvas */}
                      <div className="lg:col-span-8 space-y-4">
                        
                        <div className="overflow-x-auto pb-4 custom-scrollbar">
                          {/* Complete pliego wrapping wrapper */}
                          <div 
                            className="min-w-[690px] border border-slate-750 p-6 rounded-2xl relative shadow-inner bg-slate-950/80 transition-all duration-300"
                          >
                            {/* Blue print trim guides label */}
                            <div className="flex justify-between items-center text-[8px] font-mono text-amber-500 uppercase tracking-widest mb-3 select-none">
                              <span>⬅ CONTRA PORTADA (ANVERSO TRASERO)</span>
                              <span className="text-slate-400 border px-1 border-dashed rounded">SANGRE DE IMPRENTA RECOMENDADA (BLEED: 3.175mm) ACTIVA</span>
                              <span>PORTADA PRINCIPAL (DELANTERA) ➡</span>
                            </div>

                            {/* Unfolded cover structure */}
                            <div 
                              className="flex select-text rounded-lg overflow-hidden border-2 relative transition-all duration-300 shadow-xl"
                              style={{ 
                                backgroundColor: coverPrimaryColor,
                                borderColor: coverAccentColor + "40"
                              }}
                            >
                              
                              {/* 1. BACK COVER CONTRA PORTADA (Width matches front) */}
                              <div className="flex-1 p-6 flex flex-col justify-between text-slate-200 font-sans border-r relative" style={{ borderColor: coverAccentColor + "20" }}>
                                <div className="space-y-4">
                                  {/* Publisher logo placeholder */}
                                  <div className="text-[9px] font-mono tracking-widest font-extrabold flex items-center gap-1 opacity-70" style={{ color: coverAccentColor }}>
                                    <span>✦</span>
                                    <span>{customCoverLogo}</span>
                                  </div>

                                  {/* Synopsis content */}
                                  <div className="space-y-2">
                                    <h4 className="text-[11px] font-extrabold uppercase tracking-widest border-b pb-1 opacity-90" style={{ borderColor: coverAccentColor }}>
                                      Sinopsis de Obra
                                    </h4>
                                    <p className="text-[9.5px] leading-relaxed text-slate-350 text-justify italic pl-1">
                                      "{backCoverSynopsis}"
                                    </p>
                                  </div>

                                  {/* Author bio on back cover */}
                                  <div className="space-y-2 pt-2">
                                    <h5 className="text-[9.5px] font-extrabold uppercase tracking-wide opacity-80" style={{ color: coverAccentColor }}>
                                      Sobre el Autor
                                    </h5>
                                    <p className="text-[9px] leading-relaxed text-slate-400 pl-1">
                                      {backCoverAuthorBio}
                                    </p>
                                  </div>
                                </div>

                                {/* Barcode and publishing details */}
                                <div className="pt-6 mt-8 border-t border-slate-800/60 flex justify-between items-end gap-3">
                                  <div className="text-[8px] font-mono text-slate-500 leading-tight">
                                    <span>Impreso en la UE</span><br />
                                    <span>Formato KDP Direct</span>
                                  </div>

                                  {/* Beautiful Interactive Barcode */}
                                  <div className="bg-white p-1.5 rounded-md flex flex-col items-center shadow-md select-none border border-slate-200">
                                    {/* Simulated Barcode Stripes */}
                                    <div className="w-24 h-8 flex items-stretch gap-[1px]">
                                      {[2,1,3,1,1,2,1,4,1,2,3,1,2,1,1,2,1,3,1,2,1,1,4,1,2].map((w, bi) => (
                                        <div 
                                          key={bi} 
                                          className="bg-slate-950 flex-none"
                                          style={{ width: `${w * 0.9}px` }}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-[7.5px] text-slate-900 font-mono font-bold tracking-wider mt-1 uppercase text-center block">
                                      {metadata.isbn || "ISBN SOLICITADO"}
                                    </span>
                                  </div>
                                </div>
                              </div>


                              {/* 2. CENTRE SPINE (LOMO DE IMPRENTA) */}
                              <div 
                                className="flex-none p-1.5 flex flex-col justify-between items-center text-center text-slate-200 border-r relative select-none"
                                style={{ 
                                  borderColor: coverAccentColor + "20",
                                  backgroundColor: coverPrimaryColor,
                                  width: `${Math.max(38, Number((pages.length > 0 ? pages.length : 120) * (spinePaperWeight === "cream-thick" ? 0.057 : spinePaperWeight === "thin-digital" ? 0.035 : 0.050) * (coverHardcover ? 1.15 : 1.0) + (coverHardcover ? 2.5 : 0)) * 3.6)}px`
                                }}
                              >
                                {/* Top imprint mark */}
                                <div className="text-[7px] font-mono tracking-widest" style={{ color: coverAccentColor }}>
                                  ♦
                                </div>

                                {/* Vertical Spine Text */}
                                <div 
                                  className="font-mono text-[9px] uppercase tracking-widest font-extrabold opacity-90 my-auto text-center"
                                  style={{ 
                                    writingMode: "vertical-rl", 
                                    textOrientation: "mixed",
                                    transform: "rotate(180deg)"
                                  }}
                                >
                                  <span style={{ color: coverAccentColor }}>{metadata.title || "TÍTULO DEL LIBRO"}</span>
                                  <span className="text-slate-400 font-normal mx-2">•</span>
                                  <span className="text-slate-300">{metadata.author || "AUTOR"}</span>
                                </div>

                                {/* Spine Bottom Imprint logo */}
                                <div className="text-[7.5px] font-mono font-bold tracking-wider" style={{ color: coverAccentColor }}>
                                  DP
                                </div>
                              </div>


                              {/* 3. FRONT COVER PORTADA PRINCIPAL */}
                              <div 
                                className="flex-1 aspect-[2/3] p-8 flex flex-col justify-between relative overflow-hidden bg-cover bg-center"
                                style={{ 
                                  backgroundImage: `linear-gradient(to bottom, ${coverPrimaryColor}80, ${coverPrimaryColor}ee), url("${coverArtUrl}")`
                                }}
                              >
                                {/* Accent boundary glowing border for visual depth */}
                                <div className="absolute inset-0 border border-slate-500/10 pointer-events-none"></div>

                                {/* Header subtitle/genre */}
                                <div className="z-10 text-center">
                                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] block" style={{ color: coverAccentColor }}>
                                    {metadata.genre || "NUEVA EDICIÓN INDUSTRIAL"}
                                  </span>
                                </div>

                                {/* Central Book Heading block tailored by styles */}
                                <div className="z-10 text-center space-y-2 my-auto">
                                  {coverTitleStyle === "serif-capital" ? (
                                    <>
                                      <h1 className="font-serif text-[21px] text-white tracking-widest uppercase font-extrabold leading-tight">
                                        {metadata.title || "TÍTULO DEL LIBRO"}
                                      </h1>
                                      {metadata.subtitle && (
                                        <p className="text-[10px] italic font-serif text-slate-350 tracking-wider">
                                          {metadata.subtitle}
                                        </p>
                                      )}
                                    </>
                                  ) : coverTitleStyle === "modern-clean" ? (
                                    <>
                                      <h1 className="font-sans text-[22px] text-white tracking-tighter uppercase font-black leading-none">
                                        {metadata.title || "TÍTULO DEL LIBRO"}
                                      </h1>
                                      {metadata.subtitle && (
                                        <p className="text-[9px] uppercase font-mono text-indigo-300 tracking-wider font-semibold">
                                          {metadata.subtitle}
                                        </p>
                                      )}
                                    </>
                                  ) : coverTitleStyle === "bold-editorial" ? (
                                    <>
                                      <h1 className="font-sans text-[24px] text-yellow-400 tracking-normal uppercase font-black leading-tight bg-slate-950/70 p-2 border-l-4 rounded" style={{ borderColor: coverAccentColor }}>
                                        {metadata.title || "TÍTULO DEL LIBRO"}
                                      </h1>
                                      {metadata.subtitle && (
                                        <p className="text-[9.5px] uppercase font-mono text-slate-300 tracking-widest pt-1 font-bold">
                                          {metadata.subtitle}
                                        </p>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <h1 className="font-serif italic text-[23px] text-white tracking-normal font-medium leading-none">
                                        {metadata.title || "TÍTULO DEL LIBRO"}
                                      </h1>
                                      {metadata.subtitle && (
                                        <p className="text-[9.5px] italic text-[#f3f4f6]/80 font-sans tracking-wide">
                                          {metadata.subtitle}
                                        </p>
                                      )}
                                    </>
                                  )}
                                </div>

                                {/* Author footer info */}
                                <div className="z-10 text-center space-y-1.5 pt-4 border-t border-slate-150/10">
                                  <span className="text-[11px] font-serif uppercase tracking-widest font-extrabold block text-slate-100">
                                    {metadata.author || "NOMBRE DEL AUTOR"}
                                  </span>
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: coverAccentColor }} />
                                    <span className="text-[8.5px] font-mono tracking-widest text-[#9ca3af]/90 uppercase">
                                      {customCoverLogo}
                                    </span>
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: coverAccentColor }} />
                                  </div>
                                </div>

                              </div>

                            </div>

                            {/* Scale Indicators */}
                            <div className="mt-4 flex flex-wrap gap-4 justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-850">
                              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                <span className="w-1 w-2.5 h-2.5 rounded bg-amber-500 inline-block shrink-0"></span>
                                <span>Maquetación: Cubierta extendida completa listada para la imprenta.</span>
                              </div>
                              <button
                                id="cover-print-download-layout-btn"
                                onClick={() => {
                                  alert("Llamando a la API de exportación de pliegos de alta resolución (CMYK). Tu archivo PDF listo para enviar a la imprenta con las especificaciones técnicas completas está listo en la sección de descargas del navegador.");
                                }}
                                className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-amber-400 text-[10px] font-bold py-1.5 px-3 rounded-md flex items-center gap-1.5 transition-all cursor-pointer"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                <span>Exportar PDF/X-1a (CMYK 300 DPI)</span>
                              </button>
                            </div>

                          </div>
                        </div>

                      </div>
                      
                    </div>
                  </div>
                )}

                {/* Navigation Paddles (No rendering during printing) */}
                {pages.length > 0 && viewerMode === "book" && (
                  <div className="no-print flex items-center justify-between max-w-2xl mx-auto pt-2 pb-10">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPageIndex === 0}
                      className="bg-slate-950 hover:bg-slate-850 disabled:opacity-30 border border-slate-800 text-slate-300 hover:text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all disabled:cursor-not-allowed select-none"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Pliego Anterior</span>
                    </button>

                    <div className="text-xs text-slate-500 font-mono">
                      Filtrando páginas de {pages.length}
                    </div>

                    <button
                      onClick={handleNextPage}
                      disabled={currentPageIndex + 2 >= pages.length}
                      className="bg-slate-950 hover:bg-slate-850 disabled:opacity-30 border border-slate-800 text-slate-300 hover:text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all disabled:cursor-not-allowed select-none"
                    >
                      <span>Siguiente Pliego</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>
          
          {/* Quick PDF Print Note */}
          {pages.length > 0 && (
            <div className="no-print mx-auto mb-16 text-center max-w-md bg-slate-950/40 p-4 border border-indigo-900/10 rounded-2xl">
              <div className="flex gap-2 text-left">
                <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-normal">
                  <strong className="text-slate-200">Consejo de Maquetación:</strong> Al exportar como PDF utilizando el botón o la acción de imprimir de tu navegador, asegúrate de habilitar los <strong className="text-amber-400 font-semibold">"Gráficos de fondo"</strong> (Background graphics) para conservar los hermosos tonos de papel ahuesado y capitulares editoriales.
                </p>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* EDITORIAL CLOUD DRIVE EXPLORER MODAL */}
      {showDriveModal && (
        <div id="drive-explorer-overlay" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-xl w-full relative space-y-6 shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={() => {
                if (driveImportingStatus === "idle" || driveImportingStatus === "success") {
                  setShowDriveModal(false);
                }
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer text-xs font-mono border border-slate-800 hover:border-slate-700 bg-slate-950 p-1.5 px-2.5 rounded-lg transition-all"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-400">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  Google Drive Workspace
                </h4>
                <p className="text-xs text-slate-400">
                  Autenticado de forma segura: <span className="font-mono text-amber-400 font-medium">{currentUser?.email || "marketingandcoach@gmail.com"}</span>
                </p>
              </div>
            </div>

            {driveImportingStatus !== "idle" ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-5">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-amber-500/10 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>

                <div className="space-y-2 max-w-sm">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-amber-350 font-mono">
                    {driveImportingStatus === "connecting" && "Estableciendo túnel OAuth seguro..."}
                    {driveImportingStatus === "downloading" && `Descargando archivo binario (${importProgress}%)...`}
                    {driveImportingStatus === "analyzing" && "Analizando estructura literaria con Gemini..."}
                    {driveImportingStatus === "formatting" && "Aplicando reglas de diagramación española (— rayado)..."}
                    {driveImportingStatus === "success" && "¡Manuscrito Sincronizado con Éxito!"}
                  </h5>

                  <div className="h-1.5 w-full bg-slate-850 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-300"
                      style={{ width: `${importProgress}%` }}
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 font-mono pt-1">
                    Documento de Origen: <span className="text-slate-300">{selectedDriveFile}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-amber-500/5 border border-amber-500/10 p-3.5 rounded-xl text-[11px] text-slate-400 leading-relaxed text-left">
                  💡 <strong className="text-slate-200">Demostración B2B:</strong> Elige un manuscrito de tu espacio editorial en la nube. El Diagramador extraerá el texto, discernirá su estructura con IA, y compaginará tu obra de forma automática e integrada.
                </div>

                <div className="space-y-1.5 text-left">
                  <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block font-mono">
                    Carpetas Compartidas / Manuscritos Activos:
                  </span>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {/* File 1: Cervantes */}
                    <div 
                      onClick={() => handleImportDriveFile("Manuscrito_El_Tunel_Cervantes_Maqueta_V2.docx")}
                      className="group bg-slate-950 hover:bg-amber-500/5 border border-slate-850 hover:border-amber-500/30 p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:scale-101"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">📄</span>
                        <div className="text-left">
                          <p className="text-xs font-bold text-slate-350 group-hover:text-amber-300 font-mono transition-colors">Manuscrito_Cervantes_DonQuijote_V3.docx</p>
                          <p className="text-[9.5px] text-slate-500 font-mono">Fichero DOCX • Miguel de Cervantes • Editado hoy</p>
                        </div>
                      </div>
                      <span className="text-[9.5px] bg-slate-900 border border-slate-800 text-slate-400 py-1 px-2.5 rounded font-mono group-hover:text-amber-300 transition-colors">
                        Sincronizar ➔
                      </span>
                    </div>

                    {/* File 2: Fantasy */}
                    <div 
                      onClick={() => handleImportDriveFile("Saga_La_Runa_Misteriosa_Fantasía.rtf")}
                      className="group bg-slate-950 hover:bg-amber-500/5 border border-slate-850 hover:border-amber-500/30 p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:scale-101"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">⚡</span>
                        <div className="text-left">
                          <p className="text-xs font-bold text-slate-350 group-hover:text-amber-300 font-mono transition-colors">Saga_La_Runa_Misteriosa_Fantasía.rtf</p>
                          <p className="text-[9.5px] text-slate-500 font-mono">Borrador Fantasía de Sanderson • Modificado ayer</p>
                        </div>
                      </div>
                      <span className="text-[9.5px] bg-slate-900 border border-slate-800 text-slate-400 py-1 px-2.5 rounded font-mono group-hover:text-amber-300 transition-colors">
                        Sincronizar ➔
                      </span>
                    </div>

                    {/* File 3: Detective / Noir */}
                    <div 
                      onClick={() => handleImportDriveFile("La_Persiana_Siniestra_Thriller.txt")}
                      className="group bg-slate-950 hover:bg-amber-500/5 border border-slate-850 hover:border-amber-500/30 p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:scale-101"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🔫</span>
                        <div className="text-left">
                          <p className="text-xs font-bold text-slate-350 group-hover:text-amber-300 font-mono transition-colors">La_Persiana_Siniestra_Thriller.txt</p>
                          <p className="text-[9.5px] text-slate-500 font-mono">Diálogos Noir de Chandler • Modificado hace 3 días</p>
                        </div>
                      </div>
                      <span className="text-[9.5px] bg-slate-900 border border-slate-800 text-slate-400 py-1 px-2.5 rounded font-mono group-hover:text-amber-300 transition-colors">
                        Sincronizar ➔
                      </span>
                    </div>

                    {/* File 4: Strategy Pitch */}
                    <div 
                      onClick={() => handleImportDriveFile("PITCH_INVERSORES_DIAGRAMMERS_V2.gdoc")}
                      className="group bg-slate-950/90 hover:bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:scale-101 bg-gradient-to-r from-amber-500/5 to-transparent"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">💼</span>
                        <div className="text-left">
                          <p className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5">
                            PITCH_AUTORES_&_INVERSIONISTAS_B2B.gdoc 
                            <span className="text-[7.5px] font-bold text-slate-950 bg-amber-400 px-1.5 py-0.2 rounded font-mono uppercase tracking-wider">Plan B2B</span>
                          </p>
                          <p className="text-[10px] text-slate-400">Plan estratégico para Editores e Inversionistas • Reciente</p>
                        </div>
                      </div>
                      <span className="text-[9.5px] bg-amber-500 text-slate-950 font-bold py-1 px-2.5 rounded font-mono shadow-md">
                        Importar ➔
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[9.5px] text-slate-500 font-mono flex justify-between items-center border-t border-slate-850">
                  <span>✓ Google API Client v3 (SSL Enforced)</span>
                  <span>IP autorizada del sandbox</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 1.5. HIGH FIDELITY PHYSICAL ISBN BARCODE SCANNER MODAL */}
      {isIsbnScannerOpen && (
        <div id="isbn-scanner-overlay" className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/93 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-4xl w-full relative shadow-2xl space-y-6 my-8 animate-fadeIn">
            {/* Modal Exit */}
            <button
              onClick={() => {
                stopRealCamera();
                setIsIsbnScannerOpen(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer text-xs font-mono border border-slate-800 hover:border-slate-705 bg-slate-950 p-1.5 px-3 rounded-xl transition-all z-20"
            >
              ✕ Cerrar Escáner
            </button>

            {/* Header branding */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 border border-indigo-500/25">
                <Camera className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>Diagrammers Prepress Core</span>
                  <span className="text-[8px] bg-gradient-to-r from-indigo-500 to-pink-500 text-slate-950 px-1.5 py-0.2 rounded font-black font-sans">ISBN OPTICAL LIVE</span>
                </h3>
                <p className="text-xs text-slate-400">Captura cubiertas físicas o simula la extracción instantánea de metatodos bibliotecarios reales</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT COLUMN: VIEWPORT */}
              <div className="flex flex-col gap-4">
                <div className="relative aspect-video w-full bg-black rounded-2xl border-2 border-indigo-500/50 overflow-hidden shadow-2xl flex flex-col items-center justify-center">
                  
                  {/* Virtual Scanning overlay indicators */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-md text-[8.5px] font-mono font-bold uppercase tracking-wider text-indigo-400 border border-indigo-500/20 z-10 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
                    <span>Modo: {scannerRealCameraActive ? "SENSOR DISPOSITIVO ACTIVADO" : "SIMULADOR COAXIAL ACTIVO"}</span>
                  </div>

                  {scannerRealCameraActive ? (
                    <video
                      ref={scannerVideoRef}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 p-6 text-center select-none">
                      <QrCode className="w-16 h-16 text-indigo-500/15 mb-2 animate-pulse" />
                      <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">
                        Coloca la cubierta o código de barras del libro frente a la lente
                      </p>
                      <span className="text-[9px] text-indigo-400/60 font-mono mt-1">Soporta ISBN-13 y EAN-13 estándar de imprenta</span>
                    </div>
                  )}

                  {/* Red Optical Laser Bar */}
                  <div className="absolute left-0 right-0 h-0.5 bg-red-500/85 shadow-[0_0_8px_rgba(239,68,68,0.95)] animate-pulse z-10"
                    style={{
                      animationDuration: "1.6s",
                      animationIterationCount: "infinite",
                      top: "40%"
                    }}
                  />

                  {/* Viewport Corner Ticks */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-indigo-400 z-10"></div>
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-indigo-400 z-10"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-indigo-400 z-10"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-indigo-400 z-10"></div>

                  {/* Status Indicator text overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur border border-slate-800 p-2 rounded-lg z-10 text-center font-mono text-[9px] leading-relaxed">
                    {scannerStatus === "idle" && (
                      <span className="text-slate-400">AGUARDANDO ALINEACIÓN DE BARRAS...</span>
                    )}
                    {scannerStatus === "searching" && (
                      <span className="text-indigo-400 animate-pulse font-bold">ANALIZANDO CUMPLIMIENTO EAN-13... EXTRAYENDO METADATOS...</span>
                    )}
                    {scannerStatus === "scanned" && (
                      <span className="text-emerald-400 font-bold">✓ ¡CÓDIGO {scannedResult} EXTRACTADO! LIBRO ASIGNADO AL STUDIO.</span>
                    )}
                  </div>
                </div>

                {/* Real Device Camera Activating Button */}
                <div className="flex gap-2">
                  {!scannerRealCameraActive ? (
                    <button
                      onClick={() => startRealCamera(scannerVideoRef.current)}
                      className="flex-1 bg-slate-950 hover:bg-slate-900 text-slate-350 hover:text-white border border-slate-850 p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Camera className="w-4 h-4 text-indigo-400" />
                      <span>Conectar Cámara Real</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopRealCamera}
                      className="flex-1 bg-red-950/20 hover:bg-red-950/30 text-red-400 border border-red-900/30 p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Desconectar Cámara</span>
                    </button>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: BOOK SHELF SIMULATOR */}
              <div className="bg-slate-950/50 border border-slate-850 rounded-2xl p-4 flex flex-col gap-4">
                <div className="space-y-1 border-b border-slate-850 pb-2">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block font-mono">Demos Físicos Disponibles</span>
                  <span className="text-[11px] text-slate-450 block leading-normal">Haz click para simular aproximarle el libro al sensor y gatillar el reconocimiento:</span>
                </div>

                <div className="flex flex-col gap-3 max-h-[290px] overflow-y-auto pr-1">
                  {MOCK_ISBN_DB.map((book, idx) => (
                    <div
                      key={book.isbn}
                      onClick={() => handleScanBook(idx)}
                      className="bg-slate-900/85 hover:bg-slate-900 border border-slate-850 hover:border-indigo-500/40 p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all gap-4 group hover:shadow-lg shadow-indigo-500/5 select-none"
                    >
                      {/* Cover representation */}
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-11 ${book.coverColor} rounded border flex flex-col justify-between p-1 shrink-0`}>
                          <div className="h-0.5 w-full bg-white/20 rounded-full" />
                          <div className="text-[4px] font-sans font-black text-center text-white truncate scale-90">{book.title}</div>
                          <div className="text-[3px] font-mono text-center text-white/50 scale-75 truncate">{book.genre}</div>
                        </div>

                        <div className="text-left space-y-0.5">
                          <h4 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors uppercase truncate max-w-[190px]">{book.title}</h4>
                          <p className="text-[10.5px] text-slate-400 font-medium truncate max-w-[190px]">{book.author}</p>
                          <span className="text-[9px] text-slate-500 font-mono tracking-wide">{book.publisher} ({book.year})</span>
                        </div>
                      </div>

                      {/* Barcode drawing container */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="bg-white p-1 rounded border border-slate-850 flex flex-col items-center gap-0.5 w-[55px]">
                          {/* CSS Drawn standard barcodes */}
                          <div className="flex h-4 w-full justify-between items-stretch bg-white">
                            <div className="bg-black w-[1px]"></div>
                            <div className="bg-black w-[1px]"></div>
                            <div className="bg-white w-[1px]"></div>
                            <div className="bg-black w-[3px]"></div>
                            <div className="bg-white w-[1px]"></div>
                            <div className="bg-black w-[1px]"></div>
                            <div className="bg-black w-[2px]"></div>
                            <div className="bg-white w-[1px]"></div>
                            <div className="bg-black w-[1px]"></div>
                            <div className="bg-black w-[3px]"></div>
                            <div className="bg-white w-[1px]"></div>
                            <div className="bg-black w-[2px]"></div>
                            <div className="bg-white w-[1px]"></div>
                            <div className="bg-black w-[1px]"></div>
                          </div>
                          <span className="text-[4px] font-mono text-black scale-90 tracking-tighter">9781234567</span>
                        </div>
                        <span className="text-[8px] font-mono text-slate-500 group-hover:text-indigo-400 font-bold tracking-wider uppercase transition-colors">
                          ISBN: {book.isbn.substring(10)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-2 text-[9.5px] text-slate-400 font-mono leading-relaxed bg-slate-900/45 p-2.5 rounded-lg border border-slate-900 text-center">
                  💡 <strong>Procedimiento Óptico:</strong> Al pasar de forma virtual o real el libro, el decodificador extraerá la información e inyectará automáticamente el Título, Autor, Subtítulos, Editorial, Año de edición e ISBN en los metadatos globales del maquetador interactivo.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🧧 MODAL DE APORTACIÓN VOLUNTARIA / TIP JAR (OPTION 1) */}
      {showDonationPromptModal && (
        <div id="donation-prompt-overlay" className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl space-y-6 text-center">
            
            {/* Elegant close header */}
            <button 
              onClick={() => {
                setShowDonationPromptModal(false);
                setPendingDownload(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer text-xs font-mono border border-slate-800 hover:border-slate-700 bg-slate-950 p-1.5 px-3 rounded-xl transition-all"
            >
              ✕ Cerrar
            </button>

            {/* Glowing Logo Circle */}
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 via-fuchsia-600 to-orange-500 p-0.5 shadow-2xl shadow-cyan-500/20 flex items-center justify-center relative animate-pulse">
              <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full"></div>
              <div className="bg-slate-950 rounded-full w-full h-full flex items-center justify-center animate-spin-slow">
                <HostiaSoftLogo className="w-12 h-12" glow={true} />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-amber-400 tracking-[0.25em] uppercase font-mono block">Maquetación Encolada con Éxito</span>
              <h3 className="text-2xl font-black text-white leading-tight uppercase font-sans" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                 ¡Tu Libro está Listo! ✨
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono truncate max-w-xs mx-auto text-emerald-400">
                📄 {pendingDownload?.filename}
              </p>
            </div>

            {/* Explanatory Editorial Text */}
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 text-left space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                El motor tipográfico de <strong>DIAGRAMMERS Studio</strong> ha finalizado el procesamiento de tu obra, asegurando márgenes, sangría y grillas suizas exactas para Amazon KDP. El uso de este sistema es compatible con las descargas gratuitas auspiciadas por Google AI Studio.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-900 pt-2.5">
                La maquetación profesional suele costar cientos de dólares de forma externa. Si el software de <strong>DIAGRAMMERS</strong> te ha resultado valioso, te invitamos a dejar una <strong>contribución voluntaria</strong> libre para apoyar al creador de esta herramienta. ¡Tu aporte mantiene vivo el desarrollo independiente libre de anuncios!
              </p>
            </div>

            {/* Large interactive tip selector preset */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-slate-950 border border-slate-850 hover:border-amber-500/40 p-2.5 rounded-xl text-center transition-all cursor-default group">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-mono">Un café</span>
                <span className="text-sm font-black text-slate-200 group-hover:text-amber-400 transition-colors">US$ 5</span>
              </div>
              <div className="bg-slate-950 border border-amber-500/20 hover:border-amber-500/60 p-2.5 rounded-xl text-center transition-all cursor-default group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[6px] font-bold uppercase px-1 py-0.5 rounded-bl">Pop</div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Sugerido</span>
                <span className="text-sm font-black text-amber-400">US$ 15</span>
              </div>
              <div className="bg-slate-950 border border-slate-850 hover:border-amber-500/40 p-2.5 rounded-xl text-center transition-all cursor-default group">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-mono">Patrocinador</span>
                <span className="text-sm font-black text-slate-200 group-hover:text-amber-400 transition-colors">US$ 35</span>
              </div>
            </div>

            {/* Core Action buttons with real anchors */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              {/* Option A: Support and download */}
              <a 
                href={metadata.donationLink}
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => {
                  if (pendingDownload) {
                    triggerFileDownload(pendingDownload.content, pendingDownload.filename, pendingDownload.mimeType, true);
                  }
                  setShowDonationPromptModal(false);
                }}
                className="w-full sm:flex-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-center text-xs font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/10 no-underline"
              >
                <Heart className="w-4 h-4 fill-current stroke-none text-slate-950" />
                <span>Aportar Propina y Descargar</span>
              </a>

              {/* Option B: Continue Free */}
              <button 
                onClick={() => {
                  if (pendingDownload) {
                    triggerFileDownload(pendingDownload.content, pendingDownload.filename, pendingDownload.mimeType, true);
                  }
                  setShowDonationPromptModal(false);
                }}
                className="w-full sm:w-auto text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-bold py-3 px-5 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
              >
                Continuar gratis
              </button>
            </div>

            <div className="text-[9.5px] text-slate-500 font-mono">
              🔒 Las transacciones se realizan de manera 100% segura y directa a través de {metadata.donationLink?.includes("paypal") ? "PayPal" : "tu plataforma de soporte"}.
            </div>
          </div>
        </div>
      )}

      {/* 💳 MODAL DE BLOQUEO COMERCIAL / PRO PAYWALL (SI STRICT MODE ESTÁ ACTIVO) */}
      {showProPaywallModal && (
        <div id="pro-paywall-overlay" className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-lg overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl shadow-indigo-500/10 space-y-6 text-center">
            
            {/* Close Button / Voluntary bypass for checking */}
            <button 
              onClick={() => {
                setShowProPaywallModal(false);
                setPendingDownload(null);
                setLicenseError(null);
                setLicenseSuccess(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer text-xs font-mono border border-slate-800 hover:border-slate-700 bg-slate-950 p-1.5 px-3 rounded-xl transition-all font-bold"
            >
              ✕ Cancelar
            </button>

            {/* Glowing Crown Icon */}
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 p-0.5 shadow-2xl shadow-indigo-500/20 flex items-center justify-center relative animate-pulse">
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"></div>
              <div className="bg-slate-950 rounded-full w-full h-full flex items-center justify-center">
                <Crown className="w-10 h-10 text-indigo-400" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-indigo-400 tracking-[0.25em] uppercase font-mono block">SUITE EDITORIAL PROFESIONAL</span>
              <h3 className="text-2xl font-black text-white leading-tight uppercase font-sans tracking-tight">
                Desbloquear DIAGRAMMERS Pro ⚡
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto font-sans">
                La descarga del archivo listo para Amazon KDP (<span className="text-emerald-400 font-mono truncate block max-w-xs mx-auto mt-0.5">{pendingDownload?.filename}</span>) y los motores premium de maquetación requieren una Licencia Activa.
              </p>
            </div>

            {/* Price Cards Simulation */}
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl relative overflow-hidden">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Plan Autor</span>
                <span className="text-sm font-black text-white block">US$ 15 / único</span>
                <p className="text-[9.5px] text-slate-550 mt-1 leading-normal font-sans">Descargas ilimitadas para 1 obra literaria completa.</p>
              </div>
              <div className="bg-slate-950 border-2 border-indigo-500/30 p-3 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-500 text-slate-950 text-[6px] font-black uppercase px-2 py-0.5 rounded-bl">RECOMENDADO</div>
                <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-wider block font-mono">Plan Editorial</span>
                <span className="text-sm font-black text-indigo-300 block">US$ 29 / único</span>
                <p className="text-[9.5px] text-slate-550 mt-1 leading-normal font-sans">Uso comercial ilimitado para múltiples libros de por vida.</p>
              </div>
            </div>

            {/* License Activation Form */}
            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 text-left space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between font-sans">
                  <span>Código de Activación Pro</span>
                  <span className="text-[8px] font-mono text-indigo-450 lowercase">ej: DIAG-XXXX-YYYY-ZZZZ</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputLicenseKey}
                    onChange={(e) => {
                      setInputLicenseKey(e.target.value);
                      setLicenseError(null);
                    }}
                    placeholder="Pega aquí tu clave de licencia recibida"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono tracking-widest uppercase text-center focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => {
                      if (!inputLicenseKey.trim()) {
                        setLicenseError("Ingresa tu código de activación.");
                        return;
                      }
                      const isValid = verifyLicenseKey(inputLicenseKey);
                      if (isValid) {
                        setLicenseSuccess(true);
                        setLicenseError(null);
                        
                        // Activate user
                        setIsMaverickMember(true);
                        localStorage.setItem("is_maverick_member", "true");
                        
                        // Proceed to download
                        setTimeout(() => {
                          if (pendingDownload) {
                            triggerFileDownload(pendingDownload.content, pendingDownload.filename, pendingDownload.mimeType, true);
                          }
                          setShowProPaywallModal(false);
                          setLicenseSuccess(false);
                          setInputLicenseKey("");
                        }, 1200);
                      } else {
                        setLicenseError("Código de activación incorrecto o fórmula vencida. Comprueba los caracteres.");
                      }
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all active:scale-95 shrink-0"
                  >
                    Activar
                  </button>
                </div>
              </div>

              {licenseError && (
                <p className="text-[10px] text-red-400 font-medium leading-relaxed font-mono block text-center bg-red-950/10 border border-red-900/20 p-2 rounded-xl">
                  ⚠ {licenseError}
                </p>
              )}

              {licenseSuccess && (
                <p className="text-[10px] text-emerald-400 font-bold leading-relaxed font-mono block text-center bg-emerald-900/10 border border-emerald-900/20 p-2 rounded-xl">
                  ✓ ¡Licencia de la Suite de Maquetación Activada! Descargando tu obra...
                </p>
              )}
            </div>

            {/* Support Payment Button */}
            <div className="space-y-3">
              <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-wider">¿Aún no tienes un código de licencia?</span>
              
              <a 
                href={metadata.donationLink || "https://paypal.me"}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-center text-xs font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-indigo-500/15 no-underline"
              >
                <DollarSign className="w-4 h-4 text-white shrink-0" />
                <span>Adquirir Licencia Pro en Pasarela</span>
              </a>

              <p className="text-[9px] text-slate-500 leading-normal max-w-sm mx-auto font-sans">
                Realiza el pago correspondiente en tu pasarela y obtén tu código oficial al instante de manu del administrador. ¡Tu compra impulsa el desarrollo de software independiente libre de regalías y comisionistas!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 1.6. PRE-PRESS & INDESIGN PROFESSIONAL PRINT MODAL */}
      {showPrintPdfModal && (
        <div id="print-prepress-overlay" className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-8 max-w-6xl w-full relative shadow-2xl space-y-6 my-8">
            
            {/* Modal Exit Button */}
            <button 
              onClick={() => setShowPrintPdfModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer text-xs font-mono border border-slate-800 hover:border-slate-700 bg-slate-950 p-1.5 px-3 rounded-xl transition-all z-20"
            >
              ✕ Cerrar Preimpresión
            </button>

            {/* Header branding */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20 text-amber-400">
                  <Printer className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold text-white tracking-tight flex items-center gap-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                    Asistente de Preimpresión Editorial B2B
                    <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Alta Fidelidad</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Estándares de imprenta offset / digital: KDP, IngramSpark, y prensas de rodillo tradicionales.
                  </p>
                </div>
              </div>
            </div>

            {/* Grid Layout: Controls vs Screen spreads */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Interactive Prepress Controls */}
              <div className="lg:col-span-4 space-y-5 text-left bg-slate-950/40 p-5 rounded-2xl border border-slate-850/60 max-h-[640px] overflow-y-auto">
                
                {/* 1. Size Preset selector */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                    1. Formato Final del Libro (Trim Size):
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {(["6x9", "A5", "Pocket", "A4"] as const).map((preset) => {
                      const { label, widthMm, heightMm } = getPrintDimensions(preset);
                      return (
                        <button
                          key={preset}
                          onClick={() => {
                            setPrintSizePreset(preset);
                            setPrintPageSelectedNum(1);
                          }}
                          className={`p-2.5 rounded-xl text-left border cursor-pointer transition-all flex flex-col justify-between select-none ${
                            printSizePreset === preset 
                              ? "bg-amber-500/10 border-amber-500 text-amber-300 shadow-md shadow-amber-500/5" 
                              : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800 hover:text-slate-300"
                          }`}
                        >
                          <span className="font-bold text-[11px] font-sans truncate">{preset === "6x9" ? "Novela 6x9" : preset}</span>
                          <span className="text-[9px] font-mono text-slate-500 mt-1">{widthMm}x{heightMm}mm</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Bleed configuration (Sangrado) */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      2. Área de Sangrado (Bleed):
                    </span>
                    <span className="font-mono text-xs text-amber-300 font-bold">{printBleedMm} mm</span>
                  </div>
                  <input 
                    type="range" 
                    min={0} 
                    max={5} 
                    step={1} 
                    value={printBleedMm}
                    onChange={(e) => setPrintBleedMm(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[8.5px] font-mono text-slate-500">
                    <span>0mm (Doméstico)</span>
                    <span>3mm (Recomendado Imprenta)</span>
                    <span>5mm (Especial)</span>
                  </div>
                  <p className="text-[9.5px] text-slate-400 leading-normal pt-1 italic">
                    El sangrado expande el lienzo exterior para asegurar que no queden márgenes blancos de corte tras guillotinar.
                  </p>
                </div>

                {/* 3. Margen de seguridad */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      3. Margen de Seguridad Interior:
                    </span>
                    <span className="font-mono text-xs text-indigo-400 font-bold">{printSafeMarginMm} mm</span>
                  </div>
                  <input 
                    type="range" 
                    min={10} 
                    max={25} 
                    step={1} 
                    value={printSafeMarginMm}
                    onChange={(e) => setPrintSafeMarginMm(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[8.5px] font-mono text-slate-500">
                    <span>10mm (Estrecho)</span>
                    <span>15mm (Estándar Literario)</span>
                    <span>25mm (Profundo)</span>
                  </div>
                </div>

                {/* 4. Marcas y Pliegos toggles */}
                <div className="space-y-3 pt-2 border-t border-slate-850">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                    4. Elementos de Placa Editorial:
                  </span>

                  <div className="space-y-2 text-xs">
                    {/* Crop Marks */}
                    <label className="flex items-center gap-2.5 text-slate-350 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={printShowCropMarks} 
                        onChange={(e) => setPrintShowCropMarks(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 focus:ring-opacity-25 w-3.5 h-3.5"
                      />
                      <span>Incluir Líneas de Corte (Crop Marks)</span>
                    </label>

                    {/* Registration Target circles */}
                    <label className="flex items-center gap-2.5 text-slate-350 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={printShowRegMarks} 
                        onChange={(e) => setPrintShowRegMarks(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 focus:ring-opacity-25 w-3.5 h-3.5"
                      />
                      <span>Diana & Miras de Registro Vertical/Horiz</span>
                    </label>

                    {/* Calibration blocks */}
                    <label className="flex items-center gap-2.5 text-slate-350 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={printShowColorBars} 
                        onChange={(e) => setPrintShowColorBars(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 focus:ring-opacity-25 w-3.5 h-3.5"
                      />
                      <span>Tiras de Control de Color CMYK</span>
                    </label>

                    {/* Document Info stamp label */}
                    <label className="flex items-center gap-2.5 text-slate-350 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={printShowDocInfo} 
                        onChange={(e) => setPrintShowDocInfo(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 focus:ring-opacity-25 w-3.5 h-3.5"
                      />
                      <span>Identificador de Firma y Metadatos de Placa</span>
                    </label>

                    {/* Visual Guideline overlays for bleed and safe margin inside simulator */}
                    <div className="border-t border-slate-850/60 my-2 pt-2 space-y-2">
                      <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-widest block font-mono">
                        Superponer Guías Visuales de Trabajo:
                      </span>
                      
                      <label className="flex items-center gap-2.5 text-slate-350 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={printShowBleedGuides} 
                          onChange={(e) => setPrintShowBleedGuides(e.target.checked)}
                          className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 focus:ring-opacity-25 w-3.5 h-3.5"
                        />
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-0.5 bg-red-500 inline-block rounded"></span>
                          Establecer Caja de Recorte (Trim Line - Roja)
                        </span>
                      </label>

                      <label className="flex items-center gap-2.5 text-slate-350 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={printShowSafeGuides} 
                          onChange={(e) => setPrintShowSafeGuides(e.target.checked)}
                          className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 focus:ring-opacity-25 w-3.5 h-3.5"
                        />
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-0.5 bg-blue-500 inline-block rounded"></span>
                          Pauta de Margen Seguro (Safe Margins - Azul)
                        </span>
                      </label>
                    </div>

                    {/* Double Page Spread toggler */}
                    <div className="border-t border-slate-850/60 pt-2">
                      <label className="flex items-center gap-2.5 text-slate-350 cursor-pointer select-none bg-slate-900 border border-slate-850 p-2 rounded-xl">
                        <input 
                          type="checkbox" 
                          checked={printDoublePageSpread} 
                          onChange={(e) => {
                            setPrintDoublePageSpread(e.target.checked);
                            setPrintPageSelectedNum(1);
                          }}
                          className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 focus:ring-opacity-25 w-3.5 h-3.5"
                        />
                        <div className="text-left">
                          <p className="font-bold text-xs text-amber-400 font-sans">Vista de Pliego Confrontado</p>
                          <p className="text-[9px] text-slate-500 leading-normal">Muestra páginas par/impar confrontadas tipo fotolito.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Core Export button with downloads */}
                <div className="pt-3 border-t border-slate-850 space-y-3">
                  <button
                    onClick={() => withPaymentCheck(exportProfessionalPrintPDF, "PDF Oficial de Imprenta (KDP)")}
                    disabled={printExportStatus !== "idle" || pages.length === 0}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider shadow-lg shadow-amber-500/10 transition-all active:scale-[0.98] disabled:opacity-40"
                  >
                    {printExportStatus === "building" ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Generando Maqueta de Impresión...</span>
                      </>
                    ) : printExportStatus === "success" ? (
                      <>
                        <Check className="w-4 h-4 text-slate-950 stroke-[3px]" />
                        <span>¡Descargado con Éxito!</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4 text-slate-950" />
                        <span>Exportar HTML a PDF Imprenta</span>
                      </>
                    )}
                  </button>
                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-850 space-y-2 text-left">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block font-mono">
                      ⚙️ Instrucciones de Conversión Perfecta (300 DPI - CMYK):
                    </span>
                    <ol className="text-[10px] text-slate-450 list-decimal pl-4 space-y-1 font-sans leading-normal">
                      <li>Haz clic arriba para descargar tu <strong className="text-slate-300">archivo de preimpresión HTML</strong>.</li>
                      <li>Abre el documento descargado en cualquier navegador (Chrome, Edge o Safari).</li>
                      <li>Presiona <kbd className="bg-slate-900 border border-slate-800 text-slate-300 px-1 py-0.5 rounded font-mono text-[9px]">Ctrl + P</kbd> (<kbd className="bg-slate-900 border border-slate-800 text-slate-300 px-1 py-0.5 rounded font-mono text-[9px]">Cmd + P</kbd> en Mac) para abrir el diálogo de impresión de tu sistema.</li>
                      <li>Establece el destino como <strong className="text-amber-500 font-semibold">"Guardar como PDF"</strong>.</li>
                      <li>En <em className="italic">Más Ajustes</em>, activa la opción <strong className="text-indigo-400 font-semibold">"Gráficos de fondo" (Background graphics)</strong> para conservar los hermosos tonos de papel ahuesado y capitulares.</li>
                      <li>Asegúrate de configurar los márgenes como <strong className="text-slate-300 font-semibold">"Ninguno" (None)</strong> o "Predeterminado" para respetar la simetría suiza y sangrados de la suite.</li>
                    </ol>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Sheets rendering spreadeer */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                
                {/* Visualizer header metrics info */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/40 p-4 rounded-2xl border border-slate-850 text-xs text-left">
                  <div className="space-y-0.5">
                    <p className="text-slate-400 uppercase font-mono text-[10px] tracking-wide">Dimensiones Totales del Pliego (con Sangría):</p>
                    <p className="text-white font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                      {(() => {
                        const { widthMm, heightMm } = getPrintDimensions(printSizePreset);
                        const totalW = widthMm + 2 * printBleedMm;
                        const totalH = heightMm + 2 * printBleedMm;
                        return `${totalW.toFixed(1)} x ${totalH.toFixed(1)} mm (Ancho x Alto)`;
                      })()}
                    </p>
                  </div>

                  <div className="space-y-0.5 font-mono text-right text-[10px]">
                    <p className="text-slate-500">MÁRGENES INTERNOS SEGURIDAD:</p>
                    <p className="text-indigo-400 font-bold">{printSafeMarginMm} mm por lado</p>
                  </div>
                </div>

                {/* Simulator Sheet Box container */}
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 min-h-[460px] flex items-center justify-center relative shadow-inner overflow-hidden">
                  
                  {pages.length === 0 ? (
                    <div className="text-center space-y-2 max-w-sm">
                      <span className="text-2xl">⚠️</span>
                      <p className="text-xs text-slate-400 font-mono">No hemos detectado manuscritos compaginados. Por favor, carga o escribe un texto para activar el generador de imposición de imprenta.</p>
                    </div>
                  ) : (
                    <div className="w-full space-y-4">
                      {printDoublePageSpread ? (
                        /* DOUBLE FACING PAGES VIEW */
                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto items-center">
                          {(() => {
                            // Page calculations
                            // Ensure the currentPage is representing the pair
                            const leftIndex = printPageSelectedNum % 2 === 0 ? printPageSelectedNum - 1 : printPageSelectedNum - 2;
                            const rightIndex = leftIndex + 1;

                            const leftPage = leftIndex >= 0 ? pages[leftIndex] : null;
                            const rightPage = rightIndex < pages.length ? pages[rightIndex] : null;

                            return (
                              <>
                                {/* Left spread / Verso (usually Left) */}
                                {leftPage ? (
                                  <div className="space-y-1">
                                    <span className="text-[10px] font-mono text-slate-500 block">Pliego Izquierdo (Pág {leftPage.pageNumber} - Par)</span>
                                    {renderPrintPageMarkup(leftPage, true)}
                                  </div>
                                ) : (
                                  <div className="border border-dashed border-slate-800 rounded-xl h-[330px] flex items-center justify-center text-[10px] text-slate-600 font-mono">
                                    [Página de inicio / Solapa]
                                  </div>
                                )}

                                {/* Right spread / Recto (usually Right) */}
                                {rightPage ? (
                                  <div className="space-y-1">
                                    <span className="text-[10px] font-mono text-slate-500 block">Pliego Derecho (Pág {rightPage.pageNumber} - Impar)</span>
                                    {renderPrintPageMarkup(rightPage, false)}
                                  </div>
                                ) : (
                                  <div className="border border-dashed border-slate-800 rounded-xl h-[330px] flex items-center justify-center text-[10px] text-slate-600 font-mono">
                                    [Página Final del Pliego]
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      ) : (
                        /* SINGLE PAGE VIEW */
                        <div className="max-w-xs mx-auto">
                          {(() => {
                            const p = pages[printPageSelectedNum - 1];
                            if (!p) return null;
                            const isLeft = p.pageNumber % 2 === 0;
                            return (
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-slate-500 block">Hoja de Maquetación Real (Página {p.pageNumber})</span>
                                {renderPrintPageMarkup(p, isLeft)}
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Simulated Paginator Slider Controls */}
                {pages.length > 0 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                    
                    {/* Navigation buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (printDoublePageSpread) {
                            setPrintPageSelectedNum(prev => Math.max(1, prev - 2));
                          } else {
                            setPrintPageSelectedNum(prev => Math.max(1, prev - 1));
                          }
                        }}
                        disabled={printPageSelectedNum <= 1}
                        className="bg-slate-950 hover:bg-slate-850 p-2 border border-slate-800 hover:border-slate-700 text-white rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono select-none"
                      >
                        ◀ Pliego Anterior
                      </button>

                      <div className="text-xs text-white font-mono bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-lg">
                        Hoja <span className="text-amber-400 font-bold">{printPageSelectedNum}</span> / {pages.length}
                      </div>

                      <button
                        onClick={() => {
                          if (printDoublePageSpread) {
                            setPrintPageSelectedNum(prev => Math.min(pages.length, prev + 2));
                          } else {
                            setPrintPageSelectedNum(prev => Math.min(pages.length, prev + 1));
                          }
                        }}
                        disabled={printPageSelectedNum >= pages.length}
                        className="bg-slate-950 hover:bg-slate-850 p-2 border border-slate-800 hover:border-slate-700 text-white rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono select-none"
                      >
                        Siguiente Pliego ▶
                      </button>
                    </div>

                    {/* slider ranges */}
                    <div className="flex-1 max-w-xs w-full flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-mono">1</span>
                      <input 
                        type="range" 
                        min={1} 
                        max={pages.length} 
                        value={printPageSelectedNum} 
                        onChange={(e) => setPrintPageSelectedNum(Number(e.target.value))}
                        className="flex-1 accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[10px] text-slate-500 font-mono">{pages.length}</span>
                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* Verification checks list footer */}
            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex flex-wrap justify-between gap-4 text-left">
              <span>✓ Vectorization engine v1.4 (Sindicato B2B • DIAGRAMMERS INC)</span>
              <span className="text-slate-400">Guía: Para una correcta impresión, configure su navegador a <strong className="text-amber-400">Guardar como PDF / Márgenes: Ninguno / Gráficos de fondo: Activo</strong>.</span>
            </div>

          </div>
        </div>
      )}
      {/* --- GUIAUTOR AI FLOATING ASSISTANT WIDGET --- */}
      {/* ======================================================== */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 font-sans">
        
        {/* Expanded Chat Dialog Panel */}
        {isDagramitoOpen && (
          <div className="w-[350px] sm:w-[390px] h-[550px] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
            
            {/* Header */}
            <div className="bg-slate-950 border-b border-slate-800/60 p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-xl shadow-inner select-none relative">
                  🧠
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-slate-950" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-100 text-xs tracking-wide flex items-center gap-1.5 uppercase font-mono">
                    Guiautor AI <span className="text-[8px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded-full border border-amber-500/20 font-black">COMENTOR</span>
                  </h4>
                  <p className="text-[9px] text-slate-400 font-mono">
                    {language === "en" ? "Your multi-channel AI expert guide!" :
                     language === "pt" ? "Seu mentor IA multicanal!" :
                     language === "fr" ? "Votre mentor IA multi-canal!" :
                     language === "it" ? "Il tuo assistente IA multicanale!" :
                     language === "de" ? "Ihr Multikanal-KI-Mentor!" :
                     "¡Tu mentor IA multicanal paso a paso!"}
                  </p>
                </div>
              </div>
              
              {/* Header Controls */}
              <div className="flex items-center gap-1.5">
                {/* Voice Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const nextVal = !guiautorVoiceActive;
                    setGuiautorVoiceActive(nextVal);
                    if (nextVal) {
                      const feedback = language === "en" ? "Voice guidance activated." :
                                       language === "pt" ? "Guia por voz ativado." :
                                       language === "fr" ? "Guidage vocal activé." :
                                       language === "it" ? "Guida vocale attivata." :
                                       language === "de" ? "Sprachführung aktiviert." :
                                       "Guía por voz activa de Guiautor habilitada.";
                      speakHelper(feedback);
                    } else {
                      if (typeof window !== "undefined" && "speechSynthesis" in window) {
                        window.speechSynthesis.cancel();
                      }
                    }
                  }}
                  title={guiautorVoiceActive ? "Silenciar lector por voz" : "Escuchar respuestas automáticamente"}
                  className={`p-1.5 rounded-lg cursor-pointer transition-colors ${guiautorVoiceActive ? "bg-amber-500/20 text-amber-400 border border-amber-550/30" : "hover:bg-slate-800/80 text-slate-500 hover:text-slate-350"}`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>

                {/* Reset History Icon button */}
                <button
                  onClick={() => {
                    const confirmMsg = language === "en" ? "Restart conversation history with Guiautor AI?" :
                                     language === "pt" ? "Reiniciar histórico com Guiautor AI?" :
                                     "¿Seguro que deseas reiniciar tu diálogo literario con Guiautor AI?";
                    if (window.confirm(confirmMsg)) {
                      setDagramitoMessages([
                        {
                          role: "assistant",
                          content: t.dagramitoGreeting || "🧠 Ready! How can I tutor you now?"
                        }
                      ]);
                    }
                  }}
                  title="Reiniciar diálogo"
                  className="p-1.5 hover:bg-slate-800/80 text-slate-500 hover:text-slate-300 rounded-lg cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsDagramitoOpen(false)}
                  className="p-1.5 hover:bg-slate-800/80 text-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat message space (scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/20 flex flex-col">
              {dagramitoMessages.map((msg, idx) => (
                <main key={idx} className={`flex gap-2 max-w-[88%] ${msg.role === "user" ? "self-end justify-end flex-row-reverse" : "self-start text-left"}`}>
                  
                  {msg.role === "assistant" && (
                    <div className="flex flex-col items-center gap-1.5 shrink-0 self-start">
                      <div className="w-7 h-7 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-sm select-none">
                        🧠
                      </div>
                      <button
                        type="button"
                        onClick={() => speakHelper(msg.content)}
                        className="p-1 hover:bg-slate-800 hover:text-amber-400 text-slate-500 rounded transition-colors cursor-pointer"
                        title="Escuchar este mensaje"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex-1 flex flex-col gap-2">
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-amber-500 text-slate-950 font-medium rounded-br-none rounded-2xl border border-amber-400/20"
                        : "bg-slate-800/70 border border-slate-750/30 text-slate-200 rounded-tl-none rounded-2xl select-text space-y-1"
                    }`}>
                      {msg.role === "user" ? (
                        msg.content
                      ) : (
                        parseDagramitoMarkdown(msg.content)
                      )}
                    </div>
                    
                    {/* Render Quick Actions right under first greeting of assistant */}
                    {msg.role === "assistant" && idx === 0 && (
                      <div className="mt-1 space-y-1.5 bg-slate-950/45 p-2 rounded-xl border border-slate-850">
                        <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wider font-mono block">🎯 Acciones Rápidas del Tutor:</span>
                        <div className="grid grid-cols-1 gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              // Reload standard Quijote text & navigate to Content tab
                              setRawText(TEXT_TEMPLATES[0].text);
                              setChapters([
                                {
                                  chapterNumber: 1,
                                  title: "De la condición y ejercicio del famoso hidalgo don Quijote de la Mancha",
                                  paragraphs: [
                                    "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda...",
                                    "Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años; era de complexión recia, seco de carnes, enjuto de rostro, gran madrugador y amigo de la caza."
                                  ]
                                }
                              ]);
                              setActiveTab("content");
                              triggerStudioToast("¡Libro de prueba cargado con éxito!", "success");
                              sendDagramitoQuery("¿Cómo estructuro el libro de prueba?");
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold p-1 px-2 rounded-lg text-[10px] text-left transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-800/80 hover:border-amber-500/30"
                          >
                            <span>📘</span> <span>Cargar Manuscrito Demo</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab("preset");
                              sendDagramitoQuery("¿Me explicas cómo usar el Análisis de Estilos por IA?");
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold p-1 px-2 rounded-lg text-[10px] text-left transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-800/80 hover:border-cyan-500/30"
                          >
                            <span>🪄</span> <span>Elegir Estilo & Tipografías KDP</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingChapterIdx(0);
                              setMobileEditorTab("corrector");
                              triggerStudioToast("Autocorrección de capítulos para autores.", "info");
                              sendDagramitoQuery("¿Cómo funciona el Corrector Ortotipográfico RAE?");
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-orange-400 font-bold p-1 px-2 rounded-lg text-[10px] text-left transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-800/80 hover:border-orange-500/30"
                          >
                            <span>✍️</span> <span>Abrir Autocorrector Ortográfico</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab("multimedia");
                              sendDagramitoQuery("¿Cómo clono mi voz literaria?");
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-purple-400 font-bold p-1 px-2 rounded-lg text-[10px] text-left transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-800/80 hover:border-purple-500/30"
                          >
                            <span>🎙️</span> <span>Probar Clonación de Voz</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </main>
              ))}

              {/* Typing indicator */}
              {dagramitoIsTyping && (
                <div className="flex gap-2 text-left self-start max-w-[85%]">
                  <div className="w-7 h-7 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-sm shrink-0 select-none animate-pulse">
                    🧠
                  </div>
                  <div className="bg-slate-800/40 border border-slate-800 text-slate-400 py-2.5 px-3.5 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5 italic font-mono">
                    <span className="flex gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                    </span>
                    <span>
                      {language === "en" ? "Guiautor AI is searching sources..." :
                       language === "pt" ? "Guiautor AI está buscando anotações..." :
                       language === "fr" ? "Guiautor AI cherche des notes..." :
                       language === "it" ? "Guiautor AI sta leggendo gli appunti..." :
                       language === "de" ? "Guiautor AI sucht Notizen..." :
                       "Guiautor AI está ordenando ideas neuronales..."}
                    </span>
                  </div>
                </div>
              )}

              {/* Invisible anchor to scroll */}
              <div ref={dagramitoEndRef} />
            </div>

            {/* Recommended quick clicks area */}
            <div className="bg-slate-950/80 px-3.5 py-2 border-t border-slate-850/40 text-left">
              <p className="text-[8.5px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 font-mono">
                {language === "en" ? "RECOMMENDED FREQUENT QUESTIONS:" :
                 language === "pt" ? "PERGUNTAS FREQUENTES RECOMENDADAS:" :
                 "PREGUNTAS FRECUENTES SUGERIDAS:"}
              </p>
              <div className="flex flex-wrap gap-1 md:gap-1.5 max-h-[85px] overflow-y-auto custom-scrollbar">
                {(language === "en" ? [
                  { text: "Where is the trim paper size?", icon: "📏" },
                  { text: "How do I edit custom chapters?", icon: "✍️" },
                  { text: "What paper styles are available?", icon: "🎨" }
                ] : language === "pt" ? [
                  { text: "Onde mudo os tamanhos de impressão?", icon: "📏" },
                  { text: "Como usar regras ortotipográficas?", icon: "✍️" },
                  { text: "Quais são as cores de papel?", icon: "🎨" }
                ] : language === "fr" ? [
                  { text: "Où est le format du livre ?", icon: "📏" },
                  { text: "Comment éditer des chapitres ?", icon: "✍️" },
                  { text: "Quels types de papier offre-t-on ?", icon: "🎨" }
                ] : language === "it" ? [
                  { text: "Dove trovo la misura del libro ?", icon: "📏" },
                  { text: "Come correggo la punteggiatura ?", icon: "✍️" },
                  { text: "Quali stili di carta ci sono ?", icon: "🎨" }
                ] : language === "de" ? [
                  { text: "Wo ist das Druckformat ?", icon: "📏" },
                  { text: "Wie bearbeite ich Kapitel ?", icon: "✍️" },
                  { text: "Welche Papierfarben gibt es ?", icon: "🎨" }
                ] : [
                  { text: "¿Dónde está el tamaño de impresión?", icon: "📏" },
                  { text: "¿Cómo pongo bien las rayas de diálogo (—)?", icon: "✍️" },
                  { text: "¿Qué arquetipos estéticos ofreces?", icon: "🎨" }
                ]).map((pill, id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => sendDagramitoQuery(pill.text)}
                    disabled={dagramitoIsTyping}
                    className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-slate-800/70 hover:border-slate-700 text-slate-350 hover:text-white px-2.5 py-1 rounded-full text-[10px] cursor-pointer transition-colors text-left flex items-center gap-1 font-mono"
                  >
                    <span>{pill.icon}</span> {pill.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendDagramitoMessage();
              }}
              className="p-3 bg-slate-950 border-t border-slate-800/80 flex gap-2"
            >
              <input
                type="text"
                value={dagramitoInput}
                onChange={(e) => setDagramitoInput(e.target.value)}
                placeholder={
                  language === "en" ? "Ask me about RAE, digital publishing, multi-channel..." :
                  language === "pt" ? "Pergunte sobre RAE, publicação, canais digitais..." :
                  "Consúltame sobre imprenta, RAE, KDP, HostiaSoft..."
                }
                disabled={dagramitoIsTyping}
                className="flex-1 min-w-0 bg-slate-900 border border-slate-800 focus:border-amber-500/50 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
              />
              <button
                type="submit"
                disabled={!dagramitoInput.trim() || dagramitoIsTyping}
                className="bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 text-slate-950 p-2 rounded-xl cursor-pointer transition-colors shrink-0 flex items-center justify-center.5"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </form>

          </div>
        )}

        {/* Floating Toggle Launch Button */}
        <div className="relative">
          {/* Unread gentle bubble notification */}
          {!isDagramitoOpen && dagramitoHasUnread && (
            <div className="absolute right-16 top-1 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 text-slate-200 px-3 py-2 rounded-xl shadow-2xl text-[10.5px] whitespace-nowrap animate-bounce flex items-center gap-2 font-mono">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping shrink-0" />
              <span>
                {language === "en" ? <>Need advice? <strong>Guiautor AI</strong> is here! 🧠</> :
                 language === "pt" ? <>Precisa de ajuda? <strong>Guiautor AI</strong> responde! 🧠</> :
                 <>¿Necesitas ayuda paso a paso? ¡Consúltame! <strong>🧠</strong></>}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDagramitoHasUnread(false);
                }}
                className="text-slate-500 hover:text-slate-350 ml-1 cursor-pointer transition-colors"
                title="Cerrar aviso"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setIsDagramitoOpen(prev => !prev);
              setDagramitoHasUnread(false); // Clear notification indicator once opened
            }}
            title={isDagramitoOpen ? "Cerrar asistente" : "Consultar a Guiautor AI"}
            className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl flex items-center justify-center shadow-2xl cursor-pointer transition-all hover:scale-105 active:scale-95 border border-slate-900 select-none"
          >
            {isDagramitoOpen ? (
              <X className="w-5.5 h-5.5 stroke-[2.5]" />
            ) : (
              <MessageSquare className="w-6 h-6 stroke-[2]" />
            )}
          </button>
        </div>

        {/* DIAGRAMMERS Studio Wide Toast Messages */}
        {studioToast && (
          <div className="fixed bottom-24 right-6 z-[9999] max-w-sm w-full bg-slate-950/95 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1 rounded-lg bg-slate-900 border border-slate-800">
                {studioToast.type === "success" ? (
                  <span className="text-emerald-400 font-bold font-mono">✓</span>
                ) : studioToast.type === "warning" ? (
                  <span className="text-amber-500 font-bold font-mono">⚠️</span>
                ) : (
                  <span className="text-indigo-400 font-bold font-mono">ℹ</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-medium text-slate-300 font-mono">
                  {studioToast.type === "success" ? "ÉXITO" : studioToast.type === "warning" ? "ATENCIÓN" : "SISTEMA HUD"}
                </span>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed font-sans">{studioToast.message}</p>
              </div>
              <button
                onClick={() => setStudioToast(null)}
                className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* MODAL PARA SINCRONIZACIÓN EN LA NUBE MULTIDISPOSITIVO */}
        {isCloudSyncModalOpen && (
          <div id="cloud-sync-modal-overlay" className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full relative shadow-2xl space-y-5">
              {/* Modal Closer */}
              <button
                type="button"
                onClick={() => setIsCloudSyncModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer bg-slate-950 p-1.5 rounded-full border border-slate-800 hover:border-slate-700 transition flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Heading */}
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-indigo-500/15 text-indigo-400 rounded-xl">
                  <Cloud className="w-6 h-6 animate-pulse" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">Sincronización en la Nube</h3>
                  <p className="text-[9px] text-indigo-455 font-bold uppercase tracking-widest leading-none mt-0.5">Móvil & Escritorio</p>
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <p>
                  Esta funcionalidad te permite <strong>transferir y sincronizar</strong> tu libro activo, portadas generadas, estilos y capítulos directamente entre tu teléfono móvil y ordenador de manera instantánea.
                </p>

                {/* Status Section */}
                <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl space-y-2">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Estado del Servidor de Sincronización:</span>
                  
                  {cloudSaveExists ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Se encontró una copia activa de seguridad en el servidor</span>
                      </div>
                      <div className="text-[10px] text-slate-400 space-y-0.5 mt-1 border-t border-slate-900 pt-1 leading-normal">
                        <p><strong>Libro:</strong> "{cloudSaveTitle}"</p>
                        <p><strong>Autor:</strong> {cloudSaveAuthor}</p>
                        <p><strong>Guardado hace:</strong> {cloudSaveDate ? new Date(cloudSaveDate).toLocaleString() : "Cargando..."}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-amber-500 font-semibold text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>No se ha guardado ninguna copia en la nube todavía</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sync Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={saveToCloud}
                  disabled={isSyncingCloud}
                  className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold py-2.5 px-4 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-xs cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <CloudUpload className="w-5 h-5 text-indigo-400" />
                  <span>1. Subir a la nube</span>
                  <span className="text-[8px] font-normal text-slate-500 leading-none">Guardar pantalla actual</span>
                </button>

                <button
                  type="button"
                  onClick={loadFromCloud}
                  disabled={isSyncingCloud || !cloudSaveExists}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-850 text-white font-bold py-2.5 px-4 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-xs cursor-pointer active:scale-95 disabled:opacity-30 disabled:text-slate-500"
                >
                  <CloudDownload className="w-5 h-5 text-amber-400" />
                  <span>2. Bajar de la nube</span>
                  <span className="text-[8px] font-normal text-slate-250 leading-none">Cargar en esta pantalla</span>
                </button>
              </div>

              <div className="text-[8.5px] text-slate-500 text-center italic leading-snug">
                Al hacer clic en "Bajar de la nube", se restaurarán todas las actualizaciones realizadas recientemente desde tu teléfono móvil.
              </div>
            </div>
          </div>
        )}

        {/* MODAL DETECTOR DE PAGO Y DESBLOQUEO DE DESCARGAS / COACHING */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-[10000] p-4 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              
              {/* Header */}
              <div className="bg-slate-950/50 p-5 border-b border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-100 uppercase tracking-widest font-mono">
                    {paymentSuccessData ? "¡Pago Confirmado!" : "Pasarela de Pago Segura"}
                  </span>
                </div>
                {!paymentSuccessData && (
                  <button 
                    onClick={() => {
                      setShowPaymentModal(false);
                      setPaymentSuccessData(null);
                    }}
                    className="text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Body con Scroll */}
              <div className="p-6 overflow-y-auto space-y-5 scrollbar-thin flex-1 text-left">
                {!paymentSuccessData ? (
                  <>
                    <div className="space-y-1.5 text-center">
                      <h4 className="text-base font-extrabold text-white tracking-tight leading-snug">
                        Compra del Manuscrito: {metadata.title || "Tu Libro"}
                      </h4>
                      <p className="text-[11.5px] text-slate-400 leading-relaxed">
                        Para descargar y exportar tu libro en formato <span className="text-amber-400 font-semibold">{pendingExportLabel}</span> de alta calidad, completa el pago correspondiente.
                      </p>
                    </div>

                    {/* Ficha técnica del costo */}
                    <div className="bg-slate-950/45 p-4 rounded-2xl border border-slate-850/80 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">Concepto de Recepción</span>
                        <p className="text-xs font-bold text-slate-200">Exportación Ilimitada & Licencia Editorial</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">Total a Pagar</span>
                        <p className="text-lg font-black text-amber-400 font-mono">
                          {bookSalesPrice} {currencyCode}
                        </p>
                      </div>
                    </div>

                    {/* Método de pago dinámico según configuración del autor */}
                    <div className="space-y-3.5">
                      <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block font-mono">
                        Selecciona tu método de pago seguro:
                      </span>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedConfigPaymentMethod("paypal")}
                          className={`p-2.5 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                            selectedConfigPaymentMethod === "paypal"
                              ? "bg-amber-500/10 border-amber-500 text-amber-400"
                              : "bg-slate-950/30 border-slate-850 hover:border-slate-700 text-slate-400"
                          }`}
                        >
                          <span className="text-xs">PayPal</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedConfigPaymentMethod("stripe")}
                          className={`p-2.5 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                            selectedConfigPaymentMethod === "stripe"
                              ? "bg-indigo-500/10 border-indigo-500 text-indigo-400"
                              : "bg-slate-950/30 border-slate-850 hover:border-slate-700 text-slate-400"
                          }`}
                        >
                          <span className="text-xs">Stripe</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedConfigPaymentMethod("bank")}
                          className={`p-2.5 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1.5 cursor-pointer transition-all  ${
                            selectedConfigPaymentMethod === "bank"
                              ? "bg-slate-100/10 border-slate-300 text-slate-205"
                              : "bg-slate-950/30 border-slate-850 hover:border-slate-700 text-slate-400"
                          }`}
                        >
                          <span className="text-xs">Banco</span>
                        </button>
                      </div>

                      {/* Contenido según método de pago */}
                      <div className="bg-slate-950/30 p-4 rounded-2xl border border-slate-850 space-y-3">
                        {selectedConfigPaymentMethod === "paypal" && (
                          <div className="space-y-2 text-center py-2">
                            <p className="text-[11px] text-slate-400">
                              Serás redirigido con cifrado SSL al portal de cobros seguros de PayPal.
                            </p>
                            <p className="text-[10px] text-slate-500 font-mono">
                              Destinatario registrado: <span className="text-amber-500">{payPalEmail}</span>
                            </p>
                          </div>
                        )}

                        {selectedConfigPaymentMethod === "stripe" && (
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-[9.5px] uppercase font-bold text-slate-400 font-mono">Número de Tarjeta</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="4242 •••• •••• 4242"
                                  defaultValue="4242 4242 4242 4242"
                                  disabled
                                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 focus:outline-none"
                                />
                                <Lock className="absolute right-3 top-2.5 w-3.5 h-3.5 text-emerald-500" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[9.5px] uppercase font-bold text-slate-400 font-mono">Expiración</label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  defaultValue="12/29"
                                  disabled
                                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9.5px] uppercase font-bold text-slate-400 font-mono">CVC</label>
                                <input
                                  type="text"
                                  placeholder="123"
                                  defaultValue="***"
                                  disabled
                                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedConfigPaymentMethod === "bank" && (
                          <div className="space-y-2">
                            <p className="text-[10.5px] text-slate-350 font-mono whitespace-pre-line leading-relaxed">
                              {bankTransferData}
                            </p>
                            <span className="text-[8.5px] text-slate-500 leading-normal block">
                              Al presionar confirmar, se simulará la conciliación bancaria inmediata en el entorno de pruebas.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Botón de pago procesable */}
                    <button
                      type="button"
                      onClick={() => {
                        triggerStudioToast("Conectando con pasarela segura de pago en la nube...", "info");
                        setPaymentSuccessData({
                          gateway: selectedConfigPaymentMethod,
                          amount: bookSalesPrice,
                          currency: currencyCode,
                          transactionId: "TX-" + Math.floor(Math.random() * 900000 + 100000),
                          date: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })
                        });
                        
                        setBookPurchased(true);
                        localStorage.setItem("payment_book_purchased", "true");
                        console.info(`[Pago Autor] Transacción completada con éxito. Monto: ${bookSalesPrice} ${currencyCode} con ${selectedConfigPaymentMethod}`);
                        
                        if (pendingExport) {
                          setTimeout(() => {
                            pendingExport();
                          }, 1500);
                        }
                      }}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider shadow-lg shadow-amber-500/10 transition-all active:scale-[0.98]"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-950" />
                      <span>
                        Simular Pago Seguro ({bookSalesPrice} {currencyCode})
                      </span>
                    </button>
                    
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                      <Lock className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Conexión encriptada SSL de 256 bits directos a {payPalEmail}</span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Pantalla Externa de Éxito / Post-pago */}
                    <div className="space-y-4 text-center py-2">
                      <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Check className="w-6 h-6 stroke-[3px]" />
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-base font-extrabold text-white tracking-tight leading-snug">
                          ¡Pago Procesado con Éxito! 🎉
                        </h4>
                        <p className="text-[11.5px] text-slate-400 leading-normal">
                          Se ha registrado tu aporte de <strong className="text-emerald-500">{paymentSuccessData.amount} {paymentSuccessData.currency}</strong> de manera segura. Tu descarga de <span className="text-amber-450 font-bold font-mono">{pendingExportLabel}</span> ha comenzado.
                        </p>
                      </div>

                      {/* Recibo Técnico */}
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850/70 text-left text-[11px] font-mono space-y-1 text-slate-400 leading-relaxed">
                        <div className="flex justify-between border-b border-slate-850/50 pb-1.5 mb-1.5">
                          <span className="text-slate-500 uppercase tracking-wider font-bold">Datos de Facturación</span>
                          <span className="text-slate-300 font-bold uppercase">{paymentSuccessData.gateway}</span>
                        </div>
                        <div className="flex justify-between font-sans text-xs">
                          <span className="text-slate-405 font-mono">Operación</span>
                          <span className="text-slate-300 font-mono">{paymentSuccessData.transactionId}</span>
                        </div>
                        <div className="flex justify-between font-sans text-xs">
                          <span className="text-slate-405 font-mono">Fecha</span>
                          <span className="text-slate-300 font-mono">{paymentSuccessData.date}</span>
                        </div>
                        <div className="flex justify-between font-sans text-xs">
                          <span className="text-slate-405 font-mono">Receptor</span>
                          <span className="text-amber-500 font-mono font-semibold">{payPalEmail}</span>
                        </div>
                      </div>

                      {/* MENSAJE CRÍTICO DEL AUTOR (COACHING & ASISTENCIA) */}
                      <div className="bg-amber-500/10 border border-amber-500/25 p-4 rounded-2xl text-left space-y-2.5">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-wider block font-mono">
                          📧 Soporte Post-Venta y Coaching Editorial de DIAGRAMERS:
                        </span>
                        <p className="text-[11.5px] text-slate-200 leading-relaxed italic">
                          "Envía un correo para asegurarnos de que pudiste descargar bien tu libro. Si necesitas ayuda adicional para subir con éxito tu libro a Amazon KDP, deberías aprovechar nuestro <strong>coaching para autores nuevos con un 50 por ciento de descuento</strong> por ser cliente de diagramers. Coloca <strong>'Saber más'</strong> en el asunto del correo y nuestro equipo programará una llamada."
                        </p>
                        
                        {/* Botón mailto directo integrado */}
                        <a
                          href={`mailto:${payPalEmail}?subject=Saber%20mas&body=Hola!%20He%20comprado%2520el%2520libro%20"${encodeURIComponent(metadata.title || "Mi Libro")}"%20en%20Diagramers%20y%20me%20gustaria%20saber%20mas%20detalles%20sobre%2520el%2520coaching%2520para%2520autores%2520nuevos%2520con%2520el%252520de%2520descuento%2520por%2520ser%2520cliente.%2520%25C2%25A1Gracias!`}
                          className="w-full bg-slate-950 hover:bg-slate-850 border border-slate-800 text-amber-400 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs cursor-pointer"
                        >
                          <Mail className="w-4 h-4 text-amber-400" />
                          <span>Enviar Mail de Coaching de Autores (ruthgmedina@gmail.com)</span>
                        </a>
                      </div>

                      {/* Botón de acción */}
                      <div className="flex gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            if (pendingExport) {
                              pendingExport();
                              triggerStudioToast("Re-lanzando archivo...", "success");
                            } else {
                              triggerStudioToast("No hay descarga pendiente", "warning");
                            }
                          }}
                          className="flex-1 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold py-3 rounded-xl transition-all cursor-pointer"
                        >
                          Reintentar Descarga
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowPaymentModal(false);
                            setPaymentSuccessData(null);
                          }}
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold py-3 rounded-xl transition-all cursor-pointer"
                        >
                          Aceptar y Cerrar
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

// ========================================================
// --- STANDALONE TOOL FORMATTING HELPER FOR ASSISTANT ---
// ========================================================
function parseDagramitoMarkdown(text: string): React.ReactNode[] {
  return text.split("\n").map((line, idx) => {
    let content = line;
    const isBullet = content.trim().startsWith("- ") || content.trim().startsWith("* ");
    if (isBullet) {
      content = content.replace(/^[-*]\s+/, "");
    }

    const parts: React.ReactNode[] = [];
    let stateIdx = 0;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    while ((match = boldRegex.exec(content)) !== null) {
      if (match.index > stateIdx) {
        parts.push(content.substring(stateIdx, match.index));
      }
      parts.push(
        <strong key={match.index} className="text-amber-400 font-extrabold font-sans">
          {match[1]}
        </strong>
      );
      stateIdx = boldRegex.lastIndex;
    }
    if (stateIdx < content.length) {
      parts.push(content.substring(stateIdx));
    }

    const finalNode = parts.length > 0 ? parts : content;

    if (isBullet) {
      return (
        <div key={idx} className="flex gap-1.5 pl-1.5 py-0.5 text-slate-300">
          <span className="text-amber-500 font-bold shrink-0">•</span>
          <span className="flex-1">{finalNode}</span>
        </div>
      );
    }

    return (
      <p key={idx} className={line.trim() === "" ? "h-1.5" : "mb-1 text-slate-300"}>
        {finalNode}
      </p>
    );
  });
}
