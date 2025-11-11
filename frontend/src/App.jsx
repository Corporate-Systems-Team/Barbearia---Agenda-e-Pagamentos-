import { Hero } from "./components/Hero";
import { ServiceCard } from "./components/ServiceCard";
import { Scissors } from "lucide-react";

function App() {
  return (
    <>
      <Hero />

      <section className="container mx-auto p-8 my-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Nossos Serviços
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            title="Corte Moderno"
            price="R$ 50,00"
            duration="45 min"
            imageURL="/corteModerno.jpg"
          />
          <ServiceCard
            title="Barba Terapia"
            price="R$ 40,00"
            duration="30 min"
            imageURL="/barba.jpg"
          />
          <ServiceCard
            title="Combo (Corte + Barba)"
            price="R$ 80,00"
            duration="1h 15m"
            imageURL="/pacote.jpg"
          />
        </div>
      </section>

      <section className="bg-gray-800 py-20 text-center">
        <h3 className="text-3xl text-white font-semibold mb-6">
          "Uma breve explicação e uma frase."
        </h3>
        <a href="/agendamento" className="btn-primary">
          Agendar um Horário
        </a>
      </section>

      <section className="container mx-auto p-8 my-16 text-center">
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          Por que somos a melhor escolha?
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-700 h-64 rounded-lg"></div>
          <div className="bg-gray-700 h-64 rounded-lg"></div>
        </div>
        <p className="text-2xl italic text-gray-400">
          "Uma frase mostrando que nossa barbearia é boa."
        </p>
      </section>

      <footer className="bg-gray-950 text-white p-8">
        <div className="container mx-auto flex justify-center items-center gap-2">
          <Scissors className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-bold tracking-tight">BarberFlow</span>
        </div>
      </footer>
    </>
  );
}

export default App;
