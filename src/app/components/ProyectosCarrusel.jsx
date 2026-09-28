'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProyectosCarrusel({ proyectos = [], solicitarDossier }) {
  const [indexActual, setIndexActual] = useState(0);
  const [modoDetalle, setModoDetalle] = useState(false);

  if (!proyectos || proyectos.length === 0) return null;

  const projActual = proyectos[indexActual];

  const siguienteProyecto = () => {
    setIndexActual((prev) => (prev + 1) % proyectos.length);
  };

  const anteriorProyecto = () => {
    setIndexActual((prev) => (prev - 1 + proyectos.length) % proyectos.length);
  };

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
    <section id="proyectos" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      
      <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-800 bg-[#06182a] min-h-[550px] flex items-center">
        
        <AnimatePresence mode="wait">
          {!modoDetalle ? (
            /* VISTA 1: CARRUSEL INMERSIVO */
            <motion.div
              key={`carrusel-${projActual.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-[550px] flex items-end p-8 sm:p-14"
            >
              <Image
                src={projActual.imagen}
                alt={projActual.nombre}
                fill
                className="object-cover object-center"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#06182a] via-[#06182a]/40 to-black/20" />

              <div className="relative z-10 space-y-4 max-w-xl">
                <span className="text-[#e31c23] text-sm font-semibold tracking-wider block uppercase">
                  Proyectos
                </span>

                <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
                  {projActual.nombre}
                </h2>

                <div className="pt-2">
                  <button
                    onClick={() => setModoDetalle(true)}
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
                    {projActual.avance}%
                  </span>
                </div>
              </div>

              <button
                onClick={siguienteProyecto}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white text-slate-900 hover:bg-[#e31c23] hover:text-white p-3.5 rounded-full shadow-2xl transition duration-300"
                aria-label="Siguiente"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={anteriorProyecto}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white text-white hover:text-slate-900 p-3.5 rounded-full backdrop-blur-md transition duration-300"
                aria-label="Anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </motion.div>
          ) : (
            /* VISTA 2: DETALLE Y FICHA TÉCNICA */
            <motion.div
              key={`detalle-${projActual.id}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[550px] bg-white text-slate-900"
            >
              <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full">
                <Image
                  src={projActual.imagen}
                  alt={projActual.nombre}
                  fill
                  className="object-cover"
                />
                
                <button
                  onClick={() => setModoDetalle(false)}
                  className="absolute top-4 left-4 z-20 bg-[#06182a]/80 hover:bg-[#e31c23] text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md transition flex items-center gap-1.5"
                >
                  <span>‹</span> Volver al carrusel
                </button>
              </div>

              <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                
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