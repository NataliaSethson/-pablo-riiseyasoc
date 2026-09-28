'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Formulario({ proyectoPredefinido = '' }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    proyecto: proyectoPredefinido,
    mensaje: ''
  });

  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (proyectoPredefinido) {
      setFormData((prev) => ({ ...prev, proyecto: proyectoPredefinido }));
    }
  }, [proyectoPredefinido]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    const encode = (data) => {
      return Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
    };

    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contacto-riise', ...formData }),
      });

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
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Ocurrió un error al enviar la consulta.');
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="form-name" value="contacto-riise" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Nombre Completo *</label>
          <input
            type="text"
            name="nombre"
            required
            placeholder="Ej: Juan Pérez"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full bg-[#06182a] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#e31c23]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Teléfono / WhatsApp *</label>
          <input
            type="tel"
            name="telefono"
            required
            placeholder="Ej: 387 1234567"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            className="w-full bg-[#06182a] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#e31c23]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Correo Electrónico *</label>
          <input
            type="email"
            name="email"
            required
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-[#06182a] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#e31c23]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Proyecto de Interés</label>
          <input
            type="text"
            name="proyecto"
            placeholder="Ej: Ítalo II, P788, etc."
            value={formData.proyecto}
            onChange={(e) => setFormData({ ...formData, proyecto: e.target.value })}
            className="w-full bg-[#06182a] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#e31c23]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Mensaje o Consulta (Opcional)</label>
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