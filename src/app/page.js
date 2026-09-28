'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Formulario from './components/Formulario';
import BotonWhatsApp from './components/BotonWhatsApp';
import ContadorAnimado from './components/ContadorAnimado';
import ProyectosCarrusel from './components/ProyectosCarrusel';
import GoogleTagManager from './components/GoogleTagManager';
import { proyectosData } from './data/proyectos';

const servicios = [
  {
    titulo: 'Comercialización Directa',
    desc: 'Atención personalizada con la desarrolladora, financiación propia a medida y transparencia total desde la primera consulta.'
  },
  {
    titulo: 'Desarrollo y Construcción',
    desc: 'Seleccionamos ubicaciones estratégicas con alta demanda. Supervisión técnica rigurosa para garantizar calidad constructiva y cumplimiento de plazos.'
  },
  {
    titulo: 'Gestión Integral',
    desc: 'Coordinamos arquitectura, ingeniería y ejecución de obra bajo una misma dirección para asegurar el máximo valor de tu propiedad.'
  }
];

export default function Home() {
  const [proyectoSeleccionadoForm, setProyectoSeleccionadoForm] = useState('');
  
  // Si tenés un ID de Google Tag Manager (ej: GTM-XXXXXXX), colócalo aquí:
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || '';

  const solicitarDossier = (nombreProyecto) => {
    setProyectoSeleccionadoForm(nombreProyecto);
    const contactoSec = document.getElementById('contacto');
    if (contactoSec) {
      contactoSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#06182a] text-white font-sans selection:bg-[#e31c23] selection:text-white">
      {/* Integración para medición de Google Tag Manager */}
      <GoogleTagManager gtmId={gtmId} />

      {/* Header Corporativo Flotante */}
      <header className="relative z-40 bg-[#06182a]/95 backdrop-blur-md border-b border-slate-800 sticky top-0 shadow-xl py-1">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-4">
          
          <div className="flex items-center">
            <a href="#asesor" className="block py-1">
              <img
                src="/logo.png"
                alt="Riise y Asociados Logo"
                className="h-16 sm:h-20 w-auto object-contain bg-transparent block"
              />
            </a>
          </div>

          <nav className="hidden md:flex items-center bg-[#0a2744] px-6 py-2.5 rounded-full border border-slate-700/60 text-xs font-semibold space-x-6">
            <a href="#asesor" className="hover:text-[#e31c23] transition-colors">Pablo Ugolini</a>
            <a href="#trayectoria" className="hover:text-[#e31c23] transition-colors">Trayectoria</a>
            <a href="#ventajas" className="hover:text-[#e31c23] transition-colors">Ventajas</a>
            <a href="#proyectos" className="hover:text-[#e31c23] transition-colors">Proyectos</a>
            <a href="#contacto" className="hover:text-[#e31c23] transition-colors">Contacto</a>
          </nav>

          <div>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contacto"
              className="bg-[#e31c23] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition shadow-lg block"
            >
              Contactar Asesor
            </motion.a>
          </div>
        </div>
      </header>

      {/* BLOQUE 1: PRESENTACIÓN PABLO UGOLINI */}
      <section id="asesor" className="relative bg-[#06182a] py-12 lg:py-16 px-6 border-b border-slate-800">
        <div 
          className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-[#e31c23] pointer-events-none opacity-90 hidden lg:block"
          style={{ clipPath: 'polygon(0 0, 80% 0, 35% 100%, 0% 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[380px] h-[500px] lg:h-[560px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-[#0a2744] group">
              <Image
                src="/pablo.jpeg"
                alt="Pablo Ugolini - Ejecutivo Comercial"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06182a] via-transparent to-transparent opacity-85" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#0a2744]/95 backdrop-blur-md p-4 rounded-xl border border-slate-700 text-center shadow-xl">
                <p className="text-white font-bold text-xl leading-tight">Pablo Ugolini</p>
                <p className="text-[#e31c23] text-xs font-bold uppercase tracking-widest mt-0.5">Ejecutivo Comercial</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-block bg-[#e31c23] text-white text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-sm shadow-md">
              Atención Comercial Directa
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Asesoramiento profesional e inversiones inmobiliarias seguras
            </h1>

            <div className="bg-[#0a2744] p-6 sm:p-8 rounded-xl border border-slate-700/80 shadow-2xl space-y-4">
              <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
                Soy <strong className="text-white font-semibold">Pablo Ugolini</strong>, ejecutivo comercial en <strong className="text-white font-semibold">Riise y Asociados</strong>. Mi objetivo es ayudarte a detectar las mejores oportunidades del mercado inmobiliario, desde unidades en pozo con alta proyección de revalorización hasta departamentos listos para habitar.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                Te brindo información clara, números transparentes y asesoramiento personalizado para que inviertas con total seguridad.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#contacto"
                className="bg-[#e31c23] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition shadow-xl"
              >
                Solicitar Asesoramiento
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#proyectos"
                className="bg-[#0a2744] hover:bg-[#0f345a] text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-full border border-slate-700 transition"
              >
                Ver Oportunidades
              </motion.a>
            </div>

          </motion.div>

        </div>
      </section>

      {/* BLOQUE 2: MÉTRICAS DE TRAYECTORIA */}
      <section id="trayectoria" className="py-16 bg-[#051424] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#e31c23] text-xs font-bold uppercase tracking-widest block">Respaldo Institucional</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Nuestra Historia Como Cimiento</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#0a2744] p-8 rounded-xl border border-slate-700/70 text-center shadow-lg">
              <span className="block text-4xl sm:text-5xl font-black text-[#e31c23] mb-2">
                <ContadorAnimado valorFinal={40} prefijo="+" duracion={5} />
              </span>
              <span className="text-xs uppercase font-bold text-white tracking-wider">Edificios Construidos</span>
            </div>

            <div className="bg-[#0a2744] p-8 rounded-xl border border-slate-700/70 text-center shadow-lg">
              <span className="block text-4xl sm:text-5xl font-black text-white mb-2">
                <ContadorAnimado valorFinal={150} prefijo="+" sufijo=" MIL" duracion={5} />
              </span>
              <span className="text-xs uppercase font-bold text-slate-300 tracking-wider">M² Construidos</span>
            </div>

            <div className="bg-[#0a2744] p-8 rounded-xl border border-slate-700/70 text-center shadow-lg">
              <span className="block text-4xl sm:text-5xl font-black text-[#e31c23] mb-2">
                <ContadorAnimado valorFinal={30} prefijo="+" duracion={5} />
              </span>
              <span className="text-xs uppercase font-bold text-white tracking-wider">Años de Trayectoria</span>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 3: MODELOS DE INVERSIÓN (FONDO BLANCO LIMPIO) */}
      <section id="ventajas" className="py-20 px-6 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#e31c23] text-xs font-bold uppercase tracking-widest block">
              Modelos de Inversión
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#06182a] mt-1 tracking-tight">
              ¿Por qué invertir con Riise y Asociados?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicios.map((serv, i) => (
              <div 
                key={i} 
                className="bg-slate-50 p-8 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#e31c23] transition-all duration-300 space-y-4 group"
              >
                <div className="w-10 h-1 bg-[#e31c23] rounded-full group-hover:w-16 transition-all duration-300" />
                
                <h3 className="text-xl font-bold text-[#06182a] group-hover:text-[#e31c23] transition-colors">
                  {serv.titulo}
                </h3>
                
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {serv.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BLOQUE 4: CARRUSEL DE PROYECTOS */}
      <ProyectosCarrusel 
        proyectos={proyectosData} 
        solicitarDossier={solicitarDossier} 
      />

      {/* BLOQUE 5: FORMULARIO DE CONTACTO */}
      <section id="contacto" className="py-20 px-6 bg-[#04111d] border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <span className="text-[#e31c23] text-xs uppercase font-bold tracking-widest block">Contacto Directo</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Invertí con Asesoramiento Exclusivo
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
              {proyectoSeleccionadoForm ? (
                <>Completá el formulario para recibir inmediatamente el dossier oficial y lista de precios de <strong className="text-white">{proyectoSeleccionadoForm}</strong>.</>
              ) : (
                <>Completá el formulario a continuación para comunicarte directamente con <strong>Pablo Ugolini</strong> y recibir atención inmediata.</>
              )}
            </p>
          </div>

          <div className="bg-[#0a2744] border border-slate-700 p-6 sm:p-10 rounded-2xl shadow-2xl">
            <Formulario proyectoPredefinido={proyectoSeleccionadoForm} />
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="bg-[#020b14] text-slate-400 py-10 px-6 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-extrabold text-white text-base tracking-wide block">PABLO UGOLINI</span>
            <span className="text-slate-500 text-[11px]">Ejecutivo Comercial - Riise y Asociados</span>
          </div>
          <p>© {new Date().getFullYear()} Riise y Asociados. Todos los derechos reservados.</p>
        </div>
      </footer>

      <BotonWhatsApp />
    </main>
  );
}