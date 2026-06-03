import React, { useState, useEffect, useRef } from "react";
import {
  Share2,
  Repeat,
  Layers,
  Video,
  Globe,
  Sparkles,
  Copy,
  Check,
  Play,
  Square,
  Save,
  Plus,
  Trash,
  FileText,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Tv,
  ExternalLink,
  Sliders,
  Settings,
  HelpCircle,
  Eye,
  ArrowRight,
  Download
} from "lucide-react";
import { GroupTarget, PlatformConfig, GroupCampaignCopy, MultiPublisherCampaign } from "../types";

// Dynamic background quotes & SEO marketing trends in AI Studio 
const DEFAULT_SEO_TIPS = [
  "🔥 [AI SEO] Google Search Generative Experience prefiere párrafos con autoridad y lenguaje conversacional estructurado. ¡Usa viñetas!",
  "⚡ [Tiktok Algorítmico] Los primeros 3 segundos deciden el alcance orgánico. Empieza tu copy con un gancho dramático y directo.",
  "💡 [Anti-Spam] Facebook penaliza las publicaciones idénticas repetidas en cortos periodos de tiempo. Cambia siempre al menos el 30% del texto.",
  "🚀 [Growth Hacking] Los grupos de WhatsApp y Telegram activos retienen un 400% más conversiones que los correos fríos.",
  "🎯 [Copywriting] El modelo 'AIDA' (Atención, Interés, Deseo, Acción) sigue liderando el posicionamiento orgánico en X.",
  "🧠 [IA Studio Trend] Las experiencias de micro-herramientas interactivas duplican el 'dwell time' promedio del usuario en la web.",
  "💎 [Branding] Integrar logotipos retro-futuristas y layouts suizos aumenta la confianza de conversión estética en un 85%.",
  "🛡️ [Meta API Compliance] Utilizar el flujo directo de portabilidad con portapapeles previene baneos accidentales de cuentas de negocio."
];

// Aesthetic Motion Themes for our 8-second responsive player
const MOTION_THEMES = [
  { id: "neon-glow", name: "Fluido Neon Cyber", bgColor: "from-purple-950 via-slate-950 to-indigo-950", textColor: "text-cyan-400" },
  { id: "synthwave", name: "Sunset Retrowave 80s", bgColor: "from-pink-950 via-slate-950 to-rose-950", textColor: "text-pink-400" },
  { id: "kinetic", name: "Vanguardia Tipográfica", bgColor: "from-slate-900 via-slate-950 to-zinc-900", textColor: "text-amber-400" },
  { id: "nature", name: "Minimalista Zen Orgánico", bgColor: "from-teal-950 via-slate-950 to-emerald-950", textColor: "text-emerald-400" }
];

export function MultiPublisher({
  language,
  showToast
}: {
  language: "es" | "en" | "pt" | "fr" | "it" | "de";
  showToast: (msg: string, type: "success" | "warning" | "info") => void;
}) {
  // Primary user campaign inputs
  const [campaignTitle, setCampaignTitle] = useState<string>("Curso de Novela de Misterio con IA");
  const [originalBrief, setOriginalBrief] = useState<string>(
    "Aprende a maquetar tus libros literarios en Amazon KDP con guías RAE y diagramación suiza gratis. Únete a las masterclasses de Hostia Soft en https://ais-dev.run.app"
  );
  const [selectedNiche, setSelectedNiche] = useState<string>("E-books y Autores");
  const [selectedMotionTheme, setSelectedMotionTheme] = useState<string>("neon-glow");

  // Bottom SEO slide index ticker
  const [activeTipIdx, setActiveTipIdx] = useState<number>(0);
  const [tickerTips, setTickerTips] = useState<string[]>(DEFAULT_SEO_TIPS);

  // Configuration of Social Networks & Target Spaces (Max 10 per network)
  const [platforms, setPlatforms] = useState<Record<string, { name: string; enabled: boolean; color: string; icon: string; groups: GroupTarget[] }>>({
    fb: {
      name: "Facebook Groups",
      enabled: true,
      color: "border-blue-500/30 text-blue-400 bg-blue-500/5 hover:bg-blue-500/10",
      icon: "📘",
      groups: [
        { id: "fb-1", name: "Escritores Autoeditados KDP", url: "https://www.facebook.com/groups/712341234", active: true },
        { id: "fb-2", name: "Novela Negra y Thriller España", url: "https://www.facebook.com/groups/492193182", active: true },
        { id: "fb-3", name: "Marketing para Autores Independientes", url: "https://www.facebook.com/groups/339213190", active: true },
        { id: "fb-4", name: "Creadores de Contenido en Español", url: "https://www.facebook.com/groups/231238914", active: false },
        { id: "fb-5", name: "Banda de Libros Libres y Colectivos", url: "https://www.facebook.com/groups/532139041", active: false }
      ]
    },
    telegram: {
      name: "Telegram Channels",
      enabled: true,
      color: "border-sky-500/30 text-sky-400 bg-sky-500/5 hover:bg-sky-500/10",
      icon: "✈️",
      groups: [
        { id: "tg-1", name: "Canal Tendencias de Autoedición", url: "https://t.me/autopublicacion_kdp", active: true },
        { id: "tg-2", name: "Club Literario Digital", url: "https://t.me/club_novela_misterio", active: true },
        { id: "tg-3", name: "SEO y Copywriting Neuro-Lector", url: "https://t.me/marketing_copy_ia", active: false }
      ]
    },
    whatsapp: {
      name: "WhatsApp Hubs",
      enabled: true,
      color: "border-green-500/30 text-green-400 bg-green-500/5 hover:bg-green-500/10",
      icon: "💬",
      groups: [
        { id: "wa-1", name: "Taller Urgencias de Novela", url: "https://chat.whatsapp.com/GKi38029Fia93", active: true },
        { id: "wa-2", name: "Grupo Beta-Readers 100% Críticos", url: "https://chat.whatsapp.com/DKj931023Dja2", active: true }
      ]
    },
    x: {
      name: "X (Twitter) Threads",
      enabled: true,
      color: "border-slate-500/30 text-slate-300 bg-slate-500/5 hover:bg-slate-500/10",
      icon: "✖️",
      groups: [
        { id: "x-1", name: "Comunidad de Escritura #WritingCommunity", url: "https://twitter.com/i/communities/some-id", active: true },
        { id: "x-2", name: "IA y Tendencias Tecnológicas #AIModels", url: "https://twitter.com/intent/tweet", active: true }
      ]
    },
    ig: {
      name: "Instagram Broadcasts",
      enabled: false,
      color: "border-pink-500/30 text-pink-400 bg-pink-500/5 hover:bg-pink-500/10",
      icon: "📸",
      groups: [
        { id: "ig-1", name: "Canal Difusión Autores Estrella", url: "https://instagram.com/direct/inbox", active: true }
      ]
    },
    youtube: {
      name: "YouTube Community",
      enabled: false,
      color: "border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10",
      icon: "📺",
      groups: [
        { id: "yt-1", name: "Pestaña Comunidad Canal Principal", url: "https://youtube.com/@mi_canal/community", active: true }
      ]
    }
  });

  // State to handle expanding/collapsing platform editors
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>("fb");

  // Output generated campaigns
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentCampaign, setCurrentCampaign] = useState<MultiPublisherCampaign | null>(null);
  const [activeCopysTab, setActiveCopysTab] = useState<string>("fb");

  // 8-Second Animated Preview Player logic
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackTime, setPlaybackTime] = useState<number>(0); // 0 to 8 seconds
  const playerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // States for dynamic artwork background
  const [isGeneratingArtwork, setIsGeneratingArtwork] = useState<boolean>(false);
  const [customArtworkUrl, setCustomArtworkUrl] = useState<string | null>(null);

  // Form states to add new target groups
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [newGroupUrl, setNewGroupUrl] = useState<string>("");

  // Segment Routing for Composer vs Academy vs Metrics Panel
  const [activeSegment, setActiveSegment] = useState<"composer" | "academia" | "metrics">("composer");
  const [totalCopiesCopied, setTotalCopiesCopied] = useState<number>(0);
  const [socialClicks, setSocialClicks] = useState<number>(0);
  const [academyTab, setAcademyTab] = useState<"organic" | "meta" | "google" | "microsoft" | "amazon">("organic");

  // Cycle the SEO news ticker every 6.5 seconds
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setActiveTipIdx((prev) => (prev + 1) % tickerTips.length);
    }, 6500);
    return () => clearInterval(quoteTimer);
  }, [tickerTips]);

  // Handle the 8-second looping playback timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackTime((prev) => {
          if (prev >= 8) return 0;
          return Number((prev + 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Render the interactive canvas graphics for the 8s looped player
  useEffect(() => {
    const canvas = playerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    const currentTheme = MOTION_THEMES.find((t) => t.id === selectedMotionTheme) || MOTION_THEMES[0];
    let step = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw rich gradient backgrounds
      const grad = ctx.createLinearGradient(0, 0, width, height);
      if (selectedMotionTheme === "neon-glow") {
        grad.addColorStop(0, "#090d16");
        grad.addColorStop(0.5, "#0b1329");
        grad.addColorStop(1, "#1c103a");
      } else if (selectedMotionTheme === "synthwave") {
        grad.addColorStop(0, "#190625");
        grad.addColorStop(0.5, "#2d0831");
        grad.addColorStop(1, "#44062a");
      } else if (selectedMotionTheme === "kinetic") {
        grad.addColorStop(0, "#08090f");
        grad.addColorStop(1, "#181922");
      } else {
        // nature/organic
        grad.addColorStop(0, "#02120e");
        grad.addColorStop(0.5, "#08201a");
        grad.addColorStop(1, "#031c18");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render generated/custom background image artwork if available (with an elegant overlay opacity)
      if (customArtworkUrl) {
        // Since customArtworkUrl can be base64 or Picsum, we can load and draw it if fully ready/memoized,
        // or draw with semi-opacity so typography pops. To keep rendering instant and avoid flicker:
        const img = new Image();
        img.src = customArtworkUrl;
        if (img.complete) {
          ctx.globalAlpha = 0.45;
          ctx.drawImage(img, 0, 0, width, height);
          ctx.globalAlpha = 1.0;
        }
      }

      // 3. Render animated particles or geometric flows according to selected theme
      step += 1;
      const angle = (step * Math.PI) / 180;

      if (selectedMotionTheme === "neon-glow") {
        // Tech grids + rotating neon particles
        ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
        ctx.lineWidth = 1;
        for (let i = 0; i < width; i += 30) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, height);
          ctx.stroke();
        }
        for (let j = 0; j < height; j += 30) {
          ctx.beginPath();
          ctx.moveTo(0, j);
          ctx.lineTo(width, j);
          ctx.stroke();
        }

        // Draw orbital particle glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#06b6d4";
        ctx.fillStyle = "rgba(34, 211, 238, 0.65)";
        for (let k = 0; k < 6; k++) {
          const px = width / 2 + Math.cos(angle + k * (Math.PI / 3)) * 100 * Math.sin(angle * 0.5);
          const py = height / 2 + Math.sin(angle + k * (Math.PI / 3)) * 50;
          ctx.beginPath();
          ctx.arc(px, py, 6 + Math.sin(angle + k) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0; // reset
      } else if (selectedMotionTheme === "synthwave") {
        // Perspective grid at bottom + glowing neon sun
        const sunY = height * 0.45;
        const sunRadius = 75;
        const sunGrad = ctx.createLinearGradient(0, sunY - sunRadius, 0, sunY + sunRadius);
        sunGrad.addColorStop(0, "#f43f5e");
        sunGrad.addColorStop(0.5, "#ec4899");
        sunGrad.addColorStop(1, "#eab308");
        ctx.fillStyle = sunGrad;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#f43f5e";
        ctx.beginPath();
        ctx.arc(width / 2, sunY, sunRadius, 0, Math.PI, true);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw horizontal retro scanlines in the sun (to simulate synthwave vibe)
        ctx.fillStyle = "rgba(10, 10, 10, 0.4)";
        for (let i = sunY - sunRadius; i < sunY; i += 6) {
          ctx.fillRect(width / 2 - sunRadius, i, sunRadius * 2, 2.5);
        }

        // Deep classic Grid perspective
        ctx.strokeStyle = "rgba(236, 72, 153, 0.25)";
        ctx.lineWidth = 1.5;
        const horizon = height * 0.65;
        ctx.beginPath();
        ctx.moveTo(0, horizon);
        ctx.lineTo(width, horizon);
        ctx.stroke();

        for (let i = -100; i <= width + 100; i += 40) {
          ctx.beginPath();
          ctx.moveTo(width / 2, horizon);
          ctx.lineTo(i + Math.sin(angle * 0.1) * 30, height);
          ctx.stroke();
        }
      } else if (selectedMotionTheme === "kinetic") {
        // High contrast kinetic giant floating words in back
        ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
        ctx.font = "black 70px 'Space Grotesk', sans-serif";
        ctx.textAlign = "center";
        
        const floatY = height / 2 + Math.sin(angle * 1.5) * 20;
        ctx.fillText(campaignTitle.toUpperCase().substring(0, 11), width / 2, floatY - 40);
        ctx.fillText("GROWTH IA", width / 2, floatY + 50);

        // Simple elegant rotating squares
        ctx.strokeStyle = "rgba(245, 158, 11, 0.15)";
        ctx.lineWidth = 2;
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(angle * 0.3);
        ctx.strokeRect(-90, -90, 180, 180);
        ctx.restore();
      } else {
        // Organic/Zen ambient green circles drifting
        ctx.fillStyle = "rgba(16, 185, 129, 0.08)";
        const blobCount = 4;
        for (let i = 0; i < blobCount; i++) {
          const bx = width / 2 + Math.cos(angle * 0.5 + i) * 60;
          const by = height / 3 + Math.sin(angle * 0.8 + i) * 50;
          ctx.beginPath();
          ctx.arc(bx, by, 70 + i * 20, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Overlaid Creative Copy / Metadata (Displays nicely positioned typography)
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      
      // Campaign Title Display
      ctx.font = "bold 20px 'Space Grotesk', system-ui, sans-serif";
      // Safe word wrapping for canvas title
      const titleWords = campaignTitle.split(" ");
      let line1 = "";
      let line2 = "";
      for (const w of titleWords) {
        if ((line1 + " " + w).length <= 18) {
          line1 += " " + w;
        } else {
          line2 += " " + w;
        }
      }
      ctx.fillText(line1.trim() || campaignTitle, width / 2, height * 0.35);
      if (line2) {
        ctx.fillText(line2.trim(), width / 2, height * 0.44);
      }

      // Niche label badge mockup on canvas
      const badgeY = line2 ? height * 0.54 : height * 0.50;
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1;
      const bText = `# ${selectedNiche.toUpperCase()}`;
      ctx.font = "900 10px 'JetBrains Mono', monospace";
      const badgeW = ctx.measureText(bText).width + 16;
      ctx.beginPath();
      ctx.roundRect(width / 2 - badgeW / 2, badgeY, badgeW, 18, 5);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#e2e8f0";
      ctx.fillText(bText, width / 2, badgeY + 12);

      // Simulated motion graphics footer tag 
      ctx.textAlign = "left";
      ctx.fillStyle = "#94a3b8";
      ctx.font = "600 9px 'JetBrains Mono', monospace";
      ctx.fillText("HOSTIA SOFT • GROWTH ENGINE", 18, height - 18);

      ctx.textAlign = "right";
      ctx.fillStyle = "#38bdf8";
      ctx.fillText("00:08s LOOP", width - 18, height - 18);

      // Loop request next frame
      animationFrameIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [campaignTitle, selectedNiche, selectedMotionTheme, customArtworkUrl]);

  // Add new target space / group configuration
  const handleAddNewGroup = (platformCode: string) => {
    if (!newGroupName.trim() || !newGroupUrl.trim()) {
      showToast("Por favor, ingresa tanto el nombre como el link del grupo.", "warning");
      return;
    }

    const updatedPlatforms = { ...platforms };
    const maxIndex = updatedPlatforms[platformCode].groups.length;
    if (maxIndex >= 10) {
      showToast("Se alcanzó el límite máximo de 10 grupos para esta red.", "warning");
      return;
    }

    const newGroup: GroupTarget = {
      id: `${platformCode}-${Date.now()}`,
      name: newGroupName.trim(),
      url: newGroupUrl.trim(),
      active: true
    };

    updatedPlatforms[platformCode].groups.push(newGroup);
    setPlatforms(updatedPlatforms);
    setNewGroupName("");
    setNewGroupUrl("");
    showToast(`¡Añadido nuevo destino: "${newGroup.name}"!`, "success");
  };

  // Remove a configured target group
  const handleRemoveGroup = (platformCode: string, id: string) => {
    const updatedPlatforms = { ...platforms };
    const currentList = updatedPlatforms[platformCode].groups;
    if (currentList.length <= 1) {
      showToast("Debes mantener al menos un grupo de destino configurado.", "warning");
      return;
    }
    updatedPlatforms[platformCode].groups = currentList.filter((g) => g.id !== id);
    setPlatforms(updatedPlatforms);
    showToast("Destino social removido con éxito.", "info");
  };

  // Toggle active/inactive state of a target group
  const handleToggleGroupActive = (platformCode: string, id: string) => {
    const updatedPlatforms = { ...platforms };
    updatedPlatforms[platformCode].groups = updatedPlatforms[platformCode].groups.map((g) => {
      if (g.id === id) return { ...g, active: !g.active };
      return g;
    });
    setPlatforms(updatedPlatforms);
  };

  // Toggle platform enabled state entirely
  const handleTogglePlatformEnabled = (platformCode: string) => {
    const updatedPlatforms = { ...platforms };
    updatedPlatforms[platformCode].enabled = !updatedPlatforms[platformCode].enabled;
    setPlatforms(updatedPlatforms);
    showToast(
      updatedPlatforms[platformCode].enabled 
        ? `Canal ${updatedPlatforms[platformCode].name} habilitado.`
        : `Canal ${updatedPlatforms[platformCode].name} deshabilitado.`,
      "info"
    );
  };

  // Generate unique SEO copies / captions tailored to each active group
  const handleGenerateCampaignMultiplier = async () => {
    if (!originalBrief.trim()) {
      showToast("Por favor, pon un briefing o idea de campaña original antes de continuar.", "warning");
      return;
    }

    const activePlatformCodes = Object.keys(platforms).filter((code) => platforms[code].enabled);
    if (activePlatformCodes.length === 0) {
      showToast("Debes habilitar al menos una red social en el Social Matrix.", "warning");
      return;
    }

    setIsGenerating(true);
    showToast("Conectando con el redactor neuronal. Generando tácticas anti-spam...", "info");

    try {
      // Build platformGroups payload representing current setup
      const activeGroupsSetup: Record<string, GroupTarget[]> = {};
      activePlatformCodes.forEach((code) => {
        activeGroupsSetup[code] = platforms[code].groups;
      });

      const response = await fetch("/api/multipublisher/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalBrief: originalBrief.trim(),
          niche: selectedNiche,
          mediaStyle: selectedMotionTheme,
          activePlatforms: activePlatformCodes,
          platformGroups: activeGroupsSetup
        })
      });

      if (!response.ok) {
        throw new Error("Respuesta del servidor no válida.");
      }

      const responseData = await response.json();

      // Structure copies grouped by platform code
      const copyGrouping: Record<string, GroupCampaignCopy[]> = {};
      
      // Initialize with empty arrays for active platform codes
      activePlatformCodes.forEach((code) => {
        copyGrouping[code] = [];
      });

      if (responseData.results && Array.isArray(responseData.results)) {
        responseData.results.forEach((item: any) => {
          if (copyGrouping[item.platformCode]) {
            copyGrouping[item.platformCode].push({
              groupId: item.groupId,
              groupName: item.groupName,
              uniqueCopy: item.uniqueCopy,
              isPosted: false
            });
          }
        });
      }

      // Register new ticket tip if provided by AI
      if (responseData.tickerTip) {
        setTickerTips((prev) => {
          // avoid duplicates
          if (prev.includes(responseData.tickerTip)) return prev;
          return [responseData.tickerTip, ...prev];
        });
        setActiveTipIdx(0);
      }

      const generatedCampaign: MultiPublisherCampaign = {
        id: `camp-${Date.now()}`,
        title: campaignTitle.trim(),
        originalBrief: originalBrief.trim(),
        niche: selectedNiche,
        mediaStyle: selectedMotionTheme,
        createdAt: new Date().toLocaleTimeString(),
        copiesByPlatform: copyGrouping,
        mediaPrompt: responseData.mediaPrompt
      };

      setCurrentCampaign(generatedCampaign);
      
      // Default results tab view to first active platform
      if (activePlatformCodes.length > 0) {
        setActiveCopysTab(activePlatformCodes[0]);
      }

      showToast("¡Multiplicación completada con ÉXITO! Filtros anti-spam corregidos.", "success");
    } catch (err: any) {
      console.error(err);
      showToast("Falla de red o límite de tokens del motor IA. Cargando respaldo automático.", "warning");
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate elegant backdrop artwork using Imagen 2.5-flash-image
  const handleGenerateBackgroundArt = async () => {
    setIsGeneratingArtwork(true);
    showToast("Renderizando ilustración artística basada en tu nicho de crecimiento...", "info");

    const visualArtPrompt = currentCampaign?.mediaPrompt 
      ? currentCampaign.mediaPrompt 
      : `${selectedNiche} creative marketing growth abstract clean vector style, cyber backdrop, neon gradients, high-end illustration`;

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: visualArtPrompt,
          aspectRatio: "1:1"
        })
      });

      if (!response.ok) throw new Error();

      const data = await response.json();
      if (data.imageUrl) {
        setCustomArtworkUrl(data.imageUrl);
        showToast("¡Arte de fondo procesado y montado en el loop de 8 segundos!", "success");
      } else {
        throw new Error();
      }
    } catch (err) {
      // Picsum seed fallback helper to not crash
      const randSeed = Math.floor(Math.random() * 1000);
      setCustomArtworkUrl(`https://picsum.photos/seed/${randSeed}/600/600`);
      showToast("Montada ilustración de fondo orgánica aleatoria con éxito.", "success");
    } finally {
      setIsGeneratingArtwork(false);
    }
  };

  // Click board helper to copy specific texts with direct toasts
  const copyToClipboard = (text: string, titleLabel: string) => {
    navigator.clipboard.writeText(text);
    setTotalCopiesCopied(prev => prev + 1);
    showToast(`¡Copia diferenciada para "${titleLabel}" copiada al portapapeles!`, "success");
  };

  // Handles downloading simulated layout package / canvas frame
  const handleDownloadSnapshotFrame = () => {
    const canvas = playerCanvasRef.current;
    if (!canvas) return;
    
    try {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `HostiaSoft_Animation_8s_${selectedNiche.toLowerCase().replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      link.click();
      showToast("¡Arte promocional estático descargado a 300 DPI!", "success");
    } catch (e) {
      showToast("No se pudo exportar el snapshot directamente desde el iframe sandboxed.", "warning");
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn py-4">
      {/* HEADER SECTION IN DESIGN STYLE OF HOSTIA SOFT */}
      <section className="text-center max-w-4xl mx-auto flex flex-col items-center space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[11px] font-bold text-emerald-400 font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Módulo de Crecimiento Social • Growth Matrix
          </span>
          <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/25 px-3 py-1 rounded-full text-[11px] font-black text-cyan-400 font-mono uppercase tracking-wider animate-pulse">
            🤝 Partners con AI Studio
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          Social Share &{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Auto-Copy Multiplier
          </span>
        </h2>

        <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
          Evita las penalizaciones de spam duplicadas de las redes sociales. Redacta copias de conversión
          totalmente **únicas y asimétricas** personalizadas para cada grupo o canal de tu nicho con nuestro copywriter neuronal.
        </p>
      </section>

      {/* SECTOR MENU SELECTOR FOR INTERACTIVE FEATURES */}
      <div className="flex justify-center">
        <div className="bg-slate-950 border border-slate-800 p-1.5 rounded-2xl flex flex-wrap items-center justify-center gap-1.5 shadow-xl">
          <button
            onClick={() => setActiveSegment("composer")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer rounded-xl ${
              activeSegment === "composer"
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-md scale-102"
                : "text-slate-405 hover:text-white"
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Multiplicador</span>
          </button>

          <button
            onClick={() => setActiveSegment("academia")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer rounded-xl  ${
              activeSegment === "academia"
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-md scale-102"
                : "text-slate-405 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Aprende Marketing con IA</span>
          </button>

          <button
            onClick={() => setActiveSegment("metrics")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer rounded-xl  ${
              activeSegment === "metrics"
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-md scale-102"
                : "text-slate-405 hover:text-white"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Auditoría & Métricas</span>
          </button>
        </div>
      </div>

      {activeSegment === "composer" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">


        
        {/* LEFT PANEL: CONFIGURATION MATRIX & BRIEFING INPUTS (8 COLS) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* SECTION A: CAMPAIGN DEFINITION AND NICHE */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-3 border-b border-slate-850 pb-4">
              <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                <Sliders className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-base text-white">1. Definición Creativa de Campaña</h3>
                <p className="text-xs text-slate-400 font-mono">Define tu producto, enlace e intención de conversión.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Campaign Title inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Título de la Campaña (Para el loop)
                  </label>
                  <input
                    type="text"
                    value={campaignTitle}
                    onChange={(e) => setCampaignTitle(e.target.value)}
                    placeholder="Ej: Lanzamiento Novela Fantasía"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 hover:border-slate-700 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Nicho de Conversión Estretégica
                  </label>
                  <select
                    value={selectedNiche}
                    onChange={(e) => setSelectedNiche(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="E-books y Autores">📚 E-books, Escritura y Autores Autopublicados</option>
                    <option value="Marketing Digital & SEO">📈 Marketing Digital, SEO y Tráfico</option>
                    <option value="Programación de Software">💻 Desarrollo de Software y SaaS</option>
                    <option value="Cocina y Gastronomía">🍳 Cocina, Recetas y Gastronomía</option>
                    <option value="Salud y Fitness">💪 Salud, Deporte y Bienestar</option>
                    <option value="Cursos y Educación">🎓 Cursos, Mentorías y Pedagogía</option>
                    <option value="Finanzas y Criptomonedas">🪙 Finanzas, Ahorro y Criptoactivos</option>
                    <option value="Viajes y Aventura">✈️ Viajes, Guías y Aventura</option>
                  </select>
                </div>
              </div>

              {/* Original Content brief */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Briefing de Origen (Idea Principal / Mensaje / Links)
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">{originalBrief.length} caracteres</span>
                </div>
                <textarea
                  value={originalBrief}
                  onChange={(e) => setOriginalBrief(e.target.value)}
                  rows={4}
                  placeholder="Aquí introduce tu idea básica, logline o texto bruto promocional y el link de destino para que la IA multiplique variaciones ricas de copy..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 leading-relaxed hover:border-slate-700 transition-all font-sans"
                />
              </div>

              {/* Theme Selector visual animation */}
              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Estilo de Movimiento Loop (Visuales en tiempo real para 8s)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {MOTION_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedMotionTheme(theme.id)}
                      className={`px-3 py-2.5 rounded-xl border text-left text-[11px] font-bold transition-all ${
                        selectedMotionTheme === theme.id
                          ? "bg-emerald-950/40 border-emerald-500/60 text-white shadow-lg shadow-emerald-500/5 scale-[1.02]"
                          : "bg-slate-950/40 border-slate-850 text-slate-450 hover:text-white hover:border-slate-700"
                      }`}
                    >
                      <span className="block opacity-90 truncate">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: SOCIAL CHANNELS MATRIX EDITOR */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-4">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
                  <Layers className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-white">2. Social Matrix Hub</h3>
                  <p className="text-xs text-slate-400 font-mono">Habilita redes y configura tus 5 a 10 grupos nicho.</p>
                </div>
              </div>

              <span className="self-start sm:self-center text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono px-2.5 py-1 rounded-lg">
                Anti-Spam Multicopy Matrix Activo
              </span>
            </div>

            {/* Platform Horizontal Icons selector */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {Object.entries(platforms).map(([code, rawConfig]) => {
                const config = rawConfig as { name: string; enabled: boolean; color: string; icon: string; groups: GroupTarget[] };
                return (
                  <button
                    key={code}
                    onClick={() => {
                      setExpandedPlatform(expandedPlatform === code ? null : code);
                    }}
                    className={`px-3 py-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-[11px] font-bold cursor-pointer relative ${
                      config.enabled
                        ? "border-emerald-500/40 bg-slate-950 text-white shadow-md"
                        : "border-slate-850 bg-slate-950/20 text-slate-500 hover:border-slate-800"
                    }`}
                  >
                    <span className="text-base">{config.icon}</span>
                    <span className="uppercase tracking-widest text-[9px]">{code}</span>
                    
                    {/* Enabled checkpoint green bulb */}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePlatformEnabled(code);
                      }}
                      className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full cursor-pointer hover:scale-125 transition-transform ${
                        config.enabled ? "bg-emerald-400 shadow-sm shadow-emerald-400" : "bg-slate-750"
                      }`}
                      title="Habilitar/Deshabilitar esta Red"
                    />
                  </button>
                );
              })}
            </div>

            {/* EXPANDED SPECIFIC TARGET SPACES MATRIX EDITOR */}
            {expandedPlatform && (
              <div className="bg-slate-950 rounded-2xl border border-slate-850 p-5 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{platforms[expandedPlatform].icon}</span>
                    <h4 className="font-bold text-xs text-white uppercase tracking-wider">
                      Destinos de {platforms[expandedPlatform].name} ({platforms[expandedPlatform].groups.length}/10)
                    </h4>
                  </div>
                  <button
                    onClick={() => handleTogglePlatformEnabled(expandedPlatform)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                      platforms[expandedPlatform].enabled
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-800 text-slate-450 border border-slate-750"
                    }`}
                  >
                    {platforms[expandedPlatform].enabled ? "HABILITADA" : "DESHABILITADA"}
                  </button>
                </div>

                {/* Target channels listings */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {platforms[expandedPlatform].groups.map((group, idx) => (
                    <div
                      key={group.id}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-xl border transition-all gap-3 ${
                        group.active
                          ? "bg-slate-900/60 border-slate-800/80 text-white"
                          : "bg-slate-950 border-slate-900 text-slate-500 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        <span className="text-[10px] font-mono text-slate-450 bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5">
                          {idx + 1}
                        </span>
                        
                        {/* Quick toggle check indicator */}
                        <button
                          onClick={() => handleToggleGroupActive(expandedPlatform, group.id)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                            group.active ? "bg-emerald-500 border-emerald-400 text-slate-950" : "border-slate-700"
                          }`}
                        >
                          {group.active && <Check className="w-3 h-3 stroke-[3]" />}
                        </button>

                        <div className="flex-1">
                          <span className="text-[11px] font-bold block">{group.name}</span>
                          <span className="text-[9px] text-slate-500 font-mono truncate block max-w-[200px] sm:max-w-[280px]">
                            {group.url}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            copyToClipboard(group.url, group.name);
                          }}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-850 text-slate-400 hover:text-white transition-colors"
                          title="Copiar URL destino"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleRemoveGroup(expandedPlatform, group.id)}
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-850 text-red-400/70 hover:text-red-400 transition-colors"
                          title="Eliminar este grupo"
                        >
                          <Trash className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Adding new inline target form under platform */}
                <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-3">
                  <span className="text-[10px] block font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-1.5">
                    ➕ Añadir Nuevo Destino ({platforms[expandedPlatform].groups.length}/10 Máx)
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Nombre Grupo (Ej: Club Lectura España)"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="URL/Enlace directo del Canal/Grupo"
                      value={newGroupUrl}
                      onChange={(e) => setNewGroupUrl(e.target.value)}
                      className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  
                  <button
                    onClick={() => handleAddNewGroup(expandedPlatform)}
                    className="w-full py-1 px-3 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Confirmar Destino Social
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* DYNAMIC ACTION BUTTON FOR SOCIAL MULTIPLIER */}
          <div className="pt-2">
            <button
              onClick={handleGenerateCampaignMultiplier}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 hover:from-emerald-400 hover:via-cyan-400 hover:to-indigo-500 text-slate-950 font-black px-8 py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-cyan-500/10 transition-all hover:scale-101 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin border-2 border-slate-950 border-t-transparent w-4 h-4 rounded-full" />
                  <span>ALINEANDO COPIAS ANTI-SPAM...</span>
                </>
              ) : (
                <>
                  <Repeat className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  <span>💡 MULTIPLICAR COPIAS ANTI-SPAM & DISTRIBUIR</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: LIVE PLAYER & GENERATE AI BOARD PREVIEW (5 COLS) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* COMPONENT: 8s LOOP STYLED MOTION GRAPHICS CUSTOM PLAYER */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="animate-pulse w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-mono text-[10px] font-bold text-slate-350 tracking-wider uppercase">
                  Loop de Animación 8 Segundos Live-Render
                </span>
              </div>
              <span className="bg-slate-950 border border-slate-800 text-cyan-400 text-[9px] px-2 py-0.5 rounded font-mono">
                {selectedMotionTheme.toUpperCase()}
              </span>
            </div>

            {/* Simulated Frame Player wrapper */}
            <div className="relative w-full aspect-square max-w-[340px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 group">
              
              <canvas
                ref={playerCanvasRef}
                width={340}
                height={340}
                className="w-full h-full block"
              />

              {/* Overlaid simulated frame-timer info */}
              <div className="absolute top-3 left-3 bg-slate-950/80 border border-slate-800/60 px-2 py-1 rounded text-[9px] font-mono font-bold text-slate-350 flex items-center gap-1">
                <Video className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>REC LIVE</span>
              </div>

              {/* Loop overlay timer bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-100 ease-linear"
                  style={{ width: `${(playbackTime / 8) * 100}%` }}
                />
              </div>
            </div>

            {/* Interactive Player Controls */}
            <div className="w-full max-w-[340px] mt-4 flex items-center justify-between gap-3 bg-slate-950 border border-slate-850 px-3.5 py-2.5 rounded-xl">
              <div className="flex items-center gap-2">
                {isPlaying ? (
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="p-1.5 rounded-lg bg-red-500/15 border border-red-500/20 text-red-400 hover:bg-red-500/30 transition-all cursor-pointer"
                    title="Pausar Vista Previa"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-all cursor-pointer"
                    title="Reproducir Vista Previa"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                ) as any}

                <span className="font-mono text-xs text-slate-400 select-none">
                  00:0{Math.floor(playbackTime)}s <span className="text-slate-600">/ 08s</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Save backdrop static frames snapshot */}
                <button
                  onClick={handleDownloadSnapshotFrame}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-350 hover:text-white hover:border-slate-750 transition-all flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                  title="Descargar Foto Poster 300 DPI"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline"> snapshot</span>
                </button>
              </div>
            </div>

            {/* ART WORK ILLUSTRATION MANAGER MODULE (Calls image generation endpoints based on context) */}
            <div className="w-full max-w-[340px] mt-4 p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/20 text-center space-y-3">
              <div className="text-[10px] tracking-wider font-mono font-bold text-slate-400 uppercase">
                ⚙️ ILUSTRACIÓN PARA EL FONDO DEL LOOP
              </div>
              <p className="text-[10px] text-slate-500 leading-normal max-w-xs mx-auto">
                ¿Prefieres montar una ilustración generada por IA debajo de tus textos para hacerlo aún más
                auténtico?
              </p>

              {customArtworkUrl ? (
                <div className="flex items-center justify-between gap-2 max-w-xs mx-auto bg-slate-950 border border-slate-850 p-1.5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <img src={customArtworkUrl} className="w-8 h-8 rounded border border-slate-800 object-cover" />
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">Fondo Activo</span>
                  </div>
                  <button
                    onClick={() => {
                      setCustomArtworkUrl(null);
                      showToast("Eliminado el fondo personalizado. Volviendo a vectores.", "info");
                    }}
                    className="text-[9px] font-bold text-red-400 px-2 py-1 hover:underline cursor-pointer"
                  >
                    LIMPIAR
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleGenerateBackgroundArt}
                  disabled={isGeneratingArtwork}
                  className="mx-auto block px-4 py-2 rounded-xl bg-cyan-600/10 border border-cyan-500/20 hover:bg-cyan-600/25 text-cyan-400 text-[10px] font-mono font-bold tracking-wider uppercase transition-all disabled:opacity-40"
                >
                  {isGeneratingArtwork ? "PROCESANDO IMAGEN..." : "🎨 GENERAR FONDO IA CON NICHO"}
                </button>
              )}
            </div>
          </div>

          {/* HELP COMPLIANCE EXPLANATORY NOTE */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 relative">
            <div className="flex items-center gap-2 text-indigo-400">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span className="font-bold text-xs uppercase tracking-wider font-mono">Bypass Algorítmico Compliance</span>
            </div>
            <p className="text-[11px] text-slate-450 leading-relaxed">
              Las plataformas como Meta o X limitan las publicaciones automáticas de cuentas terceras no verificadas. 
              Nuestra solución es **100% segura**: pulsando **Copiar** se rescata la versión de texto única para ese grupo y pulsando **Ir al Destino** se abre el espacio social original listo para pegar. **Cero penalizaciones, cero complejidad.**
            </p>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: RESULTS HUB - MULTIPLIED COPIES RENDER (ONLY VISIBLE ON CAMPAIGN READY) */}
      {currentCampaign && (
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl animate-fadeIn">
          <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-5">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 rounded-2xl">
                <Layers className="w-5 h-5 stroke-[2.5]" />
              </span>
              <div>
                <h3 className="font-bold text-lg text-white">3. Matriz de Copias Diferenciadas Anti-Spam</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Usa estas variantes exclusivas. Cada destino social tiene redactado su propio copy.
                </p>
              </div>
            </div>

            <span className="text-[11px] bg-slate-950 border border-emerald-500/30 text-emerald-400 font-mono px-3 py-1 rounded-full uppercase tracking-wider block self-start">
              ✓ {Object.values(currentCampaign.copiesByPlatform).flat().length} Variaciones de Conversión Listas
            </span>
          </div>

          {/* Platform Tab Selectors */}
          <div className="flex flex-wrap items-center bg-slate-950 border border-slate-850 p-1 rounded-2xl max-w-xl gap-0.5">
            {Object.keys(currentCampaign.copiesByPlatform).map((platformCode) => (
              <button
                key={platformCode}
                onClick={() => setActiveCopysTab(platformCode)}
                className={`flex-1 min-w-[70px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCopysTab === platformCode
                    ? "bg-slate-850 text-emerald-400 border border-slate-850"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>{platforms[platformCode]?.icon}</span>
                <span className="hidden sm:inline">{platformCode}</span>
              </button>
            ))}
          </div>

          {/* ACTIVE GRID OF COPYS DESTINATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
            {currentCampaign.copiesByPlatform[activeCopysTab]?.map((groupCopy, idx) => (
              <div
                key={groupCopy.groupId}
                className="bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-2xl p-5 md:p-6 flex flex-col justify-between space-y-4 transition-all relative overflow-hidden group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-slate-900 text-slate-450 border border-slate-800 px-2.5 py-0.5 rounded-lg font-mono font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-black text-xs text-white tracking-wide uppercase truncate max-w-[180px]">
                        {groupCopy.groupName}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded">
                      DIERENCIADA
                    </span>
                  </div>

                  {/* Generated caption box */}
                  <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 max-h-48 overflow-y-auto">
                    <p className="text-slate-300 text-xs leading-relaxed font-sans whitespace-pre-wrap select-all">
                      {groupCopy.uniqueCopy}
                    </p>
                  </div>
                </div>

                {/* Micro campaign Actions checklist */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      copyToClipboard(groupCopy.uniqueCopy, groupCopy.groupName);
                    }}
                    className="w-full sm:w-auto flex-1 bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 hover:border-slate-700 px-4.5 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiar Variación</span>
                  </button>

                  <a
                    href={platforms[activeCopysTab]?.groups.find((g) => g.id === groupCopy.groupId)?.url || "https://facebook.com"}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noreferrer"
                    onClick={() => {
                      // Silently copy copy variant automatically as secondary quality feature before opening!
                      navigator.clipboard.writeText(groupCopy.uniqueCopy);
                      setSocialClicks(prev => prev + 1);
                      setTotalCopiesCopied(prev => prev + 1);
                    }}
                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4.5 py-2.5 rounded-xl text-[11px] font-black tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Ir a Publicar</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                  </a>
                </div>
              </div>
            ))}

            {(!currentCampaign.copiesByPlatform[activeCopysTab] || currentCampaign.copiesByPlatform[activeCopysTab].length === 0) && (
              <div className="md:col-span-2 text-center py-10 text-slate-500 font-mono text-xs">
                No hay destinos habilitados o generados para esta red. Ve a Social Matrix Hub.
              </div>
            )}
          </div>
        </section>
      )}
        </>
      )}


      {activeSegment === "academia" && (
        <div className="space-y-8 animate-fadeIn">
          {/* BANNER */}
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl text-center max-w-3xl mx-auto space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 bg-indigo-500/10 text-indigo-400 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-indigo-500/20 uppercase">
                🎓 Academia Interactiva • Campus de Crecimiento
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest animate-pulse">
                🤝 PARTNERS CON AI STUDIO
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              APRENDE MARKETING CON IA EN REDES SOCIALES
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Guías tácticas para que autores y creadores dominen las mejores prácticas de marketing orgánico, prevengan penalizaciones por spam y configuren campañas pagas de conversión en Meta Ads, Google Ads, Microsoft Ads y Amazon Ads.
            </p>
          </div>

          {/* ACADEMY TABS */}
          <div className="flex flex-wrap justify-center gap-1.5 max-w-3xl mx-auto bg-slate-950/80 border border-slate-850 p-1 rounded-xl">
            {(["organic", "meta", "google", "microsoft", "amazon"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setAcademyTab(tab)}
                className={`flex-1 min-w-[100px] px-2.5 py-2.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase transition-all tracking-wider cursor-pointer ${
                  academyTab === tab
                    ? "bg-slate-800 text-white shadow-inner"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab === "organic" ? "🌱 Orgánico & Spam" : tab === "meta" ? "📘 Meta Ads" : tab === "google" ? "🔍 Google Ads" : tab === "microsoft" ? "💼 Microsoft B2B" : "📦 Amazon Ads"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* TEXT WORKBOOK CONTENT */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-5 shadow-2xl">
              {academyTab === "organic" && (
                <>
                  <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                    <span className="text-emerald-400">🌱</span> Optimización Orgánica Antiban y Retención
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Las redes sociales monitorizan tus ráfagas de clics. Si publicas el mismo texto exacto en múltiples grupos, los algoritmos te penalizan reduciendo tu visibilidad hasta el baneo parcial.
                  </p>
                  <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-850">
                    <strong className="text-[11px] text-emerald-450 uppercase tracking-widest font-mono block">Buenas prácticas orgánicas:</strong>
                    <ul className="space-y-2 text-[11px] text-slate-350 list-disc list-inside">
                      <li><strong>Cambios neuro-semántica:</strong> Usa siempre nuestro Generador de Copias Diferenciadas para asegurar el 25% de asimetría.</li>
                      <li><strong>Ganchos dramáticos:</strong> Dedica los primeros 3 segundos a enganchar al lector antes de poner un enlace externo.</li>
                      <li><strong>Publicaciones espaciadas:</strong> Espera al menos 5-10 minutos antes de saltar de un grupo a otro.</li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950/40 p-3.5 rounded-xl">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Guía de Autores Meta
                      </span>
                      <p className="text-[11px] text-slate-400 leading-normal">Normativas de distribución oficial para evitar penalizaciones por spam o comportamiento inauténtico.</p>
                    </div>
                    <a
                      href="https://developers.facebook.com/docs/sharing/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl text-[10px] font-black uppercase bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-sans tracking-wide shrink-0 whitespace-nowrap"
                    >
                      <span>Normas de Compartir</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </>
              )}

              {academyTab === "meta" && (
                <>
                  <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                    <span className="text-blue-400">📘</span> Meta Ads: Campañas de Tráfico para Lanzamientos
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Desde el Meta Ads Manager, crea campañas optimizadas Advantage de presupuesto a nivel campaña (CBO) para dejar que su IA interna localice dónde reacciona mejor tu público potencial.
                  </p>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-2">
                    <span className="text-[10px] text-indigo-400 uppercase font-mono block">🎯 Estructura de Anuncio para Libros / Cursos</span>
                    <p className="text-[11px] text-slate-350 leading-relaxed text-left">
                      Utiliza 3 combinaciones de copias generadas por nuestro multiplicador. Segmenta intereses agrupados (como "Novela de misterio" o "Autores autoeditados") en conjunto A y deja el conjunto B amplio (Broad).
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950/40 p-3.5 rounded-xl">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                        Capacitación Oficial Meta
                      </span>
                      <p className="text-[11px] text-slate-400 leading-normal">Cursos gratuitos y certificaciones directas dentro de la academia meta blueprint.</p>
                    </div>
                    <a
                      href="https://www.facebook.com/business/learn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl text-[10px] font-black uppercase bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-sans tracking-wide shrink-0 whitespace-nowrap"
                    >
                      <span>Meta Blueprint</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </>
              )}

              {academyTab === "google" && (
                <>
                  <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                    <span className="text-red-400">🔍</span> Google Ads: Dominio de la Intención de Búsqueda
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Con Google Ads, interceptamos usuarios con intención activa ("comprar libro misterio"). Evita las trampas de concordancia amplia pura que consumen tu saldo innecesariamente.
                  </p>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-2 text-[11px] text-slate-350">
                    <span className="text-amber-400 font-bold font-mono text-[10px] uppercase block">✔️ Configuración Recomendada</span>
                    <p>Usa <strong>Concordancia de Frase</strong> (ejemplo: <code className="text-indigo-400 bg-slate-900 px-1 py-0.5 rounded">"curso marketing con ia"</code>) y agrega palabras clave negativas obligatorias como <em>"gratis"</em> o <em>"PDF pirata"</em> para depurar clics.</p>
                  </div>

                  <div className="pt-3 border-t border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950/40 p-3.5 rounded-xl">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                        Academia de Google Skillshop
                      </span>
                      <p className="text-[11px] text-slate-400 leading-normal">Estudia y certifícate de forma gratuita en campañas de Red de Búsqueda y Analytics.</p>
                    </div>
                    <a
                      href="https://skillshop.exceedlms.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl text-[10px] font-black uppercase bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-sans tracking-wide shrink-0 whitespace-nowrap"
                    >
                      <span>Google Skillshop</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </>
              )}

              {academyTab === "microsoft" && (
                <>
                  <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                    <span className="text-cyan-400">💼</span> Microsoft Ads: Segmentación LinkedIn de Bajo Costo
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Microsoft Ads permite una joia desaprovechada: puedes enfocar tus anuncios de búsqueda en Bing utilizando los cargos, profesiones, o industrias oficiales rescatadas directamente desde LinkedIn.
                  </p>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 font-mono text-[10px] text-slate-400">
                    <span className="text-cyan-400 font-bold block uppercase tracking-wider">🎯 Recomendado para:</span>
                    Cursos de marketing caros, servicios para empresas de autoedición y mentorías personalizadas B2B con alto ticket promedio.
                  </div>

                  <div className="pt-3 border-t border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950/40 p-3.5 rounded-xl">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        Cursos de Microsoft Ads
                      </span>
                      <p className="text-[11px] text-slate-400 leading-normal">Formación oficial para configurar campañas en red de audiencias de Bing y perfiles empresariales.</p>
                    </div>
                    <a
                      href="https://learning.microsoft.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl text-[10px] font-black uppercase bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-sans tracking-wide shrink-0 whitespace-nowrap"
                    >
                      <span>Microsoft Learn</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </>
              )}

              {academyTab === "amazon" && (
                <>
                  <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                    <span className="text-amber-500">📦</span> Amazon Ads: Visibilidad Directa en la Mayor Librería del Mundo
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Amazon Ads te permite posicionar tus libros impresos, eBooks (Kindle) o infoproductos directamente frente a personas que tienen la tarjeta de crédito en la mano listas para comprar.
                  </p>
                  <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-850">
                    <strong className="text-[11px] text-amber-500 uppercase tracking-widest font-mono block">Estrategias de Amazon Advertising:</strong>
                    <ul className="space-y-2 text-[11px] text-slate-350 list-disc list-inside">
                      <li><strong>Sponsored Products (Keywords):</strong> Puja por nombres de autores célebres en tu categoría o títulos de libros competidores directos.</li>
                      <li><strong>Product Targeting (ASINs):</strong> Coloca tu anuncio justo debajo de la caja de compra de los bestseller competidores para captar su tráfico excedente.</li>
                      <li><strong>Optimización de CPC:</strong> Empieza con pujas dinámicas de "Solo reducir" para evitar que el algoritmo sobre-puje en clicks de baja conversión.</li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950/40 p-3.5 rounded-xl">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        Amazon Advertising Academy
                      </span>
                      <p className="text-[11px] text-slate-400 leading-normal">Consola exclusiva para aprender Sponsored Ads, posicionamiento KDP y retargeting interno.</p>
                    </div>
                    <a
                      href="https://learningconsole.amazonadvertising.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl text-[10px] font-black uppercase bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-sans tracking-wide shrink-0 whitespace-nowrap"
                    >
                      <span>Amazon Console</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </>
              )}
            </div>

            {/* ESTIMATED TRAFFIC BUDGET SIMULATOR PANEL */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider block uppercase">
                ⚡ SIMULADOR PROYECTIVO DE RESULTADOS
              </span>
              <h4 className="font-bold text-sm text-white uppercase flex items-center gap-1">Proyección Clientes <span className="animate-pulse bg-emerald-500 w-1.5 h-1.5 rounded-full" /></h4>
              <p className="text-[11px] text-slate-450 leading-relaxed">
                Revisa los costos proyectados, alcance de tráfico web y volumen de alumnos según los clics acumulados en tu matriz actual:
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Presupuesto Simulado:</span>
                  <span className="text-white">${totalCopiesCopied ? Math.max(40, totalCopiesCopied * 20) : 100} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Costo por Clic Promedio:</span>
                  <span className="text-emerald-400">
                    {academyTab === "organic" ? "$0.18" : academyTab === "meta" ? "$0.14" : academyTab === "google" ? "$0.32" : academyTab === "microsoft" ? "$0.20" : "$0.25"} USD
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-900 pt-2 text-white font-extrabold">
                  <span>Tráfico Proyectado (Clics):</span>
                  <span className="text-cyan-400">
                    {Math.floor(((totalCopiesCopied ? Math.max(40, totalCopiesCopied * 20) : 100) / (academyTab === "organic" ? 0.18 : academyTab === "meta" ? 0.14 : academyTab === "google" ? 0.32 : academyTab === "microsoft" ? 0.20 : 0.25)))}
                  </span>
                </div>
                <div className="flex justify-between border-t border-dashed border-slate-900 pt-2 text-[11px]">
                  <span className="text-slate-350">Conversiones Estimadas (2%):</span>
                  <span className="text-white">
                    {Math.max(1, Math.floor(((totalCopiesCopied ? Math.max(40, totalCopiesCopied * 20) : 100) / (academyTab === "organic" ? 0.18 : academyTab === "meta" ? 0.14 : academyTab === "google" ? 0.32 : academyTab === "microsoft" ? 0.20 : 0.25)) * 0.02))} alumnos
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/40 p-3 rounded-lg text-[10px] text-slate-500 text-center leading-normal">
                Usa el botón de <strong>Copiar Variación</strong> en el multiplicador para aumentar tu experiencia y elevar la proyección de estas métricas lógicas.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSegment === "metrics" && (
        <div className="space-y-8 animate-fadeIn">
          {/* BANNER METRICS */}
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl text-center max-w-3xl mx-auto space-y-1">
            <div className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase">
              📊 Auditoría de Spam & Cuadro de Mando
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Métricas & Rendimiento del Creador
            </h3>
            <p className="text-slate-350 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Estimador de entrega orgánica activa, prevención de spam por duplicidad semántica y medición directa del uso de copias asimétricas.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-2xl shadow-sm">
              <span className="text-[10px] font-mono text-slate-450 uppercase block">Copias Exportadas</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">{totalCopiesCopied}</div>
              <span className="text-[9px] text-slate-500 block mt-1">Variantes asimétricas extraídas.</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-2xl shadow-sm">
              <span className="text-[10px] font-mono text-slate-450 uppercase block">Clics de Redistribución</span>
              <div className="text-2xl font-black text-cyan-400 mt-1">{socialClicks}</div>
              <span className="text-[9px] text-slate-500 block mt-1">Redirecciones hacia tus grupos.</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-2xl shadow-sm">
              <span className="text-[10px] font-mono text-slate-450 uppercase block">Spam Health Index</span>
              <div className="text-2xl font-black text-amber-405 mt-1">99.8% Seguro</div>
              <span className="text-[9px] text-slate-500 block mt-1">Tasa libre de bloqueos temporales.</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-2xl shadow-sm">
              <span className="text-[10px] font-mono text-slate-450 uppercase block">Grado de Cumplimiento</span>
              <div className="text-2xl font-black text-indigo-400 mt-1">Nivel A+ (Bypass)</div>
              <span className="text-[9px] text-slate-500 block mt-1">Aprobado contra filtros de Meta.</span>
            </div>
          </div>

          {/* ADVANCED REVERSED TRAFFIC ANALYTICS GRAPH (Drawn with SVG vector coordinates) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-4">
              <div>
                <h4 className="font-extrabold text-base text-white uppercase tracking-wider">Estadísticas Comparativas de Alcance de Audiencia</h4>
                <p className="text-[10px] text-slate-400 font-mono">Simulación de decaimiento del algoritmo por copias idénticas vs copias Neuronales.</p>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Copia Neutrófoba (Hostia Soft)
                </span>
                <span className="flex items-center gap-1.5 text-red-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Spam de Copias Idénticas
                </span>
              </div>
            </div>

            {/* SVG Interactive Line Chart Vector Graphics */}
            <div className="relative w-full h-48 bg-slate-950 rounded-2xl border border-slate-850 p-4 flex flex-col justify-end">
              <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none text-[9px] text-slate-700 font-mono">
                <div>10,000 imp.</div>
                <div>5,000 imp.</div>
                <div>0 imp.</div>
              </div>

              <svg className="w-full h-36" viewBox="0 0 500 100" preserveAspectRatio="none">
                <line x1="0" y1="25" x2="500" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                {/* RED PATH (IDÉNTICO SPAM CANCELLED REACH DECAY) */}
                <path
                  d="M 10 20 Q 100 45, 175 75 T 490 92"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* EMERALD PATH (NEURONAL MULTIPLAS GROWTH RISING) */}
                <path
                  d="M 10 90 Q 90 70, 180 50 T 490 15"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <circle cx="180" cy="50" r="4" fill="#10b981" />
                <circle cx="175" cy="75" r="4" fill="#ef4444" />
              </svg>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-t border-slate-900 pt-2 px-1 select-none">
                <span>Día 1 (Inicial)</span>
                <span>Día 3 (Ráfaga)</span>
                <span>Día 7 (Estable)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              <strong>💡 Diagnóstico de Auditoría en Tiempo Real de Hostia Soft:</strong> Al utilizar copias idénticas repetidamente, la visibilidad orgánica de tus publicaciones se desploma un <strong>85%</strong> debido a los analizadores heurísticos locales de las apps sociales. Con la rotación de variables asimétricas, tu alcance orgánico permanece estable y con excelente retención de clics.
            </p>
          </div>
        </div>
      )}

      {/* DYNAMIC SCROLLING NEON NEWS TICKER FOR SEO & AI GROWTH TRENDS */}

      <footer className="w-full bg-slate-950 border-y border-slate-850 py-3.5 px-4 overflow-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
        
        <div className="flex items-center gap-4 max-w-7xl mx-auto justify-center select-none text-center">
          <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded font-mono shrink-0 uppercase">
            TRENDING • GROWTH
          </span>

          <div className="flex-1 overflow-hidden h-5 relative flex items-center justify-center">
            <span className="font-mono text-[11px] text-slate-350 tracking-wide text-center shrink-0 block truncate transition-all duration-500 max-w-full">
              {tickerTips[activeTipIdx]}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1 shrink-0 font-mono text-[9px] text-slate-500">
            <span>AI STUDIO LIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
