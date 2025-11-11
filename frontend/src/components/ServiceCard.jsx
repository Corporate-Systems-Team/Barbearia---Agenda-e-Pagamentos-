import { Clock, DollarSign } from "lucide-react";

export function ServiceCard({ title, duration, price, imageURL }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <img src={imageURL} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <div className="flex items-center justify-between text-gray-300 mb-6">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-yellow-400" />
            <span className="text-lg">{price}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-lg">{duration}</span>
          </div>
        </div>
        <a href="/agendamento" className="btn-primary w-full text-center block">
          Agendar
        </a>
      </div>
    </div>
  );
}
