import { Scissors } from "lucide-react";
import "./App.css";
function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <Scissors className="w-16 h-16 text-yellow-400 mb-4" />
      <h1 className="text-4xl font-bold text-center">Bem vindo a barbearia</h1>
    </div>
  );
}

export default App;
