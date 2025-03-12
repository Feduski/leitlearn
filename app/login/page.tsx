"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
  
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // Verificamos si el error indica que el email no ha sido confirmado
        if (error.message.toLowerCase().includes("confirm") ||
          error.message.toLowerCase().includes("verificar")) {
          setErrorMsg("Te falta confirmar el mail de registro");
        } else if(error.message === "Invalid login credentials") {
          setErrorMsg("Email o contraseña incorrectos.");
        } else {
          setErrorMsg(error.message);
        }
      } else {
        router.push("/");
      }
    } catch (err) {
      setErrorMsg(err.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  }  

  async function handleSignUp(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
  
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
  
      if (error) {
        // Manejo de error cuando el usuario ya está registrado:
        if (
          error.status === 409 ||
          error.message.toLowerCase().includes("already registered")
        ) {
          setErrorMsg("Usuario ya registrado, intentá loguearte");
        } else {
          setErrorMsg(error.message);
        }
      } else {
        setErrorMsg("¡Registro exitoso! Revisa tu email para confirmar la cuenta.");
        setTimeout(() => setIsFlipped(false), 2000);
      }
    } catch (err : any) {
      setErrorMsg(err.message || "Error en el proceso de registro");
    } finally {
      setIsLoading(false);
    }
  }
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          {/* Formulario de Login */}
          <div className="flip-card-front bg-gray-800 p-8 rounded shadow-md">
            <h2 className="text-2xl text-white mb-4">Iniciar sesión</h2>
            {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mb-4"
              >
                {isLoading ? "Procesando..." : "Iniciar sesión"}
              </button>
            </form>
            <p className="text-center text-gray-400">
              ¿No tienes cuenta?{" "}
              <button onClick={() => setIsFlipped(true)} className="text-blue-400 hover:underline">
                Regístrate
              </button>
            </p>
          </div>
          {/* Formulario de Registro */}
          <div className="flip-card-back bg-gray-800 p-8 rounded shadow-md">
            <h2 className="text-2xl text-white mb-4">Crear cuenta</h2>
            {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
            <form onSubmit={handleSignUp}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mb-4"
              >
                {isLoading ? "Procesando..." : "Registrarse"}
              </button>
            </form>
            <p className="text-center text-gray-400">
              ¿Ya tienes cuenta?{" "}
              <button onClick={() => setIsFlipped(false)} className="text-blue-400 hover:underline">
                Iniciar sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
