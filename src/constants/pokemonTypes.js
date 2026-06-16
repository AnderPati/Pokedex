export const typeList = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export const typeTranslations = {
  normal: "Normal",
  fire: "Fuego",
  water: "Agua",
  electric: "Electrico",
  grass: "Planta",
  ice: "Hielo",
  fighting: "Lucha",
  poison: "Veneno",
  ground: "Tierra",
  flying: "Volador",
  psychic: "Psiquico",
  bug: "Bicho",
  rock: "Roca",
  ghost: "Fantasma",
  dragon: "Dragon",
  dark: "Siniestro",
  steel: "Acero",
  fairy: "Hada",
};

export const effectivenessLabels = {
  4: "Super debil a",
  2: "Debil a",
  1: "Dano normal",
  0.5: "Resistente a",
  0.25: "Superresistente a",
  0: "Inmune a",
};

export const effectivenessLabelOrder = [4, 2, 1, 0.5, 0.25, 0];

export const typeColors = {
  normal: "bg-[#9ea09e]",
  fire: "bg-[#e72324]",
  water: "bg-[#2481f0]",
  electric: "bg-[#fac100]",
  grass: "bg-[#3ca024]",
  ice: "bg-[#3dd8fe]",
  fighting: "bg-[#ff8100]",
  poison: "bg-[#923fcc]",
  ground: "bg-[#92501b]",
  flying: "bg-[#82baf0]",
  psychic: "bg-[#ef3f7a]",
  bug: "bg-[#91a112]",
  rock: "bg-[#b0ab82]",
  ghost: "bg-[#6f3f70]",
  dragon: "bg-[#4f60e2]",
  dark: "bg-[#4d3e3b]",
  steel: "bg-[#60a2b9]",
  fairy: "bg-[#e96eea]",
};

export const getTypeColor = (type) => typeColors[type] || "bg-gray-300";
