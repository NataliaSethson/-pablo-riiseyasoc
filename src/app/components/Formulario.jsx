'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Lista de proyectos disponibles para el desplegable
const LISTA_PROYECTOS = [
  'Entre Rios 940',
  'Italo II',
  'Vicente López 954',
  'Pueyrredón 788',
  'Dean Funes 1172',
  '25 de Mayo 743'
];

export default function Formulario({ proyectoPredefinido = '' }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    proyecto: proyectoPredefinido || LISTA_PROYECTOS[0],
    mensaje: ''
  });

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (proyectoPredefinido) {
      setFormData((prev) => ({ ...prev, proyecto: proyectoPredefinido }));
    }
  }, [proyectoPredefinido]);

  // Manejo de cambio en el teléfono (solo números y caracteres telefónicos)
  const handleTelefonoChange = (e) => {
    const valorSinLetras = e.target.value.replace(/[^0-9+\s()-]/g, '');
    setFormData((prev) => ({ ...prev, telefono: valorSinLetras }));

    // Limpiar error de teléfono mientras escribe si alcanza la longitud mínima
    const soloNumeros = valorSinLetras.replace(/\D/g, '');
    if (soloNumeros.length >= 8 && errores.telefono) {
      setErrores((prev) => ({ ...prev, telefono: null }));
    }
  };

  // Manejo de cambio en el email
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, email: val }));

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexEmail.test(val) && errores.email) {
      setErrores((prev) => ({ ...prev, email: null }));
    }
  };

  // Función de validación general antes de enviar
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Nombre
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'Ingresá tu nombre completo.';
    }

    // Teléfono (debe tener al menos 8 dígitos numéricos)
    const soloNumeros = formData.telefono.replace(/\D/g, '');
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es obligatorio.';
    } else if (soloNumeros.length < 8) {
      nuevosErrores.telefono = 'Ingresá un teléfono válido (mínimo 8 dígitos).';
    }

    // Email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.';
    } else if (!regexEmail.test(formData.email)) {
      nuevosErrores.email = 'Ingresá una dirección de correo válida.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setCargando(true);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '25030dee-78bf-4f34-86b5-709915b6f1e1',
          subject: `Nuevo contacto landing - ${formData.proyecto || 'Consulta General'}`,
          from_name: 'Pablo Ugolini Landing',
          ...formData
        })
      });

      const result = await res.json();

      if (result.success) {
        // Evento DataLayer para Google Ads / GTM
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'generate_lead',
            form_location: 'landing_pablo_ugolini',
            proyecto_interes: formData.proyecto || 'Consulta General',
            user_data: {
              email: formData.email,
              phone_number: formData.telefono
            }
          });
        }

        router.push('/gracias');
      } else {
        alert('Hubo un inconveniente al enviar la consulta.');
        setCargando(false);
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Error de conexión. Intentalo nuevamente.');
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Nombre Completo *
          </label>
          <input
            type="text"
            name="nombre"
            placeholder="Ej: Juan Pérez"
            value={formData.nombre}
            onChange={(e) => {
              setFormData({ ...formData, nombre: e.target.value });
              if (errores.nombre) setErrores((prev) => ({ ...prev, nombre: null }));
            }}
            className={`w-full bg-[#06182a] border ${
              errores.nombre ? 'border-red-500' : 'border-slate-700'
            } rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#e31c23]`}
          />
          {errores.nombre && (
            <p className="text-red-400 text-xs mt-1 font-medium">{errores.nombre}</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Teléfono / WhatsApp *
          </label>
          <input
            type="tel"
            name="telefono"
            placeholder="Ej: +54 9 387 1234567"
            value={formData.telefono}
            onChange={handleTelefonoChange}
            className={`w-full bg-[#06182a] border ${
              errores.telefono ? 'border-red-500' : 'border-slate-700'
            } rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#e31c23]`}
          />
          {errores.telefono && (
            <p className="text-red-400 text-xs mt-1 font-medium">{errores.telefono}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Correo Electrónico *
          </label>
          <input
            type="email"
            name="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleEmailChange}
            className={`w-full bg-[#06182a] border ${
              errores.email ? 'border-red-500' : 'border-slate-700'
            } rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#e31c23]`}
          />
          {errores.email && (
            <p className="text-red-400 text-xs mt-1 font-medium">{errores.email}</p>
          )}
        </div>

        {/* Proyecto */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Proyecto de Interés
          </label>
          <select
            name="proyecto"
            value={formData.proyecto}
            onChange={(e) => setFormData({ ...formData, proyecto: e.target.value })}
            className="w-full bg-[#06182a] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e31c23] cursor-pointer"
          >
            {LISTA_PROYECTOS.map((proy) => (
              <option key={proy} value={proy} className="bg-[#06182a] text-white">
                {proy}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
          Mensaje o Consulta (Opcional)
        </label>
        <textarea
          name="mensaje"
          rows="3"
          placeholder="¿Buscás comprar en pozo, llave en mano o recibir asesoramiento sobre opciones de financiación?"
          value={formData.mensaje}
          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
          className="w-full bg-[#06182a] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#e31c23]"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={cargando}
        className="w-full bg-[#e31c23] hover:bg-red-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition shadow-xl mt-2 disabled:opacity-50"
      >
        {cargando ? 'Enviando...' : 'Enviar Consulta a Pablo Ugolini'}
      </button>
    </form>
  );
}