// utils/translate.js

export const getTranslatedName = async (url, lang = "es") => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const translated = data.names.find((n) => n.language.name === lang);
    return translated ? translated.name : data.name;
  } catch {
    return url; // fallback en caso de error
  }
};

const VARIANT_LABEL_OVERRIDES = {
  "lycanroc-midday": "Lycanroc Forma Diurna",
  "lycanroc-midnight": "Lycanroc Forma Nocturna",
  "lycanroc-dusk": "Lycanroc Forma Crepuscular",
  "pikachu-rock-star": "Pikachu Estrella de Rock",
  "pikachu-belle": "Pikachu Belleza",
  "pikachu-phd": "Pikachu Académico",
  "pikachu-pop-star": "Pikachu Estrella Pop",
  "pikachu-libre": "Pikachu Luchadora",
  "pikachu-cosplay": "Pikachu Cosplay",
  "pikachu-original-cap": "Pikachu con Gorra Original",
  "pikachu-hoenn-cap": "Pikachu con Gorra de Hoenn",
  "pikachu-sinnoh-cap": "Pikachu con Gorra de Sinnoh",
  "pikachu-unova-cap": "Pikachu con Gorra de Unova",
  "pikachu-kalos-cap": "Pikachu con Gorra de Kalos",
  "pikachu-alola-cap": "Pikachu con Gorra de Alola",
  "pikachu-partner-cap": "Pikachu con Gorra de Compañero",
  "pikachu-world-cap": "Pikachu con Gorra Mundial",
  "pikachu-starter": "Pikachu Inicial",
  "greninja-battle-bond": "Greninja Vinculo Batalla",
  "zygarde-10": "Zygarde Forma 10%",
  "zygarde-50": "Zygarde Forma 50%",
  "zygarde-complete": "Zygarde Forma Completa",
  "mimikyu-busted": "Mimikyu (Disfraz Roto)",
  "mimikyu-disguised": "Mimikyu (Disfrazado)",

  // Formas Megas
  "venusaur-mega": "Mega Venusaur",
  "charizard-mega-x": "Mega Charizard X",
  "charizard-mega-y": "Mega Charizard Y",
  "blastoise-mega": "Mega Blastoise",
  "beedrill-mega": "Mega Beedrill",
  "pidgeot-mega": "Mega Pidgeot",
  "alakazam-mega": "Mega Alakazam",
  "slowbro-mega": "Mega Slowbro",
  "gengar-mega": "Mega Gengar",
  "kangaskhan-mega": "Mega Kangaskhan",
  "pinsir-mega": "Mega Pinsir",
  "gyarados-mega": "Mega Gyarados",
  "aerodactyl-mega": "Mega Aerodactyl",
  "mewtwo-mega-x": "Mega Mewtwo X",
  "mewtwo-mega-y": "Mega Mewtwo Y",
  "ampharos-mega": "Mega Ampharos",
  "scizor-mega": "Mega Scizor",
  "heracross-mega": "Mega Heracross",
  "houndoom-mega": "Mega Houndoom",
  "tyranitar-mega": "Mega Tyranitar",
  "blaziken-mega": "Mega Blaziken",
  "gardevoir-mega": "Mega Gardevoir",
  "mawile-mega": "Mega Mawile",
  "aggron-mega": "Mega Aggron",
  "medicham-mega": "Mega Medicham",
  "manectric-mega": "Mega Manectric",
  "banette-mega": "Mega Banette",
  "absol-mega": "Mega Absol",
  "garchomp-mega": "Mega Garchomp",
  "lucario-mega": "Mega Lucario",
  "abomasnow-mega": "Mega Abomasnow",
  "sceptile-mega": "Mega Sceptile",
  "swampert-mega": "Mega Swampert",
  "sableye-mega": "Mega Sableye",
  "altaria-mega": "Mega Altaria",
  "gallade-mega": "Mega Gallade",
  "audino-mega": "Mega Audino",
  "sharpedo-mega": "Mega Sharpedo",
  "camerupt-mega": "Mega Camerupt",
  "glalie-mega": "Mega Glalie",
  "salamence-mega": "Mega Salamence",
  "metagross-mega": "Mega Metagross",
  "latias-mega": "Mega Latias",
  "latios-mega": "Mega Latios",
  "lopunny-mega": "Mega Lopunny",
  "diancie-mega": "Mega Diancie",
  "rayquaza-mega": "Mega Rayquaza",
  "steelix-mega": "Mega Steelix",

  // Formas de Alola
  "rattata-alola": "Rattata de Alola",
  "raticate-alola": "Raticate de Alola",
  "raichu-alola": "Raichu de Alola",
  "sandshrew-alola": "Sandshrew de Alola",
  "sandslash-alola": "Sandslash de Alola",
  "vulpix-alola": "Vulpix de Alola",
  "ninetales-alola": "Ninetales de Alola",
  "diglett-alola": "Diglett de Alola",
  "dugtrio-alola": "Dugtrio de Alola",
  "meowth-alola": "Meowth de Alola",
  "persian-alola": "Persian de Alola",
  "geodude-alola": "Geodude de Alola",
  "graveler-alola": "Graveler de Alola",
  "golem-alola": "Golem de Alola",
  "grimer-alola": "Grimer de Alola",
  "muk-alola": "Muk de Alola",
  "exeggutor-alola": "Exeggutor de Alola",
  "marowak-alola": "Marowak de Alola",

  // Formas de Galar
  "meowth-galar": "Meowth de Galar",
  "ponyta-galar": "Ponyta de Galar",
  "rapidash-galar": "Rapidash de Galar",
  "slowpoke-galar": "Slowpoke de Galar",
  "slowbro-galar": "Slowbro de Galar",
  "farfetchd-galar": "Farfetch’d de Galar",
  "weezing-galar": "Weezing de Galar",
  "mr-mime-galar": "Mr. Mime de Galar",
  "corsola-galar": "Corsola de Galar",
  "zigzagoon-galar": "Zigzagoon de Galar",
  "linoone-galar": "Linoone de Galar",
  "darumaka-galar": "Darumaka de Galar",
  "darmanitan-galar": "Darmanitan de Galar",
  "yamask-galar": "Yamask de Galar",
  "stunfisk-galar": "Stunfisk de Galar",
  "articuno-galar": "Articuno de Galar",
  "zapdos-galar": "Zapdos de Galar",
  "moltres-galar": "Moltres de Galar",
  "slowking-galar": "Slowking de Galar",

  // Formas de Hisui
  "growlithe-hisui": "Growlithe de Hisui",
  "arcanine-hisui": "Arcanine de Hisui",
  "voltorb-hisui": "Voltorb de Hisui",
  "electrode-hisui": "Electrode de Hisui",
  "typhlosion-hisui": "Typhlosion de Hisui",
  "qwilfish-hisui": "Qwilfish de Hisui",
  "sneasel-hisui": "Sneasel de Hisui",
  "samurott-hisui": "Samurott de Hisui",
  "lilligant-hisui": "Lilligant de Hisui",
  "zorua-hisui": "Zorua de Hisui",
  "zoroark-hisui": "Zoroark de Hisui",
  "braviary-hisui": "Braviary de Hisui",
  "sliggoo-hisui": "Sliggoo de Hisui",
  "goodra-hisui": "Goodra de Hisui",
  "avalugg-hisui": "Avalugg de Hisui",
  "decidueye-hisui": "Decidueye de Hisui",

  // Formas de Paldea
  "wooper-paldea": "Wooper de Paldea",
  "tauros-paldea-combat": "Tauros de Paldea (Forma Combate)",
  "tauros-paldea-blaze": "Tauros de Paldea (Forma Llama)",
  "tauros-paldea-aqua": "Tauros de Paldea (Forma Agua)",
  "palafin-zero": "Palafin forma Ingenua",
  "palafin-hero": "Palafin forma Heroica",

  // Formas de Paradoja (Pokémon Escarlata y Púrpura)
  "great-tusk": "Colmillo Férreo",
  "scream-tail": "Cola Rugido",
  "brute-bonnet": "Sombrero Férreo",
  "flutter-mane": "Melena Creciente",
  "slither-wing": "Ala Recia",
  "sandy-shocks": "Descarga Arena",
  "iron-treads": "Orugas Férreas",
  "iron-bundle": "Paquete Férreo",
  "iron-hands": "Manos Férreas",
  "iron-jugulis": "Púas Férreas",
  "iron-moth": "Moteado Férreo",
  "iron-thorns": "Espinas Férreas",
  "roaring-moon": "Luna Rugiente",
  "iron-valiant": "Valiente Férreo",

  // Formas Gigantamax
  "venusaur-gmax": "Gigamax Venusaur",
  "charizard-gmax": "Gigamax Charizard",
  "blastoise-gmax": "Gigamax Blastoise",
  "butterfree-gmax": "Gigamax Butterfree",
  "pikachu-gmax": "Gigamax Pikachu",
  "meowth-gmax": "Gigamax Meowth",
  "machamp-gmax": "Gigamax Machamp",
  "gengar-gmax": "Gigamax Gengar",
  "kingler-gmax": "Gigamax Kingler",
  "lapras-gmax": "Gigamax Lapras",
  "eevee-gmax": "Gigamax Eevee",
  "snorlax-gmax": "Gigamax Snorlax",
  "garbodor-gmax": "Gigamax Garbodor",
  "melmetal-gmax": "Gigamax Melmetal",
  "corviknight-gmax": "Gigamax Corviknight",
  "drednaw-gmax": "Gigamax Drednaw",
  "orbeetle-gmax": "Gigamax Orbeetle",
  "coalossal-gmax": "Gigamax Coalossal",
  "flapple-gmax": "Gigamax Flapple",
  "appletun-gmax": "Gigamax Appletun",
  "sandaconda-gmax": "Gigamax Sandaconda",
  "toxtricity-amped-gmax": "Gigamax Toxtricity Forma Agitada",
  "toxtricity-low-key-gmax": "Gigamax Toxtricity Forma Seria",
  "centiskorch-gmax": "Gigamax Centiskorch",
  "hatterene-gmax": "Gigamax Hatterene",
  "grimmsnarl-gmax": "Gigamax Grimmsnarl",
  "alcremie-gmax": "Gigamax Alcremie",
  "copperajah-gmax": "Gigamax Copperajah",
  "duraludon-gmax": "Gigamax Duraludon",
  "rillaboom-gmax": "Gigamax Rillaboom",
  "cinderace-gmax": "Gigamax Cinderace",
  "inteleon-gmax": "Gigamax Inteleon",
  "urshifu-single-strike-gmax": "Gigamax Urshifu Estilo Brusco",
  "urshifu-rapid-strike-gmax": "Gigamax Urshifu Estilo Fluido",

  // Formas de Vivillon
  "vivillon-archipelago": "Vivillon Archipiélago",
  "vivillon-continental": "Vivillon Continental",
  "vivillon-elegant": "Vivillon Elegante",
  "vivillon-garden": "Vivillon Jardín",
  "vivillon-high-plains": "Vivillon Altiplano",
  "vivillon-icy-snow": "Vivillon Nieve Helada",
  "vivillon-jungle": "Vivillon Jungla",
  "vivillon-marine": "Vivillon Marino",
  "vivillon-modern": "Vivillon Moderno",
  "vivillon-monsoon": "Vivillon Monzón",
  "vivillon-ocean": "Vivillon Océano",
  "vivillon-polar": "Vivillon Polar",
  "vivillon-river": "Vivillon Río",
  "vivillon-sandstorm": "Vivillon Tormenta de Arena",
  "vivillon-savanna": "Vivillon Sabana",
  "vivillon-sun": "Vivillon Sol",
  "vivillon-tundra": "Vivillon Tundra",
  "vivillon-fancy": "Vivillon Fantasía",
  "vivillon-pokeball": "Vivillon Poké Ball",

  // Formas de Flabébé, Floette y Florges
  "flabebe-blue": "Flabébé Azul",
  "flabebe-orange": "Flabébé Naranja",
  "flabebe-white": "Flabébé Blanca",
  "flabebe-yellow": "Flabébé Amarilla",
  "floette-blue": "Floette Azul",
  "floette-orange": "Floette Naranja",
  "floette-white": "Floette Blanca",
  "floette-yellow": "Floette Amarilla",
  "floette-eternal": "Floette Flor Eterna",
  "florges-blue": "Florges Azul",
  "florges-orange": "Florges Naranja",
  "florges-white": "Florges Blanca",
  "florges-yellow": "Florges Amarilla",

  // Formas de Pumpkaboo y Gourgeist
  "pumpkaboo-small": "Pumpkaboo Pequeño",
  "pumpkaboo-average": "Pumpkaboo Mediano",
  "pumpkaboo-large": "Pumpkaboo Grande",
  "pumpkaboo-super": "Pumpkaboo Enorme",
  "gourgeist-small": "Gourgeist Pequeño",
  "gourgeist-average": "Gourgeist Mediano",
  "gourgeist-large": "Gourgeist Grande",
  "gourgeist-super": "Gourgeist Enorme",

  // Formas de Alcremie
  "alcremie-vanilla-cream": "Alcremie Crema Vainilla",
  "alcremie-ruby-cream": "Alcremie Crema Rubí",
  "alcremie-matcha-cream": "Alcremie Crema Matcha",
  "alcremie-mint-cream": "Alcremie Crema Menta",
  "alcremie-lemon-cream": "Alcremie Crema Limón",
  "alcremie-salted-cream": "Alcremie Crema Salada",
  "alcremie-ruby-swirl": "Alcremie Remolino Rubí",
  "alcremie-caramel-swirl": "Alcremie Remolino Caramelo",
  "alcremie-rainbow-swirl": "Alcremie Remolino Arcoíris",

  // Formas de combate y transformaciones
  "deoxys-normal": "Deoxys Forma Normal",
  "deoxys-attack": "Deoxys Forma Ataque",
  "deoxys-defense": "Deoxys Forma Defensa",
  "deoxys-speed": "Deoxys Forma Velocidad",
  "giratina-altered": "Giratina Forma Modificada",
  "giratina-origin": "Giratina Forma Origen",
  "shaymin-land": "Shaymin Forma Tierra",
  "shaymin-sky": "Shaymin Forma Cielo",
  "darmanitan-standard": "Darmanitan Forma Estándar",
  "darmanitan-zen": "Darmanitan Modo Daruma",
  "aegislash-shield": "Aegislash Forma Escudo",
  "aegislash-blade": "Aegislash Forma Filo",
  "minior-meteor": "Minior Forma Meteorito",
  "minior-core": "Minior Núcleo",
  "wishiwashi-solo": "Wishiwashi Forma Individual",
  "wishiwashi-school": "Wishiwashi Forma Banco",
  "eiscue-ice": "Eiscue Forma Hielo",
  "eiscue-noice": "Eiscue Forma Sin Hielo",
  "morpeko-full-belly": "Morpeko Forma Saciada",
  "morpeko-hangry": "Morpeko Forma Voraz",
  "meloetta-aria": "Meloetta Forma Lírica",
  "meloetta-pirouette": "Meloetta Forma Danza",
  "ogerpon": "Ogerpon Máscara Turquesa",
  "ogerpon-wellspring-mask": "Ogerpon Máscara Fuente",
  "ogerpon-hearthflame-mask": "Ogerpon Máscara Horno",
  "ogerpon-cornerstone-mask": "Ogerpon Máscara Cimiento",
  "basculin-red-striped": "Basculin Línea Roja",
  "basculin-blue-striped": "Basculin Línea Azul",
  "basculin-white-striped": "Basculin Línea Blanca",
  "tornadus-incarnate": "Tornadus Forma Avatar",
  "tornadus-therian": "Tornadus Forma Tótem",
  "thundurus-incarnate": "Thundurus Forma Avatar",
  "thundurus-therian": "Thundurus Forma Tótem",
  "landorus-incarnate": "Landorus Forma Avatar",
  "landorus-therian": "Landorus Forma Tótem",
  "keldeo-ordinary": "Keldeo Forma Normal",
  "keldeo-resolute": "Keldeo Forma Decidida",
  "meowstic-male": "Meowstic Macho",
  "meowstic-female": "Meowstic Hembra",
  "oricorio-baile": "Oricorio Estilo Flamenco",
  "oricorio-pom-pom": "Oricorio Estilo Animado",
  "oricorio-pau": "Oricorio Estilo Plácido",
  "oricorio-sensu": "Oricorio Estilo Refinado",
  "minior-red-meteor": "Minior Meteoro Rojo",
  "minior-orange-meteor": "Minior Meteoro Naranja",
  "minior-yellow-meteor": "Minior Meteoro Amarillo",
  "minior-green-meteor": "Minior Meteoro Verde",
  "minior-blue-meteor": "Minior Meteoro Azul",
  "minior-indigo-meteor": "Minior Meteoro Índigo",
  "minior-violet-meteor": "Minior Meteoro Violeta",
  "minior-red-core": "Minior Núcleo Rojo",
  "minior-orange-core": "Minior Núcleo Naranja",
  "minior-yellow-core": "Minior Núcleo Amarillo",
  "minior-green-core": "Minior Núcleo Verde",
  "minior-blue-core": "Minior Núcleo Azul",
  "minior-indigo-core": "Minior Núcleo Índigo",
  "minior-violet-core": "Minior Núcleo Violeta",
  "toxtricity-amped": "Toxtricity Forma Agitada",
  "toxtricity-low-key": "Toxtricity Forma Seria",
  "indeedee-male": "Indeedee Macho",
  "indeedee-female": "Indeedee Hembra",
  "urshifu-single-strike": "Urshifu Estilo Brusco",
  "urshifu-rapid-strike": "Urshifu Estilo Fluido",
  "basculegion-male": "Basculegion Macho",
  "basculegion-female": "Basculegion Hembra",
  "enamorus-incarnate": "Enamorus Forma Avatar",
  "enamorus-therian": "Enamorus Forma Tótem",
  "oinkologne-male": "Oinkologne Macho",
  "oinkologne-female": "Oinkologne Hembra",
  "maushold-family-of-three": "Maushold Familia de Tres",
  "maushold-family-of-four": "Maushold Familia de Cuatro",
  "squawkabilly-green-plumage": "Squawkabilly Plumaje Verde",
  "squawkabilly-blue-plumage": "Squawkabilly Plumaje Azul",
  "squawkabilly-yellow-plumage": "Squawkabilly Plumaje Amarillo",
  "squawkabilly-white-plumage": "Squawkabilly Plumaje Blanco",
  "tatsugiri-curly": "Tatsugiri Forma Rizada",
  "tatsugiri-droopy": "Tatsugiri Forma Lánguida",
  "tatsugiri-stretchy": "Tatsugiri Forma Estirada",
  "dudunsparce-two-segment": "Dudunsparce Dos Segmentos",
  "dudunsparce-three-segment": "Dudunsparce Tres Segmentos",
  "rotom-heat": "Rotom Calor",
  "rotom-wash": "Rotom Lavado",
  "rotom-frost": "Rotom Frío",
  "rotom-fan": "Rotom Ventilador",
  "rotom-mow": "Rotom Corte",
  "castform-sunny": "Castform Forma Sol",
  "castform-rainy": "Castform Forma Lluvia",
  "castform-snowy": "Castform Forma Nieve",
  "kyurem-black": "Kyurem Forma Negra",
  "kyurem-white": "Kyurem Forma Blanca",
  "kyogre-primal": "Kyogre Forma Primigenia",
  "groudon-primal": "Groudon Forma Primigenia",
  "raticate-totem-alola": "Raticate Tótem Forma Alola",
  "gumshoos-totem": "Gumshoos Tótem",
  "vikavolt-totem": "Vikavolt Tótem",
  "wishiwashi-totem": "Wishiwashi Tótem",
  "salazzle-totem": "Salazzle Tótem",
  "lurantis-totem": "Lurantis Tótem",
  "togedemaru-totem": "Togedemaru Tótem",
  "mimikyu-totem": "Mimikyu Tótem",
  "ribombee-totem": "Ribombee Tótem",
  "araquanid-totem": "Araquanid Tótem",
  "marowak-totem": "Marowak Tótem Forma Alola",
  "kommo-o-totem": "Kommo-o Tótem",
  "mimikyu-totem-disguised": "Mimikyu Forma Enmascarada",
  "mimikyu-totem-busted": "Mimikyu Forma Rota",
  "necrozma-dusk": "Necrozma Melena Crepuscular",
  "necrozma-dawn": "Necrozma Alas del Alba",
  "necrozma-ultra": "Necrozma Ultra",
  "eevee-starter": "Eevee Inicial",
  // Variantes visuales
  "shellos-west": "Shellos Mar Oeste",
  "shellos-east": "Shellos Mar Este",
  "gastrodon-west": "Gastrodon Mar Oeste",
  "gastrodon-east": "Gastrodon Mar Este",
  "burmy-plant": "Burmy Capa Planta",
  "burmy-sandy": "Burmy Capa Arena",
  "burmy-trash": "Burmy Capa Basura",
  "wormadam-plant": "Wormadam Capa Planta",
  "wormadam-sandy": "Wormadam Capa Arena",
  "wormadam-trash": "Wormadam Capa Basura",
  "cherrim-overcast": "Cherrim Forma Nublada",
  "cherrim-sunshine": "Cherrim Forma Soleada",
  "zarude-dada": "Zarude papá",
};

export const getTranslatedPokemonName = async (nameOrId, lang = "es") => {
  try {
    // Si hay override, úsalo directamente
    if (VARIANT_LABEL_OVERRIDES[nameOrId]) {
      return VARIANT_LABEL_OVERRIDES[nameOrId];
    }

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${nameOrId}`
    );
    if (!res.ok) throw new Error("Fetch failed");
    const data = await res.json();
    const translation = data.names.find((n) => n.language.name === lang);
    return translation
      ? translation.name
      : VARIANT_LABEL_OVERRIDES[nameOrId] || nameOrId;
  } catch (err) {
    console.error(`Error traduciendo ${nameOrId}:`, err);
    return VARIANT_LABEL_OVERRIDES[nameOrId] || nameOrId;
  }
};

export const translateVariantList = async (variants, lang = "es") => {
  return await Promise.all(
    variants.map(async (name) => {
      const label = await getTranslatedPokemonName(name, lang);
      return { id: name, label };
    })
  );
};
