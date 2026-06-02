export interface TextTemplate {
  name: string;
  genre: string;
  title: string;
  author: string;
  text: string;
}

export const TEXT_TEMPLATES: TextTemplate[] = [
  {
    name: "Cervantes (Clásico Novela)",
    genre: "Clásico",
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    text: `Capítulo Primero: Que trata de la condición y ejercicio del famoso hidalgo don Quijote de la Mancha

En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. El resto della concluían sayo de velarte, calzas de velludo para las fiestas, con sus pantuflos de lo mesmo, y los días de entresemana se honraba con su vellorí de lo más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años; era de complexión recia, seco de carnes, enjuto de rostro, gran madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada, o Quesada, que en esto hay alguna diferencia en los autores que deste caso escriben; aunque, por conjeturas verosímiles, se deja entender que se llamaba Quijana. Pero esto importa poco a nuestro cuento; basta que en la narración dél no se salga un punto de la verdad.

—Escucha, Sancho —le dijo don Quijote un día antes de partir—, que el camino que hemos de emprender está lleno de peligros inacabables.
—Señor —respondió el escudero con voz asustada—, ¿y no sería mejor quedarse en nuestra aldea que andar buscando pan de trastrigo por las selvas?
—No hables así, mi fiel escudero —reprendió el caballero—. La gloria aguarda a los espíritus magnánimos en la senda de los desvalidos.`
  },
  {
    name: "Fantasía Épica (Leyenda)",
    genre: "Fantasía",
    title: "El Despertar de la Runa",
    author: "B. R. Sanderson",
    text: `Capítulo Primero: El Murmullo del Acero

La lluvia golpeaba con furia las gárgolas de piedra del templo de Elidon, mientras Kaelen sostenía el viejo colgante de plata. Podía oír el eco lejano de los tambores de guerra de los orcos de colmillo gris. El aire olía a lodo, ozono y magia prohibida. Tenía poco tiempo; las sombras en el corredor se estiraban de manera antinatural.

—El portal está listo, Kaelen —susurró la sacerdotisa Lyra, su voz trémula pero cargada de resolución—. Pero una vez que cruces, el sendero arcano de la ceniza se cerrará para siempre.
Kaelen miró el abismo luminiscente ante él.
—Para siempre es un precio justo por la salvación de Aris —respondió desenvainando la espada rúnica, cuyos glifos brillaron con un fuego azul cobalto.
—¡Que los dioses antiguos guíen tu filo, hermano! —gritó ella mientras los primeros asaltantes derribaban el portón principal.`
  },
  {
    name: "Diálogo Noir (Misterio)",
    genre: "Thriller / Noir",
    title: "La Lluvia Tras la Persiana",
    author: "Ramon Chandler",
    text: `Capítulo I: Un mal día para la verdad

La oficina olía a tabaco de liar barato y al perfume rancio de la noche anterior. Un detective privado en esta ciudad no duerme, simplemente espera que el próximo cliente tenga suficiente dinero para pagar sus mentiras o suficiente cinismo para aceptar las suyas. El reloj de la pared avanzaba como un metrónomo perezoso.

—Señor Spade, usted no me conoce —dijo la mujer del impermeable húmedo—. Pero mi esposo ha desaparecido y la policía cree que está de vacaciones en Acapulco.
—La policía es optimista por naturaleza, señora —dije mientras encendía un cigarrillo—. Les gusta el sol y las playas. A mí me gusta el dinero por adelantado.
—¿Son suficientes mil dólares por semana? —preguntó deslizando un sobre crema sobre la mesa de caoba.
Lo sopesé en la mano. Se sentía pesado, como todos los secretos peligrosos.`
  }
];

export const GENRE_PRESETS = [
  { name: "Novela Histórica/Clásica", icon: "BookOpen", prompt: "Estilo clásico formal de la literatura de siglos de oro o romántica, tipo Gabriel García Márquez o Cervantes. Párrafos largos, tipografía EB Garamond idílica, papel crema cálido de alto gramaje con márgenes muy generosos para lectura descansada." },
  { name: "Fantasía y Aventuras", icon: "Sparkles", prompt: "Estilo fantástico épico medieval como Tolkien o Sanderson. Fuentes heráldicas pesadas como Cinzel para los títulos majestuosos, papel sepia místico, dinkus con estrellas brillantes y capitulares góticas u ornamentadas de un color cobrizo." },
  { name: "Misterio / Noir Digital", icon: "Search", prompt: "Estilo contemporáneo, thriller policíaco o negro. Fondo oscuro carbón satinado para lectura nocturna sin fatiga ocular, fuentes compactas, negritas fuertes y dinkus de asteriscos misteriosos con capitulares modernas y limpias libres de adornos clásicos." },
  { name: "Poesía y Prosa Moderna", icon: "Feather", prompt: "Estructuras ligeras modernas de vanguardia poética o ensayo íntimo. Títulos sans-serif modernos limpios de Outfit, márgenes exagerados, dinkus geométricos sencillos y papel blanco resplandeciente que dé una sensación de limpieza, vacío y silencio." }
];
