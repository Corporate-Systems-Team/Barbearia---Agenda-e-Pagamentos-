// frontend/src/components/Hero.jsx

import { Header } from "./Header"; // Importa o Header que sabemos que funciona
import { MapPin, MessagesSquare, Phone } from "lucide-react"; // Importa os ícones

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
       
        <source src="/barber-video.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      <div className="relative z-20 h-full flex flex-col justify-between text-white">
        {/* O Header (que não tem mais 'absolute') */}
        <Header />

        {/* As Informações de Contato na Base */}
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-yellow-400" />
              <span>@barberflow_insta</span>
            </div>

            <div className="flex items-center gap-2 text-lg italic">
              <MessagesSquare className="w-5 h-5 text-yellow-400" />
              <span>"Onde o estilo encontra a precisão."</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <span>Rua das Tesouras, 123 - Centro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
