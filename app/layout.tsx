import "@/app/ui/global.css";
import { NextAuthProvider } from "@/context/SessionAuthProvider";
import { inter } from "@/app/ui/fonts";
import { Metadata } from 'next';

export const metadata: Metadata = {
  /**Next.js agregará automáticamente el título y los metadatos a su aplicación.

Pero ¿qué pasa si deseas agregar un título personalizado para una página específica? Puede hacer esto agregando un metadata objeto a la propia página. Los metadatos de las páginas anidadas anularán los metadatos de la página principal. */
  title: {
    template: '%s | Acme Dashboard', // El %s se reemplazara con el título de la página especifica
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),

};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} id="main_layout">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
} 
