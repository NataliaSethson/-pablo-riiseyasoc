// src/app/page.jsx
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
  
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WZ5WPZXP';

  const solicitarDossier = (nombreProyecto) => {
    setProyectoSeleccionadoForm(nombreProyecto);
    const contactoSec = document.getElementById('contacto');
    if (contactoSec) {
      contactoSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#0f2c4f] text-white font-sans selection:bg-[#e31c23] selection:text-white">
      <GoogleTagManager gtmId={gtmId} />

      {/* Header Corporativo Flotante */}
      <header className="relative z-40 bg-[#0f2c4f]/95 backdrop-blur-md border-b border-blue-900/60 sticky top-0 shadow-xl py-1">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-4">
          
          <div className="flex items-center">
            <a href="#asesor" className="block py-1">
              <img
                src="/logo.png"
                alt="Riise y Asociados Logo"
                className="h-20 sm:h-24 w-auto object-contain bg-transparent block"
              />
            </a>
          </div>

          <nav className="hidden md:flex items-center bg-[#163863] px-6 py-2.5 rounded-full border border-blue-800/80 text-xs font-semibold space-x-6">
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
      <section id="asesor" className="relative bg-[#0f2c4f] py-16 lg:py-20 px-6 border-b border-blue-900/60 overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-[#e31c23] pointer-events-none opacity-90 hidden lg:block"
          style={{ clipPath: 'polygon(0 0, 80% 0, 35% 100%, 0% 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Foto más ancha hacia la izquierda */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 w-full flex justify-start"
          >
            <div className="relative w-full h-[580px] lg:h-[660px] rounded-2xl overflow-hidden shadow-2xl bg-[#0f2c4f] border-0 group">
              <Image
                src="/pablo.jpeg"
                alt="Pablo Ugolini - Ejecutivo Comercial"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </motion.div>

          {/* Texto a la derecha */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-block bg-[#e31c23] text-white text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-sm shadow-md">
              Atención Comercial Directa
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Asesoramiento profesional e inversiones inmobiliarias seguras
            </h1>

            <div className="bg-[#163863]/95 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-blue-800/80 shadow-2xl space-y-4">
              <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
                Soy <strong className="text-white font-semibold">Pablo Ugolini</strong>, ejecutivo comercial en <strong className="text-white font-semibold">Riise y Asociados</strong>. Mi objetivo es ayudarte a detectar las mejores oportunidades del mercado inmobiliario, desde unidades en pozo con alta proyección de revalorización hasta departamentos listos para habitar.
              </p>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-normal">
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
                className="bg-[#163863] hover:bg-[#1d477c] text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-full border border-blue-800/80 transition"
              >
                Ver Oportunidades
              </motion.a>
            </div>

          </motion.div>

        </div>
      </section>

      {/* BLOQUE 2: RESPALDO INSTITUCIONAL (NUESTRA HISTORIA) */}
      <section id="trayectoria" className="relative py-24 lg:py-28 px-6 bg-white text-slate-900 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block bg-[#e31c23] text-white text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-sm shadow-md">
              Nuestra Historia
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2c4f] tracking-tight leading-tight">
              Nuestra historia como cimiento.
            </h2>

            <div className="grid grid-cols-3 gap-3 bg-[#0f2c4f] p-6 rounded-2xl shadow-xl text-center text-white">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#e31c23] mb-1">
                  <ContadorAnimado valorFinal={40} prefijo="+" duracion={5} />
                </span>
                <span className="text-[10px] uppercase font-bold text-blue-200 tracking-wider block leading-tight">Edificios Construidos</span>
              </div>
              <div className="border-x border-blue-800 px-2">
                <span className="block text-2xl sm:text-3xl font-black text-white mb-1">
                  <ContadorAnimado valorFinal={150} prefijo="+" sufijo=" MIL" duracion={5} />
                </span>
                <span className="text-[10px] uppercase font-bold text-blue-200 tracking-wider block leading-tight">M² Construidos</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#e31c23] mb-1">
                  <ContadorAnimado valorFinal={30} prefijo="+" duracion={5} />
                </span>
                <span className="text-[10px] uppercase font-bold text-blue-200 tracking-wider block leading-tight">Años de Trayectoria</span>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0f2c4f] tracking-tight">
              Seguimos Construyendo
            </h3>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Con más de tres décadas de trayectoria en el desarrollo inmobiliario, en <strong className="text-[#0f2c4f] font-semibold">Riise y Asociados</strong> seguimos construyendo con la misma visión, solidez y compromiso de siempre, respaldando cada inversión inmobiliaria con calidad y cumplimiento.
              </p>
              <p>
                A través de una gestión transparente y profesional, desarrollamos espacios urbanos pensados para generar valor, bienestar y seguridad a largo plazo para cada inversor.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-[#e31c23] font-extrabold">
                Evolucionamos para seguir creciendo.
              </span>
              <a 
                href="#contacto"
                className="bg-[#0f2c4f] hover:bg-[#163863] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full transition shadow-md inline-block"
              >
                Consultar con Pablo
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* BLOQUE 3: MODELOS DE INVERSIÓN */}
      <section id="ventajas" className="relative py-24 lg:py-28 px-6 bg-[#0f2c4f] text-white border-b border-blue-900/60 overflow-hidden">
        <div 
          className="absolute inset-y-0 right-0 w-full lg:w-1/2 bg-[#e31c23] pointer-events-none opacity-90 hidden lg:block"
          style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 65% 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-white bg-[#e31c23] px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm inline-block mb-3 shadow-md">
              Modelos de Inversión
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight">
              ¿Por qué invertir con Riise y Asociados?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicios.map((serv, i) => (
              <div 
                key={i} 
                className="bg-[#163863] p-8 sm:p-10 rounded-2xl border border-blue-800/80 shadow-xl hover:shadow-2xl hover:border-[#e31c23] transition-all duration-300 space-y-4 group"
              >
                <div className="w-10 h-1 bg-[#e31c23] rounded-full group-hover:w-16 transition-all duration-300" />
                
                <h3 className="text-xl font-bold text-white group-hover:text-[#e31c23] transition-colors">
                  {serv.titulo}
                </h3>
                
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed font-normal">
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
      <section id="contacto" className="py-20 px-6 bg-white text-slate-900 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <span className="text-[#e31c23] text-xs uppercase font-bold tracking-widest block">Contacto Directo</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f2c4f]">
              Invertí con Asesoramiento Exclusivo
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
              {proyectoSeleccionadoForm ? (
                <>Completá el formulario para recibir inmediatamente el dossier oficial y lista de precios de <strong className="text-[#0f2c4f]">{proyectoSeleccionadoForm}</strong>.</>
              ) : (
                <>Completá el formulario a continuación para comunicarte directamente con <strong className="text-[#0f2c4f]">Pablo Ugolini</strong> y recibir atención inmediata.</>
              )}
            </p>
          </div>

          <div className="bg-[#0f2c4f] border border-blue-900/60 p-6 sm:p-10 rounded-2xl shadow-2xl text-white">
            <Formulario proyectoPredefinido={proyectoSeleccionadoForm} />
          </div>
        </div>
      </section>

      {/* PIE DE PÁGINA */}
      <footer className="bg-[#091a30] text-slate-400 py-10 px-6 border-t border-blue-950 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          {/* Datos de Pablo en un mismo renglón centrado en celular, y separados a la izquierda en desktop */}
          <div className="flex flex-col md:block items-center justify-center space-x-0 md:space-x-0">
            <span className="font-extrabold text-white text-base tracking-wide inline md:block">PABLO UGOLINI</span>
            <span className="text-blue-300 text-[11px] inline md:block ml-1 md:ml-0 before:content-['•'] before:mx-1 md:before:content-none">Ejecutivo Comercial - Riise y Asociados</span>
          </div>

          {/* Icono de Instagram minimalista */}
          <div>
            <a
              href="https://www.instagram.com/pablo.riiseyasoc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Pablo Ugolini"
              className="w-10 h-10 rounded-full bg-[#163863]/60 hover:bg-[#e31c23] text-slate-300 hover:text-white transition-all duration-300 inline-flex items-center justify-center border border-blue-900/50 shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-slate-500">© {new Date().getFullYear()} Riise y Asociados. Todos los derechos reservados.</p>
        </div>
      </footer>
      
      <BotonWhatsApp />
    </main>
  );
}