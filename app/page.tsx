"use client";

import { useState } from 'react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message || '¡Te uniste a nuestra lista de espera! :)');
        setMessageType('success');
        setEmail(''); 
        setTimeout(() => {
          setMessage('');
          setMessageType(null);
        }
        , 5000);
      } else {
        setMessage(data.error || 'Ocurrió un error al procesar tu solicitud');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center">
      <header className="w-full max-w-5xl mx-auto px-4 py-10 text-center flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-4">
          Tus materias aprobadas. Acá.
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-8">
          Descubrí cómo la <strong>metodología Leitner</strong> potencia tu memoria
          y te ayuda a obtener los <span className="underline decoration-blue-500">mejores resultados</span> de
          estudio <b>jugando</b>.<br></br>
          <b><span className="text-teal-800">Rápido, fácil e intuitivo.</span></b>
        </p>
      </header>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-5 w-full max-w-md bg-gray-800 rounded-lg p-3">
        <input
          type="email"
          placeholder="tumejormail@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:w-auto flex-grow px-4 py-2 rounded-lg bg-gray-900 text-white outline-none border border-gray-700 focus:border-gray-500"
          required
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-white text-black font-medium hover:bg-gray-300 transition-colors px-4 py-2 rounded-lg disabled:opacity-70"
        >
          {isLoading ? "Enviando..." : "Join waitlist"}
        </button>
      </form>
      
      {message && (
        <div className={`mt-2 text-sm ${messageType === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </div>
      )}

      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded text-center">
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">+10,000</h3>
            <p className="text-gray-300">Tarjetas completadas</p>
          </div>
          <div className="bg-gray-800 p-6 rounded text-center">
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">85%</h3>
            <p className="text-gray-300">Retención promedio</p>
          </div>
          <div className="bg-gray-800 p-6 rounded text-center">
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">500,000</h3>
            <p className="text-gray-300">Minutos de estudio ahorrados</p>
          </div>
        </div>
      </section>
    </div>
  );
}
