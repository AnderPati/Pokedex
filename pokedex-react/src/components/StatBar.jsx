import { motion } from "framer-motion";

export default function StatBar({ name, value }) {
  const maxStat = 255;

  const getColor = (value) => {
    if (value >= 190) return "bg-[#00c2b8]"; // azul más fuerte
    if (value >= 150) return "bg-[#14b8a6]"; // turquesa más saturado
    if (value >= 120) return "bg-[#23cd5e]"; // verde esmeralda fuerte
    if (value >= 90)  return "bg-[#84cc16]"; // lima profunda
    if (value >= 80)  return "bg-[#ffdd57]"; // amarillo fuerte dorado
    if (value >= 60)  return "bg-[#ff7f0f]"; // naranja vibrante
    if (value >= 45)  return "bg-[#f34444]"; // rojo intenso
    return "bg-[#ba0202]";                   // rojo profundo
  };

  const widthPercent = Math.max(value / 2.55, 8); // Mínimo 8% para visibilidad

  return (
    <div className="mb-2">
      <div className="text-xs font-semibold capitalize">{name}</div>
      <div className="w-full bg-gray-200 h-3 overflow-hidden">
        <motion.div
          className={`h-3 border-r border-white ${getColor(value)}`}
          initial={{ width: 0 }}
          animate={{ width: `${widthPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
