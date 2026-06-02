import React, { useState } from "react";
import { 
  Book, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Globe, 
  Check, 
  Star, 
  Sliders, 
  FileText, 
  Lock, 
  Database,
  CloudLightning,
  AlertCircle,
  Copy,
  Plus,
  Smartphone,
  Calendar,
  Clock,
  Shield,
  ShieldAlert,
  Key,
  Fingerprint,
  Terminal,
  Cpu,
  EyeOff,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Award,
  MessageSquare,
  Flame,
  Mic,
  Languages,
  Activity,
  Heart,
  Instagram,
  Facebook,
  Linkedin
} from "lucide-react";
import { motion } from "motion/react";
import { LOCALES, SupportedLanguages } from "../locales";
import { DiagrammersLogo, DiagrammersFullLogo } from "./DiagrammersLogo";
import { HostiaSoftLogo, HostiaSoftFullLogo } from "./HostiaSoftLogo";

interface LandingPageProps {
  onNavigateToStudio: (userProfile?: { email: string; name: string; workspace: string }) => void;
  initialCapital?: number;
  initialEquity?: number;
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
}

export function LandingPage({ 
  onNavigateToStudio, 
  initialCapital = 150000, 
  initialEquity = 15,
  language,
  setLanguage
}: LandingPageProps) {
  const t = LOCALES[language || "es"] || LOCALES.es;
  // --- LOGIN MODAL & WORKSPACE SIMULATION STATES ---
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("marketingandcoach@gmail.com");
  const [loginName, setLoginName] = useState("Socia de Élite");
  const [loginWorkspace, setLoginWorkspace] = useState("Sindicato de Editores Independientes");
  const [loginPassword, setLoginPassword] = useState("••••••••");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState<"idle" | "verifying" | "success">("idle");

  // --- LEAD CAPTURE FORM STATE ---
  const [leadName, setLeadName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [entityType, setEntityType] = useState<"investor" | "writer" | "publisher">("investor");
  const [leadMessage, setLeadMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "encrypting" | "success">("idle");
  const [securedLeads, setSecuredLeads] = useState<Array<{ name: string; email: string; type: string }>>([
    { name: "Carlos Mendoza", email: "carlos.m@altaventures.vc", type: "investor" },
    { name: "Sofía Ruiz", email: "sofia@editorialcritica.es", type: "publisher" },
  ]);

  // --- INTERACTIVE INVESTMENT STRATEGIC SIMULATOR STATE ---
  const [pitchCapital, setPitchCapital] = useState<number>(initialCapital);
  const [pitchEquity, setPitchEquity] = useState<number>(initialEquity);
  
  // --- 7-DAY FREE TRIAL FOR SMALL PUBLISHERS ---
  const [trialBookPages, setTrialBookPages] = useState<number>(180);
  const [isPaywallDemoOpen, setIsPaywallDemoOpen] = useState<boolean>(false);
  const [paywallPaymentState, setPaywallPaymentState] = useState<"locked" | "processing" | "unlocked">("locked");
  const [reinvestmentTab, setReinvestmentTab] = useState<"servers" | "marketing" | "development">("servers");
  
  // --- CYBERSECURITY SANCTUM SIMULATOR ---
  const [encryptionText, setEncryptionText] = useState<string>("Manuscrito de alta importancia confidencial. No alterar ni clonar.");
  const [isEncryptingInProgress, setIsEncryptingInProgress] = useState<boolean>(false);
  const [cyphertext, setCyphertext] = useState<string>("U2FsdGVkX1+Vb89g8FASDe9823hjasg78sdFasdKJASD");
  const [activeSecurityTab, setActiveSecurityTab] = useState<"mss_encryption" | "anticlone" | "cloudrun_firewall" | "copyright">("mss_encryption");

  // --- UNIFIED AITRANSVOICE AI VOICE HUB STATES ---
  const [hubTab, setHubTab] = useState<"aitransvoice" | "diagrammers">("aitransvoice");
  const [voiceTextSource, setVoiceTextSource] = useState<string>("Hola, bienvenido a la nueva plataforma AITRANSVOICE. Aquí puedes traducir cualquier texto y escucharlo sintetizado de inmediato con voces naturales.");
  const [voiceLanguageSource, setVoiceLanguageSource] = useState<string>("es");
  const [voiceLanguageTarget, setVoiceLanguageTarget] = useState<string>("en");
  const [voiceTranslatedText, setVoiceTranslatedText] = useState<string>("Hello, welcome to the new AITRANSVOICE platform. Here you can translate any text and listen to it synthesized immediately with natural voices.");
  const [selectedVoiceActor, setSelectedVoiceActor] = useState<string>("elena");
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [cloningState, setCloningState] = useState<"idle" | "ready_to_record" | "recording" | "analyzing" | "completed">("idle");
  const [clonedTextToSpeak, setClonedTextToSpeak] = useState<string>("Hola. El algoritmo de AITRANSVOICE ha completado la clonación del timbre de mi voz. El resultado es totalmente fluido y profesional.");
  const [isSynthesizingCloned, setIsSynthesizingCloned] = useState<boolean>(false);
  const [audiobookStatus, setAudiobookStatus] = useState<"idle" | "generating" | "ready">("idle");

  // Mount effect to prefetch custom voices and clear speech queues on tab swap
  React.useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.cancel();
      
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [hubTab]);

  const handleTranslateText = () => {
    const source = voiceTextSource.trim();
    if (!source) return;
    
    if (voiceLanguageTarget === "en") {
      if (source.toLowerCase().includes("hola, bienvenido")) {
        setVoiceTranslatedText("Hello, welcome to the new AITRANSVOICE platform. Here you can write or translate any text and listen to it immediately with high-fidelity speech synthesis.");
      } else {
        setVoiceTranslatedText(`[AITRANSVOICE Engine] ${source} - Localized into seamless English narration.`);
      }
    } else if (voiceLanguageTarget === "pt") {
      if (source.toLowerCase().includes("hola, bienvenido")) {
        setVoiceTranslatedText("Olá, bem-vindo à nova plataforma AITRANSVOICE. Aqui você pode escrever ou traduzir qualquer texto e ouvi-lo imediatamente com síntese de voz de alta fidelidade.");
      } else {
        setVoiceTranslatedText(`[AITRANSVOICE Português] ${source} - Processado e adaptado para português con precisão.`);
      }
    } else {
      setVoiceTranslatedText(source);
    }
  };

  const runSynthesis = (text: string, lang: string, setIsPlaying: (val: boolean) => void) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        
        const cleanSpokenText = text
          .replace(/[—\-\[\]\(\)\*«»“”"]/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        const utterance = new SpeechSynthesisUtterance(cleanSpokenText);
        
        let targetLang = "es-ES";
        if (lang === "en") targetLang = "en-US";
        else if (lang === "pt") targetLang = "pt-BR";
        else targetLang = "es-ES";
        
        // Handle James actor British RP override
        if (selectedVoiceActor === "james" && lang === "en") {
          targetLang = "en-GB";
        }
        
        utterance.lang = targetLang;
        
        // Optimized conversational cadence variables
        if (selectedVoiceActor === "marcus") {
          utterance.pitch = 0.88;
          utterance.rate = 0.90; // Slower, more deep/resonant
        } else if (selectedVoiceActor === "aria") {
          utterance.pitch = 1.05;
          utterance.rate = 0.94; // Measured, crystal-clear female
        } else if (selectedVoiceActor === "james") {
          utterance.pitch = 0.98;
          utterance.rate = 0.94; // Deep, eloquent British male
        } else if (selectedVoiceActor === "mateo") {
          utterance.pitch = 1.02;
          utterance.rate = 0.98; // Energetic, modern male
        } else if (selectedVoiceActor === "elena") {
          utterance.pitch = 1.01;
          utterance.rate = 0.92; // Warm, pedagogical female
        } else {
          utterance.pitch = 1.0;
          utterance.rate = 0.95;
        }

        // Voice Selector for highly realistic premium TTS voices
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const langPrefix = targetLang.split("-")[0].toLowerCase();
          const compatibleVoices = voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));
          
          if (compatibleVoices.length > 0) {
            const isFemale = selectedVoiceActor === "elena" || selectedVoiceActor === "aria";
            
            const scoredVoices = compatibleVoices.map(v => {
              const name = v.name.toLowerCase();
              let score = 0;
              
              // Multipliers for realistic Natural/Neural engines
              if (name.includes("natural")) score += 400;
              if (name.includes("neural")) score += 350;
              if (name.includes("google")) score += 300;
              if (name.includes("premium")) score += 250;
              if (name.includes("enhanced")) score += 200;
              if (name.includes("siri")) score += 180;
              if (name.includes("wavenet")) score += 150;
              if (name.includes("microsoft")) score += 100;
              if (name.includes("apple")) score += 80;
              
              // Match explicit language locale preference
              if (v.lang.toLowerCase() === targetLang.toLowerCase()) {
                score += 150;
              }

              // Specific actor name bonuses
              if (selectedVoiceActor === "elena" && (name.includes("elena") || name.includes("helena") || name.includes("monica") || name.includes("maria") || name.includes("lucia"))) score += 600;
              if (selectedVoiceActor === "mateo" && (name.includes("mateo") || name.includes("pablo") || name.includes("julio") || name.includes("jorge") || name.includes("enrique") || name.includes("henrique"))) score += 600;
              if (selectedVoiceActor === "aria" && (name.includes("aria") || name.includes("samantha") || name.includes("sara") || name.includes("susan") || name.includes("zira"))) score += 600;
              if (selectedVoiceActor === "marcus" && (name.includes("marcus") || name.includes("david") || name.includes("mark") || name.includes("george") || name.includes("daniel"))) score += 600;
              if (selectedVoiceActor === "james" && (name.includes("james") || name.includes("british") || name.includes("uk") || name.includes("daniel") || name.includes("george"))) score += 600;

              // Gender affinity
              if (isFemale) {
                const femaleNames = ["monica", "helena", "sabina", "zira", "samantha", "sara", "joana", "francisca", "clara", "hazel", "susan", "female", "lucia", "maria", "paulina", "elena", "aria"];
                if (femaleNames.some(fn => name.includes(fn))) score += 350;
                const maleNames = ["david", "julio", "pablo", "daniel", "jorge", "henry", "male", "mark", "george", "mateo", "marcus", "james"];
                if (maleNames.some(mn => name.includes(mn))) score -= 250;
              } else {
                const maleNames = ["david", "julio", "pablo", "daniel", "jorge", "henry", "male", "mark", "george", "guy", "stefan", "enrique", "henrique", "mateo", "marcus", "james"];
                if (maleNames.some(mn => name.includes(mn))) score += 350;
                const femaleNames = ["monica", "helena", "sabina", "zira", "samantha", "sara", "joana", "female", "lucia", "maria", "elena", "aria"];
                if (femaleNames.some(fn => name.includes(fn))) score -= 250;
              }
              
              return { voice: v, score };
            });
            
            scoredVoices.sort((a, b) => b.score - a.score);
            utterance.voice = scoredVoices[0].voice;
          }
        }

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 3000);
      }
    } else {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const handleSpeakTranslated = () => {
    runSynthesis(voiceTranslatedText, voiceLanguageTarget, setIsSynthesizing);
  };

  const handleSpeakCloned = () => {
    runSynthesis(clonedTextToSpeak, "es", setIsSynthesizingCloned);
  };

  const startRecordingCloning = () => {
    setCloningState("recording");
    setTimeout(() => {
      setCloningState("analyzing");
      setTimeout(() => {
        setCloningState("completed");
      }, 2000);
    }, 4500);
  };

  const resetVoiceClone = () => {
    setCloningState("idle");
    setIsSynthesizingCloned(false);
  };

  const handleAudiobookTransform = () => {
    setAudiobookStatus("generating");
    setTimeout(() => {
      setAudiobookStatus("ready");
    }, 3000);
  };

  const downloadSoftwareRegistrationDoc = () => {
    const currentDate = new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
    const userEmail = "marketingandcoach@gmail.com";
    
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
  
  // --- GOOGLE CLOUD SYNC & DEPLOY TUTORIAL MODAL/CARD STATE ---
  const [showSyncGuide, setShowSyncGuide] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // --- INTERACTIVE VIDEO STORIES & WALKTHROUGHS STATE ---
  const [activeVideoIdx, setActiveVideoIdx] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true); // starts with lively auto-run capability
  const [videoProgress, setVideoProgress] = useState<number>(8);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

  const videoStories = [
    {
      author: "Mateo S.",
      age: 23,
      role: {
        es: "Novelista de Fantasía Épica (Medellín)",
        en: "Epic Fantasy Novelist (Medellín)",
        pt: "Autor de Fantasia Épica (Medellín)"
      },
      bookTitle: "La Corona de los Elfos (350 págs)",
      bgColor: "from-amber-600/25 to-red-900/10",
      avatarClass: "bg-amber-500 text-slate-950 font-black",
      ringColor: "border-amber-500",
      badgeColor: "bg-amber-400/10 text-amber-400 border-amber-500/20",
      videoTitle: {
        es: "De Word caótico a PDF listo para KDP en 45 segundos",
        en: "From messy Word draft to KDP-ready PDF in 45 seconds flat",
        pt: "De rascunho caótico no Word a PDF pronto para KDP em 45 segundos"
      },
      headline: {
        es: "«¡Sucedió en segundos! No pagué miles en diseño manual»",
        en: "“It happened in seconds! I saved thousands in manual layout fees”",
        pt: "“Aconteceu em segundos! Economizei milhares de reais com design gráfico”"
      },
      bio: {
        es: "Mateo autopublicó su saga en papel crema con márgenes de lomo perfectos en Amazon usando el motor inteligente de Diagrammers.",
        en: "Mateo self-published his elven saga on cream paper with perfect binding gutter size using Diagrammers' smart layout automation.",
        pt: "Mateo autopublicou sua obra de fantasia em papel creme com margens perfeitas na Amazon usando os cálculos do Diagrammers."
      },
      timeline: [
        {
          start: 0,
          end: 15,
          caption: {
            es: "¡Hola! Soy Mateo. Tenía mi manuscrito lleno de diálogos con guiones feos y un dolor de cabeza enorme por las medidas de márgenes de Amazon KDP...",
            en: "Hey! I'm Mateo. My fantasy manuscript was full of bad hyphens and Amazon's margin guidelines were giving me a massive headache...",
            pt: "E aí! Sou o Mateo. Meu manuscrito do Word estava cheio de travessões errados e as margens da Amazon KDP eram um desespero total..."
          }
        },
        {
          start: 15,
          end: 30,
          caption: {
            es: "Subí mi archivo Word aquí y el formateador inteligente de Diagrammers corrigió automáticamente todos mis diálogos a rayas largas (—) al instante.",
            en: "I uploaded my Word doc right here, and Diagrammers' smart engine reformatted all dialogue markers to perfect long em-dashes (—) in a snap.",
            pt: "Subi meu arquivo do Word aqui e o editor de inteligência corretiva calibrou meus travessões literários (—) na hora."
          }
        },
        {
          start: 30,
          end: 46,
          caption: {
            es: "Ajustó el sangrado bajo rigor suizo y el lomo para mis 350 páginas. ¡Exporté y directo a vender! Es magia pura para el autor de hoy.",
            en: "It calculated exact bleed and spine thickness for my 350 pages. I clicked print, downloaded my PDF and now I sell globally. It's pure magic!",
            pt: "Calculou a sangria e lombo exato para minhas 350 páginas. Imprimir em PDF de 300 DPI ficou moleza. Economia total de tempo!"
          }
        }
      ]
    },
    {
      author: "Clara M.",
      age: 31,
      role: {
        es: "Directora de Arte & Editora Independiente",
        en: "Boutique Art Director & Independent Publisher",
        pt: "Diretora de Arte & Editora Independente"
      },
      bookTitle: "Luzes de Lisboa (180 págs)",
      bgColor: "from-indigo-600/25 to-purple-900/10",
      avatarClass: "bg-indigo-500 text-slate-950 font-black",
      ringColor: "border-indigo-500",
      badgeColor: "bg-indigo-400/10 text-indigo-400 border-indigo-500/20",
      videoTitle: {
        es: "Rigor tipográfico suizo de alta costura a ritmo industrial",
        en: "High-end Swiss typographic rigor at industrial speed",
        pt: "Rigor tipográfico suíço de alta escala a ritmo acelerado"
      },
      headline: {
        es: "«Hago maquetación impecable 4 veces más rápido sin tocar InDesign»",
        en: "“I deliver elite, flawless books 4x faster without touching Adobe InDesign”",
        pt: "“Entrego obras com acabamento de luxo 4 vezes mais rápido e de forma adaptiva”"
      },
      bio: {
        es: "Clara dirige un taller de autoedición boutique en Lisboa. Produce obras de alta gama estética con justificación perfecta y capitulares.",
        en: "Clara runs a boutique self-publishing studio in Lisbon. She crafts high-fidelity works featuring strict baseline grids and gorgeous drop caps.",
        pt: "Clara lidera um selo independente em Lisboa. Desenvolve publicações com travas verticais rígidas e capitulares suíças magníficas."
      },
      timeline: [
        {
          start: 0,
          end: 15,
          caption: {
            es: "Hola a todos. Como diseñadora, el rigor visual lo es todo. Detestaba las plantillas clónicas y aburridas que usan todos en Word...",
            en: "Hi everyone. As a designer, visual rigor is everything. I absolutely hated standard, clone-like Word styles that look highly amateur...",
            pt: "Olá pessoal. Em nossa oficina de livros, a consistência estética é crucial. Eu odiava aqueles modelos engessados do Word..."
          }
        },
        {
          start: 15,
          end: 30,
          caption: {
            es: "Con Diagrammers configuro arquetipos de marca tipográfica de alta gama, justifico párrafos en la cuadrícula base y añado capitulares hermosas.",
            en: "With Diagrammers, I calibrate custom baseline grids, adjust paragraphs to a strict line-height rhythm, and select elite drop caps.",
            pt: "Com o Diagrammers configuro arquétipos em grelhas matemáticas perfeitas, controlo o ritmo do texto e ativo capitulares personalizadas."
          }
        },
        {
          start: 30,
          end: 46,
          caption: {
            es: "Mis escritores extranjeros alucinan cuando ven el PDF terminado. ¡Calidad premium estilo feria de Fráncfort en un par de minutos!",
            en: "My international authors are utterly amazed when they see the proof. World-class Frankfurt Book Fair standard in minutes!",
            pt: "Meus parceiros editoriais internacionais piram com a visualização do prelo. Qualidade da Feira de Frankfurt ao seu alcance."
          }
        }
      ]
    },
    {
      author: "Henrique S.",
      age: 42,
      role: {
        es: "Autor de Finanzas & Inversor de Capital",
        en: "Business Writer & Seed Capital Investor",
        pt: "Escritor de Negócios & Investidor Anjo"
      },
      bookTitle: "O Capital Século XXI (250 págs)",
      bgColor: "from-emerald-600/25 to-teal-900/10",
      avatarClass: "bg-emerald-500 text-slate-950 font-black",
      ringColor: "border-emerald-500",
      badgeColor: "bg-emerald-400/10 text-emerald-400 border-emerald-500/20",
      videoTitle: {
        es: "La palanca tecnológica que democratiza la producción B2B global",
        en: "The high-yield technical leverage disrupting global self-publishing",
        pt: "A alavanca tecnológica de alta rentabilidade que escala publicações"
      },
      headline: {
        es: "«Soluciona un dolor técnico real de millones de creadores. Por eso invertí»",
        en: "“It solves a genuine, massive technical headache for millions. That's why I backed it”",
        pt: "“Resolve uma dor técnica real de milhões de escritores e editoras. Por isso investi”"
      },
      bio: {
        es: "Escritor corporativo radicado en Brasil. Invierte en plataformas SaaS escalables con persistencia de base de datos eficiente.",
        en: "Corporate advisor and bestselling finance writer based in Brazil. Angel backer of cloud-scaled services that eliminate traditional layout friction.",
        pt: "Palestrante de finanças corporativas em Florianópolis. Investe em SaaS baseados na nuvem e com altíssimo retorno operacional."
      },
      timeline: [
        {
          start: 0,
          end: 15,
          caption: {
            es: "Tratar la autopublicación como negocio ágil exige velocidad. El mundo real ya no espera meses para ver un libro maquetado.",
            en: "Self-publishing as a modern high-frequency business demands fast time-to-market. Nobody wants to wait months for manual editorial feedback.",
            pt: "Tratar a autopublicação profissional como negócio ágil exige pressa. Leitores e investidores não esperam meses para maquetar uma obra."
          }
        },
        {
          start: 15,
          end: 30,
          caption: {
            es: "Diagrammers rompe la barrera del idioma. El soporte multilíngüe es oro puro para creadores e inversores en otros países.",
            en: "Diagrammers destroys geographical limits. Having deep active localized optimization is pure gold for cross-border operations.",
            pt: "O Diagrammers quebra os limites do idioma. O suporte multilíngue em simultâneo é ouro puro para nossa cadeia de suprimentos."
          }
        },
        {
          start: 30,
          end: 46,
          caption: {
            es: "Invertí en este proyecto porque es el Canva del editor moderno. Escalable con Google Firestore, veloz y altamente rentable.",
            en: "I strategic backed this SaaS because it acts as the Canva for professional book formatting. Cloud-secure, high margin, and extremely fast.",
            pt: "Investi de imediato pois é o verdadeiro Canva da paginação. Funciona perfeitamente integrado à nuvem e é altamente próspero!"
          }
        }
      ]
    }
  ];

  React.useEffect(() => {
    let timer: any = null;
    if (isVideoPlaying) {
      timer = setInterval(() => {
        setVideoProgress((p) => {
          if (p >= 45) {
            return 0; // restarts automatically for interactive engagement
          }
          return p + 1;
        });
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isVideoPlaying]);

  const activeVideo = videoStories[activeVideoIdx] || videoStories[0];
  const activeCaptionObj = activeVideo.timeline.find(chunk => videoProgress >= chunk.start && videoProgress <= chunk.end) || activeVideo.timeline[0];
  const currentCaption = activeCaptionObj.caption[language] || activeCaptionObj.caption.es;

  // --- AUDIO NARRATION ENGINE (SPEECH SYNTHESIS GLOBAL HOOK) ---
  const speakWithRigor = (textToSpeak: string, forcedIdx?: number) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    try {
      synth.cancel(); // Stop any previous speech immediately
      
      const cleanSpokenText = textToSpeak
        .replace(/[—\-\[\]\(\)\*«»“”"]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanSpokenText);
      const currentIdx = forcedIdx !== undefined ? forcedIdx : activeVideoIdx;

      // Select language accurately
      let targetLang = "es-MX";
      if (language === "pt") {
        targetLang = "pt-BR";
      } else if (language === "en") {
        targetLang = "en-US";
      } else {
        targetLang = "es-MX"; // Lively spanish
      }
      utterance.lang = targetLang;

      // Select highest quality premium/natural voice
      const voices = synth.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = targetLang.split("-")[0].toLowerCase();
        const compatibleVoices = voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));
        
        if (compatibleVoices.length > 0) {
          const isFemale = currentIdx === 1; // Clara is female (idx 1), Mateo & Henrique are male
          
          const scoredVoices = compatibleVoices.map(v => {
            const name = v.name.toLowerCase();
            let score = 0;
            
            // Prioritize premium/natural/neural voices
            if (name.includes("natural")) score += 200;
            if (name.includes("neural")) score += 180;
            if (name.includes("google")) score += 150;
            if (name.includes("premium")) score += 120;
            if (name.includes("enhanced")) score += 100;
            if (name.includes("wavenet")) score += 80;
            if (name.includes("microsoft")) score += 50;
            
            // Gender matching preference
            if (isFemale) {
              const femaleNames = ["monica", "helena", "sabina", "zira", "samantha", "sara", "joana", "francisca", "clara", "hazel", "susan", "female", "lucia", "maria", "paulina"];
              if (femaleNames.some(fn => name.includes(fn))) {
                score += 300;
              }
              const maleNames = ["david", "julio", "pablo", "daniel", "jorge", "henry", "male", "mark", "george"];
              if (maleNames.some(mn => name.includes(mn))) {
                score -= 150;
              }
            } else {
              const maleNames = ["david", "julio", "pablo", "daniel", "jorge", "henry", "male", "mark", "george", "guy", "stefan", "enrique", "henrique", "mateo"];
              if (maleNames.some(mn => name.includes(mn))) {
                score += 300;
              }
              const femaleNames = ["monica", "helena", "sabina", "zira", "samantha", "sara", "joana", "female", "lucia", "maria"];
              if (femaleNames.some(fn => name.includes(fn))) {
                score -= 150;
              }
            }
            return { voice: v, score };
          });

          // Sort descending and select the highest scored
          scoredVoices.sort((a, b) => b.score - a.score);
          utterance.voice = scoredVoices[0].voice;
        }
      }

      // Voice identity calibrations based on active character (highly warm & conversational rates/pitches)
      if (currentIdx === 0) {
        // Mateo: youthful, swift, energetic, warm
        utterance.rate = 1.02;
        utterance.pitch = 1.05;
      } else if (currentIdx === 1) {
        // Clara: elegant design boutique mentor, sophisticated and clear
        utterance.rate = 0.94;
        utterance.pitch = 1.12;
      } else {
        // Henrique: strategic business angel, deep, paced, authoritative
        utterance.rate = 0.96;
        utterance.pitch = 0.88;
      }

      synth.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error on gesture:", err);
    }
  };

  React.useEffect(() => {
    if (hubTab !== "diagrammers" || !isVideoPlaying || isVideoMuted) {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } else {
      speakWithRigor(currentCaption);
    }

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentCaption, isVideoPlaying, isVideoMuted, language, activeVideoIdx, hubTab]);

  // Computed values for investment simulator
  const postMoneyValuation = Math.round(pitchCapital / (pitchEquity / 100));
  const preMoneyValuation = postMoneyValuation - pitchCapital;
  // Let's compute potential reach and CAC (Customer Acquisition Cost) estimates
  const customerAcquisitionCost = 14.5; // US$ average CAC index
  const potentialWritersReached = Math.round(pitchCapital * 0.45 / customerAcquisitionCost); // 45% spent on marketing
  const projectedRevenueYear1 = Math.round(potentialWritersReached * 12 * 19); // 19 USD average subscription MRR

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !inputEmail) return;

    setFormStatus("encrypting");
    
    // Simulate secure enterprise transmission
    setTimeout(() => {
      setSecuredLeads(prev => [
        ...prev, 
        { name: leadName, email: inputEmail, type: entityType }
      ]);
      setFormStatus("success");
      
      // Reset form variables
      setTimeout(() => {
        setLeadName("");
        setInputEmail("");
        setLeadMessage("");
        setFormStatus("idle");
      }, 4000);
    }, 1800);
  };

  const copySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden font-sans">
      
      {/* BRAND PHILOSOPHY TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-purple-950/80 to-amber-950/80 border-b border-slate-900 px-4 py-2 text-center relative z-50">
        <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-200 animate-pulse flex items-center justify-center gap-2 flex-wrap">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-extrabold uppercase tracking-widest text-cyan-400 text-[10px]">HOSTIA SOFT</span>
          <span className="text-slate-700">•</span>
          <span className="italic text-slate-200 font-medium">"Crea sin límites. Comparte sin fronteras."</span>
          <span className="text-slate-705">•</span>
          <span className="bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold">Partner: Google AI Studio 🤝</span>
        </p>
      </div>

      {/* BACKGROUND DECORATIVE CINEMATIC GLOW (AMBIENT LIGHTS) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-fuchsia-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* DYNAMIC SITE LANDING HEADER */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 select-none">
              <HostiaSoftLogo className="w-10 h-10 shrink-0" glow />
              <div>
                <h1 className="text-base sm:text-lg font-black tracking-[0.05em] uppercase flex items-center gap-1.5 text-slate-100" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  HOSTIA<span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 bg-clip-text text-transparent ml-0.5 font-bold">SOFT</span>
                  <span className="text-slate-800 text-xs mx-1">|</span>
                  <span className="text-[10px] sm:text-xs text-slate-300 font-bold tracking-normal font-sans pt-0.5">
                    {hubTab === "aitransvoice" ? "AITRANSVOICE" : "DIAGRAMMERS"}
                  </span>
                </h1>
                <p className="text-[9px] text-slate-400 font-mono">
                  {hubTab === "aitransvoice" ? "Ecosistema Tecnológico de Voz e Idioma" : "Suite de Maquetación Editorial KDP"}
                </p>
              </div>
            </div>
          </div>
          
          <span className="md:hidden text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold">
            {hubTab === "aitransvoice" ? "AITV SUITE" : "KDP ACTIVE"}
          </span>
        </div>

        {/* --- CENTRED HUB SELECTOR --- */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-2xl w-full md:w-auto max-w-md justify-center">
          <button
            onClick={() => setHubTab("aitransvoice")}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              hubTab === "aitransvoice"
                ? "bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-md font-extrabold scale-102 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>AITRANSVOICE</span>
          </button>
          
          <button
            onClick={() => setHubTab("diagrammers")}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              hubTab === "diagrammers"
                ? "bg-amber-500 text-slate-950 shadow-md font-extrabold scale-102 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Book className="w-3.5 h-3.5" />
            <span>DIAGRAMMERS</span>
          </button>

          {/* DYNAMIC FUTURE ADDITION BUTTON FOR MORE SOFTWARES */}
          <button
            onClick={() => {
              alert(
                "¡Bienvenido al Ecosistema Multifacético de HOSTIA SOFT! Aquí se incorporará cada uno de tus nuevos desarrollos o softwares con IA. Compartirán la estructura de diseño suizo, persistencia extrema, integración de donaciones libres y el soporte partner de Google AI Studio. ¡Tu creatividad es el único límite!"
              );
            }}
            className="flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-bold text-slate-500 hover:text-emerald-400 hover:bg-slate-950/20 transition-all cursor-pointer"
            title="Añadir nueva herramienta al Hub"
          >
            <span className="text-xs font-black text-emerald-400">+</span>
            <span className="hidden sm:inline">NUEVA APP</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          {/* LANGAUGE switcher dropdown / selector buttons */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl shrink-0">
            <Globe className="w-3.5 h-3.5 text-slate-400 mx-1.5" />
            {(["es", "en", "pt"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                  language === lang
                    ? "bg-amber-500 text-slate-950 font-black"
                    : "text-slate-400 hover:text-white hover:bg-slate-850"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowLoginModal(true)}
            className="flex-1 md:flex-initial text-[11px] sm:text-xs bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold border border-slate-800 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-teal-400" />
            <span>{t.subHeaderB2B}</span>
          </button>
          
          <button
            onClick={() => onNavigateToStudio()}
            className="flex-1 md:flex-initial bg-gradient-to-r from-amber-500 to-amber-650 hover:from-amber-400 hover:to-amber-550 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-[11px] sm:text-xs tracking-wide shadow-lg shadow-amber-500/10 transition-all hover:scale-[1.03] active:scale-100 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{t.enterStudio}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

       {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10 space-y-24">
        
        {hubTab === "aitransvoice" ? (
          <div className="space-y-24 animate-fadeIn">
            {/* AITRANSVOICE HERO - POWERED BY HOSTIA SOFT */}
            <section className="text-center max-w-4xl mx-auto flex flex-col items-center space-y-6 pt-8">
              
              {/* Dynamic glowing full Hostia Soft emblem system */}
              <HostiaSoftFullLogo glow={true} className="pb-4 transform hover:scale-[1.01] transition-transform duration-300" />
              
              <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-400 font-mono tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 rotate-12" />
                HOSTIA SOFT • SOFTWARES DEMOCRÁTICOS PARA CAMBIAR EL MUNDO
              </span>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Tu Voz y tus Libros en <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">Cualquier Idioma</span> de Forma Instantánea
              </h2>
              
              <p className="text-base sm:text-lg text-slate-350 leading-relaxed max-w-2xl mx-auto font-sans font-medium">
                Moderniza tu localización de audio. Traduce borradores o manuscritos, clona tu timbre de voz en 5 segundos, dobla producciones de video y exporta audiolibros profesionales listos para Audible y Spotify.
              </p>
              
              <div className="pt-6 flex flex-wrap justify-center gap-4">
                <a
                  href="#aitranslator-widget"
                  className="bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-orange-500 hover:from-cyan-400 hover:via-fuchsia-500 hover:to-orange-400 text-white font-extrabold px-8 py-4 rounded-2xl text-sm sm:text-base tracking-wide shadow-xl shadow-cyan-500/20 shadow-fuchsia-500/10 transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-100 flex items-center gap-3 cursor-pointer no-underline block"
                >
                  <span>Probar Síntesis en Vivo</span>
                  <Mic className="w-5 h-5 text-white animate-bounce" />
                </a>
                
                <button
                  type="button"
                  onClick={() => setHubTab("diagrammers")}
                  className="bg-slate-900/60 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 font-bold px-8 py-4 rounded-2xl text-sm sm:text-base tracking-wide transition-all hover:-translate-y-0.5 active:scale-100 flex items-center gap-2 cursor-pointer"
                >
                  <Book className="w-5 h-5 text-amber-500" />
                  <span>Maquetador de Libros (DIAGRAMMERS)</span>
                </button>
              </div>

              <div className="pt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Síntesis Web Ultraveloz</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Clonación Neuronal de Timbre</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Enlace de Soporte Securizado</span>
              </div>
            </section>

            {/* INTERACTIVE TRANSLATOR AND SPEECH GENERATOR */}
            <section id="aitranslator-widget" className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-6">
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="border-b border-slate-800 pb-5 space-y-2">
                <span className="text-[10px] bg-gradient-to-r from-emerald-500 to-indigo-500 text-white px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                  Módulo de Inteligencia Natural
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-sans" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  1. Traductor y Localizador Vocal Multi-Idioma
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Escribe tu mensaje en español, selecciona el idioma de destino, tradúcelo en tiempo real y reprodúcelo con actores vocales hiperrealistas.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* INPUT ZONE */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
                      <Languages className="w-4 h-4 text-emerald-400" /> Idioma de Origen
                    </span>
                    <select
                      value={voiceLanguageSource}
                      onChange={(e) => setVoiceLanguageSource(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-medium focus:outline-none focus:border-emerald-500"
                    >
                      <option value="es">Español (Auto-detectado)</option>
                      <option value="en">English (Inglés)</option>
                      <option value="pt">Português (Portugués)</option>
                    </select>
                  </div>

                  <div className="relative">
                    <textarea
                      value={voiceTextSource}
                      onChange={(e) => setVoiceTextSource(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 focus:outline-none focus:border-emerald-555 min-h-[160px] font-mono leading-relaxed"
                      placeholder="Escribe el texto de tu audiolibro, novela o artículo aquí..."
                    />
                    <div className="absolute bottom-4 right-4 text-[9.5px] text-slate-600 font-mono">
                      {voiceTextSource.length} caracteres
                    </div>
                  </div>

                  {/* PRESETS */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block font-mono">Ejemplos Rápidos KDP / Audio:</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setVoiceTextSource("Hola, bienvenidos a la nueva plataforma de traducción AITRANSVOICE. Este desarrollo unifica maquetación editorial y tecnología de voz natural.");
                          setVoiceLanguageSource("es");
                        }}
                        className="bg-slate-950 hover:bg-slate-850 border border-slate-850 hover:border-emerald-500/30 text-slate-400 hover:text-white px-3 py-1.5 rounded-xl text-[10px] transition-all cursor-pointer font-mono"
                      >
                        🎙️ Resumen del Proyecto
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setVoiceTextSource("The narrator spoke with absolute clarity, bringing every character and scene of the novel to life internationally.");
                          setVoiceLanguageSource("en");
                        }}
                        className="bg-slate-950 hover:bg-slate-850 border border-slate-850 hover:border-emerald-500/30 text-slate-400 hover:text-white px-3 py-1.5 rounded-xl text-[10px] transition-all cursor-pointer font-mono"
                      >
                        📖 Audiolibro Profesional
                      </button>
                    </div>
                  </div>
                </div>

                {/* TRANSFER SETTINGS IN BETWEEN */}
                <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
                        <Activity className="w-4 h-4 text-indigo-400" /> Idioma de Destino
                      </span>
                      <div className="flex gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-xl">
                        {(["es", "en", "pt"] as const).map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => {
                              setVoiceLanguageTarget(lang);
                              // Trigger auto translated update
                              setTimeout(() => handleTranslateText(), 100);
                            }}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                              voiceLanguageTarget === lang
                                ? "bg-indigo-600 text-white font-extrabold"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* INTERACTIVE TRANSLATED DISPLAY */}
                    <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 min-h-[110px] relative">
                      <div className="absolute top-2.5 right-2.5 bg-indigo-500/10 border border-indigo-505/20 text-indigo-400 text-[8.5px] font-bold uppercase px-1.5 py-0.5 rounded font-mono">
                        Traducido por Red Neuronal
                      </div>
                      <p className="text-xs text-slate-300 font-mono leading-relaxed pt-4">
                        {voiceTranslatedText || "[Haz clic en Traducir para procesar tu texto...]"}
                      </p>
                    </div>

                    {/* SELECTOR ACTORES DE VOZ */}
                    <div className="space-y-2">
                      <span className="text-[10.5px] uppercase font-bold text-slate-400 tracking-wider block font-mono">Seleccionar Actor de Voz IA:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { id: "elena", label: "Elena - Soft", style: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" },
                          { id: "mateo", label: "Mateo - Business", style: "text-indigo-455 border-indigo-500/20 bg-indigo-500/5 animate-pulse" },
                          { id: "aria", label: "Aria - Documental", style: "text-amber-400 border-amber-500/15 bg-amber-500/5" },
                          { id: "marcus", label: "Marcus - Deep Voice", style: "text-rose-400 border-rose-500/15 bg-rose-500/5" },
                          { id: "james", label: "James - British UK", style: "text-sky-400 border-sky-500/15 bg-sky-500/5" }
                        ].map((actor) => (
                          <button
                            key={actor.id}
                            type="button"
                            onClick={() => setSelectedVoiceActor(actor.id)}
                            className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer font-sans select-none flex flex-col ${
                              selectedVoiceActor === actor.id ? `${actor.style} border-current ring-1 ring-current` : "border-slate-800 bg-slate-950/40 text-slate-350 hover:border-slate-700"
                            }`}
                          >
                            <span className="font-bold">{actor.label}</span>
                            <span className="text-[8px] opacity-75 font-mono">100% Sincronizado</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ACTION CONTROLS */}
                  <div className="space-y-3 pt-2">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleTranslateText}
                        className="flex-1 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all uppercase tracking-wider font-mono"
                      >
                        <Languages className="w-4 h-4 text-emerald-400" />
                        <span>Traducir con IA</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSpeakTranslated}
                        disabled={!voiceTranslatedText}
                        className="flex-1 bg-gradient-to-r from-emerald-500 via-emerald-450 to-indigo-650 hover:from-emerald-400 hover:to-indigo-550 text-slate-950 font-black text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-102 active:scale-98 disabled:opacity-50 select-none animate-shimmer"
                      >
                        {isSynthesizing ? (
                          <>
                            <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                            <span>Reproduciendo Audio...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4 shrink-0 text-slate-950 fill-current" />
                            <span>Sintetizar y Escuchar</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* DYNAMIC SOUNDWAVE ANIMATION ON REPRODUCTION */}
                    {isSynthesizing && (
                      <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs animate-fadeIn text-emerald-400 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span>Actor de Voz {selectedVoiceActor.toUpperCase()} activo...</span>
                        </div>
                        {/* Audio track waves */}
                        <div className="flex gap-0.5 items-center justify-center h-4">
                          <span className="w-0.5 bg-emerald-400 animate-pulse h-2.5"></span>
                          <span className="w-0.5 bg-emerald-400 animate-pulse h-4 delay-100"></span>
                          <span className="w-0.5 bg-emerald-400 animate-pulse h-2.5 delay-200"></span>
                          <span className="w-0.5 bg-emerald-400 animate-pulse h-3.5 delay-300"></span>
                          <span className="w-0.5 bg-emerald-400 animate-pulse h-1 delay-400"></span>
                          <span className="w-0.5 bg-emerald-400 animate-pulse h-3 delay-500"></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* SENSORIAL VOICE CLONING SIMULATOR */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none"></div>
              
              <div className="border-b border-slate-800 pb-5 space-y-2">
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-500/20 font-mono uppercase tracking-wider font-bold">
                  Santuario de Voz Cifrado
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-sans flex items-center gap-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  2. Clonación Digital de Timbre Vocal Sensorial
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Registra una frase de 5 segundos con tu micrófono. Nuestro motor localiza tu timbre, tono y armónicos de forma matemática, permitiendo generar audio con tu propia voz de forma privada.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* INTERACTIVE CONTROLS PANE */}
                <div className="md:col-span-5 bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4 text-center">
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest block">Consola de Grabación</span>
                    <p className="text-xs text-white font-bold">Lee esta frase en voz alta para calibrar:</p>
                    <p className="text-xs text-indigo-400 italic font-mono leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800 max-w-xs mx-auto">
                      "AITRANSVOICE clona mi voz de manera ética, respetando los derechos de autor de Ruth Medina."
                    </p>
                  </div>

                  {cloningState === "idle" && (
                    <button
                      type="button"
                      onClick={startRecordingCloning}
                      className="mx-auto bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white text-xs font-black p-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-98"
                    >
                      <Mic className="w-4 h-4 text-emerald-200 animate-pulse" />
                      <span>Calibrar e Iniciar Grabación</span>
                    </button>
                  )}

                  {cloningState === "recording" && (
                    <div className="space-y-3">
                      <div className="flex justify-center items-center gap-2 text-rose-550 font-mono text-xs font-bold animate-pulse">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-550"></span>
                        <span>GRABANDO... HABILITA MICRÓFONO</span>
                      </div>
                      {/* Streaming waves */}
                      <div className="flex justify-center gap-1 items-end h-8 max-w-xs mx-auto">
                        <span className="w-1 bg-rose-500 h-2 animate-bounce"></span>
                        <span className="w-1 bg-rose-500 h-6 animate-bounce delay-100"></span>
                        <span className="w-1 bg-rose-500 h-4 animate-bounce delay-150"></span>
                        <span className="w-1 bg-rose-500 h-7 animate-bounce delay-75"></span>
                        <span className="w-1 bg-rose-500 h-3 animate-bounce delay-200"></span>
                        <span className="w-1 bg-rose-500 h-5 animate-bounce delay-300"></span>
                      </div>
                      <span className="text-[9px] text-slate-500 block">Espera que finalice la calibración neuronal...</span>
                    </div>
                  )}

                  {cloningState === "analyzing" && (
                    <div className="space-y-4 py-2">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin"></div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block">Procesando Espectro Vocal</span>
                        <p className="text-[10px] text-slate-500 font-mono leading-relaxed">
                          Aislando armónicos y osciladores...<br />
                          Modelo generado: <span className="text-emerald-400">ruthgmedina_cloned.raw</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {cloningState === "completed" && (
                    <div className="space-y-3">
                      <div className="flex justify-center items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                        <Check className="w-4 h-4 border border-emerald-500 rounded-full" />
                        <span>CLONACIÓN DE TIMBRE OPERATIVA</span>
                      </div>
                      <button
                        type="button"
                        onClick={resetVoiceClone}
                        className="text-[10px] text-slate-500 hover:text-white underline font-mono cursor-pointer bg-transparent border-0"
                      >
                        Re-clonar / Borrar Modelo
                      </button>
                    </div>
                  )}
                </div>

                {/* PLAYBACK / INTERACTION DOCK */}
                <div className="md:col-span-7 bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500 block">Probar tu Timbre Clonado</span>
                    <label className="text-xs text-slate-350 block font-semibold">Escribe lo que quieras que tu clon diga:</label>
                    <textarea
                      value={clonedTextToSpeak}
                      onChange={(e) => setClonedTextToSpeak(e.target.value)}
                      disabled={cloningState !== "completed"}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 disabled:opacity-40 min-h-[90px] font-mono leading-relaxed"
                      placeholder="Calibra primero tu voz para habilitar este editor de texto..."
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={handleSpeakCloned}
                      disabled={cloningState !== "completed"}
                      className="bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-98 disabled:opacity-50 select-none font-sans"
                    >
                      {isSynthesizingCloned ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Clon Articulando...</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 shrink-0 text-white fill-current" />
                          <span>Reproducir Voz Clonada</span>
                        </>
                      )}
                    </button>
                    
                    <span className="text-[10px] text-slate-500 font-mono leading-normal max-w-xs text-right">
                      🔒 Los modelos de voz generados son 100% privados y se borran al cerrar el navegador.
                    </span>
                  </div>
                </div>

              </div>
            </section>

            {/* UNIFIED ECOSYSTEM CONNECT: AUDIOBOOK MAQUETA DE KDP */}
            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-800 pb-5 space-y-2">
                <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-mono font-bold uppercase tracking-wider">
                  Simbiosis Editorial de DIAGRAMMERS
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-sans" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  3. Conversor Express de Manuscrito a Audiolibro
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Alinea tu obra de forma maestra. Extrae los capítulos formateados con grilla suiza en el maquetador de Diagrammers y compílalos directamente en una pista de audio lista para audiolibro.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* CAPÍTULOS DE ORIGEN DE DIAGRAMMERS */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Borradores Sincronizados</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-black">Conectado ✓</span>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-sans">
                      <div>
                        <p className="font-bold text-slate-300">Capítulo 1: El Despertar del Guerrero</p>
                        <p className="text-[9px] text-slate-500 font-mono">3,240 palabras • Estilo Clásico</p>
                      </div>
                      <span className="text-[9.5px] font-mono text-indigo-400 font-bold">Listo</span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/40 flex items-center justify-between text-xs opacity-75 font-sans">
                      <div>
                        <p className="font-bold text-slate-300">Capítulo 2: El Camino Invisible</p>
                        <p className="text-[9px] text-slate-500 font-mono">4,150 palabras • Estilo Clásico</p>
                      </div>
                      <span className="text-[9.5px] font-mono text-indigo-400 font-bold">Listo</span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/40 flex items-center justify-between text-xs opacity-70 font-sans">
                      <div>
                        <p className="font-bold text-slate-300">Capítulo 3: Destinación del Héroe</p>
                        <p className="text-[9px] text-slate-500 font-mono">2,890 palabras • Estilo Clásico</p>
                      </div>
                      <span className="text-[9.5px] font-mono text-indigo-400 font-bold">Listo</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAudiobookTransform}
                    disabled={audiobookStatus === "generating"}
                    className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white text-xs font-bold py-3 rounded-xl uppercase transition-all tracking-wider font-mono cursor-pointer"
                  >
                    {audiobookStatus === "generating" ? "Generando Pistas..." : "Sincronizar y Compilar Capítulos"}
                  </button>
                </div>

                {/* AUDIOBOOK REPRODUCER SIMULATION */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-center py-4 bg-slate-900/50 border border-slate-850 rounded-2xl">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest font-mono">Distribuidor de Audio Integrado</span>
                    
                    {audiobookStatus === "idle" && (
                      <div className="py-6 space-y-2 font-sans text-xs">
                        <p className="text-slate-400">Presiona "Sincronizar y Compilar" para generar el reproductor oficinal de Audible.</p>
                      </div>
                    )}

                    {audiobookStatus === "generating" && (
                      <div className="py-6 space-y-3 font-sans text-xs">
                        <div className="w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin mx-auto"></div>
                        <p className="text-indigo-400 animate-pulse font-mono">Consolidando pistas de voz, pausas gramaticales y compresión MP3...</p>
                      </div>
                    )}

                    {audiobookStatus === "ready" && (
                      <div className="py-2 px-6 space-y-4 text-left font-sans">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-indigo-650 rounded-xl flex items-center justify-center shadow-lg">
                            <Volume2 className="w-6 h-6 text-slate-950 fill-current animate-pulse" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white uppercase tracking-wide">Audiolibro: El Despertar del Guerrero</p>
                            <p className="text-[10px] text-slate-500 font-mono">Voz Clón: ruthgmedina_cloned.raw • 128 kbps</p>
                          </div>
                        </div>

                        {/* Player controls */}
                        <div className="space-y-1.5 pt-2">
                          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden relative border border-slate-850">
                            <span className="w-1/3 bg-gradient-to-r from-emerald-500 to-indigo-650 h-full block animate-pulse"></span>
                          </div>
                          <div className="flex justify-between text-[9px] font-mono text-slate-500">
                            <span>04:12</span>
                            <span>12:35</span>
                          </div>
                        </div>

                        <div className="flex justify-center items-center gap-6 pt-1">
                          <button type="button" className="text-slate-400 hover:text-white cursor-pointer bg-transparent border-0 text-xs select-none">⏮️</button>
                          <button type="button" className="w-9 h-9 rounded-full bg-indigo-650 hover:bg-indigo-550 flex items-center justify-center text-white cursor-pointer select-none">⏸️</button>
                          <button type="button" className="text-slate-400 hover:text-white cursor-pointer bg-transparent border-0 text-xs select-none">⏭️</button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 font-mono">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Exportar Pistas Digitales:</span>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <button
                        type="button"
                        onClick={() => alert("Simulación: Descarga de archivo MP3 Master del capítulo 1 iniciada de forma segura.")}
                        disabled={audiobookStatus !== "ready"}
                        className="bg-slate-900 hover:bg-slate-850 border border-slate-855 text-slate-300 font-bold p-3 rounded-xl text-xs uppercase cursor-pointer disabled:opacity-40 transition-all"
                      >
                        📥 Capitulo MP3
                      </button>
                      <button
                        type="button"
                        onClick={() => alert("Simulación: Paquete completo de distribución M4B para Apple Audiobooks generado.")}
                        disabled={audiobookStatus !== "ready"}
                        className="bg-slate-900 hover:bg-slate-850 border border-slate-855 text-slate-300 font-bold p-3 rounded-xl text-xs uppercase cursor-pointer disabled:opacity-40 transition-all"
                      >
                        📥 M4B Completo
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* BENTO GRID SPECIFIC SOLUTIONS DE AITRANSVOICE */}
            <section className="space-y-6">
              <div className="border-b border-slate-800 pb-5 max-w-md">
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest font-mono">Soluciones Corporativas B2B</span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-sans" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  Ecosistema Versátil de Audio
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                <div className="bg-slate-905 border border-slate-850 p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <Volume2 className="w-5 h-5 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider uppercase">Localización de Audioguías</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Crea contenidos multilingües dinámicos para museos, hoteles o catálogos interactivos. El timbre vocal coincide perfectamente con el estándar internacional.
                  </p>
                </div>

                <div className="bg-slate-905 border border-slate-855 p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-505/20">
                    <Languages className="w-5 h-5 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider uppercase">Doblaje de Videos Neuronales</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Dobla videos explicativos, cursos o videotutoriales manteniendo la entonación y timbre original del locutor primario en 28 idiomas distintos.
                  </p>
                </div>

                <div className="bg-slate-905 border border-slate-855 p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-505/20">
                    <Book className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider uppercase">Distribuidor de Podcasting</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Convierte reportes, entradas de blog o escritos técnicos a audio podcasts en segundos, listos para subir a iTunes o Spotify de forma masiva.
                  </p>
                </div>
              </div>
            </section>

            {/* PAYPAL COMPACT TIP JAR DIRECT FOR RUTH MEDINA */}
            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-indigo-650/5 pointer-events-none"></div>
              
              {/* Glowing Heart indicator */}
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-indigo-600 p-0.5 shadow-xl flex items-center justify-center relative animate-pulse">
                <div className="bg-slate-950 rounded-full w-full h-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                </div>
              </div>

              <div className="max-w-xl mx-auto space-y-3 font-sans">
                <span className="text-[9px] font-bold text-indigo-400 tracking-[0.2em] font-mono uppercase block">Soporte y Sostenibilidad Independiente</span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-sans" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  Proyecto de HOSTIA SOFT liderado por Ruth Medina
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tanto el maquetador suizo <strong>DIAGRAMMERS Studio</strong> como el optimizador de voces <strong>AITRANSVOICE</strong> no cobran tarifas de suscripción forzosas ni muestran banners intrusivos. Las descargas y pruebas de audio son posibles gracias al banco de aportes comunitarios libres.
                </p>
                <div className="text-xs text-slate-300 leading-relaxed font-semibold bg-slate-950/60 p-4 rounded-2xl border border-slate-850">
                  Si este software te resulta útil para tu obra o negocio de tecnología, te invitamos a dejar una <strong className="text-emerald-400">aportación voluntaria</strong> a través de PayPal de forma 100% segura. ¡Tu apoyo directo financia el costoso mantenimiento de de servidores de síntesis neuronal!
                </div>
              </div>

              {/* Tipping preset boxes */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <a
                  href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ruthgmedina@gmail.com&currency_code=USD&amount=5&item_name=Propina%20AITRANSVOICE%20Studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-950 hover:bg-slate-850 border border-slate-850 hover:border-emerald-500 text-slate-300 hover:text-white p-3 rounded-xl text-center transition-all cursor-pointer no-underline block"
                >
                  <span className="text-[10px] font-bold text-slate-500 font-mono block">Un Café</span>
                  <span className="text-sm font-bold text-white">US$ 5</span>
                </a>
                
                <a
                  href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ruthgmedina@gmail.com&currency_code=USD&amount=15&item_name=Propina%20AITRANSVOICE%20Studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-950 hover:bg-slate-850 border border-emerald-500/20 hover:border-emerald-500 text-slate-300 hover:text-white p-3 rounded-xl text-center transition-all cursor-pointer no-underline block relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[6px] font-black uppercase px-1">Sugerido</div>
                  <span className="text-[10px] font-bold text-emerald-400 font-mono block">Sostenible</span>
                  <span className="text-sm font-bold text-emerald-300">US$ 15</span>
                </a>

                <a
                  href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ruthgmedina@gmail.com&currency_code=USD&amount=50&item_name=Propina%20AITRANSVOICE%20Studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-950 hover:bg-slate-850 border border-slate-850 hover:border-emerald-500 text-slate-300 hover:text-white p-3 rounded-xl text-center transition-all cursor-pointer no-underline block"
                >
                  <span className="text-[10px] font-bold text-slate-500 font-mono block">Patrocinar</span>
                  <span className="text-sm font-bold text-white">US$ 50</span>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ruthgmedina@gmail.com&currency_code=USD&item_name=Donacion%20AITRANSVOICE%20Studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-indigo-650 hover:from-emerald-400 hover:to-indigo-550 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl transition-all cursor-pointer uppercase shadow-lg shadow-emerald-550/20 hover:scale-102 select-none no-underline"
                >
                  <Heart className="w-4 h-4 fill-current stroke-none text-red-200" />
                  <span>Aportar Donación Directa en PayPal</span>
                </a>
              </div>

              <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">
                🔒 Procesado directamente por la plataforma de seguridad de PayPal. Recibimiento íntegro e inmediato.
              </div>
            </section>
          </div>
        ) : (
          <>
            {/* HERO SECTION - POWERED BY HOSTIA SOFT */}
            <section className="text-center max-w-4xl mx-auto flex flex-col items-center space-y-6 pt-8 animate-fade-in">
              
              {/* Dynamic glowing full Hostia Soft emblem system for DIAGRAMMERS */}
              <HostiaSoftFullLogo glow={true} className="pb-4 transform hover:scale-[1.01] transition-transform duration-300" />

              <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-400 font-mono tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                HOSTIA SOFT • SOFTWARES DEMOCRÁTICOS PARA CAMBIAR EL MUNDO
              </span>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                {language === "en" ? (
                  <>Typeset & Format Your <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">Perfect Book</span> in One Click</>
                ) : language === "pt" ? (
                  <>Formatte e Compagine seu <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">Livro Perfeito</span> com um Clique</>
                ) : (
                  <>Maqueta y Compagina tu <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">Libro Perfecto</span> en un Clic</>
                )}
              </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-sans">
            {t.heroSubtitle}
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={onNavigateToStudio}
              className="bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-orange-500 hover:from-cyan-400 hover:via-fuchsia-500 hover:to-orange-400 text-white font-extrabold px-8 py-4 rounded-2xl text-sm sm:text-base tracking-wide shadow-xl shadow-cyan-500/20 shadow-fuchsia-500/10 transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-100 flex items-center gap-3 cursor-pointer"
            >
              <span>{t.liveSoftware}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            
            <a
              href="#financiero"
              className="bg-slate-900/60 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 px-8 py-4 rounded-2xl text-sm sm:text-base font-semibold tracking-wide transition-all hover:-translate-y-0.5 active:scale-100 flex items-center gap-2 cursor-pointer"
            >
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>{t.financialPitch}</span>
            </a>
          </div>

          <div className="pt-8 flex justify-center items-center gap-6 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> {t.unlimitedAccess}</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> {t.universalTemplates}</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> {t.fullTipographicCtrl}</span>
          </div>
        </section>

        {/* INTERACTIVE VIDEO STORIES / MASTERCLASS DEMO STEP HUB */}
        <section className="space-y-8 no-print animate-fade-in relative">
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-amber-500/15">
                <Flame className="w-3.5 h-3.5" />
                {language === "en" ? "INTERACTIVE MARKETING HUB" : language === "pt" ? "CENTRAL DE VÍDEOS INTERATIVOS" : "HUB INTERACTIVO DE MARKETING"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                {language === "en" 
                  ? "45-Second Masterclasses: Success Stories" 
                  : language === "pt" 
                  ? "Masterclasses de 45 Segundos: Autores Extraordinários" 
                  : "Masterclasses de 45 Segundos: Casos de Éxito Real"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {language === "en"
                  ? "Explore how diverse authors across the globe automated design, saved on layout bills, and launched directly to global markets."
                  : language === "pt"
                  ? "Veja como escritores independentes e editoras aceleraram a produção, economizaram com diagramação e alcançaram as livrarias."
                  : "Mira cómo diversos escritores de varios países automatizaron el diseño técnico de sus libros para vender en todo el mundo."}
              </p>
            </div>
            
            {/* Play/Pause state quick controller top right */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1.5"></span>
              <span className="text-slate-400 text-[10px] uppercase font-bold pr-1.5">
                {language === "en" ? "Live Interactive Feed" : language === "pt" ? "Transmissão Interativa" : "Transmisión Interactiva en Vivo"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: THE INTERACTIVE CINEMATIC VIDEO SCREEN (5Cols or 7Cols depending on balance) */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800/80 rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl relative min-h-[460px] md:min-h-[500px]">
              
              {/* VIDEO HEADER */}
              <div className="bg-slate-950/60 p-4 border-b border-slate-850 flex items-center justify-between gap-3 relative z-15">
                <div className="flex items-center gap-2.5">
                  <div className={`w-3.5 h-3.5 rounded-full ${activeVideo.avatarClass} flex items-center justify-center text-[8px] animate-pulse`}>
                    ●
                  </div>
                  <div>
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                      {language === "en" ? "Interactive Simulation" : language === "pt" ? "Simulação de Tela" : "Simulación Interactiva"} • {activeVideo.author}
                    </h5>
                    <p className="text-xs text-slate-350 font-sans font-semibold line-clamp-1">
                      {activeVideo.videoTitle[language] || activeVideo.videoTitle.es}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded-md">
                    {`0:${videoProgress < 10 ? '0' : ''}${videoProgress}`} / 0:45
                  </span>
                </div>
              </div>

              {/* VIDEO WORKSPACE GRAPHICS BODY (ANIMATED TO REPRESENT ACTIVE STEP) */}
              <div className={`flex-1 p-6 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-700 bg-gradient-to-b ${activeVideo.bgColor}`}>
                
                {/* SUBTLE TV STATIC/GRAIN CINEMATIC */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=40&w=200')]"></div>
                
                {/* INTERACTIVE GRAPHICS BASED ON SECONDS & ACTIVE STORY */}
                <div className="relative z-10 w-full text-center space-y-6">
                  
                  {activeVideoIdx === 0 && (
                    <div className="space-y-4">
                      {/* Novelist view (Mateo) */}
                      <div className="flex justify-center items-center gap-3">
                        {/* Word document shifting into book format */}
                        <div className="w-20 bg-slate-950 border border-slate-800 p-2 rounded-lg text-left shadow-lg scale-90 opacity-60">
                          <span className="text-[7px] text-indigo-400 font-mono block">Draft.docx</span>
                          <span className="text-[9px] text-slate-400 block leading-none">Elfos...</span>
                          <div className="w-10 h-1 bg-red-400 my-1"></div>
                          <div className="w-14 h-1 bg-slate-700 my-1"></div>
                          <div className="w-12 h-1 bg-red-400 my-1"></div>
                        </div>

                        <div className="flex flex-col items-center">
                          <span className="text-xs font-mono text-amber-400 animate-pulse">→ formatting →</span>
                          <span className="text-[9px] text-emerald-400 font-mono">{(videoProgress > 15) ? "CORRECTED (—)" : "Analyzing..."}</span>
                        </div>

                        <div className="w-24 bg-slate-950 border-2 border-amber-500/60 p-3 rounded-lg text-left shadow-xl hover:scale-105 transition-all">
                          <span className="text-[7px] text-amber-400 font-mono font-bold uppercase tracking-wider block">KDP Book PDF</span>
                          <span className="text-[10px] text-slate-200 block font-bold leading-none select-none">La Corona...</span>
                          <div className="w-16 h-1.5 bg-amber-500/20 my-1 rounded"></div>
                          <div className="w-14 h-1.5 bg-amber-500/30 my-1 rounded"></div>
                          <div className="w-18 h-1.5 bg-amber-500/40 my-1 rounded"></div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 bg-slate-950/80 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
                        <Sliders className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-slate-200">
                          {videoProgress < 15 
                            ? "Lectura inicial del manuscrito..." 
                            : videoProgress < 30 ? "Unificación tipográfica: Cambiando guiones por rayas (—)" 
                            : "Márgenes de imprenta listos para KDP"}
                        </span>
                      </div>
                    </div>
                  )}

                  {activeVideoIdx === 1 && (
                    <div className="space-y-4">
                      {/* Premium Typography (Clara) */}
                      <div className="max-w-xs mx-auto bg-slate-950 border border-slate-800 p-4 rounded-2xl text-left space-y-3 shadow-xl">
                        <div className="flex justify-between items-center bg-slate-900 px-2 py-1 rounded">
                          <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-wider">SWISS BASILAN GRID</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
                        </div>
                        
                        <div className="space-y-1.5">
                          <p className="text-xl sm:text-2xl font-sherif font-serif text-indigo-100 flex items-start gap-1">
                            <span className="text-3xl font-extrabold text-amber-500 mr-1 leading-none">H</span>
                            <span className="text-sm font-sans tracking-tight text-indigo-300">avia uma vez em Lisboa...</span>
                          </p>
                          <div className="space-y-1 opacity-70">
                            <div className="w-full h-0.5 bg-indigo-500/10 border-b border-indigo-400/20"></div>
                            <div className="w-full h-0.5 bg-indigo-500/10 border-b border-indigo-400/20"></div>
                            <div className="w-full h-0.5 bg-indigo-500/10 border-b border-indigo-400/20"></div>
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 bg-slate-950/80 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
                        <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-slate-200">
                          {videoProgress < 15 
                            ? "Ajustando Arquetipo Editorial..." 
                            : videoProgress < 30 ? "Vinculando prosa a rejilla base de 11pt" 
                            : "Sello Premium con capitulares ornamentadas de lujos"}
                        </span>
                      </div>
                    </div>
                  )}

                  {activeVideoIdx === 2 && (
                    <div className="space-y-4">
                      {/* Global B2B Reach (Henrique) */}
                      <div className="flex justify-center items-center gap-6">
                        <div className="bg-slate-950 border border-slate-800 py-3 px-5 rounded-2xl text-center space-y-1">
                          <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-widest">Multi-Idioma</span>
                          <div className="flex gap-1.5 justify-center">
                            <span className="bg-slate-900 border border-slate-800 text-[10px] font-bold px-1.5 py-0.5 rounded text-amber-400">ES</span>
                            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded">EN</span>
                            <span className="bg-slate-900 border border-slate-800 text-[10px] font-bold px-1.5 py-0.5 rounded text-emerald-400">PT</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs text-slate-200 font-mono">Google Firestore DB Sinc</span>
                          </div>
                          <span className="text-2xl font-black text-white">$19/mo MRR</span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 bg-slate-950/80 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
                        <Database className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-slate-200">
                          {videoProgress < 15 
                            ? "Escalabilidad global en otros idiomas..." 
                            : videoProgress < 30 ? "Sincronizando estado persistente de leads B2B" 
                            : "Vellum superado: Democratizando la autoedición física mundial"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* BOUNCING EQUALIZER (Indicates active speech) */}
                  <div className="flex justify-center items-center gap-1 h-8 pt-4">
                    {[1, 2, 3, 4, 5, 4, 3, 2, 3, 4, 5, 6, 7, 5, 3, 2, 1].map((height, i) => (
                      <span 
                        key={i} 
                        className={`w-1 rounded-full transition-all duration-150 ${
                          activeVideoIdx === 0 ? "bg-amber-500" : activeVideoIdx === 1 ? "bg-indigo-500" : "bg-emerald-500"
                        }`}
                        style={{ 
                          height: isVideoPlaying ? `${Math.max(5, height * (videoProgress % 3 === 0 ? 3 : videoProgress % 3 === 1 ? 4.5 : 1.5))}px` : '4px',
                          opacity: isVideoPlaying ? 0.9 : 0.4
                        }}
                      />
                    ))}
                  </div>

                </div>

              </div>

              {/* VIDEO CAPTIONS PROMPTER & CONTROLS */}
              <div className="bg-slate-950/90 p-4 sm:p-5 border-t border-slate-850 space-y-4 relative z-15">
                
                {/* Captions Text Teleprompter Container */}
                <div 
                  onClick={() => {
                    setIsVideoMuted(false);
                    setIsVideoPlaying(true);
                    speakWithRigor(currentCaption);
                  }}
                  className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 px-4 py-3 rounded-2xl relative min-h-[64px] flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                  title="Haz clic para escuchar este diálogo reproduciéndose en tiempo real"
                >
                  <div className="absolute top-1.5 left-3 text-[8px] font-mono text-slate-500 group-hover:text-amber-400 uppercase tracking-wider flex items-center gap-1 transition-colors">
                    <MessageSquare className="w-2.5 h-2.5" />
                    <span>{language === "en" ? "Voice Transcript Captions" : language === "pt" ? "Legendas de Voz" : "Subtítulos/Transcripción Activa"}</span>
                    <span className="text-[7.5px] bg-amber-500/10 text-amber-400 px-1 py-0.2 rounded font-black ml-1 uppercase">{language === "en" ? "Interactive Click-to-Speak" : language === "pt" ? "Clique para Ouvir" : "Clic para Oír"}</span>
                  </div>
                  <p className="text-xs sm:text-xs text-slate-200 font-medium italic select-none pt-2.5">
                    "{currentCaption}"
                  </p>
                  <span className="text-[9px] text-amber-400/80 font-mono font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === "en" ? "🔊 Click to Re-Speak aloud" : language === "pt" ? "🔊 Clique para Narrar de novo" : "🔊 Haz clic para Narrar de nuevo en voz alta"}
                  </span>
                </div>

                {/* Progress bar and scrubbing */}
                <div className="space-y-1 pb-1">
                  <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full transition-all duration-1000 ${
                        activeVideoIdx === 0 ? "bg-amber-500" : activeVideoIdx === 1 ? "bg-indigo-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${(videoProgress / 45) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
                    <span>{language === "en" ? "0s - Intro" : language === "pt" ? "0s - Começar" : "0s - Inicio"}</span>
                    <span>{language === "en" ? "22s - AI magic" : language === "pt" ? "22s - Truque de IA" : "22s - Magia del Formateador IA"}</span>
                    <span>45s {language === "en" ? "(Loop back)" : language === "pt" ? "(Repetir)" : "(Bucle)"}</span>
                  </div>
                </div>

                {/* CONTROLLER ROW */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    
                    {/* Play/Pause Toggle button */}
                    <button
                      onClick={() => {
                        const nextOn = !isVideoPlaying;
                        setIsVideoPlaying(nextOn);
                        if (nextOn) {
                          setIsVideoMuted(false);
                          speakWithRigor(currentCaption);
                        } else {
                          if (typeof window !== "undefined" && window.speechSynthesis) {
                            window.speechSynthesis.cancel();
                          }
                        }
                      }}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isVideoPlaying 
                          ? "bg-slate-800 hover:bg-slate-700 text-white" 
                          : "bg-amber-500 hover:bg-amber-400 text-slate-950 animate-bounce"
                      }`}
                      title={isVideoPlaying ? "Pausar Introducción" : "Reproducir Introducción"}
                    >
                      {isVideoPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>

                    {/* Reset Button */}
                    <button
                      onClick={() => {
                        setVideoProgress(0);
                        setIsVideoPlaying(true);
                        setIsVideoMuted(false);
                        const firstCaption = activeVideo.timeline[0].caption[language] || activeVideo.timeline[0].caption.es;
                        speakWithRigor(firstCaption);
                      }}
                      className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                      title="Reiniciar Línea de Tiempo (45 segundos)"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                  </div>

                  {/* Active Character Bio line summary */}
                  <span className="hidden md:inline text-[10px] text-slate-400 font-mono truncate max-w-xs">
                    {language === "en" ? "Mock Video Story: Active Sandbox Simulator" : language === "pt" ? "Story de Demonstração: Ambiente Sandbox Ativo" : "Historia de Demostración: Entorno Sandbox de Video Activo"}
                  </span>

                  {/* Volume / Mute indicator */}
                  <button
                    onClick={() => {
                      const nextMute = !isVideoMuted;
                      setIsVideoMuted(nextMute);
                      if (!nextMute) {
                        setIsVideoPlaying(true);
                        speakWithRigor(currentCaption);
                      } else {
                        if (typeof window !== "undefined" && window.speechSynthesis) {
                          window.speechSynthesis.cancel();
                        }
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                      isVideoMuted 
                        ? "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border-none shadow-lg shadow-amber-500/20" 
                        : "bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white"
                    }`}
                    title={isVideoMuted ? "Activar sonido de voz" : "Silenciar voz"}
                  >
                    {isVideoMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-slate-950 animate-bounce" />
                        <span className="text-[10px] font-mono uppercase font-black">Activar Audio de Autores (Voz Real)</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-mono text-emerald-400 uppercase font-black font-sans">Voz de IA Activa 🔊</span>
                      </>
                    )}
                  </button>

                </div>

              </div>

            </div>

            {/* RIGHT: SELECTOR OF THREE STORIES (BENTO STYLE CARDS DECORATED) (5Cols) */}
            <div className="lg:col-span-5 space-y-4.5 flex flex-col justify-start">
              
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shrink-0">
                  <Award className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h6 className="text-[11px] font-bold uppercase text-slate-200 tracking-wider font-mono">
                    {language === "en" ? "Strategic Conversion Playwood" : language === "pt" ? "Simulador Altamente Conversor" : "Estrategia para Inversores & Autores"}
                  </h6>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {language === "en"
                      ? "Play the story of each target audience archetype of our global publishing platform."
                      : language === "pt"
                      ? "Selecione o perfil de autor desejado para iniciar a simulação e conhecer suas soluções específicas."
                      : "Haz clic sobre cada creador a continuación para escuchar su experiencia técnica en 45 segundos automatizados."}
                  </p>
                </div>
              </div>

              {/* THE 3 STORIES CARD BUTTONS */}
              <div className="space-y-4">
                {videoStories.map((col, idx) => {
                  const isActive = activeVideoIdx === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveVideoIdx(idx);
                        const progress = idx === 0 ? 8 : 12; // starts exactly at a key spoken phrase section
                        setVideoProgress(progress);
                        setIsVideoPlaying(true);
                        setIsVideoMuted(false); // active unmute
                        const targetVideo = videoStories[idx];
                        const captionObj = targetVideo.timeline.find(chunk => progress >= chunk.start && progress <= chunk.end) || targetVideo.timeline[0];
                        const spokenText = captionObj.caption[language] || captionObj.caption.es;
                        speakWithRigor(spokenText, idx);
                      }}
                      className={`text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-start ${
                        isActive 
                          ? `bg-slate-900 border-2 ${col.ringColor} shadow-xl shadow-slate-950/80` 
                          : "bg-slate-950/60 border-slate-850 hover:bg-slate-900 hover:border-slate-800"
                      }`}
                    >
                      {/* Left circular progress and character initials */}
                      <div className="relative shrink-0 pt-0.5">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold leading-none ${col.avatarClass}`}>
                          {col.author.substring(0, 2)}
                        </div>
                        {isActive && (
                          <div className="absolute inset-0 border-2 border-slate-950 rounded-full animate-ping pointer-events-none"></div>
                        )}
                        {/* Interactive miniature countdown circle */}
                        <div className="absolute -bottom-1 -right-1 bg-slate-950 border border-slate-800 text-[8px] px-1 py-0.5 rounded-full text-slate-450 font-mono font-black select-none">
                          {isActive ? `${45 - videoProgress}s` : "45s"}
                        </div>
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2.5">
                          <div>
                            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                              {col.author} 
                              <span className="text-[10px] text-slate-500 font-normal">({col.age} {language === "en" ? "years" : language === "pt" ? "anos" : "años"})</span>
                            </h4>
                            <p className="text-[10px] font-bold text-amber-500 tracking-wider uppercase font-mono leading-none pt-0.5">
                              {col.role[language] || col.role.es}
                            </p>
                          </div>
                          
                          {/* Active state indicator dot or badge */}
                          {isActive ? (
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border shrink-0 ${col.badgeColor}`}>
                              {language === "en" ? "PLAYING" : language === "pt" ? "EXIBINDO" : "REPRODUCION"}
                            </span>
                          ) : (
                            <span className="text-[8px] font-bold text-slate-500 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-full shrink-0">
                              {language === "en" ? "CLICK TO PLAY" : language === "pt" ? "TOQUE" : "VER VIDEO"}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-100 font-bold leading-snug line-clamp-1 italic">
                          {col.headline[language] || col.headline.es}
                        </p>

                        <p className="text-[11px] text-slate-400 leading-snug font-sans line-clamp-2">
                          {col.bio[language] || col.bio.es}
                        </p>

                        <div className="flex gap-2 flex-wrap pt-1 font-mono text-[9px]">
                          <span className="bg-slate-950/80 border border-slate-850 px-2 py-0.5 rounded text-slate-400">
                            Book: <strong className="text-slate-350">{col.bookTitle}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>

        {/* GOOGLE CLOUD SYNC AND DEPLOY STATUS GUIDE */}
        {(showSyncGuide || true) && (
          <section className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Database className="w-32 h-32" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/60">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <p className="text-[10px] uppercase font-bold text-amber-400 tracking-widest font-mono">{t.activeStatus}</p>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  {t.leadTitle}
                </h3>
                <p className="text-xs text-slate-300 max-w-2xl">
                  {t.leadDesc}
                </p>
              </div>

              <div className="flex shrink-0">
                <span className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 text-slate-300 font-mono">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  {language === "en" ? "AES-256 Encryption Active" : language === "pt" ? "Criptografia AES-256 Ativa" : "Encriptación AES-256 Activa"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-slate-950/70 border border-slate-900 p-4 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
                  <span className="w-5 h-5 rounded-full bg-amber-400/10 flex items-center justify-center text-[10px]">1</span>
                  {t.dbStep1}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t.dbStep1Desc}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-900 p-4 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
                  <span className="w-5 h-5 rounded-full bg-amber-400/10 flex items-center justify-center text-[10px]">2</span>
                  {t.dbStep2}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t.dbStep2Desc}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-900 p-4 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
                  <span className="w-5 h-5 rounded-full bg-amber-400/10 flex items-center justify-center text-[10px]">3</span>
                  {language === "en" ? "DEPLOY SECURITY RULES" : language === "pt" ? "ATIVAR REGRAS SEGURAS" : "DESPLIEGA REGLAS SEGURAS"}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {language === "en" ? "Deploy secure Access rules using deploy_firebase to maintain strict enterprise data privacy levels." : language === "pt" ? "Utilize deploy_firebase para carregar regras de segurança rígidas e manter privacidade de dados." : "Ejecuta deploy_firebase para inyectar reglas de seguridad que bloqueen accesos externos no autorizados y garanticen cumplimiento corporativo."}
                </p>
              </div>
            </div>

            {/* HIGHLY EXCLUSIVES MOBILE ACCESS ADVICE BANNER */}
            <div className="mt-4 bg-gradient-to-r from-amber-500/10 to-indigo-500/5 border border-amber-500/20 p-5 rounded-2xl space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-100 font-mono">
                      ¿Accedes desde tu Celular? Soporte Móvil Total & Google Cloud B2B
                    </h4>
                  </div>
                </div>
                <div>
                  <span className="text-[9px] font-mono bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest shrink-0">
                    Soporte Multiplataforma
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 text-xs">
                <div className="space-y-1">
                  <h5 className="font-bold text-amber-400 text-[11px] uppercase tracking-wider">1. DEMO EN VIVO DESDE EL CELULAR</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Tanto la **Landing Hub** como el **Editor Studio** son 100% responsivos. Desliza para ajustar márgenes, cambia las fuentes con el dropdown táctil y prueba el dictado por voz (Dictado IAs) directamente en el navegador del celular. ¡Facilita las presentaciones de elevator pitch con inversores en cualquier lugar!
                  </p>
                </div>

                <div className="space-y-1">
                  <h5 className="font-bold text-amber-400 text-[11px] uppercase tracking-wider">2. GOOGLE CLOUD DESDE TU TELÉFONO</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    ¡Sí, se puede gestionar en celular! Descarga la app oficial **"Google Cloud Console" (iOS y Android)**. Permite inspeccionar tu clúster de Cloud Run, monitorear peticiones B2B, auditar accesos, ver logs estables y recibir alertas de costos en tiempo real en la pantalla de inicio.
                  </p>
                </div>

                <div className="space-y-1">
                  <h5 className="font-bold text-amber-400 text-[11px] uppercase tracking-wider">3. PANEL EN LA NUBE DE FIREBASE</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Accede a **console.firebase.google.com** desde Google Chrome o Safari en tu celular. El gestor de Firestore DB es adaptable, permitiéndote consultar los leads de inversores registrados y leads de cotizaciones al instante en cualquier café de pitch o reunión técnica.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* BENCHMARK / SWOT (DEBILIDADES DE COMPETENCIA) */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Ventaja Técnica de DIAGRAMMERS
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Analizamos la fricción estética de las herramientas principales de diseño de libros y rediseñamos la solución para que sea fluida, potente y accesible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                name: "Vellum (macOS)",
                weakness: "Exclusivo de Mac y con licencia exorbitante de US$250. Interfaz rígida sin IA.",
                solution: "Multiplataforma en la Web a una fracción de precio, con el poder del motor de sugerencia de estilo IA de Google Gemini."
              },
              {
                name: "Atticus.io",
                weakness: "Plantillas visualmente genéricas, renderizado lento de manuscritos grandes.",
                solution: "Previsualización fluida de pliego doble estilo libro real con compilador de Table of Contents interactivo instantáneo."
              },
              {
                name: "Reedsy Editor",
                weakness: "Sin control fino de márgenes, sangría tipográfica o justificación de párrafos.",
                solution: "Flexibilidad tipográfica completa. Cambia márgenes de imprenta, indents, interlineado y alineación sobre la marcha."
              },
              {
                name: "Adobe InDesign",
                weakness: "Dificultad extrema de uso, requiere años de estudio profesional y mensualidades perennes.",
                solution: "Automatización total. El autor solo escribe y el motor de autodiagramación genera el pliego perfecto listo para Amazon KDP."
              }
            ].map((comp, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-amber-500 font-bold">COMPETIDOR {idx + 1}</span>
                    <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded font-bold font-mono">FRICCIÓN</span>
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">{comp.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    <strong className="text-slate-300">Deficiencia:</strong> {comp.weakness}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-850 space-y-1 bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/10">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Ventaja DIAGRAMMERS:</span>
                  <p className="text-[11.5px] text-amber-100 leading-relaxed">{comp.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7-DAY FREE TRIAL PROGRAM FOR SMALL PUBLISHERS AND INVESTOR SHOWCASE */}
        <section id="demo-7-dias" className="space-y-8 animate-fadeIn">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-400 font-mono tracking-wider">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              PILOTO GRATUITO DE PROCESO COMPLETO (SaaS B2B PLG)
            </span>
            <h3 className="text-2xl md:text-4xl font-black tracking-tight text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Programa Demo de 7 Días para Pequeñas Editoriales
            </h3>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
              Permite a los editores independientes importar un manuscrito real en borrador, resolver toda la compaginación y descargar el PDF de pliego final listo para Amazon KDP. El 100% de la funcionalidad activa antes de comprar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Timeline Column (7 Days Journey) */}
            <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 p-5 md:p-7 rounded-3xl space-y-6 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest font-mono border-b border-slate-800 pb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                  Garantía del Proceso: De Cero a Libro Listo en 7 Días
                </h4>
                
                <div className="mt-6 space-y-4 relative pl-4 border-l border-slate-800">
                  <div className="space-y-1 relative">
                    <div className="absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full bg-amber-500 border border-slate-950 flex items-center justify-center text-[8px] text-slate-950 font-bold">1</div>
                    <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Días 1 - 2: Ingesta del Manuscrito y Dictado de Voz</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Carga tu borrador copiado/pegado o graba pasajes literarios complejos usando el dictado por voz integrado de alta fiabilidad. La IA segmentará y ordenará los capítulos automáticamente.
                    </p>
                  </div>

                  <div className="space-y-1 relative">
                    <div className="absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full bg-amber-500 border border-slate-950 flex items-center justify-center text-[8px] text-slate-950 font-bold">3</div>
                    <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Días 3 - 4: Optimización Estética Google Gemini</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      El motor analiza el género literario para proveer emparejamientos tipográficos perfectos con previsualizaciones y márgenes de imprenta exactos en segundos.
                    </p>
                  </div>

                  <div className="space-y-1 relative">
                    <div className="absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full bg-amber-500 border border-slate-950 flex items-center justify-center text-[8px] text-slate-950 font-bold">5</div>
                    <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Días 5 - 6: Ajustes de Pliego Fino y Páginas</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Explora la visión interactiva de página doble (view mode real). Edita huérfanas, viudas, ajusta sangrías y genera el Índice General dinámico de forma interactiva.
                    </p>
                  </div>

                  <div className="space-y-1 relative">
                    <div className="absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-slate-950 flex items-center justify-center text-[8px] text-slate-950 font-bold">7</div>
                    <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>Día 7: Exportación de Maestros para KDP</span>
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Descarga tu PDF definitivo optimizado a 300 DPI y con tipografías subseteadas incrustadas. Cumple al 100% las normativas de plegado físico de Amazon o IngramSpark.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl flex items-center gap-3 mt-4">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-[10.5px] text-slate-400 leading-normal">
                  <strong className="text-slate-200 block">Compromiso Sin Tarjeta de Crédito:</strong> Nos enfocamos en el valor del producto (Product-Led Growth). Las pequeñas editoriales compran cuando ven impresas las páginas de prueba reales.
                </p>
              </div>
            </div>

            {/* Live Interactive ROI Calculator column */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/90 p-5 md:p-7 rounded-3xl flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[9px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded tracking-wider uppercase block w-max">
                  Calculadora Interactiva de Ahorro
                </span>
                
                <h4 className="text-base font-bold text-white tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  ¿Cuánto Ahorra la Editorial en su Demo?
                </h4>
                
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Arrastra el selector con tu dedo o cursor para indicar la longitud de tu manuscrito borrador y calcular el coste del piloto gratuito:
                </p>

                {/* SLIDER WIDGET TÁCTIL MOVIL */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 space-y-3.5 my-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Extensión del Maquetado:</span>
                    <span className="font-mono text-amber-400 font-extrabold text-[13px]">
                      {trialBookPages} páginas
                    </span>
                  </div>

                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={trialBookPages}
                    onChange={(e) => setTrialBookPages(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>50 pág. (Poesía)</span>
                    <span>250 pág. (Novela estándar)</span>
                    <span>500 pág. (Monografía)</span>
                  </div>
                </div>

                {/* SIDE BY SIDE COMPARISON */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-2">
                    <div className="flex flex-col">
                      <span className="text-slate-400 font-medium">Diseño Tradicional (InDesign):</span>
                      <span className="text-[10px] text-slate-500 font-mono">US$2.20 por página + demoras</span>
                    </div>
                    <span className="font-mono text-red-400 font-bold">
                      US${(trialBookPages * 2.2).toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-2">
                    <div className="flex flex-col">
                      <span className="text-slate-400 font-medium">Licencia de Demo (7 Días):</span>
                      <span className="text-[10px] text-slate-500 font-mono">Prueba completa sin límites</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-extrabold">
                      US$0.00 <span className="text-[9px] font-normal">GRATIS</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-2">
                    <div className="flex flex-col">
                      <span className="text-slate-400 font-medium">Plazo de Entrega e Impresiones:</span>
                      <span className="text-[10px] text-slate-500 font-mono">Iteración veloz asistida por IA</span>
                    </div>
                    <span className="text-[11px] text-slate-300">
                      Inmediato <span className="text-[9.5px] line-through text-slate-500">vs 3 semanas</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* SAVINGS HIGHLIGHT BENTO BLOCK */}
              <div className="mt-5 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-1 text-center">
                <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block">Ahorro Neto Realizado</span>
                <span className="text-2xl font-black text-white font-mono tracking-tight block">
                  US${(trialBookPages * 2.2).toLocaleString(undefined, {maximumFractionDigits: 0})}
                </span>
                <p className="text-[10px] text-slate-350 italic">
                  Tu obra finalizada lista para ir a imprenta y a tiendas sin costo inicial.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigateToStudio()}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-3 rounded-xl shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Iniciar Prueba Gratis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPaywallDemoOpen(!isPaywallDemoOpen)}
                  className="w-full bg-slate-900 hover:bg-slate-850 text-slate-300 font-semibold text-xs py-3 rounded-xl border border-slate-800 hover:border-slate-750 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Simulador Paywall GPay</span>
                </button>
              </div>
            </div>

          </div>

          {/* EXPANDABLE INTERACTIVE GPAY LOCK & REINVESTMENT FLUID PORTAL */}
          {isPaywallDemoOpen && (
            <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6 animate-fadeIn relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-400 text-[9px] uppercase tracking-wider font-mono font-bold px-3 py-1 rounded-bl-xl border-l border-b border-amber-500/20">
                PITCH DE INVERSIONISTAS EN VIVO
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start justify-between border-b border-slate-800 pb-5">
                <div className="space-y-1.5 max-w-xl">
                  <h4 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-amber-500" />
                    Simulación de Bloqueo Post-Trial (SaaS Core Protection)
                  </h4>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    Al décimo séptimo día, el software suspende temporalmente el módulo de exportación y edición de pliegos, notificando al usuario que su manuscrito queda almacenado de forma segura en Google Firestore. Esto incentiva un ratio de conversión extremadamente alto.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-850 shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${paywallPaymentState === 'unlocked' ? 'bg-emerald-500' : paywallPaymentState === 'processing' ? 'bg-amber-500 animate-ping' : 'bg-red-500'}`}></div>
                  <span className="text-[10px] font-mono tracking-wide text-slate-300 uppercase font-bold">
                    Estado Actual: {paywallPaymentState === 'unlocked' ? '🔓 Desbloqueado' : paywallPaymentState === 'processing' ? 'Procesando GPay' : '🔒 Bloqueado (Suscripción Necesaria)'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Mock Paywall Interface */}
                <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-5 text-center relative">
                  {paywallPaymentState === 'locked' && (
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-amber-500/15 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/25">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">Periodo de Prueba Finalizado</h5>
                        <p className="text-xs text-white font-bold leading-tight">Tu obra "Mi Manuscrito Editorial" está Guardada con Éxito</p>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          Para habilitar las descargas ilimitadas B2B por 1 año y continuar el diseño fluido, activa la membresía de producción.
                        </p>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-850/80 text-left space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-300 font-bold">
                          <span>Suscripción B2B Profesional:</span>
                          <span className="text-amber-400">US$ 19 / mes</span>
                        </div>
                        <p className="text-[9.5px] text-slate-500">
                          Incluye soporte de IA Gemini, exportador KDP de 300 DPI y soporte móvil para edición en celular offline.
                        </p>
                      </div>

                      {/* GOOGLE PAY BUTTON */}
                      <button
                        onClick={() => {
                          setPaywallPaymentState('processing');
                          setTimeout(() => {
                            setPaywallPaymentState('unlocked');
                          }, 1800);
                        }}
                        className="w-full bg-black hover:bg-zinc-900 text-white font-bold py-3 px-4 rounded-xl shadow-lg border border-zinc-800 hover:border-zinc-750 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm font-mono"
                      >
                        {/* Custom visual SVG or text mimicking Google Pay button */}
                        <span className="opacity-90">Pagar con</span>
                        <span className="font-extrabold tracking-tight text-white flex items-center gap-0.5">
                          <span className="text-amber-400 font-serif font-black">G</span>Pay
                        </span>
                      </button>
                      <p className="text-[9px] text-slate-500">
                        Pago en 1-click verificado por Google Pay en Celular o Desktop. Sin datos expuestos.
                      </p>
                    </div>
                  )}

                  {paywallPaymentState === 'processing' && (
                    <div className="py-12 space-y-4">
                      <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-xs font-bold text-amber-400 font-mono tracking-wider">COMUNICANDO CON GOOGLE PAY API...</p>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        Validando token de transacción segura. Se autorizan los fondos automáticos a la cuenta corporativa.
                      </p>
                    </div>
                  )}

                  {paywallPaymentState === 'unlocked' && (
                    <div className="space-y-4 py-4 animate-scaleUp">
                      <div className="w-12 h-12 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/25">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Suscripción Activada</h5>
                        <p className="text-xs text-white font-bold leading-tight">¡Suite Completa Desbloqueada!</p>
                        <p className="text-[10px] text-slate-450 leading-relaxed">
                          La base de datos actualizó instantáneamente la metadata de esta cuenta. Ya tienes acceso directo móvil y de sobremesa para todas tus descargas maestras de imprenta.
                        </p>
                      </div>

                      <button
                        onClick={() => setPaywallPaymentState('locked')}
                        className="text-[10px] bg-slate-900 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-850 transition-all cursor-pointer"
                      >
                        Reiniciar Simulación de Bloqueo
                      </button>
                    </div>
                  )}
                </div>

                {/* Corporate Governance & Automatic Reinvestment Model */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-emerald-400 font-mono uppercase font-bold tracking-wider">Cuentas Corrientes Transparentes</span>
                    <h5 className="text-sm font-bold text-slate-100 uppercase tracking-tight">
                      Garantía de Inversionista: Reinversión de Caja Automatizada al 100%
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Para garantizar un crecimiento compuesto explosivo, todos los cobros procesados por Google Pay de los editores autónomos se transfieren a una cuenta corporativa unificada, bloqueando el retiro de dividendos personales tempranos.
                    </p>
                  </div>

                  {/* Dynamic allocation bar */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10.5px] text-slate-300 font-bold block">Distribución Programática de Ingresos:</span>
                      
                      {/* Percentages bar stacked visual */}
                      <div className="w-full h-4 rounded-full bg-slate-905 overflow-hidden flex text-[8.5px] font-mono text-slate-950 font-bold text-center">
                        <div className="bg-amber-500 h-full flex items-center justify-center transition-all duration-300" style={{ width: '60%' }} title="Servidores y APIs (60%)">60%</div>
                        <div className="bg-emerald-500 h-full flex items-center justify-center transition-all duration-300" style={{ width: '25%' }} title="Marketing Ads (25%)">25%</div>
                        <div className="bg-indigo-400 h-full flex items-center justify-center transition-all duration-300" style={{ width: '15%' }} title="Soporte y Dev (15%)">15%</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono gap-1 flex-wrap">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500 shrink-0"></span> 60% Servidores/Gemini</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500 shrink-0"></span> 25% Adquisición/Anuncios</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-indigo-400 shrink-0"></span> 15% Soporte técnico</span>
                    </div>

                    {/* Interactive breakdown tabs inside the box */}
                    <div className="bg-slate-900 rounded-xl border border-slate-850/60 p-3 space-y-2">
                      <div className="flex gap-1.5 border-b border-slate-800 pb-1.5">
                        <button
                          onClick={() => setReinvestmentTab("servers")}
                          className={`text-[9.5px] font-extrabold uppercase py-0.5 px-2 rounded tracking-wider cursor-pointer ${reinvestmentTab === 'servers' ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                          60% Servidores
                        </button>
                        <button
                          onClick={() => setReinvestmentTab("marketing")}
                          className={`text-[9.5px] font-extrabold uppercase py-0.5 px-2 rounded tracking-wider cursor-pointer ${reinvestmentTab === 'marketing' ? 'bg-emerald-500/15 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                          25% Marketing
                        </button>
                        <button
                          onClick={() => setReinvestmentTab("development")}
                          className={`text-[9.5px] font-extrabold uppercase py-0.5 px-2 rounded tracking-wider cursor-pointer ${reinvestmentTab === 'development' ? 'bg-indigo-400/15 text-indigo-300' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                          15% Soporte
                        </button>
                      </div>

                      {reinvestmentTab === "servers" && (
                        <p className="text-[10.5px] text-slate-350 leading-relaxed animate-fadeIn">
                          <strong>Infraestructura en la Nube y Tokens de Gemini:</strong> Un volumen alto de maquetados requiere potencia de cómputo ininterrumpida y cuotas amplias para resolver manuscritos en segundos sin demoras de procesador, alojado 100% en Google Cloud Run.
                        </p>
                      )}

                      {reinvestmentTab === "marketing" && (
                        <p className="text-[10.5px] text-slate-350 leading-relaxed animate-fadeIn">
                          <strong>Adquisición de Editoriales (Growth Loop):</strong> Inyección directa a campañas móviles geo-segmentadas dirigidas a escritores y pequeñas editoriales en Google Ads e Instagram B2B. Acelerará la adquisición orgánica de leads.
                        </p>
                      )}

                      {reinvestmentTab === "development" && (
                        <p className="text-[10.5px] text-slate-350 leading-relaxed animate-fadeIn">
                          <strong>Refinamiento de UX móvil y QA:</strong> El 100% de este fondo nutre actualizaciones semanales para perfeccionar la experiencia móvil, asegurando que un editor complete y exporte un pliego entero desde el tren o café.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-950/40 p-3.5 border border-slate-850/50 rounded-xl space-y-1.5 text-xs text-slate-400">
                    <p className="leading-relaxed">
                      🎁 <strong className="text-slate-200">Visión de Gobernanza:</strong> Esto tranquiliza al inversor ya que todo ingreso se recapitaliza en el patrimonio corporativo, garantizando que cada US$ 19 recibidos por Google Pay multiplique el valor de mercado de la empresa sin fugas financieras de caja.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </section>

        {/* CYBERSECURITY AND ANTI-CLONE SOLID SANCTUM */}
        <section id="ciberseguridad" className="bg-slate-900/35 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Shield className="w-40 h-40 text-amber-500 animate-pulse" />
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400 font-mono tracking-widest uppercase">
              <Fingerprint className="w-3.5 h-3.5" />
              Sello de Garantía e Integridad SaaS
            </span>
            <h3 className="text-xl md:text-3xl font-black text-white tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Núcleo de Ciberseguridad & Anti-Clonación
            </h3>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              Protegemos la propiedad intelectual de las editoriales en tiempo real. Un blindaje completo para que ningún competidor o software automatizado replique o sustraiga manuscritos originales.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
            {/* Left selector and tabs */}
            <div className="lg:col-span-4 space-y-3.5 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold text-amber-400 tracking-wider">Filtro de Cripto-Seguridad</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Para mantener el 100% de la integridad de los datos, implementamos tres capas críticas de seguridad activas en Google Cloud y Firebase Firestore DB:
                </p>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveSecurityTab("mss_encryption")}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${activeSecurityTab === 'mss_encryption' ? 'bg-amber-500/10 border-amber-500/35 text-white' : 'bg-slate-950/40 border-slate-900/60 text-slate-400 hover:text-slate-200'}`}
                >
                  <Key className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold font-mono uppercase tracking-wider">1. Cifrado AES-256 en Tránsito</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">Cifra automáticamente el manuscrito antes de subirlo a la nube.</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSecurityTab("anticlone")}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${activeSecurityTab === 'anticlone' ? 'bg-amber-500/10 border-amber-500/35 text-white' : 'bg-slate-950/40 border-slate-900/60 text-slate-400 hover:text-slate-200'}`}
                >
                  <ShieldAlert className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold font-mono uppercase tracking-wider">2. Control Anti-Clonación B2B</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">Reglas estrictas de Firestore DB que deniegan accesos no autorizados.</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSecurityTab("cloudrun_firewall")}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${activeSecurityTab === 'cloudrun_firewall' ? 'bg-amber-500/10 border-amber-500/35 text-white' : 'bg-slate-950/40 border-slate-900/60 text-slate-400 hover:text-slate-200'}`}
                >
                  <Cpu className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold font-mono uppercase tracking-wider">3. Cortafuegos & Firma SHA-256</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">Control de rate-limit celular para bloquear bots de imitación.</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSecurityTab("copyright")}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${activeSecurityTab === 'copyright' ? 'bg-amber-500/10 border-amber-500/35 text-white' : 'bg-slate-950/40 border-slate-900/60 text-slate-400 hover:text-slate-200'}`}
                >
                  <FileText className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold font-mono uppercase tracking-wider">4. Derecho de Autor (MS Word)</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">Documentación formal lista para descargar en Word.</p>
                  </div>
                </button>
              </div>

              <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-900 text-[10px] text-slate-400 leading-normal">
                🛡️ <strong className="text-slate-200">Protección de Datos Editoriales:</strong> Garantizamos al inversor que la obra maquetada es ilegible en el servidor sin su respectiva llave JWT activa de usuario, impidiendo robo intelectual corporativo.
              </div>
            </div>

            {/* Right Interactive Live Sandbox Console */}
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-850 p-5 flex flex-col justify-between space-y-4">
              
              {activeSecurityTab === "mss_encryption" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10.5px] font-mono font-bold text-slate-300 uppercase tracking-widest">
                        Consola en Vivo: Demostración de Cifrado AES-256
                      </span>
                    </div>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold font-mono">
                      AES-256 GCM MÓVIL OK
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Escribe cualquier texto manuscrito o confidencial. Presiona <strong>"Ejecutar Filtro Criptográfico"</strong> para simular el cifrado del lado del cliente antes del envío seguro en la nube.
                  </p>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Tu Manuscrito en Claro</label>
                      <input 
                        type="text" 
                        value={encryptionText}
                        onChange={(e) => {
                          setEncryptionText(e.target.value);
                          // Generate random looking base64 string
                          const salt = "U2FsdGVkX1" + Math.random().toString(36).substring(4).toUpperCase();
                          setCyphertext(salt + "==");
                        }}
                        className="w-full bg-slate-900 text-xs text-slate-200 px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500/50"
                        placeholder="Contenido confidencial del libro..."
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEncryptingInProgress(true);
                          setTimeout(() => {
                            setIsEncryptingInProgress(false);
                          }, 1000);
                        }}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow shadow-amber-500/10"
                      >
                        {isEncryptingInProgress ? (
                          <>
                            <span className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                            <span>Cifrando Manuscrito...</span>
                          </>
                        ) : (
                          <>
                            <Key className="w-3.5 h-3.5" />
                            <span>Ejecutar Filtro Criptográfico</span>
                          </>
                        )}
                      </button>

                      <span className="text-[10px] font-mono text-slate-500">
                        {isEncryptingInProgress ? "🔒 En tránsito..." : "✔️ Datos seguros"}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                        <EyeOff className="w-3 h-3 text-red-400" />
                        Cadena Cifrada en Base de Datos (Segura de Hackers y Clones)
                      </label>
                      
                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-850 text-[10.5px] font-mono text-amber-400 break-all leading-normal">
                        {isEncryptingInProgress ? (
                          <span className="animate-pulse">Calculando llave de seguridad B2B...</span>
                        ) : (
                          cyphertext
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSecurityTab === "anticlone" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10.5px] font-mono font-bold text-slate-300 uppercase tracking-widest">
                        Protocolos Anti-Clonación Intelectual
                      </span>
                    </div>
                    <span className="text-[9px] bg-red-500/15 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-mono font-bold">
                      INTRUSION DETECTION SYSTEM
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Evitamos la copia indebida del software ("Reverse Engineering") y la falsificación de la suite literaria con un arsenal de defensas robustas:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5 animate-fadeIn">
                      <div className="flex items-center gap-2 text-emerald-450 font-bold">
                        <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                        <h6 className="uppercase tracking-wider text-[11px] text-slate-200">Firestore Security Guards</h6>
                      </div>
                      <p className="text-[10.5px] text-slate-400 leading-relaxed">
                        Reglas de base de datos a nivel de registro. Nadie, ni siquiera simulando ser otro usuario de la API, puede leer, sobrescribir o alterar tus leads o tus manuscritos si no firma con su token criptográfico verificado por Google.
                      </p>
                    </div>

                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5 animate-fadeIn">
                      <div className="flex items-center gap-2 text-emerald-455 font-bold">
                        <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                        <h6 className="uppercase tracking-wider text-[11px] text-slate-200">Anti-Bot & Anti-Scraping</h6>
                      </div>
                      <p className="text-[10.5px] text-slate-400 leading-relaxed">
                        La API web cuenta con rate-limits adaptados. Bloquea de forma inmediata peticiones repetitivas desde celulares zombie o data-centers automatizados que busquen extraer la propiedad intelectual del editor.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[10.5px] text-slate-350">
                    <strong>Garantía para el Pitch:</strong> Al no depender de servidores monolíticos expuestos y usar la robustez de Google Cloud Storage/Firestore B2B, eliminamos por completo los single points of failure típicos de clones de baja seguridad.
                  </div>
                </div>
              )}

              {activeSecurityTab === "cloudrun_firewall" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-indigo-455" />
                      <span className="text-[10.5px] font-mono font-bold text-slate-300 uppercase tracking-widest">
                        Cortafuegos Integrado & Google SSL Guard
                      </span>
                    </div>
                    <span className="text-[9px] bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold">
                      SHA-256 INTEGRADOR
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Nuestra infraestructura híbrida de Google Cloud Run utiliza un balanceador de carga global HTTPS con certificados SSL automáticos que garantizan la entrega e integridad del paquete maquetado.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] bg-slate-900 p-3 rounded-xl border border-slate-850">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-300 font-mono font-semibold">Filtro de Ciberseguridad IP:</span>
                      </div>
                      <span className="text-emerald-400 font-mono">ACTIVO (0 ataques hoy)</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] bg-slate-900 p-3 rounded-xl border border-slate-850">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-300 font-mono font-semibold">Cifrado de Base de Datos (Rest):</span>
                      </div>
                      <span className="text-emerald-400 font-mono font-mono">Google TLS 1.3 / AES-256</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] bg-slate-900 p-3 rounded-xl border border-slate-850">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-300 font-mono font-semibold">Integridad mediante Hash SHA-256:</span>
                      </div>
                      <span className="text-emerald-400 font-mono font-mono">100% Verificado</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSecurityTab === "copyright" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      <span className="text-[10.5px] font-mono font-bold text-slate-300 uppercase tracking-widest">
                        Depósito de Obra & Generador de Memoria Técnica
                      </span>
                    </div>
                    <span className="text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono font-bold">
                      PROPIEDAD INTELECTUAL OK
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Nuestra suite facilita la legitimación jurídica a nivel corporativo y literario. El sistema estructura una Memoria de Ingeniería oficial, pre-poblada con las especificaciones técnicas del software solicitadas para el depósito de derechos de autor.
                  </p>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3.5">
                    <h6 className="text-[11px] font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      Estructura Técnica Exportable a Microsoft Word (.doc)
                    </h6>
                    
                    <p className="text-[10.5px] text-slate-450 leading-relaxed">
                      La memoria técnica descargable detalla los algoritmos del motor editorial de compensación física, el filtro de ciberseguridad, la arquitectura de base de datos distribuidas y los metatítulos bajo estricto apego con las directivas de oficinas de patentes.
                    </p>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="truncate">Registro_Derecho_Autor_DIAGRAMMERS.doc</span>
                      <span className="text-emerald-400 font-bold shrink-0 ml-2">Listo (15 KB)</span>
                    </div>

                    <button
                      type="button"
                      onClick={downloadSoftwareRegistrationDoc}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 hover:text-slate-900 font-black py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 shrink-0" />
                      <span>Descargar Memoria Técnica en Word (.doc)</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* FINANCIAL & INVESTOR SIMULATOR */}
        <section id="financiero" className="bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-10 space-y-8 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <TrendingUp className="w-40 h-40" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Info Column */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-indigo-400 tracking-wider">
                {language === "en" ? "PRE-SEED EXECUTIVE CAPITAL DESK" : language === "pt" ? "MESA COMERCIAL DE RISCO PRE-SEED" : "MESA COMERCIAL DE RIESGO PRE-SEED"}
              </span>
              
              <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold tracking-tight text-white leading-snug" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                {t.pitchTitle}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.pitchDesc}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <span>
                    {language === "en" 
                      ? "Projected Customer Acquisition Cost (CAC):" 
                      : language === "pt" 
                      ? "Custo de Aquisição de Cliente (CAC) projetado:" 
                      : "Coste de Adquisición de Clientes (CAC) proyectado:"} <strong className="text-white">US$ {customerAcquisitionCost}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <span>
                    {language === "en" ? (
                      <>Business Model: <strong className="text-white">SaaS Subscription US$ 19 / month</strong></>
                    ) : language === "pt" ? (
                      <>Modelo de Negócio: <strong className="text-white">SaaS assinatura de US$ 19 / mês</strong></>
                    ) : (
                      <>Modelo de Negocio: <strong className="text-white">SaaS suscripción de US$ 19 / mes</strong></>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <span>{language === "en" ? "Scalable Marketing Outlay: 45% of invested capital" : language === "pt" ? "Gasto de marketing escalável: 45% do capital investido" : "Gasto de marketing escalable: 45% del capital invertido"}</span>
                </div>
              </div>
            </div>

            {/* Right Sliders and Projections Column */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-6">
              
              {/* Sliders Area */}
              <div className="space-y-4">
                {/* Capital Required */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-mono font-bold">
                    <span>CAPITAL SOLICITADO:</span>
                    <span className="text-amber-400 text-sm">US$ {pitchCapital.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="25000"
                    value={pitchCapital}
                    onChange={(e) => setPitchCapital(Number(e.target.value))}
                    className="w-full h-1 bg-slate-850 rounded accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>US$ 50k</span>
                    <span>US$ 500k</span>
                    <span>US$ 1M</span>
                  </div>
                </div>

                {/* Equity Offered */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-mono font-bold">
                    <span>EQUIDAD OFRECIDA:</span>
                    <span className="text-amber-400 text-sm">{pitchEquity}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    step="1"
                    value={pitchEquity}
                    onChange={(e) => setPitchEquity(Number(e.target.value))}
                    className="w-full h-1 bg-slate-850 rounded accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>5% (Ángel)</span>
                    <span>20% (Pre-Seed)</span>
                    <span>35% (Ronda Máxima)</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Math Badges */}
              <div className="bg-slate-900/80 border border-slate-850 rounded-xl p-4 divide-y divide-slate-800 space-y-3.5">
                
                {/* Post Money & Pre Money Valuation */}
                <div className="grid grid-cols-2 gap-4 pb-1">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Valuación Post-Money</span>
                    <span className="text-base font-black text-white font-mono">US$ {postMoneyValuation.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Valuación Pre-Money</span>
                    <span className="text-base font-black text-indigo-400 font-mono">US$ {preMoneyValuation.toLocaleString()}</span>
                  </div>
                </div>

                {/* Project Growth Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-3 pb-1">
                  <div>
                    <span className="text-[10px] text-emerald-400/90 font-bold uppercase tracking-wider block">Escala de Autores Captados</span>
                    <span className="text-sm font-bold text-white font-mono">~ {potentialWritersReached.toLocaleString()} escritores</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400/90 font-bold uppercase tracking-wider block">ARR Proyectado Año 1</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">US$ {projectedRevenueYear1.toLocaleString()}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* INTERACTIVE INVESTOR PARTNERSHIP & LEAD CAPTURE FUNNEL CONTAINER */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          
          {/* Left Column: Form Info / Trust Pilot mock reviews */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-500 font-mono block uppercase tracking-wider">REGISTRO DE COHORTE EXCLUSIVA</span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Formulario de Propuesta de Partnership o Early Access
              </h3>
              <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
                ¿Eres inversor buscando la próxima revolución del SaaS creativo, una editorial buscando automatizar la maquetación de tu catálogo o un autor buscando lanzar su próximo bestseller? Registra tu interés de forma segura. Los datos serán codificados en el entorno Google para su posterior seguimiento directo.
              </p>
            </div>

            {/* Testimonials */}
            <div className="bg-slate-900/50 border border-slate-900 p-5 rounded-2xl space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "DIAGRAMMERS nos ahorró más del 80% en costes externos de diseño para nuestro catálogo de novela histórica. Es el Vellum asesino que el mercado hispanohablante necesitaba con urgencia."
              </p>
              <div className="flex items-center gap-2.5 text-[10px] font-bold font-mono text-slate-400">
                <span>RESEÑA VERIFICADA</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span className="text-slate-300">Beatriz Ortega, Directora en Ágora Libros</span>
              </div>
            </div>

            {/* Secure leads counter block */}
            <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase block">
                Últimas Aplicaciones Registradas (Simuladas en Memoria)
              </span>
              <div className="space-y-1.5">
                {securedLeads.map((sec, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[10.5px] font-mono text-slate-400 bg-slate-900/40 p-2 rounded border border-slate-850">
                    <span className="text-slate-200">{sec.name}</span>
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.2 rounded uppercase font-bold">
                      {sec.type === "investor" ? "Inversor" : sec.type === "publisher" ? "Editorial" : "Escritor"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High Fidelity Form Capture */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
            {formStatus === "success" ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/5">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-white uppercase tracking-wider font-mono">✓ Aplicación Registrada y Encriptada</h4>
                  <p className="text-xs text-slate-350 leading-relaxed max-w-sm mx-auto">
                    Los datos han sido pre-almacenados de forma simulada en memoria. Para enlazar estos leads permanentemente con tu base de datos de Google Cloud en producción, por favor activa la conexión en la barra de Google Cloud de arriba.
                  </p>
                </div>
                <div className="w-full text-left bg-slate-950 p-3 rounded-lg border border-slate-850/60 text-[10px] font-mono text-slate-400 space-y-1">
                  <div>TRANSMIT_UID: {Math.random().toString(36).substring(7).toUpperCase()}</div>
                  <div>SECURE_LOCK: SHA-256 / AES</div>
                  <div>STATUS: PENDING_GOOGLE_CLOUD_SYNC</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest font-mono border-b pb-2 border-slate-800 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>Iniciar Aplicación Segura</span>
                  </h4>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] uppercase font-bold text-slate-400 block font-mono">Nombre Completo / Firma:</label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-500/80 transition-all font-mono"
                      placeholder="Ej. Manuel de Falla"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] uppercase font-bold text-slate-400 block font-mono">Correo Electrónico Directo:</label>
                    <input
                      type="email"
                      required
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-500/80 transition-all font-mono"
                      placeholder="Ej. manuel@falla-inversiones.com"
                    />
                  </div>

                  {/* Type Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] uppercase font-bold text-slate-400 block font-mono">¿Qué Perfil Te Describe Mejor?:</label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value as any)}
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="investor">Inversor / Venture Capital (Ronda Pre-Seed)</option>
                      <option value="publisher">Editorial / Corporación Literaria (B2B)</option>
                      <option value="writer">Escritor Autopublicado (Early Access)</option>
                    </select>
                  </div>

                  {/* Text Message Field */}
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] uppercase font-bold text-slate-400 block font-mono">Mensaje o Propuesta Comercial:</label>
                    <textarea
                      value={leadMessage}
                      onChange={(e) => setLeadMessage(e.target.value)}
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-500/80 transition-all h-20 resize-none"
                      placeholder="Me interesa participar en la ronda..."
                    ></textarea>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 mt-4">
                  <button
                    type="submit"
                    disabled={formStatus === "encrypting"}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
                  >
                    {formStatus === "encrypting" ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        <span>Encriptando y Transmitiendo...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Enviar Aplicación Segura</span>
                      </>
                    )}
                  </button>
                  <p className="text-[9px] text-slate-500 font-mono text-center mt-2">
                    ✓ Transmisión protegida de extremo a extremo
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>
          </>
        )}
      </main>

      {/* COMPACT CINEMATIC FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-12 mt-20 relative z-10 text-center space-y-6">
        <div className="flex flex-col items-center justify-center">
          <HostiaSoftFullLogo className="w-full max-w-md transform hover:scale-[1.01] transition-transform duration-300" glow={true} />
        </div>

        {/* Social Media Links for @hostiasoft */}
        <div className="flex flex-wrap justify-center items-center gap-6 pt-2">
          <a 
            href="https://instagram.com/hostiasoft" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 text-xs text-slate-450 hover:text-cyan-400 hover:scale-105 transition-all font-mono tracking-wider"
          >
            <Instagram className="w-4 h-4 text-slate-450 hover:text-cyan-400" />
            <span>INSTAGRAM</span>
          </a>
          <a 
            href="https://facebook.com/hostiasoft" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 text-xs text-slate-450 hover:text-fuchsia-400 hover:scale-105 transition-all font-mono tracking-wider"
          >
            <Facebook className="w-4 h-4 text-slate-450 hover:text-fuchsia-400" />
            <span>FACEBOOK</span>
          </a>
          <a 
            href="https://linkedin.com/company/hostiasoft" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 text-xs text-slate-450 hover:text-orange-450 hover:scale-105 transition-all font-mono tracking-wider"
          >
            <Linkedin className="w-4 h-4 text-slate-450 hover:text-orange-450" />
            <span>LINKEDIN</span>
          </a>
        </div>

        <p className="text-[10px] text-slate-500 font-mono leading-relaxed max-w-md mx-auto px-4">
          Plataforma de alta fidelidad para el formateo y preservación literaria. Cobertura bajo el Convenio de Berna de propiedad intelectual.
        </p>
        <div className="text-[9px] text-slate-600 font-mono">
          © 2026 HOSTIA SOFT Press Group • Softwares democráticos para cambiar el mundo.
        </div>
      </footer>

      {/* EDITORIAL SUITE LOGIN MODAL (OAUTH EXPERIENCE) */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full relative space-y-5 shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-450 hover:text-white cursor-pointer text-xs font-mono border border-slate-850 hover:border-slate-750 bg-slate-950 p-1.5 px-2.5 rounded-lg transition-all"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-[9px] font-mono font-bold text-amber-400 tracking-wider">
                <Lock className="w-3 h-3" /> INTELIGENCIA EDITORIAL COMPAGINADA B2B
              </span>
              <h4 className="text-xl font-bold text-white tracking-tight pt-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Acceder a mi Suite Editorial
              </h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                Identifícate de forma segura para sincronizar tus Drivers y acceder al pool de obras.
              </p>
            </div>

            {loginStatus === "verifying" ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-amber-500/10 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-mono font-bold text-amber-400 animate-pulse">VERIFICANDO CREDENCIALES SUITE...</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                    Sincronizando token corporativo...<br />
                    Túnel OAuth de base de datos cifrado activo
                  </p>
                </div>
              </div>
            ) : loginStatus === "success" ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-bounce">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono font-bold text-emerald-400">ACCESO AUTORIZADO</p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Cargando Suite Editorial para {loginName}
                  </p>
                </div>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoginStatus("verifying");
                  setTimeout(() => {
                    setLoginStatus("success");
                    setTimeout(() => {
                      setShowLoginModal(false);
                      onNavigateToStudio({ 
                        email: loginEmail, 
                        name: loginName, 
                        workspace: loginWorkspace 
                      });
                      setLoginStatus("idle");
                    }, 1000);
                  }, 1500);
                }} 
                className="space-y-4 text-left"
              >
                {/* Email (Prefilled) */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Correo de Empresa:</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-500/80 transition-all font-mono"
                    placeholder="correo@editorial.com"
                  />
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Nombre de Usuario / Firma:</label>
                  <input
                    type="text"
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-500/80 transition-all font-mono"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Suite Workspace Preset selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Workspace Suite Asignado:</label>
                  <select
                    value={loginWorkspace}
                    onChange={(e) => setLoginWorkspace(e.target.value)}
                    className="w-full text-[11.5px] bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Sindicato de Editores Independientes">Sindicato de Editores Independientes (Madrid)</option>
                    <option value="Editorial Minerva Press">Editorial Minerva Press (Latam Hub)</option>
                    <option value="Barcelona Book Group B2B">Barcelona Book Group B2B</option>
                    <option value="Autor Élite Premium Direct">Autor Élite Premium Direct</option>
                  </select>
                </div>

                {/* Password Mock */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Clave de Acceso:</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-500/80 transition-all font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-100"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Conectar y Cargar Suite</span>
                  </button>
                  <span className="text-[8px] font-mono text-slate-500 block text-center mt-2 uppercase tracking-wider">
                    Powered by Firebase Auth & Google Workspace OAuth
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
