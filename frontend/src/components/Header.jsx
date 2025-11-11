// frontend/src/components/Header.jsx

import { Scissors, Instagram, Facebook } from "lucide-react";

export function Header() {
  return (
    // Classe 'absolute' removida para consertar a sobreposição
    <header className="w-full">
      <div className="container mx-auto flex justify-between items-center p-6">
        {/* Lado Esquerdo: Logo e Nome */}
        <a href="/" className="flex items-center gap-2">
          <Scissors className="w-8 h-8 text-yellow-400" />
          <span className="text-2xl font-bold tracking-tight text-white">
            BarberFlow
          </span>
        </a>

        {/* Lado Direito: Ícones e Botão de Agendar */}
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="httpsa://instagram.com"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a
                href="/agendamento"
                className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition-colors"
              >
                Agendar Horário
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
