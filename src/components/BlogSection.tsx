import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  Search, 
  Tag, 
  Calendar, 
  Clock, 
  Heart, 
  Bookmark, 
  Share2, 
  ArrowLeft, 
  Sparkles, 
  TrendingUp, 
  Book, 
  Send, 
  Check, 
  ExternalLink,
  ChevronRight,
  Filter,
  BookmarkCheck,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string[]; // HTML-like or clean markdown blocks
  tag: string;
  tags: string[];
  readTime: string;
  date: string;
  author: string;
  likes: number;
  slug: string;
  featured?: boolean;
}

interface BlogSectionProps {
  language: "es" | "en" | "pt" | "fr" | "it" | "de";
  showToast: (message: string, type?: "info" | "success" | "warning") => void;
}

export function BlogSection({ language, showToast }: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("todos");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Local state for interactive likes and bookmarked articles
  const [claps, setClaps] = useState<Record<string, number>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [emailNewsletter, setEmailNewsletter] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Load claps and bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const storedClaps = localStorage.getItem("diag_blog_claps");
      const storedBookmarks = localStorage.getItem("diag_blog_bookmarks");
      if (storedClaps) setClaps(JSON.parse(storedClaps));
      if (storedBookmarks) setBookmarks(JSON.parse(storedBookmarks));
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
  }, []);

  // Articles Database
  const articles: Article[] = [
    {
      id: "art-1",
      title: "Control de Viudas y Huérfanas: Las Reglas de Oro de la Maquetación Profesional",
      summary: "Aprende qué son las viudas, huérfanas y líneas colgadas, y cómo eliminarlas utilizando técnicas de composición avanzada sin alterar la esencia de tu manuscrito literario.",
      tag: "Diagramación",
      tags: ["Diagramación", "Autores", "Diseño Editorial"],
      readTime: "6 min",
      date: "24 de Junio, 2026",
      author: "Comité de Composición Hostia Soft",
      likes: 148,
      slug: "control-viudas-huerfanas-maquetacion",
      featured: true,
      content: [
        "<h2>¿Qué son exactamente las Viudas y las Huérfanas?</h2><p>En el diseño editorial profesional, la tipografía es un arte invisible. Cuando un lector lee tu libro, no debe distraerse con saltos de página incómodos u hojas semivacías. Dos de los peores errores estéticos que gritan 'autoedición amateur' son las <strong>líneas viudas</strong> y las <strong>líneas huérfanas</strong>.</p>",
        "<ul><li><strong>Línea Huérfana (Orphan):</strong> Es la primera línea de un párrafo nuevo que se queda sola en el extremo inferior de una página, mientras que el resto del párrafo continúa en la página siguiente.</li><li><strong>Línea Viuda (Widow):</strong> Es la última línea de un párrafo largo que queda sola al principio de una página nueva, separada de todo el bloque anterior.</li></ul>",
        "<h2>¿Por qué son tan perjudiciales para la experiencia de lectura?</h2><p>El cerebro humano prefiere la simetría y el ritmo continuo. Al tropezar con una línea aislada de pocas palabras al principio o final de una página, se interrumpe la inercia visual, causando fatiga y desinterés. Las grandes editoriales de Nueva York o París no permiten una sola viuda o huérfana en sus ediciones impresas. Si deseas que tu obra compita de igual a igual en Amazon, tú tampoco debes permitirlas.</p>",
        "<h2>Métodos Profesionales para Solucionar este Dilema</h2><p>Para corregir estos problemas sin alterar drásticamente la extensión del libro, los diseñadores de oficio aplican varias técnicas quirúrgicas:</p><ol><li><strong>Micro-tracking selectivo:</strong> Ajustar sutilmente el espacio entre letras (tracking) en un rango imperceptible de -5 a +5 milésimas de em. Esto puede hacer que un párrafo gane o pierda una línea entera de forma limpia.</li><li><strong>Edición mínima de texto:</strong> Encontrar adjetivos redundantes o añadir una pequeña palabra descriptiva para estirar o encoger la frase final.</li><li><strong>Opciones de separación de párrafos (Keep Options):</strong> Reglas que fuerzan a que al menos dos líneas de un párrafo siempre viajen juntas a la siguiente página.</li></ol>",
        "<h2>La Automatización Inteligente con DIAGRAMMERS Studio</h2><p>Tradicionalmente, resolver esto en Adobe InDesign requería horas de inspección manual página por página. En <strong>DIAGRAMMERS Studio</strong>, el motor analiza en tiempo real la altura exacta de la caja de composición, detecta huérfanas o viudas al instante y te sugiere micro-ajustes interactivos con un solo clic. Maquetación perfecta, en minutos.</p>"
      ]
    },
    {
      id: "art-2",
      title: "Tipografías que Enamoran: Cómo Seleccionar y Emparejar Fuentes para tu Libro",
      summary: "La elección tipográfica define el alma de tu obra literaria. Descubre cómo combinar fuentes Sans-Serif y Serif para garantizar una lectura cómoda que retenga al lector por horas.",
      tag: "Diagramación",
      tags: ["Diagramación", "Tipografía", "Estética"],
      readTime: "5 min",
      date: "20 de Junio, 2026",
      author: "Comité de Composición Hostia Soft",
      likes: 112,
      slug: "tipografias-enamoran-emparejar-fuentes",
      content: [
        "<h2>El Alma del Texto: ¿Serif o Sans-Serif?</h2><p>La tipografía es la voz de tu texto en el papel. Para libros de lectura continua (como novelas, biografías o ensayos), la regla de oro indiscutible es utilizar fuentes <strong>Serif (con remates)</strong> para el cuerpo del texto. Los remates guían el flujo de la vista a lo largo de la línea horizontal de lectura, reduciendo significativamente la fatiga visual.</p>",
        "<p>Por el contrario, las fuentes <strong>Sans-Serif (de palo seco)</strong> como Inter o Space Grotesk son perfectas para títulos de capítulos, encabezados, sub-bloques y metadatos, ya que brindan un fuerte contraste y un aire moderno y técnico.</p>",
        "<h2>Garamond, Sabon y Caslon: Los Clásicos de Oro</h2><p>Si no sabes por dónde empezar, aquí tienes las tres tipografías literarias más aclamadas de la historia de la impresión:</p><ul><li><strong>EB Garamond:</strong> Elegante, con gran presencia histórica, es el estándar para la ficción y poesía. Sus formas orgánicas facilitan lecturas de cientos de páginas.</li><li><strong>Sabon:</strong> Diseñada por Jan Tschichold, es una fuente compacta extremadamente legible, ideal para novelas densas y ensayos científicos.</li><li><strong>Adobe Caslon Pro:</strong> De origen inglés, es robusta, honesta y sumamente equilibrada en papel color crema o ahuesado.</li></ul>",
        "<h2>La Fórmula del Interlineado y Tamaño Perfecto</h2><p>Un error clásico es usar el tamaño predeterminado de Word (12pt con interlineado simple o 1.5). Para libros impresos estándar (de 5.5\" x 8.5\" o 6\" x 9\"), las proporciones recomendadas son:</p><ul><li><strong>Tamaño de cuerpo:</strong> Entre 10pt y 11.5pt según la fuente.</li><li><strong>Interlineado (Leading):</strong> Un 135% a 145% del tamaño de la fuente (por ejemplo, fuente de 11pt con un interlineado de 15pt o 16pt).</li><li><strong>Márgenes externos:</strong> Espacios amplios que dejen respirar el pulgar del lector al sostener el volumen.</li></ul>",
        "<p>Con DIAGRAMMERS, tienes pre-cargados emparejamientos tipográficos curados inspirados en los mejores best-sellers de Amazon. Elige la vibra de tu obra (clásica, contemporánea, vanguardista) y la app aplicará las proporciones áureas automáticamente.</p>"
      ]
    },
    {
      id: "art-3",
      title: "Secretos de la Ficha Técnica Perfecta en Amazon KDP: Palabras Clave y Categorías Ocultas",
      summary: "Entrar en las listas de Best Sellers requiere más que escribir bien. Conoce la estrategia científica para posicionar tu libro en categorías rentables y menos competitivas de Amazon.",
      tag: "Amazon KDP",
      tags: ["Amazon KDP", "Publicación", "Ventas"],
      readTime: "8 min",
      date: "18 de Junio, 2026",
      author: "Mentoría de Lanzamientos DIAGRAMMERS",
      likes: 215,
      slug: "secretos-ficha-tecnica-amazon-kdp",
      featured: true,
      content: [
        "<h2>Las 7 Palabras Clave Secretas: No Desperdicies tu Oportunidad</h2><p>Cuando subes tu manuscrito a la consola de Amazon KDP, el sistema te otorga 7 casillas en blanco para escribir tus palabras clave de búsqueda. La mayoría de los autores novatos cometen el error de rellenarlas con términos genéricos como 'novela', 'amor' o 'libro'. Esto es un suicidio comercial, ya que competirás contra millones de obras establecidas.</p>",
        "<p>La estrategia ganadora radica en usar <strong>frases clave de cola larga (long-tail keywords)</strong>. En lugar de 'fantasía', usa 'novela fantasia oscura juvenil' o 'libros de aventura con magia en español'. Analiza qué escribe tu lector ideal en la barra de búsqueda de Amazon e insértalo exactamente en esas casillas.</p>",
        "<h2>Dominando los Nodos de Navegación (Categorías Ocultas)</h2><p>Al configurar el libro, KDP te permite seleccionar dos categorías principales. Lo que muchos autores desconocen es que Amazon tiene <strong>miles de subcategorías específicas y nicho</strong> que no aparecen en el menú interactivo estándar.</p>",
        "<p>Si clasificas tu libro de finanzas bajo la subcategoría general 'Negocios', nunca destacarás. Pero si logras clasificarlo bajo 'Finanzas Personales para Jóvenes' o 'Planificación Presupuestaria Familiar', con solo vender 5 o 10 copias al día podrás lucir el codiciado listón naranja de <strong>#1 Best Seller</strong> de Amazon, lo cual disparará tus ventas orgánicas por el efecto de validación social.</p>",
        "<h2>Cómo Solicitar Categorías Adicionales de Forma Gratuita</h2><p>Una vez que tu libro esté publicado en preventa o activo, ve al centro de soporte de Amazon KDP y envía un correo con el asunto 'Actualizar Categorías'. Bríndales el ASIN de tu obra y solicítales amablemente que te añadan hasta a 10 categorías específicas, especificando la ruta completa del nodo de navegación (por ejemplo: <i>Tienda Kindle > eBooks Kindle > Economía y empresa > Finanzas personales</i>). Amazon suele procesar esto en menos de 24 horas.</p>"
      ]
    },
    {
      id: "art-4",
      title: "Márgenes y Sangrías en KDP: Cómo Evitar el Frustrante Rechazo del Visualizador",
      summary: "El 80% de los rechazos de manuscritos en Amazon se deben a una mala configuración de sangrías (bleed) y márgenes de lomo (gutter). Te enseñamos el cálculo milimétrico exacto.",
      tag: "Amazon KDP",
      tags: ["Amazon KDP", "Formateo", "Imprenta"],
      readTime: "7 min",
      date: "15 de Junio, 2026",
      author: "Soporte Editorial DIAGRAMMERS",
      likes: 164,
      slug: "margenes-sangrias-kdp-evitar-rechazo",
      content: [
        "<h2>El Dolor de Cabeza de los Autores en Amazon</h2><p>No hay nada más frustrante que pasar meses escribiendo un libro, exportarlo con ilusión a PDF, subirlo a Amazon KDP y toparse con el temido mensaje de error en rojo: <i>'El archivo no cumple con las dimensiones requeridas'</i> o ver que las letras se meten dentro del lomo en el visualizador interactivo.</p>",
        "<p>Este problema técnico se divide en dos conceptos cruciales: el <strong>Márgen de Lomo (Gutter / Inside Margin)</strong> y la <strong>Sangría (Bleed)</strong>.</p>",
        "<h2>¿Cuándo Elegir 'Con Sangría' (Bleed) vs 'Sin Sangría'?</h2><p>La regla es simple:</p><ul><li><strong>Sin Sangría (No Bleed):</strong> Elige esto si tu libro es de texto puro (novelas, poemarios) donde no hay ninguna imagen, línea o fondo de color que toque el borde físico de la página.</li><li><strong>Con Sangría (Bleed):</strong> Obligatorio si tienes imágenes, ilustraciones, diagramas o sombreados decorativos que deben extenderse hasta el mismo filo de la hoja recortada. Al seleccionar esto, tu PDF debe medir exactamente <strong>0.125 pulgadas (3.2 mm) adicionales</strong> de ancho y <strong>0.25 pulgadas (6.4 mm) adicionales</strong> de alto en total para permitir el margen de error de la guillotina de imprenta.</li></ul>",
        "<h2>La Tabla Definitiva del Margen Interno (Gutter)</h2><p>A medida que tu libro tiene más páginas, el lomo físico se vuelve más grueso, lo que significa que el papel se curvará hacia adentro al abrir el volumen. Si no dejas suficiente margen interno, el lector tendrá que forzar el libro con ambas manos para leer el principio de cada línea.</p>",
        "<p>Aquí tienes la tabla matemática oficial recomendada para KDP en blanco y negro:</p><ul><li><strong>24 a 150 páginas:</strong> Margen interno mínimo de 0.375 pulgadas (9.6 mm).</li><li><strong>151 a 300 páginas:</strong> Margen interno mínimo de 0.500 pulgadas (12.7 mm).</li><li><strong>301 a 500 páginas:</strong> Margen interno mínimo de 0.625 pulgadas (15.9 mm).</li><li><strong>501 a 700 páginas:</strong> Margen interno mínimo de 0.750 pulgadas (19.1 mm).</li></ul>",
        "<p>En <strong>DIAGRAMMERS Studio</strong>, no necesitas calcular nada de esto a mano. Al ingresar el número estimado de páginas y seleccionar el tamaño de recorte (Trim Size), nuestra app auto-configura el lomo, el sangrado y los márgenes de seguridad exactos requeridos por Amazon, asegurando una subida exitosa al primer intento.</p>"
      ]
    },
    {
      id: "art-5",
      title: "El Trinomio de Oro del Marketing de Libros: Meta Ads, Google Search y Amazon KDP",
      summary: "Descubre cómo orquestar anuncios de Meta (impulso visual), búsquedas de Google (intención de compra directa) y la plataforma de Amazon para crear un imán de ventas de libros imparable.",
      tag: "Marketing",
      tags: ["Marketing", "Ventas", "Google Ads", "Meta Ads"],
      readTime: "10 min",
      date: "12 de Junio, 2026",
      author: "Estrategia Digital Hostia Soft",
      likes: 289,
      slug: "trinomio-oro-marketing-libros-meta-google",
      featured: true,
      content: [
        "<h2>El Error del Enfoque Unidimensional</h2><p>Muchos escritores creen que hacer marketing de un libro consiste en subir tweets diciendo '¡Compra mi libro!' o invertir algunos dólares esporádicos en Amazon Ads. Esto arroja un retorno de inversión (ROI) negativo en la mayoría de los casos. Las ventas consistentes y masivas ocurren cuando combinas la fuerza de las tres plataformas publicitarias más potentes del mundo.</p>",
        "<h2>Pilar 1: Meta Ads (Facebook & Instagram) para Capturar la Curiosidad Visual</h2><p>Meta es excelente para el marketing de 'interrupción'. Las personas están en Instagram viendo fotos de sus amigos; no están buscando comprar libros. Sin embargo, si les muestras un anuncio con un diseño estético impecable de tu portada, una cita literaria impactante en formato video (Reels) y un gancho de intriga irresistible, despertarás su curiosidad y los harás dar clic.</p>",
        "<h2>Pilar 2: Google Ads (Search) para Capturar la Intención Directa</h2><p>A diferencia de Meta, en Google la gente tiene una <strong>intención activa</strong> de resolver algo. Si alguien escribe 'mejor libro de finanzas personales para emprender' o 'novela de misterio recomendada en español', ese usuario ya tiene la tarjeta en la mano dispuesto a comprar. Al posicionar un anuncio de búsqueda patrocinado para esas palabras clave específicas, captas al comprador más calificado posible.</p>",
        "<h2>Pilar 3: Amazon Ads para Ganar la Batalla en el Punto de Venta</h2><p>Una vez que el usuario ha visto tu libro en Meta o Google, buscará tu nombre o el título en Amazon. Es crucial que estés posicionado patrocinando tu propio nombre y los nombres de libros competidores. Así evitas que otras editoriales te roben la venta en la misma ficha de producto.</p>",
        "<h2>La Estrategia de Presupuesto Tripartito Recomendada</h2><p>Para un lanzamiento exitoso, distribuye tu presupuesto diario de marketing de la siguiente forma:</p><ul><li><strong>60% Meta Ads:</strong> Enfocado en campañas de tráfico y conversión hacia tu página de puente o preventa, utilizando creatividades en video de alta calidad.</li><li><strong>25% Google Ads:</strong> Campañas de búsqueda hiper-segmentadas a nichos específicos de interés literario.</li><li><strong>15% Amazon Ads:</strong> Campañas de segmentación por producto (targeting product) para aparecer debajo de los best-sellers consolidados de tu mismo género literario.</li></ul>"
      ]
    },
    {
      id: "art-6",
      title: "Domina el Píxel de Meta para Retargeting Editorial: Atrapa a tus Lectores Ideales",
      summary: "Dejar que los visitantes de tu sitio web se vayan sin comprar es perder dinero. Aprende a instalar el píxel de Meta para rastrear lectores interesados y lanzarles campañas de retargeting irresistible.",
      tag: "Marketing",
      tags: ["Marketing", "Meta Ads", "Retargeting", "Pixel"],
      readTime: "9 min",
      date: "8 de Junio, 2026",
      author: "Estrategia Digital Hostia Soft",
      likes: 197,
      slug: "domina-pixel-meta-retargeting-editorial",
      content: [
        "<h2>¿Por qué enviar tráfico directo a Amazon es un error de novato?</h2><p>Cuando pagas por anuncios en Facebook o Instagram e insertas el enlace directo de tu libro de Amazon, estás regalando tus datos. No tienes forma de saber quién dio clic, cuántos abandonaron el carrito, ni puedes volver a contactar (hacer retargeting) a los que mostraron interés pero no compraron en ese instante.</p>",
        "<p>La solución inteligente es utilizar una <strong>Página Puente (Bridge Landing Page)</strong> intermedia, la cual controlas tú. Esta página debe ser ultrarrápida, mostrar el diseño de tu libro, un capítulo de muestra gratis descargable y un botón grande que diga 'Comprar en Amazon'.</p>",
        "<h2>El Rol del Píxel de Meta en tu Página Puente</h2><p>El Píxel de Meta es un fragmento de código invisible que insertas en tu página puente. Registra dos eventos esenciales:</p><ol><li><strong>PageView:</strong> Alguien visitó la página de tu libro (demostró interés básico).</li><li><strong>Lead / ClickBuy:</strong> Alguien hizo clic en el botón de ir a comprar a Amazon (demostró una intención de compra altísima).</li></ol>",
        "<h2>La Magia de la Campaña de Retargeting (Seguimiento Continuo)</h2><p>Con estos datos recolectados, puedes crear una audiencia en el Administrador de Anuncios de Meta de 'Personas que visitaron mi página puente en los últimos 30 días pero NO hicieron clic en el botón de comprar'.</p>",
        "<p>A este grupo específico de personas (que ya te conocen y se interesaron) les mostrarás un anuncio de retargeting con ganchos persuasivos alternativos:</p><ul><li><strong>Prueba Social:</strong> Un carrusel con capturas de pantalla de reseñas reales de 5 estrellas de lectores fascinados con tu obra.</li><li><strong>Garantía de Valor:</strong> Un video tuyo, como autor, hablándoles de frente sobre qué inspiró la obra y qué aprenderán o sentirán al leerla.</li><li><strong>Oferta de Tiempo Limitado:</strong> Un anuncio avisando que el eBook estará a solo US$0.99 por las próximas 48 horas.</li></ul>",
        "<p>El costo por adquisición de un cliente en retargeting es hasta un <strong>80% más barato</strong> que el tráfico frío inicial. Es el secreto mejor guardado de las agencias de marketing literario de primer nivel.</p>"
      ]
    }
  ];

  // Unique tags for filter tabs
  const allTags = ["todos", "Diagramación", "Amazon KDP", "Marketing"];

  // Filter articles based on search and selected tag
  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesTag = selectedTag === "todos" || article.tag === selectedTag;
    
    return matchesSearch && matchesTag;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentLikes = claps[id] || 0;
    // Limit to maximum of 50 claps per user to keep it realistic and fun
    if (currentLikes >= 50) {
      showToast("¡Has alcanzado el límite de 50 aplausos para este artículo!", "info");
      return;
    }
    
    const updatedClaps = {
      ...claps,
      [id]: currentLikes + 1
    };
    setClaps(updatedClaps);
    localStorage.setItem("diag_blog_claps", JSON.stringify(updatedClaps));
    showToast(`¡Has aplaudido este artículo! (${currentLikes + 1}/50)`, "success");
  };

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedBookmarks = {
      ...bookmarks,
      [id]: !bookmarks[id]
    };
    setBookmarks(updatedBookmarks);
    localStorage.setItem("diag_blog_bookmarks", JSON.stringify(updatedBookmarks));
    
    if (updatedBookmarks[id]) {
      showToast("Artículo guardado en tus favoritos.", "success");
    } else {
      showToast("Artículo eliminado de tus favoritos.", "info");
    }
  };

  const handleShare = (article: Article, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      // Fallback paste link copy
      const dummyUrl = `${window.location.origin}/blog/${article.slug}`;
      navigator.clipboard.writeText(dummyUrl);
      showToast("¡Enlace de artículo copiado al portapapeles con éxito!", "success");
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailNewsletter.trim()) return;
    setNewsletterSubscribed(true);
    showToast("¡Te has suscrito con éxito al boletín editorial de DIAGRAMMERS!", "success");
    setEmailNewsletter("");
  };

  const featuredArticle = articles.find(a => a.featured);

  return (
    <div id="blog-panel" className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-10 animate-fade-in text-slate-100">
      
      {/* Blog Hero Intro Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-4 max-w-2xl relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-purple-300 font-mono tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            BLOG EDITORIAL & ESTRATEGIA DE LANZAMIENTOS
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Aprende a Diseñar, <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Publicar y Vender</span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Tu guía de cabecera con artículos técnicos redactados por expertos en composición literaria, marketing digital tridimensional y optimización algorítmica de Amazon KDP. El conocimiento de las grandes agencias a tu alcance.
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center p-5 bg-slate-950/70 border border-slate-800/80 rounded-2xl w-full md:w-80 shadow-lg text-center relative z-10 shrink-0">
          <Award className="w-8 h-8 text-amber-400 mb-2" />
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono">Boletín Exclusivo</h4>
          <p className="text-[11px] text-slate-450 mt-1 mb-4 leading-normal">
            Suscríbete para recibir plantillas de InDesign gratuitas y estrategias de Meta Ads cada semana.
          </p>
          
          {newsletterSubscribed ? (
            <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl py-2 px-3 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Suscrito con Éxito</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="w-full flex gap-1">
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={emailNewsletter}
                onChange={(e) => setEmailNewsletter(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-500 transition-all font-mono"
              />
              <button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 transition-all p-2.5 rounded-lg text-white font-bold cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* SEARCH & FILTERS BAR */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar artículos o etiquetas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-500/80 transition-all font-mono"
                />
              </div>

              {/* Tag filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline" />
                {allTags.map((tg) => (
                  <button
                    key={tg}
                    onClick={() => setSelectedTag(tg)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                      selectedTag === tg
                        ? "bg-purple-500 text-white font-bold shadow-md"
                        : "text-slate-400 hover:text-slate-200 bg-slate-950/50 hover:bg-slate-850"
                    }`}
                  >
                    {tg === "todos" ? "Todos" : tg}
                  </button>
                ))}
              </div>
            </div>

            {/* FEATURED POST HERO (Only shown when no search or filter is active, and we have a featured post) */}
            {selectedTag === "todos" && searchQuery === "" && featuredArticle && (
              <div 
                onClick={() => setSelectedArticle(featuredArticle)}
                className="group relative bg-gradient-to-br from-slate-900 to-indigo-950/45 border border-slate-800 rounded-3xl overflow-hidden cursor-pointer hover:border-purple-500/45 transition-all duration-300 shadow-xl"
              >
                <div className="absolute top-3 left-3 bg-purple-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full z-10 shadow-md flex items-center gap-1 animate-pulse">
                  <Sparkles className="w-3 h-3" />
                  <span>Destacado</span>
                </div>
                
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-450 font-mono">
                    <span className="flex items-center gap-1.5 text-amber-400/90 font-bold uppercase">
                      <Tag className="w-3.5 h-3.5" />
                      {featuredArticle.tag}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredArticle.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.readTime} de lectura
                    </span>
                  </div>

                  <h3 className="text-xl md:text-3xl font-black text-white group-hover:text-purple-300 transition-colors tracking-tight leading-snug" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                    {featuredArticle.title}
                  </h3>

                  <p className="text-sm text-slate-350 leading-relaxed max-w-4xl">
                    {featuredArticle.summary}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-850">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center text-white font-black text-xs">
                        H
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-300">{featuredArticle.author}</p>
                        <p className="text-[9px] text-slate-500 font-mono uppercase">Especialista Editorial</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => handleLike(featuredArticle.id, e)}
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 font-mono transition-all bg-slate-950/60 p-2 rounded-xl border border-slate-850 hover:border-red-500/30"
                      >
                        <Heart className={`w-4 h-4 ${claps[featuredArticle.id] ? "text-red-500 fill-red-500" : ""}`} />
                        <span>{featuredArticle.likes + (claps[featuredArticle.id] || 0)}</span>
                      </button>

                      <button 
                        onClick={(e) => handleToggleBookmark(featuredArticle.id, e)}
                        className="p-2 rounded-xl text-slate-400 hover:text-amber-400 bg-slate-950/60 border border-slate-850 hover:border-amber-500/30 transition-all"
                        title="Guardar artículo"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarks[featuredArticle.id] ? "text-amber-400 fill-amber-400" : ""}`} />
                      </button>

                      <button 
                        onClick={(e) => handleShare(featuredArticle, e)}
                        className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 bg-slate-950/60 border border-slate-850 hover:border-cyan-500/30 transition-all"
                        title="Compartir"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>

                      <span className="text-xs font-bold text-purple-400 group-hover:translate-x-1.5 transition-transform flex items-center gap-1 font-mono uppercase tracking-widest pl-2">
                        Leer <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ARTICLES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => {
                  const hasLikes = claps[article.id] || 0;
                  const isBookmarked = bookmarks[article.id] || false;
                  
                  return (
                    <motion.div
                      layout
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="group bg-slate-900/40 border border-slate-850 hover:border-purple-500/30 rounded-2xl overflow-hidden cursor-pointer hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-xl"
                    >
                      <div className="p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-lg">
                            {article.tag}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {article.date}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight line-clamp-2 leading-snug" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                            {article.title}
                          </h4>
                          <p className="text-[11.5px] text-slate-400 leading-relaxed line-clamp-3">
                            {article.summary}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 border-t border-slate-850/50 mt-auto flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          {article.readTime}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => handleLike(article.id, e)}
                            className="flex items-center gap-1 text-[10.5px] text-slate-400 hover:text-red-400 transition-all p-1.5 hover:bg-slate-950/60 rounded-lg"
                            title="Aplaudir artículo"
                          >
                            <Heart className={`w-3.5 h-3.5 ${hasLikes ? "text-red-500 fill-red-500" : ""}`} />
                            <span className="font-mono">{article.likes + hasLikes}</span>
                          </button>

                          <button
                            onClick={(e) => handleToggleBookmark(article.id, e)}
                            className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-950/60 rounded-lg transition-all"
                            title="Guardar"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "text-amber-400 fill-amber-400" : ""}`} />
                          </button>

                          <button
                            onClick={(e) => handleShare(article, e)}
                            className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-950/60 rounded-lg transition-all"
                            title="Compartir"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full py-12 text-center space-y-3 bg-slate-900/20 border border-dashed border-slate-850 rounded-2xl">
                  <Book className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-slate-400 text-sm font-semibold">No se encontraron artículos para tu búsqueda</p>
                  <p className="text-xs text-slate-600">Prueba con palabras como 'márgenes', 'pixel', 'viudas' o cambia de pestaña.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedTag("todos"); }} 
                    className="text-xs text-purple-400 underline font-bold mt-2"
                  >
                    Restaurar Filtros
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* DETAILED ARTICLE VIEW */
          <motion.div
            key="details"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden p-6 md:p-10 space-y-8 shadow-2xl relative"
          >
            {/* Reading progress indicator bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-950">
              <div className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 w-full rounded-r"></div>
            </div>

            <button
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-wider font-mono cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la lista de artículos</span>
            </button>

            {/* Meta header of article */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-450 font-mono">
                <span className="flex items-center gap-1.5 text-purple-400 font-bold uppercase">
                  <Tag className="w-3.5 h-3.5" />
                  {selectedArticle.tag}
                </span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedArticle.readTime} de lectura estimada
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-snug" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                {selectedArticle.title}
              </h3>

              <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-2xl border border-slate-850/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black">
                    H
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">{selectedArticle.author}</p>
                    <p className="text-[10px] text-slate-500 font-mono uppercase">Especialista Editorial Senior</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleLike(selectedArticle.id, e)}
                    className="flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer font-semibold"
                  >
                    <Heart className={`w-4 h-4 ${claps[selectedArticle.id] ? "text-red-500 fill-red-500" : ""}`} />
                    <span>Aplaudir ({selectedArticle.likes + (claps[selectedArticle.id] || 0)})</span>
                  </button>

                  <button
                    onClick={(e) => handleToggleBookmark(selectedArticle.id, e)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      bookmarks[selectedArticle.id] 
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30" 
                        : "bg-slate-950/60 text-slate-400 border-slate-850 hover:border-amber-500/30"
                    }`}
                    title="Guardar en favoritos"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    onClick={(e) => handleShare(selectedArticle, e)}
                    className="p-2.5 rounded-xl bg-slate-950/60 text-slate-400 border border-slate-850 hover:border-cyan-500/30 transition-all cursor-pointer"
                    title="Compartir enlace"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Article Content Rendered with elegant HTML-styled typography */}
            <div className="prose prose-invert max-w-none text-slate-300 space-y-6 leading-relaxed text-sm md:text-base border-t border-b border-slate-850 py-8">
              {selectedArticle.content.map((block, idx) => (
                <div 
                  key={idx} 
                  dangerouslySetInnerHTML={{ __html: block }}
                  className="space-y-3 block-styles-custom"
                />
              ))}
            </div>

            {/* Bottom Call to Action specific to coaching and DIAGRAMMERS Studio */}
            <div className="bg-gradient-to-br from-purple-950/40 via-slate-950 to-slate-950 border border-purple-500/20 p-6 md:p-8 rounded-3xl text-center space-y-5 shadow-inner">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
              <div className="space-y-2">
                <h4 className="text-lg md:text-xl font-bold text-white tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  ¿Listo para aplicar estos secretos en tu propio libro?
                </h4>
                <p className="text-xs md:text-sm text-slate-350 max-w-2xl mx-auto leading-relaxed">
                  No gastes miles de dólares contratando maquetadores gráficos lentos o batallando con las sangrías en Word. Únete al <strong>Programa de Coaching Editorial Élite</strong> y obtén tu licencia ilimitada de por vida para el nuevo <strong>DIAGRAMMERS Studio</strong>.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a
                  href="#demo-7-dias"
                  onClick={() => {
                    setSelectedArticle(null);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs md:text-sm transition-all shadow-lg hover:scale-102 flex items-center gap-2 cursor-pointer"
                  style={{ textDecoration: "none" }}
                >
                  <span>Matricularme al Curso de Compaginación (US$197)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    const el = document.getElementById("demo-7-dias");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-slate-900 hover:bg-slate-850 text-slate-300 font-semibold px-6 py-3 rounded-xl text-xs md:text-sm border border-slate-800 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Ver Calculadora de Ahorro</span>
                </button>
              </div>
            </div>

            {/* Comment Section Mock but Interactive with localStorage */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-purple-400" />
                <span>Conversación de la Comunidad (3)</span>
              </h4>
              
              <div className="space-y-3">
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">María Alejandra Torres</span>
                    <span className="text-[9px] text-slate-500 font-mono">Hace 2 días</span>
                  </div>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    ¡Excelente artículo sobre los márgenes de KDP! Pasé tres semanas rebotando el archivo de mi novela hasta que ajusté el margen de lomo con la tabla exacta. Con DIAGRAMMERS se hace automático en segundos, de verdad es una joya de herramienta.
                  </p>
                </div>

                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">Ing. Roberto G.</span>
                    <span className="text-[9px] text-slate-500 font-mono">Hace 5 días</span>
                  </div>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    La sinergia de Meta y Google es letal para vender. He implementado el sistema de la página puente para capturar el píxel de Meta y las conversiones subieron de inmediato. No regalen sus datos directamente a Amazon sin un puente intermedio. ¡Súper recomendado!
                  </p>
                </div>

                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">Dr. Fernando Ruiz</span>
                    <span className="text-[9px] text-slate-500 font-mono">Hace 1 semana</span>
                  </div>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    ¿EB Garamond es la fuente estándar? He probado varias pero EB Garamond tiene un diseño de la letra cursiva e itálica insuperable. Totalmente de acuerdo en que un interlineado generoso previene la fatiga visual. Magnífico aporte.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded CSS custom styles to handle HTML block rendering nicely */}
      <style>{`
        .block-styles-custom h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.025em;
          border-left: 3px solid #a855f7;
          padding-left: 0.75rem;
        }
        @media (min-width: 768px) {
          .block-styles-custom h2 {
            font-size: 1.5rem;
          }
        }
        .block-styles-custom p {
          color: #cbd5e1;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .block-styles-custom strong {
          color: #ffffff;
          font-weight: 700;
        }
        .block-styles-custom ul, .block-styles-custom ol {
          margin-left: 1.25rem;
          margin-bottom: 1rem;
          space-y: 0.5rem;
        }
        .block-styles-custom ul {
          list-style-type: disc;
        }
        .block-styles-custom ol {
          list-style-type: decimal;
        }
        .block-styles-custom li {
          color: #cbd5e1;
          margin-bottom: 0.5rem;
        }
        .block-styles-custom li strong {
          color: #f59e0b;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
