import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pablo Ugolini | Inversiones Inmobiliarias - Riise y Asociados",
  description: "Asesoramiento profesional en inversiones inmobiliarias y proyectos exclusivos con Riise y Asociados.",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' }
    ],
    shortcut: ['/favicon.png'],
    apple: ['/favicon.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#06182a] text-white selection:bg-[#e31c23] selection:text-white">
        {children}
      </body>
    </html>
  );
}