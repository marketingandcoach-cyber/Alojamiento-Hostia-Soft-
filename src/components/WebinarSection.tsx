import React, { useState } from "react";
import { 
  Mic, 
  Calendar, 
  Clock, 
  Sparkles, 
  Headphones, 
  Video, 
  Users, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Volume2, 
  DollarSign, 
  Bot, 
  HelpCircle, 
  Music, 
  Package,
  BookOpen,
  Award,
  Check
} from "lucide-react";

interface WebinarSectionProps {
  onShowToast?: (message: string, type?: "info" | "success" | "warning") => void;
}

export function WebinarSection({ onShowToast }: WebinarSectionProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const meetUrl = "https://meet.google.com/und-uwzu-dja";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetUrl);
    setCopiedLink(true);
    if (onShowToast) {
      onShowToast("¡Enlace de Google Meet copiado al portapapeles!", "success");
    }
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const topics = [
    {
      icon: <Headphones className="w-5 h-5 text-amber-400" />,
      title: "Producción Profesional paso a paso",
      desc: "Cómo se concibe, graba, edita y produce un audiolibro profesional listo para tiendas."
    },
    {
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      title: "Cálculo Real de Costos de Producción",
      desc: "Aprende a calcular el costo exacto según la cantidad de palabras de tu obra."
    },
    {
      icon: <Volume2 className="w-5 h-5 text-cyan-400" />,
      title: "Narración Profesional vs. Amateur",
      desc: "Las diferencias críticas en ritmo, tono, vocalización y acabado de sonido comercial."
    },
    {
      icon: <Music className="w-5 h-5 text-purple-400" />,
      title: "Música, Efectos y Voces Libres",
      desc: "Uso estratégico de ambientes, banda sonora y licencias libres de derechos."
    },
    {
      icon: <Package className="w-5 h-5 text-rose-400" />,
      title: "Formatos y Estándares de Entrega",
      desc: "Requisitos técnicos de masterización para plataformas como Audible y Spotify."
    },
    {
      icon: <Bot className="w-5 h-5 text-fuchsia-400" />,
      title: "Revolución de la IA en Audio",
      desc: "Cómo la Inteligencia Artificial está agilizando y transformando la producción sonora."
    },
    {
      icon: <Award className="w-5 h-5 text-indigo-400" />,
      title: "Monetización y Publicación",
      desc: "Estrategias de distribución directa para comercializar y rentabilizar tu audiolibro."
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-teal-400" />,
      title: "Preguntas y Respuestas en Vivo",
      desc: "Resuelve todas tus dudas e inquietudes técnicas directamente con la moderadora."
    }
  ];

  const targetAudiences = [
    "Escritores",
    "Autores independientes",
    "Editoriales",
    "Narradores",
    "Creadores de contenido",
    "Emprendedores digitales"
  ];

  return (
    <section id="webinar-audiolibros" className="relative my-12 overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 p-6 sm:p-10 shadow-2xl shadow-amber-500/10">
      {/* Background glow decorations */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-transparent blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 space-y-10">
        
        {/* HEADER BADGE & TITLE */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-mono font-extrabold uppercase tracking-widest text-amber-300 shadow-md">
            <Mic className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Webinar Gratuito en Vivo</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block ml-1" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            De las páginas a tus oídos: <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 bg-clip-text text-transparent">Producción Profesional de Audiolibros</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-350 leading-relaxed font-medium">
            ¿Has escrito un libro o estás pensando en publicarlo? El mercado de los audiolibros crece cada año y representa una oportunidad de oro para llegar a nuevos oyentes en todo el mundo. Descubre paso a paso cómo transformar tu obra en una producción sonora de calidad comercial.
          </p>
        </div>

        {/* DATE, TIME & MODERATOR HIGHLIGHT CARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
          {/* Fecha */}
          <div className="flex items-center gap-3.5 border-b md:border-b-0 md:border-r border-slate-800 pb-3 md:pb-0 md:pr-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider block">Fecha del Evento</span>
              <strong className="text-sm sm:text-base text-white font-extrabold font-mono">15 de agosto de 2026</strong>
            </div>
          </div>

          {/* Hora */}
          <div className="flex items-center gap-3.5 border-b md:border-b-0 md:border-r border-slate-800 pb-3 md:pb-0 md:pr-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider block">Hora de Inicio</span>
              <strong className="text-sm sm:text-base text-white font-extrabold font-mono">4:00 p. m.</strong>
            </div>
          </div>

          {/* Moderadora */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Video className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider block">Moderadora del Evento</span>
              <strong className="text-sm sm:text-base text-white font-extrabold block">Ruth García</strong>
              <span className="text-[11px] text-purple-300 block font-mono">Productora Audiovisual • MM Studio IA</span>
            </div>
          </div>
        </div>

        {/* WHAT YOU WILL LEARN GRID */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold text-white font-mono uppercase tracking-wider flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>¿Qué aprenderás en este webinar?</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-amber-500/30 p-4 rounded-2xl transition-all duration-200 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-950 w-fit border border-slate-800">
                    {item.icon}
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TARGET AUDIENCE & CTA BOX */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/40 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
          
          <div className="space-y-3 text-center sm:text-left">
            <h4 className="text-xs uppercase font-mono font-bold text-amber-400 tracking-widest flex items-center justify-center sm:justify-start gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Este evento está especialmente dirigido a:</span>
            </h4>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {targetAudiences.map((aud, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-xl"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {aud}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs text-amber-300 font-bold font-mono uppercase tracking-wider block">
                📌 Lugar Garantizado • Asistencia Gratuita
              </span>
              <p className="text-xs text-slate-350">
                Si quieres que tu historia también pueda escucharse, acompáñanos en vivo y resuelve todas tus dudas.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto justify-center">
              <a
                href={meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-400 hover:via-rose-400 hover:to-amber-550 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-100 flex items-center justify-center gap-2 cursor-pointer no-underline"
              >
                <span>Reserva tu lugar en Google Meet</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white font-bold p-3 rounded-2xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Copiar enlace directo de Google Meet"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span className="hidden md:inline">{copiedLink ? "Copiado" : "Copiar Enlace"}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
