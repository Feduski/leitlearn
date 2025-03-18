"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { createProfile } from "../../lib/profiles";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [name, setName] = useState("")

  async function handleLogin(e:any) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.toLowerCase().includes("confirm") ||
          error.message.toLowerCase().includes("verificar")) {
          setErrorMsg("Te falta confirmar el mail de registro");
        } else if(error.message === "Invalid login credentials") {
          setErrorMsg("Email o contraseña incorrectos.");
        } else {
          setErrorMsg(error.message);
        }
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      } else {
        setSuccessMsg("¡Bienvenido!");
        setTimeout(() => {
          setSuccessMsg("");
        }
        , 1000);
        router.push("/");
      }
    } catch (err:any) {
      setErrorMsg(err.message || "Error al iniciar sesión");
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  }  

  async function handleSignUp(e:any) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
  
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
  
      if (error) {
        if (
          error.status === 409 ||
          error.message.toLowerCase().includes("already registered")
        ) {
          setErrorMsg("Usuario ya registrado, intentá loguearte.");
        } else {
          setErrorMsg(error.message);
        }
      } else if (data?.user) {
        const profileError = await createProfile(data.user.id, name);
        if (profileError) {
          setErrorMsg("Error al crear el perfil");
        } else {
          setErrorMsg("¡Registro exitoso! Revisa tu email para confirmar la cuenta.");
          setTimeout(() => setIsFlipped(false), 2000);
        }
      }
    } catch (err : any) {
      setErrorMsg(err.message || "Error en el proceso de registro");
    } finally {
      setIsLoading(false);
    }
  }
    
  const PasswordResetForm = () => {
    const [localResetEmail, setLocalResetEmail] = useState(resetEmail);
    const [localErrorMsg, setLocalErrorMsg] = useState("");
    const [localSuccessMsg, setLocalSuccessMsg] = useState("");
    const [localIsLoading, setLocalIsLoading] = useState(false);
    
    const handleLocalSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLocalIsLoading(true);
      setLocalErrorMsg("");
      setLocalSuccessMsg("");
      
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(localResetEmail, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        
        if (error) {
          setLocalErrorMsg(error.message);
          setTimeout(() => setLocalErrorMsg(""), 3000);
        } else {
          setLocalSuccessMsg("Revisá tu email para restablecer tu contraseña");
        }
      } catch (err:any) {
        setLocalErrorMsg(err.message || "Error al enviar el email de recuperación");
        setTimeout(() => setLocalErrorMsg(""), 3000);
      } finally {
        setLocalIsLoading(false);
      }
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
        <div className="bg-gray-800 p-6 rounded shadow-md max-w-md w-full">
          <h2 className="text-2xl text-white">Recuperar contraseña.</h2>
          
          {localErrorMsg && (
            <div className="bg-red-500 bg-opacity-20 text-red-300 rounded text-sm">
              {localErrorMsg}
            </div>
          )}
          
          {localSuccessMsg && (
            <div className="bg-green-500 bg-opacity-20 text-green-300 p-3 mt-3 rounded text-sm">
              {localSuccessMsg}
            </div>
          )}
          
          {!localSuccessMsg ? (
            <form onSubmit={handleLocalSubmit}>
              <p className="text-gray-300 mb-4">
                Ingresá tu email y te enviaremos un enlace para restablecer tu contraseña.
              </p>
              <input
                type="email"
                value={localResetEmail}
                onChange={(e) => setLocalResetEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                required
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={localIsLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                >
                  {localIsLoading ? "Enviando..." : "Enviar enlace"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordReset(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white p-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setShowPasswordReset(false)}
              className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white p-2 rounded"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {showPasswordReset && <PasswordResetForm />}
      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-inner">

          <div className="flip-card-front bg-gray-800 p-8 rounded shadow-md">
            <h2 className="text-2xl text-white">Iniciar sesión</h2>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 mb-4 mt-4 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full p-2 mb-1 rounded bg-gray-700 text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswordReset(true)}
                className="text-blue-400 hover:underline text-sm mb-4 block text-right w-full"
              >
                ¿Olvidaste tu contraseña?
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mb-4"
              >
                {isLoading ? "Procesando..." : "Iniciar sesión"}
              </button>
            </form>
            <p className="text-center text-gray-400">
              ¿No tenés cuenta?{" "}
              <button onClick={() => setIsFlipped(true)} className="text-blue-400 hover:underline">
                Registrate
              </button>
            </p>
          </div>
          

          <div className="flip-card-back bg-gray-800 p-8 rounded shadow-md">
            <h2 className="text-2xl text-white mb-4">Crear cuenta</h2>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <form onSubmit={handleSignUp}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                required
              />
              <input type="password" 
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
              ¿Ya tenés cuenta?{" "}
              <button onClick={() => setIsFlipped(false)} className="text-blue-400 hover:underline">
                Iniciá sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
