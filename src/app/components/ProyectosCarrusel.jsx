// src/components/ProyectosCarrusel.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProyectosCarrusel({ proyectos = [], solicitarDossier }) {
  const [indexActual, setIndexActual] = useState(0);
  const [modoDetalle, setModoDetalle] = useState(false);
  const [indiceGaleria, setIndiceGaleria] = useState(0);
  const [pausado, setPausado] = useState(false);

  if (!proyectos || proyectos.length === 0) return null;

  const projActual = proyectos[indexActual];

  // Asegurar compatibilidad si algún proyecto no tiene galería definida todavía
  const galeriaActual = projActual.galeria && projActual.galeria.length > 0 
    ? projActual.galeria 
    : [projActual.portada || projActual.imagen];

  const siguienteProyecto = () => {
    setIndexActual((prev) => (prev + 1) % proyectos.length);
    setIndiceGaleria(0); // Reiniciar galería al cambiar de proyecto
  };

  const anteriorProyecto = () => {
    setIndexActual((prev) => (prev - 1 + proyectos.length) % proyectos.length);
    setIndiceGaleria(0);
  };

  const siguienteFotoGaleria = () => {
    setIndiceGaleria((prev) => (prev + 1) % galeriaActual.length);
  };

  const anteriorFotoGaleria = () => {
    setIndiceGaleria((prev) => (prev - 1 + galeriaActual.length) % galeriaActual.length);
  };

  // AUTOPLAY: Cambia de proyecto cada 5 segundos si no estamos en modo detalle y no está pausado
  useEffect(() => {
    if (modoDetalle || pausado) return;

    const intervalo = setInterval(() => {
      siguienteProyecto();
    }, 5000); // 5000ms = 5 segundos

    return () => clearInterval(intervalo);
  }, [indexActual, modoDetalle, pausado]);

  const registrarClicWspProyecto = (nombreProyecto) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_whatsapp',
        button_location: 'carrusel_detalle',
        proyecto_interes: nombreProyecto
      });
    }
  };

  return (
    <section 
      id="proyectos" 
      className="w-full"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      
      {/* Contenedor principal sin fondo azul fijo para evitar destellos cuando cambia a detalle */}
      <div className="relative overflow-hidden w-full">
        
        <AnimatePresence mode="wait">
          {!modoDetalle ? (
            /* VISTA 1: CARRUSEL INMERSIVO A ANCHO COMPLETO (Usa Portada) con mayor altura */
            <motion.div
              key={`carrusel-${projActual.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-[700px] flex items-end p-8 sm:p-20 bg-[#06182a]"
            >
              <Image
                src={projActual.portada || projActual.imagen}
                alt={projActual.nombre}
                fill
                className="object-cover object-center"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#06182a] via-[#06182a]/50 to-black/30" />

              <div className="relative z-10 space-y-4 max-w-3xl mx-auto w-full">
                <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
                  {projActual.nombre}
                </h2>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setModoDetalle(true);
                      setIndiceGaleria(0);
                    }}
                    className="bg-[#e31c23] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-transform duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg"
                  >
                    <span>Conocé más</span>
                    <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs">›</span>
                  </button>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 rounded-full transition-all duration-500 ${
                          i < Math.round((projActual.avance / 100) * 5)
                            ? 'w-6 bg-white'
                            : 'w-2 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-extrabold text-sm tracking-wide">
                    {projActual.avance}% Avance
                  </span>
                </div>
              </div>

              <button
                onClick={siguienteProyecto}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-[#e31c23] text-white p-4 rounded-full backdrop-blur-md transition duration-300"
                aria-label="Siguiente"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={anteriorProyecto}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-[#e31c23] text-white p-4 rounded-full backdrop-blur-md transition duration-300"
                aria-label="Anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </motion.div>
          ) : (
            /* VISTA 2: DETALLE Y FICHA TÉCNICA (Fondo blanco absoluto, sin azul) */
            <motion.div
              key={`detalle-${projActual.id}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[700px] bg-white text-slate-900 overflow-hidden shadow-2xl"
            >
              {/* Columna Izquierda: Imagen de galería a altura completa de arriba a abajo */}
              <div className="lg:col-span-6 relative min-h-[400px] lg:min-h-[700px] bg-slate-900 overflow-hidden">
                <Image
                  src={galeriaActual[indiceGaleria]}
                  alt={`${projActual.nombre} - Foto ${indiceGaleria + 1}`}
                  fill
                  className="object-cover object-center w-full h-full transition-opacity duration-500"
                />

                <button
                  onClick={() => setModoDetalle(false)}
                  className="absolute top-4 left-4 z-20 bg-[#06182a]/80 hover:bg-[#e31c23] text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md transition flex items-center gap-1.5 shadow-md"
                >
                  <span>‹</span> Ver todos los proyectos
                </button>

                {/* Controles de la galería si tiene más de 1 imagen */}
                {galeriaActual.length > 1 && (
                  <>
                    <button
                      onClick={anteriorFotoGaleria}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black text-white p-2.5 rounded-full transition"
                      aria-label="Foto anterior"
                    >
                      ❮
                    </button>
                    <button
                      onClick={siguienteFotoGaleria}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black text-white p-2.5 rounded-full transition"
                      aria-label="Foto siguiente"
                    >
                      ❯
                    </button>

                    {/* Indicadores de puntos inferiores en la foto */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {galeriaActual.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setIndiceGaleria(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            indiceGaleria === idx ? 'bg-white scale-125' : 'bg-white/50'
                          }`}
                          aria-label={`Ir a foto ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Columna Derecha: Información y Ficha Técnica con fondo estrictamente blanco */}
              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6 bg-white">
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[#e31c23] text-xs font-bold uppercase tracking-widest block">
                        Ficha Técnica Oficial
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-black text-[#06182a] tracking-tight leading-tight mt-1">
                        {projActual.nombre}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full text-slate-700 text-xs font-semibold shrink-0">
                      <span className="text-[#e31c23]">📍</span>
                      <span>{projActual.ubicacion}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {projActual.desc}
                  </p>

                  <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-slate-700 text-xs leading-relaxed font-medium">
                    {projActual.detalles}
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Equipamiento & Características
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {projActual.amenities?.map((item, idx) => (
                        <span key={idx} className="bg-[#06182a] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                      Avance de obra
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#06182a] h-full rounded-full transition-all duration-500"
                          style={{ width: `${projActual.avance}%` }}
                        />
                      </div>
                      <span className="font-extrabold text-[#06182a] text-sm">{projActual.avance}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => solicitarDossier(projActual.nombre)}
                    className="bg-[#e31c23] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition text-center shadow-md"
                  >
                    Solicitar Dossier
                  </button>

                  <a
                    href={`https://wa.me/5493876231854?text=Hola%20Pablo!%20Estuve%20viendo%20la%20web%20y%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20proyecto%20${encodeURIComponent(projActual.nombre)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => registrarClicWspProyecto(projActual.nombre)}
                    className="bg-[#06182a] hover:bg-[#0a2744] text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition text-center block shadow-md"
                  >
                    Consultar a Pablo
                  </a>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}