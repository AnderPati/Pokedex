import { motion } from "framer-motion";

export default function StatBar({ name, value }) {
  const maxStat = 255;

  const getColor = (value) => {
    if (value >= 190) return "bg-[#00c2b8]"; // azul más fuerte
    if (value >= 150) return "bg-[#14b8a6]"; // turquesa más saturado
    if (value >= 120) return "bg-[#23cd5e]"; // verde esmeralda fuerte
    if (value >= 105)  return "bg-[#82fa58]"; // lima profunda
    if (value >= 85)  return "bg-[#f4fa58]"; // amarillo fuerte dorado
    if (value >= 65)  return "bg-[#f7d358]"; 
    if (value >= 45)  return "bg-[#faac58]"; // naranja vibrante
    return "bg-[#fa5858]"; // rojo intenso                  // rojo profundo
  };

  const widthPercent = Math.max(value / 2.55, 8); // Mínimo 8% para visibilidad

  return (
    <div className="mb-1">
        <div className="sm:hidden text-sm font-semibold capitalize w-[200px] italic">{name}</div>
      <div className="flex gap-2">
        <div className="hidden sm:block text-sm font-semibold capitalize w-[200px]">{name}</div>
        <label className="w-[25px] sm:w-[40px] sm:text-right">{value}</label>
        <div className="w-full bg-gray-700 h-3 overflow-hidden rounded-full mt-[6px]">
          <motion.div
            className={`h-3 ${getColor(value)}`}
            initial={{ width: 0 }}
            animate={{ width: `${widthPercent}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
