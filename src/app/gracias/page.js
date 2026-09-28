import Link from 'next/link';

export default function GraciasPage() {
  return (
    <main className="min-h-screen bg-[#030d16] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#06182a] border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-20 h-20 bg-[#e31c23] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto shadow-lg">
          ✓
        </div>
        
        <h1 className="text-3xl font-black text-white uppercase tracking-wide">
          ¡Consulta Recibida!
        </h1>
        
        <p className="text-slate-300 text-sm leading-relaxed">
          Gracias por contactarnos. Pablo Ugolini recibió tu mensaje y se pondrá en contacto a la brevedad con la información técnica y comercial del proyecto.
        </p>

        <div className="pt-4">
          <Link 
            href="/" 
            className="inline-block w-full bg-[#e31c23] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition shadow-lg"
          >
            Volver a la página principal
          </Link>
        </div>
      </div>
    </main>
  );
}